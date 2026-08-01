file_path = r"c:\Users\shiva\OneDrive\Attachments\New folder (2)\src\app\partner-with-us\page.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace ' uppercase ' with ' '
content = content.replace(' uppercase ', ' ')
# Also handle cases where uppercase might be at the end of a class list before a quote
content = content.replace(' uppercase"', '"')
content = content.replace('"uppercase ', '"')

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Removed uppercase classes.")
