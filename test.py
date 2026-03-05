import urllib.request
import re

url = "https://www.holy-bhagavad-gita.org/chapter/2/verse/47"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        mp3s = re.findall(r'https?://[^\"]+\.mp3', html)
        print("FOUND MP3s:", mp3s)
except Exception as e:
    print(f"Error: {e}")
