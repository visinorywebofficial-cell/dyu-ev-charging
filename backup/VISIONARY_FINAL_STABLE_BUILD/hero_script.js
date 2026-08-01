/* ─── CUSTOM CURSOR ─────────────────────────── */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    const hoverTargets = document.querySelectorAll('.hover-target');
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top  = `${mouseY}px`;
    });

    (function animateCursor() {
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top  = `${ringY}px`;
      requestAnimationFrame(animateCursor);
    })();

    hoverTargets.forEach(t => {
      t.addEventListener('mouseenter', () => { cursorRing.style.width = '60px'; cursorRing.style.height = '60px'; cursorRing.style.backgroundColor = 'rgba(200,169,110,0.1)'; });
      t.addEventListener('mouseleave', () => { cursorRing.style.width = '40px'; cursorRing.style.height = '40px'; cursorRing.style.backgroundColor = 'transparent'; });
    });

    /* ─── NAVBAR SCROLL ─────────────────────────── */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => { navbar.classList.toggle('scrolled', window.scrollY > 50); }, { passive: true });

    /* ─── SCROLL REVEALS ─────────────────────────── */
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); obs.unobserve(e.target); } });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* ─── PREMIUM CANVAS IMAGE SEQUENCE (Apple-style) ─── */
    (function initHeroCanvas() {
      const canvas = document.getElementById('hero-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: false });
      const TOTAL = 233;
      const isMobile = window.innerWidth < 768;
      const STEP = isMobile ? 2 : 1;

      function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        drawFrame(Math.round(currentF));
      }
      window.addEventListener('resize', resize, { passive: true });

      let currentF = 0;
      let targetF  = 0;
      let displayF = -1;
      const pool = new Array(TOTAL);
      let firstFrameReady = false;

      function frameSrc(i) {
        return '/ezgif-frame-' + String(i + 1).padStart(3, '0') + '.jpg';
      }

      function drawFrame(idx) {
        idx = Math.max(0, Math.min(TOTAL - 1, Math.round(idx)));
        const img = pool[idx];
        if (!img || !img.complete || !img.naturalWidth) return;
        if (displayF === idx) return;
        displayF = idx;
        const cW = canvas.width, cH = canvas.height;
        const iR = img.naturalWidth / img.naturalHeight;
        const cR = cW / cH;
        let dW, dH, oX = 0, oY = 0;
        if (cR > iR) { dW = cW; dH = cW / iR; oY = (cH - dH) / 2; }
        else         { dH = cH; dW = cH * iR; oX = (cW - dW) / 2; }
        ctx.drawImage(img, oX, oY, dW, dH);
      }

      function preload(i, priority) {
        if (pool[i] && pool[i].complete) return;
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
        img.src = frameSrc(i);
        if (!pool[i]) pool[i] = img;
      }

      for (let i = 0; i < Math.min(10, TOTAL); i++) preload(i, true);

      let nextBatch = 10;
      function loadNextBatch() {
        const end = Math.min(nextBatch + 25, TOTAL);
        for (let i = nextBatch; i < end; i++) preload(i, false);
        nextBatch = end;
        if (nextBatch < TOTAL) {
          if ('requestIdleCallback' in window) requestIdleCallback(loadNextBatch);
          else setTimeout(loadNextBatch, 150);
        }
      }
      if ('requestIdleCallback' in window) requestIdleCallback(loadNextBatch);
      else setTimeout(loadNextBatch, 400);

      (function loop() {
        currentF += (targetF - currentF) * 0.1;
        drawFrame(Math.round(currentF));
        requestAnimationFrame(loop);
      })();

      const scrollEl = document.getElementById('hero-scroll-container');
      const heroParallax = document.querySelector('.hero-parallax');

      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollEl) {
          const maxScroll = scrollEl.scrollHeight - window.innerHeight;
          const progress  = Math.max(0, Math.min(1, scrollY / maxScroll));
          targetF = progress * (TOTAL - 1);
          const ahead = Math.min(TOTAL - 1, Math.round(targetF) + 20);
          for (let i = Math.round(targetF); i <= ahead; i += STEP) preload(i, false);
        }
        if (heroParallax && scrollY < window.innerHeight) {
          heroParallax.style.transform = `translateY(${scrollY * 0.18}px)`;
        }
      }, { passive: true });

      resize();
    })();
