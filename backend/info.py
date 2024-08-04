from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time

#######################################################
## Just gonna box this all up into a nice function that scrapes a profile given a driver and a URL

def scrape_profile(driver, profile_url):
    # navigate to the LinkedIn profile page
    driver.get(profile_url)

    # get the page source
    time.sleep(5)  # Wait for the page to load
    page_source = driver.page_source

    # parse the HTML using BeautifulSoup
    soup = BeautifulSoup(page_source, 'html.parser')

    
    # extract the name, headline, and experience
    name = soup.find('h1', {'class': 'text-heading-xlarge inline t-24 v-align-middle break-words'}).text.strip()
    headline = soup.find('div', {'class': 'OElnVfzAcygnRqxEDKPEAGXxBkRSBHMbezdNQ inline-show-more-text--is-collapsed inline-show-more-text--is-collapsed-with-line-clamp full-width'}).text.strip()
    experience_list = soup.find('ul', {'class': 'TSXovOouyqHysMDvzEUuMfiyaHtujjHMYdVCA'})
    if experience_list:
        print("Experience: ")
        
        #create an array so we can package it all into something we can insert into dictionary
        exp = []
        
        experience_list_items = experience_list.find_all('li')
        experience_list_items_unique = list(set(experience_list_items))
        for experience in experience_list_items_unique:
            if experience.text.strip():
                exp.append(experience.text.strip())
                print(experience.text.strip())
    else:
        print("Experience list not found")
    # Print the extracted data
    print('Name:', name)
    print('Headline:', headline)
    print('Experiences:', experience)

    # return the profile data
    return {
        'name': name,
        'headline': headline,
        'experience': exp
    }

###############################################
##      POST FUNCTION INITIALISATION         ##
###############################################

# Set up Chrome options
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

########### USE THIS OPTION WHEN WE HAVE A TARGET URL #############

#can have multiple urls here but still finite
profile_urls = [
    'https://www.linkedin.com/in/shivya-mehta/'
]

#store all the extracted data into a nice dictionary that we can package and insert into the database
profile_data_list = []

# iterate over profile URLs and scrape data
for profile_url in profile_urls:
    try:
        profile_data = scrape_profile(driver, profile_url)
        profile_data_list.append(profile_data)
        print(f'Scraped data for {profile_data["name"]}')
    except Exception as e:
        print(f'Failed to scrape {profile_url}: {e}')

# Close the browser
driver.quit()

print("the scraped data", profile_data_list)

# MongoDB connection string
mongo_connection_string = 'mongodb+srv://kaal:linkedOutReachHT6@linkedoutreach.w14urt6.mongodb.net/LinkedOutReach'

# Store data in MongoDB
client = pymongo.MongoClient(mongo_connection_string)
db = client['LinkedOutReach']
collection = db['ProfileData']

try:
    collection.insert_many(profile_data_list)
    print(f'Inserted {len(profile_data_list)} profiles')
except Exception as e:
    print(f'An error occurred: {e}')

