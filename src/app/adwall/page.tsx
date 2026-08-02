"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  Tv, 
  Smartphone, 
  Share2, 
  Mail, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Target, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Award, 
  Building2, 
  Send, 
  ChevronRight,
  Star,
  Quote,
  Eye,
  ExternalLink
} from "lucide-react";

// Helper for Animated Counters
function CountUp({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });

  useEffect(() => {
    if (!inView) {
      setCount(0);
      return;
    }
    let start = 0;
    const step = Math.max(Math.floor((duration * 1000) / end), 15);
    const timer = setInterval(() => {
      start += Math.ceil(end / 40);
      if (start >= end) { 
        setCount(end); 
        clearInterval(timer); 
      } else {
        setCount(start);
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// Brand SVG Logos Component for Marquee (8 Specified EV Car Manufacturers)
const BrandLogosMarquee = () => {
  const brandLogos = [
    { 
      name: "Tata Motors", 
      svg: (
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 100 60" className="h-8 w-auto fill-[#005F73]">
            <ellipse cx="50" cy="30" rx="45" ry="25" fill="none" stroke="#005F73" strokeWidth="4"/>
            <path d="M25 20 H75 M50 20 V45" stroke="#005F73" strokeWidth="6" strokeLinecap="round"/>
          </svg>
          <span className="font-extrabold text-base tracking-wider text-[#005F73]">TATA MOTORS</span>
        </div>
      )
    },
    { 
      name: "Mahindra & Mahindra", 
      svg: (
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 100 60" className="h-8 w-auto fill-[#CC0000]">
            <path d="M20 50 L35 15 L50 35 L65 15 L80 50" fill="none" stroke="#CC0000" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-extrabold text-base tracking-wider text-[#111111]">MAHINDRA</span>
        </div>
      )
    },
    { 
      name: "JSW MG Motor India", 
      svg: (
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 80 80" className="h-9 w-auto">
            <polygon points="40,5 75,20 75,60 40,75 5,60 5,20" fill="none" stroke="#A3080C" strokeWidth="5"/>
            <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontWeight="900" fontSize="22" fill="#A3080C">MG</text>
          </svg>
          <span className="font-extrabold text-base tracking-wider text-[#111111]">JSW MG MOTOR</span>
        </div>
      )
    },
    { 
      name: "BYD", 
      svg: (
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 120 60" className="h-8 w-auto">
            <ellipse cx="60" cy="30" rx="55" ry="25" fill="none" stroke="#111111" strokeWidth="4"/>
            <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontWeight="900" fontSize="20" letterSpacing="3" fill="#111111">BYD</text>
          </svg>
          <span className="text-xs font-bold text-[#666666] tracking-widest hidden sm:inline">BUILD YOUR DREAMS</span>
        </div>
      )
    },
    { 
      name: "Maruti Suzuki", 
      svg: (
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 80 80" className="h-8 w-auto fill-[#003399]">
            <path d="M15 15 H65 L25 40 H75 L35 65 H85" fill="none" stroke="#003399" strokeWidth="8" strokeLinecap="square"/>
          </svg>
          <span className="font-extrabold text-base tracking-wider text-[#003399]">MARUTI SUZUKI</span>
        </div>
      )
    },
    { 
      name: "Hyundai Motor India", 
      svg: (
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 120 60" className="h-8 w-auto">
            <ellipse cx="60" cy="30" rx="55" ry="25" fill="none" stroke="#002C6C" strokeWidth="4"/>
            <path d="M35 15 L45 45 M85 15 L75 45 M38 30 H82" stroke="#002C6C" strokeWidth="5" strokeLinecap="round"/>
          </svg>
          <span className="font-extrabold text-base tracking-wider text-[#002C6C]">HYUNDAI</span>
        </div>
      )
    },
    { 
      name: "Kia India", 
      svg: (
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 120 50" className="h-7 w-auto fill-[#05141F]">
            <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontWeight="900" fontSize="28" letterSpacing="4" fill="#05141F">KIA</text>
          </svg>
        </div>
      )
    },
    { 
      name: "VinFast", 
      svg: (
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 80 80" className="h-8 w-auto">
            <path d="M10 20 L40 65 L70 20 M25 20 L40 45 L55 20" fill="none" stroke="#1F4E79" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-extrabold text-base tracking-wider text-[#1F4E79]">VINFAST</span>
        </div>
      )
    }
  ];

  return (
    <div className="relative w-full overflow-hidden flex py-6 bg-white border-y border-gray-200">
      <motion.div 
        className="flex items-center gap-16 whitespace-nowrap min-w-full"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
      >
        {[...brandLogos, ...brandLogos].map((b, i) => (
          <div 
            key={i} 
            className="flex items-center justify-center px-6 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm hover:border-[#005F73] transition-all hover:scale-105"
          >
            {b.svg}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function AdWallPage() {
  // State for Interactive 4 Channel Hover Cards
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    goal: "Screen Advertising",
    budget: "₹1 Lakh - ₹5 Lakhs",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FBFC] text-[#111111] font-['Inter'] overflow-x-hidden">
      
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO SECTION
          (Dark Background + Pure White Fonts)
      ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-[#001E2B] text-white">
        {/* Responsive Background Video Overlay */}
        <div className="absolute inset-0 z-0">
          {/* Dark background only - no video */}
          <div className="absolute inset-0 bg-black/30 z-0 pointer-events-none" />
        </div>

        <div className="container mx-auto px-4 max-w-6xl relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-black/60 border border-white/30 mb-8 backdrop-blur-md"
          >
            <Tv className="w-4 h-4 text-[#00F0FF]" />
            <span className="text-xs md:text-sm font-extrabold text-white uppercase tracking-widest">
              Advertise With Us • High-Impact DOOH Network
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col gap-2 mb-8 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1]"
          >
            <span className="text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">Reach Millions of High-Intent</span>
            <span className="text-white font-extrabold drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">EV Drivers Across India</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl font-bold text-white max-w-3xl mx-auto mb-12 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          >
            Position your brand directly in front of affluent EV owners during 30-45 minute captive charging sessions across highways, retail hubs, and urban centers.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center items-center gap-4 flex-wrap"
          >
            <a 
              href="#adwall-form" 
              className="px-9 py-4 bg-[#005F73] hover:bg-[#00F0FF] hover:text-[#001E2B] text-white rounded-xl font-extrabold text-lg transition-all shadow-[0_10px_30px_rgba(0,95,115,0.4)] flex items-center gap-3"
            >
              Enquire Now <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: BRANDS ALREADY TAPPING INTO THE CHARGING MOMENT
          (Real Vector Brand SVG Logos Marquee)
      ─────────────────────────────────────────────────────────────── */}
      <section className="py-14 bg-[#F1F5F9] border-y border-gray-200 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl text-center mb-8">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-xs font-black uppercase tracking-widest text-[#005F73]"
          >
            Trusted Brand Partnerships
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-4xl font-extrabold text-[#005F73] font-['Gilroy'] mt-2"
          >
            Brands already tapping into the charging moment
          </motion.h2>
        </div>

        {/* Real Brand Logos Infinite Marquee */}
        <BrandLogosMarquee />
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: REAL RESULTS, REAL PARTNERSHIPS
          (WHITE CARDS + PETROL BLUE FONTS)
      ─────────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#F8FBFC] relative">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-xs font-black uppercase tracking-widest text-[#005F73] block mb-3"
            >
              Proven Track Record
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-[#005F73] font-['Gilroy'] tracking-tight"
            >
              Real Results, Real Partnerships
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
              className="text-xl text-[#005F73]/80 font-bold max-w-3xl mx-auto mt-4"
            >
              See how industry leaders leverage DYU charging network to achieve unprecedented brand awareness and campaign ROI.
            </motion.p>
          </div>

          {/* Key Metric Numbers Cards (White Card + Petrol Blue Fonts) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-[#005F73]/20 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all"
            >
              <p className="text-4xl lg:text-5xl font-black text-[#005F73] mb-2 font-['Plus_Jakarta_Sans']">
                <CountUp end={350000} suffix="+" />
              </p>
              <h3 className="text-xl font-extrabold text-[#005F73] mb-2">Driver Charging Sessions</h3>
              <p className="text-[#005F73]/80 text-sm font-semibold">Captive sessions conducted across our nationwide network of ultra-rapid chargers.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-[#005F73]/20 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all"
            >
              <p className="text-4xl lg:text-5xl font-black text-[#005F73] mb-2 font-['Plus_Jakarta_Sans']">
                <CountUp end={600000} suffix="+" />
              </p>
              <h3 className="text-xl font-extrabold text-[#005F73] mb-2">Active EV App Users</h3>
              <p className="text-[#005F73]/80 text-sm font-semibold">Registered EV drivers who use the mobile app daily for routing and payments.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3 }}
              className="bg-white border border-[#005F73]/20 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all"
            >
              <p className="text-4xl lg:text-5xl font-black text-[#005F73] mb-2 font-['Plus_Jakarta_Sans']">
                <CountUp end={4000} suffix="+" />
              </p>
              <h3 className="text-xl font-extrabold text-[#005F73] mb-2">Ultra-Rapid Chargers</h3>
              <p className="text-[#005F73]/80 text-sm font-semibold">High-power DC charging points deployed at premium highway & city hubs.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.4 }}
              className="bg-white border border-[#005F73]/20 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all"
            >
              <p className="text-4xl lg:text-5xl font-black text-[#005F73] mb-2 font-['Plus_Jakarta_Sans']">
                <CountUp end={1200} suffix="+" />
              </p>
              <h3 className="text-xl font-extrabold text-[#005F73] mb-2">Charging Sites Nationwide</h3>
              <p className="text-[#005F73]/80 text-sm font-semibold">Strategic locations connecting tier-1 cities and high-density logistics corridors.</p>
            </motion.div>

          </div>

          {/* Testimonial Case Studies (White Cards + Petrol Blue Fonts) */}
          <div className="grid md:grid-cols-2 gap-8">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-[#005F73]/20 rounded-3xl p-8 md:p-10 shadow-lg relative flex flex-col justify-between"
            >
              <div>
                <Quote className="w-10 h-10 text-[#005F73]/30 mb-4" />
                <p className="text-[#005F73] text-lg font-semibold leading-relaxed mb-6">
                  "Partnering with DYU to bring our awareness campaign to life for XPENG was a fantastic experience. As a brand entering the EV market, building strong awareness was key, and the Superhub provided the ideal setting to do this at scale."
                </p>
              </div>
              <div className="border-t border-[#005F73]/10 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-[#005F73] text-base">Peter Cooper Motor Group</h4>
                  <p className="text-xs text-[#005F73]/70 font-bold">XPENG Brand Awareness Campaign</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#005F73]/10 text-[#005F73] text-xs font-bold">Case Study</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3 }}
              className="bg-white border border-[#005F73]/20 rounded-3xl p-8 md:p-10 shadow-lg relative flex flex-col justify-between"
            >
              <div>
                <Quote className="w-10 h-10 text-[#005F73]/30 mb-4" />
                <p className="text-[#005F73] text-lg font-semibold leading-relaxed mb-6">
                  "We had a fantastic experience working on our recent campaign to raise awareness of our EV offering. Delivering a multi-channel activation including public charger screens proved to be a reliable and innovative addition!"
                </p>
              </div>
              <div className="border-t border-[#005F73]/10 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-[#005F73] text-base">myenergi zappi GLO</h4>
                  <p className="text-xs text-[#005F73]/70 font-bold">Multi-Channel Activation</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#005F73]/10 text-[#005F73] text-xs font-bold">Case Study</span>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: WHY ADVERTISE WITH US?
          (PETROL BLUE CARDS + WHITE FONTS)
      ─────────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#002B36] text-white relative">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-xs font-black uppercase tracking-widest text-[#00F0FF] block mb-3"
            >
              Strategic Advantage
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-white font-['Gilroy'] tracking-tight"
            >
              Why advertise with us?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300 font-medium mt-4"
            >
              Be front and center during the exact moments when EV drivers are most receptive.
            </motion.p>
          </div>

          {/* Petrol Blue Cards + White Text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1 }}
              className="bg-[#003845] border border-[#005F73]/40 rounded-3xl p-8 md:p-10 shadow-xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-[#00F0FF] mb-6">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-3">600,000+ Connected EV Drivers</h3>
              <p className="text-gray-200 text-lg leading-relaxed font-normal">
                Directly connect with over 600,000 (and growing) affluent EV drivers actively using the DYU mobile application.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
              className="bg-[#003845] border border-[#005F73]/40 rounded-3xl p-8 md:p-10 shadow-xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-[#00F0FF] mb-6">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-3">350,000+ Charging Sessions</h3>
              <p className="text-gray-200 text-lg leading-relaxed font-normal">
                Be in front of 350,000+ driver charging sessions across our nationwide network of over 4,000+ ultra-rapid EV chargers.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3 }}
              className="bg-[#003845] border border-[#005F73]/40 rounded-3xl p-8 md:p-10 shadow-xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-[#00F0FF] mb-6">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-3">Front & Center Receptive Moments</h3>
              <p className="text-gray-200 text-lg leading-relaxed font-normal">
                You can be front and center when drivers are most receptive – whether in the palm of their hand or while charging.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.4 }}
              className="bg-[#003845] border border-[#005F73]/40 rounded-3xl p-8 md:p-10 shadow-xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-[#00F0FF] mb-6">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-3">Meet Sustainability Targets</h3>
              <p className="text-gray-200 text-lg leading-relaxed font-normal">
                Align your brand with India's green transition and fulfill corporate ESG & zero-emission marketing goals.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: OUR AMPLIFY PACKAGE
          (WHITE CARDS + PETROL BLUE FONTS)
      ─────────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#F8FBFC] relative">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-xs font-black uppercase tracking-widest text-[#005F73] block mb-3"
            >
              Integrated Solution
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-[#005F73] font-['Gilroy'] tracking-tight"
            >
              Our Amplify package
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
              className="text-xl text-[#005F73]/80 font-bold mt-4"
            >
              Our comprehensive package works around your budget, business objectives, and required actions & comms channel preferences to connect to EV audiences.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="bg-white border-2 border-[#005F73]/20 rounded-3xl p-8 md:p-12 shadow-xl text-center max-w-4xl mx-auto mb-12"
          >
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#005F73] mb-4">
              Direct Call-To-Action (CTA) Integration
            </h3>
            <p className="text-[#005F73]/80 text-lg font-semibold leading-relaxed mb-6">
              Each campaign includes a bespoke CTA linking directly to your chosen URL, allowing drivers to instantly access your promotion while charging. You tell us your objectives and budget, and we work with you to make it happen.
            </p>
            <span className="inline-block px-6 py-2.5 rounded-full bg-[#005F73]/10 text-[#005F73] font-extrabold text-sm uppercase tracking-wider">
              One ecosystem • Multiple touchpoints • Maximum impact
            </span>
          </motion.div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: 4 INTERACTIVE MEDIA CHANNELS
          (PETROL BLUE CARDS + WHITE FONTS + HOVER IMAGE REVEAL)
      ─────────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#001E2B] text-white relative">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-xs font-extrabold uppercase tracking-widest text-[#00F0FF] block mb-3"
            >
              Multi-Touchpoint Channels
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold text-white font-['Gilroy'] tracking-tight"
            >
              4 Core Media Channels
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-300 font-medium mt-4"
            >
              Hover or touch any card below to reveal the live charger campaign image.
            </motion.p>
          </div>

          {/* 4 Cards Grid with Hover Image Overlay Reveal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1: Screen Advertising */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              onMouseEnter={() => setHoveredCard("screen")}
              onMouseLeave={() => setHoveredCard(null)}
              onTouchStart={() => setHoveredCard("screen")}
              className="bg-[#002B36] border border-[#005F73]/40 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden min-h-[380px] flex flex-col justify-between cursor-pointer group"
            >
              {/* Default Written Info */}
              <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#00F0FF] flex items-center justify-center">
                    <Tv className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-[#00F0FF]/20 text-[#00F0FF] uppercase tracking-wider">
                    Touch to Reveal
                  </span>
                </div>
                <h3 className="text-3xl font-extrabold text-white">Screen Advertising</h3>
                <p className="text-[#00F0FF] font-bold text-base">At the point of charge, where attention is highest.</p>
                <ul className="space-y-2 text-gray-200 text-base font-semibold pt-2">
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-[#00F0FF]" /> Max 30s video loop</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-[#00F0FF]" /> 12 plays per hour minimum</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-[#00F0FF]" /> 85,000+ users per week</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-[#00F0FF]" /> Eye level, high visibility</li>
                </ul>
              </div>

              {/* Hover Image Overlay Reveal */}
              <div 
                className={`absolute inset-0 z-20 transition-all duration-500 bg-black ${
                  hoveredCard === "screen" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <img 
                  src="/images/adwall/screen-advertising.jpg" 
                  alt="Screen Advertising Kiosk" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6 flex flex-col justify-end">
                  <span className="text-[#00F0FF] text-xs font-black uppercase tracking-widest">Live Campaign Preview</span>
                  <h4 className="text-white text-2xl font-extrabold">Screen Advertising Kiosk</h4>
                </div>
              </div>
            </motion.div>

            {/* Card 2: App Advertising */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1 }}
              onMouseEnter={() => setHoveredCard("app")}
              onMouseLeave={() => setHoveredCard(null)}
              onTouchStart={() => setHoveredCard("app")}
              className="bg-[#002B36] border border-[#005F73]/40 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden min-h-[380px] flex flex-col justify-between cursor-pointer group"
            >
              {/* Default Written Info */}
              <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#00F0FF] flex items-center justify-center">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-[#00F0FF]/20 text-[#00F0FF] uppercase tracking-wider">
                    Touch to Reveal
                  </span>
                </div>
                <h3 className="text-3xl font-extrabold text-white">App Advertising</h3>
                <p className="text-[#00F0FF] font-bold text-base">Always in hand.</p>
                <ul className="space-y-2 text-gray-200 text-base font-semibold pt-2">
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-[#00F0FF]" /> 600,000+ engaged users</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-[#00F0FF]" /> Personalized, targeted content</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-[#00F0FF]" /> Geo targeted campaigns</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-[#00F0FF]" /> Timed or always on</li>
                </ul>
              </div>

              {/* Hover Image Overlay Reveal */}
              <div 
                className={`absolute inset-0 z-20 transition-all duration-500 bg-black ${
                  hoveredCard === "app" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <img 
                  src="/images/adwall/app-advertising.jpg" 
                  alt="App Advertising Preview" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6 flex flex-col justify-end">
                  <span className="text-[#00F0FF] text-xs font-black uppercase tracking-widest">Live Campaign Preview</span>
                  <h4 className="text-white text-2xl font-extrabold">App Banner & Kiosk Station</h4>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Social Media Promotion */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
              onMouseEnter={() => setHoveredCard("social")}
              onMouseLeave={() => setHoveredCard(null)}
              onTouchStart={() => setHoveredCard("social")}
              className="bg-[#002B36] border border-[#005F73]/40 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden min-h-[380px] flex flex-col justify-between cursor-pointer group"
            >
              {/* Default Written Info */}
              <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#00F0FF] flex items-center justify-center">
                    <Share2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-[#00F0FF]/20 text-[#00F0FF] uppercase tracking-wider">
                    Touch to Reveal
                  </span>
                </div>
                <h3 className="text-3xl font-extrabold text-white">Social Media Promotion</h3>
                <p className="text-[#00F0FF] font-bold text-base">Extending your reach.</p>
                <ul className="space-y-2 text-gray-200 text-base font-semibold pt-2">
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-[#00F0FF]" /> 36,000+ combined audience</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-[#00F0FF]" /> Targeted EV and lifestyle reach</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-[#00F0FF]" /> Campaign amplification</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-[#00F0FF]" /> Strong engagement</li>
                </ul>
              </div>

              {/* Hover Image Overlay Reveal */}
              <div 
                className={`absolute inset-0 z-20 transition-all duration-500 bg-black ${
                  hoveredCard === "social" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <img 
                  src="/images/adwall/social-media-promotion.jpg" 
                  alt="Social Media Promotion Station" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6 flex flex-col justify-end">
                  <span className="text-[#00F0FF] text-xs font-black uppercase tracking-widest">Live Campaign Preview</span>
                  <h4 className="text-white text-2xl font-extrabold">Social Media Hub Activation</h4>
                </div>
              </div>
            </motion.div>

            {/* Card 4: eNewsletter Advertising */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3 }}
              onMouseEnter={() => setHoveredCard("newsletter")}
              onMouseLeave={() => setHoveredCard(null)}
              onTouchStart={() => setHoveredCard("newsletter")}
              className="bg-[#002B36] border border-[#005F73]/40 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden min-h-[380px] flex flex-col justify-between cursor-pointer group"
            >
              {/* Default Written Info */}
              <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#00F0FF] flex items-center justify-center">
                    <Mail className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-[#00F0FF]/20 text-[#00F0FF] uppercase tracking-wider">
                    Touch to Reveal
                  </span>
                </div>
                <h3 className="text-3xl font-extrabold text-white">eNewsletter Advertising</h3>
                <p className="text-[#00F0FF] font-bold text-base">Direct to inbox.</p>
                <ul className="space-y-2 text-gray-200 text-base font-semibold pt-2">
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-[#00F0FF]" /> 280,000+ subscribers</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-[#00F0FF]" /> 48% open rate</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-[#00F0FF]" /> High intent audience</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-[#00F0FF]" /> Trackable performance</li>
                </ul>
              </div>

              {/* Hover Image Overlay Reveal */}
              <div 
                className={`absolute inset-0 z-20 transition-all duration-500 bg-black ${
                  hoveredCard === "newsletter" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <img 
                  src="/images/adwall/enewsletter-advertising.jpg" 
                  alt="eNewsletter Advertising Station" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6 flex flex-col justify-end">
                  <span className="text-[#00F0FF] text-xs font-black uppercase tracking-widest">Live Campaign Preview</span>
                  <h4 className="text-white text-2xl font-extrabold">eNewsletter Kiosk Kiosk</h4>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 7: BESPOKE PACKAGES
          (WHITE CARDS + PETROL BLUE FONTS)
      ─────────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#F8FBFC] relative">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-xs font-black uppercase tracking-widest text-[#005F73] block mb-3"
            >
              Tailored Marketing
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-[#005F73] font-['Gilroy'] tracking-tight"
            >
              Bespoke Packages
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
              className="text-xl text-[#005F73]/80 font-bold mt-4"
            >
              We work with you to create custom packages such as on-site marketing at local site level, arrive and drive events at Superhubs, and website takeovers.
            </motion.p>
          </div>

          {/* White Cards + Petrol Blue Fonts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-[#005F73]/20 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#005F73]/10 text-[#005F73] flex items-center justify-center mb-6">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#005F73] mb-3">On-Site Local Marketing</h3>
              <p className="text-[#005F73]/80 text-base font-semibold leading-relaxed">
                Hyper-local physical station wraps, promotional sampling, and localized kiosk media takeovers tailored for regional retail brand launches.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-[#005F73]/20 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#005F73]/10 text-[#005F73] flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#005F73] mb-3">Arrive & Drive Events</h3>
              <p className="text-[#005F73]/80 text-base font-semibold leading-relaxed">
                Host experiential car test-drives and brand activation events at DYU flagship Superhubs (such as Winchester plazas & highway corridors).
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3 }}
              className="bg-white border border-[#005F73]/20 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#005F73]/10 text-[#005F73] flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#005F73] mb-3">Digital Website Takeovers</h3>
              <p className="text-[#005F73]/80 text-base font-semibold leading-relaxed">
                Full digital website takeovers including high-impact pop-up banners, top strip banners, and dedicated co-branded blog features.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 8: REPORTING FOR ALL PACKAGES
          (PETROL BLUE CARDS + WHITE FONTS)
      ─────────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#002B36] text-white relative">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
            >
              <span className="text-xs font-black uppercase tracking-widest text-[#00F0FF] block mb-3">
                Full Transparency & Audit
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white font-['Gilroy'] tracking-tight mb-6">
                Reporting for all packages
              </h2>
              <p className="text-xl text-gray-200 font-medium leading-relaxed mb-8">
                We place a strong focus on reporting and transparency, providing a clear post-campaign performance report detailing your exact reach across charger screens, app engagement, newsletter performance, and CTA code interactions.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#00F0FF] shrink-0" />
                  <span className="text-lg text-gray-100 font-semibold">Charger Screen Playback & Impression Logs</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#00F0FF] shrink-0" />
                  <span className="text-lg text-gray-100 font-semibold">Mobile App Interaction & CTR Metrics</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#00F0FF] shrink-0" />
                  <span className="text-lg text-gray-100 font-semibold">eNewsletter Open Rates & Click Verification</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#00F0FF] shrink-0" />
                  <span className="text-lg text-gray-100 font-semibold">Bespoke CTA Link & Promo Code Performance</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              className="bg-[#003845] border border-[#005F73]/40 rounded-3xl p-8 md:p-12 shadow-2xl space-y-6"
            >
              <BarChart3 className="w-12 h-12 text-[#00F0FF]" />
              <h3 className="text-3xl font-extrabold text-white">Data-Driven ROI</h3>
              <p className="text-gray-200 text-lg leading-relaxed font-normal">
                Receive an audit-ready PDF performance report at the conclusion of every campaign. Track your exact media value, driver dwell time engagement, and direct conversion rates.
              </p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-300">100% Verified Playback Data</span>
                <ShieldCheck className="w-6 h-6 text-[#00F0FF]" />
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 9: READY TO TAKE THE NEXT STEP? (FORM)
          (DEEP PETROL BLUE CONTAINER + WHITE TEXT)
      ─────────────────────────────────────────────────────────────── */}
      <section id="adwall-form" className="py-24 bg-[#222222] text-white relative border-t border-[#F1EFE1]/20">
        <div className="container mx-auto px-4 max-w-4xl">
          
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-xs font-extrabold uppercase tracking-widest text-[#F1EFE1] block mb-3"
            >
              Get In Touch
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold text-white font-['Gilroy'] tracking-tight"
            >
              Ready to take the next step?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
              className="text-xl text-[#F1EFE1]/90 font-medium mt-4 max-w-2xl mx-auto"
            >
              We would be delighted to discuss our offering in more detail and answer any questions you might have.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="bg-[#1A1A1A] border-2 border-[#F1EFE1]/40 rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            {formSubmitted ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-20 h-20 bg-[#F1EFE1]/20 rounded-full flex items-center justify-center mx-auto text-[#F1EFE1]">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl font-extrabold text-white">Thank You for Getting in Touch!</h3>
                <p className="text-[#F1EFE1] text-lg max-w-md mx-auto">
                  Our advertising strategy team has received your message and will get back to you within 24 hours.
                </p>
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="px-8 py-3 bg-[#F1EFE1] hover:bg-white text-[#222222] font-bold rounded-xl transition-all shadow-md"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[#F1EFE1] mb-2">First Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Rajesh"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-5 py-4 bg-[#F1EFE1]/10 border border-[#F1EFE1]/40 rounded-xl text-white placeholder-[#F1EFE1]/50 focus:outline-none focus:border-[#F1EFE1] focus:bg-[#F1EFE1]/20 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#F1EFE1] mb-2">Last Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Sharma"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-5 py-4 bg-[#F1EFE1]/10 border border-[#F1EFE1]/40 rounded-xl text-white placeholder-[#F1EFE1]/50 focus:outline-none focus:border-[#F1EFE1] focus:bg-[#F1EFE1]/20 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[#F1EFE1] mb-2">Work Email *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="rajesh@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-5 py-4 bg-[#F1EFE1]/10 border border-[#F1EFE1]/40 rounded-xl text-white placeholder-[#F1EFE1]/50 focus:outline-none focus:border-[#F1EFE1] focus:bg-[#F1EFE1]/20 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#F1EFE1] mb-2">Phone Number *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-5 py-4 bg-[#F1EFE1]/10 border border-[#F1EFE1]/40 rounded-xl text-white placeholder-[#F1EFE1]/50 focus:outline-none focus:border-[#F1EFE1] focus:bg-[#F1EFE1]/20 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-200 mb-2">Company / Brand Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Tata Motors / MG Motor / XPENG / Retail Brand"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#00F0FF] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-200 mb-2">Preferred Media Channel</label>
                    <select 
                      value={formData.goal}
                      onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                      className="w-full px-5 py-4 bg-[#001E2B] border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#00F0FF] transition-colors"
                    >
                      <option value="Screen Advertising">Screen Advertising (DOOH)</option>
                      <option value="App Advertising">App Advertising</option>
                      <option value="Social Media Promotion">Social Media Promotion</option>
                      <option value="eNewsletter Advertising">eNewsletter Advertising</option>
                      <option value="Our Amplify Package">Our Amplify Package (All-in-One)</option>
                      <option value="Bespoke Superhub Activation">Bespoke Superhub Activation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-200 mb-2">Message & Campaign Objectives</label>
                  <textarea 
                    rows={4}
                    placeholder="Tell us about your target audience, preferred dates, or campaign goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#00F0FF] transition-colors resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-5 bg-[#005F73] hover:bg-[#00F0FF] hover:text-[#001E2B] text-white font-extrabold text-lg rounded-xl transition-all shadow-[0_10px_30px_rgba(0,95,115,0.4)] flex items-center justify-center gap-3"
                >
                  Submit Inquiry <Send className="w-5 h-5" />
                </button>

              </form>
            )}
          </motion.div>

        </div>
      </section>

    </div>
  );
}
