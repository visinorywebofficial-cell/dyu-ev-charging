"use client";

import { Navbar } from "@/components/Navbar";
import { ScrollRevealSection } from "@/components/ac-charger/ScrollRevealSection";
import { motion, Variants } from "framer-motion";

const wordRevealVariant: Variants = {
  hidden: { y: "120%" },
  visible: (i: number) => ({
    y: "0%",
    transition: {
      delay: i * 0.05,
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    }
  })
};

function SplitText({ text, startIndex = 0, color = 'inherit' }: { text: string, startIndex?: number, color?: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-flex', overflow: 'hidden', marginRight: '0.25em', verticalAlign: 'bottom', paddingBottom: '0.1em', marginBottom: '-0.1em' }}>
          <motion.span
            custom={startIndex + i}
            variants={wordRevealVariant}
            style={{ display: 'inline-block', transformOrigin: 'bottom', color }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </>
  );
}

export default function ACChargersPage() {
  return (
    <div className="min-h-screen bg-[#F1EFE1] text-[#222222] font-['Figtree'] selection:bg-[#00F0FF] selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <main className="pt-24 md:pt-32 pb-12 md:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-4xl mx-auto mb-12 md:mb-20"
            initial="hidden"
            animate="visible"
          >
            <h1 className="flex flex-col gap-1 mb-6 tracking-tighter" style={{ fontFamily: '"Gilroy", sans-serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              <span className="text-[#222222]">Powering Your Drive</span>
              <span className="text-[#888888] italic">With True AC Energy</span>
            </h1>
            <motion.p 
              style={{
                fontFamily: 'var(--font-figtree), sans-serif',
                fontSize: 'clamp(16px, 2vw, 18px)',
                color: 'rgba(0,0,0,0.6)',
                maxWidth: '600px',
                margin: '0 auto 24px',
                lineHeight: 1.6,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              Smart, reliable, and premium EV charging solutions designed for homes, workplaces, and commercial spaces.
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll Reveal Sections */}
        <div className="space-y-0">
          <ScrollRevealSection
            imageSrc="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1200&auto=format&fit=crop"
            imageAlt="DYU 7.4 kW Home AC Charger"
            title={
              <div className="flex flex-col">
                <span className="text-[#222222]">DYU</span>
                <span className="text-[#888888] italic">AC 7.4 kW</span>
              </div>
            }
            description="Perfect for residential and light commercial use. Wake up every morning to a fully charged vehicle."
            features={[
              { title: "Smart Connectivity", desc: "Wi-Fi & Bluetooth built-in. Monitor and schedule charging sessions directly from your smartphone." },
              { title: "Sleek & Compact", desc: "Designed to blend seamlessly into your home garage or driveway with a minimal footprint." },
              { title: "Weatherproof", desc: "IP65 rated enclosure ensures your charger works flawlessly in heavy rain or extreme heat." }
            ]}
            reverse={false}
          />

          <ScrollRevealSection
            imageSrc="/images/ev-2.jpg"
            imageAlt="DYU 22 kW Commercial AC Charger"
            title={
              <div className="flex flex-col">
                <span className="text-[#222222]">DYU</span>
                <span className="text-[#888888] italic">AC 22 kW</span>
              </div>
            }
            description="High-performance charging for commercial parking, fleets, and public spaces. Fast, durable, and designed for heavy usage."
            features={[
              { title: "3-Phase Power", desc: "Delivers up to 22 kW of pure charging power, significantly reducing wait times for larger battery packs." },
              { title: "OCPP 1.6J Compliant", desc: "Easily integrate with existing management systems for billing, load balancing, and fleet management." },
              { title: "Robust Security", desc: "RFID authentication and advanced ground fault protection keep your users and grid safe." }
            ]}
            reverse={true}
          />

          <ScrollRevealSection
            imageSrc="/images/ev-3.jpg"
            imageAlt="EV Charger Connectors"
            title={
              <div className="flex flex-col">
                <span className="text-[#222222]">Universal</span>
                <span className="text-[#888888] italic">Compatibility</span>
              </div>
            }
            description="Our AC chargers are designed to work seamlessly with all major electric vehicle brands on the road today."
            features={[
              { title: "Type 2 Connectors", desc: "The standard across India and Europe, ensuring a perfect fit for Tata, MG, BYD, Audi, and more." },
              { title: "Dynamic Load Balancing", desc: "Intelligently adjusts power output based on your building's current electrical load to prevent tripping." },
              { title: "24/7 Support", desc: "Backed by DYU's premium nationwide support network. We're here whenever you need us." }
            ]}
            reverse={false}
          />
        </div>
      </main>
    </div>
  );
}
