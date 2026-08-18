
"use client";

import { cn } from "@/lib/utils";
import { motion, useTransform, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollSplitCardItem {
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
  icon?: React.ReactNode;
  image?: string;
}

interface ScrollSplitCardProps {
  className?: string;
  imageSrc: string;
  cards: ScrollSplitCardItem[];
  containerRef?: React.RefObject<HTMLElement | null>;
}

export function ScrollSplitCard({
  className,
  imageSrc,
  cards,
  containerRef: externalContainerRef,
}: ScrollSplitCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let prevWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    const handleResize = () => {
      const width = window.innerWidth;
      if (width !== prevWidth) {
        prevWidth = width;
        setIsMobile(width < 768);
      }
    };
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const progress = useMotionValue(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const el = containerRef.current;
    if (!el) return;

    // Direct geometric scroll calculator (failsafe against any ScrollTrigger/overflow bugs)
    const updateProgress = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable <= 0) return;
      
      const currentScroll = -rect.top;
      const raw = currentScroll / totalScrollable;
      const clamped = Math.max(0, Math.min(1, raw));
      progress.set(clamped);
    };

    // GSAP ScrollTrigger integration
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        progress.set(self.progress);
      },
    });

    // Refresh triggers to account for preloader completion and lazy images
    const t1 = setTimeout(() => {
      ScrollTrigger.refresh();
      updateProgress();
    }, 500);
    const t2 = setTimeout(() => {
      ScrollTrigger.refresh();
      updateProgress();
    }, 2400);

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });

    // Initial update
    updateProgress();

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      trigger.kill();
    };
  }, [progress]);

  // Phase 1: Separation (0 to 0.25)
  const leftX = useTransform(progress, [0, 0.25, 0.60], isMobile ? [0, -12, -6] : [0, -48, -24]);
  const rightX = useTransform(progress, [0, 0.25, 0.60], isMobile ? [0, 12, 6] : [0, 48, 24]);
  const scale = useTransform(progress, [0, 0.25], [1, 0.95]);

  // Phase 2: Flip 180 degrees (0.25 to 0.60)
  const rotateY = useTransform(progress, [0.25, 0.60], [0, 180]);
  const rotateZLeft = useTransform(progress, [0.25, 0.60], [0, isMobile ? 3 : 5]);
  const rotateZRight = useTransform(progress, [0.25, 0.60], [0, isMobile ? -3 : -5]);

  // Face swaps at the 90deg mark (progress 0.425)
  const frontFaceOpacity = useTransform(progress, [0.41, 0.44], [1, 0]);
  const backFaceOpacity = useTransform(progress, [0.41, 0.44], [0, 1]);
  const frontZIndex = useTransform(progress, [0.41, 0.44], [2, 0]);
  const backZIndex = useTransform(progress, [0.41, 0.44], [0, 2]);

  // Border radius separation
  const borderRadiusLeft = useTransform(progress, [0, 0.15], isMobile ? ["16px", "16px"] : ["16px 0px 0px 16px", "16px 16px 16px 16px"]);
  const borderRadiusMiddle = useTransform(progress, [0, 0.15], isMobile ? ["16px", "16px"] : ["0px 0px 0px 0px", "16px 16px 16px 16px"]);
  const borderRadiusRight = useTransform(progress, [0, 0.15], isMobile ? ["16px", "16px"] : ["0px 16px 16px 0px", "16px 16px 16px 16px"]);

  // Start scroll indicator
  const startTextOpacity = useTransform(progress, [0, 0.1], [1, 0]);
  const startTextY = useTransform(progress, [0, 0.1], [0, 20]);

  const optimizedImageSrc = imageSrc.includes("unsplash.com")
    ? imageSrc.replace(/w=\d+/, isMobile ? "w=1200" : "w=1800")
    : imageSrc;

  return (
    <div
      ref={containerRef}
      className={cn("relative h-[350vh] w-full bg-white", className)}
    >
      <div className="sticky top-0 flex h-[100vh] w-full items-center justify-center overflow-hidden [perspective:1200px] bg-white">
        {/* Starting Text indicator */}
        <motion.div
          className="absolute top-[12%] md:top-[16%] left-0 right-0 text-center pointer-events-none z-30"
          style={{
            opacity: startTextOpacity,
            y: startTextY,
          }}
        >
          <p className="text-xs md:text-sm font-medium tracking-widest text-foreground/50 uppercase">
            Scroll down
          </p>
        </motion.div>

        <motion.div
          style={{ 
            scale,
            transformStyle: "preserve-3d", 
            WebkitTransformStyle: "preserve-3d" 
          }}
          className="flex flex-row h-[340px] md:h-[420px] w-full max-w-[360px] md:max-w-4xl px-2 md:px-4 relative will-change-transform"
        >
          {cards.slice(0, 3).map((card, i) => (
            <motion.div
              key={i}
              className="relative h-full flex-1 will-change-transform"
              style={{
                x: i === 0 ? leftX : i === 2 ? rightX : 0,
                rotateY,
                rotateZ: i === 0 ? rotateZLeft : i === 2 ? rotateZRight : 0,
                transformStyle: "preserve-3d",
                WebkitTransformStyle: "preserve-3d",
              }}
            >
              {/* Front Side: Original Image Split */}
              <motion.div
                className="absolute inset-0 overflow-hidden will-change-transform shadow-xl"
                style={{
                  zIndex: frontZIndex,
                  opacity: frontFaceOpacity,
                  borderRadius: i === 0 ? borderRadiusLeft : i === 2 ? borderRadiusRight : borderRadiusMiddle,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <div
                  className="absolute inset-0 h-full w-[300%]"
                  style={{
                    left: `${-100 * i}%`,
                    backgroundImage: `url(${optimizedImageSrc})`,
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
              </motion.div>

              {/* Back Side: Flipped Content Card */}
              <motion.div
                className={cn(
                  "absolute inset-0 overflow-hidden flex flex-col justify-end p-3 sm:p-4 md:p-6 will-change-transform rounded-2xl",
                  "border border-white/10 shadow-2xl"
                )}
                style={{
                  backgroundColor: card.bgColor || "#002B36",
                  color: card.textColor || "#FFFFFF",
                  transform: "rotateY(180deg)",
                  zIndex: backZIndex,
                  opacity: backFaceOpacity,
                  borderRadius: i === 0 ? borderRadiusLeft : i === 2 ? borderRadiusRight : borderRadiusMiddle,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                {card.image && (
                  <div className="absolute top-0 left-0 right-0 h-[48%] md:h-[56%] overflow-hidden">
                    <img 
                      src={card.image} 
                      alt={card.title} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                  </div>
                )}

                <div className="relative z-10 mt-auto text-white">
                  <h3 className="mb-1 md:mb-2 text-[12px] sm:text-[14px] md:text-xl font-bold leading-tight drop-shadow text-white !text-white" style={{ color: '#FFFFFF' }}>
                    {card.title}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] md:text-sm font-normal leading-relaxed drop-shadow text-white/90 !text-white/90 line-clamp-4 md:line-clamp-none" style={{ color: '#FFFFFF' }}>
                    {card.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

