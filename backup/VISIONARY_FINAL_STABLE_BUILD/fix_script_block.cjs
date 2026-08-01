const fs = require('fs');
let result = fs.readFileSync('index.html', 'utf-8');

// The CSS, HTML, and site-content close div were all applied correctly.
// Only the script block needs to be replaced.
// Find the old <script> block start and cut everything from there.

const scriptStart = result.indexOf('  <!-- Scripts -->');
if (scriptStart === -1) {
  // Try alternate — find last </footer>
  const footerEnd = result.lastIndexOf('</footer>');
  if (footerEnd === -1) { console.error('Cannot find script anchor'); process.exit(1); }
  result = result.substring(0, footerEnd + '</footer>'.length);
  console.log('Cut after </footer>');
} else {
  result = result.substring(0, scriptStart);
  console.log('Cut before <!-- Scripts -->');
}

const CLEAN_SCRIPT = `  <!-- Scripts -->
  <script>
    /* ─── CUSTOM CURSOR ─────────────────────────── */
    const cursorDot  = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    const hoverTargets = document.querySelectorAll('.hover-target');
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top  = mouseY + 'px';
    });

    (function animateCursor() {
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top  = ringY + 'px';
      requestAnimationFrame(animateCursor);
    })();

    hoverTargets.forEach(t => {
      t.addEventListener('mouseenter', () => {
        cursorRing.style.width = '60px'; cursorRing.style.height = '60px';
        cursorRing.style.backgroundColor = 'rgba(200,169,110,0.1)';
      });
      t.addEventListener('mouseleave', () => {
        cursorRing.style.width = '40px'; cursorRing.style.height = '40px';
        cursorRing.style.backgroundColor = 'transparent';
      });
    });

    /* ─── NAVBAR SCROLL ─────────────────────────── */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    /* ─── SCROLL REVEALS ─────────────────────────── */
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('active'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* ─── CINEMATIC HERO IMAGE SEQUENCE ─────────────────────────── */
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

      let currentF = 0, targetF = 0, displayF = -1;
      let sequenceDone = false;
      const pool = new Array(TOTAL).fill(null);
      let firstFrameReady = false;

      function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        displayF = -1;
        drawFrame(Math.round(currentF));
      }
      window.addEventListener('resize', resize, { passive: true });

      const frameSrc = i => '/ezgif-frame-' + String(i + 1).padStart(3, '0') + '.jpg';

      function drawFrame(idx) {
        idx = Math.max(0, Math.min(TOTAL - 1, Math.round(idx)));
        const img = pool[idx];
        if (!img || !img.complete || !img.naturalWidth) return;
        if (displayF === idx) return;
        displayF = idx;
        const cW = canvas.width, cH = canvas.height;
        const iW = img.naturalWidth, iH = img.naturalHeight;
        const containScale = (cW / cH > iW / iH) ? cH / iH : cW / iW;
        const coverScale   = Math.max(cW / iW, cH / iH);
        const scale = Math.min(containScale * 1.15, coverScale);
        const dW = iW * scale, dH = iH * scale;
        const oX = (cW - dW) / 2, oY = (cH - dH) / 2;
        ctx.fillStyle = '#0A0A0A';
        ctx.fillRect(0, 0, cW, cH);
        ctx.drawImage(img, oX, oY, dW, dH);
      }

      function preload(i, priority) {
        if (pool[i] && pool[i].src) return;
        const img = new Image();
        img.decoding = priority ? 'sync' : 'async';
        img.onload = () => {
          pool[i] = img;
          if (i === 0 && !firstFrameReady) {
            firstFrameReady = true;
            resize();
            canvas.style.opacity = '1';
          }
        };
        pool[i] = img;
        img.src = frameSrc(i);
      }

      for (let i = 0; i < Math.min(12, TOTAL); i++) preload(i, true);

      let nextBatch = 12;
      function loadNextBatch() {
        const end = Math.min(nextBatch + 30, TOTAL);
        for (let i = nextBatch; i < end; i++) preload(i, false);
        nextBatch = end;
        if (nextBatch < TOTAL) {
          if ('requestIdleCallback' in window) requestIdleCallback(loadNextBatch, { timeout: 200 });
          else setTimeout(loadNextBatch, 100);
        }
      }
      if ('requestIdleCallback' in window) requestIdleCallback(loadNextBatch, { timeout: 300 });
      else setTimeout(loadNextBatch, 300);

      (function renderLoop() {
        currentF += (targetF - currentF) * 0.12;
        drawFrame(Math.round(currentF));
        requestAnimationFrame(renderLoop);
      })();

      function onSequenceComplete() {
        if (sequenceDone) return;
        sequenceDone = true;
        if (siteContent) siteContent.classList.add('revealed');
      }

      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (outer) {
          const outerTop   = outer.offsetTop;
          const scrollable = outer.offsetHeight - window.innerHeight;
          const scrolled   = Math.max(0, scrollY - outerTop);
          const progress   = Math.min(1, scrolled / scrollable);
          targetF = progress * (TOTAL - 1);
          if (progressBar) progressBar.style.width = (progress * 100) + '%';
          const cur = Math.round(targetF);
          const ahead = Math.min(TOTAL - 1, cur + 30);
          for (let i = Math.max(0, cur - 5); i <= ahead; i += STEP) preload(i, false);
          if (progress >= 0.98) onSequenceComplete();
        }
        if (heroParallax && scrollY < window.innerHeight) {
          heroParallax.style.transform = \`translateY(\${scrollY * 0.12}px)\`;
        }
      }, { passive: true });

      resize();
      window.dispatchEvent(new Event('scroll'));
    })();

  </script>
</body>

</html>`;

result = result + '\n' + CLEAN_SCRIPT;
fs.writeFileSync('index.html', result, 'utf-8');

const lines = result.split('\n').length;
console.log(`\nDone: ${lines} lines, ${result.length} bytes`);
console.log(result.includes('hero-scroll-outer')           ? '✓ hero-scroll-outer' : '✗ MISSING hero-scroll-outer');
console.log(result.includes('id="site-content"')           ? '✓ site-content open' : '✗ MISSING site-content open');
console.log(result.includes('</div><!-- /site-content -->') ? '✓ site-content close': '✗ MISSING site-content close');
console.log(result.includes('initCinematicHero')           ? '✓ initCinematicHero' : '✗ MISSING initCinematicHero');
console.log(result.includes('hero-progress-bar')           ? '✓ progress bar'      : '✗ MISSING progress bar');
console.log(result.trimEnd().endsWith('</html>')           ? '✓ Clean close'       : '✗ Bad file end');
