"""Give the site a new cache-busting version, so browsers fetch the edited files.
Usage: python3 scripts/bump-version.py
Replaces every ?v=YYYYMMDD-vN in web/ with today's date and the next number.
"""
import re
from datetime import date
from pathlib import Path

WEB = Path(__file__).resolve().parent.parent / 'web'
TOKEN = re.compile(r'\b\d{8}-v(\d+)\b')
files = [f for pattern in ('*.html', '*.js', '*.css') for f in WEB.glob(pattern)]
texts = {f: f.read_text(encoding='utf-8') for f in files}
numbers = [int(n) for text in texts.values() for n in TOKEN.findall(text)]
if not numbers:
    raise SystemExit('No version token found in web/')
new = f'{date.today():%Y%m%d}-v{max(numbers) + 1}'
for f, text in texts.items():
    updated = TOKEN.sub(new, text)
    if updated != text:
        f.write_text(updated, encoding='utf-8')
        print(f.name)
print('Version:', new)
