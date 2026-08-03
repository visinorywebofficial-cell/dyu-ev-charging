"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { 
  ArrowRight,
  Smartphone,
  MapPin,
  CreditCard,
  Headset,
  Building2,
  TrendingUp,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Download,
  PlugZap,
  Star,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import StickerPeeling from "@/components/ui/sticker-peeling";

const STICKER_BADGE_IMAGE = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'><rect width='200' height='200' rx='40' fill='%23005F73'/><circle cx='100' cy='85' r='45' fill='%2300F0FF'/><path d='M95 55 L85 90 L102 90 L90 120 L115 80 L98 80 Z' fill='%23222222'/><text x='100' y='160' font-family='sans-serif' font-size='22' font-weight='900' fill='%23FFFFFF' text-anchor='middle'>DYU EV</text></svg>";

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

export default function EvChargingAppPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="min-h-screen relative font-['Figtree'] bg-white text-[#222222]">
      {/* Dark background only - no video */}

      <main className="pt-24 pb-20 relative z-10">
        
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
              <span className="text-base font-extrabold text-[#222222]" style={{ fontFamily: 'Figtree, sans-serif' }}>Discover • Charge • Pay</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-col gap-1 mb-6 tracking-tighter"
              style={{ fontFamily: '"Gilroy", sans-serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}
            >
              <span className="text-[#222222]">India's Best</span>
              <span className="text-[#888888] font-bold">EV Charging App</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl font-bold text-[#666666] max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              Find nearby EV charging stations, plan routes, pay seamlessly, and charge with confidence using DYU.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center flex-wrap gap-4 mb-16"
            >
              <button className="px-8 py-4 bg-[#222222] hover:bg-black text-white rounded-xl font-extrabold text-lg transition-all shadow-[0_0_20px_rgba(34,34,34,0.4)] flex items-center gap-2">
                Download App <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              <div className="bg-white/70 backdrop-blur-sm border border-[#222222]/10 p-6 rounded-2xl shadow-md transition-all hover:shadow-xl hover:-translate-y-1">
                <h3 className="text-4xl font-black text-[#222222] mb-2 font-['Gilroy']">12M+</h3>
                <p className="text-[#666666] font-medium">Charging Sessions</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm border border-[#222222]/10 p-6 rounded-2xl shadow-md transition-all hover:shadow-xl hover:-translate-y-1">
                <h3 className="text-4xl font-black text-[#222222] mb-2 font-['Gilroy']">6000+</h3>
                <p className="text-[#666666] font-medium">EVs Charged Daily</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm border border-[#222222]/10 p-6 rounded-2xl shadow-md flex flex-col justify-center transition-all hover:shadow-xl hover:-translate-y-1">
                <h3 className="text-4xl font-black text-[#222222] mb-2 font-['Gilroy'] flex items-center justify-center gap-2">4.8 <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" /></h3>
                <p className="text-[#666666] font-medium">Rated By EV Drivers</p>
              </div>
            </motion.div>

          </div>
        </section>

        {/* APP VISUALS SECTION */}
        <section className="py-20 relative z-20 border-t border-black/5">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-5xl font-['Gilroy'] font-extrabold tracking-normal leading-[1.2]" style={{ letterSpacing: '0em' }}>
                <span className="text-[#222222]">Why Choose</span>
                <span className="text-[#888888] italic">DYU App?</span>
              </h2>
              <p className="text-xl text-[#666666] font-medium max-w-2xl mx-auto">
                Everything you need for a seamless EV experience. Touch or hover to peel the app screens in 3D!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center justify-items-center">
              <div className="flex flex-col items-center text-center group cursor-pointer">
                <div className="mb-6 transition-transform duration-500 group-hover:scale-105 flex justify-center">
                  <StickerPeeling 
                    image="/images/app-step-1.jpg" 
                    imageWidth={260} 
                    imageHeight={340} 
                    hoverPeel={45} 
                    pressPeel={65} 
                    curlRotation={240} 
                    backColor="#222222" 
                  />
                </div>
                <h3 className="text-2xl font-extrabold mb-3 font-['Gilroy'] text-[#222222]">Locate & Route</h3>
                <p className="text-[#666666] font-medium leading-relaxed">Easily find available chargers near you and plan your journey with optimal charging stops.</p>
              </div>
              <div className="flex flex-col items-center text-center group cursor-pointer">
                <div className="mb-6 transition-transform duration-500 group-hover:scale-105 flex justify-center">
                  <StickerPeeling 
                    image="/images/app-step-2.jpg" 
                    imageWidth={260} 
                    imageHeight={340} 
                    hoverPeel={45} 
                    pressPeel={65} 
                    curlRotation={240} 
                    backColor="#222222" 
                  />
                </div>
                <h3 className="text-2xl font-extrabold mb-3 font-['Gilroy'] text-[#222222]">Connect & Charge</h3>
                <p className="text-[#666666] font-medium leading-relaxed">Scan the QR code or use the app to start your charging session instantly without any hassle.</p>
              </div>
              <div className="flex flex-col items-center text-center group cursor-pointer">
                <div className="mb-6 transition-transform duration-500 group-hover:scale-105 flex justify-center">
                  <StickerPeeling 
                    image="/images/app-step-3.jpg" 
                    imageWidth={260} 
                    imageHeight={340} 
                    hoverPeel={45} 
                    pressPeel={65} 
                    curlRotation={240} 
                    backColor="#222222" 
                  />
                </div>
                <h3 className="text-2xl font-extrabold mb-3 font-['Gilroy'] text-[#222222]">Pay & Go</h3>
                <p className="text-[#666666] font-medium leading-relaxed">Seamless automated payments from your DYU wallet so you can get back on the road faster.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ADVANCED FEATURES SECTION */}
        <section className="py-20 relative z-20 border-t border-black/5">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-5xl font-['Gilroy'] font-extrabold tracking-normal leading-[1.2]" style={{ letterSpacing: '0em' }}>
                <span className="text-[#222222]">Advanced Features for</span>
                <span className="text-[#888888] italic">effortless EV charging.</span>
              </h2>
              <p className="text-xl text-[#666666] max-w-2xl mx-auto font-medium">
                Smart charging solutions that move you forward.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#002B36] p-8 rounded-3xl text-white shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:border-[#00F0FF]/40 transition-all duration-300 border border-white/10 relative group overflow-hidden">
                <div className="w-20 h-20 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <img src="/images/icons/location-pin-3d.png" alt="Location Pin 3D" className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-['Gilroy'] text-white" style={{ letterSpacing: '0em' }}>Find Nearby EV Chargers Instantly</h3>
                <p className="text-gray-200 leading-relaxed">Locate the nearest active EV charging stations in real time with live availability.</p>
              </div>
              <div className="bg-[#002B36] p-8 rounded-3xl text-white shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:border-[#00F0FF]/40 transition-all duration-300 border border-white/10 relative group overflow-hidden">
                <div className="w-20 h-20 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <img src="/images/icons/route-mobile-3d.png" alt="Route Mobile 3D" className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-['Gilroy'] text-white" style={{ letterSpacing: '0em' }}>Smart Route Planner with Charging Stops</h3>
                <p className="text-gray-200 leading-relaxed">Plan city and highway trips with built-in EV stops for stress-free travel.</p>
              </div>
              <div className="bg-[#002B36] p-8 rounded-3xl text-white shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:border-[#00F0FF]/40 transition-all duration-300 border border-white/10 relative group overflow-hidden">
                <div className="w-20 h-20 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <img src="/images/icons/wallet-payment-3d.png" alt="Wallet Payment 3D" className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-['Gilroy'] text-white" style={{ letterSpacing: '0em' }}>Secure Wallet & Seamless Payments</h3>
                <p className="text-gray-200 leading-relaxed">Recharge your wallet, make instant EV charging payments, and track spending in one place.</p>
              </div>
              <div className="bg-[#002B36] p-8 rounded-3xl text-white shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:border-[#00F0FF]/40 transition-all duration-300 border border-white/10 relative group overflow-hidden">
                <div className="w-20 h-20 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <img src="/images/icons/support-headset-3d.png" alt="Support Headset 3D" className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-['Gilroy'] text-white" style={{ letterSpacing: '0em' }}>24x7 Support & Real-Time Alerts</h3>
                <p className="text-gray-200 leading-relaxed">Get round-the-clock customer support, charging updates, and important alerts.</p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE SECTION */}
        <section className="py-20 relative z-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-[#222222]">Built for EV Drivers,</span>
                <span className="text-[#888888] italic">by EV Drivers</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/60 p-8 rounded-3xl border border-[#222222]/10 shadow-sm backdrop-blur-md">
                <Building2 className="w-10 h-10 text-[#00F0FF] mb-6" />
                <h3 className="text-xl font-extrabold text-[#222222] mb-3 font-['Gilroy']">10000+ Charging Stations</h3>
                <p className="text-[#666666]">One of India's fastest-growing EV charging networks, offering reliable charging in cities and on highways.</p>
              </div>
              <div className="bg-white/60 p-8 rounded-3xl border border-[#222222]/10 shadow-sm backdrop-blur-md">
                <TrendingUp className="w-10 h-10 text-[#00F0FF] mb-6" />
                <h3 className="text-xl font-extrabold text-[#222222] mb-3 font-['Gilroy']">High Uptime Network</h3>
                <p className="text-[#666666]">Chargers are continuously monitored to maintain reliability and reduce failed or interrupted sessions.</p>
              </div>
              <div className="bg-white/60 p-8 rounded-3xl border border-[#222222]/10 shadow-sm backdrop-blur-md">
                <Zap className="w-10 h-10 text-[#00F0FF] mb-6" />
                <h3 className="text-xl font-extrabold text-[#222222] mb-3 font-['Gilroy']">Nationwide DC Fast Charging</h3>
                <p className="text-[#666666]">Access fast chargers across cities and highways, ideal for long-distance EV travel.</p>
              </div>
              <div className="bg-white/60 p-8 rounded-3xl border border-[#222222]/10 shadow-sm backdrop-blur-md md:col-span-2">
                <ShieldCheck className="w-10 h-10 text-[#00F0FF] mb-6" />
                <h3 className="text-xl font-extrabold text-[#222222] mb-3 font-['Gilroy']">DYU Flux - Uninterrupted Charging</h3>
                <p className="text-[#666666]">Avoid slow charging caused by power sharing. Flux blocks shared power during your session, ensuring consistent charging speed from start to finish.</p>
              </div>
              <div className="bg-white/60 p-8 rounded-3xl border border-[#222222]/10 shadow-sm backdrop-blur-md">
                <CheckCircle2 className="w-10 h-10 text-[#00F0FF] mb-6" />
                <h3 className="text-xl font-extrabold text-[#222222] mb-3 font-['Gilroy']">Backed by Trusted Partners</h3>
                <p className="text-[#666666]">Charging available at partner locations including malls, corporate hubs, and key destinations across India.</p>
              </div>
            </div>
          </div>
        </section>

        {/* THREE EASY STEPS */}
        <section className="py-20 bg-[#222222] text-white relative z-20 overflow-hidden">
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                  <span className="text-[#222222]">Charge with the</span>
                  <span className="text-[#888888] italic">DYU App</span>
                </h2>
                <p className="text-gray-400 text-lg mb-12">
                  Real-time availability. Smart routing. Easy payments. Full control.
                </p>
                <h3 className="text-2xl font-bold mb-8 font-['Gilroy'] text-white">Three Easy Steps</h3>
                
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-xl flex-shrink-0">1</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Download & Sign Up</h4>
                      <p className="text-gray-400">Quick onboarding in minutes</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-xl flex-shrink-0">2</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Find a Charger Near You</h4>
                      <p className="text-gray-400">Search, filter & navigate easily</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-xl flex-shrink-0">3</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Plug, Play & Go</h4>
                      <p className="text-gray-400">Charge smoothly and continue your journey</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-12 flex-wrap">
                  <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-bold transition-all flex items-center gap-3">
                    <Download className="w-5 h-5" /> App Store
                  </button>
                  <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-bold transition-all flex items-center gap-3">
                    <Download className="w-5 h-5" /> Google Play
                  </button>
                </div>
              </div>

              <div className="relative flex justify-center">
                <div className="w-full max-w-[300px] aspect-[1/2] rounded-[2.5rem] border-[8px] border-white/10 bg-[#111111] shadow-2xl relative overflow-hidden flex items-center justify-center">
                  <div className="absolute top-0 inset-x-0 h-6 flex justify-center pt-2">
                    <div className="w-16 h-4 bg-black rounded-full" />
                  </div>
                  <PlugZap className="w-20 h-20 text-white/20" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#00F0FF]/20 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-20 relative z-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="flex flex-col gap-1 mb-12 text-3xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1] text-center">
              <span className="text-[#222222]">What Our</span>
              <span className="text-[#888888] italic">Users Say</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border border-[#222222]/10 p-8 rounded-3xl shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-[#222222] font-bold text-xl">R</div>
                  <div>
                    <h4 className="font-extrabold text-[#222222]">Rajeshbabu Dodda</h4>
                    <p className="text-sm text-[#888888] font-medium">Gurugram</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4 text-yellow-500">
                  <Star className="w-4 h-4 fill-yellow-500" /><Star className="w-4 h-4 fill-yellow-500" /><Star className="w-4 h-4 fill-yellow-500" /><Star className="w-4 h-4 fill-yellow-500" /><Star className="w-4 h-4 fill-yellow-500" />
                </div>
                <p className="text-[#666666]">Best charging network in India. The app is easy to use, and the interface is good. The prices are low, and the machines are reliable.</p>
              </div>
              <div className="bg-white border border-[#222222]/10 p-8 rounded-3xl shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-[#222222] font-bold text-xl">S</div>
                  <div>
                    <h4 className="font-extrabold text-[#222222]">Sohan Patel</h4>
                    <p className="text-sm text-[#888888] font-medium">Jaipur</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4 text-yellow-500">
                  <Star className="w-4 h-4 fill-yellow-500" /><Star className="w-4 h-4 fill-yellow-500" /><Star className="w-4 h-4 fill-yellow-500" /><Star className="w-4 h-4 fill-yellow-500" /><Star className="w-4 h-4 fill-yellow-500" />
                </div>
                <p className="text-[#666666]">DYU is the best charging company... The best thing about their charger is that it immediately starts charging without any hassle.</p>
              </div>
              <div className="bg-white border border-[#222222]/10 p-8 rounded-3xl shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-[#222222] font-bold text-xl">M</div>
                  <div>
                    <h4 className="font-extrabold text-[#222222]">Manish Saran</h4>
                    <p className="text-sm text-[#888888] font-medium">Delhi</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4 text-yellow-500">
                  <Star className="w-4 h-4 fill-yellow-500" /><Star className="w-4 h-4 fill-yellow-500" /><Star className="w-4 h-4 fill-yellow-500" /><Star className="w-4 h-4 fill-yellow-500" /><Star className="w-4 h-4 fill-yellow-500" />
                </div>
                <p className="text-[#666666]">One of the most trusted charging apps and station networks I've used! Reliable, user-friendly interface with accurate station availability and real-time updates.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FUTURE CTA */}
        <section className="py-20 relative z-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="flex flex-col gap-1 mb-10 text-4xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
              <span className="text-[#222222]">Ready to</span>
              <span className="text-[#888888] italic">Drive Smart?</span>
            </h2>
            <div className="flex justify-center flex-wrap gap-4">
              <button className="px-8 py-4 bg-[#222222] hover:bg-black text-white rounded-xl font-extrabold text-lg transition-all shadow-[0_0_20px_rgba(34,34,34,0.4)] flex items-center gap-2">
                Download on App Store
              </button>
              <button className="px-8 py-4 bg-[#222222] hover:bg-black text-white rounded-xl font-extrabold text-lg transition-all shadow-[0_0_20px_rgba(34,34,34,0.4)] flex items-center gap-2">
                Get it on Google Play
              </button>
            </div>
          </div>
        </section>

        {/* FAQS */}
        <section className="py-20 relative z-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-[#222222]">Got questions about</span>
                <span className="text-[#888888] italic">the DYU App?</span>
              </h2>
            </div>

            <div className="space-y-2">
              <FAQItem 
                question="Which is the best EV charging app in India?" 
                answer="The best EV charging app is one that helps you easily find, access, and pay for charging without confusion. The DYU App offers a large network of charging stations across India, along with real-time availability, route planning, and seamless payments, making it suitable for daily EV use." 
              />
              <FAQItem 
                question="Do you need an app to charge your EV?" 
                answer="Yes, having an EV charging app like DYU makes the process much more convenient. It allows you to find nearby chargers, check their availability, plan routes, and pay for the charging session directly from your phone." 
              />
              <FAQItem 
                question="How do I find a fast EV charging station near me?" 
                answer="You can use the DYU App to locate fast EV charging stations near your location. Simply open the app, and the map will show you available fast chargers along with their current status and charging speeds." 
              />
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
