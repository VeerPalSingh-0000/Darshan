import sys
import traceback
import json
import urllib.request
import urllib.parse
import re
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
        return text

def main():
    with open('py_log.txt', 'w', encoding='utf-8') as lg:
        try:
            filepath = 'src/data/chapter1.js'
            lg.write(f"Reading {filepath}\n")
            
            with open('detailed_c1.json', 'r', encoding='utf-8') as f:
                details = json.load(f)

            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            blocks = list(re.finditer(r'\{\s*num:\s*(\d+).*?(?=\n\s*\{|\s*\];)', content, flags=re.DOTALL))
            lg.write(f"Found {len(blocks)} blocks.\n")
            
            new_content = ""
            last_idx = 0
            
            for i, match in enumerate(blocks):
                num = match.group(1)
                block_text = match.group(0)
                
                new_content += content[last_idx:match.start()]
                last_idx = match.end()
                
                if num in details:
                    lg.write(f"Updating Shloka {num}...\n")
                    hm = details[num]['hindi_meaning'].replace('`', '\\`')
                    m = details[num]['meaning'].replace('`', '\\`')
                    
                    block_text = re.sub(r'hindi_meaning:\s*(["`]).*?(?<!\\)\1,?', f'hindi_meaning:\n      `{hm}`,', block_text, flags=re.DOTALL)
                    block_text = re.sub(r'meaning:\s*(["`]).*?(?<!\\)\1,?', f'meaning:\n      `{m}`,', block_text, flags=re.DOTALL)
                    
                    eng_match = re.search(r'english:\s*(["`])(.*?)(?<!\\)\1,', block_text, flags=re.DOTALL)
                    if eng_match:
                        eng_text = eng_match.group(2)
                        
                        for lang in ['tamil', 'bengali', 'spanish']:
                            block_text = re.sub(rf'{lang}:\s*(["`]).*?(?<!\\)\1,?', '', block_text, flags=re.DOTALL)
                            block_text = re.sub(rf'{lang}_meaning:\s*(["`]).*?(?<!\\)\1,?', '', block_text, flags=re.DOTALL)
                        
                        t_e = translate_text(eng_text, 'ta')
                        t_m = translate_text(m, 'ta')
                        b_e = translate_text(eng_text, 'bn')
                        b_m = translate_text(m, 'bn')
                        s_e = translate_text(eng_text, 'es')
                        s_m = translate_text(m, 'es')
                        
                        added = f',\n    tamil:\n      `{t_e}`,\n    tamil_meaning:\n      `{t_m}`,\n    bengali:\n      `{b_e}`,\n    bengali_meaning:\n      `{b_m}`,\n    spanish:\n      `{s_e}`,\n    spanish_meaning:\n      `{s_m}`\n  '
                        
                        last_brace = block_text.rfind('}')
                        if last_brace != -1:
                            block_text = block_text[:last_brace] + added + block_text[last_brace:]

                    time.sleep(0.5)

                new_content += block_text

            new_content += content[last_idx:]
            # Only fix dangling commas if we inserted nicely
            new_content = re.sub(r',\s*}', '\n  }', new_content)

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            lg.write("Done writing to file.\n")
        except Exception as e:
            lg.write("ERROR: " + str(e) + "\n")
            lg.write(traceback.format_exc())

if __name__ == '__main__':
    main()
