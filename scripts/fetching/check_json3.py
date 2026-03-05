import urllib.request
import json
import re

def get_json(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        return json.loads(response.read().decode())

def process_data():
    hindi_data = get_json("https://raw.githubusercontent.com/kashishkhullar/gita_json/master/dataset_hindi.json")
    print("Root keys:", list(hindi_data.keys()))

    if 'verses' in hindi_data:
        print("Verses type:", type(hindi_data['verses']))
        if isinstance(hindi_data['verses'], list):
            print("Verses len:", len(hindi_data['verses']))
            if len(hindi_data['verses']) > 0:
                print("First verse keys:", list(hindi_data['verses'][0].keys()))
        elif isinstance(hindi_data['verses'], dict):
            print("Verses keys:", list(hindi_data['verses'].keys())[:10])
    
    # Let's print the first 2 keys and their subkeys if dict
    for k in list(hindi_data.keys())[:5]:
        if isinstance(hindi_data[k], dict):
            print(f"Key {k} is dict w/ length {len(hindi_data[k])}")

if __name__ == "__main__":
    process_data()
