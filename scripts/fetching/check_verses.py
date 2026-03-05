import urllib.request
import json
import re

def get_json(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        return json.loads(response.read().decode())

def process_data():
    hindi_data = get_json("https://raw.githubusercontent.com/kashishkhullar/gita_json/master/dataset_hindi.json")
    print(hindi_data['chapters']['11']['verse_numbers'])
    
    # Just to confirm the number of keys in hindi_data['verses']
    print(len(hindi_data['verses'].keys()))

if __name__ == "__main__":
    process_data()
