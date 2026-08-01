/**
 * inject_hero_js.cjs  — Step 2: inject the new hero JS into index.html
 * Run AFTER full_rebuild.cjs has already patched the CSS.
 */
const fs = require('fs');

const NEW_HERO_JS = `    /* ─── CINEMATIC HERO IMAGE SEQUENCE ─────────────────────────── */
    /*
     * Bidirectional Scroll-Lock — balicarestaurant.vercel.app style
     * Scroll DOWN  → frames advance  (1 → 233)
     * Scroll UP    → frames reverse  (233 → 1)
     * At 100%      → unlock, reveal site content
     * Scroll up    → re-lock, hide site content
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

      let progress   = 0;
      let targetF    = 0;
      let currentF   = 0;
      let rendered   = -1;
      let unlocked   = false;
      let locked     = true;
      const pool     = new Array(TOTAL).fill(null);
      let firstReady = false;

      /* Resize canvas */
      function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        rendered = -1;
        paint(Math.round(currentF));
      }
      window.addEventListener('resize', resize, { passive: true });

      /* Frame path */
      const frameSrc = i => '/ezgif-frame-' + String(i + 1).padStart(3, '0') + '.jpg';

      /* Smart cinematic fit */
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

      /* rAF lerp render loop */
      (function renderLoop() {
        currentF += (targetF - currentF) * 0.1;
        paint(Math.round(currentF));
        requestAnimationFrame(renderLoop);
      })();

      /* Preload */
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

      for (let i = 0; i < Math.min(15, TOTAL); i++) preload(i, true);
      let nb = 15;
      const batchLoad = () => {
        const end = Math.min(nb + 30, TOTAL);
        for (let i = nb; i < end; i++) preload(i, false);
        nb = end;
        if (nb < TOTAL) 'requestIdleCallback' in window
          ? requestIdleCallback(batchLoad, { timeout: 200 })
          : setTimeout(batchLoad, 80);
      };
      'requestIdleCallback' in window ? requestIdleCallback(batchLoad, { timeout: 300 }) : setTimeout(batchLoad, 300);

      /* ── Progress driver (SPEED controls px-per-frame sensitivity) ── */
      const SPEED = 0.0008;

      function setProgress(delta) {
        progress = Math.max(0, Math.min(1, progress + delta * SPEED));
        targetF  = progress * (TOTAL - 1);

        if (progressBar) progressBar.style.width = (progress * 100) + '%';

        const cur = Math.round(targetF);
        const ahead = Math.min(TOTAL - 1, cur + 40);
        for (let i = Math.max(0, cur - 5); i <= ahead; i += STEP) preload(i, false);

        if (heroParallax) heroParallax.style.transform = 'translateY(' + (progress * 30) + 'px)';

        if (progress >= 0.999 && !unlocked) onComplete();
        if (progress < 0.98  && unlocked && !locked) onRelock();
      }

      /* ── Complete: unlock scroll, show site content ── */
      function onComplete() {
        unlocked = true;
        locked   = false;
        targetF  = TOTAL - 1;
        if (siteContent) siteContent.classList.add('revealed');
        window.removeEventListener('scroll', enforceTop);
        window.scrollTo({ top: outer.offsetTop + outer.offsetHeight, behavior: 'instant' });
      }

      /* ── Re-lock: user scrolled back into hero zone ── */
      function onRelock() {
        locked = true;
        if (siteContent) siteContent.classList.remove('revealed');
        window.scrollTo({ top: 0, behavior: 'instant' });
        window.addEventListener('scroll', enforceTop, { passive: true });
      }

      /* ── Keep window at Y=0 while locked ── */
      function enforceTop() {
        if (locked) window.scrollTo(0, 0);
      }
      window.addEventListener('scroll', enforceTop, { passive: true });

      /* ── After unlock, detect scroll back to top ── */
      window.addEventListener('scroll', () => {
        if (!unlocked || locked) return;
        if (window.scrollY <= 10) onRelock();
      }, { passive: true });

      /* ── Wheel interceptor ── */
      function onWheel(e) {
        if (!locked) return;
        e.preventDefault();
        e.stopPropagation();
        setProgress(e.deltaY);
      }

      /* ── Touch interceptors ── */
      let touchLastY = 0;
      function onTouchStart(e) { touchLastY = e.touches[0].clientY; }
      function onTouchMove(e) {
        if (!locked) return;
        e.preventDefault();
        const y = e.touches[0].clientY;
        setProgress((touchLastY - y) * 1.8);
        touchLastY = y;
      }

      /* ── Keyboard interceptor ── */
      function onKeyDown(e) {
        if (!locked) return;
        const map = { ArrowDown: 80, ArrowUp: -80, PageDown: 400, PageUp: -400, ' ': 250 };
        const d = map[e.key];
        if (d !== undefined) { e.preventDefault(); setProgress(d); }
      }

      window.addEventListener('wheel',      onWheel,      { passive: false, capture: true });
      window.addEventListener('touchstart', onTouchStart, { passive: true,  capture: true });
      window.addEventListener('touchmove',  onTouchMove,  { passive: false, capture: true });
      window.addEventListener('keydown',    onKeyDown,    { capture: true });

      resize();
    })();

  </script>
</body>

</html>`;

let html = fs.readFileSync('index.html', 'utf-8');

const MARKER = '    /* ─── CINEMATIC HERO IMAGE SEQUENCE ─────────────────────────── */';
const idx = html.indexOf(MARKER);
if (idx === -1) { console.error('Marker not found'); process.exit(1); }

html = html.substring(0, idx) + NEW_HERO_JS;
fs.writeFileSync('index.html', html, 'utf-8');

const out = fs.readFileSync('index.html', 'utf-8');
console.log('Lines:', out.split('\n').length, '| Bytes:', out.length);
[
  ['initCinematicHero', out.includes('initCinematicHero')],
  ['setProgress',       out.includes('setProgress')],
  ['onComplete',        out.includes('onComplete')],
  ['onRelock',          out.includes('onRelock')],
  ['onWheel',           out.includes('onWheel')],
  ['onTouchMove',       out.includes('onTouchMove')],
  ['site-content open', out.includes('id="site-content"')],
  ['gap reset CSS',     out.includes('SECTION GAP RESET')],
  ['clean close',       out.trimEnd().endsWith('</html>')],
].forEach(([n,v]) => console.log(v ? '✓' : '✗ FAIL', n));
