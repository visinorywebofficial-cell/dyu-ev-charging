const fs = require('fs');
const path = 'index.html';
let content = fs.readFileSync(path, 'utf-8');

// ── Step 1: Find the end of the footer HTML (</footer>)
// and cut everything after it, then reattach clean script block.
// We find the LAST </footer> in the file.

const footerClose = '</footer>';
const lastFooterIdx = content.lastIndexOf(footerClose);
if (lastFooterIdx === -1) {
  console.error('Could not find </footer>');
  process.exit(1);
}

// ── Step 2: Find where site-content open div should be.
// It should be right after <!-- /HERO -->
// Check if it's missing and inject it.
const heroEndComment = '<!-- /HERO -->';
const siteContentOpen = '<div id="site-content">';

if (!content.includes(siteContentOpen)) {
  // Inject site-content open div right after <!-- /HERO -->
  const heroEndIdx = content.indexOf(heroEndComment);
  if (heroEndIdx === -1) {
    console.error('Could not find <!-- /HERO -->');
    process.exit(1);
  }
  const insertPos = heroEndIdx + heroEndComment.length;
  content = content.substring(0, insertPos) +
    '\n\n  <!-- ─── SITE CONTENT — hidden until hero sequence finishes ─── -->\n  <div id="site-content">\n' +
    content.substring(insertPos);
  console.log('Injected #site-content open div');
} else {
  console.log('#site-content open div already present');
}

// ── Step 3: Recalculate footer position after possible injection
const lastFooterIdx2 = content.lastIndexOf(footerClose);
const cutPoint = lastFooterIdx2 + footerClose.length;

// ── Step 4: Build the clean tail
const cleanTail = `

  <!-- Scripts -->
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
        cursorRing.style.width  = '60px';
        cursorRing.style.height = '60px';
        cursorRing.style.backgroundColor = 'rgba(200,169,110,0.1)';
      });
      t.addEventListener('mouseleave', () => {
        cursorRing.style.width  = '40px';
        cursorRing.style.height = '40px';
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

      /* Resize canvas to match viewport */
      function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        displayF = -1;
        drawFrame(Math.round(currentF));
      }
      window.addEventListener('resize', resize, { passive: true });

      /* Frame path */
      const frameSrc = i => '/ezgif-frame-' + String(i + 1).padStart(3, '0') + '.jpg';

      /* Smart Cinematic Fit — contain × 1.15, clamped to cover */
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

      /* Preload single frame */
      function preload(i, priority) {
        if (pool[i] && pool[i].src) return;  // already loading or loaded
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

      /* Preload first 12 immediately */
      for (let i = 0; i < Math.min(12, TOTAL); i++) preload(i, true);

      /* Batch load rest in idle time */
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

      /* rAF render loop — lerps toward targetF */
      (function renderLoop() {
        currentF += (targetF - currentF) * 0.12;
        drawFrame(Math.round(currentF));
        requestAnimationFrame(renderLoop);
      })();

      /* Reveal rest of site after sequence ends */
      function onSequenceComplete() {
        if (sequenceDone) return;
        sequenceDone = true;
        if (siteContent) siteContent.classList.add('revealed');
      }

      /* Scroll → frame mapping */
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

// ── Step 5: Find the old <script> block start to remove it
// We remove everything after </footer> and reattach
const oldScriptStart = content.indexOf('\n\n  <!-- Scripts -->', cutPoint - 10);
let finalCut;
if (oldScriptStart !== -1 && oldScriptStart < cutPoint + 500) {
  finalCut = oldScriptStart;
} else {
  finalCut = cutPoint;
}

const fixed = content.substring(0, finalCut) + cleanTail;
fs.writeFileSync(path, fixed, 'utf-8');

const lines = fixed.split('\n').length;
console.log(`Done. ${lines} lines, ${fixed.length} bytes`);

// Quick validation
if (fixed.includes('id="site-content"')) console.log('✓ #site-content open div present');
if (fixed.includes('</div><!-- /site-content -->') || fixed.match(/site-content/)) console.log('✓ site-content referenced in JS');
if (fixed.includes('initCinematicHero')) console.log('✓ initCinematicHero present');
if (fixed.includes('</html>')) console.log('✓ File closes cleanly');
