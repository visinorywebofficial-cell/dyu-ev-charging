import re

with open(r'c:\Users\shiva\OneDrive\Attachments\New folder (2)\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'  <!-- Premium About Section -->.*?  </section>', content, re.DOTALL)
if match:
    old_section = match.group(0)
    
    new_section = """  <!-- Premium About Section (Cinematic Video Background) -->
  <section id="about" class="about-premium-section" style="position: relative; overflow: hidden; min-height: 100vh; background-color: #030303;">
    
    <!-- Video Background -->
    <video src="https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8" autoPlay muted loop playsInline preload="metadata" disablePictureInPicture controlsList="nodownload nofullscreen noremoteplayback" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; opacity: 0.22; pointer-events: none; user-select: none;"></video>
    
    <!-- BACKGROUND OVERLAY STACK -->
    <!-- Layer 01: bg-black/70 -->
    <div style="position: absolute; inset: 0; background: rgba(0, 0, 0, 0.7); z-index: 1; pointer-events: none;"></div>
    <!-- Layer 02: radial violet glow -->
    <div style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, rgba(139,92,246,0.18) 0%, transparent 60%); z-index: 1; pointer-events: none;"></div>
    <!-- Layer 03: soft cyan atmospheric blur -->
    <div style="position: absolute; inset: 0; background: radial-gradient(circle at 80% 20%, rgba(6,182,212,0.10) 0%, transparent 50%); filter: blur(40px); z-index: 1; pointer-events: none;"></div>
    <!-- Layer 04: subtle vignette edge darkening -->
    <div style="position: absolute; inset: 0; box-shadow: inset 0 0 150px rgba(0, 0, 0, 0.9); z-index: 1; pointer-events: none;"></div>
    <!-- Layer 05: very subtle noise/grain texture -->
    <div style="position: absolute; inset: 0; background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E'); opacity: 0.03; z-index: 1; pointer-events: none; mix-blend-mode: overlay;"></div>

    <!-- Ambient Orbs -->
    <div class="ambient-orb violet-orb"></div>
    <div class="ambient-orb cyan-orb"></div>

    <!-- Content Container -->
    <div class="about-container reveal">
      <!-- Top Badge -->
      <div class="about-badge">ABOUT VISIONARY WEB</div>

      <!-- Main Heading -->
      <h2 class="about-heading stagger-1">
        Engineering Digital Experiences<br>Built For The <span class="shimmer-text">Future.</span>
      </h2>

      <!-- Subtext -->
      <p class="about-subtext stagger-2">
        We engineer cinematic websites, AI systems, automations, and immersive digital ecosystems designed to help modern brands scale smarter and feel unforgettable online.
      </p>

      <!-- Primary CTA -->
      <a href="#services" class="about-cta stagger-3">Explore Visionary Systems</a>

      <!-- 3D Bento Grid -->
      <div class="bento-grid stagger-4">
        <!-- Card 1 -->
        <div class="bento-card">
          <div class="bento-card-bg"></div>
          <div class="bento-card-content">
            <h3 class="bento-card-title">Premium Website Systems</h3>
            <p class="bento-card-desc">High-converting cinematic websites engineered for speed, responsiveness, luxury branding, and customer engagement.</p>
          </div>
          <!-- Inside Visual: Glowing Browser Mockup -->
          <div class="bento-card-visual" style="align-items: flex-start; justify-content: flex-end;">
            <div style="width: 140px; height: 100px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; backdrop-filter: blur(10px); padding: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
              <div style="display: flex; gap: 4px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 6px; margin-bottom: 6px;">
                <div style="width: 4px; height: 4px; border-radius: 50%; background: #ef4444;"></div>
                <div style="width: 4px; height: 4px; border-radius: 50%; background: #eab308;"></div>
                <div style="width: 4px; height: 4px; border-radius: 50%; background: #22c55e;"></div>
              </div>
              <div style="width: 100%; height: 40px; border-radius: 4px; background: linear-gradient(to bottom, rgba(255,255,255,0.05), transparent);"></div>
            </div>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="bento-card">
          <div class="bento-card-bg"></div>
          <div class="bento-card-content">
            <h3 class="bento-card-title">AI & Automation Infrastructure</h3>
            <p class="bento-card-desc">Advanced AI systems, WhatsApp workflows, lead nurturing automations, and scalable business infrastructure.</p>
          </div>
          <!-- Inside Visual: AI nodes pattern -->
          <div class="bento-card-visual" style="align-items: flex-end; justify-content: flex-start;">
            <svg viewBox="0 0 100 100" style="width: 120px; height: 120px; stroke: rgba(255, 255, 255, 0.15); fill: none; stroke-width: 1.5;">
              <circle cx="20" cy="80" r="4" fill="rgba(139,92,246,0.5)" stroke="none" />
              <circle cx="80" cy="80" r="4" />
              <circle cx="50" cy="50" r="8" fill="rgba(6,182,212,0.5)" stroke="none" />
              <circle cx="20" cy="20" r="4" />
              <circle cx="80" cy="20" r="4" />
              <path d="M20 80 L50 50 L80 80 M20 20 L50 50 L80 20" />
            </svg>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="bento-card">
          <div class="bento-card-bg"></div>
          <div class="bento-card-content">
            <h3 class="bento-card-title">Built For Scaling</h3>
            <p class="bento-card-desc">Digital systems designed to help brands automate operations, improve conversions, and scale efficiently.</p>
          </div>
          <!-- Inside Visual: Glowing Graphs -->
          <div class="bento-card-visual" style="align-items: flex-end; justify-content: flex-end; padding-bottom: 20px;">
            <div style="display: flex; align-items: flex-end; gap: 6px; height: 60px;">
              <div style="width: 14px; height: 30%; background: rgba(255,255,255,0.05); border-radius: 4px 4px 0 0;"></div>
              <div style="width: 14px; height: 50%; background: rgba(255,255,255,0.08); border-radius: 4px 4px 0 0;"></div>
              <div style="width: 14px; height: 75%; background: rgba(255,255,255,0.12); border-radius: 4px 4px 0 0;"></div>
              <div style="width: 14px; height: 100%; background: linear-gradient(to top, rgba(139,92,246,0.8), rgba(6,182,212,0.8)); border-radius: 4px 4px 0 0; box-shadow: 0 -4px 12px rgba(6,182,212,0.4);"></div>
            </div>
          </div>
        </div>

        <!-- Card 4 -->
        <div class="bento-card">
          <div class="bento-card-bg"></div>
          <div class="bento-card-content">
            <h3 class="bento-card-title">Real Business Impact</h3>
            <p class="bento-card-desc">From agencies and coaches to premium brands and local businesses — Visionary creates systems engineered for measurable growth.</p>
          </div>
          <!-- Inside Visual: Dashboard snippet -->
          <div class="bento-card-visual" style="align-items: flex-start; justify-content: flex-start; padding-top: 10px;">
             <div style="width: 140px; padding: 12px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; display: flex; flex-direction: column; gap: 8px;">
               <div style="font-size: 0.6rem; color: rgba(255,255,255,0.4); text-transform: uppercase;">Growth</div>
               <div style="font-size: 1.2rem; color: #fff; font-weight: 600;">+342%</div>
               <div style="width: 100%; height: 2px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden;">
                 <div style="width: 70%; height: 100%; background: #22c55e;"></div>
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
        filter: blur(80px);
        opacity: 0.4;
        z-index: 0;
        animation: floatOrb 15s ease-in-out infinite alternate;
        pointer-events: none;
      }
      .violet-orb {
        width: 300px;
        height: 300px;
        background: rgba(139, 92, 246, 0.4);
        top: 20%;
        left: 10%;
      }
      .cyan-orb {
        width: 400px;
        height: 400px;
        background: rgba(6, 182, 212, 0.3);
        bottom: 10%;
        right: 5%;
        animation-duration: 12s;
        animation-delay: -5s;
      }
      @keyframes floatOrb {
        0% { transform: translate(0, 0) scale(1); }
        100% { transform: translate(50px, -50px) scale(1.1); }
      }
      @media (max-width: 768px) {
        .ambient-orb { display: none; }
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
      }
      @media (min-width: 768px) {
        .bento-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
      }

      /* Card Style */
      .bento-card {
        border-radius: 32px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(40px);
        -webkit-backdrop-filter: blur(40px);
        overflow: hidden;
        position: relative;
        padding: 2rem;
        transition: all 0.7s cubic-bezier(0.23, 1, 0.32, 1);
        display: flex;
        flex-direction: column;
      }
      @media (min-width: 768px) {
        .bento-card { padding: 2.5rem; }
      }

      .bento-card:hover {
        transform: translateY(-6px);
        border-color: rgba(255, 255, 255, 0.15);
        box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5), inset 0 0 40px rgba(139, 92, 246, 0.05);
      }

      /* Inner Glow Background Layer */
      .bento-card-bg {
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at top right, rgba(139, 92, 246, 0.08), transparent 70%);
        opacity: 0;
        transition: opacity 0.7s ease;
        pointer-events: none;
      }
      .bento-card:hover .bento-card-bg {
        opacity: 1;
      }

      .bento-card-content {
        position: relative;
        z-index: 2;
      }
      .bento-card-title {
        font-family: 'Playfair Display', serif;
        font-size: 1.75rem;
        color: #fff;
        margin-bottom: 0.75rem;
        font-weight: 500;
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
        opacity: 0.4;
        transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.23, 1, 0.32, 1);
      }
      .bento-card:hover .bento-card-visual {
        opacity: 0.8;
        transform: scale(1.02);
      }
      
      @media (max-width: 768px) {
        .bento-card {
           backdrop-filter: blur(20px);
        }
        .bento-card-visual {
           opacity: 0.2;
        }
      }
    </style>
  </section>"""

    new_content = content.replace(old_section, new_section)
    with open(r'c:\Users\shiva\OneDrive\Attachments\New folder (2)\index.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('REPLACED SUCCESSFULLY')
else:
    print('COULD NOT FIND SECTION')
