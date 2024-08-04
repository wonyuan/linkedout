from flask import Flask, request, jsonify
from flask_cors import CORS
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import os
import time
from dotenv import load_dotenv
from pymongo import MongoClient


# MongoDB connection string
mongo_connection_string = 'mongodb+srv://kaal:linkedOutReachHT6@linkedoutreach.w14urt6.mongodb.net/LinkedOutReach'

# Store data in MongoDB
client = MongoClient(mongo_connection_string)
db = client['LinkedOutReach']
collection = db['ProfileData']

#load environment variables from .env file
linkedin_username= os.getenv('LINKEDIN_USERNAME')
linkedin_password= os.getenv('LINKEDIN_PASSWORD')

app=Flask(__name__)
cors= CORS(app, origins="*")
scraped_data = {}

#test profile: https://www.linkedin.com/in/shivya-mehta/
@app.errorhandler(400)
def bad_request(e):
    return jsonify(e), 400

@app.route("/api/linkedinURL", methods=["POST"])
def get_linkedin():
    global scraped_data
    data = request.json
    linkedin_url = data.get('linkedinURL', "")

    chrome_options = Options()

    #set up the ChromeDriver with WebDriverManager
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)

    #open linkedin login page
    driver.get('https://www.linkedin.com/login')

    #log into dummy linkedin
    driver.find_element("id", "username").send_keys(linkedin_username)
    driver.find_element("id", "password").send_keys(linkedin_password)
    driver.find_element("css selector", '.login__form_action_container button').click()
    time.sleep(20)

    #navigate to linkedin profile to scrape
    driver.get(linkedin_url)

    time.sleep(5)

    page_source = driver.page_source

    #parse the HTML using BeautifulSoup
    soup = BeautifulSoup(page_source, 'html.parser')

    #extract name and about section from LinkedIn
    time.sleep(1)
    name = soup.find('h1', {'class': 'text-heading-xlarge inline t-24 v-align-middle break-words'}).text.strip()
    time.sleep(1)
    about = soup.find('div', {'class': 'OElnVfzAcygnRqxEDKPEAGXxBkRSBHMbezdNQ inline-show-more-text--is-collapsed inline-show-more-text--is-collapsed-with-line-clamp full-width'}).text.strip()
    time.sleep(1)
    experience_set = set()
    experience_section = soup.find('ul', {'class': 'TSXovOouyqHysMDvzEUuMfiyaHtujjHMYdVCA'})
    if experience_section:
        experience_items = experience_section.find_all('li')
        for experience in experience_items:
            experience_text = experience.get_text(strip=True)
            if experience_text:
                experience_set.add(experience_text)
    else:
        experience_list = ["Experience list not found"]

    experience_list= list(experience_set)


    scraped_data = {"name": name, "about": about, "experiences": experience_list}

    #closes the launched browser
    driver.quit()
    
    print("About: " + about)
    try:
        collection.insert(scraped_data)
    except Exception as e:
        print(f'An error occurred: {e}')
        


    return jsonify(scraped_data)



@app.route("/api/getLinkedInData", methods=["GET"])
def get_linkedin_data():
    if scraped_data:
        return jsonify(scraped_data)
    else:
        return jsonify({"error": "No data available. Please make a POST request first."}), 404



if __name__ == "__main__":
        app.run(debug=True, port=8000)

