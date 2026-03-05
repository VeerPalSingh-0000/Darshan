import urllib.request
import json

def get_json(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        return json.loads(response.read().decode())

def process_data():
    hindi_data = get_json("https://raw.githubusercontent.com/kashishkhullar/gita_json/master/dataset_hindi.json")
    v11 = hindi_data.get('verses', {}).get('11')
    if v11:
        print("keys in verses['11']:", list(v11.keys()))
        print("Sample verse 1:", v11.get('1'))

if __name__ == "__main__":
    process_data()
