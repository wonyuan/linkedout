from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import pymongo
from scrape import scrape_reviews, scrape_descriptions, get_course_name
from model_cohere import get_personalized_explanation
from dotenv import load_dotenv
load_dotenv()
import os

mongo_username = os.getenv("kaal")
mongo_password = os.getenv("linkedOutReachHT6")

uri = "mongodb+srv://{0}:{1}@cluster0.2qomck2.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp".format(mongo_username, mongo_password)

client = MongoClient(uri)
db = client['LinkedOutReach']

collection_name = "ProfileData"
collection = db[collection_name]


def get_all_professionals():
    course_array = []
    courses = course_collection.find({}, { "code" : 1, "name" : 1, "term" : 1, "status" : 1, "score" : 1, "_id": 0 })
    for course in courses:
        if course:
            course_array.append(course)
    return course_array
