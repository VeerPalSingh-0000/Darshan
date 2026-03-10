import urllib.request
import re

req = urllib.request.Request(
    'https://www.holy-bhagavad-gita.org/chapter/1/verse/1',
    headers={'User-Agent': 'Mozilla/5.0'}
)

try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        matches = re.findall(r'https?://[^\s"\'<>]*\.mp3', html)
        with open('c:\\Users\\Veer Pal Singh\\Desktop\\Darshanam\\html_out.txt', 'w') as f:
            f.write('\n'.join(matches) if matches else 'no mp3')
except Exception as e:
    with open('c:\\Users\\Veer Pal Singh\\Desktop\\Darshanam\\html_out.txt', 'w') as f:
        f.write(str(e))
