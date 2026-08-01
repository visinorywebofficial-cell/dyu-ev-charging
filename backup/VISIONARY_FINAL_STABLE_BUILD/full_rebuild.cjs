/**
 * full_rebuild.cjs
 * 1. Removes gaps between sections (no margin between hero and next section)
 * 2. Implements perfect bidirectional scroll-lock cinematic hero
 *    — like balicarestaurant.vercel.app
 */
const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

/* ══════════════════════════════════════════════════════════════
   STEP 1 — FIX SECTION GAPS
   The #site-content div must have no top margin.
   All section padding is already defined in CSS.
   We also ensure .cinematic-video-section has no top gap.
══════════════════════════════════════════════════════════════ */

// Remove any margin/padding gap on site-content itself
if (html.includes('#site-content {')) {
  html = html.replace(
    /#site-content\s*\{[^}]+\}/,
    `#site-content {
      opacity: 0;
      transition: opacity 0.8s ease;
      margin-top: 0;
      padding-top: 0;
    }`
  );
  console.log('✓ site-content gap removed');
}

// Remove gap between hero-scroll-outer and site-content
// by ensuring hero-scroll-outer has no bottom margin
html = html.replace(
  /\.hero-scroll-outer\s*\{([^}]+)\}/,
  (match, body) => {
    if (!body.includes('margin')) body += '\n      margin: 0;\n      padding: 0;';
    return `.hero-scroll-outer {${body}}`;
  }
);

// Add section gap-reset CSS right after the #site-content CSS block
const GAP_RESET_CSS = `
    /* ─── SECTION GAP RESET ─────────────────────────── */
    #site-content > section:first-child,
    #site-content > div:first-child {
      margin-top: 0 !important;
      padding-top: clamp(60px, 8vw, 100px);
    }
    /* Collapse any accidental gap between hero outer and site content */
    .hero-scroll-outer + #site-content {
      margin-top: 0;
    }`;

if (!html.includes('SECTION GAP RESET')) {
  html = html.replace(
    '/* ─── ANIMATIONS ─────────────────────────── */',
    GAP_RESET_CSS + '\n\n    /* ─── ANIMATIONS ─────────────────────────── */'
  );
  console.log('✓ Section gap reset CSS injected');
}

/* ══════════════════════════════════════════════════════════════
   STEP 2 — REPLACE HERO JS WITH BIDIRECTIONAL SCROLL-LOCK
   Exact behavior: balicarestaurant.vercel.app
   - Scroll down → frames advance 1→233
   - Scroll up → frames reverse 233→1
   - At frame 233 → site content revealed, lock released
   - Scroll back up into hero zone → re-lock, hide content
══════════════════════════════════════════════════════════════ */

const JS_MARKER = '    /* ─── CINEMATIC HERO IMAGE SEQUENCE ─────────────────────────── */';
const markerIdx = html.indexOf(JS_MARKER);
if (markerIdx === -1) { console.error('JS marker not found'); process.exit(1); }

// Cut everything from the marker to end, replace with new JS
html = html.substring(0, markerIdx) + NEW_HERO_JS;

