"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Zap, 
  ShieldCheck, 
  Settings, 
  ThermometerSnowflake, 
  MonitorPlay, 
  Plug, 
  CheckCircle2, 
  ArrowRight,
  Star,
  Quote
} from "lucide-react";
import Link from "next/link";

// Custom CountUp hook to avoid third-party hydration/SSR issues
function CountUp({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <>{count}{suffix}</>;
}

export default function PortableChargerPage() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Card 1: Top-Left (Fly out to top left)
  const c1X = useTransform(scrollYProgress, [0.1, 0.3], ["0vw", "-100vw"]);
  const c1Y = useTransform(scrollYProgress, [0.1, 0.3], ["0vh", "-100vh"]);
  const c1Rotate = useTransform(scrollYProgress, [0.1, 0.3], [0, -45]);
  const c1Scale = useTransform(scrollYProgress, [0.1, 0.3], [1, 0.5]);
  const c1Opacity = useTransform(scrollYProgress, [0.1, 0.3], [1, 0]);

  // Card 2: Top-Right (Fly out to top right)
  const c2X = useTransform(scrollYProgress, [0.2, 0.4], ["0vw", "100vw"]);
  const c2Y = useTransform(scrollYProgress, [0.2, 0.4], ["0vh", "-100vh"]);
  const c2Rotate = useTransform(scrollYProgress, [0.2, 0.4], [0, 45]);
  const c2Scale = useTransform(scrollYProgress, [0.2, 0.4], [1, 0.5]);
  const c2Opacity = useTransform(scrollYProgress, [0.2, 0.4], [1, 0]);

  // Card 3: Bottom-Left (Fly out to bottom left)
  const c3X = useTransform(scrollYProgress, [0.4, 0.6], ["0vw", "-100vw"]);
  const c3Y = useTransform(scrollYProgress, [0.4, 0.6], ["0vh", "100vh"]);
  const c3Rotate = useTransform(scrollYProgress, [0.4, 0.6], [0, -45]);
  const c3Scale = useTransform(scrollYProgress, [0.4, 0.6], [1, 0.5]);
  const c3Opacity = useTransform(scrollYProgress, [0.4, 0.6], [1, 0]);

  // Card 4: Bottom-Right (Fly out to bottom right)
  const c4X = useTransform(scrollYProgress, [0.6, 0.8], ["0vw", "100vw"]);
  const c4Y = useTransform(scrollYProgress, [0.6, 0.8], ["0vh", "100vh"]);
  const c4Rotate = useTransform(scrollYProgress, [0.6, 0.8], [0, 45]);
  const c4Scale = useTransform(scrollYProgress, [0.6, 0.8], [1, 0.5]);
  const c4Opacity = useTransform(scrollYProgress, [0.6, 0.8], [1, 0]);

  return (
    <div className="min-h-screen relative font-['Figtree'] bg-[#001E2B] text-white">
      {/* FIXED BACKGROUND VIDEO & DARK CINEMATIC OVERLAY */}
      <div className="fixed inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="auto"
          className="w-full h-full object-cover opacity-85"
        >
          <source src="https://cdn.jsdelivr.net/gh/visinorywebofficial-cell/dyu-ev-charging@main/public/ev-charging-2.mp4" type="video/mp4" />
          <source src="/ev-charging-2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 z-0" />
      </div>

      <main className="pt-24 pb-20 relative z-10">
        
        {/* HERO SECTION */}
        <section className="min-h-[70vh] flex items-center justify-center relative z-10">
          <div className="container mx-auto px-4 text-center">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/30 mb-8 shadow-sm"
              style={{ fontFamily: 'var(--font-figtree)' }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-base font-semibold text-white uppercase tracking-wider" style={{ fontFamily: 'Figtree, sans-serif' }}>Home & Travel Ready</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-col gap-1 mb-6 tracking-tighter"
              style={{ fontFamily: '"Gilroy", sans-serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}
            >
              <span className="text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">3.3 kW Portable</span>
              <span className="text-white italic font-extrabold drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">EV Charger</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl font-bold text-white max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            >
              Simple charging, wherever you need it. Just plug into any standard 3-pin socket and power up your electric vehicle safely.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button className="w-full sm:w-auto px-8 py-3.5 bg-[#005F73] hover:bg-[#00F0FF] hover:text-[#001E2B] text-white rounded-xl font-extrabold text-lg transition-all shadow-lg flex items-center justify-center gap-2">
                Buy Now <ArrowRight className="w-5 h-5" />
              </button>
              <button className="w-full sm:w-auto px-8 py-3.5 bg-white/20 backdrop-blur-md text-white border border-white/40 rounded-xl font-extrabold text-lg hover:bg-white hover:text-black transition-all shadow-sm">
                Talk to an Expert
              </button>
            </motion.div>
          </div>
        </section>

        {/* KEY FEATURES (SCROLL-SCRUBBED 4-CORNER FLY OUT ANIMATION) */}
        <section ref={containerRef} className="h-[400vh] relative w-full z-20">
          <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden pt-16 md:pt-24 pb-8">
            <div className="container mx-auto px-4 max-w-5xl h-full flex flex-col justify-center">
              <div className="text-center max-w-3xl mx-auto mb-4 md:mb-8 shrink-0">
                <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                  <span className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">Key</span>
                  <span className="text-white italic font-extrabold drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">Features</span>
                </h2>
                <p className="text-sm md:text-xl font-bold text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  Scroll down slowly to reveal. Designed for reliability and ultimate convenience.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 gap-2.5 md:gap-6 w-full max-w-4xl mx-auto">
                
                {/* Card 1 */}
                <motion.div 
                  style={{ x: c1X, y: c1Y, rotate: c1Rotate, scale: c1Scale, opacity: c1Opacity }}
                  className="bg-[#111111] backdrop-blur-xl rounded-2xl md:rounded-3xl p-3.5 md:p-6 border border-white/10 shadow-2xl flex flex-col justify-center"
                >
                  <ShieldCheck className="w-6 h-6 md:w-10 md:h-10 text-[#888888] mb-1.5 md:mb-3" />
                  <div className="text-xl md:text-3xl font-bold text-white mb-0.5 md:mb-1" style={{ fontFamily: 'var(--font-figtree)' }}><CountUp end={5} suffix="+" /></div>
                  <h3 className="text-sm md:text-2xl font-bold text-white mb-1 md:mb-2" style={{ fontFamily: 'var(--font-figtree)' }}>Safety Protections</h3>
                  <p className="text-xs md:text-lg font-medium text-gray-300 leading-relaxed line-clamp-2 md:line-clamp-none" style={{ fontFamily: 'var(--font-figtree)' }}>
                    Safe for Everyday Charging. Built to handle voltage fluctuations, heat, and leakage.
                  </p>
                </motion.div>

                {/* Card 2 */}
                <motion.div 
                  style={{ x: c2X, y: c2Y, rotate: c2Rotate, scale: c2Scale, opacity: c2Opacity }}
                  className="bg-[#111111] backdrop-blur-xl rounded-2xl md:rounded-3xl p-3.5 md:p-6 border border-white/10 shadow-2xl flex flex-col justify-center"
                >
                  <Plug className="w-6 h-6 md:w-10 md:h-10 text-[#888888] mb-1.5 md:mb-3" />
                  <div className="text-xl md:text-3xl font-bold text-white mb-0.5 md:mb-1" style={{ fontFamily: 'var(--font-figtree)' }}>3-Pin</div>
                  <h3 className="text-sm md:text-2xl font-bold text-white mb-1 md:mb-2" style={{ fontFamily: 'var(--font-figtree)' }}>Plug Compatible</h3>
                  <p className="text-xs md:text-lg font-medium text-gray-300 leading-relaxed line-clamp-2 md:line-clamp-none" style={{ fontFamily: 'var(--font-figtree)' }}>
                    Easy to carry, easy to use across different locations with no setup required.
                  </p>
                </motion.div>

                {/* Card 3 */}
                <motion.div 
                  style={{ x: c3X, y: c3Y, rotate: c3Rotate, scale: c3Scale, opacity: c3Opacity }}
                  className="bg-[#111111] backdrop-blur-xl rounded-2xl md:rounded-3xl p-3.5 md:p-6 border border-white/10 shadow-2xl flex flex-col justify-center"
                >
                  <Zap className="w-6 h-6 md:w-10 md:h-10 text-[#888888] mb-1.5 md:mb-3" />
                  <div className="text-xl md:text-3xl font-bold text-white mb-0.5 md:mb-1" style={{ fontFamily: 'var(--font-figtree)' }}>IK10</div>
                  <h3 className="text-sm md:text-2xl font-bold text-white mb-1 md:mb-2" style={{ fontFamily: 'var(--font-figtree)' }}>Impact Rated</h3>
                  <p className="text-xs md:text-lg font-medium text-gray-300 leading-relaxed line-clamp-2 md:line-clamp-none" style={{ fontFamily: 'var(--font-figtree)' }}>
                    Control box handles drops and heavy pressure. Extremely durable for travel.
                  </p>
                </motion.div>

                {/* Card 4 */}
                <motion.div 
                  style={{ x: c4X, y: c4Y, rotate: c4Rotate, scale: c4Scale, opacity: c4Opacity }}
                  className="bg-[#111111] backdrop-blur-xl rounded-2xl md:rounded-3xl p-3.5 md:p-6 border border-white/10 shadow-2xl flex flex-col justify-center"
                >
                  <MonitorPlay className="w-6 h-6 md:w-10 md:h-10 text-[#888888] mb-1.5 md:mb-3" />
                  <div className="text-xl md:text-3xl font-bold text-white mb-0.5 md:mb-1" style={{ fontFamily: 'var(--font-figtree)' }}>4-in-1</div>
                  <h3 className="text-sm md:text-2xl font-bold text-white mb-1 md:mb-2" style={{ fontFamily: 'var(--font-figtree)' }}>LED Display</h3>
                  <p className="text-xs md:text-lg font-medium text-gray-300 leading-relaxed line-clamp-2 md:line-clamp-none" style={{ fontFamily: 'var(--font-figtree)' }}>
                    Clearly displays voltage, current, power, and charging status at a glance.
                  </p>
                </motion.div>

              </div>
            </div>
          </div>
        </section>

        {/* TECHNICAL SPECIFICATIONS */}
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 text-center"
            >
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-[#222222]">Technical</span>
                <span className="text-[#888888] italic">Specifications</span>
              </h2>
            </motion.div>

            <div className="bg-white/70 backdrop-blur-2xl rounded-3xl border border-white overflow-hidden shadow-lg">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/5 border-b border-black/10">
                    <th className="py-5 px-6 font-bold text-black w-1/3 text-lg" style={{ fontFamily: 'var(--font-figtree)' }}>Specification</th>
                    <th className="py-5 px-6 font-bold text-black text-lg" style={{ fontFamily: 'var(--font-figtree)' }}>Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {[
                    { spec: "Charging Type", detail: "AC Portable Charger" },
                    { spec: "Output Power", detail: "3.3 kW Max" },
                    { spec: "Input Plug", detail: "3-pin Domestic Plug" },
                    { spec: "Input Supply", detail: "1 Phase, 230 ±10% Vac" },
                    { spec: "Output Connector", detail: "Type 2 AC" },
                    { spec: "Adjustable Current", detail: "6A – 16A" },
                    { spec: "Protection Rating", detail: "IP66 (Weather & Dust Protection)" },
                    { spec: "Display", detail: "LED display showing voltage, current, power, time" },
                    { spec: "Dimensions (L × W × H)", detail: "220 × 100 × 60 mm" },
                  ].map((item, idx) => (
                    <tr key={idx} className="hover:bg-white/50 transition-colors">
                      <td className="py-4 px-6 font-bold text-black text-base" style={{ fontFamily: 'var(--font-figtree)' }}>{item.spec}</td>
                      <td className="py-4 px-6 font-medium text-black/80 text-base flex items-start gap-3" style={{ fontFamily: 'var(--font-figtree)' }}>
                        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                        {item.detail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">What Our Users</span>
                <span className="text-white italic font-extrabold drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">Say</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Aarav Sharma",
                  location: "Delhi",
                  quote: "This is a great backup charger and especially useful for people who travel frequently or don't always have access to a dedicated charging point."
                },
                {
                  name: "Aditya Singh",
                  location: "Gurugram",
                  quote: "Nice portable charger with adjustable amperage from 6 amp to 16 amp. This helps in balancing the battery pack effectively."
                },
                {
                  name: "Arjun Mehta",
                  location: "Mumbai",
                  quote: "This is the best portable charger for any EV. The build quality feels very premium and top-notch for everyday use."
                }
              ].map((testimonial, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[#111111] backdrop-blur-xl border border-white/10 rounded-2xl p-8 relative shadow-xl hover:shadow-2xl transition-all flex flex-col"
                >
                  <Quote className="absolute top-6 right-6 w-10 h-10 text-white/10" />
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-white text-white" />)}
                  </div>
                  <p className="text-base font-medium text-gray-300 mb-8 italic relative z-10 leading-relaxed grow">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-extrabold text-base text-black">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white text-base">{testimonial.name}</h4>
                      <p className="text-sm font-medium text-[#888888]">{testimonial.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-[#111111]/95 border border-white/20 backdrop-blur-2xl rounded-3xl p-12 text-center shadow-2xl">
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Ready to Charge</span>
                <span className="text-[#F97316] italic font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Anywhere?</span>
              </h2>
              <p className="text-lg md:text-xl font-medium text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Carry it with you or keep it at home - just plug in and charge whenever you need it. No setup, no extra steps required.
              </p>
              <button className="px-9 py-4 bg-white text-black rounded-xl font-extrabold text-lg hover:bg-gray-100 transition-all hover:scale-105 inline-flex items-center gap-2 shadow-lg">
                Enquire Now <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
