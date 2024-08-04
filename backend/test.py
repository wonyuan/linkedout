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

#https://www.linkedin.com/in/shivya-mehta/
@app.route("/api/linkedinURL", methods=["POST"])
def get_linkedin():

    data = request.json
    print(data.get('linkedinURL', ""))
    linkedin_url = data.get('linkedinURL', "")

    chrome_options = Options()

    #set up the ChromeDriver with WebDriverManager
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)

    #open linkedin login page
    driver.get('https://www.linkedin.com/login')

    #log into dummy linkedin
    driver.find_element("id", "username").send_keys('janoochinki@gmail.com')
    driver.find_element("id", "password").send_keys('passwordhackthe6ix')
    driver.find_element("css selector", '.login__form_action_container button').click()
    time.sleep(20)

    #navigate to linkedin profile to scrape
    driver.get(linkedin_url)

    time.sleep(5)

    page_source = driver.page_source

    #parse the HTML using BeautifulSoup
    soup = BeautifulSoup(page_source, 'html.parser')

    #extract name and about
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


    print('Name:', name)
    print('About Me Section:', about)

    #closes the browser
    driver.quit()



    return {"name": name, "about": about, "experiences": experience_list}




if __name__ == "__main__":
        app.run(debug=True, port=8000)




# experience_section = soup.find('ul', {'class': 'TSXovOouyqHysMDvzEUuMfiyaHtujjHMYdVCA'})
# if experience_section:
#     print("Experience: ")
#     experience_list_items = experience_section.find_all('li')
#     experience_list_items_unique = list(set(experience_list_items))
#     for experience in experience_list_items_unique:
#         if experience.text.strip():
#             print(experience.text.strip())