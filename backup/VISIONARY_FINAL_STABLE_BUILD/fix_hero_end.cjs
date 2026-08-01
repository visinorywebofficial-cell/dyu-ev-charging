const fs = require('fs');
const path = 'index.html';
let content = fs.readFileSync(path, 'utf-8');

// Find the start of the broken section — the scroll handler
// We know good content ends at the onSequenceComplete function closing brace
// Everything from line ~2954 onwards is corrupted, replace with correct code

const GOOD_END_MARKER = `      /* Called once hero sequence is 100% complete */
      function onSequenceComplete() {
        if (sequenceDone) return;
        sequenceDone = true;
        // Reveal the rest of the site
        if (siteContent) {
          siteContent.classList.add('revealed');
        }
      }`;

const CORRECT_TAIL = `

      /* Scroll handler — maps scroll position inside outer to frame index */
      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // -- Frame calculation --
        if (outer) {
          const outerTop    = outer.offsetTop;
          const outerHeight = outer.offsetHeight;
          const scrollable  = outerHeight - window.innerHeight;
          const scrolled    = Math.max(0, scrollY - outerTop);
          const progress    = Math.min(1, scrolled / scrollable);

          targetF = progress * (TOTAL - 1);

          // Update progress bar
          if (progressBar) progressBar.style.width = (progress * 100) + '%';

          // Aggressively preload frames near current position
          const cur   = Math.round(targetF);
          const ahead = Math.min(TOTAL - 1, cur + 30);
          for (let i = Math.max(0, cur - 5); i <= ahead; i += STEP) preload(i, false);

          // Trigger site reveal when sequence finishes
          if (progress >= 0.98) onSequenceComplete();
        }

        // -- Hero content parallax --
        if (heroParallax && scrollY < window.innerHeight) {
          heroParallax.style.transform = \`translateY(\${scrollY * 0.12}px)\`;
        }
      }, { passive: true });

      // Initial canvas size
      resize();

      // If user reloads mid-scroll, snap to correct frame immediately
      window.dispatchEvent(new Event('scroll'));
    })();

  </script>
</body>

</html>`;

const markerIdx = content.indexOf(GOOD_END_MARKER);
if (markerIdx === -1) {
  console.error('MARKER NOT FOUND — cannot fix');
  process.exit(1);
}

// Reconstruct: everything up to and including the marker + correct tail
const fixed = content.substring(0, markerIdx + GOOD_END_MARKER.length) + CORRECT_TAIL;
fs.writeFileSync(path, fixed, 'utf-8');
console.log('Fixed! New file length:', fixed.length, 'bytes');
console.log('Lines:', fixed.split('\n').length);
