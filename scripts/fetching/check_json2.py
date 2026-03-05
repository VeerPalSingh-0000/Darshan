import urllib.request
import json
import re

def get_json(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        return json.loads(response.read().decode())

def process_data():
    hindi_data = get_json("https://raw.githubusercontent.com/kashishkhullar/gita_json/master/dataset_hindi.json")
    print("Available chapters:", list(hindi_data.get('chapters', {}).keys()))

    for c in ["1", "10", "11"]:
        ch = hindi_data.get('chapters', {}).get(c)
        if ch:
            vt = [v for v in ch.keys() if v not in ['chapter_number', 'chapter_summary', 'name', 'name_meaning', 'verses_count', 'verse_numbers']]
            print(f"Chapter {c} verse count inside dict:", len(vt))

if __name__ == "__main__":
    process_data()
