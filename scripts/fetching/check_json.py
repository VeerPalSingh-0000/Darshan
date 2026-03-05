import urllib.request
import json
import re

def get_json(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        return json.loads(response.read().decode())

def process_data():
    hindi_data = get_json("https://raw.githubusercontent.com/kashishkhullar/gita_json/master/dataset_hindi.json")
    ch = hindi_data.get('chapters', {}).get("11")
    if ch:
        print("Keys in Chapter 11:", list(ch.keys()))
        print("Verses count:", ch.get("verses_count"))
        vt = [v for v in ch.keys() if v not in ['chapter_number', 'chapter_summary', 'name', 'name_meaning', 'verses_count', 'verse_numbers']]
        print("First few verse keys:", vt[:5])
    else:
        print("Chapter 11 not found.")

if __name__ == "__main__":
    process_data()
