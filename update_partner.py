import re

file_path = r"c:\Users\shiva\OneDrive\Attachments\New folder (2)\src\app\partner-with-us\page.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Replace all #00F0FF with gray variants
content = content.replace('text-[#00F0FF]', 'text-gray-400')
content = content.replace('border-[#00F0FF]', 'border-gray-400')
content = content.replace('hover:bg-[#00F0FF]', 'hover:bg-gray-300')
content = content.replace('hover:text-[#00F0FF]', 'hover:text-gray-400')
content = content.replace('focus:border-[#00F0FF]', 'focus:border-gray-400')
content = content.replace('bg-[#00F0FF]', 'bg-gray-300')
content = content.replace('group-hover:text-[#00F0FF]', 'group-hover:text-gray-400')

# For the main headings, let's make sure the spans are also gray
# Currently it says Partner <span className="text-gray-400">With Us</span> (since text-[#00F0FF] was replaced)
# And Why <span className="text-gray-400">Partner</span> With Us?
# Let's change those specifically to text-gray-500 if we want it a bit darker on the light bg, but 400 is fine.

# 2. Remove the 3 images (comment them out so layout is preserved as a placeholder)
content = re.sub(
    r'(<img\s+src="https://d3orevttu06iqr\.cloudfront\.net/website/partner_with_us/Franchise\d\.webp".*?/>)',
    r'{/* \1 */}',
    content,
    flags=re.DOTALL
)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated partner-with-us page.")
