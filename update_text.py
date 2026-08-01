import re

with open('src/app/adwall/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace text-white with text-[#F1EFE1] inside the cards of the Revenue Hub section
# The Revenue Hub section is defined in replace2.py, let's just replace all exact matches of 'text-white' that are inside the #222222 cards.

new_text = text.replace('text-white mb-2', 'text-[#F1EFE1] mb-2')
new_text = new_text.replace('text-white/5', 'text-[#F1EFE1]/5')

with open('src/app/adwall/page.tsx', 'w', encoding='utf-8') as f:
    f.write(new_text)

print("Text updated to #F1EFE1")
