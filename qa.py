import time
import string
import random
from bs4 import BeautifulSoup
from selenium.webdriver.common.keys import Keys
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


# Generate mock data for the survey
name = ''.join(random.choices(
    string.ascii_uppercase + string.ascii_lowercase, k=10))
email = f"{name}@example.com"
age = random.randint(18, 65)
gender = random.choice(['Male', 'Female', 'Other'])
occupation = random.choice(
    ['Student', 'Engineer', 'Teacher', 'Doctor', 'Lawyer'])
feedback = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."

# Set up the Selenium driver
driver = webdriver.Safari()
driver.get("http://localhost:5999")

# Find the survey form elements and fill them out
name_input = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.CSS_SELECTOR, "input[name='name']")))
name_input.send_keys(name)

email_input = driver.find_element_by_css_selector("input[name='email']")
email_input.send_keys(email)

age_input = driver.find_element_by_css_selector("input[name='age']")
age_input.send_keys(str(age))

gender_radios = driver.find_elements_by_css_selector("input[name='gender']")
for radio in gender_radios:
    if radio.get_attribute("value") == gender:
        radio.click()

occupation_select = driver.find_element_by_css_selector(
    "select[name='occupation']")
occupation_options = occupation_select.find_elements_by_tag_name("option")
for option in occupation_options:
    if option.get_attribute("value") == occupation:
        option.click()

feedback_input = driver.find_element_by_css_selector(
    "textarea[name='feedback']")
feedback_input.send_keys(feedback)

# Upload mock files
upload_button = driver.find_element_by_css_selector("input[name='files']")
action = ActionChains(driver).move_to_element(upload_button).click().perform()

time.sleep(1)

upload_input = driver.find_element_by_css_selector("input[type='file']")
upload_input.send_keys("/path/to/mock-file1.jpg\n/path/to/mock-file2.jpg")

# Submit the survey
submit_button = driver.find_element_by_css_selector("button[type='submit']")
submit_button.click()

# Wait for the survey to be submitted and get the response HTML
time.sleep(5)
response_html = driver.page_source

# Parse the response HTML with Beautiful Soup and check for success message
soup = BeautifulSoup(response_html, 'html.parser')
success_message = soup.find("div", {"class": "success-message"})
if success_message:
    print("Survey successfully submitted!")
else:
    print("Error submitting survey.")

# Close the browser
driver.quit()
