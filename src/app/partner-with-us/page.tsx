"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  ArrowRight,
  Plus,
  Minus,
  Building2,
  Check
} from "lucide-react";
import dynamic from "next/dynamic";

const FrameScrubSection = dynamic(
  () => import("@/components/FrameScrubSection").then((m) => ({ default: m.FrameScrubSection })),
  { ssr: false }
);

// Stat Counter Component
function StatCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = target / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

// Typing Text Effect Component for Card Description
function TypingText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let i = 0;
      const startTimeout = setTimeout(() => {
        const intervalId = setInterval(() => {
          if (i <= text.length) {
            setDisplayedText(text.slice(0, i));
            i++;
          } else {
            clearInterval(intervalId);
          }
        }, 16);
        return () => clearInterval(intervalId);
      }, delay * 1000);

      return () => clearTimeout(startTimeout);
    }
  }, [isInView, text, delay]);

  return (
    <p ref={ref} className={className}>
      {displayedText}
      {displayedText.length < text.length && isInView && (
        <span className="inline-block w-1.5 h-4 bg-[#94D2BD] ml-0.5 animate-pulse" />
      )}
    </p>
  );
}

// Word Reveal Component for Section 6 CTA
function WordReveal({ text }: { text: string }) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const words = text.split(" ");

  return (
    <h2 ref={containerRef} className="text-3xl md:text-5xl font-extrabold text-white leading-tight flex flex-wrap gap-x-3 gap-y-1" style={{ fontFamily: "'Gilroy', sans-serif" }}>
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0.15, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.15, y: 15 }}
          transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </h2>
  );
}

