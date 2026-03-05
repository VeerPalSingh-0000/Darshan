import urllib.request
from html.parser import HTMLParser

class MyHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.mp3s = []
    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if value and '.mp3' in value:
                self.mp3s.append(value)

url = "https://www.holy-bhagavad-gita.org/chapter/2/verse/47"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        parser = MyHTMLParser()
        parser.feed(html)
        print("FOUND MP3s in tags:", parser.mp3s)
except Exception as e:
    print("Error:", e)
