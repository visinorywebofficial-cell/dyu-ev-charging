import zipfile
import os

zip_name = 'dyu-website-final.zip'
if os.path.exists(zip_name):
    os.remove(zip_name)

count = 0
with zipfile.ZipFile(zip_name, 'w', zipfile.ZIP_DEFLATED) as z:
    for root, dirs, files in os.walk('out'):
        for f in files:
            fp = os.path.join(root, f)
            arcname = os.path.relpath(fp, 'out')
            z.write(fp, arcname)
            count += 1

print(f"Zipped {count} files. Size: {round(os.path.getsize(zip_name)/1e6, 2)} MB")
