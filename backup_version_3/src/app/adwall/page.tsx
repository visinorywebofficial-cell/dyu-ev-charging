"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plug, Zap, MonitorPlay, Shield, Server, ArrowRight, CheckCircle2, TrendingUp, Users, Building } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useInView } from "framer-motion";

function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.max(Math.floor((duration * 1000) / end), 15);
    const timer = setInterval(() => {
      start += 1;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, step);
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  return <span ref={ref}>{count}</span>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } }
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

export default function AdWallPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-cream-paper)' }}>
      
      {/* ─── HERO SECTION ─── */}
      <section 
        className="relative overflow-hidden pt-32 pb-16 md:pt-[160px] md:pb-[80px]" 
        style={{ 
          textAlign: 'center',
          minHeight: '80dvh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div className="absolute inset-0 z-0 bg-[#222222]">
          <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#222222] via-[#222222]/80 to-transparent" />
        </div>

        <div className="container-wispr relative z-20">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            
            <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <span className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)' }}>
                <MonitorPlay size={14} /> AD WALL AC EV CHARGER
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="flex flex-col gap-1 mb-6 tracking-tighter" style={{ fontFamily: '"Gilroy", sans-serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              <span className="text-white">Charge Smarter. Earn Smarter.</span>
              <span className="text-[#888888] italic">Advertise Better.</span>
            </motion.h1>

            <motion.p variants={fadeUp} style={{
              fontFamily: 'var(--font-figtree)',
              fontSize: '18px',
              color: 'rgba(255,255,255,0.8)',
              maxWidth: '600px',
              margin: '0 auto 40px',
              lineHeight: 1.6,
            }}>
              Revenue-ready AC EV charger with dual-gun charging and a 55-inch ad display. Charge up to 4 vehicles and earn from ads and sessions.
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/ev-charging-station-franchise" className="btn-primary">
                Talk to an Expert <ArrowRight size={14} />
              </Link>
              <a href="#tech-specs" className="btn-ghost" style={{ color: '#ffffff', borderColor: '#ffffff' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = '#222'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ffffff'; }}
              >
                View Technical Specs
              </a>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ─── KEY FEATURES (BENTO BOX) ─── */}
      <section className="section-light py-24">
        <div className="container-wispr">
          <div className="text-center mb-16">
            <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]" style={{ fontFamily: 'var(--font-figtree)' }}>
              <span className="text-[#222222]">Key</span>
              <span className="text-[#888888] italic">Features</span>
            </h2>
            <p className="mt-4 text-[#666666] font-medium max-w-2xl mx-auto">
              Everything you need for efficient charging, smooth operations, and added value in one seamless setup.
            </p>
          </div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Feature 1 */}
            <motion.div variants={fadeUp} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#00F0FF]/20 flex items-center justify-center text-[#00F0FF]">
                <Plug size={24} />
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900 mt-2">4x</h3>
              <div>
                <h4 className="text-lg font-extrabold text-gray-900 mb-2">Multi-Output Smart Charging</h4>
                <p className="text-[#666666] text-base leading-relaxed">Supports 2 Type-2 AC connectors and 2 three-pin sockets, enabling charging for up to 4 vehicles simultaneously.</p>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={fadeUp} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#00F0FF]/20 flex items-center justify-center text-[#00F0FF]">
                <Zap size={24} />
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900 mt-2">22 kW</h3>
              <div>
                <h4 className="text-lg font-extrabold text-gray-900 mb-2">Dual Gun AC Charging</h4>
                <p className="text-[#666666] text-base leading-relaxed">High-performance AC charging with dual-gun support, perfectly suited for heavy commercial environments.</p>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={fadeUp} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start gap-4 lg:row-span-2">
              <div className="w-12 h-12 rounded-xl bg-[#00F0FF]/20 flex items-center justify-center text-[#00F0FF]">
                <MonitorPlay size={24} />
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900 mt-2">55" 4K</h3>
              <div>
                <h4 className="text-lg font-extrabold text-gray-900 mb-2">Digital Advertisement Display</h4>
                <p className="text-[#666666] text-base leading-relaxed mb-6">Built-in digital display supports remote advertisement broadcasting, creating an additional revenue opportunity through ad displays. Features up to 4,000 nits brightness ensuring clear visibility even in direct sunlight.</p>
                <div className="w-full h-48 bg-gray-100 rounded-xl overflow-hidden relative">
                   <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" alt="Ad Display Placeholder" />
                   <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                     <span className="bg-white/90 text-black text-xs font-extrabold px-3 py-1 rounded-full">AD SPACE</span>
                   </div>
                </div>
              </div>
            </motion.div>

            {/* Feature 4 */}
            <motion.div variants={fadeUp} className="bg-[#222] p-8 rounded-3xl shadow-sm border border-gray-800 flex flex-col items-start gap-4 text-white">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <Server size={24} />
              </div>
              <h3 className="text-3xl font-extrabold mt-2">SS</h3>
              <div>
                <h4 className="text-lg font-extrabold mb-2">Durable Stainless-Steel Body</h4>
                <p className="text-[#888888] text-base leading-relaxed">Features a robust stainless-steel enclosure suitable for outdoor and long-term commercial use.</p>
              </div>
            </motion.div>

            {/* Feature 5 */}
            <motion.div variants={fadeUp} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#00F0FF]/20 flex items-center justify-center text-[#00F0FF]">
                <Shield size={24} />
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900 mt-2">6+</h3>
              <div>
                <h4 className="text-lg font-extrabold text-gray-900 mb-2">Advanced Safety Systems</h4>
                <p className="text-[#666666] text-base leading-relaxed">Includes ground fault detection, residual current detection, surge protection, over/under-voltage shutdown, and thermal protection.</p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ─── WHY CHOOSE AD WALL ─── */}
      <section className="py-24 bg-[#F1EFE1]">
        <div className="container-wispr">
          <div className="text-center mb-16">
            <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]" style={{ fontFamily: 'var(--font-figtree)' }}>
              <span className="text-[#222222]">Why Businesses</span>
              <span className="text-[#888888] italic">Choose AdWall</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: MonitorPlay, title: "Capture Attention", desc: "Turn waiting time into meaningful engagement." },
              { icon: TrendingUp, title: "Earn More", desc: "Generate revenue from both charging and on-screen ads." },
              { icon: Users, title: "Attract EV Users", desc: "Increase footfall with a connected charging experience." },
              { icon: Building, title: "Commercial Grade", desc: "Ideal for malls, offices, and high-traffic locations." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-8 bg-[#222222] rounded-3xl shadow-sm border border-white/10"
              >
                <div className="w-16 h-16 rounded-full bg-[#00F0FF]/20 flex items-center justify-center text-[#00F0FF] mb-6">
                  <item.icon size={24} />
                </div>
                <h4 className="text-lg font-extrabold text-[#F1EFE1] mb-3">{item.title}</h4>
                <p className="text-[#888888] text-base leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-20 bg-[#222] text-white">
        <div className="container-wispr">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center divide-x divide-white/10">
            {[
              { val: 100, suffix: "+", label: "AdWall Units" },
              { val: 20, suffix: "+", label: "Cities in India" },
              { val: 5000, suffix: "+", label: "Sessions" },
              { val: 77, suffix: "+", label: "Live Locations" },
              { val: 10, suffix: "+", label: "Brands Advertising" }
            ].map((stat, i) => (
              <div key={i} className={`flex flex-col items-center justify-center ${i === 0 || i === 2 ? '' : 'pl-8'} ${i % 2 === 0 ? 'border-none md:border-solid md:border-l' : ''} ${i === 0 ? 'border-none' : ''}`}>
                <div className="text-4xl md:text-5xl font-['Gilroy'] font-extrabold mb-2">
                  <CountUp end={stat.val} duration={2.5} />{stat.suffix}
                </div>
                <div className="text-xs text-[#888888] uppercase tracking-widest font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TECH SPECS ─── */}
      <section id="tech-specs" className="py-24 bg-[#F1EFE1]">
        <div className="container-wispr max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]" style={{ fontFamily: 'var(--font-figtree)' }}>
              <span className="text-[#222222]">Technical</span>
              <span className="text-[#888888] italic">Specifications</span>
            </h2>
          </div>

          <div className="bg-[#222222] rounded-3xl shadow-sm border border-white/10 overflow-hidden">
            {[
              { label: "Charging Type", detail: "AC Charging" },
              { label: "Connector Type", detail: "Type 2 AC (2 outputs) and 3-pin socket (2 outputs)" },
              { label: "Power Rating", detail: "22 kW (7.4 kW × 2 + 3.3 kW × 2)" },
              { label: "User Authentication", detail: "Mobile App, RFID, QR Code" },
              { label: "Connectivity Options", detail: "3G, 4G, Ethernet, Wi-Fi" },
              { label: "Advertising Display", detail: "55-inch LED digital display" },
            ].map((row, i) => (
              <div key={i} className={`flex flex-col sm:flex-row items-start sm:items-center p-6 ${i !== 5 ? 'border-b border-white/10' : ''} ${i % 2 === 0 ? 'bg-[#222222]' : 'bg-white/5'}`}>
                <div className="w-full sm:w-1/3 font-semibold text-[#F1EFE1] mb-2 sm:mb-0">{row.label}</div>
                <div className="w-full sm:w-2/3 flex items-start text-[#888888]">
                  <CheckCircle2 size={18} className="text-[#00F0FF] mr-3 mt-1 flex-shrink-0" />
                  <span className="leading-relaxed">{row.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PARTNER WITH US ─── */}
      <section className="py-24 bg-[#F1EFE1]">
        <div className="container-wispr text-center">
          <span className="badge" style={{ background: 'rgba(34,34,34,0.1)', color: '#222222', marginBottom: '24px' }}>Partner With Us</span>
          <h2 className="flex flex-col gap-1 mb-6 text-4xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1] text-center" style={{ fontFamily: 'var(--font-figtree)' }}>
            <span className="text-[#222222]">Turn Your Location into a</span>
            <span className="text-[#888888] italic">Revenue Hub</span>
          </h2>
          <p className="text-[#666666] text-lg max-w-2xl mx-auto mb-16 font-medium">
            Bring EV charging and advertising to your location in 4 simple steps.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { step: "1", title: "Get Started with DYU", desc: "Contact our team to evaluate your location." },
              { step: "2", title: "Install & Activate", desc: "Set up charging with built-in digital screens." },
              { step: "3", title: "Earn Revenue", desc: "Generate revenue from every charging session & ad display." },
              { step: "4", title: "Grow Visibility", desc: "Attract more EV users and increase local footfall." }
            ].map((s, i) => (
              <div key={i} className="bg-[#222222] border border-white/10 rounded-3xl p-8 text-left shadow-sm relative overflow-hidden">
                <div className="text-5xl font-black text-[#F1EFE1]/5 absolute -top-4 -right-2">{s.step}</div>
                <div className="w-10 h-10 rounded-full bg-[#00F0FF]/20 text-[#00F0FF] flex items-center justify-center font-extrabold mb-6">
                  {s.step}
                </div>
                <h4 className="text-xl font-extrabold text-[#F1EFE1] mb-2">{s.title}</h4>
                <p className="text-[#888888] text-base leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <Link href="/partner-with-us" className="btn-primary shadow-[0_0_20px_rgba(34,34,34,0.3)] transition-all hover:scale-105" style={{ background: '#222222', color: '#F1EFE1' }}>
            Become A Partner <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </section>

    </div>
  );
}

