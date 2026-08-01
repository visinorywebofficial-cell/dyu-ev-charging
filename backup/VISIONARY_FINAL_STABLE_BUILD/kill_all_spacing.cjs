/**
 * kill_all_spacing.cjs
 * Comprehensive regex-based spacing fix for all sections.
 * Targets every large padding/margin in the CSS block.
 */
const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

// ── CSS-only block (everything between <style> and </style>) ──────────────────
const styleStart = html.indexOf('<style>') + '<style>'.length;
const styleEnd   = html.indexOf('</style>');
let css = html.substring(styleStart, styleEnd);

// ── Replacement map: [regex, replacement] ─────────────────────────────────────
const fixes = [

  // glowing-features-section — massive min-height and padding
  [/\.glowing-features-section\s*\{([^}]+)min-height:\s*100vh;/g,
   '.glowing-features-section {$1min-height: auto;'],

  [/\.glowing-features-section\s*\{([^}]+)padding:\s*3rem\s*1\.5rem;/g,
   '.glowing-features-section {$1padding: 48px 24px;'],

  // glowing-features @media (min-width:768px) override — 6rem 3rem
  [/padding:\s*6rem\s*3rem;/g, 'padding: 48px 24px;'],

  // gf-subtext — 80px bottom margin
  [/(\.gf-subtext\s*\{[^}]+)margin-bottom:\s*80px;/g, '$1margin-bottom: 32px;'],

  // gf-grid — margin-bottom 60px, gap 40px
  [/(\.gf-grid\s*\{[^}]+)gap:\s*40px;/g,   '$1gap: 20px;'],
  [/(\.gf-grid\s*\{[^}]+)margin-bottom:\s*60px;/g, '$1margin-bottom: 32px;'],

  // cinematic-stats — massive padding
  [/(\.cinematic-stats\s*\{[^}]+)padding:\s*40px\s*60px;/g, '$1padding: 24px 32px;'],

  // cinematic-split-layout margin-bottom
  [/(\.cinematic-split-layout\s*\{[^}]+)margin-bottom:\s*80px;/g, '$1margin-bottom: 32px;'],

  // social-proof — any remaining large clamp
  [/\.social-proof\s*\{\s*padding:\s*clamp\([^)]+\)\s*0;/g,
   '.social-proof { padding: 32px 0;'],

  // features
  [/\.features\s*\{\s*padding:\s*clamp\([^)]+\)\s*0;/g,
   '.features { padding: 40px 0;'],

  // system-features
  [/\.system-features\s*\{\s*padding:\s*clamp\([^)]+\)\s*0;/g,
   '.system-features { padding: 40px 0;'],

  // process
  [/\.process\s*\{\s*padding:\s*clamp\([^)]+\)\s*0;/g,
   '.process { padding: 40px 0;'],

  // cinematic-video-section
  [/\.cinematic-video-section\s*\{([^}]+)padding:\s*clamp\([^)]+\)\s*0;/g,
   '.cinematic-video-section {$1padding: 40px 0;'],

  // section-header margin
  [/(\.section-header\s*\{[^}]+)margin-bottom:\s*\d+px;/g, '$1margin-bottom: 28px;'],

  // process-steps gaps
  [/(\.process-steps\s*\{[^}]+)gap:\s*\d+px;/g,   '$1gap: 32px;'],
  [/(\.process-steps\s*\{[^}]+)margin-top:\s*\d+px;/g, '$1margin-top: 28px;'],

  // footer
  [/footer\s*\{([^}]+)padding:\s*\d+px\s*0\s*\d+px;/g, 'footer {$1padding: 40px 0 24px;'],

  // footer-grid
  [/(\.footer-grid\s*\{[^}]+)margin-bottom:\s*\d+px;/g, '$1margin-bottom: 32px;'],
  [/(\.footer-grid\s*\{[^}]+)gap:\s*\d+px;/g,           '$1gap: 32px;'],

  // cinematic-experience (the ambient section)
  [/\.cinematic-experience\s*\{([^}]+)height:\s*80vh;/g,
   '.cinematic-experience {$1height: 50vh;'],

  // any remaining clamp with large values (80px+) — nuclear fallback
  // e.g. clamp(80px, 12vw, 160px) → clamp(32px, 4vw, 60px)
  [/clamp\(80px,\s*12vw,\s*160px\)/g, 'clamp(32px, 4vw, 60px)'],
  [/clamp\(100px,\s*15vw,\s*200px\)/g, 'clamp(32px, 4vw, 60px)'],
  [/clamp\(100px,\s*10vw,\s*150px\)/g, 'clamp(32px, 4vw, 60px)'],
  [/clamp\(60px,\s*8vw,\s*100px\)/g,   'clamp(24px, 3vw, 48px)'],
  [/clamp\(80px,\s*12vw,\s*160px\)/g,  'clamp(24px, 3vw, 48px)'],
  [/clamp\(48px,\s*6vw,\s*80px\)/g,    'clamp(24px, 3vw, 48px)'],
  [/clamp\(32px,\s*4vw,\s*56px\)/g,    'clamp(20px, 3vw, 40px)'],

  // social proof paragraph margin
  [/(\.social-proof\s+p\s*\{[^}]+)margin-bottom:\s*40px;/g, '$1margin-bottom: 20px;'],

  // logos-strip gap
  [/(\.logos-strip\s*\{[^}]+)gap:\s*40px;/g, '$1gap: 24px;'],

  // step gaps
  [/(\.step\s*\{[^}]+)gap:\s*60px;/g, '$1gap: 32px;'],

  // cinematic-split-layout gap
  [/(\.cinematic-split-layout\s*\{[^}]+)gap:\s*60px;/g, '$1gap: 32px;'],
];