export default function PartnerWithUsPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What are the investment options and who is this for?",
      answer: "DYU offers scalable investment models ranging from Destination Host setups to full FOCO (Franchise Owned, Company Operated) charging hubs, with investment levels from ₹30L to ₹3Cr+ depending on site capacity. It is ideal for commercial property hosts, land owners, fleet operators, and green energy investors."
    },
    {
      question: "What kind of space and power connection do I need?",
      answer: "AC charging setups require standard 3-phase power connections and 1-2 parking bays. High-capacity DC fast charging stations (60kW to 360kW) require dedicated transformer load (100kVA+) and 2-4 accessible parking spaces with dual charging gun clearance."
    },
    {
      question: "How much can I earn and what's the ROI timeline?",
      answer: "Earning potential is driven by daily charging utilization, local per-kWh tariffs, and location accessibility. Under our FOCO model, DYU manages dynamic pricing, payment collection, and network routing to maximize your annual yield and accelerate payback timelines."
    },
    {
      question: "How does DYU support me after setup?",
      answer: "We provide 24/7 CSMS cloud software monitoring, automated billing, marketing & navigation placement on the DYU Mobile App, regular preventive maintenance, and on-ground technical support to ensure 99%+ network uptime."
    },
    {
      question: "Can I get financing or subsidies?",
      answer: "Yes, DYU assists partners in navigating government EV infrastructure policies, state EV guidelines, and securing financial support through our network of banking and financial partners."
    },
    {
      question: "What is the setup timeline?",
      answer: "Once site feasibility analysis, grid load approval, and agreement documentation are finalized, station installation and network commissioning typically take between 2 to 4 weeks."
    },
    {
      question: "Why should I choose DYU over others?",
      answer: "DYU combines 100% indigenous manufacturing, heavy-duty DC fast chargers engineered for Indian weather conditions, an interoperable EV Linq roaming hub, transparent real-time CSMS analytics, and dedicated operational management."
    }
  ];

  const toggleFaq = (index: number) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  const brandPartners = [
    "Commercial Hubs",
    "Hospitality Groups",
    "Retail Hubs",
    "Fleet Enterprises",
    "Real Estate Developers",
    "Highway Service Plazas"
  ];

  return (
    <main className="min-h-screen bg-[#F1EFE1] text-[#222222]">
      
      {/* SECTION 1: Black Blank Hero Section */}
      <section className="w-full h-[50vh] md:h-[65vh] bg-black relative" />

      {/* Main Content Container */}
      <div className="pt-16 pb-20 px-4 md:px-8">

        {/* SECTION 2: India is Charging Ahead. Are You? (Slightly Smaller Compact Cards + Typing Text) */}
        <section className="max-w-7xl mx-auto mb-32 pt-8 relative overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h1 
              className="text-3xl md:text-5xl font-black mb-6 leading-tight"
              style={{ fontFamily: "'Gilroy', sans-serif" }}
            >
              India is Charging Ahead. <br className="hidden sm:inline" />
              <span className="text-[#005F73] italic font-bold">Are you?</span>
            </h1>
            <p className="text-lg md:text-xl font-medium text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-figtree)" }}>
              With India accelerating toward rapid electric vehicle adoption across highway corridors and urban hubs, the demand for accessible, fast-charging infrastructure is soaring. Now is the strategic moment to participate in India's green mobility wave—not as a spectator, but as an owner of futuristic EV charging assets powered by DYU.
            </p>
          </motion.div>

          {/* 3 Slightly Smaller Cards with Swipe-In Reveal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                imgSrc: "/images/3d-icon-charger.png",
                target: 10000, 
                suffix: "+", 
                title: "EV Chargers", 
                desc: "Deployed across high-density urban transit nodes and national highway routes.",
                swipeInit: { opacity: 0, x: -120 }
              },
              { 
                imgSrc: "/images/3d-icon-location.png",
                target: 1014, 
                suffix: "+", 
                title: "Cities Covered", 
                desc: "Extensive pan-India presence connecting tier-1, tier-2, and major logistics corridors.",
                swipeInit: { opacity: 0, y: 120 }
              },
              { 
                imgSrc: "/images/3d-icon-uptime.png",
                target: 99, 
                suffix: "%", 
                title: "Network Uptime", 
                desc: "Continuous CSMS monitoring and proactive on-ground maintenance response.",
                swipeInit: { opacity: 0, x: 120 }
              }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={stat.swipeInit}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.75, delay: idx * 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#002B36] text-[#F1EFE1] p-5 md:p-6 rounded-[1.75rem] border border-[#005F73]/30 shadow-2xl flex flex-col justify-between min-h-[210px] md:min-h-[220px] overflow-hidden"
              >
                {/* 3D Icon (80px - 104px) */}
                <div className="mb-3 h-20 md:h-26 w-full flex items-center justify-start">
                  <img 
                    src={stat.imgSrc} 
                    alt={stat.title} 
                    className="w-20 h-20 md:w-26 md:h-26 object-contain border-0 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" 
                  />
                </div>

                <div>
                  <div className="text-2xl md:text-3xl font-black mb-1.5 text-white font-mono">
                    <StatCounter target={stat.target} suffix={stat.suffix} />
                  </div>
                  <h3 className="text-base md:text-lg font-extrabold text-white mb-1.5" style={{ fontFamily: "'Gilroy', sans-serif" }}>{stat.title}</h3>
                  
                  {/* Typing Text Effect for Card Description */}
                  <TypingText 
                    text={stat.desc} 
                    delay={0.3 + idx * 0.15}
                    className="text-xs text-gray-300 font-medium leading-relaxed" 
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 3: Why Partner With DYU? (Slightly Smaller Compact Cards + Typing Text) */}
        <section className="max-w-7xl mx-auto mb-32 border-t-2 border-[#222222]/10 pt-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-1 mb-16 text-3xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1] text-center"
          >
            <span className="text-[#222222]">Why Partner</span>
            <span className="text-gray-400 font-bold">With DYU?</span>
          </motion.h2>

          {/* 3 Slightly Smaller Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                num: "01",
                imgSrc: "/images/3d-icon-shield.png",
                title: "Reliability",
                desc: "100% designed, engineered, and manufactured in India. Built specifically to withstand rugged local operating conditions.",
                swipeInit: { opacity: 0, x: -90 }
              },
              {
                num: "02",
                imgSrc: "/images/3d-icon-eye.png",
                title: "Transparency",
                desc: "Complete real-time visibility of charger utilization, dynamic tariffing, session logs, and automated revenue splits.",
                swipeInit: { opacity: 0, y: 90 }
              },
              {
                num: "03",
                imgSrc: "/images/3d-icon-scale.png",
                title: "Feasibility",
                desc: "Tailored partnership models designed specifically for commercial property hosts, highway land owners, and fleet operators.",
                swipeInit: { opacity: 0, x: 90 }
              }
            ].map((panel, idx) => (
              <motion.div
                key={idx}
                initial={panel.swipeInit}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.75, delay: idx * 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#002B36] text-[#F1EFE1] p-5 md:p-6 rounded-[1.75rem] border border-[#005F73]/30 shadow-2xl flex flex-col justify-between min-h-[210px] md:min-h-[220px]"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="h-20 md:h-26 w-3/4 flex items-center justify-start">
                    <img 
                      src={panel.imgSrc} 
                      alt={panel.title} 
                      className="w-20 h-20 md:w-26 md:h-26 object-contain border-0 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" 
                    />
                  </div>
                  <span className="text-lg font-bold font-mono text-white/40">{panel.num}</span>
                </div>

                <div>
                  <span className="text-[#94D2BD] text-xs font-bold tracking-widest uppercase font-mono block mb-1">Panel {panel.num}</span>
                  <h3 className="text-lg font-black mb-1.5 text-white" style={{ fontFamily: "'Gilroy', sans-serif" }}>{panel.title}</h3>
                  
                  {/* Typing Text Effect */}
                  <TypingText 
                    text={panel.desc} 
                    delay={0.3 + idx * 0.15}
                    className="font-medium text-gray-300 text-xs md:text-sm leading-relaxed" 
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Section Disclaimer Note */}
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs text-gray-500 max-w-4xl mx-auto text-center leading-relaxed" 
            style={{ fontFamily: "var(--font-figtree)" }}
          >
            Disclaimer: DYU franchise opportunities and site installations are subject to site evaluation, grid load feasibility, applicable local regulations, and mutual agreement terms. Please rely strictly on official DYU communication channels for verified partnership information.
          </motion.p>
        </section>

        {/* SECTION 4: Financing Section (4 Slightly Smaller Cards) */}
        <section className="max-w-7xl mx-auto mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#002B36] text-[#F1EFE1] p-8 md:p-14 rounded-[2.5rem] border border-[#005F73]/30 shadow-2xl overflow-hidden"
          >
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold tracking-widest text-[#F1EFE1] uppercase bg-white/10 px-4 py-1.5 rounded-full inline-block mb-4" style={{ fontFamily: "var(--font-figtree)" }}>
                Financing Support
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                Powered by DYU. <br />
                <span className="text-gray-300 font-bold">Supported by Flexible Financing Options.</span>
              </h2>
              <p className="text-lg text-gray-300 font-medium leading-relaxed" style={{ fontFamily: "var(--font-figtree)" }}>
                Whether you're stepping into your first EV investment or scaling a multi-site infrastructure portfolio, DYU franchise partners can access financing support through our banking and financial partner network.
              </p>
            </div>

            {/* 4 Slightly Smaller Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { imgSrc: "/images/3d-icon-coins.png", title: "Attractive Interest Rates", desc: "Access competitive financing terms structured specifically for sustainable green energy investments." },
                { imgSrc: "/images/3d-icon-growth.png", title: "Flexible Setup Financing", desc: "Finance a significant portion of your total charging station setup, equipment, and installation costs." },
                { imgSrc: "/images/3d-icon-clock.png", title: "Tailored Repayment Tenures", desc: "Adaptable EMI options designed to align smoothly with your charging station revenue cycles." },
                { imgSrc: "/images/3d-icon-doc.png", title: "Simplified Application Process", desc: "Streamlined documentation and dedicated DYU advisor guidance to expedite loan approval." }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-[#002B36] border border-[#005F73]/40 p-5 md:p-6 rounded-[1.75rem] shadow-xl flex flex-col justify-between min-h-[210px] md:min-h-[220px]"
                >
                  <div className="mb-3 h-20 md:h-26 w-full flex items-center justify-start">
                    <img 
                      src={item.imgSrc} 
                      alt={item.title} 
                      className="w-20 h-20 md:w-26 md:h-26 object-contain border-0 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" 
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-1.5 leading-snug" style={{ fontFamily: "'Gilroy', sans-serif" }}>{item.title}</h4>
                    <TypingText 
                      text={item.desc} 
                      delay={0.2 + idx * 0.1}
                      className="text-xs text-gray-300 leading-relaxed font-medium" 
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>



        {/* SECTION 6: "Curious, but have questions?" CTA (WordReveal Typography Animation) */}
        <section className="max-w-7xl mx-auto mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#222222] text-[#F1EFE1] p-8 md:p-14 rounded-[2.5rem] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center shadow-2xl"
          >
            <div className="lg:col-span-7 flex flex-col gap-6">
              <span className="text-xs font-bold tracking-widest text-gray-400 uppercase border-b-2 border-gray-500 pb-2 w-max" style={{ fontFamily: "var(--font-figtree)" }}>
                Personalized Consultation
              </span>
              
              {/* WordReveal Typography Animation */}
              <WordReveal text="Curious, but have questions about partnering with DYU?" />

              <p className="text-lg text-gray-300 font-medium leading-relaxed" style={{ fontFamily: "var(--font-figtree)" }}>
                Connect with our DYU green energy partnerships team for a detailed, one-on-one walkthrough of the franchise opportunity.
              </p>

              {/* 4 Bullet Points: What to Expect */}
              <div className="space-y-4 mt-2">
                {[
                  "End-to-end walkthrough of the DYU franchise & FOCO operating models",
                  "Data-backed insights on expected tariffs, returns, and revenue splits",
                  "Clear guidance on site selection, grid load requirements, and setup timelines",
                  "Direct Q&A session with our senior green energy partnerships team"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check size={18} className="text-[#94D2BD] shrink-0 mt-0.5" />
                    <span className="text-base text-gray-200 font-medium" style={{ fontFamily: "var(--font-figtree)" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <a 
                  href="#request-form" 
                  className="btn-primary inline-flex items-center gap-3 bg-[#005F73] text-white px-8 py-4 text-base font-bold tracking-wider hover:bg-[#002B36] transition-colors rounded-xl border border-white/20"
                  style={{ fontFamily: "'Gilroy', sans-serif" }}
                >
                  Talk to an Expert
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[4/3] bg-black/40 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
                <img src="/images/partner-card-1.jpg" alt="Curious questions" className="w-full h-full object-cover rounded-2xl opacity-90" />
              </div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 7: FAQs Section (7 Specific Questions in DYU Voice) */}
        <section className="max-w-7xl mx-auto mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col gap-4"
          >
            <span className="text-sm font-bold tracking-widest text-[#222222]" style={{ fontFamily: "var(--font-figtree)" }}>FAQs</span>
            <h2 className="flex flex-col gap-1 mb-6 text-2xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
              <span className="text-[#222222]">Got questions</span>
              <span className="text-gray-400 font-bold">about EV Franchising?</span>
            </h2>
            <p className="text-lg text-[#1F2933] font-medium mb-6" style={{ fontFamily: "var(--font-figtree)" }}>Contact us if you still have any questions to make your experience smoother.</p>
            <a 
              href="/contact-us"
              className="btn-primary inline-flex items-center justify-center gap-3 bg-[#005F73] text-white px-6 py-3 font-bold tracking-wider hover:bg-[#002B36] transition-colors w-max rounded-xl"
              style={{ fontFamily: "'Gilroy', sans-serif" }}
            >
              Got More Questions?
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <div className="lg:col-span-8 flex flex-col">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="border-b-2 border-black/10 last:border-b-2"
              >
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                >
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-xl font-bold text-[#222222] w-8">
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="text-lg md:text-xl font-bold text-[#222222] group-hover:text-[#222222] transition-colors pr-4" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                      {faq.question}
                    </span>
                  </div>
                  <div className="flex-shrink-0">
                    {activeFaq === idx ? (
                      <Minus className="w-6 h-6 text-[#222222]" />
                    ) : (
                      <Plus className="w-6 h-6 text-[#222222]" />
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 pl-14 text-lg font-medium text-[#1F2933]" style={{ fontFamily: "var(--font-figtree)" }}>
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

        </section>

        {/* SECTION 8: Request Form Section */}
        <motion.section 
          id="request-form" 
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="dark-card max-w-4xl mx-auto border-2 border-[#005F73]/30 bg-[#002B36] text-white p-8 md:p-12 rounded-[2rem]"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-10"
          >
            <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
              <span className="text-white">Request</span>
              <span className="text-white italic">Form</span>
            </h2>
            <p className="text-lg text-gray-300 font-medium" style={{ fontFamily: "var(--font-figtree)" }}>Fill out the details below and our team will get in touch.</p>
          </motion.div>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-2"
              >
                <label className="font-bold text-sm tracking-widest text-gray-400" style={{ fontFamily: "var(--font-figtree)" }}>First Name *</label>
                <input 
                  type="text" 
                  className="bg-transparent border-2 border-[#444] text-[#F1EFE1] p-4 focus:outline-none focus:border-gray-400 font-medium rounded-xl"
                  required
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-2"
              >
                <label className="font-bold text-sm tracking-widest text-gray-400" style={{ fontFamily: "var(--font-figtree)" }}>Last Name *</label>
                <input 
                  type="text" 
                  className="bg-transparent border-2 border-[#444] text-[#F1EFE1] p-4 focus:outline-none focus:border-gray-400 font-medium rounded-xl"
                  required
                />
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-2"
            >
              <label className="font-bold text-sm tracking-widest text-gray-400" style={{ fontFamily: "var(--font-figtree)" }}>Email Address *</label>
              <input 
                type="email" 
                className="bg-transparent border-2 border-[#444] text-[#F1EFE1] p-4 focus:outline-none focus:border-gray-400 font-medium rounded-xl"
                required
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-2"
            >
              <label className="font-bold text-sm tracking-widest text-gray-400" style={{ fontFamily: "var(--font-figtree)" }}>Phone Number *</label>
              <input 
                type="tel" 
                className="bg-transparent border-2 border-[#444] text-[#F1EFE1] p-4 focus:outline-none focus:border-gray-400 font-medium rounded-xl"
                required
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.50, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-2"
            >
              <label className="font-bold text-sm tracking-widest text-gray-400" style={{ fontFamily: "var(--font-figtree)" }}>Message / Inquiry Details</label>
              <textarea 
                rows={4}
                className="bg-transparent border-2 border-[#444] text-[#F1EFE1] p-4 focus:outline-none focus:border-gray-400 font-medium resize-none rounded-xl"
              ></textarea>
            </motion.div>

            <motion.button 
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
              className="w-full bg-gray-300 text-[#222222] py-5 text-xl font-black tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-3 mt-4 rounded-xl"
              style={{ fontFamily: "'Gilroy', sans-serif" }}
            >
              Submit Request
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </form>
        </motion.section>

      </div>
    </main>
  );
}
