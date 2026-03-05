import re
import urllib.request
import urllib.parse
import json
import time

def translate_text(text, target_lang):
    if not text: return ""
    text = text.replace('\\"', '"').replace("\\'", "'")
    url = f'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl={target_lang}&dt=t&q={urllib.parse.quote(text.encode("utf-8"))}'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        response = urllib.request.urlopen(req).read().decode('utf-8')
        data = json.loads(response)
        res = "".join([x[0] for x in data[0] if x[0]])
        res = res.replace('`', '\\`')
        return res
    except Exception as e:
        print(f"Error translating: {e}")
        return text

def process_chapter1():
    filepath = 'src/data/chapter1.js'
    print(f"Processing {filepath}")
    
    with open('detailed_c1.json', 'r', encoding='utf-8') as f:
        details = json.load(f)

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    parts = content.split('num:')
    new_content = parts[0]
    
    for i in range(1, len(parts)):
        part = parts[i]
        
        # Determine shloka number
        num_match = re.search(r'\s*(\d+)', part)
        shloka_num = num_match.group(1) if num_match else str(i)
        
        # Replace hindi_meaning and meaning if they exist in detailed_c1.json
        if shloka_num in details:
            detailed_hm = details[shloka_num]['hindi_meaning'].replace('`', '\\`')
            detailed_m = details[shloka_num]['meaning'].replace('`', '\\`')
            
            # Replace existing hindi_meaning
            part = re.sub(r'hindi_meaning:\s*(["`]).*?(?<!\\)\1,?', f'hindi_meaning:\n      `{detailed_hm}`,', part, flags=re.DOTALL)
            # Replace existing meaning
            part = re.sub(r'meaning:\s*(["`]).*?(?<!\\)\1,?', f'meaning:\n      `{detailed_m}`,', part, flags=re.DOTALL)
            
            print(f"Updated detailed meanings for shloka {shloka_num}")
            
            # Now we need to translate the updated english and meaning to tamil, bengali, spanish
            english_match = re.search(r'english:\s*(["`])(.*?)(?<!\\)\1,', part, re.DOTALL)
            if english_match:
                eng_text = english_match.group(2)
                mean_text = detailed_m
                
                # We need to replace the old tamil, bengali, spanish translations if they exist!
                # Easiest way is to completely remove old ones:
                part = re.sub(r'tamil:\s*(["`]).*?(?<!\\)\1,?', '', part, flags=re.DOTALL)
                part = re.sub(r'tamil_meaning:\s*(["`]).*?(?<!\\)\1,?', '', part, flags=re.DOTALL)
                part = re.sub(r'bengali:\s*(["`]).*?(?<!\\)\1,?', '', part, flags=re.DOTALL)
                part = re.sub(r'bengali_meaning:\s*(["`]).*?(?<!\\)\1,?', '', part, flags=re.DOTALL)
                part = re.sub(r'spanish:\s*(["`]).*?(?<!\\)\1,?', '', part, flags=re.DOTALL)
                part = re.sub(r'spanish_meaning:\s*(["`]).*?(?<!\\)\1,?', '', part, flags=re.DOTALL)
                
                # And re-add them beautifully
                tamil_eng = translate_text(eng_text, 'ta')
                tamil_mean = translate_text(mean_text, 'ta')
                bengali_eng = translate_text(eng_text, 'bn')
                bengali_mean = translate_text(mean_text, 'bn')
                spanish_eng = translate_text(eng_text, 'es')
                spanish_mean = translate_text(mean_text, 'es')
                
                added_translations = f',\n    tamil:\n      `{tamil_eng}`,\n    tamil_meaning:\n      `{tamil_mean}`,\n    bengali:\n      `{bengali_eng}`,\n    bengali_meaning:\n      `{bengali_mean}`,\n    spanish:\n      `{spanish_eng}`,\n    spanish_meaning:\n      `{spanish_mean}`\n  '
                
                # Safely insert before the closing brace of this shloka object
                last_brace_idx = part.rfind('}')
                if last_brace_idx != -1:
                    part = part[:last_brace_idx] + added_translations + part[last_brace_idx:]
                
                print(f"Translated shloka index {i}")
            time.sleep(0.5)

        new_content += 'num:' + part

    # Clean up any trailing commas before line breaks or closing braces
    new_content = re.sub(r',\s*}', '\n  }', new_content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
    print(f"Finished writing {filepath}")

process_chapter1()
