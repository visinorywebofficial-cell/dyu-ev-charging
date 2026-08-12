
"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, useMotionValue, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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
  const [scrollContainer, setScrollContainer] = useState<React.RefObject<HTMLElement | null> | undefined>();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Check initially
    window.addEventListener("resize", handleResize);
    
    if (externalContainerRef?.current) {
      setScrollContainer(externalContainerRef);
    }
    return () => window.removeEventListener("resize", handleResize);
  }, [externalContainerRef]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    ...(scrollContainer ? { container: scrollContainer } : {}),
    offset: ["start start", "end end"],
  });

  // Gated scroll progress only updates when the component is inside/near the viewport
  const inView = useInView(containerRef, { margin: "400px 0px" });
  const gatedProgress = useMotionValue(0);

  useEffect(() => {
    if (inView) {
      gatedProgress.set(scrollYProgress.get());
    }
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (inView) {
        gatedProgress.set(latest);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, inView, gatedProgress]);

  // Stage 1 to 2: Separation (0 to 0.4), then Stage 2 to 3: Overlap closer (0.4 to 0.8)
  const leftX = useTransform(gatedProgress, [0, 0.4, 0.8], isMobile ? [0, -12, -6] : [0, -48, -24]);
  const rightX = useTransform(gatedProgress, [0, 0.4, 0.8], isMobile ? [0, 12, 6] : [0, 48, 24]);
  
  const scale = useTransform(gatedProgress, [0, 0.4], [1, 0.9]);

  // Stage 2 to 3: Flip (0.4 to 0.8)
  const rotateY = useTransform(gatedProgress, [0.4, 0.8], [0, 180]);
  // Due to 180deg Y flip, positive Z becomes visual counter-clockwise, negative Z becomes visual clockwise
  const rotateZLeft = useTransform(gatedProgress, [0.4, 0.8], [0, isMobile ? 3 : 6]);
  const rotateZRight = useTransform(gatedProgress, [0.4, 0.8], [0, isMobile ? -3 : -6]);

  // Opacities for Front and Back faces during rotation to bypass Webkit backface-visibility bugs
  const frontFaceOpacity = useTransform(rotateY, [0, 89, 90, 180], [1, 1, 0, 0]);
  const backFaceOpacity = useTransform(rotateY, [0, 90, 91, 180], [0, 0, 1, 1]);

  // Dynamic borders/radii so it looks like ONE flat image initially
  const borderRadiusLeft = useTransform(gatedProgress, [0, 0.2], isMobile ? ["16px 16px 16px 16px", "16px 16px 16px 16px"] : ["16px 0px 0px 16px", "16px 16px 16px 16px"]);
  const borderRadiusMiddle = useTransform(gatedProgress, [0, 0.2], isMobile ? ["16px 16px 16px 16px", "16px 16px 16px 16px"] : ["0px 0px 0px 0px", "16px 16px 16px 16px"]);
  const borderRadiusRight = useTransform(gatedProgress, [0, 0.2], isMobile ? ["16px 16px 16px 16px", "16px 16px 16px 16px"] : ["0px 16px 16px 0px", "16px 16px 16px 16px"]);
  const borderOpacity = useTransform(gatedProgress, [0, 0.2], [0, 0.2]);
  const shadowOpacity = useTransform(gatedProgress, [0, 0.2], [0, 0.4]);

  // Cards move up in the last viewport
  const cardsY = useTransform(gatedProgress, [0.8, 1], [0, isMobile ? -80 : -200]);

  // Text appearance at the end in the sticky viewport
  const textOpacity = useTransform(gatedProgress, [0.8, 1], [0, 1]);
  const textY = useTransform(gatedProgress, [0.8, 1], [40, 0]);

  // Indicator text appearance at the start
  const startTextOpacity = useTransform(gatedProgress, [0, 0.1], [1, 0]);
  const startTextY = useTransform(gatedProgress, [0, 0.1], [0, 20]);

  const optimizedImageSrc = imageSrc.includes("unsplash.com")
    ? imageSrc.replace(/w=\d+/, isMobile ? "w=800" : "w=1600")
    : imageSrc;

  return (
    <div
      ref={containerRef}
      className={cn("relative h-[500dvh] w-full", className)}
    >
      <div className="sticky top-0 flex h-[100dvh] w-full items-center justify-center overflow-hidden [perspective:1200px]">
        {/* Starting Text indicator */}
        <motion.div
          className="absolute top-[15%] md:top-[20%] left-0 right-0 text-center pointer-events-none z-30"
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
            y: cardsY, 
            transformStyle: "preserve-3d", 
            WebkitTransformStyle: "preserve-3d" 
          }}
          className="flex flex-row h-[320px] md:h-[400px] w-full max-w-[360px] md:max-w-4xl px-2 md:px-4 relative will-change-transform"
        >
          {cards.slice(0, 3).map((card, i) => (
            <motion.div
              key={i}
              className="relative h-full flex-1 will-change-transform"
              style={{
                x: i === 0 ? leftX : i === 2 ? rightX : 0,
                rotateY,
                rotateZ: i === 0 ? rotateZLeft : i === 2 ? rotateZRight : 0,
                zIndex: i, // Ensures Left is under Middle, and Right is above Middle
                transformStyle: "preserve-3d",
                WebkitTransformStyle: "preserve-3d",
              }}
            >
              {/* GPU-Accelerated Sibling Shadow Layer (sitting behind both Front and Back sides) */}
              <motion.div 
                className="absolute inset-0 pointer-events-none z-0 will-change-transform" 
                style={{ 
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)", 
                  opacity: shadowOpacity,
                  borderRadius: i === 0 ? borderRadiusLeft : i === 2 ? borderRadiusRight : borderRadiusMiddle,
                }} 
              />

              {/* Front Side: Original Image Split */}
              <motion.div
                className="absolute inset-0 overflow-hidden [backface-visibility:hidden] will-change-transform"
                style={{
                  zIndex: 2, // Ensure front stays above initially
                  borderRadius:
                    i === 0
                      ? borderRadiusLeft
                      : i === 2
                      ? borderRadiusRight
                      : borderRadiusMiddle,
                  WebkitBackfaceVisibility: "hidden",
                  backfaceVisibility: "hidden",
                  transform: "translateZ(1px)",
                  opacity: frontFaceOpacity,
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

                {/* GPU Inner Highlight Border */}
                <motion.div 
                  className="absolute inset-x-0 top-0 h-[1px] bg-white pointer-events-none z-30" 
                  style={{ opacity: borderOpacity }} 
                />

                {/* GPU Inner Bottom Dark Shadow Gradient */}
                <motion.div 
                  className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-20" 
                  style={{ opacity: shadowOpacity }} 
                />
              </motion.div>

              {/* Back Side: New Content Card */}
              <motion.div
                className={cn(
                  "absolute inset-0 overflow-hidden flex flex-col justify-end p-2.5 sm:p-4 md:p-8 [backface-visibility:hidden] will-change-transform",
                  "border border-white/5 bg-gradient-to-br from-white/10 to-transparent",
                  "shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),inset_0_-24px_48px_rgba(0,0,0,0.2)]"
                )}
                style={{
                  backgroundColor: card.bgColor,
                  color: card.textColor,
                  transform: "rotateY(180deg) translateZ(1px)",
                  zIndex: 1, // Ensure back is behind before flip
                  borderRadius:
                    i === 0
                      ? borderRadiusLeft
                      : i === 2
                      ? borderRadiusRight
                      : borderRadiusMiddle,
                  WebkitBackfaceVisibility: "hidden",
                  backfaceVisibility: "hidden",
                  opacity: backFaceOpacity,
                }}
              >
                {/* Grainy Noise Overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
                  style={{
                    backgroundImage: `url("https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png?width=256&height=256")`,
                    backgroundRepeat: "repeat",
                  }}
                />

                {card.image && (
                  <div className="absolute top-0 left-0 right-0 h-[45%] md:h-[60%] overflow-hidden">
                    <img 
                      src={card.image} 
                      alt={card.title} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  </div>
                )}

                <div className="relative z-10 mt-auto text-white">
                  {card.icon && <div className="mb-1 md:mb-3 text-white">{card.icon}</div>}
                  <h3 className="mb-1 md:mb-3 text-[11px] leading-[1.15] sm:text-[14px] md:text-2xl font-bold md:leading-tight drop-shadow-md text-white !text-white" style={{ color: '#FFFFFF' }}>
                    {card.title}
                  </h3>
                  <p className="text-[9px] leading-[1.25] sm:text-[11px] md:text-sm font-medium drop-shadow-md line-clamp-4 md:line-clamp-none text-white !text-white opacity-100" style={{ color: '#FFFFFF' }}>
                    {card.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Ending Text fixed in the sticky viewport */}
        <motion.div
          className="absolute bottom-[15%] md:bottom-[20%] left-0 right-0 text-center pointer-events-none z-30"
          style={{
            opacity: textOpacity,
            y: textY,
          }}
        >
          <p className="text-xl md:text-3xl font-medium tracking-tight text-foreground/80 font-serif italic">
            So cool, right?
          </p>
        </motion.div>
      </div>
    </div>
  );
}

