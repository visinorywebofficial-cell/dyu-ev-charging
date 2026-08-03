"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  Wind,
  Droplet,
  CircleDollarSign,
  TreePine,
  Zap,
  MessageCircle,
  MapPin,
  Users,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { ImageTrail } from "../../components/ImageTrail";

export default function EVCalculatorPage() {
  const [dailyKm, setDailyKm] = useState<number>(50);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);

  const annualKm = dailyKm * daysPerWeek * 52;
  const co2Prevented = (annualKm * 0.12).toFixed(0); 
  const moneySaved = (annualKm * 8).toLocaleString("en-IN"); 
  const treesAbsorbed = Math.round(Number(co2Prevented) / 21);

  return (
    <div className="min-h-screen relative font-['Figtree'] bg-white text-[#222222]">
      
      
      {/* Dark background only - no video */}

      <main className="pb-20 relative z-10">
        
        {/* HERO SECTION */}
        <section className="min-h-[50vh] flex items-center justify-center relative z-10 pt-[8.5rem] pb-16 overflow-hidden">
          
          <div className="container mx-auto px-4 text-center relative z-10">
            
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/30 mb-8 shadow-sm"
              style={{ fontFamily: 'var(--font-figtree)' }}
            >
              <span className="text-base font-extrabold text-white" style={{ fontFamily: 'Figtree, sans-serif' }}>Real-Time Environmental Savings</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-col gap-1 mb-6 tracking-tighter"
              style={{ fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}
            >
              <span className="!text-white">Your Charge.</span>
              <span className="!text-white font-bold">Your Climate Impact.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl font-bold !text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              You didn't just power your EV - you powered a cleaner planet. Join the revolution that's transforming India's roads.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-black/60 shadow-2xl backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-2xl mx-auto mt-12"
            >
              <p className="!text-white font-extrabold text-lg mb-6 tracking-wider uppercase">Average Monthly Impact</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-4xl md:text-5xl font-extrabold !text-white mb-2">8,005 kg</p>
                  <p className="!text-white/80 text-lg font-medium">CO2 Prevented Monthly</p>
                </div>
                <div>
                  <p className="text-4xl md:text-5xl font-extrabold !text-white mb-2">33,759</p>
                  <p className="!text-white/80 text-lg font-medium">Charging Sessions</p>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* WHY IT MATTERS SECTION */}
        <section className="py-20 relative z-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="flex flex-col gap-1 mb-8 text-3xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1] relative z-10">
                <span className="text-[#222222]">Start Making</span>
                <span className="text-[#888888] font-bold">a Difference Today</span>
              </h2>
              <p className="text-xl text-[#666666] font-bold">Real facts behind switching to an EV</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-[#222222] shadow-xl backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-10 text-white text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                  <Droplet size={32} />
                </div>
                <p className="text-3xl font-extrabold mb-3">2.3 kg</p>
                <p className="text-[#888888] text-lg leading-relaxed">1 litre of petrol = ~2.3 kg of CO2</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-[#222222] shadow-xl backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-10 text-white text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                  <Wind size={32} />
                </div>
                <p className="text-3xl font-extrabold mb-3">70%</p>
                <p className="text-[#888888] text-lg leading-relaxed">EVs cut emissions by up to 70%</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="bg-[#222222] shadow-xl backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-10 text-white text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                  <Leaf size={32} />
                </div>
                <p className="text-3xl font-extrabold mb-3">4-6 tons</p>
                <p className="text-[#888888] text-lg leading-relaxed">CO2 avoided per year driving electric</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE CALCULATOR SECTION */}
        <section className="py-24 relative z-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="flex flex-col gap-1 mb-6 text-4xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-[#222222]">Calculate Your</span>
                <span className="text-[#888888] font-bold">Impact</span>
              </h2>
              <p className="text-xl text-[#666666] font-bold">Move the sliders to describe your commute.</p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
              
              {/* Controls */}
              <div className="bg-[#002B36] shadow-xl backdrop-blur-lg border border-[#005F73]/30 rounded-3xl p-8 md:p-12 text-white">
                <h3 className="text-3xl font-extrabold mb-2 flex items-center gap-3 text-white font-['Gilroy']">
                  <Zap className="text-white w-8 h-8" />
                  Your Driving Habits
                </h3>
                <p className="text-white/80 text-lg mb-12 font-medium">Tell us about your daily commute</p>
                
                <div className="space-y-12">
                  <div>
                    <div className="flex justify-between mb-4">
                      <label className="text-xl font-bold text-white">Daily Kilometers</label>
                      <span className="text-white font-extrabold text-2xl">{dailyKm} km</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="200"
                      step="1"
                      value={dailyKm}
                      onChange={(e) => setDailyKm(Number(e.target.value))}
                      className="w-full h-3 bg-white/20 rounded-full appearance-none cursor-pointer accent-white"
                    />
                    <div className="flex justify-between text-base text-white/80 font-semibold mt-3">
                      <span>10 km</span>
                      <span>200 km</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-4">
                      <label className="text-xl font-bold text-white">Days per Week</label>
                      <span className="text-white font-extrabold text-2xl">{daysPerWeek} days</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="7"
                      step="1"
                      value={daysPerWeek}
                      onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                      className="w-full h-3 bg-white/20 rounded-full appearance-none cursor-pointer accent-white"
                    />
                    <div className="flex justify-between text-base text-white/80 font-semibold mt-3">
                      <span>1 day</span>
                      <span>7 days</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-14 pt-8 border-t border-white/20">
                  <p className="text-white/80 text-lg font-bold mb-2">Total Kilometers per year</p>
                  <p className="text-4xl md:text-5xl font-extrabold text-white">{annualKm.toLocaleString()}</p>
                </div>
              </div>
              
              {/* Results */}
              <div className="space-y-6 flex flex-col justify-center">
                <div className="bg-white shadow-xl backdrop-blur-lg rounded-3xl p-8 md:p-10 flex items-center gap-8 border border-gray-200">
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-[#222222] shrink-0">
                    <Wind size={40} />
                  </div>
                  <div>
                    <p className="text-4xl md:text-5xl font-extrabold text-[#222222] mb-2">{Number(co2Prevented).toLocaleString()} kg</p>
                    <p className="text-[#666666] font-bold text-lg">CO2 Emissions Prevented</p>
                  </div>
                </div>
                
                <div className="bg-white shadow-xl backdrop-blur-lg rounded-3xl p-8 md:p-10 flex items-center gap-8 border border-gray-200">
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-[#222222] shrink-0">
                    <CircleDollarSign size={40} />
                  </div>
                  <div>
                    <p className="text-4xl md:text-5xl font-extrabold text-[#222222] mb-2">₹{moneySaved}</p>
                    <p className="text-[#666666] font-bold text-lg">Money Saved Annually</p>
                  </div>
                </div>
                
                <div className="bg-white shadow-xl backdrop-blur-lg rounded-3xl p-8 md:p-10 flex items-center gap-8 border border-gray-200">
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-[#222222] shrink-0">
                    <TreePine size={40} />
                  </div>
                  <div>
                    <p className="text-4xl md:text-5xl font-extrabold text-[#222222] mb-2">{treesAbsorbed}</p>
                    <p className="text-[#666666] font-bold text-lg">Trees Worth of CO2 Absorption</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* MOVEMENT SECTION */}
        <section className="py-20 relative z-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="flex flex-col gap-1 mb-6 text-4xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-[#222222]">Keep the Movement</span>
                <span className="text-[#888888] italic">Going</span>
              </h2>
              <p className="text-xl text-[#666666] font-bold max-w-2xl mx-auto">Small actions after every charge can grow your impact even more.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white shadow-lg rounded-3xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between">
                <div className="mb-6 h-16 w-full flex items-center justify-start">
                  <img src="/images/3d-icon-ev-charging.png" alt="Choose EV charging" className="w-16 h-16 object-contain border-0 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold mb-3 text-[#222222] tracking-tight">Choose EV charging</h3>
                  <p className="text-[#666666] font-medium leading-relaxed">Every charge is a vote for cleaner air and a sustainable future.</p>
                </div>
              </div>
              <div className="bg-white shadow-lg rounded-3xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between">
                <div className="mb-6 h-16 w-full flex items-center justify-start">
                  <img src="/images/3d-icon-talk.png" alt="Talk about it" className="w-16 h-16 object-contain border-0 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold mb-3 text-[#222222] tracking-tight">Talk about it</h3>
                  <p className="text-[#666666] font-medium leading-relaxed">Your experiences inspire friends and family to make the switch.</p>
                </div>
              </div>
              <div className="bg-white shadow-lg rounded-3xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between">
                <div className="mb-6 h-16 w-full flex items-center justify-start">
                  <img src="/images/3d-icon-routes.png" alt="Cleaner routes" className="w-16 h-16 object-contain border-0 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold mb-3 text-[#222222] tracking-tight">Cleaner routes</h3>
                  <p className="text-[#666666] font-medium leading-relaxed">Choose charging stations powered by renewable energy.</p>
                </div>
              </div>
              <div className="bg-white shadow-lg rounded-3xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between">
                <div className="mb-6 h-16 w-full flex items-center justify-start">
                  <img src="/images/3d-icon-community.png" alt="Be part of shift" className="w-16 h-16 object-contain border-0 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold mb-3 text-[#222222] tracking-tight">Be part of shift</h3>
                  <p className="text-[#666666] font-medium leading-relaxed">Join millions of Indians driving towards carbon neutrality.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 relative z-20">
          <div className="container mx-auto px-4 text-center max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#222222] shadow-2xl backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 md:p-20"
            >
              <h2 className="flex flex-col gap-2 mb-8 text-3xl md:text-5xl font-extrabold tracking-tighter leading-tight">
                <span className="text-white">The next time you plug in, remember -</span>
                <span className="text-[#888888] italic text-2xl md:text-4xl mt-2">you're not just charging a vehicle.</span>
                <span className="text-white text-4xl md:text-6xl mt-4">You're changing the game.</span>
              </h2>
              
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12">
                Join thousands of Indians who choose clean energy every day. Every charge matters. Every journey counts.
              </p>
              
              <div className="flex justify-center">
                <Link href="/dc-chargers" className="btn-primary flex items-center gap-2 text-lg">
                  View Our Chargers <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-20 mt-20 pt-16 border-t border-white/10">
                <div>
                  <p className="text-4xl md:text-5xl font-extrabold text-white mb-3">50,000+</p>
                  <p className="text-[#888888] font-bold uppercase tracking-widest text-sm">Happy EV Drivers</p>
                </div>
                <div>
                  <p className="text-4xl md:text-5xl font-extrabold text-white mb-3">8,000+</p>
                  <p className="text-[#888888] font-bold uppercase tracking-widest text-sm">Charging Stations</p>
                </div>
                <div>
                  <p className="text-4xl md:text-5xl font-extrabold text-white mb-3">500+</p>
                  <p className="text-[#888888] font-bold uppercase tracking-widest text-sm">Charging Locations</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>



      </main>
    </div>
  );
}
