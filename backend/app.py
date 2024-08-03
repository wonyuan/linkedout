from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup

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

# Navigate to the LinkedIn profile page
profile_url = 'https://www.linkedin.com/in/shivya-mehta'
driver.get(profile_url)

# Get the page source
page_source = driver.page_source

# Parse the HTML using BeautifulSoup
soup = BeautifulSoup(page_source, 'html.parser')

# Extract the name and headline
name = soup.find('h1', {'class': 'text-heading-xlarge inline t-24 v-align-middle break-words'}).text.strip()
#headline = soup.find('h2', {'class': 'mt1 t-18 t-black t-normal break-words'}).text.strip()

# Print the extracted data
print('Name:', name)
#print('Headline:', headline)

# Close the browser
driver.quit()
