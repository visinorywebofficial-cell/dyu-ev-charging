
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FrameScrubSectionProps {
  totalFrames?: number;
  framePathPrefix?: string;
  maxMobileCropRatio?: number; // Max horizontal crop allowed from each edge on mobile (default 0.05 = 5% max crop per edge)
}

export function FrameScrubSection({
  totalFrames = 269,
  framePathPrefix = "/dyu-frames-269",
  maxMobileCropRatio = 0.05
}: FrameScrubSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const renderedFrameRef = useRef(0);
  const [shouldLoadFrames, setShouldLoadFrames] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const drawFrameRef = useRef<(index: number) => void>(() => {});

  const getFrameSrc = (index: number): string => {
    const padded = String(index).padStart(3, "0");
    return `${framePathPrefix}/ezgif-frame-${padded}.png`;
  };

  // 1. IntersectionObserver: Trigger frame loading and active viewport gating
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof window === "undefined") return;

    if (!("IntersectionObserver" in window)) {
      setShouldLoadFrames(true);
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          setShouldLoadFrames(true);
        }
      },
      { rootMargin: "600px 0px 600px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 2. Main Frame scrub & render effect (Runs only when shouldLoadFrames is true)
  useEffect(() => {
    if (!shouldLoadFrames || typeof window === "undefined") return;

    // Configure GSAP to handle mobile viewport resizing smoothly
    ScrollTrigger.config({ ignoreMobileResize: true });

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Set canvas size to match viewport
    const winWidth = window.innerWidth || 375;
    const winHeight = window.innerHeight || 667;
    canvas.width = winWidth;
    canvas.height = winHeight;

    // Check if mobile viewport (< 768px)
    const isMobile = window.innerWidth < 768;

    // Draw a specific frame index (0-based) using crop-safe mode on mobile and full-bleed cover on desktop
    const drawFrame = (index: number) => {
      if (!canvas || !ctx) return;
      const img = framesRef.current[index];
      if (!img?.complete || !img.naturalWidth) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = canvas.width / canvas.height;

      if (imgAspect > canvasAspect) {
        if (isMobile) {
          // Crop-safe mobile aspect math:
          // Cap horizontal crop so edge text (DYU logo, POWERED DELIVERED) is never cut off
          const fullCoverSw = img.naturalHeight * canvasAspect;
          const minAllowedSw = img.naturalWidth * (1 - 2 * maxMobileCropRatio);
          
          const sw = Math.max(fullCoverSw, minAllowedSw);
          const sx = (img.naturalWidth - sw) / 2;
          const sh = img.naturalHeight;
          const sy = 0;

          // Preserve aspect ratio when drawing to destination canvas
          const destAspect = sw / sh;
          let dw = canvas.width;
          let dh = canvas.width / destAspect;

          if (dh > canvas.height) {
            dh = canvas.height;
            dw = canvas.height * destAspect;
          }

          const dx = (canvas.width - dw) / 2;
          const dy = (canvas.height - dh) / 2;

          ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
        } else {
          // Desktop: Pure full-bleed cover
          const sw = img.naturalHeight * canvasAspect;
          const sx = (img.naturalWidth - sw) / 2;
          ctx.drawImage(img, sx, 0, sw, img.naturalHeight, 0, 0, canvas.width, canvas.height);
        }
      } else {
        const sh = img.naturalWidth / canvasAspect;
        const sy = (img.naturalHeight - sh) / 2;
        ctx.drawImage(img, 0, sy, img.naturalWidth, sh, 0, 0, canvas.width, canvas.height);
      }
    };

    // Load first frame immediately
    const firstImg = new Image();
    firstImg.src = getFrameSrc(1);
    firstImg.onload = () => {
      framesRef.current[0] = firstImg;
      drawFrame(0);
    };

    // Batched frame preloader (chunked to unblock main thread)
    let isCancelled = false;
    let batchIndex = 0;
    const loadNextBatch = () => {
      if (isCancelled) return;
      const batchSize = 12;
      const end = Math.min(batchIndex + batchSize, totalFrames);
      for (; batchIndex < end; batchIndex++) {
        const idx = batchIndex;
        const img = new Image();
        img.src = getFrameSrc(idx + 1);
        img.onload = () => {
          framesRef.current[idx] = img;
          if (idx === 0 || idx === Math.round(targetFrameRef.current)) drawFrame(idx);
        };
      }
      if (batchIndex < totalFrames) {
        setTimeout(loadNextBatch, 35);
      }
    };
    loadNextBatch();

    // Resize listener for full-bleed canvas scaling
    let prevWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      if (!canvas) return;
      const width = window.innerWidth;
      if (width === prevWidth) return;
      prevWidth = width;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);

      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    drawFrameRef.current = drawFrame;

    // GSAP ScrollTrigger — pin section, update target frame
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: () => `+=${isMobile ? (window.innerHeight || 667) * 2.5 : (window.innerHeight || 800) * 4}`,
      pin: true,
      scrub: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        targetFrameRef.current = self.progress * (totalFrames - 1);
      },
    });

    return () => {
      isCancelled = true;
      clearTimeout(resizeTimer);
      trigger.kill();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [shouldLoadFrames, totalFrames, framePathPrefix, maxMobileCropRatio]);

  // 3. 60fps Smooth Lerp Video Loop (Runs ONLY when section is in viewport)
  useEffect(() => {
    if (!shouldLoadFrames || !isInView) return;

    let animFrameId: number;
    const updateVideoLoop = () => {
      const diff = targetFrameRef.current - renderedFrameRef.current;
      if (Math.abs(diff) > 0.001) {
        renderedFrameRef.current += diff * 0.25;
        const frameIdx = Math.min(Math.max(Math.round(renderedFrameRef.current), 0), totalFrames - 1);
        if (frameIdx !== currentFrameRef.current) {
          currentFrameRef.current = frameIdx;
          drawFrameRef.current(frameIdx);
        }
      }
      animFrameId = requestAnimationFrame(updateVideoLoop);
    };

    animFrameId = requestAnimationFrame(updateVideoLoop);
    return () => cancelAnimationFrame(animFrameId);
  }, [isInView, shouldLoadFrames, totalFrames]);

  return (
    <div
      ref={sectionRef}
      className="w-full h-[100vh] relative overflow-hidden bg-black flex items-center justify-center"
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
}

