import sys, re, json, os

with open('src/Pages/Gita/Chapters/Adhyay1.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

match = re.search(r'const chapter1Shlokas = (\[\s*\{.*?\}\s*\]);', text, re.DOTALL)
if match:
    array_content = match.group(1)
    # create the js file
    out_js = f"export const chapter1Shlokas = {array_content};\n"
    os.makedirs('src/data', exist_ok=True)
    with open('src/data/chapter1.js', 'w', encoding='utf-8') as out_f:
        out_f.write(out_js)
    
    # modify the jsx
    new_text = text[:match.start()] + 'import { chapter1Shlokas } from "../../../data/chapter1";' + text[match.end():]
    with open('src/Pages/Gita/Chapters/Adhyay1.jsx', 'w', encoding='utf-8') as out_f:
        out_f.write(new_text)
    print("Success: extracted chapter1")
else:
    print("Match failed")
