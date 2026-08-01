/**
 * rebuild_hero.cjs
 * Atomically applies the cinematic scroll-hero changes to index.html.
 * Uses index_backup_broken.html as source of truth if index.html is corrupted.
 */
const fs = require('fs');

// Read source — prefer backup as it's the clean May 7 version
let src;
if (fs.existsSync('index_backup_broken.html')) {
  src = fs.readFileSync('index_backup_broken.html', 'utf-8');
  console.log('Using index_backup_broken.html as source');
} else {
  src = fs.readFileSync('index.html', 'utf-8');
  console.log('Using index.html as source');
}

// ── 1. Fix the CSS: Replace hero section CSS block ──────────────────────────
const OLD_HERO_CSS = `.scroll-container {
      height: 300vh;
      position: relative;
    }

    .hero {
      position: sticky;
      top: 0;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    #hero-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 1;
      opacity: 0;
      transition: opacity 1s var(--ease-cinematic);
    }

    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to bottom, rgba(10, 10, 10, 0.3) 0%, rgba(10, 10, 10, 0.8) 80%, rgba(10, 10, 10, 1) 100%);
      z-index: 2;
    }

    .hero-content {
      position: relative;
      z-index: 3;
      text-align: center;
      max-width: 800px;
      padding: 60px;
      background: var(--bg-glass);
      border: 1px solid var(--border-glass);
      backdrop-filter: blur(16px);
      border-radius: 24px;
      box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
    }

    .hero h1 {
      font-size: clamp(2rem, 5vw, 4rem);
      margin-bottom: 24px;
      background: linear-gradient(180deg, #FFFFFF 0%, #B0B0B0 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero p {
      font-size: clamp(1.1rem, 2vw, 1.4rem);
      color: var(--text-secondary);
      margin-bottom: 40px;
      max-width: 600px;
      margin-inline: auto;
    }

    .hero-btns {
      display: flex;
      gap: 16px;
      justify-content: center;
    }`;

const NEW_HERO_CSS = `/* Tall outer scroll container — user scrolls THROUGH this */
    .hero-scroll-outer {
      position: relative;
      height: 500vh;
    }

    /* Sticky inner panel — stays fixed while outer scrolls */
    .hero {
      position: sticky;
      top: 0;
      height: 100vh;
      width: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Canvas fills the hero fullscreen */
    #hero-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      opacity: 0;
      transition: opacity 0.8s ease;
    }

    /* Cinematic gradient overlay */
    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom,
        rgba(10,10,10,0.25) 0%,
        rgba(10,10,10,0.10) 30%,
        rgba(10,10,10,0.10) 60%,
        rgba(10,10,10,0.85) 90%,
        rgba(10,10,10,1.00) 100%);
      z-index: 2;
      pointer-events: none;
    }

    /* Vignette — darkens edges */
    .hero-vignette {
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%);
      z-index: 2;
      pointer-events: none;
    }

    /* Hero text sits above overlays */
    .hero-content {
      position: relative;
      z-index: 3;
      text-align: center;
      max-width: 820px;
      padding: 60px;
      background: var(--bg-glass);
      border: 1px solid var(--border-glass);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-radius: 24px;
      box-shadow: 0 40px 100px rgba(0,0,0,0.55);
    }

    /* Gold progress bar at bottom */
    .hero-progress-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      width: 0%;
      background: linear-gradient(to right, var(--accent-primary), #E6C98A);
      z-index: 10;
      transition: width 0.05s linear;
    }

    .hero h1 {
      font-size: clamp(2rem, 5vw, 4rem);
      margin-bottom: 24px;
      background: linear-gradient(180deg, #FFFFFF 0%, #B0B0B0 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero p {
      font-size: clamp(1.1rem, 2vw, 1.4rem);
      color: var(--text-secondary);
      margin-bottom: 40px;
      max-width: 600px;
      margin-inline: auto;
    }

    .hero-btns {
      display: flex;
      gap: 16px;
      justify-content: center;
    }

    /* Site content hidden until hero sequence finishes */
    #site-content {
      opacity: 0;
      transition: opacity 0.8s ease;
    }
    #site-content.revealed {
      opacity: 1;
    }`;

if (!src.includes(OLD_HERO_CSS.substring(0, 50))) {
  console.error('Cannot find old hero CSS block — check backup file content');
  // Try a shorter unique substring
}

let result = src.replace(OLD_HERO_CSS, NEW_HERO_CSS);
if (result === src) {
  console.warn('Hero CSS not replaced — trying partial match');
  // Use a different unique anchor
  const anchor = '/* ─── HERO SECTION ─────────────────────────── */';
  const animAnchor = '/* ─── ANIMATIONS ─────────────────────────── */';
  const cssStart = result.indexOf(anchor);
  const cssEnd = result.indexOf(animAnchor);
  if (cssStart !== -1 && cssEnd !== -1) {
    result = result.substring(0, cssStart) + '/* ─── HERO SECTION ─────────────────────────── */\n    ' + NEW_HERO_CSS + '\n\n    ' + result.substring(cssEnd);
    console.log('Hero CSS replaced via anchor method');
  }
} else {
  console.log('✓ Hero CSS replaced');
}

