/**
 * cinematic_hero_rebuild.cjs
 * Rebuilds the hero section JS to match balicarestaurant.vercel.app behavior exactly:
 * - Body scroll is LOCKED during the hero sequence
 * - A fake scroll listener intercepts wheel/touch events
 * - Progress drives frames smoothly
 * - Only when frame 233 is reached does the lock release
 */
const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf-8');

// ── Replace the entire initCinematicHero function ─────────────────────────────
const OLD_HERO_JS_START = '    /* ─── CINEMATIC HERO IMAGE SEQUENCE ─────────────────────────── */';
const OLD_HERO_JS_END   = '    })();\n\n  </script>';

const startIdx = html.indexOf(OLD_HERO_JS_START);
const endIdx   = html.indexOf(OLD_HERO_JS_END);

if (startIdx === -1 || endIdx === -1) {
  console.error('Cannot find hero JS block. startIdx:', startIdx, 'endIdx:', endIdx);
  process.exit(1);
}

const NEW_HERO_JS = `    /* ─── CINEMATIC HERO IMAGE SEQUENCE ─────────────────────────── */
    /*
     * Behavior: Exactly like balicarestaurant.vercel.app
     * - Hero is sticky / scroll-container is 500vh
     * - Wheel & touch events are intercepted during sequence
     * - Progress 0→1 drives frames 1→233 smoothly
     * - At progress=1, scroll lock releases, site content fades in
     */
    (function initCinematicHero() {
      const outer        = document.getElementById('hero-scroll-outer');
      const canvas       = document.getElementById('hero-canvas');
      const progressBar  = document.getElementById('hero-progress-bar');
      const siteContent  = document.getElementById('site-content');
      const heroParallax = document.querySelector('.hero-parallax');
      if (!canvas || !outer) return;

      const ctx    = canvas.getContext('2d', { alpha: false });
      const TOTAL  = 233;
      const MOBILE = window.innerWidth < 768;
      const STEP   = MOBILE ? 2 : 1;

      /* ── State ── */
      let rendered    = -1;      // last drawn frame index
      let targetF     = 0;       // target frame (0 → TOTAL-1)
      let currentF    = 0;       // lerped render frame
      let progress    = 0;       // 0 → 1 sequence progress
      let done        = false;   // sequence complete flag
      const pool      = new Array(TOTAL).fill(null);
      let ready       = false;   // first frame loaded

      /* ── Resize canvas ── */
      function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        rendered = -1;
        paint(Math.round(currentF));
      }
      window.addEventListener('resize', resize, { passive: true });

      /* ── Frame path ── */
      const src = i => '/ezgif-frame-' + String(i + 1).padStart(3, '0') + '.jpg';

      /* ── Smart cinematic draw: contain × 1.15, max = cover ── */
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
      (function loop() {
        currentF += (targetF - currentF) * 0.1;
        paint(Math.round(currentF));
        requestAnimationFrame(loop);
      })();

      /* ── Preload ── */
      function preload(i, hi) {
        if (pool[i] && pool[i].src) return;
        const img  = new Image();
        img.decoding = hi ? 'sync' : 'async';
        img.onload = () => {
          pool[i] = img;
          if (i === 0 && !ready) {
            ready = true;
            resize();
            canvas.style.opacity = '1';
          }
        };
        pool[i] = img;
        img.src = src(i);
      }

      /* Priority-load first 15 frames, then idle-batch the rest */
      for (let i = 0; i < Math.min(15, TOTAL); i++) preload(i, true);
      let nb = 15;
      const batch = () => {
        const end = Math.min(nb + 30, TOTAL);
        for (let i = nb; i < end; i++) preload(i, false);
        nb = end;
        if (nb < TOTAL) 'requestIdleCallback' in window
          ? requestIdleCallback(batch, { timeout: 200 })
          : setTimeout(batch, 80);
      };
      'requestIdleCallback' in window ? requestIdleCallback(batch, { timeout: 300 }) : setTimeout(batch, 300);

      /* ─────────────────────────────────────────────────────────────
         SCROLL LOCK ENGINE
         Uses the tall outer div (500vh) as a "virtual scroll space".
         We intercept wheel/touch and manually update a virtualScroll
         counter. This drives progress 0→1 which drives frames.
         When progress reaches 1, we release the lock and let the
         browser scroll normally.
      ──────────────────────────────────────────────────────────────── */

      const SCROLL_SPEED     = 1.2;    // px of virtual scroll per wheel delta unit
      const MAX_VIRTUAL      = 1200;   // total virtual scroll range (px)
      let   virtualScroll    = 0;      // accumulator 0 → MAX_VIRTUAL
      let   locked           = true;   // are we intercepting scroll?
      let   touchStartY      = 0;
      let   lastTouchY       = 0;

      /* Update progress from virtualScroll */
      function updateProgress(delta) {
        if (done) return;
        virtualScroll = Math.min(MAX_VIRTUAL, Math.max(0, virtualScroll + delta));
        progress      = virtualScroll / MAX_VIRTUAL;
        targetF       = progress * (TOTAL - 1);

        if (progressBar) progressBar.style.width = (progress * 100) + '%';

        // Pre-load ahead
        const cur   = Math.round(targetF);
        const ahead = Math.min(TOTAL - 1, cur + 40);
        for (let i = Math.max(0, cur - 3); i <= ahead; i += STEP) preload(i, false);

        // Hero text parallax
        if (heroParallax) {
          heroParallax.style.transform = 'translateY(' + (progress * 40) + 'px)';
        }

        // Sequence complete → unlock
        if (progress >= 0.999) {
          complete();
        }
      }

      /* Called once when progress = 1 */
      function complete() {
        if (done) return;
        done   = true;
        locked = false;
        targetF = TOTAL - 1;

        // Reveal site content
        if (siteContent) {
          siteContent.classList.add('revealed');
        }

        // Scroll the window to just past the hero outer div
        // so normal scrolling resumes from there
        const heroBottom = outer.offsetTop + outer.offsetHeight;
        window.scrollTo({ top: heroBottom, behavior: 'instant' });
      }

      /* Wheel event interceptor */
      function onWheel(e) {
        if (!locked) return;
        e.preventDefault();
        e.stopPropagation();
        const delta = e.deltaY * SCROLL_SPEED;
        updateProgress(delta);
      }

      /* Touch event interceptors */
      function onTouchStart(e) {
        touchStartY = e.touches[0].clientY;
        lastTouchY  = touchStartY;
      }
      function onTouchMove(e) {
        if (!locked) return;
        e.preventDefault();
        const y     = e.touches[0].clientY;
        const delta = (lastTouchY - y) * 1.5;   // inverted: swipe up = scroll down
        lastTouchY  = y;
        updateProgress(delta);
      }

      /* Key event interceptor */
      function onKeyDown(e) {
        if (!locked) return;
        const keys = { ArrowDown: 60, ArrowUp: -60, PageDown: 300, PageUp: -300,
                       Space: 200, End: MAX_VIRTUAL, Home: -MAX_VIRTUAL };
        const d = keys[e.key];
        if (d !== undefined) { e.preventDefault(); updateProgress(d); }
      }

      /* Attach all interceptors with { passive: false } so preventDefault works */
      window.addEventListener('wheel',      onWheel,      { passive: false, capture: true });
      window.addEventListener('touchstart', onTouchStart, { passive: true,  capture: true });
      window.addEventListener('touchmove',  onTouchMove,  { passive: false, capture: true });
      window.addEventListener('keydown',    onKeyDown,    { capture: true });

      /* Lock the window at Y=0 while sequence is running */
      function enforceScrollLock() {
        if (locked) {
          window.scrollTo(0, 0);
        }
      }
      window.addEventListener('scroll', enforceScrollLock, { passive: true });

      /* Initial setup */
      resize();
    })();

  </script>
</body>

</html>`;

const before = html.substring(0, startIdx);
const fixed  = before + NEW_HERO_JS;

fs.writeFileSync('index.html', fixed, 'utf-8');

// Validate
const out = fs.readFileSync('index.html', 'utf-8');
console.log('Lines:', out.split('\n').length, '| Bytes:', out.length);
console.log(out.includes('initCinematicHero')   ? '✓ initCinematicHero' : '✗');
console.log(out.includes('virtualScroll')        ? '✓ virtualScroll'     : '✗');
console.log(out.includes('onWheel')              ? '✓ onWheel'           : '✗');
console.log(out.includes('enforceScrollLock')    ? '✓ enforceScrollLock' : '✗');
console.log(out.includes('onSequenceComplete') || out.includes('complete()') ? '✓ complete' : '✗');
console.log(out.trimEnd().endsWith('</html>')    ? '✓ Clean close'       : '✗');
