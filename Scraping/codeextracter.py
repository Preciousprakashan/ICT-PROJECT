import requests
from bs4 import BeautifulSoup

# URL of the website
url = "https://www.wix.com/website-template/view/html/2852?originUrl=https%3A%2F%2Fwww.wix.com%2Fwebsite%2Ftemplates&tpClick=view_button&esi=a1ebbd4a-c1c5-463f-9c88-8313070aa08b"

# Send an HTTP request to fetch the webpage content
req = requests.get(url)
soup = BeautifulSoup(req.content, "html.parser")

# Extract the entire <html> tag and its contents
html_content = soup.find("html")
print(html_content.prettify())  # Use prettify() for a formatted output
