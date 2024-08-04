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
import time

app=Flask(__name__)
cors= CORS(app, origins="*")

@app.errorhandler(400)
def bad_request(e):
    return jsonify(e), 400

@app.route("/api/linkedinURL", methods=["POST"])
def get_linkedin():
    data = request.json
    print(data.get('linkedinURL', ""))
    return "succes"

def send_linkedin_info():


    chrome_options = Options()

    # Set up the ChromeDriver with WebDriverManager
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)

    # Open LinkedIn login page
    driver.get('https://www.linkedin.com/login')

    # Log in to LinkedIn
    driver.find_element("id", "username").send_keys('janoochinki@gmail.com')
    driver.find_element("id", "password").send_keys('passwordhackthe6ix')
    driver.find_element("css selector", '.login__form_action_container button').click()
    time.sleep(20)

    # Navigate to the LinkedIn profile page
    profile_url = data.get('linkedinURL', "")
    driver.get(profile_url)

    time.sleep(5)

    # Get the page source
    page_source = driver.page_source

    # Parse the HTML using BeautifulSoup
    soup = BeautifulSoup(page_source, 'html.parser')

    # Extract the name and headline
    time.sleep(1)
    name = soup.find('h1', {'class': 'text-heading-xlarge inline t-24 v-align-middle break-words'}).text.strip()
    time.sleep(1)
    about = soup.find('div', {'class': 'OElnVfzAcygnRqxEDKPEAGXxBkRSBHMbezdNQ inline-show-more-text--is-collapsed inline-show-more-text--is-collapsed-with-line-clamp full-width'}).text.strip()
    time.sleep(1)
    experience_list = soup.find('ul', {'class': 'TSXovOouyqHysMDvzEUuMfiyaHtujjHMYdVCA'})
    if experience_list:
        print("Experience: ")
        experience_list_items = experience_list.find_all('li')
        experience_list_items_unique = list(set(experience_list_items))
        for experience in experience_list_items_unique:
            if experience.text.strip():
                print(experience.text.strip())
    else:
        print("Experience list not found")



    print('Name:', name)
    print('About Me Section:', about)

    #closes the browser
    driver.quit()



    return {"name": name, "about": about, "experience": experience}






if __name__ == "__main__":
        app.run(debug=True, port=8000)