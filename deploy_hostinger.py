import paramiko
import sys
import os
import time

HOST = "82.25.122.62"
PORT = 65002
USER = "u823415094"
PASS = "Dy@u1234"

print("--- STEP 1: Connecting via SSH to Hostinger Server ---")
client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
try:
    client.connect(HOST, port=PORT, username=USER, password=PASS, timeout=30)
    print("SUCCESS: Connected to Hostinger SSH!")
except Exception as e:
    print(f"ERROR connecting to SSH: {e}")
    sys.exit(1)

def run_cmd(cmd):
    print(f"\n[REMOTE CMD]: {cmd}")
    stdin, stdout, stderr = client.exec_command(cmd)
    out = stdout.read().decode("utf-8", errors="ignore").strip()
    err = stderr.read().decode("utf-8", errors="ignore").strip()
    if out:
        print(f"OUTPUT:\n{out}")
    if err and "warning" not in err.lower():
        print(f"STDERR:\n{err}")
    return out

# Discover exact public_html path
print("\n--- STEP 2: Locating dyu.co.in public_html ---")
pwd = run_cmd("pwd")
domains_out = run_cmd("ls -ld domains/dyu.co.in/public_html || ls -ld public_html")

target_dir = "domains/dyu.co.in/public_html"
if "no such file" in domains_out.lower():
    target_dir = "public_html"

print(f"Target web root directory: {target_dir}")

# Check current contents
print("\n--- STEP 3: Current contents before cleanup ---")
run_cmd(f"ls -la {target_dir}")

# Delete old/broken files inside public_html
print("\n--- STEP 4: Deleting old/broken files inside public_html ---")
run_cmd(f"rm -rf {target_dir}/* {target_dir}/.[!.]* {target_dir}/..?* 2>/dev/null || true")

print("Verifying directory is clean:")
run_cmd(f"ls -la {target_dir}")

# Upload dyu-website-final.zip via SFTP
local_zip = "dyu-website-final.zip"
remote_zip = f"{target_dir}/dyu-website-final.zip"

print(f"\n--- STEP 5: Uploading {local_zip} (~37.2 MB) via SFTP ---")
sftp = client.open_sftp()
start_time = time.time()

def progress_cb(transferred, total):
    pct = int(100 * transferred / total)
    if pct % 20 == 0:
        sys.stdout.write(f"\rUploading: {transferred}/{total} bytes ({pct}%)")
        sys.stdout.flush()

sftp.put(local_zip, remote_zip, callback=progress_cb)
sftp.close()
elapsed = round(time.time() - start_time, 2)
print(f"\nSUCCESS: Upload complete in {elapsed} seconds!")

# Extract zip file inside public_html
print(f"\n--- STEP 6: Extracting {local_zip} inside {target_dir} ---")
run_cmd(f"cd {target_dir} && unzip -qo dyu-website-final.zip && rm -f dyu-website-final.zip")

# Verify new contents
print("\n--- STEP 7: Verifying new extracted contents in public_html ---")
run_cmd(f"ls -la {target_dir} | head -n 25")
run_cmd(f"ls -la {target_dir}/about-us")
run_cmd(f"ls -la {target_dir}/ac-chargers")

client.close()
print("\n--- DEPLOYMENT SCRIPT COMPLETED SUCCESSFULLY! ---")
