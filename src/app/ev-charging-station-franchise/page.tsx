"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  TrendingUp, 
  Headset, 
  BadgeCheck, 
  ArrowRight,
  MapPin,
  Zap,
  CheckCircle2,
  Wallet,
  Landmark,
  BarChart3,
  Wrench,
  ShoppingBag,
  Car,
  Briefcase,
  CircleDollarSign,
  ChevronDown,
  ChevronUp
} from "lucide-react";

const calculatorData = {
  "60 kW": {
    cost: "12,00,000",
    loan: "9,60,000",
    equity: "2,40,000",
    year1Roi: "120.5%",
    table: [
      { year: 1, roi: "10%", roe: "45%" },
      { year: 2, roi: "12%", roe: "50%" },
      { year: 3, roi: "15%", roe: "60%" },
      { year: 4, roi: "25%", roe: "110%" },
      { year: 5, roi: "40%", roe: "150%" },
      { year: 6, roi: "60%", roe: "220%" },
      { year: 7, roi: "80%", roe: "300%" },
      { year: 8, roi: "90%", roe: "350%" }
    ]
  },
  "120 kW": {
    cost: "22,50,000",
    loan: "18,00,000",
    equity: "4,50,000",
    year1Roi: "145.2%",
    table: [
      { year: 1, roi: "12%", roe: "55%" },
      { year: 2, roi: "14%", roe: "58%" },
      { year: 3, roi: "18%", roe: "85%" },
      { year: 4, roi: "30%", roe: "140%" },
      { year: 5, roi: "45%", roe: "210%" },
      { year: 6, roi: "68%", roe: "300%" },
      { year: 7, roi: "85%", roe: "380%" },
      { year: 8, roi: "95%", roe: "420%" }
    ]
  },
  "180 kW": {
    cost: "31,50,000",
    loan: "25,20,000",
    equity: "6,30,000",
    year1Roi: "155.4%",
    table: [
      { year: 1, roi: "13%", roe: "62%" },
      { year: 2, roi: "14%", roe: "65%" },
      { year: 3, roi: "18%", roe: "92%" },
      { year: 4, roi: "32%", roe: "155%" },
      { year: 5, roi: "48%", roe: "235%" },
      { year: 6, roi: "71%", roe: "340%" },
      { year: 7, roi: "88%", roe: "420%" },
      { year: 8, roi: "96%", roe: "460%" }
    ]
  },
  "240 kW": {
    cost: "40,40,000",
    loan: "32,32,000",
    equity: "8,08,000",
    year1Roi: "162.3%",
    table: [
      { year: 1, roi: "14%", roe: "68%" },
      { year: 2, roi: "15%", roe: "59%" },
      { year: 3, roi: "19%", roe: "97%" },
      { year: 4, roi: "33%", roe: "163%" },
      { year: 5, roi: "50%", roe: "252%" },
      { year: 6, roi: "74%", roe: "370%" },
      { year: 7, roi: "91%", roe: "456%" },
      { year: 8, roi: "98%", roe: "491%" }
    ]
  }
};

