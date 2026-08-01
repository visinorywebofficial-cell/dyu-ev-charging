'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollTimeline, TimelineEvent } from '@/components/ui/scroll-timeline';
import { Zap, Radio, Smartphone, Globe, TrendingUp } from 'lucide-react';

const dyuJourneyEvents: TimelineEvent[] = [
  {
    date: "Phase 01",
    title: "DYU Founded",
    subtitle: "Company Origin",
    description: "Launched with a mission to build India's largest and most accessible ultra-fast EV charging infrastructure.",
    icon: <Zap className="w-4 h-4 text-[#005F73]" />
  },
  {
    date: "Phase 02",
    title: "First Charging Stations Live",
    subtitle: "Network Rollout",
    description: "Deployed our first wave of high-speed AC & DC fast chargers across key urban hubs and highway corridors.",
    icon: <Radio className="w-4 h-4 text-[#005F73]" />
  },
  {
    date: "Phase 03",
    title: "App & CSMS Platform Launch",
    subtitle: "Software Ecosystem",
    description: "Rolled out the unified DYU mobile app and enterprise CSMS cloud platform for real-time station management.",
    icon: <Smartphone className="w-4 h-4 text-[#005F73]" />
  },
  {
    date: "Phase 04",
    title: "Nationwide Expansion",
    subtitle: "Rapid Scaling",
    description: "Accelerated network rollout into 25+ cities through strategic CPO, eMSP, and franchise partnerships.",
    icon: <Globe className="w-4 h-4 text-[#005F73]" />
  },
  {
    date: "Future Horizon",
    title: "10,000+ Chargers Vision",
    subtitle: "Future Scale",
    description: "Targeting over 10,000 active charging points to establish India's most ubiquitous green charging backbone.",
    icon: <TrendingUp className="w-4 h-4 text-[#005F73]" />
  }
];

export default function AboutUsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FBFC] text-[#1F2933] font-['Inter'] pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="flex flex-col gap-1 mb-6 tracking-tighter" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
            <span className="text-[#1F2933] font-extrabold">Driving the future</span>
            <span className="text-[#52606D] font-bold">of mobility</span>
          </h1>
          <p className="text-xl md:text-2xl font-medium text-[#52606D] leading-relaxed">
            Discover how DYU is building India's largest, most reliable green energy charging network.
          </p>
        </motion.div>

        {/* Content Cards Stack */}
        <div className="space-y-10 mb-24">
          
          {/* Card 1: Our Vision */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#002B36] text-[#F8FBFC] p-8 md:p-12 rounded-[2rem] shadow-xl"
          >
            <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Plus_Jakarta_Sans'] font-extrabold tracking-tighter leading-[1.1]">
              <span className="block text-white font-extrabold">Our vision</span>
              <span className="block text-[#94D2BD] font-bold">for a sustainable future</span>
            </h2>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed font-medium">
              To make EV charging as accessible and effortless as grabbing a cup of coffee. We believe in a sustainable future where range anxiety is a thing of the past. 
              By deploying smart, reliable, and ultra-fast charging stations across the country, we are paving the way for mass EV adoption.
            </p>
          </motion.div>

          {/* Card 2: Smart Hardware */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white border border-[#DDE6EA] p-8 md:p-12 rounded-[2rem] shadow-xl text-[#1F2933]"
          >
            <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Plus_Jakarta_Sans'] font-extrabold tracking-tighter leading-[1.1]">
              <span className="block text-[#1F2933] font-extrabold">Smart hardware</span>
              <span className="block text-[#005F73] font-bold">connected to the cloud</span>
            </h2>
            <p className="text-lg md:text-xl text-[#52606D] leading-relaxed font-medium">
              Our charging stations aren't just plugs; they are intelligent nodes connected to a robust cloud infrastructure. 
              Featuring real-time diagnostics, seamless payment integrations, and dynamic load balancing, our hardware ensures a premium experience every single time you plug in.
            </p>
          </motion.div>

          {/* Card 3: Largest Network */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#002B36] text-[#F8FBFC] p-8 md:p-12 rounded-[2rem] shadow-xl"
          >
            <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Plus_Jakarta_Sans'] font-extrabold tracking-tighter leading-[1.1]">
              <span className="block text-white font-extrabold">The largest network</span>
              <span className="block text-[#94D2BD] font-bold">always within reach</span>
            </h2>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed font-medium">
              With over 10,000 active charging points and growing, we are building the most expansive and reliable EV charging network in the country.
              Whether you are on a daily commute or a cross-country road trip, our chargers are always within your reach.
            </p>
          </motion.div>

        </div>

        {/* Company Journey & Timeline Section */}
        <section className="pt-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-extrabold bg-[#005F73]/10 text-[#005F73] border border-[#005F73]/20 uppercase tracking-widest mb-4 font-['Plus_Jakarta_Sans']">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#1F2933] font-['Plus_Jakarta_Sans'] tracking-tight mb-4">
              Building the Future from Day One
            </h2>
            <p className="text-lg text-[#52606D] font-['Inter']">
              Follow DYU's journey milestones as we scale green energy charging across India.
            </p>
          </motion.div>

          <ScrollTimeline 
            events={dyuJourneyEvents}
            cardAlignment="alternating"
            revealAnimation="fade"
            cardVariant="elevated"
            progressIndicator={true}
            dateFormat="badge"
          />
        </section>

      </div>
    </div>
  );
}
