import os

replacements = {
    'â€”': '—',
    'â†’': '→',
    'ðŸ“ž': '📞',
    'Â©': '©',
    'âš¡': '⚡',
    '"?"?': '—',
    '+\'': '→',
    'Ac ': '© '
}

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return
    
    modified = False
    for k, v in replacements.items():
        if k in content:
            content = content.replace(k, v)
            modified = True
            
    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Fixed {filepath}')

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.css') or file.endswith('.ts'):
            process_file(os.path.join(root, file))
