# import cohere
# import numpy as np
# from dotenv import load_dotenv
# from pymongo.mongo_client import MongoClient
# import time
# load_dotenv()


# # get collection name from db, 
# # get user linkedin info, user desc and experience and match with all professionals in db
# # get cosine similarity between user and all professionals

# collection_name = "db name"
# db_name = db[collection_name]

# def cosine_similarity(a, b):
#     return np.dot(a, b)/(np.linalg.norm(a) * np.linalg.norm(b))

# def get_embeddings(user_about_text_dict, all_about_text_dict):
#     user_about_text_array = []
#     for blurb in user_about_text_dict:
#         user_about_text_array.append(user_about_text_dict[blurb])

#     all_about_text_array = []
#     for blurb in all_about_text_dict:
#         all_about_text_array.append(all_about_text_dict[blurb])

#     user_about_embed_array = co.embed(texts=user_about_text_array).embeddings
#     all_about_embed_array = co.embed(texts=all_about_text_array).embeddings
    
#     user_about_embed_dict = {}
#     all_about_embed_dict = {}

#     for idx, blurb in enumerate(user_about_text_dict):
#         user_about_embed_dict[blurb] = user_about_embed_array[idx]
#     for idx, blurb in enumerate(all_about_text_dict):
#         all_about_embed_dict[blurb] = all_about_embed_array[idx]

#     return (user_about_embed_dict, all_about_embed_dict)


# def get_similarity_scores_about(user_about_text_dict, all_about_text_dict):
#     (user_about_embed_dict, all_about_embed_dict) = get_embeddings(user_about_text_dict, all_about_text_dict)
    
#     similarity_scores_dict = {}
#     for all_blurb in all_about_embed_dict:
#         # calculate cosine similarity between a blurb and all blurbs
#         similarity_score_sum = 0
#         for blurb in user_about_embed_dict:
#             similarity_score_sum += cosine_similarity(all_about_embed_dict[all_blurb], user_about_embed_dict[all_blurb])
#         similarity_score = similarity_score_sum / len(user_about_embed_dict)
#         similarity_scores_dict[all_blurb] = similarity_score
#     return similarity_scores_dict

# # db name
# def get_similarity_sources(name):
#     name = db_name.find_one({"name" : name}, {"source" : 1, "_id" : 0})
#     return name['source']

# def get_personalized_commonality(prof_about, prof_experience):
#     message="Address the student directly and give them tips to prepare for a networking session with this professional, who has experience in\n" + prof_experience + "and can be described as\n" + prof_about + "\nKeep the answer short and concise"

#     tips = co.chat(
#         message, 
#         model="command-light-nightly", 
#         temperature=0.1
#     )

#     return [tips.text]


