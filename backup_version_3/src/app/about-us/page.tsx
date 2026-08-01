'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';

const Car3D = dynamic(() => import('@/components/Car3D'), { ssr: false });

export default function AboutUsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Force scroll to top on mount to ensure starting fresh
    window.scrollTo(0, 0);
    setMounted(true);

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Content reveal animations
      gsap.utils.toArray('.content-block').forEach((block: any) => {
        gsap.fromTo(block, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1,
            scrollTrigger: {
              trigger: block,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div 
      id="about-container"
      ref={containerRef}
      className="relative w-full" 
      style={{ 
        backgroundColor: '#F1EFE1', 
        color: '#222222', 
        fontFamily: "'Gilroy', sans-serif",
        height: '400vh' 
      }}
    >
      {/* LOCAL 3D CANVAS - Pure mathematics, no GSAP DOM proxies */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 10, pointerEvents: 'none' }}>
        {mounted && <Car3D />}
      </div>

      {/* SVG Background Track */}
      <svg 
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" 
        viewBox="0 0 1000 4000" 
        preserveAspectRatio="none"
      >
        <path 
          id="car-path" 
          d="M 500,0 
             C 900,500 900,1000 500,1500 
             C 100,2000 100,2500 500,3000 
             C 900,3500 500,4000 500,4000" 
          fill="none" 
          stroke="#222222" 
          strokeWidth="4" 
          strokeDasharray="20 20"
          opacity="0.3"
        />
      </svg>

      {/* Content Blocks (z-index 20 to appear above everything) */}
      <div className="relative z-20 w-full h-full pointer-events-none">
        
        <div className="absolute top-[10vh] left-0 w-full flex justify-center text-center px-4">
          <div className="content-block max-w-2xl pointer-events-auto">
            <h1 className="flex flex-col gap-1 mb-6 tracking-tighter" style={{ fontFamily: '"Gilroy", sans-serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              <span className="text-[#222222]">Driving the future</span>
              <span className="text-[#888888] italic">of mobility</span>
            </h1>
            <p className="text-base md:text-lg font-medium opacity-80">
              Scroll down to ride along our journey and discover how we are building the future of mobility.
            </p>
          </div>
        </div>

        <div className="absolute top-[100vh] left-[5%] md:left-[10%] w-[80%] md:w-[30%] pointer-events-auto">
          <div className="content-block bg-[#F1EFE1]/90 backdrop-blur-md p-4 md:p-6 rounded-2xl border border-[#222222]/10 shadow-xl">
            <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
              <span className="block text-[#222222]">Our vision</span>
              <span className="block text-[#888888] italic">for a sustainable future</span>
            </h2>
            <p className="text-base md:text-lg opacity-80 leading-relaxed font-medium">
              To make EV charging as accessible and effortless as grabbing a cup of coffee. We believe in a sustainable future where range anxiety is a thing of the past. 
              By deploying smart, reliable, and ultra-fast charging stations across the country, we are paving the way for mass EV adoption.
            </p>
          </div>
        </div>

        <div className="absolute top-[225vh] right-[5%] md:right-[10%] w-[80%] md:w-[30%] text-right pointer-events-auto">
          <div className="content-block bg-[#222222] text-[#F1EFE1] p-4 md:p-6 rounded-2xl shadow-xl">
            <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
              <span className="block text-[#F1EFE1]">Smart hardware</span>
              <span className="block text-[#a3a3a3] italic">connected to the cloud</span>
            </h2>
            <p className="text-base md:text-lg opacity-90 leading-relaxed font-medium">
              Our charging stations aren't just plugs; they are intelligent nodes connected to a robust cloud infrastructure. 
              Featuring real-time diagnostics, seamless payment integrations, and dynamic load balancing, our hardware ensures a premium experience every single time you plug in.
            </p>
          </div>
        </div>

        <div className="absolute top-[340vh] left-[5%] md:left-[10%] w-[80%] md:w-[30%] pointer-events-auto">
          <div className="content-block bg-[#F1EFE1]/90 backdrop-blur-md p-4 md:p-6 rounded-2xl border border-[#222222]/10 shadow-xl">
            <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
              <span className="block text-[#222222]">The largest network</span>
              <span className="block text-[#888888] italic">always within reach</span>
            </h2>
            <p className="text-base md:text-lg opacity-80 leading-relaxed font-medium">
              With over 10,000 active charging points and growing, we are building the most expansive and reliable EV charging network in the country.
              Whether you are on a daily commute or a cross-country road trip, our chargers are always within your reach.
            </p>
          </div>
        </div>

        <div className="absolute top-[380vh] left-0 w-full flex justify-center text-center pointer-events-auto">
          <div className="content-block">
            <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
              <span className="text-[#222222]">The journey</span>
              <span className="text-[#888888] italic">continues...</span>
            </h2>
          </div>
        </div>

      </div>
    </div>
  );
}
