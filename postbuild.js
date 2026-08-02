const fs = require('fs')
const path = require('path')

const OUT = path.join(__dirname, 'out')
const SERVER_APP = path.join(__dirname, '.next', 'server', 'app')
const STATIC = path.join(__dirname, '.next', 'static')
const PUBLIC = path.join(__dirname, 'public')

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

// 1. Clean out/ folder
if (fs.existsSync(OUT)) fs.rmSync(OUT, { recursive: true, force: true })
fs.mkdirSync(OUT, { recursive: true })
console.log('[postbuild] Created out/ directory')

// 2. Copy public/ assets into out/ (images, videos, 3D models, etc.)
if (fs.existsSync(PUBLIC)) {
  copyDir(PUBLIC, OUT)
  console.log('[postbuild] Copied public/ assets into out/')
}

// 3. Copy _next/static into out/_next/static (CSS, JS chunks)
if (fs.existsSync(STATIC)) {
  copyDir(STATIC, path.join(OUT, '_next', 'static'))
  console.log('[postbuild] Copied .next/static/ into out/_next/static/')
}

// 4. Copy HTML files from .next/server/app/ into out/ with proper structure
//    - index.html -> out/index.html
//    - about-us.html -> out/about-us/index.html
//    - _not-found.html -> out/404.html
//    - ev-charging-software/csms.html -> out/ev-charging-software/csms/index.html
function processHtmlFiles(dir, relPath) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      // Only recurse into dirs that might contain HTML (skip page/, __next.*, favicon.ico)
      if (!entry.name.startsWith('__next.') && entry.name !== 'page' && entry.name !== 'favicon.ico') {
        processHtmlFiles(fullPath, path.join(relPath, entry.name))
      }
    } else if (entry.name.endsWith('.html')) {
      const baseName = entry.name.replace('.html', '')

      if (baseName === 'index') {
        // Root index.html
        const dest = path.join(OUT, relPath, 'index.html')
        fs.mkdirSync(path.dirname(dest), { recursive: true })
        fs.copyFileSync(fullPath, dest)
        console.log(`[postbuild] ${relPath || '/'} -> out/${path.join(relPath, 'index.html')}`)
      } else if (baseName === '_not-found') {
        // 404 page
        fs.copyFileSync(fullPath, path.join(OUT, '404.html'))
        console.log('[postbuild] _not-found.html -> out/404.html')
      } else if (baseName === '_global-error') {
        // Skip internal error page
        continue
      } else {
        // Route page: about-us.html -> out/about-us/index.html
        const routeDir = path.join(OUT, relPath, baseName)
        fs.mkdirSync(routeDir, { recursive: true })
        fs.copyFileSync(fullPath, path.join(routeDir, 'index.html'))
        console.log(`[postbuild] ${baseName}.html -> out/${path.join(relPath, baseName, 'index.html')}`)
      }
    }
  }
}

processHtmlFiles(SERVER_APP, '')
console.log('[postbuild] DONE! out/ folder is ready for static hosting.')
