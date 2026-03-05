import urllib.request
import json
import re

def get_json(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        return json.loads(response.read().decode())

def process_data():
    try:
        hindi_data = get_json("https://raw.githubusercontent.com/kashishkhullar/gita_json/master/dataset_hindi.json")
        english_data = get_json("https://raw.githubusercontent.com/kashishkhullar/gita_json/master/dataset_english.json")
        
        for c in range(11, 19):
            c_str = str(c)
            h_ch = hindi_data.get('chapters', {}).get(c_str)
            e_ch = english_data.get('chapters', {}).get(c_str)
            
            if not h_ch:
                continue
                
            shlokas = []
            nums = h_ch.get('verse_numbers', [])
            
            for n in nums:
                h_v = h_ch.get(n)
                e_v = e_ch.get(n) if e_ch else None
                
                if h_v:
                    sanskrit_text = h_v.get('text', '')
                    sanskrit_text = re.sub(r'\n+', r'\\n', sanskrit_text).strip('\\n').strip()
                    
                    try:
                        num_val = int(n.split('-')[0])
                    except:
                        num_val = 0
                        
                    shloka = {
                        "num": num_val,
                        "sanskrit": sanskrit_text,
                        "hindi": h_v.get('meaning', ''),
                        "english": e_v.get('meaning', '') if e_v else '',
                        "hindi_meaning": h_v.get('word_meanings', ''),
                        "meaning": e_v.get('word_meanings') or (e_v.get('meaning') if e_v else '') or ''
                    }
                    shlokas.append(shloka)
                    
            shlokas = sorted(shlokas, key=lambda x: x['num'])
            
            out = f"export const chapter{c}Shlokas = [\n"
            for s in shlokas:
                out += "  {\n"
                out += f"    num: {s['num']},\n"
                out += f"    sanskrit: `{s['sanskrit']}`,\n"
                out += f"    hindi: `{s['hindi'].replace('`', '\\\\`')}`,\n"
                out += f"    english: `{s['english'].replace('`', '\\\\`')}`,\n"
                out += f"    hindi_meaning: `{s['hindi_meaning'].replace('`', '\\\\`')}`,\n"
                out += f"    meaning: `{s['meaning'].replace('`', '\\\\`')}`\n"
                out += "  },\n"
            out += "];\n"
            
            file_path = f"c:\\Users\\Veer Pal Singh\\Desktop\\Darshanam\\src\\data\\chapter{c}.js"
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(out)
                
            print(f"Chapter {c} updated with {len(shlokas)} shlokas.")
            
    except Exception as e:
        print("Error:", str(e))

if __name__ == "__main__":
    process_data()