const NEW_HERO_JS = `    /* ─── CINEMATIC HERO IMAGE SEQUENCE ─────────────────────────── */
    /*
     * Bidirectional Scroll-Lock Hero
     * ─────────────────────────────
     * Inspired by: balicarestaurant.vercel.app
     *
     * HOW IT WORKS:
     * ┌─────────────────────────────────────────────────────────┐
     * │  A virtual progress value (0 → 1) drives playback.     │
     * │  Wheel / touch / key events are captured and convert    │
     * │  raw delta into progress delta.                         │
     * │                                                         │
     * │  Scroll DOWN → progress increases → frames advance      │
     * │  Scroll UP   → progress decreases → frames reverse      │
     * │                                                         │
     * │  At progress = 1 → unlock, reveal site content         │
     * │  User scrolls back up into hero zone → re-lock          │
     * └─────────────────────────────────────────────────────────┘
     */
    (function initCinematicHero() {

      /* ── DOM refs ── */
      const outer        = document.getElementById('hero-scroll-outer');
      const canvas       = document.getElementById('hero-canvas');
      const progressBar  = document.getElementById('hero-progress-bar');
      const siteContent  = document.getElementById('site-content');
      const heroParallax = document.querySelector('.hero-parallax');
      if (!canvas || !outer) return;

      /* ── Canvas context ── */
      const ctx    = canvas.getContext('2d', { alpha: false });
      const TOTAL  = 233;
      const MOBILE = window.innerWidth < 768;
      const STEP   = MOBILE ? 2 : 1;

      /* ── State ── */
      let progress    = 0;          // 0.0 → 1.0 (master timeline)
      let targetF     = 0;          // target frame index (0 → TOTAL-1)
      let currentF    = 0;          // lerped render frame
      let rendered    = -1;         // last actually-drawn frame
      let unlocked    = false;      // has user completed sequence at least once?
      let locked      = true;       // is scroll currently intercepted?
      const pool      = new Array(TOTAL).fill(null);
      let firstReady  = false;

      /* ── Resize canvas to viewport ── */
      function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        rendered = -1;
        paint(Math.round(currentF));
      }
      window.addEventListener('resize', resize, { passive: true });

      /* ── Frame path ── */
      const frameSrc = i => '/ezgif-frame-' + String(i + 1).padStart(3, '0') + '.jpg';

      /* ── Smart cinematic fit: contain × 1.15, max = cover ── */
      function paint(idx) {
        idx = Math.max(0, Math.min(TOTAL - 1, Math.round(idx)));
        const img = pool[idx];
        if (!img || !img.complete || !img.naturalWidth) return;
        if (rendered === idx) return;
        rendered = idx;

        const cW = canvas.width, cH = canvas.height;
        const iW = img.naturalWidth, iH = img.naturalHeight;
        const containS = (cW / cH > iW / iH) ? cH / iH : cW / iW;
        const coverS   = Math.max(cW / iW, cH / iH);
        const scale    = Math.min(containS * 1.15, coverS);
        const dW = iW * scale, dH = iH * scale;
        const oX = (cW - dW) / 2, oY = (cH - dH) / 2;

        ctx.fillStyle = '#0A0A0A';
        ctx.fillRect(0, 0, cW, cH);
        ctx.drawImage(img, oX, oY, dW, dH);
      }

      /* ── rAF lerp render loop ── */
      (function renderLoop() {
        currentF += (targetF - currentF) * 0.1;
        paint(Math.round(currentF));
        requestAnimationFrame(renderLoop);
      })();

      /* ── Preload ── */
      function preload(i, hi) {
        if (pool[i] && pool[i].src) return;
        const img    = new Image();
        img.decoding = hi ? 'sync' : 'async';
        img.onload   = () => {
          pool[i] = img;
          if (i === 0 && !firstReady) {
            firstReady = true;
            resize();
            canvas.style.opacity = '1';
          }
        };
        pool[i] = img;
        img.src = frameSrc(i);
      }

      /* Load first 15 immediately */
      for (let i = 0; i < Math.min(15, TOTAL); i++) preload(i, true);

      /* Batch-load rest during idle time */
      let nb = 15;
      const batchLoad = () => {
        const end = Math.min(nb + 30, TOTAL);
        for (let i = nb; i < end; i++) preload(i, false);
        nb = end;
        if (nb < TOTAL) 'requestIdleCallback' in window
          ? requestIdleCallback(batchLoad, { timeout: 200 })
          : setTimeout(batchLoad, 80);
      };
      'requestIdleCallback' in window
        ? requestIdleCallback(batchLoad, { timeout: 300 })
        : setTimeout(batchLoad, 300);

      /* ─────────────────────────────────────────────────
         PROGRESS DRIVER
         All scroll input routes through setProgress().
         progress  0 → 1  maps to  frame 0 → TOTAL-1
      ───────────────────────────────────────────────── */
      const SPEED = 0.0008;   // how much progress per px of scroll delta

      function setProgress(delta) {
        progress = Math.max(0, Math.min(1, progress + delta * SPEED));
        targetF  = progress * (TOTAL - 1);

        // Update progress bar
        if (progressBar) progressBar.style.width = (progress * 100) + '%';

        // Preload frames around current position
        const cur   = Math.round(targetF);
        const ahead = Math.min(TOTAL - 1, cur + 40);
        for (let i = Math.max(0, cur - 5); i <= ahead; i += STEP) preload(i, false);

        // Hero text gentle parallax
        if (heroParallax) {
          heroParallax.style.transform = 'translateY(' + (progress * 30) + 'px)';
        }

        // Check completion (forward)
        if (progress >= 0.999 && !unlocked) {
          onComplete();
        }

        // Check reverse re-lock
        if (progress < 0.999 && unlocked && !locked) {
          onRelock();
        }
      }

      /* ─────────────────────────────────────────────────
         COMPLETION — unlock scroll, show site content
      ───────────────────────────────────────────────── */
      function onComplete() {
        unlocked = true;
        locked   = false;
        targetF  = TOTAL - 1;
        progress = 1;

        if (siteContent) siteContent.classList.add('revealed');

        // Scroll the page past the hero outer div
        const skipTo = outer.offsetTop + outer.offsetHeight;
        window.removeEventListener('scroll', enforceTop, { passive: true });
        window.scrollTo({ top: skipTo, behavior: 'instant' });
      }

      /* ─────────────────────────────────────────────────
         RE-LOCK — user scrolled back up into hero zone
      ───────────────────────────────────────────────── */
      function onRelock() {
        locked = true;
        if (siteContent) siteContent.classList.remove('revealed');
        window.scrollTo({ top: 0, behavior: 'instant' });
        window.addEventListener('scroll', enforceTop, { passive: true });
      }

      /* ─────────────────────────────────────────────────
         ENFORCE SCROLL POSITION
         While locked, keep window pinned at Y=0
      ───────────────────────────────────────────────── */
      function enforceTop() {
        if (locked) window.scrollTo(0, 0);
      }
      window.addEventListener('scroll', enforceTop, { passive: true });

      /* ─────────────────────────────────────────────────
         DETECT USER SCROLLING BACK INTO HERO ZONE
         After unlock, listen for the user scrolling
         back up to y=0 (hero territory)
      ───────────────────────────────────────────────── */
      function onNativeScroll() {
        if (!unlocked || locked) return;
        // If user has scrolled back to the very top, re-engage lock
        if (window.scrollY <= 0) {
          onRelock();
        }
      }
      window.addEventListener('scroll', onNativeScroll, { passive: true });

      /* ─────────────────────────────────────────────────
         INPUT INTERCEPTORS
         Wheel, touch, keyboard
      ───────────────────────────────────────────────── */
      let touchStartY = 0;
      let touchLastY  = 0;

      function onWheel(e) {
        if (!locked) return;
        e.preventDefault();
        e.stopPropagation();
        setProgress(e.deltaY);
      }

      function onTouchStart(e) {
        touchStartY = e.touches[0].clientY;
        touchLastY  = touchStartY;
      }

      function onTouchMove(e) {
        if (!locked) return;
        e.preventDefault();
        const y     = e.touches[0].clientY;
        const delta = (touchLastY - y) * 1.8;
        touchLastY  = y;
        setProgress(delta);
      }

      function onKeyDown(e) {
        if (!locked) return;
        const map = {
          ArrowDown: 80,  ArrowUp: -80,
          PageDown: 400,  PageUp: -400,
          ' ': 250,       End: 99999,  Home: -99999
        };
        const d = map[e.key];
        if (d !== undefined) { e.preventDefault(); setProgress(d); }
      }

      /* Attach with capture so we get them before the browser */
      window.addEventListener('wheel',      onWheel,      { passive: false, capture: true });
      window.addEventListener('touchstart', onTouchStart, { passive: true,  capture: true });
      window.addEventListener('touchmove',  onTouchMove,  { passive: false, capture: true });
      window.addEventListener('keydown',    onKeyDown,    { capture: true });

      /* Initial canvas render */
      resize();

    })();

  </script>
</body>

</html>`;

fs.writeFileSync('index.html', html, 'utf-8');

// Validate
const out = fs.readFileSync('index.html', 'utf-8');
console.log('\\nLines:', out.split('\\n').length, '| Bytes:', out.length);
[
  ['initCinematicHero',  out.includes('initCinematicHero')],
  ['bidirectional',      out.includes('onRelock')],
  ['wheel interceptor',  out.includes('onWheel')],
  ['touch interceptor',  out.includes('onTouchMove')],
  ['setProgress',        out.includes('setProgress')],
  ['site-content open',  out.includes('id="site-content"')],
  ['gap reset CSS',      out.includes('SECTION GAP RESET')],
  ['clean close',        out.trimEnd().endsWith('</html>')],
].forEach(([n, v]) => console.log(v ? '✓' : '✗ FAIL', n));