// ── 2. Fix the HTML: Replace old hero HTML block ─────────────────────────────
const OLD_HERO_HTML = `  <!-- Hero Section -->
  <div class="scroll-container" id="hero-scroll-container">
    <section class="hero">
      <video autoplay muted loop playsinline preload="auto" class="absolute inset-0 w-full h-full object-cover">
  <source src="/videos/hero-video.mp4" type="video/mp4" />
</video>
      <div class="hero-overlay"></div>

      <div class="container hero-parallax">
        <div class="hero-content reveal">
          <h1 class="reveal stagger-1">Visinory Web</h1>
          <h2 class="reveal stagger-2"
            style="font-size: clamp(1.5rem, 3vw, 2.5rem); margin-bottom: 16px; background: linear-gradient(180deg, #FFFFFF 0%, #B0B0B0 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            Websites That Feel Alive</h2>
          <p class="reveal stagger-3">We Build Digital Experiences That Convert</p>
          <div class="hero-btns reveal stagger-4">
            <a href="#contact" class="btn btn-primary hover-target">Book a Demo</a>
            <a href="#work" class="btn btn-secondary hover-target">View Work</a>
          </div>
        </div>
      </div>
    </section>
  </div>`;

const NEW_HERO_HTML = `  <!-- ─── HERO — Cinematic Scroll Sequence ─────────────────── -->
  <div class="hero-scroll-outer" id="hero-scroll-outer">
    <section class="hero" id="hero">

      <!-- Layer 1: Image Sequence Canvas -->
      <canvas id="hero-canvas"></canvas>

      <!-- Layer 2: Cinematic dark gradient -->
      <div class="hero-overlay"></div>

      <!-- Layer 2b: Vignette -->
      <div class="hero-vignette"></div>

      <!-- Layer 3: Text Content -->
      <div class="container hero-parallax">
        <div class="hero-content">
          <h1>Visinory Web</h1>
          <h2 style="font-size:clamp(1.5rem,3vw,2.5rem);margin-bottom:16px;background:linear-gradient(180deg,#FFFFFF 0%,#B0B0B0 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">
            Websites That Feel Alive</h2>
          <p>We Build Digital Experiences That Convert</p>
          <div class="hero-btns">
            <a href="#contact" class="btn btn-primary hover-target">Book a Demo</a>
            <a href="#work" class="btn btn-secondary hover-target">View Work</a>
          </div>
        </div>
      </div>

      <!-- Scroll progress bar -->
      <div class="hero-progress-bar" id="hero-progress-bar"></div>

    </section>
  </div>
  <!-- /HERO -->

  <!-- ─── SITE CONTENT — hidden until hero sequence finishes ─── -->
  <div id="site-content">`;

result = result.replace(OLD_HERO_HTML, NEW_HERO_HTML);
if (result === src || !result.includes('hero-scroll-outer')) {
  console.warn('Hero HTML block not matched exactly — trying video-based match');
  // Find via the video tag which is unique
  const videoStart = result.indexOf('  <!-- Hero Section -->');
  const videoEnd = result.indexOf('\n\n  <!-- Cinematic Video');
  if (videoStart !== -1 && videoEnd !== -1) {
    result = result.substring(0, videoStart) + NEW_HERO_HTML + result.substring(videoEnd);
    console.log('Hero HTML replaced via video anchor');
  }
} else {
  console.log('✓ Hero HTML replaced');
}

// ── 3. Add closing </div> for site-content before </footer> ──────────────────
// Find the last </footer> and insert closing div before it
const footerMatch = result.lastIndexOf('  </footer>');
if (footerMatch !== -1 && !result.includes('</div><!-- /site-content -->')) {
  result = result.substring(0, footerMatch) + 
    '\n  </div><!-- /site-content -->\n\n  ' +
    result.substring(footerMatch + 2);  // +2 to skip the leading spaces we already account for
  console.log('✓ Added </div><!-- /site-content --> before </footer>');
} else if (result.includes('</div><!-- /site-content -->')) {
  console.log('✓ site-content close div already present');
}

// ── 4. Replace entire old <script> block with clean version ──────────────────
const oldScriptStart = result.indexOf('  <!-- Scripts -->\n  <script>');
const oldScriptEnd   = result.lastIndexOf('</html>');

if (oldScriptStart !== -1 && oldScriptEnd !== -1) {
  result = result.substring(0, oldScriptStart) + CLEAN_SCRIPT;
  console.log('✓ Script block replaced');
} else {
  // Fallback: replace from last </footer> + closing div
  const footerEnd = result.lastIndexOf('</footer>');
  result = result.substring(0, footerEnd + '</footer>'.length) + '\n' + CLEAN_SCRIPT;
  console.log('✓ Script block replaced via footer fallback');
}

const CLEAN_SCRIPT = `
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

fs.writeFileSync('index.html', result, 'utf-8');
const lines = result.split('\n').length;
console.log(`\nFinal file: ${lines} lines, ${result.length} bytes`);
console.log(result.includes('hero-scroll-outer')          ? '✓ hero-scroll-outer' : '✗ hero-scroll-outer MISSING');
console.log(result.includes('id="site-content"')          ? '✓ site-content open' : '✗ site-content open MISSING');
console.log(result.includes('</div><!-- /site-content -->') ? '✓ site-content close' : '✗ site-content close MISSING');
console.log(result.includes('initCinematicHero')           ? '✓ initCinematicHero' : '✗ initCinematicHero MISSING');
console.log(result.includes('hero-progress-bar')           ? '✓ progress bar' : '✗ progress bar MISSING');
console.log(result.endsWith('</html>')                     ? '✓ Clean close' : '✗ Bad file end');
