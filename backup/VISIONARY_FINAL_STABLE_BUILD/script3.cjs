const fs = require('fs');

const path = 'index.html';
const content = fs.readFileSync(path, 'utf-8');

const regex = /      <!-- 3D Bento Grid -->[\s\S]*?    <\/style>/;

const newSection = `      <!-- 3D Bento Grid -->
      <div class="bento-grid stagger-4">
        <!-- Card 1 -->
        <div class="bento-card bento-card-1">
          <div class="bento-card-bg"></div>
          <div class="bento-card-glare"></div>
          <div class="bento-card-content">
            <h3 class="bento-card-title">Premium Website Systems</h3>
            <p class="bento-card-desc">High-converting cinematic websites engineered for speed, responsiveness, luxury branding, and customer engagement.</p>
            <div style="margin-top: 1.5rem;">
              <a href="#systems" class="premium-magnetic-btn"><span>Explore Systems</span></a>
            </div>
          </div>
          <!-- Inside Visual: Glowing Browser Mockup -->
          <div class="bento-card-visual" style="align-items: flex-start; justify-content: flex-end;">
            <div class="visual-layer" style="width: 140px; height: 100px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; backdrop-filter: blur(10px); padding: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
              <div style="display: flex; gap: 4px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 6px; margin-bottom: 6px;">
                <div style="width: 4px; height: 4px; border-radius: 50%; background: #ef4444;"></div>
                <div style="width: 4px; height: 4px; border-radius: 50%; background: #eab308;"></div>
                <div style="width: 4px; height: 4px; border-radius: 50%; background: #22c55e;"></div>
              </div>
              <div style="width: 100%; height: 40px; border-radius: 4px; background: linear-gradient(to bottom, rgba(255,255,255,0.08), transparent);"></div>
            </div>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="bento-card bento-card-2">
          <div class="bento-card-bg"></div>
          <div class="bento-card-glare"></div>
          <div class="bento-card-content">
            <h3 class="bento-card-title">AI & Automation Infrastructure</h3>
            <p class="bento-card-desc">Advanced AI systems, WhatsApp workflows, lead nurturing automations, and scalable business infrastructure.</p>
            <div style="margin-top: 1.5rem;">
              <a href="#ai-stack" class="premium-magnetic-btn"><span>View AI Stack</span></a>
            </div>
          </div>
          <!-- Inside Visual: AI nodes pattern -->
          <div class="bento-card-visual" style="align-items: flex-end; justify-content: flex-start;">
            <svg class="visual-layer" viewBox="0 0 100 100" style="width: 120px; height: 120px; stroke: rgba(255, 255, 255, 0.2); fill: none; stroke-width: 1.5;">
              <circle cx="20" cy="80" r="4" fill="rgba(6,182,212,0.5)" stroke="none" />
              <circle cx="80" cy="80" r="4" />
              <circle cx="50" cy="50" r="8" fill="rgba(59,130,246,0.5)" stroke="none" />
              <circle cx="20" cy="20" r="4" />
              <circle cx="80" cy="20" r="4" />
              <path d="M20 80 L50 50 L80 80 M20 20 L50 50 L80 20" />
            </svg>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="bento-card bento-card-3">
          <div class="bento-card-bg"></div>
          <div class="bento-card-glare"></div>
          <div class="bento-card-content">
            <h3 class="bento-card-title">Built For Scaling</h3>
            <p class="bento-card-desc">Digital systems designed to help brands automate operations, improve conversions, and scale efficiently.</p>
            <div style="margin-top: 1.5rem;">
              <a href="#infrastructure" class="premium-magnetic-btn"><span>See Infrastructure</span></a>
            </div>
          </div>
          <!-- Inside Visual: Glowing Graphs -->
          <div class="bento-card-visual" style="align-items: flex-end; justify-content: flex-end; padding-bottom: 20px;">
            <div class="visual-layer" style="display: flex; align-items: flex-end; gap: 6px; height: 60px;">
              <div style="width: 14px; height: 30%; background: rgba(255,255,255,0.05); border-radius: 4px 4px 0 0;"></div>
              <div style="width: 14px; height: 50%; background: rgba(255,255,255,0.08); border-radius: 4px 4px 0 0;"></div>
              <div style="width: 14px; height: 75%; background: rgba(255,255,255,0.12); border-radius: 4px 4px 0 0;"></div>
              <div style="width: 14px; height: 100%; background: linear-gradient(to top, rgba(168,85,247,0.8), rgba(139,92,246,0.8)); border-radius: 4px 4px 0 0; box-shadow: 0 -4px 12px rgba(139,92,246,0.4);"></div>
            </div>
          </div>
        </div>

        <!-- Card 4 -->
        <div class="bento-card bento-card-4">
          <div class="bento-card-bg"></div>
          <div class="bento-card-glare"></div>
          <div class="bento-card-content">
            <h3 class="bento-card-title">Real Business Impact</h3>
            <p class="bento-card-desc">From agencies and coaches to premium brands and local businesses — Visionary creates systems engineered for measurable growth.</p>
            <div style="margin-top: 1.5rem;">
              <a href="#results" class="premium-magnetic-btn"><span>View Results</span></a>
            </div>
          </div>
          <!-- Inside Visual: Dashboard snippet -->
          <div class="bento-card-visual" style="align-items: flex-start; justify-content: flex-start; padding-top: 10px;">
             <div class="visual-layer" style="width: 140px; padding: 12px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; display: flex; flex-direction: column; gap: 8px;">
               <div style="font-size: 0.6rem; color: rgba(255,255,255,0.5); text-transform: uppercase;">Growth</div>
               <div style="font-size: 1.2rem; color: #fff; font-weight: 600;">+342%</div>
               <div style="width: 100%; height: 2px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden;">
                 <div style="width: 70%; height: 100%; background: #10b981;"></div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scoped CSS for this section -->
    <style>
      .about-container {
        max-width: 1280px;
        margin: 0 auto;
        padding: 8rem 1.5rem;
        position: relative;
        z-index: 10;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        perspective: 1200px;
      }

      @media (min-width: 768px) {
        .about-container {
          padding: 10rem 2.5rem;
        }
      }

      /* Ambient Orbs */
      .ambient-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(100px);
        opacity: 0.15;
        z-index: 0;
        animation: floatOrb 25s ease-in-out infinite alternate;
        pointer-events: none;
      }
      .violet-orb {
        width: 400px;
        height: 400px;
        background: rgba(139, 92, 246, 0.5);
        top: 15%;
        left: 15%;
      }
      .cyan-orb {
        width: 400px;
        height: 400px;
        background: rgba(6, 182, 212, 0.4);
        bottom: 15%;
        right: 15%;
        animation-duration: 20s;
        animation-delay: -10s;
      }
      @keyframes floatOrb {
        0% { transform: translate(0, 0) scale(1); }
        100% { transform: translate(30px, -30px) scale(1.05); }
      }
      .subtle-fog-layer {
        position: absolute;
        inset: -20%;
        width: 140%;
        height: 140%;
        background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.015) 0%, transparent 50%);
        filter: blur(80px);
        z-index: 1;
        pointer-events: none;
        animation: fogDrift 30s linear infinite alternate;
      }
      @keyframes fogDrift {
        0% { transform: translateX(-5%); }
        100% { transform: translateX(5%); }
      }
      @media (max-width: 768px) {
        .ambient-orb { display: none; }
        .subtle-fog-layer { display: none; }
      }

      /* Top Badge */
      .about-badge {
        display: inline-flex;
        border-radius: 9999px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        padding: 0.5rem 1.25rem;
        font-size: 0.75rem;
        letter-spacing: 0.25em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.7);
        margin-bottom: 2rem;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2), inset 0 0 10px rgba(255,255,255,0.05);
        animation: subtleFloat 6s ease-in-out infinite alternate;
      }
      @keyframes subtleFloat {
        0% { transform: translateY(0); }
        100% { transform: translateY(-8px); }
      }

      /* Main Heading */
      .about-heading {
        font-family: 'Playfair Display', serif;
        font-size: clamp(3rem, 6vw, 6rem);
        line-height: 0.92;
        letter-spacing: -0.04em;
        color: #fff;
        margin-bottom: 2rem;
        text-shadow: 0 10px 30px rgba(0,0,0,0.5);
      }
      .shimmer-text {
        background: linear-gradient(90deg, rgba(255,255,255,0.7) 0%, #fff 50%, rgba(255,255,255,0.7) 100%);
        background-size: 200% auto;
        color: transparent;
        -webkit-background-clip: text;
        background-clip: text;
        animation: shimmer 3s linear infinite;
      }
      @keyframes shimmer {
        to { background-position: 200% center; }
      }

      /* Subtext */
      .about-subtext {
        max-width: 48rem;
        font-size: clamp(1.125rem, 1.5vw, 1.25rem);
        line-height: 1.75;
        color: rgba(255, 255, 255, 0.7);
        margin-bottom: 2rem;
        font-family: 'DM Sans', sans-serif;
      }

      /* Primary CTA */
      .about-cta {
        display: inline-flex;
        border-radius: 9999px;
        padding: 1rem 2rem;
        background: #fff;
        color: #000;
        font-weight: 500;
        font-family: 'DM Sans', sans-serif;
        text-decoration: none;
        transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        box-shadow: 0 4px 15px rgba(255,255,255,0.1);
        position: relative;
        overflow: hidden;
      }
      .about-cta::after {
        content: '';
        position: absolute;
        top: 0; left: -100%;
        width: 50%; height: 100%;
        background: linear-gradient(to right, transparent, rgba(0,0,0,0.05), transparent);
        transform: skewX(-20deg);
        transition: left 0.6s ease;
      }
      .about-cta:hover {
        transform: scale(1.02);
        box-shadow: 0 8px 25px rgba(255,255,255,0.2);
      }
      .about-cta:hover::after {
        left: 150%;
      }

      /* 3D Bento Grid */
      .bento-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
        margin-top: 6rem;
        width: 100%;
        text-align: left;
        perspective: 1200px;
      }
      @media (min-width: 768px) {
        .bento-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
      }

      /* Card Style & 4D Depth */
      .bento-card {
        border-radius: 32px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(40px);
        -webkit-backdrop-filter: blur(40px);
        overflow: hidden;
        position: relative;
        padding: 2.5rem;
        display: flex;
        flex-direction: column;
        transform-style: preserve-3d;
        transform: translateZ(0);
        will-change: transform, box-shadow;
        transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.8s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.8s ease;
        animation: idleFloat 8s ease-in-out infinite alternate;
      }
      
      .bento-card:nth-child(2) { animation-delay: -2s; }
      .bento-card:nth-child(3) { animation-delay: -4s; }
      .bento-card:nth-child(4) { animation-delay: -6s; }

      @keyframes idleFloat {
        0% { transform: translateY(0); }
        100% { transform: translateY(-4px); }
      }

      .bento-card:hover {
        border-color: rgba(255, 255, 255, 0.2);
        box-shadow: 0 30px 60px -15px rgba(0,0,0,0.6), inset 0 0 40px rgba(255, 255, 255, 0.02);
        z-index: 10;
        animation-play-state: paused;
      }

      /* Glow Colors */
      .bento-card-1 .bento-card-bg { background: radial-gradient(circle at center, rgba(255,255,255,0.08), rgba(200,169,110,0.08), transparent 70%); }
      .bento-card-2 .bento-card-bg { background: radial-gradient(circle at center, rgba(6,182,212,0.1), rgba(59,130,246,0.1), transparent 70%); }
      .bento-card-3 .bento-card-bg { background: radial-gradient(circle at center, rgba(168,85,247,0.1), rgba(139,92,246,0.1), transparent 70%); }
      .bento-card-4 .bento-card-bg { background: radial-gradient(circle at center, rgba(16,185,129,0.1), rgba(6,182,212,0.1), transparent 70%); }

      /* Inner Glow Background Layer */
      .bento-card-bg {
        position: absolute;
        inset: 0;
        opacity: 0;
        transition: opacity 0.8s ease;
        pointer-events: none;
        transform: translateZ(0);
      }
      
      /* Card Glare effect */
      .bento-card-glare {
        position: absolute;
        inset: 0;
        background: linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0) 100%);
        transform: translateX(-100%);
        transition: transform 0.6s ease;
        pointer-events: none;
        z-index: 5;
      }
      .bento-card:hover .bento-card-glare {
        transform: translateX(100%);
      }

      .bento-card:hover .bento-card-bg {
        opacity: 1;
      }

      .bento-card-content {
        position: relative;
        z-index: 2;
        transform: translateZ(30px);
      }
      .bento-card-title {
        font-family: 'Playfair Display', serif;
        font-size: 1.75rem;
        color: #fff;
        margin-bottom: 0.75rem;
        font-weight: 500;
        text-shadow: 0 4px 20px rgba(0,0,0,0.5);
      }
      .bento-card-desc {
        color: rgba(255, 255, 255, 0.6);
        font-size: 1rem;
        line-height: 1.6;
        font-family: 'DM Sans', sans-serif;
        max-width: 90%;
      }

      .bento-card-visual {
        position: absolute;
        inset: 0;
        padding: 2.5rem;
        display: flex;
        pointer-events: none;
        z-index: 1;
        opacity: 0.5;
        transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        transform-style: preserve-3d;
      }
      .bento-card:hover .bento-card-visual {
        opacity: 1;
      }
      .bento-card:hover .visual-layer {
        transform: translateZ(40px) scale(1.05);
      }
      .visual-layer {
        transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        will-change: transform;
      }
      
      /* Premium Magnetic Button */
      .premium-magnetic-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.6rem 1.25rem;
        border-radius: 9999px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(12px);
        color: rgba(255, 255, 255, 0.9);
        font-family: 'DM Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 500;
        text-decoration: none;
        position: relative;
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        pointer-events: auto;
      }
      .premium-magnetic-btn span {
        position: relative;
        z-index: 2;
        transition: transform 0.4s ease;
      }
      .premium-magnetic-btn::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(120deg, transparent, rgba(255,255,255,0.1), transparent);
        transform: translateX(-100%);
        transition: transform 0.6s ease;
        z-index: 1;
      }
      .premium-magnetic-btn::after {
        content: '';
        position: absolute;
        inset: -1px;
        border-radius: 9999px;
        padding: 1px;
        background: linear-gradient(to bottom, rgba(255,255,255,0.4), transparent);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        opacity: 0;
        transition: opacity 0.4s ease;
      }
      .premium-magnetic-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: scale(1.05);
        color: #fff;
        box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
      }
      .premium-magnetic-btn:hover::before {
        transform: translateX(100%);
      }
      .premium-magnetic-btn:hover::after {
        opacity: 1;
      }
      
      @media (max-width: 768px) {
        .bento-card {
           backdrop-filter: blur(20px);
           padding: 1.5rem;
           animation: none !important;
        }
        .bento-card-visual {
           opacity: 0.3;
        }
      }
    </style>
    
    <!-- 4D Interaction Script -->
    <script>
      document.addEventListener('DOMContentLoaded', () => {
        const cards = document.querySelectorAll('.bento-card');
        
        cards.forEach(card => {
          card.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 768) return; // Disable on mobile
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation (very subtle: max 4deg)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;
            
            // Move inner background slightly for lighting effect
            const bg = card.querySelector('.bento-card-bg');
            if (bg) {
              const bgX = (x / rect.width) * 100;
              const bgY = (y / rect.height) * 100;
              bg.style.background = \`radial-gradient(circle at \${bgX}% \${bgY}%, \${getGlowColor(card)}, transparent 70%)\`;
            }

            // Apply transform
            card.style.transform = \`perspective(1200px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) scale3d(1.02, 1.02, 1.02) translateZ(10px)\`;
          });
          
          card.addEventListener('mouseleave', () => {
            if (window.innerWidth < 768) return;
            card.style.transform = \`perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0)\`;
            const bg = card.querySelector('.bento-card-bg');
            if (bg) {
              bg.style.background = ''; // reset to CSS default
            }
          });
        });
        
        function getGlowColor(card) {
          if (card.classList.contains('bento-card-1')) return 'rgba(255,255,255,0.08), rgba(200,169,110,0.08)';
          if (card.classList.contains('bento-card-2')) return 'rgba(6,182,212,0.1), rgba(59,130,246,0.1)';
          if (card.classList.contains('bento-card-3')) return 'rgba(168,85,247,0.1), rgba(139,92,246,0.1)';
          if (card.classList.contains('bento-card-4')) return 'rgba(16,185,129,0.1), rgba(6,182,212,0.1)';
          return 'rgba(255,255,255,0.05)';
        }
      });
    </script>`;

if (regex.test(content)) {
    const newContent = content.replace(regex, newSection);
    fs.writeFileSync(path, newContent, 'utf-8');
    console.log('REPLACED SUCCESSFULLY');
} else {
    console.log('COULD NOT FIND SECTION');
}
