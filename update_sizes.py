file_path = r"c:\Users\shiva\OneDrive\Attachments\New folder (2)\src\app\partner-with-us\page.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Make headlines smaller
content = content.replace('text-4xl md:text-6xl', 'text-3xl md:text-5xl')
content = content.replace('text-3xl md:text-5xl', 'text-2xl md:text-4xl')
content = content.replace('text-4xl md:text-5xl', 'text-3xl md:text-4xl')
content = content.replace('text-xl md:text-3xl', 'text-lg md:text-2xl') # hero subtitle
content = content.replace('text-2xl font-black', 'text-xl font-black') # small card headings
content = content.replace('text-xl md:text-2xl', 'text-lg md:text-xl') # faq titles

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated headline sizes.")
