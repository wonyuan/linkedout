import pymongo
import cohere
from transformers import pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import spacy
import re
from concurrent.futures import ThreadPoolExecutor

##############################################
## Initialization
##############################################

print("Initializing SpaCy...", flush=True)

# Initialize SpaCy
nlp = spacy.load("en_core_web_sm")

print("SpaCy initialized.", flush=True)

# Initialize Cohere client
cohere_api_key = 'fZwPAWvKGMQvat8xVzmD663SJ0b3sp1ZTCnhPTeP'  
cohere_client = cohere.Client(cohere_api_key)

print("Cohere client initialized.", flush=True)

try:
    print("Initializing Hugging Face pipeline...", flush=True)
    # Initialize Hugging Face pipeline
    summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")
    print("Hugging Face pipeline initialized.", flush=True)

    ##############################################
    ## Database Connection
    ##############################################

    # MongoDB connection string
    mongo_connection_string = 'mongodb+srv://kaal:linkedOutReachHT6@linkedoutreach.w14urt6.mongodb.net/LinkedOutReach'
    client = pymongo.MongoClient(mongo_connection_string)
    db = client['LinkedOutReach']
    collection = db['ProfileData']

    print("Connected to MongoDB.", flush=True)

    # Fetch the documents/entries from the collection
    documents = list(collection.find({}))
    print(f"Fetched {len(documents)} documents from MongoDB.", flush=True)

    # Extract headlines (probs extend to other relevant fields)
    texts = [doc['headline'] for doc in documents]

    # Data cleaning
    def clean_text(text):
        text = re.sub(r'<[^>]+>', '', text)  # Remove HTML tags
        text = re.sub(r'[^a-zA-Z0-9\s]', '', text)  # Remove special characters
        text = re.sub(r'\s+', ' ', text)  # Remove extra spaces
        return text.strip()

    cleaned_texts = [clean_text(text) for text in texts]
    print("Cleaned texts.", flush=True)

    ############################################################
    ## NLP Processing
    ############################################################

    # Function to extract keywords using SpaCy
    def extract_keywords(text):
        doc = nlp(text.lower())
        keywords = [token.lemma_ for token in doc if not token.is_stop and token.is_alpha]
        return keywords

    print("Starting keyword extraction...", flush=True)

    with ThreadPoolExecutor() as executor:
        keywords_list = list(executor.map(extract_keywords, cleaned_texts))

    print("Extracted keywords.", flush=True)

    # Ensure that first_document_keywords is defined
    first_document_keywords = ' '.join(keywords_list[0])

    # Function to calculate similarity using cosine similarity
    def calculate_similarity(text1, text2):
        vectorizer = TfidfVectorizer().fit_transform([text1, text2])
        vectors = vectorizer.toarray()
        return cosine_similarity(vectors)[0, 1]
    
    def calculate_similarities(pref, abouts):
        scores = {about: calculate_similarity(pref, about) for about in abouts}
        return scores

    # Extract features for each document
    
    def extract_features(doc, keywords):
        headline = doc.get('headline', '')
        skills = doc.get('skills', [])
        interests = doc.get('interests', [])
        goals = doc.get('goals', [])
        name = doc.get('name', 'Unnamed')
        return {
            'name': name,
            'headline': headline,
            'skills': skills,
            'interests': interests,
            'goals': goals,
            'keywords': keywords
        }

    features_list = [extract_features(doc, ' '.join(keywords)) for doc, keywords in zip(documents, keywords_list)]
    print("Extracted features from documents.", flush=True)

    # Identify similar features between two profiles for them to note in their message
    #HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
    def find_similar_features(profile1, profile2):
        similar_skills = set(profile1['skills']).intersection(set(profile2['skills']))
        similar_interests = set(profile1['interests']).intersection(set(profile2['interests']))
        similar_goals = set(profile1['goals']).intersection(set(profile2['goals']))
        similar_keywords = set(profile1['keywords'].split()).intersection(set(profile2['keywords'].split()))

        return {
            'skills': similar_skills,
            'interests': similar_interests,
            'goals': similar_goals,
            'keywords': similar_keywords
        }

    ######################################################
    ## Calculate Similarities
    ######################################################

    first_document_features = features_list[0]
    similarities = []

    print("Calculating similarities...", flush=True)
    with ThreadPoolExecutor() as executor:
        similarities = list(executor.map(
            lambda i: {
                'document_id': str(documents[i]['_id']),
                'name': features_list[i]['name'],
                'similar_features': find_similar_features(first_document_features, features_list[i]),
                'similarity': calculate_similarity(first_document_keywords, features_list[i]['keywords'])
            },
            range(1, len(features_list))
        ))

    print("Calculated similarities.", flush=True)

    # Find the person with the highest match
    highest_match = max(similarities, key=lambda x: x['similarity'])
    highest_match_name = highest_match['name']
    highest_match_similar_features = highest_match['similar_features']

    print(f"Highest Match Name: {highest_match_name}")
    print(f"Similar Features: {highest_match_similar_features}")
    print(f"Similarity Score: {highest_match['similarity']*100:.2f}%")
    print("="*40)

    ##############################################
    ## Categorize and Construct LinkedIn Message
    ##############################################

    def categorize_keywords(keywords):
        skills = []
        interests = []
        goals = []

        for keyword in keywords:
            if keyword in {'leadership', 'management', 'technical', 'role', 'play', 'undertake', 'speaking', 'completed'}:
                skills.append(keyword)
            elif keyword in {'engineering', 'research', 'science', 'computers', 'programming', 'coding', 'cyber', 'security', 'field'}:
                interests.append(keyword)
            elif keyword in {'opportunity', 'goal', 'career', 'forward', 'degree', 'job', 'industry', 'university', 'work'}:
                goals.append(keyword)
        print(skills, interests, goals)
        return skills, interests, goals

    def replace_placeholders(message, skills, interests, goals, recipient_name, user_name):
        message = message.replace("[mention specific skills related to science]", ', '.join(skills) if skills else "various skills")
        message = message.replace("[mention specific goals related to career or personal development]", ', '.join(goals) if goals else "various goals")
        message = message.replace("[Name]", recipient_name)
        message = message.replace("[Your Role/Background]", user_name)
        return message

    def fill_in_remaining_placeholders(message, skills, interests, goals, recipient_name, user_name):
        placeholders = re.findall(r'\[.*?\]', message)
        for placeholder in placeholders:
            if 'skills' in placeholder:
                message = message.replace(placeholder, ', '.join(skills) if skills else "various skills")
            elif 'interests' in placeholder:
                message = message.replace(placeholder, ', '.join(interests) if interests else "various interests")
            elif 'goals' in placeholder:
                message = message.replace(placeholder, ', '.join(goals) if goals else "various goals")
            elif 'Name' in placeholder:
                message = message.replace(placeholder, recipient_name)
            elif 'Your Role/Background' in placeholder:
                message = message.replace(placeholder, user_name)
        return message



    #HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
    def construct_linkedin_message(similar_features, recipient_name, user_name):
        skills, interests, goals = categorize_keywords(similar_features['keywords'])

        prompt = (
            f"Write a professional LinkedIn connection request message that includes the following similarities:\n\n"
            f"Skills: {', '.join(skills)}\n"
            f"Interests: {', '.join(interests)}\n"
            f"Goals: {', '.join(goals)}\n\n"
            f"Make sure to address it to {recipient_name} and to sign off with {user_name}.\n\n"
            f"Do NOT return information that need to be infilled. I want to make sure that there are no spaces that have to be infilled, so if there is a specific role or field or experience or interest, make sure to fill it in"
        )

        response = cohere_client.generate(
            model='command-xlarge-nightly',  # Use the correct model ID
            prompt=prompt,
            max_tokens=150,
            temperature=0.5
        )

        message = response.generations[0].text.strip()
        message = replace_placeholders(message, skills, interests, goals, recipient_name, user_name)
        message = fill_in_remaining_placeholders(message, skills, interests, goals, recipient_name, user_name)
    
        return {"message" : message}

    # Construct the message for the highest match
    recipient_name = highest_match_name  # The person with the highest match
    similar_features_example = highest_match_similar_features
    user_name = "Your Name"  # Replace with the actual user's name
    message = construct_linkedin_message(similar_features_example, recipient_name, user_name)
    print("Generated LinkedIn Message:")
    print(message, flush=True)



except Exception as e:
    print(f"An error occurred: {e}", flush=True)