const FAQItem = ({ question, answer }: { question: string, answer: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="dark-card border border-[#005F73]/20 bg-[#002B36] hover:border-[#005F73] hover:shadow-xl hover:shadow-[#005F73]/20 shadow-xl backdrop-blur-md rounded-2xl mb-4 overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
      >
        <h4 className="text-lg font-extrabold text-white pr-8">{question}</h4>
        {isOpen ? <ChevronUp className="w-5 h-5 text-[#005F73] flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-[#005F73] flex-shrink-0" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-5 text-white/90 font-medium"
            style={{ fontFamily: 'var(--font-figtree)' }}
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FranchisePage() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [selectedCharger, setSelectedCharger] = useState<keyof typeof calculatorData>("240 kW");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeStationTab, setActiveStationTab] = useState<'fast' | 'super'>('fast');
  
  const currentCalcData = calculatorData[selectedCharger];

  return (
    <div ref={containerRef as React.RefObject<HTMLDivElement>} className="min-h-screen relative font-['Inter'] bg-white text-[#222222]">
      {/* Dark background only - no video */}

      <main className="pt-24 pb-20 relative z-10">
        
        {/* HERO SECTION */}
        <section className="min-h-[70vh] flex items-center justify-center relative z-10">
          <div className="container mx-auto px-4 text-center">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#005F73]/10 backdrop-blur-md border border-[#005F73]/20 mb-8 shadow-sm"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#005F73] animate-pulse" />
              <span className="text-base font-extrabold text-[#222222]" style={{ fontFamily: 'Inter, sans-serif' }}>High ROI Business Opportunity</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-col gap-1 mb-6 tracking-tighter"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}
            >
              <span className="text-[#1F2933]">Start Your EV Charging</span>
              <span className="text-[#222222] font-bold">Station Franchise</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl font-bold text-[#52606D] max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              Own India's EV Charging Infrastructure Starting from ₹30 Lakhs with DC fast charging stations (60kW - 360kW).
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center"
            >
              <button className="px-8 py-4 bg-[#005F73] hover:bg-[#0A7890] text-white rounded-full font-extrabold text-lg transition-all shadow-[0_10px_30px_rgba(0,95,115,0.25)] flex items-center gap-2">
                Enquire Now <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* FOCO MODEL SECTION */}
        <section className="py-20 relative z-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#002B36] shadow-xl backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-16 text-center text-white"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white font-extrabold text-base mb-6 border border-white/20">
                Franchise Model
              </div>
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Plus_Jakarta_Sans'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-white">FOCO (Franchise Owned,</span>
                <span className="text-white font-bold">Company Operated)</span>
              </h2>
              <p className="text-2xl md:text-3xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
                Invest in EV charging stations backed by DYU's growing network and technology ecosystem. Through the FOCO model, investors own the charging infrastructure while DYU supports deployment, technology integration, and operational management.
              </p>
            </motion.div>
          </div>
        </section>

        {/* WHAT YOU DO VS WHAT DYU SUPPORTS */}
        <section className="py-10 relative z-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* What You Do */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="dark-card bg-[#002B36] shadow-xl backdrop-blur-lg border border-[#005F73]/20 rounded-3xl p-8 md:p-10"
              >
                <h3 className="text-2xl font-extrabold mb-8 flex items-center gap-4 text-white font-['Gilroy']">
                  <Wallet className="w-8 h-8 text-[#005F73] shrink-0" />
                  <span>What You Do</span>
                </h3>
                <ul className="space-y-6">
                  {[
                    "Invest in the EV charging station setup",
                    "Participate in the growing EV infrastructure ecosystem",
                    "Earn revenue from charging usage at your station"
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-4 items-start py-1">
                      <CheckCircle2 className="w-6 h-6 text-[#005F73] flex-shrink-0 mt-1" />
                      <span className="text-lg text-gray-200 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* What DYU Supports */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="dark-card bg-[#002B36] shadow-xl backdrop-blur-lg border border-[#005F73]/20 rounded-3xl p-8 md:p-10"
              >
                <h3 className="text-2xl font-extrabold mb-8 flex items-center gap-4 text-white font-['Gilroy']">
                  <Building2 className="w-8 h-8 text-[#005F73] shrink-0" />
                  <span>What DYU Supports</span>
                </h3>
                <ul className="space-y-5">
                  {[
                    "Location evaluation and assistance in identifying suitable sites if required",
                    "Charger technology and installation",
                    "Integration with DYU's charging network and app",
                    "Technical monitoring and uptime support",
                    "Branding and platform visibility"
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-4 items-start py-1">
                      <CheckCircle2 className="w-6 h-6 text-[#888888] flex-shrink-0 mt-1" />
                      <span className="text-lg text-gray-200 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

            </div>
          </div>
        </section>

        {/* CHARGING STATION MODELS (FAST VS SUPER CHARGING TABS) */}
        <section className="py-20 relative z-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <span className="text-sm font-bold tracking-widest text-[#888888] uppercase block mb-3" style={{ fontFamily: "var(--font-figtree)" }}>
                Franchise Station Models
              </span>
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-[#222222]">Fast & Ultra Charging</span>
                <span className="text-[#888888] font-bold">EV Stations</span>
              </h2>
              <p className="text-lg md:text-xl text-[#666666] font-bold max-w-3xl mx-auto">
                Explore our high-yield EV charging station configurations designed for highways, commercial hubs, and city centers.
              </p>
            </div>

            {/* TAB SELECTOR BUTTONS */}
            <div className="flex justify-center items-center gap-6 md:gap-16 mb-12 border-b border-gray-300/80 pb-4 flex-wrap">
              <button
                onClick={() => setActiveStationTab('fast')}
                className={`text-xl md:text-3xl font-extrabold font-['Gilroy'] tracking-tight pb-3 transition-all relative ${
                  activeStationTab === 'fast' ? 'text-[#222222]' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Fast Charging Stations
                {activeStationTab === 'fast' && (
                  <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-1 bg-[#005F73] rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveStationTab('super')}
                className={`text-xl md:text-3xl font-extrabold font-['Gilroy'] tracking-tight pb-3 transition-all relative ${
                  activeStationTab === 'super' ? 'text-[#222222]' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Ultra Charging Stations
                {activeStationTab === 'super' && (
                  <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-1 bg-[#005F73] rounded-full" />
                )}
              </button>
            </div>

            {/* TAB CONTENT PANEL: FULL UNCROPPED IMAGE FIRST AT TOP, THEN FULL DETAILS */}
            <AnimatePresence mode="wait">
              {activeStationTab === 'fast' ? (
                <motion.div 
                  key="fast"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-8 max-w-5xl mx-auto"
                >
                  {/* 1. FULL UNCROPPED IMAGE FIRST AT TOP */}
                  <div className="w-full rounded-3xl overflow-hidden shadow-2xl border border-black/10 bg-white">
                    <img 
                      src="/images/partner-card-1.jpg" 
                      alt="Fast Charging Station" 
                      className="w-full h-auto max-h-[520px] object-cover rounded-3xl"
                    />
                  </div>

                  {/* 2. FULL CONTEXTUAL INFORMATIONS BELOW */}
                  <div className="dark-card bg-[#002B36] text-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-[#005F73]/20">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                      <h3 className="text-3xl md:text-4xl font-extrabold text-white font-['Gilroy']">
                        Fast Charging Stations
                      </h3>
                      <span className="px-5 py-2 rounded-full bg-white/10 border border-white/20 text-white font-extrabold text-xs uppercase tracking-wider">
                        Urban & Commercial Hubs
                      </span>
                    </div>

                    <p className="text-lg text-gray-200 mb-10 leading-relaxed max-w-4xl">
                      Designed for high-density city locations, shopping malls, hotels, and commercial office parks requiring quick turnover and high reliability. Delivers 60 kW to 120 kW dual-gun DC fast charging capacity.
                    </p>

                    {/* Specifications Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                        <span className="text-xs uppercase tracking-widest text-white font-bold block mb-1">Power Output</span>
                        <p className="text-xl font-black text-white">60 kW - 120 kW</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                        <span className="text-xs uppercase tracking-widest text-white font-bold block mb-1">Parking Bays</span>
                        <p className="text-xl font-black text-white">2 to 6 Bays</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                        <span className="text-xs uppercase tracking-widest text-white font-bold block mb-1">Target Use</span>
                        <p className="text-xl font-black text-white">Urban Retail & Malls</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                        <span className="text-xs uppercase tracking-widest text-white font-bold block mb-1">Charge Speed</span>
                        <p className="text-xl font-black text-white">30-45 Mins (80%)</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="super"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-8 max-w-5xl mx-auto"
                >
                  {/* 1. FULL UNCROPPED IMAGE FIRST AT TOP */}
                  <div className="w-full rounded-3xl overflow-hidden shadow-2xl border border-black/10 bg-white">
                    <img 
                      src="/images/partner-card-2.jpg" 
                      alt="Ultra Charging Station" 
                      className="w-full h-auto max-h-[520px] object-cover rounded-3xl"
                    />
                  </div>

                  {/* 2. FULL CONTEXTUAL INFORMATIONS BELOW */}
                  <div className="dark-card bg-[#002B36] text-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-[#005F73]/20">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                      <h3 className="text-3xl md:text-4xl font-extrabold text-white font-['Gilroy']">
                        Ultra Charging Stations
                      </h3>
                      <span className="px-5 py-2 rounded-full bg-white/10 border border-white/20 text-white font-extrabold text-xs uppercase tracking-wider">
                        Highways & Logistics Corridors
                      </span>
                    </div>

                    <p className="text-lg text-gray-200 mb-10 leading-relaxed max-w-4xl">
                      Ultra-fast megawatt-scale charging stations designed for long-distance highway plazas, heavy-duty commercial truck stops, and large e-bus fleet depots. Delivers 180 kW to 360 kW hyper-fast charging.
                    </p>

                    {/* Specifications Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                        <span className="text-xs uppercase tracking-widest text-white font-bold block mb-1">Power Output</span>
                        <p className="text-xl font-black text-white">180 kW - 360 kW</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                        <span className="text-xs uppercase tracking-widest text-white font-bold block mb-1">Parking Bays</span>
                        <p className="text-xl font-black text-white">4 to 20 Bays</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                        <span className="text-xs uppercase tracking-widest text-white font-bold block mb-1">Target Use</span>
                        <p className="text-xl font-black text-white">Highways & Depots</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                        <span className="text-xs uppercase tracking-widest text-white font-bold block mb-1">Charge Speed</span>
                        <p className="text-xl font-black text-white">15-20 Mins (80%)</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </section>

        {/* HOW TO START - STEP BY STEP PROCESS */}
        <section className="py-20 relative z-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-[#222222]">How to Start an EV Charging Station</span>
                <span className="text-[#222222] italic">With DYU</span>
              </h2>
              <p className="text-xl text-[#1F2933] max-w-3xl mx-auto font-medium">
                Simple 4-step deployment framework to launch your commercial EV charging station efficiently.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Submit Inquiry", desc: "Share your location details, available power capacity, and investment interest." },
                { step: "02", title: "Site Evaluation", desc: "Our technical team reviews site feasibility, electrical grid requirements, and traffic potential." },
                { step: "03", title: "Model Selection", desc: "Choose between FOCO (Franchise Owned, Company Operated) or Direct Purchase model." },
                { step: "04", title: "Deployment", desc: "Charger installation, software integration, testing, branding, and commercial commissioning." }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="dark-card bg-[#002B36] shadow-xl border border-[#005F73]/20 rounded-3xl p-8 relative overflow-hidden group hover:border-white/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-extrabold text-white pr-16 relative z-10">{item.title}</h3>
                      <span className="text-4xl font-black text-white/20 absolute top-4 right-6 group-hover:scale-105 transition-transform pointer-events-none select-none">
                        {item.step}
                      </span>
                    </div>
                    <p className="text-gray-200 text-base leading-relaxed pr-12 relative z-10">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHO CAN START */}
        <section className="py-20 relative z-20">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
              <span className="text-[#222222]">Who Can Start an</span>
              <span className="text-[#222222] italic">EV Charging Station?</span>
            </h2>
            <p className="text-[#1F2933] text-lg mb-12">This opportunity is suitable for</p>

            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: Building2, text: "Commercial real estate owners" },
                { icon: ShoppingBag, text: "Mall & retail asset owners" },
                { icon: MapPin, text: "Highway property holders" },
                { icon: Briefcase, text: "SME business owners" },
                { icon: Landmark, text: "Infra-focused investors" }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="dark-card bg-[#002B36] shadow-xl border border-[#005F73]/20 rounded-full px-6 py-3 flex items-center gap-3 hover:border-white/30 transition-colors cursor-default"
                >
                  <item.icon className="w-5 h-5 text-white" />
                  <span className="font-medium text-white">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* MODELS & RANGE */}
        <section className="py-20 relative z-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-[#222222]">Choose Your EV Charging</span>
                <span className="text-[#222222] italic">Business Model & Setup</span>
              </h2>
              <p className="text-xl text-[#1F2933] max-w-3xl mx-auto font-medium">
                Flexible configurations and investment models tailored for commercial spaces, land owners, and fleet operators.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Card 1: Investment Range */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="dark-card bg-[#002B36] shadow-xl border border-[#005F73]/20 rounded-3xl p-10 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-white font-extrabold mb-2 uppercase tracking-wider text-sm">Investment Range</h3>
                  <p className="text-4xl md:text-5xl font-extrabold text-white mb-4">₹30 Lakhs - ₹3 Crores+</p>
                </div>
                <p className="text-gray-200 mt-4">Scalable investment options starting from ₹30 lakhs depending on site capacity and grid requirements.</p>
              </motion.div>
              
              {/* Card 2: Station Configurations */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="dark-card bg-[#002B36] shadow-xl border border-[#005F73]/20 rounded-3xl p-10 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-white font-extrabold mb-6 uppercase tracking-wider text-sm">Station Configurations</h3>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {["60 kW", "120 kW", "240 kW", "360 kW"].map(kw => (
                      <span key={kw} className="bg-white/10 text-white px-4 py-2 rounded-lg font-extrabold border border-white/20">{kw}</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-200">Multiple fast-charging configurations based on your location & traffic potential. Supports 2-20 parking bays.</p>
              </motion.div>

              {/* Card 3: FOCO */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="dark-card bg-[#002B36] shadow-xl border border-[#005F73]/20 rounded-3xl p-8 hover:border-white/30 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-extrabold text-white mb-1">FOCO</h3>
                      <p className="text-gray-200 font-medium">Franchise Owned, Company Operated</p>
                    </div>
                    <span className="bg-white/10 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider text-white border border-white/20">Model 01</span>
                  </div>
                  <p className="text-gray-200 mb-6 text-base leading-relaxed">Ideal for investors, MSMEs, and businesses looking to participate in EV infrastructure while leveraging DYU's operational expertise.</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex gap-2 text-base text-gray-200"><CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" /> Investment ranges from ₹30 Lakhs to ₹3 Crores</li>
                    <li className="flex gap-2 text-base text-gray-200"><CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" /> DC Fast Charging Stations (60kW - 360kW)</li>
                    <li className="flex gap-2 text-base text-gray-200"><CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" /> Charger deployment & technology by DYU</li>
                  </ul>
                </div>
                <button className="btn-primary w-full py-3 bg-[#005F73] hover:bg-[#002B36] text-white rounded-full font-extrabold transition-colors">Enquire Now</button>
              </motion.div>

              {/* Card 4: Direct */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="dark-card bg-[#002B36] shadow-xl border border-[#005F73]/20 rounded-3xl p-8 hover:border-white/30 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-extrabold text-white mb-1">Direct</h3>
                      <p className="text-gray-200 font-medium">Outright Purchase</p>
                    </div>
                    <span className="bg-white/10 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider text-white border border-white/20">Model 02</span>
                  </div>
                  <p className="text-gray-200 mb-6 text-base leading-relaxed">Best for hotels, fleet operators, commercial properties that want complete ownership and control of their charging infrastructure.</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex gap-2 text-base text-gray-200"><CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" /> Complete ownership of the charger</li>
                    <li className="flex gap-2 text-base text-gray-200"><CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" /> No recurring AMC or SaaS (optional)</li>
                    <li className="flex gap-2 text-base text-gray-200"><CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" /> Flexible pricing, operations, and billing</li>
                  </ul>
                </div>
                <button className="btn-primary w-full py-3 bg-[#005F73] hover:bg-[#002B36] text-white rounded-full font-extrabold transition-colors">Enquire Now</button>
              </motion.div>

            </div>
          </div>
        </section>

        {/* FAQS */}
        <section className="py-20 relative z-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]"
              >
                <span className="text-[#222222]">Frequently Asked</span>
                <span className="text-[#888888] font-bold">Questions</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[#666666] text-lg font-medium"
              >
                Have Questions About Starting an EV Charging Station?
              </motion.p>
            </div>

            <div className="space-y-2">
              {[
                {
                  question: "How much can I realistically earn from an EV charging station?",
                  answer: (
                    <div className="space-y-2">
                      <p>It depends on three main factors:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Location demand</li>
                        <li>Charger capacity (60kW vs 240kW+)</li>
                        <li>Daily usage (number of sessions)</li>
                      </ul>
                      <p>In high-traffic locations, revenue tends to grow as EV adoption increases. Returns may feel slow at the beginning, but improve over time with higher utilization.</p>
                    </div>
                  )
                },
                {
                  question: "What is the cost and investment required to start an EV charging station franchise in India?",
                  answer: "The investment starts from ₹30 Lakhs and can go up to ₹3 Crores+, depending on the number of parking bays and the charger capacity (60kW to 360kW) you choose to install."
                },
                {
                  question: "How do I actually start an EV charging station franchise?",
                  answer: "Simply share your interest with our team. We will evaluate your site for EV demand and power availability, install the infrastructure, and integrate it with our network to go live."
                },
                {
                  question: "How does the EV charging business model work?",
                  answer: "Under the FOCO model, you invest in the physical infrastructure and earn revenue from charging sessions, while DYU handles the installation, software network, and maintenance."
                },
                {
                  question: "Which is the best EV charging station franchise in India?",
                  answer: "With high ROI, complete turnkey setup, 24/7 technical support, and an advanced technology ecosystem, DYU is rapidly emerging as the premier choice for EV charging franchises."
                }
              ].map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                >
                  <FAQItem question={faq.question} answer={faq.answer} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
