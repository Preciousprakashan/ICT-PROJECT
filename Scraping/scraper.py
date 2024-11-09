import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
from datetime import datetime

# Connect to MongoDB (replace <username>, <password>, <cluster-url>, and <database> with your credentials)
client = MongoClient("mongodb+srv://preciousprakashan:pre04072002@cluster0.ro5wi.mongodb.net/keralaNCC?retryWrites=true&w=majority&appName=Cluster0")  # Replace with your connection string if using MongoDB Atlas
db = client['keralaNCC']  # Database name
collection = db['latest_news']       # Collection name

# Fetch the webpage
url = "http://www.keralancc.org/"
req = requests.get(url)
soup = BeautifulSoup(req.content, "html.parser")

# Find the Flash News section
flash_news_section = soup.find("div", {"class": "tContainer", "id": "tContainer124"})

# Extract and insert each news item with its link into MongoDB
for news_item in flash_news_section.find_all("a", href=True):
    # Extract the news title and link
    news_text = news_item.get_text(strip=True)
    news_link = news_item['href']
    
    # Construct the full URL for the PDF (if the link is relative)
    if news_link.startswith("/"):
        news_link = url.rstrip("/") + news_link
    
    # Create a document to insert into MongoDB, including the current timestamp
    document = {
        "title": news_text,
        "pdf_link": news_link,
        "date": datetime.now()  # Add the current timestamp
    }
    
    # Insert the document into the collection
    collection.insert_one(document)
    print(f"Inserted: {document}")

print("All news items have been inserted into MongoDB!")
