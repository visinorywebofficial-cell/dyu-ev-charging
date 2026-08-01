# VISIONARY FINAL STABLE BUILD

This is the exact, stable, and completely working state of the Visionary Web website. 

## HERO SYSTEM & CANVAS LOGIC
- **Hero Controller:** Found in `index.html` inside `initCinematicHero()`. The logic is purely mapped to native scrolling using `updateProgressOnScroll()` to preserve absolute scroll fidelity and reverse cinematic playback naturally.
- **Canvas Rendering:** The `paint(idx)` function intelligently scales images using exact `imageAspect` and `viewportAspect` comparison logic, fitting the canvas dynamically and preserving the original cinematic framing (ensuring no face cropping or aggressive zooming).
- **233 Image Sequence:** Loaded directly from `./ezgif-frame-001.jpg` through `./ezgif-frame-233.jpg` via the `frameSrc` function. The relative path guarantees local playability.

## SECTION OVERVIEW
- **Hero Structure:** Handled natively via `.hero-scroll-outer` (`height: 500vh`) and the sticky inner `.hero` (`height: 100vh`).
- **Scroll Storytelling:** The rest of the page (`#site-content`) is securely placed after the 500vh element. It perfectly scrolls into the viewport from the bottom *only* when the cinematic scroll hits 100% and frame 233 is reached.
- **Other Sections:** The cinematic review sections, process sections, and all layouts have been snapshotted exactly as they are.

## RESTORE INSTRUCTIONS
If the primary site is broken or altered in a negative way, you can instantly restore this entire setup.

1. Open PowerShell.
2. Run the restore script in this directory: `.\Restore-Visionary.ps1`
3. This will instantly replace your current working directory with this master snapshot.
