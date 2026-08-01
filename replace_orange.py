import sys

with open('src/app/adwall/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('bg-orange-100', 'bg-[#00F0FF]/20')
text = text.replace('text-orange-600', 'text-[#00F0FF]')

with open('src/app/adwall/page.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Replaced orange with electric blue")
