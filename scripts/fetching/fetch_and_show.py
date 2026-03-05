import urllib.request
import json

def fetch_json(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
         return json.loads(response.read().decode())

try:
    hindi = fetch_json("https://raw.githubusercontent.com/kashishkhullar/gita_json/master/dataset_hindi.json")
    print("Hindi keys:", list(hindi[0].keys()))
    print("Hindi item 0:", hindi[0])
    
    english = fetch_json("https://raw.githubusercontent.com/kashishkhullar/gita_json/master/dataset_english.json")
    print("English keys:", list(english[0].keys()))
    print("English item 0:", english[0])
except Exception as e:
    print("Error:", e)
