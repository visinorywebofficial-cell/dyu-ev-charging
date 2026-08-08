const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OUT = path.join(__dirname, 'out');
const rootIndex = path.join(OUT, 'index.html');

console.log('[postbuild] Root index.html check:', fs.existsSync(rootIndex) ? 'EXISTS ✅' : 'MISSING ❌');

if (fs.existsSync(OUT)) {
  console.log('[postbuild] Packing out/ into site_deploy.tar.gz via python...');
  try {
    execSync('python create_archive.py', { stdio: 'inherit' });
  } catch (err) {
    console.error('[postbuild] Archive error:', err.message);
  }
}
