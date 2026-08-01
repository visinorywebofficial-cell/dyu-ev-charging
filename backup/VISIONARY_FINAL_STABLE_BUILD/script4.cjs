const fs = require('fs');

const path = 'index.html';
const content = fs.readFileSync(path, 'utf-8');

const regex = /      <!-- 3D Bento Grid -->[\s\S]*?<\/script>/;

const newSection = `      <!-- Optimized Premium Bento Grid -->
      <div class="bento-grid stagger-4">
        
        <!-- CARD 01: Premium Website Systems -->
        <div class="bento-card card-wide bento-card-1">
          <div class="bento-card-bg"></div>
          
          <div class="card-top-bar">
            <span class="system-label">SYSTEM 01</span>
            <div class="status-dot"></div>
          </div>
          
          <div class="bento-card-content">
            <h3 class="bento-card-title">Premium Website Systems</h3>
            <p class="bento-card-desc">High-converting cinematic websites engineered for speed, responsiveness, and luxury branding.</p>
            
            <a href="#systems" class="premium-capsule-btn">
              <span>Launch Experience</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>

          <!-- Visual: Floating Browser Layers -->
          <div class="bento-visual-container">
             <div class="browser-mockup layer-back"></div>
             <div class="browser-mockup layer-mid">
                <div class="browser-header"><span></span><span></span><span></span></div>
                <div class="browser-body"></div>
             </div>
             <div class="browser-mockup layer-front">
                <div class="browser-header"><span></span><span></span><span></span></div>
                <div class="browser-hero-line"></div>
                <div class="browser-content-blocks">
                  <div></div><div></div>
                </div>
             </div>
          </div>
        </div>

        <!-- CARD 02: AI & Automation -->
        <div class="bento-card card-tall bento-card-2">
          <div class="bento-card-bg"></div>
          
          <div class="card-top-bar">
            <span class="system-label">AI INFRASTRUCTURE</span>
            <div class="status-dot"></div>
          </div>
          
          <div class="bento-card-content">
            <h3 class="bento-card-title">AI & Automation Infrastructure</h3>
            <p class="bento-card-desc">Advanced AI systems, WhatsApp workflows, and lead nurturing automations.</p>
            
            <a href="#ai-stack" class="premium-capsule-btn">
              <span>Open AI Stack</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>

          <!-- Visual: AI Nodes -->
          <div class="bento-visual-container">
             <svg class="ai-node-svg" viewBox="0 0 200 100" preserveAspectRatio="xMidYMid slice">
                <path class="animated-path" d="M20 80 Q 50 20 100 50 T 180 20" fill="none" stroke="rgba(6,182,212,0.4)" stroke-width="1.5" stroke-dasharray="4 4" />
                <path class="animated-path reverse" d="M20 20 Q 80 80 150 50 T 180 80" fill="none" stroke="rgba(59,130,246,0.4)" stroke-width="1.5" />
                <circle cx="20" cy="80" r="4" fill="#06b6d4" class="pulse-node" />
                <circle cx="100" cy="50" r="6" fill="#3b82f6" class="pulse-node delay-1" />
                <circle cx="180" cy="20" r="4" fill="#06b6d4" class="pulse-node delay-2" />
                <circle cx="20" cy="20" r="3" fill="rgba(255,255,255,0.2)" />
                <circle cx="150" cy="50" r="5" fill="#3b82f6" class="pulse-node delay-3" />
             </svg>
          </div>
        </div>

        <!-- CARD 03: Built For Scaling -->
        <div class="bento-card card-tall bento-card-3">
          <div class="bento-card-bg"></div>
          
          <div class="card-top-bar">
            <span class="system-label">SCALING ENGINE</span>
            <div class="status-dot"></div>
          </div>
          
          <div class="bento-card-content">
            <h3 class="bento-card-title">Built For Scaling</h3>
            <p class="bento-card-desc">Digital systems designed to help brands automate operations and scale efficiently.</p>
            
            <a href="#infrastructure" class="premium-capsule-btn">
              <span>View Growth Engine</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>

          <!-- Visual: Scaling Graphs -->
          <div class="bento-visual-container">
             <div class="chart-container">
               <div class="chart-bar"><div class="chart-fill" style="height: 30%"></div></div>
               <div class="chart-bar"><div class="chart-fill" style="height: 45%"></div></div>
               <div class="chart-bar"><div class="chart-fill" style="height: 60%"></div></div>
               <div class="chart-bar"><div class="chart-fill" style="height: 80%"></div></div>
               <div class="chart-bar active"><div class="chart-fill" style="height: 100%"></div></div>
             </div>
          </div>
        </div>

        <!-- CARD 04: Real Business Impact -->
        <div class="bento-card card-wide bento-card-4">
          <div class="bento-card-bg"></div>
          
          <div class="card-top-bar">
            <span class="system-label">PERFORMANCE</span>
            <div class="status-dot"></div>
          </div>
          
          <div class="bento-card-content">
            <h3 class="bento-card-title">Real Business Impact</h3>
            <p class="bento-card-desc">Visionary creates systems engineered for measurable growth and ROI.</p>
            
            <a href="#results" class="premium-capsule-btn">
              <span>See Client Impact</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>

          <!-- Visual: Dashboard Snippet -->
          <div class="bento-visual-container">
             <div class="dashboard-snippet">
               <div class="snippet-header">
                 <span>Revenue Growth</span>
                 <span class="metric-positive">+342%</span>
               </div>
               <div class="snippet-line"></div>
               <div class="snippet-footer">
                 <div class="snippet-avatar-group">
                   <div class="avatar"></div><div class="avatar"></div><div class="avatar"></div>
                 </div>
                 <span>Live Data</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scoped CSS for optimized cards -->
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

      /* Ambient Orbs - Minimized */
      .ambient-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(120px);
        opacity: 0.1;
        z-index: 0;
        pointer-events: none;
      }
      .violet-orb {
        width: 400px;
        height: 400px;
        background: rgba(139, 92, 246, 0.4);
        top: 20%;
        left: 20%;
      }
      .cyan-orb {
        width: 400px;
        height: 400px;
        background: rgba(6, 182, 212, 0.3);
        bottom: 20%;
        right: 20%;
      }
      
      @media (max-width: 768px) {
        .ambient-orb { display: none; }
      }

      /* Top Badge & Text */
      .about-badge {
        display: inline-flex;
        border-radius: 9999px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        padding: 0.5rem 1.25rem;
        font-size: 0.75rem;
        letter-spacing: 0.25em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.7);
        margin-bottom: 2rem;
      }

      .about-heading {
        font-family: 'Playfair Display', serif;
        font-size: clamp(3rem, 6vw, 6rem);
        line-height: 0.92;
        letter-spacing: -0.04em;
        color: #fff;
        margin-bottom: 2rem;
      }
      
      .shimmer-text {
        color: rgba(255,255,255,0.9);
      }

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
        transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
      }
      .about-cta:hover {
        transform: scale(1.03);
      }

      /* NEW: Asymmetric Bento Grid */
      .bento-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.25rem;
        margin-top: 5rem;
        width: 100%;
        text-align: left;
      }
      @media (min-width: 1024px) {
        .bento-grid {
          grid-template-columns: repeat(12, 1fr);
          grid-auto-rows: minmax(320px, auto);
          gap: 1.5rem;
        }
        .bento-card-1 { grid-column: span 7; }
        .bento-card-2 { grid-column: span 5; }
        .bento-card-3 { grid-column: span 5; }
        .bento-card-4 { grid-column: span 7; }
      }

      /* NEW: Minimalist Card Base */
      .bento-card {
        border-radius: 24px;
        border: 1px solid rgba(255, 255, 255, 0.06);
        background: rgba(10, 10, 10, 0.6);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        overflow: hidden;
        position: relative;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        will-change: transform, opacity;
        transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.6s ease, background 0.6s ease;
      }
      @media (min-width: 768px) {
        .bento-card { padding: 2.5rem; }
      }

      .bento-card:hover {
        transform: translateY(-4px) scale(1.01);
        border-color: rgba(255, 255, 255, 0.12);
        background: rgba(15, 15, 15, 0.7);
      }

      /* Card Top Bar */
      .card-top-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2rem;
        z-index: 2;
        position: relative;
      }
      .system-label {
        font-family: 'JetBrains Mono', 'IBM Plex Mono', monospace;
        font-size: 0.65rem;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.4);
      }
      .status-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        transition: background 0.4s ease;
      }
      .bento-card:hover .status-dot {
        background: #fff;
        box-shadow: 0 0 10px rgba(255,255,255,0.5);
      }

      /* Glow Colors */
      .bento-card-1:hover .status-dot { background: #eab308; box-shadow: 0 0 10px rgba(234, 179, 8, 0.5); }
      .bento-card-2:hover .status-dot { background: #3b82f6; box-shadow: 0 0 10px rgba(59, 130, 246, 0.5); }
      .bento-card-3:hover .status-dot { background: #a855f7; box-shadow: 0 0 10px rgba(168, 85, 247, 0.5); }
      .bento-card-4:hover .status-dot { background: #10b981; box-shadow: 0 0 10px rgba(16, 185, 129, 0.5); }

      /* Inner Background Glow */
      .bento-card-bg {
        position: absolute;
        inset: 0;
        opacity: 0;
        transition: opacity 0.8s ease;
        pointer-events: none;
        z-index: 0;
      }
      .bento-card-1 .bento-card-bg { background: radial-gradient(circle at top right, rgba(200,169,110,0.06), transparent 60%); }
      .bento-card-2 .bento-card-bg { background: radial-gradient(circle at top right, rgba(6,182,212,0.06), transparent 60%); }
      .bento-card-3 .bento-card-bg { background: radial-gradient(circle at top right, rgba(168,85,247,0.06), transparent 60%); }
      .bento-card-4 .bento-card-bg { background: radial-gradient(circle at top right, rgba(16,185,129,0.06), transparent 60%); }
      
      .bento-card:hover .bento-card-bg {
        opacity: 1;
      }

      /* Typography */
      .bento-card-content {
        position: relative;
        z-index: 2;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      .bento-card-title {
        font-family: 'DM Sans', sans-serif;
        font-size: clamp(1.25rem, 2vw, 1.5rem);
        color: #fff;
        font-weight: 500;
        line-height: 1.2;
      }
      .bento-card-desc {
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.95rem;
        line-height: 1.6;
        font-family: 'DM Sans', sans-serif;
        max-width: 90%;
        margin-bottom: 1.5rem;
      }

      /* NEW: Premium Capsule Button */
      .premium-capsule-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: 9999px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        color: rgba(255, 255, 255, 0.8);
        font-family: 'DM Sans', sans-serif;
        font-size: 0.8rem;
        font-weight: 500;
        text-decoration: none;
        width: fit-content;
        transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
      }
      .premium-capsule-btn svg {
        transition: transform 0.4s ease;
      }
      .bento-card:hover .premium-capsule-btn {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.2);
        color: #fff;
      }
      .bento-card:hover .premium-capsule-btn svg {
        transform: translateX(4px);
      }

      /* Minimal Visual Containers */
      .bento-visual-container {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 1;
        opacity: 0.3;
        transition: opacity 0.6s ease;
        display: flex;
        overflow: hidden;
      }
      .bento-card:hover .bento-visual-container {
        opacity: 0.7;
      }
      
      /* Visual 1: Browsers */
      .bento-card-1 .bento-visual-container {
        align-items: flex-end;
        justify-content: flex-end;
        padding: 0;
      }
      .browser-mockup {
        position: absolute;
        bottom: -20px;
        right: -20px;
        background: rgba(20,20,20,0.8);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 8px 8px 0 0;
        backdrop-filter: blur(10px);
        transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
      }
      .layer-back { width: 160px; height: 120px; transform: translate(-40px, -40px) scale(0.9); opacity: 0.5; }
      .layer-mid { width: 180px; height: 140px; transform: translate(-20px, -20px) scale(0.95); opacity: 0.8; }
      .layer-front { width: 200px; height: 160px; padding: 10px; }
      .bento-card-1:hover .layer-back { transform: translate(-50px, -50px) scale(0.9); }
      .bento-card-1:hover .layer-mid { transform: translate(-25px, -25px) scale(0.95); }
      .bento-card-1:hover .layer-front { transform: translate(-5px, -5px) scale(1); }
      .browser-header { display: flex; gap: 4px; margin-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 6px; }
      .browser-header span { width: 4px; height: 4px; border-radius: 50%; background: rgba(255,255,255,0.2); }
      .browser-hero-line { width: 60%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 4px; margin-bottom: 8px; }
      .browser-content-blocks { display: flex; gap: 8px; }
      .browser-content-blocks div { width: 50%; height: 30px; background: rgba(255,255,255,0.05); border-radius: 4px; }

      /* Visual 2: AI Nodes */
      .bento-card-2 .bento-visual-container {
        align-items: center;
        justify-content: flex-end;
        padding-right: 20px;
      }
      .ai-node-svg { width: 150px; opacity: 0.8; }
      .pulse-node { animation: nodePulse 3s ease-in-out infinite alternate; }
      .delay-1 { animation-delay: 1s; }
      .delay-2 { animation-delay: 2s; }
      .delay-3 { animation-delay: 3s; }
      @keyframes nodePulse {
        0% { opacity: 0.4; r: 3; }
        100% { opacity: 1; r: 5; }
      }

      /* Visual 3: Scaling Graphs */
      .bento-card-3 .bento-visual-container {
        align-items: flex-end;
        justify-content: flex-end;
        padding: 20px;
      }
      .chart-container { display: flex; align-items: flex-end; gap: 8px; height: 80px; }
      .chart-bar { width: 12px; height: 100%; background: rgba(255,255,255,0.03); border-radius: 4px 4px 0 0; display: flex; align-items: flex-end; }
      .chart-fill { width: 100%; background: rgba(255,255,255,0.1); border-radius: 4px 4px 0 0; transition: height 1s ease; }
      .chart-bar.active .chart-fill { background: linear-gradient(to top, rgba(168,85,247,0.5), rgba(139,92,246,0.8)); }
      .bento-card-3:hover .chart-fill { opacity: 0.8; }

      /* Visual 4: Dashboard */
      .bento-card-4 .bento-visual-container {
        align-items: center;
        justify-content: flex-end;
        padding-right: 20px;
      }
      .dashboard-snippet {
        width: 160px;
        background: rgba(255,255,255,0.02);
        border: 1px solid rgba(255,255,255,0.06);
        border-radius: 12px;
        padding: 12px;
        backdrop-filter: blur(8px);
        transform: translateX(20px);
        transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
      }
      .bento-card-4:hover .dashboard-snippet {
        transform: translateX(0);
      }
      .snippet-header { display: flex; flex-direction: column; gap: 4px; }
      .snippet-header span:first-child { font-size: 0.6rem; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.05em; }
      .metric-positive { font-size: 1.25rem; color: #10b981; font-family: 'JetBrains Mono', monospace; }
      .snippet-line { width: 100%; height: 1px; background: rgba(255,255,255,0.05); margin: 10px 0; }
      .snippet-footer { display: flex; justify-content: space-between; align-items: center; font-size: 0.55rem; color: rgba(255,255,255,0.3); text-transform: uppercase; }
      .snippet-avatar-group { display: flex; }
      .avatar { width: 12px; height: 12px; border-radius: 50%; background: rgba(255,255,255,0.1); border: 1px solid #111; margin-left: -4px; }
      .avatar:first-child { margin-left: 0; }

      @media (max-width: 768px) {
        .bento-card {
           padding: 1.5rem;
        }
        .bento-visual-container {
           opacity: 0.2;
        }
        .bento-card:hover {
           transform: none;
        }
      }
    </style>`;

let replaced = false;

if (regex.test(content)) {
    let newContent = content.replace(regex, newSection);
    fs.writeFileSync(path, newContent, 'utf-8');
    console.log('REPLACED SUCCESSFULLY');
    replaced = true;
} else {
    console.log('COULD NOT FIND SECTION');
}
