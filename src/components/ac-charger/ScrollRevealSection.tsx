"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface ScrollRevealSectionProps {
  imageSrc: string;
  imageAlt: string;
  title: React.ReactNode;
  description: string;
  features: { title: string; desc: string }[];
  reverse?: boolean;
}

export function ScrollRevealSection({
  imageSrc,
  imageAlt,
  title,
  description,
  features,
  reverse = false,
}: ScrollRevealSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax and 3D effects
  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen py-16 md:py-32 overflow-hidden flex items-center bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 lg:gap-24`}>
          
          {/* Image Side - Sticky/Parallax */}
          <div className="w-full md:w-1/2 h-[50vh] md:h-[80vh] relative rounded-[2rem] overflow-hidden shadow-2xl">
            <motion.div 
              className="w-full h-full relative origin-center"
              style={{ y: imageY, scale: imageScale }}
            >
              <div className="absolute inset-0 bg-black/10 z-10 transition-colors" />
              {/* Using standard img for external real unsplash images if not configured in next.config, but next/image works with Unsplash if configured. Assuming it's unconfigured, we might need img or to configure next.config. Let's use standard img for safety to avoid next/image domain errors, but we can style it to look identical */}
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>

          {/* Text Side - Scroll Reveal */}
          <motion.div 
            className="w-full md:w-1/2 flex flex-col justify-center"
            style={{ opacity }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="flex flex-col gap-1 mb-6 text-[clamp(32px,4vw,48px)] font-[900] tracking-tighter leading-[1.1]" style={{ fontFamily: '"Gilroy", sans-serif' }}>
                {title}
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {description}
              </p>

              <div className="space-y-6">
                {features.map((feature, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: reverse ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                    className="border-l-4 border-[#00F0FF] pl-6"
                  >
                    <h3 className="mb-2 text-[#333333]" style={{ fontFamily: '"Gilroy", sans-serif', fontWeight: 800, letterSpacing: '0.5px', fontSize: '1.25rem', lineHeight: '1.2' }}>{feature.title}</h3>
                    <p className="text-gray-500 text-sm">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
