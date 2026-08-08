const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const REPO = __dirname
const OUT = path.join(REPO, 'out')
const SERVER_APP = path.join(REPO, '.next', 'server', 'app')
const STATIC = path.join(REPO, '.next', 'static')
const PUBLIC = path.join(REPO, 'public')

// Hostinger web root targets
const TARGETS = [
  '/home/u823415094/domains/dyu.co.in/public_html',
  '/home/u823415094/domains/dyu.co.in/hbuilds/versions/019fd092-fbc3-70ba-84c8-51fe83666a70/public_html'
]

const HTACCESS = `Options -Indexes\n<IfModule mod_rewrite.c>\n  RewriteEngine On\n  RewriteBase /\n  RewriteCond %{REQUEST_FILENAME} !-f\n  RewriteCond %{REQUEST_FILENAME} !-d\n  RewriteRule ^ index.html [L]\n</IfModule>\n`

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name)
    const d = path.join(dest, entry.name)
    if (entry.isDirectory()) copyDir(s, d)
    else fs.copyFileSync(s, d)
  }
}

function processHtmlFiles(dir, relPath) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (!entry.name.startsWith('__next.') && entry.name !== 'page') {
        processHtmlFiles(fullPath, path.join(relPath, entry.name))
      }
    } else if (entry.name.endsWith('.html')) {
      const baseName = entry.name.replace('.html', '')
      if (baseName === 'index') {
        const dest = path.join(OUT, relPath, 'index.html')
        fs.mkdirSync(path.dirname(dest), { recursive: true })
        fs.copyFileSync(fullPath, dest)
      } else if (baseName === '_not-found') {
        fs.copyFileSync(fullPath, path.join(OUT, '404.html'))
      } else if (baseName !== '_global-error') {
        const routeDir = path.join(OUT, relPath, baseName)
        fs.mkdirSync(routeDir, { recursive: true })
        fs.copyFileSync(fullPath, path.join(routeDir, 'index.html'))
      }
    }
  }
}

// Step 1: Assemble out/ from .next build artifacts
if (fs.existsSync(OUT)) fs.rmSync(OUT, { recursive: true, force: true })
fs.mkdirSync(OUT, { recursive: true })
if (fs.existsSync(PUBLIC)) copyDir(PUBLIC, OUT)
if (fs.existsSync(STATIC)) copyDir(STATIC, path.join(OUT, '_next', 'static'))
if (fs.existsSync(SERVER_APP)) processHtmlFiles(SERVER_APP, '')
console.log('[postbuild] out/ assembled.')

// Also handle distDir: site_build case
const SITE_BUILD = path.join(REPO, 'site_build')
let deployFrom = OUT
if (!fs.existsSync(path.join(OUT, 'index.html')) && fs.existsSync(path.join(SITE_BUILD, 'index.html'))) {
  deployFrom = SITE_BUILD
  console.log('[postbuild] Using site_build/ as deploy source.')
}

if (!fs.existsSync(path.join(deployFrom, 'index.html'))) {
  console.error('[postbuild] ERROR: No index.html found!')
  process.exit(0) // Don't fail hard — Hostinger will still copy what it finds
}
console.log('[postbuild] index.html found at:', deployFrom)

// Step 2: Deploy to all Hostinger web roots
for (const target of TARGETS) {
  try {
    if (!fs.existsSync(target)) fs.mkdirSync(target, { recursive: true })
    copyDir(deployFrom, target)
    fs.writeFileSync(path.join(target, '.htaccess'), HTACCESS)
    try { execSync(`find ${target} -type d -exec chmod 755 {} +`, { stdio: 'pipe' }) } catch (e) {}
    try { execSync(`find ${target} -type f -exec chmod 644 {} +`, { stdio: 'pipe' }) } catch (e) {}
    console.log('[postbuild] Deployed to:', target)
  } catch (err) {
    console.error('[postbuild] Deploy error for', target, ':', err.message)
  }
}
console.log('[postbuild] DONE!')
