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
    <div className="border border-white/10 bg-[#222222] shadow-xl backdrop-blur-md rounded-2xl mb-4 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
      >
        <h4 className="text-lg font-extrabold text-white pr-8">{question}</h4>
        {isOpen ? <ChevronUp className="w-5 h-5 text-[#888888] flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-[#888888] flex-shrink-0" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-5 text-gray-300"
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
  
  const currentCalcData = calculatorData[selectedCharger];

  return (
    <div ref={containerRef as React.RefObject<HTMLDivElement>} className="min-h-screen relative font-['Figtree'] bg-[#F1EFE1] text-[#222222]">
      {/* FIXED BACKGROUND VIDEO & LIGHT OVERLAY */}
      <div className="fixed inset-0 z-[-2]">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-10"
          src="/ev-charging-2.mp4" 
        />
      </div>
      <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-[#F1EFE1]/80 via-[#F1EFE1]/90 to-[#F1EFE1] backdrop-blur-[2px]" />

      <main className="pt-24 pb-20 relative">
        
        {/* HERO SECTION */}
        <section className="min-h-[70vh] flex items-center justify-center relative z-10">
          <div className="container mx-auto px-4 text-center">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#222222]/10 backdrop-blur-md border border-[#222222]/20 mb-8 shadow-sm"
              style={{ fontFamily: 'var(--font-figtree)' }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-pulse" />
              <span className="text-base font-extrabold text-[#222222]" style={{ fontFamily: 'Figtree, sans-serif' }}>High ROI Business Opportunity</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-col gap-1 mb-6 tracking-tighter"
              style={{ fontFamily: '"Gilroy", sans-serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}
            >
              <span className="text-[#222222]">Start Your EV Charging</span>
              <span className="text-[#888888] italic">Station Franchise</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl font-bold text-[#666666] max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              Own India's EV Charging Infrastructure Starting from ₹30 Lakhs with DC fast charging stations (60kW - 360kW).
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center"
            >
              <button className="px-8 py-4 bg-white hover:bg-gray-200 text-[#222222] rounded-xl font-extrabold text-lg transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center gap-2">
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
              className="bg-[#222222] shadow-xl backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-16 text-center"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white font-extrabold text-base mb-6">
                Franchise Model
              </div>
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-white">FOCO (Franchise Owned,</span>
                <span className="text-[#888888] italic">Company Operated)</span>
              </h2>
              <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
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
                className="bg-[#222222] shadow-xl backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-10"
              >
                <h3 className="text-2xl font-extrabold mb-8 flex items-center gap-3 text-white">
                  <Wallet className="w-8 h-8 text-[#888888]" /> What You Do
                </h3>
                <ul className="space-y-6">
                  {[
                    "Invest in the EV charging station setup",
                    "Participate in the growing EV infrastructure ecosystem",
                    "Earn revenue from charging usage at your station"
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <CheckCircle2 className="w-6 h-6 text-[#888888] flex-shrink-0 mt-0.5" />
                      <span className="text-lg text-gray-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* What DYU Supports */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#222222] shadow-xl backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-10"
              >
                <h3 className="text-2xl font-extrabold mb-8 flex items-center gap-3 text-white">
                  <Building2 className="w-8 h-8 text-[#888888]" /> What DYU Supports
                </h3>
                <ul className="space-y-5">
                  {[
                    "Location evaluation and assistance in identifying suitable sites if required",
                    "Charger technology and installation",
                    "Integration with DYU's charging network and app",
                    "Technical monitoring and uptime support",
                    "Branding and platform visibility"
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <CheckCircle2 className="w-6 h-6 text-[#888888] flex-shrink-0 mt-0.5" />
                      <span className="text-lg text-gray-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

            </div>
          </div>
        </section>

        {/* CALCULATOR SECTION (STATIC UI) */}
        <section className="py-20 relative z-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#222222] shadow-xl backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12"
            >
              <div className="text-center mb-12">
                <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                  <span className="text-white">Calculate Your EV</span>
                  <span className="text-[#888888] italic">Franchise Returns</span>
                </h2>
                <p className="text-[#888888] text-lg">Estimate your potential returns from a DYU EV charging station franchise investment.</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-10">
                {/* Left Controls */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-[#111111]/50 rounded-2xl p-6 border border-white/5">
                    <p className="text-base text-[#888888] font-extrabold mb-2 uppercase tracking-wider">Select Charger Type</p>
                    <div className="relative">
                      <div 
                        className="w-full bg-white/10 p-4 rounded-xl border border-white/10 text-white font-extrabold text-lg flex justify-between items-center cursor-pointer hover:bg-white/20 transition-colors"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                      >
                        {selectedCharger} <ChevronDown className={`w-5 h-5 text-[#888888] transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                      </div>
                      <AnimatePresence>
                        {dropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 w-full mt-2 bg-[#222222] border border-white/10 rounded-xl overflow-hidden z-30 shadow-2xl"
                          >
                            {(Object.keys(calculatorData) as Array<keyof typeof calculatorData>).map((type) => (
                              <div 
                                key={type}
                                className={`p-4 text-white font-bold cursor-pointer hover:bg-white/10 ${selectedCharger === type ? 'bg-white/5' : ''}`}
                                onClick={() => {
                                  setSelectedCharger(type);
                                  setDropdownOpen(false);
                                }}
                              >
                                {type}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  
                  <div className="bg-[#111111]/50 rounded-2xl p-6 border border-white/5 space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-white/10">
                      <span className="text-[#888888] font-extrabold text-base tracking-wider">INTEREST</span>
                      <span className="text-xl font-extrabold text-white">9%</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-white/10">
                      <span className="text-[#888888] font-extrabold text-base tracking-wider">LOAN TERM</span>
                      <span className="text-xl font-extrabold text-white">8 years</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#888888] font-extrabold text-base tracking-wider">LOAN PERCENTAGE</span>
                      <span className="text-xl font-extrabold text-white">80%</span>
                    </div>
                  </div>
                </div>

                {/* Right Cards */}
                <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
                  <div className="bg-[#222222] shadow-xl border border-white/5 rounded-2xl p-6 flex flex-col justify-center">
                    <p className="text-[#888888] font-medium mb-1">Total Project Cost</p>
                    <p className="text-4xl md:text-5xl font-['Gilroy'] font-extrabold text-white mb-2">₹ {currentCalcData.cost}</p>
                    <p className="text-base text-[#888888]">{selectedCharger} Charger</p>
                  </div>
                  <div className="bg-[#222222] shadow-xl border border-white/5 rounded-2xl p-6 flex flex-col justify-center">
                    <p className="text-[#888888] font-medium mb-1">Loan Availed</p>
                    <p className="text-4xl md:text-5xl font-['Gilroy'] font-extrabold text-white mb-2">₹ {currentCalcData.loan}</p>
                    <p className="text-base text-[#888888]">80% of total</p>
                  </div>
                  <div className="bg-[#222222] shadow-xl border border-white/5 rounded-2xl p-6 flex flex-col justify-center">
                    <p className="text-[#888888] font-medium mb-1">Equity Invested</p>
                    <p className="text-4xl md:text-5xl font-['Gilroy'] font-extrabold text-white mb-2">₹ {currentCalcData.equity}</p>
                    <p className="text-base text-[#888888]">20% of total</p>
                  </div>
                  <div className="bg-[#222222] shadow-xl border border-white/5 rounded-2xl p-6 flex flex-col justify-center">
                    <p className="text-[#888888] font-medium mb-1">Year 1 ROI</p>
                    <p className="text-4xl md:text-5xl font-['Gilroy'] font-extrabold text-white mb-2">{currentCalcData.year1Roi}</p>
                    <p className="text-base text-[#888888]">Return on investment</p>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="mt-12 overflow-x-auto">
                <h3 className="text-2xl font-extrabold mb-6 text-white">Investment Over The Years</h3>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-4 px-4 font-extrabold text-gray-300">Year</th>
                      <th className="py-4 px-4 font-extrabold text-gray-300">Return On Investment (ROI)</th>
                      <th className="py-4 px-4 font-extrabold text-gray-300">Return On Equity (ROE)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCalcData.table.map((row) => (
                      <tr key={row.year} className="border-b border-white/5 hover:bg-[#222222] shadow-xl transition-colors">
                        <td className="py-4 px-4 text-white font-extrabold">{row.year}</td>
                        <td className="py-4 px-4 text-[#888888] font-extrabold">{row.roi}</td>
                        <td className="py-4 px-4 text-[#888888] font-extrabold">{row.roe}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 relative z-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-[#222222]">How the EV Charging</span>
                <span className="text-[#888888] italic">Franchise Works</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Share Your Interest", desc: "Connect with the DYU team and share details about your location or investment interest. If you don't have a location, we can assist in identifying suitable high-demand sites." },
                { step: "02", title: "Site Evaluation", desc: "The location is evaluated based on EV demand, power availability, and accessibility." },
                { step: "03", title: "Installation and Integration", desc: "Once approved, charging infrastructure is installed and integrated into the DYU network." },
                { step: "04", title: "Go Live", desc: "Your EV charging station becomes active and available to EV users across the DYU platform." }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[#222222] shadow-xl backdrop-blur-md border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:bg-white/10 transition-all"
                >
                  <div className="text-6xl font-black text-white/5 absolute top-4 right-4 group-hover:scale-110 transition-transform">
                    {item.step}
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-6">
                    <span className="text-[#888888] font-extrabold text-xl">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-extrabold mb-4 text-white relative z-10">{item.title}</h3>
                  <p className="text-[#888888] text-base leading-relaxed relative z-10">
                    {item.desc}
                  </p>
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
              <span className="text-[#888888] italic">EV Charging Station?</span>
            </h2>
            <p className="text-[#888888] text-lg mb-12">This opportunity is suitable for</p>

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
                  className="bg-[#222222] shadow-xl border border-white/10 rounded-full px-6 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors cursor-default"
                >
                  <item.icon className="w-5 h-5 text-[#888888]" />
                  <span className="font-medium text-white">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* MODELS & RANGE */}
        <section className="py-20 relative z-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12">
              
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="bg-[#222222] shadow-xl border border-white/5 rounded-3xl p-10">
                  <h3 className="text-[#888888] font-extrabold mb-2">Investment Range</h3>
                  <p className="text-4xl md:text-5xl font-extrabold text-white mb-4">₹30 Lakhs - ₹3 Crores+</p>
                  <p className="text-gray-300">Scalable investment starting from ₹30 lakhs</p>
                </div>
                
                <div className="bg-[#222222] shadow-xl border border-white/10 rounded-3xl p-10">
                  <h3 className="text-xl font-extrabold text-white mb-6">Station Configurations</h3>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {["60 kW", "120 kW", "240 kW", "360 kW"].map(kw => (
                      <span key={kw} className="bg-white/20 text-[#888888] px-4 py-2 rounded-lg font-extrabold border border-[#00F0FF]/20">{kw}</span>
                    ))}
                  </div>
                  <p className="text-[#888888]">Multiple configurations based on your location & usage. Supports 2-20 Parking Bays.</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                  <span className="text-[#222222]">Choose Your EV Charging</span>
                  <span className="text-[#888888] italic">Business Model</span>
                </h2>
                
                <div className="bg-[#222222] shadow-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-extrabold text-white mb-1">FOCO</h3>
                      <p className="text-gray-300 font-medium">Franchise Owned, Company Operated</p>
                    </div>
                    <span className="bg-white/10 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider text-white">Model 01</span>
                  </div>
                  <p className="text-[#888888] mb-6 text-base leading-relaxed">Ideal for investors, MSMEs, and businesses looking to participate in EV infrastructure while leveraging DYU's operational expertise.</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex gap-2 text-base text-gray-300"><CheckCircle2 className="w-5 h-5 text-gray-400 flex-shrink-0" /> Investment ranges from ₹30 Lakhs to ₹3 Crores</li>
                    <li className="flex gap-2 text-base text-gray-300"><CheckCircle2 className="w-5 h-5 text-gray-400 flex-shrink-0" /> DC Fast Charging Stations (60kW - 360kW)</li>
                    <li className="flex gap-2 text-base text-gray-300"><CheckCircle2 className="w-5 h-5 text-gray-400 flex-shrink-0" /> Charger deployment & technology by DYU</li>
                  </ul>
                  <button className="w-full py-3 bg-white hover:bg-gray-200 text-[#222222] rounded-xl font-extrabold transition-colors">Enquire Now</button>
                </div>

                <div className="bg-[#222222] shadow-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-extrabold text-white mb-1">Direct</h3>
                      <p className="text-gray-300 font-medium">Outright Purchase</p>
                    </div>
                    <span className="bg-white/10 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider text-white">Model 02</span>
                  </div>
                  <p className="text-[#888888] mb-6 text-base leading-relaxed">Best for hotels, fleet operators, commercial properties that want complete ownership and control of their charging infrastructure.</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex gap-2 text-base text-gray-300"><CheckCircle2 className="w-5 h-5 text-gray-400 flex-shrink-0" /> Complete ownership of the charger</li>
                    <li className="flex gap-2 text-base text-gray-300"><CheckCircle2 className="w-5 h-5 text-gray-400 flex-shrink-0" /> No recurring AMC or SaaS (optional)</li>
                    <li className="flex gap-2 text-base text-gray-300"><CheckCircle2 className="w-5 h-5 text-gray-400 flex-shrink-0" /> Flexible pricing, operations, and billing</li>
                  </ul>
                  <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-extrabold transition-colors border border-white/10">Enquire Now</button>
                </div>

              </motion.div>

            </div>
          </div>
        </section>

        {/* FAQS */}
        <section className="py-20 relative z-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-[#222222]">Frequently Asked</span>
                <span className="text-[#888888] italic">Questions</span>
              </h2>
              <p className="text-[#666666] text-lg font-medium">Have Questions About Starting an EV Charging Station?</p>
            </div>

            <div className="space-y-2">
              <FAQItem 
                question="How much can I realistically earn from an EV charging station?" 
                answer={
                  <div className="space-y-2">
                    <p>It depends on three main factors:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Location demand</li>
                      <li>Charger capacity (60kW vs 240kW+)</li>
                      <li>Daily usage (number of sessions)</li>
                    </ul>
                    <p>In high-traffic locations, revenue tends to grow as EV adoption increases. Returns may feel slow at the beginning, but improve over time with higher utilization.</p>
                  </div>
                } 
              />
              <FAQItem 
                question="What is the cost and investment required to start an EV charging station franchise in India?" 
                answer="The investment starts from ₹30 Lakhs and can go up to ₹3 Crores+, depending on the number of parking bays and the charger capacity (60kW to 360kW) you choose to install." 
              />
              <FAQItem 
                question="How do I actually start an EV charging station franchise?" 
                answer="Simply share your interest with our team. We will evaluate your site for EV demand and power availability, install the infrastructure, and integrate it with our network to go live." 
              />
              <FAQItem 
                question="How does the EV charging business model work?" 
                answer="Under the FOCO model, you invest in the physical infrastructure and earn revenue from charging sessions, while DYU handles the installation, software network, and maintenance." 
              />
              <FAQItem 
                question="Which is the best EV charging station franchise in India?" 
                answer="With high ROI, complete turnkey setup, 24/7 technical support, and an advanced technology ecosystem, DYU is rapidly emerging as the premier choice for EV charging franchises." 
              />
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
