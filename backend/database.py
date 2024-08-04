from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import pymongo
# from model_cohere import get_personalized_explanation
from dotenv import load_dotenv
load_dotenv()
import os

mongo_username = os.getenv("kaal")
mongo_password = os.getenv("linkedOutReachHT6")

mongo_connection_string = 'mongodb+srv://kaal:linkedOutReachHT6@linkedoutreach.w14urt6.mongodb.net/LinkedOutReach'

client = MongoClient(mongo_connection_string)
db = client['LinkedOutReach']

collection_name = "ProfileData"
collection = db[collection_name]

def get_all_professionals():
    prof_array = []
    profs = collection.find({}, { "_id" : 0, "name" : 1, "headline" : 1 })
    for prof in profs:
        if prof:
            prof_array.append(prof)
    return prof_array
