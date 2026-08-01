import re
with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

sections = re.findall(r'<section.*?>', text)
for i, s in enumerate(sections):
    print(i, s)