// Apply all fixes
let fixed = css;
fixes.forEach(([pattern, replacement]) => {
  fixed = fixed.replace(pattern, replacement);
});

// ── Inject a global spacing override block right after :root ──────────────────
const GLOBAL_OVERRIDE = `
    /* ─── GLOBAL SPACING OVERRIDE ─────────────────────────── */
    /* Prevents any section from having runaway vertical space */
    #site-content section,
    #site-content > div {
      margin-top: 0 !important;
      margin-bottom: 0 !important;
    }
    /* Tight padding on every section by default */
    #site-content section {
      padding-top:    clamp(32px, 4vw, 56px);
      padding-bottom: clamp(32px, 4vw, 56px);
    }
    /* Section headers — compact */
    .section-header { margin-bottom: 28px; }
    /* Glass-card inner spacing */
    .glass-card     { padding: 28px; }
    /* Cinematic ambient height */
    .cinematic-experience { height: 46vh !important; min-height: unset; }
    /* Glowing features */
    .glowing-features-section { padding: 40px 24px !important; min-height: unset !important; }
    .gf-subtext   { margin-bottom: 28px !important; }
    .gf-grid      { margin-bottom: 28px !important; gap: 16px !important; }
    /* Stats bar */
    .cinematic-stats { padding: 20px 28px !important; }
    /* Footer */
    footer { padding: 36px 0 20px !important; }
    .footer-grid { margin-bottom: 28px !important; }
`;

// Insert global override right before the SOCIAL PROOF block
fixed = fixed.replace(
  '/* ─── SOCIAL PROOF ─────────────────────────── */',
  GLOBAL_OVERRIDE + '\n    /* ─── SOCIAL PROOF ─────────────────────────── */'
);

// ── Rebuild the HTML with the fixed CSS ──────────────────────────────────────
html = html.substring(0, styleStart) + fixed + html.substring(styleEnd);
fs.writeFileSync('index.html', html, 'utf-8');

// ── Report ───────────────────────────────────────────────────────────────────
const out = fs.readFileSync('index.html', 'utf-8');
console.log('Done. Lines:', out.split('\n').length, '| Bytes:', out.length);
console.log(out.includes('GLOBAL SPACING OVERRIDE') ? '✓ Global override injected' : '✗ Global override MISSING');
console.log(out.includes('min-height: unset')       ? '✓ min-height overrides'    : '✗ min-height check');
console.log(out.trimEnd().endsWith('</html>')       ? '✓ Clean close'             : '✗ Bad file end');
