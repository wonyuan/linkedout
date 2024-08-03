

# LinkedOutReach

You've heard of LinkedIn. Now introducing LinkedOutReach. The platform to help students, industry newcomers, and career transitioners to make that first step in networking (will reword this later).


## Tech Stack & Requirements

**Languages:** 
- `python=3.8.0+`

**Front End:** 
- React,
- (fill this out)

**Web-Scraping Backend:** 
- `selenium==4.1.3` (webdriver & webDriverManger)
    - `webdriver-manager==3.5.2`
- `beautifulsoup4==4.10.0` (HTML parsing)

**Database**: 
- MongoDB (Atlas or local installation)
- `pymongo==4.0.1`

**Machine Learning:**
- `cohere==` 
- fill this out

## SetUp Instructions

**1. Clone the Repo**

```
git clone https://github.com/yourusername/linkedin-profile-scraper.git
cd linkedin-profile-scraper
```

**2. Install Dependencies (using bestie pip)**

```
pip install selenium==4.1.3 beautifulsoup4==4.10.0 pymongo==4.0.1 webdriver-manager==3.5.2
```

**3. MongoDB SetUp**

MongoDB cluster configured as such:

![App Screenshot](https:/github.com/shivyam/linkedOutReach/edit/main/readmeImgs/Mongo Configuration.JPG "Logo Title Text 1")

Ensure MongoDB instance is running. For the purposes of this project, only using one account so password shouldn't need to change. Potentially will need to add more IPs so other devices can access it tho. 

**4. Update Script with Credentials**

Update linkedIn username and password as needed

**5. Run the script**

As shown below

![App Screenshot](https:/github.com/shivyam/linkedOutReach/edit/main/readmeImgs/Terminal ScreenShot.JPG "Logo Title Text 1")

Refresh to check scraped data has been added to database:

![App Screenshot](https:/github.com/shivyam/linkedOutReach/edit/main/readmeImgs/MongoDB Update.JPG "Logo Title Text 1")



