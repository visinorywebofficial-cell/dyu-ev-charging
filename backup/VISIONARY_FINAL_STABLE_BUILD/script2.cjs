const fs = require('fs');

const path = 'index.html';
const content = fs.readFileSync(path, 'utf-8');

const htmlRegex = /    <!-- Video Background -->[\s\S]*?    <div class="ambient-orb cyan-orb"><\/div>/;

const newHtmlBlock = `    <!-- Cinematic Video Background -->
    <video src="https://stream.mux.com/BuGGTsiXq1T00WUb8qfURrHkTCbhrkfFLSv4uAOZzdhw.m3u8" autoPlay muted loop playsInline preload="metadata" disablePictureInPicture controlsList="nodownload nofullscreen noremoteplayback" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; transform: scale(1.08); pointer-events: none; user-select: none;"></video>
    
    <!-- PREMIUM BACKGROUND OVERLAY STACK -->
    <!-- Layer 01: Deep black cinematic gradient (bg-black/72) -->
    <div style="position: absolute; inset: 0; background: rgba(0, 0, 0, 0.72); z-index: 1; pointer-events: none;"></div>
    
    <!-- Layer 02: Soft violet radial atmosphere -->
    <div style="position: absolute; inset: 0; background: radial-gradient(circle at 40% 30%, rgba(139,92,246,0.12) 0%, transparent 60%); z-index: 1; pointer-events: none;"></div>
    
    <!-- Layer 03: Soft cyan futuristic glow -->
    <div style="position: absolute; inset: 0; background: radial-gradient(circle at 70% 60%, rgba(6,182,212,0.08) 0%, transparent 60%); z-index: 1; pointer-events: none;"></div>
    
    <!-- Layer 04: Very subtle moving fog blur -->
    <div class="subtle-fog-layer"></div>
    
    <!-- Layer 05: Edge vignette darkening -->
    <div style="position: absolute; inset: 0; box-shadow: inset 0 0 180px rgba(0, 0, 0, 0.95); z-index: 1; pointer-events: none;"></div>
    
    <!-- Layer 06: Soft cinematic grain texture -->
    <div style="position: absolute; inset: 0; background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E'); opacity: 0.04; z-index: 1; pointer-events: none; mix-blend-mode: overlay;"></div>

    <!-- Ambient Orbs -->
    <div class="ambient-orb violet-orb"></div>
    <div class="ambient-orb cyan-orb"></div>`;

const cssRegex = /      \/\* Ambient Orbs \*\/[\s\S]*?      }\n      @media \(max-width: 768px\) {\n        \.ambient-orb { display: none; }\n      }/;

const newCssBlock = `      /* Ambient Orbs */
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
      }`;

let replaced = false;

if (htmlRegex.test(content) && cssRegex.test(content)) {
    let newContent = content.replace(htmlRegex, newHtmlBlock);
    newContent = newContent.replace(cssRegex, newCssBlock);
    fs.writeFileSync(path, newContent, 'utf-8');
    console.log('REPLACED SUCCESSFULLY');
    replaced = true;
} else {
    if (!htmlRegex.test(content)) console.log('COULD NOT FIND HTML SECTION');
    if (!cssRegex.test(content)) console.log('COULD NOT FIND CSS SECTION');
}
