
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FrameScrubSectionProps {
  totalFrames?: number;
  framePathPrefix?: string;
}

export function FrameScrubSection({
  totalFrames = 280,
  framePathPrefix = "/dyu-frames-280"
}: FrameScrubSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  const getFrameSrc = (index: number): string => {
    const padded = String(index).padStart(3, "0");
    return `${framePathPrefix}/ezgif-frame-${padded}.png`;
  };

  useEffect(() => {
    // Configure GSAP to handle mobile viewport resizing smoothly
    ScrollTrigger.config({ ignoreMobileResize: true });

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Set canvas size to match first frame aspect ratio
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Draw a specific frame index (0-based)
    const drawFrame = (index: number) => {
      const img = framesRef.current[index];
      if (!img?.complete || !img.naturalWidth) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Cover the canvas preserving aspect ratio
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = canvas.width / canvas.height;
      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
      if (imgAspect > canvasAspect) {
        sw = img.naturalHeight * canvasAspect;
        sx = (img.naturalWidth - sw) / 2;
      } else {
        sh = img.naturalWidth / canvasAspect;
        sy = (img.naturalHeight - sh) / 2;
      }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    };

    // Draw frame 0 immediately (white canvas until loaded)
    const firstImg = new Image();
    firstImg.src = getFrameSrc(1);
    firstImg.onload = () => {
      framesRef.current[0] = firstImg;
      drawFrame(0);
    };

    // Preload all frames in background
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = getFrameSrc(i + 1);
      img.onload = () => {
        framesRef.current[i] = img;
        if (i === 0) drawFrame(0);
      };
    }

    // Resize handler (only trigger on actual width change to avoid mobile address bar glitches)
    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (!canvas) return;
      if (window.innerWidth === lastWidth) return; // Prevent height-only resize triggers on mobile
      lastWidth = window.innerWidth;
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };
    window.addEventListener("resize", handleResize);

    // GSAP ScrollTrigger — pin section, scrub through frames
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 4}`,
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate: (self) => {
        const frameIndex = Math.min(
          Math.floor(self.progress * (totalFrames - 1)),
          totalFrames - 1
        );
        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }
      },
    });

    return () => {
      trigger.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        width: "100%",
        height: "100dvh",
        position: "relative",
        overflow: "hidden",
        background: "#000",
      }}
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

