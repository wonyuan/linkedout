import pymongo
import cohere
from transformers import pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import spacy
import stanza
import re

##############################################
## This script cleans data retrieved from the mongo database that should hopefull have been updated there upon web scraping

##############################################
print("Initializing SpaCy and Stanza...", flush=True)

# initialize SpaCy and Stanza
nlp_spacy = spacy.load("en_core_web_sm")
stanza.download('en')
nlp_stanza = stanza.Pipeline('en')

print("SpaCy and Stanza initialized.", flush=True)


##############################################
# Initialize Cohere client
cohere_api_key = 'fZwPAWvKGMQvat8xVzmD663SJ0b3sp1ZTCnhPTeP'  # Replace if new created (unsure if it expires about ceratin amount of time)
cohere_client = cohere.Client(cohere_api_key)

print("Cohere client initialized.", flush=True)

try:
    print("Initializing Hugging Face pipeline...", flush=True)
    # Initialize Hugging Face pipeline
    summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")  # Use a smaller valid model
    print("Hugging Face pipeline initialized.", flush=True)

    ##############################################
    ##           DATABASE CONNECTION            ##
    ##############################################

    # MongoDB connection string
    mongo_connection_string = 'mongodb+srv://kaal:linkedOutReachHT6@linkedoutreach.w14urt6.mongodb.net/LinkedOutReach'
    client = pymongo.MongoClient(mongo_connection_string)
    db = client['LinkedOutReach']
    collection = db['ProfileData']

    print("Connected to MongoDB.", flush=True)

    # fetch the documents/entries from the collection
    documents = list(collection.find({}))
    print(f"Fetched {len(documents)} documents from MongoDB.", flush=True)

    # extract headlines (probs extend to other relevant fields)
    texts = [doc['headline'] for doc in documents]

    # data cleaninggggg
    def clean_text(text):
        text = re.sub(r'<[^>]+>', '', text)  # Remove HTML tags
        text = re.sub(r'[^a-zA-Z0-9\s]', '', text)  # Remove special characters
        text = re.sub(r'\s+', ' ', text)  # Remove extra spaces
        return text.strip()

    cleaned_texts = [clean_text(text) for text in texts]
    print("Cleaned texts.", flush=True)

    ############################################################
    ## NLP STUFF BEGINS HERE
    ## After analysis and research, SpaCy is effient and parallelisable - we need this
    ## But doesn't have a great accuracy rate - we don't want this
    ## Stanza has a much better accuracy rate - we need this
    ## But is slow as its built on top of neural networks - we don't want this

    ## Aim: make custom hybrid NLP toolkit to extract keywords using advantageous parts of each

    # function to extract keywords using SpaCy
    def extract_keywords_spacy(text):
        doc = nlp_spacy(text.lower())
        keywords = [token.lemma_ for token in doc if not token.is_stop and token.is_alpha]
        return keywords

    # function to extract keywords using Stanza
    def extract_keywords_stanza(text):
        doc = nlp_stanza(text.lower())
        keywords = [word.lemma for sent in doc.sentences for word in sent.words if word.upos in ['NOUN', 'VERB', 'ADJ']]
        return keywords

    # Hybrid keyword extraction
    def extract_keywords(text):
        spacy_tokens = set(extract_keywords_spacy(text))
        stanza_tokens = set(extract_keywords_stanza(text))
        return list(spacy_tokens.union(stanza_tokens))

    # Function to summarize text using Hugging Face
    def summarize_text(text):
        summary = summarizer(text, max_length=50, min_length=25, do_sample=False)
        return summary[0]['summary_text']

    print("Starting keyword extraction and summarization...", flush=True)

    keywords_list = [' '.join(extract_keywords(text)) for text in cleaned_texts]
    print("Extracted keywords.", flush=True)

    summarized_list = [summarize_text(text) for text in cleaned_texts]
    print("Summarized texts.", flush=True)

    # ensure that first_document_summary is defined
    first_document_summary = summarized_list[0]

    # function to calculate similarity using cosine similarity
    def calculate_similarity(text1, text2):
        vectorizer = TfidfVectorizer().fit_transform([text1, text2])
        vectors = vectorizer.toarray()
        return cosine_similarity(vectors)[0, 1]

    # extract features for each document
    def extract_features(doc):
        headline = doc.get('headline', '')
        skills = doc.get('skills', [])
        interests = doc.get('interests', [])
        goals = doc.get('goals', [])
        keywords = extract_keywords(headline)
        return {
            'headline': headline,
            'skills': skills,
            'interests': interests,
            'goals': goals,
            'keywords': keywords
        }

    features_list = [extract_features(doc) for doc in documents]
    print("Extracted features from documents.", flush=True)

    # identify similar features between two profiles for them to note in their message
    def find_similar_features(profile1, profile2):
        similar_skills = set(profile1['skills']).intersection(set(profile2['skills']))
        similar_interests = set(profile1['interests']).intersection(set(profile2['interests']))
        similar_goals = set(profile1['goals']).intersection(set(profile2['goals']))
        similar_keywords = set(profile1['keywords']).intersection(set(profile2['keywords']))

        return {
            'skills': similar_skills,
            'interests': similar_interests,
            'goals': similar_goals,
            'keywords': similar_keywords
        }

    ######################################################
    ##   CALCULATE SIMILARITIES OF SELECTED KEYWORDS USING 
    ##   EITHER THE COSINE VECTOR PRODUCT OR IN BUILT FUNCTION

    ## opted for inbuilt function for efficiency

    # calculate similarity and find similar features
    first_document_features = features_list[0]
    similarities = []

    print("Calculating similarities...", flush=True)
    for i in range(1, len(features_list)):
        similar_features = find_similar_features(first_document_features, features_list[i])
        similarity = calculate_similarity(first_document_summary, summarized_list[i])
        similarities.append({
            'document_id': str(documents[i]['_id']),
            'similar_features': similar_features,
            'similarity': similarity
        })

    print("Calculated similarities.", flush=True)

    # print similarity scores and features
    for similarity in similarities:
        print(f"Document ID: {similarity['document_id']}")
        print(f"Similar Features: {similarity['similar_features']}")
        print(f"Similarity Score: {similarity['similarity']*100:.2f}%")
        print("="*40)

    ##############################################
    ## Huzzah, we may now construct our linkedIn message!

    # construct LinkedIn message
    def construct_linkedin_message(similar_features, recipient_name):
        skills = ', '.join(similar_features['skills']) if similar_features['skills'] else "various skills"
        interests = ', '.join(similar_features['interests']) if similar_features['interests'] else "various interests"
        goals = ', '.join(similar_features['goals']) if similar_features['goals'] else "various goals"
        keywords = ', '.join(similar_features['keywords']) if similar_features['keywords'] else "various topics"

        message = ()

        return message

    # tester example usage with the first profile and a selected similar profile
    recipient_name = "hack the 6ix judge"  # Example recipient name
    similar_features_example = similarities[0]['similar_features']
    message = construct_linkedin_message(similar_features_example, recipient_name)
    print("Generated LinkedIn Message:")
    print(message, flush=True)

except Exception as e:
    print(f"An error occurred: {e}", flush=True)
