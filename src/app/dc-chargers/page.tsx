"use client";

import { Navbar } from "@/components/Navbar";
import { ScrollRevealSection } from "@/components/ac-charger/ScrollRevealSection";
import { motion, Variants } from "framer-motion";
import { Zap, Server, ShieldCheck, TrendingUp, CheckCircle2 } from "lucide-react";
import Link from "next/link";

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

export default function DCChargersPage() {
  return (
    <div className="min-h-screen bg-[#F8FBFC] text-[#1F2933] font-['Inter'] selection:bg-[#005F73] selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <main className="pt-24 md:pt-32 pb-12 md:pb-20 overflow-hidden bg-[#002B36] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-4xl mx-auto mb-12 md:mb-20"
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <Zap size={16} className="text-[#94D2BD]" />
              <span className="text-base font-semibold tracking-wider text-[#94D2BD] uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>Commercial & Fleet Solutions</span>
            </motion.div>
            
            <h1 className="flex flex-col gap-1 mb-6 tracking-tighter" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              <span className="text-white">Ultra-Fast DC Charging</span>
              <span className="text-[#94D2BD] font-bold">for Commercial Hubs</span>
            </h1>
            <motion.p 
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: 'clamp(16px, 2vw, 18px)',
                color: 'rgba(255,255,255,0.8)',
                maxWidth: '650px',
                margin: '0 auto 24px',
                lineHeight: 1.6,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              Upgrade your business with DC fast chargers, from 60 kW to 360 kW ultra-fast solutions - reliable, smart, built for fleets nationwide.
            </motion.p>
          </motion.div>
        </div>
      </main>

      {/* Products Scroll Reveal Section */}
      <div className="bg-[#F8FBFC]">
        <ScrollRevealSection
          imageSrc="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=1200"
          imageAlt="DYU Configurable DC Fast Charger"
          title={
            <>
              <span className="text-[#222222]">Configurable </span>
              <span className="text-[#005F73] font-bold">DC Fast Charger</span>
            </>
          }
          description="High-power DC fast charging solutions available in multiple variants from 60 kW to 360 kW, built to support different business use cases and scalable deployments across locations."
          features={[
            {
              title: "Scalable Architecture",
              desc: "Easily upgrade charging capabilities from 60 kW up to 360 kW as your commercial fleet or user base grows."
            },
            {
              title: "Multi-Protocol Support",
              desc: "Fully compatible with CCS2 and CHAdeMO standards for universal EV fleet compatibility."
            },
            {
              title: "Enterprise Ready",
              desc: "Integrated OCPP 1.6J communication for seamless connection with your existing fleet management systems."
            }
          ]}
        />

        <ScrollRevealSection
          imageSrc="/images/ev-6.jpg"
          imageAlt="DC Charger 60kW to 120kW"
          title={
            <>
              <span className="text-[#222222]">DC Charger </span>
              <span className="text-[#005F73] font-bold">60kW to 120kW</span>
            </>
          }
          description="A compact DC fast charging solution built for space-constrained locations, offering reliable performance with a significantly smaller footprint."
          reverse={true}
          features={[
            {
              title: "Compact Footprint",
              desc: "Perfect for tight parking spots, retail locations, and underground garages without compromising on charging speed."
            },
            {
              title: "Quiet Operation",
              desc: "Advanced liquid-cooling technology ensures minimal noise emissions, ideal for residential or upscale commercial areas."
            },
            {
              title: "Low Installation Cost",
              desc: "Simplified mounting and electrical requirements make deployment faster and more cost-effective."
            }
          ]}
        />

        <ScrollRevealSection
          imageSrc="/images/ev-8.jpg"
          imageAlt="DC Charger 180kW to 360kW"
          title={
            <>
              <span className="text-[#222222]">DC Charger </span>
              <span className="text-[#005F73] font-bold">180kW to 360kW</span>
            </>
          }
          description="A DC fast charger with high-efficiency performance and support for standard charging network integration, built for smooth and reliable charging operations."
          features={[
            {
              title: "Dual-Gun Charging",
              desc: "Charge two vehicles simultaneously with intelligent dynamic power distribution to maximize throughput."
            },
            {
              title: "Ultra-Fast Speeds",
              desc: "Delivers up to 120 kW of pure DC power, providing an 80% charge to compatible vehicles in under 30 minutes."
            },
            {
              title: "All-Weather Reliability",
              desc: "Rugged IP55/IK10 rated enclosure guarantees performance in extreme heat, heavy rain, and dusty conditions."
            }
          ]}
        />
      </div>

      {/* Why Choose Section */}
      <section className="py-24 bg-[#F1EFE1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
              <span className="text-[#222222]">Why Choose DYU</span>
              <span className="text-[#005F73] font-bold">DC Fast Chargers?</span>
            </h2>
            <p className="text-lg text-[#1F2933]">
              Engineered for absolute reliability, our commercial chargers form the backbone of India's rapidly growing EV infrastructure.
            </p>
          </div>

          <div className="flex flex-col relative w-full max-w-3xl mx-auto pb-32">
            {[
              {
                icon: <Server className="w-10 h-10 text-[#005F73]" />,
                title: "Smart Monitoring",
                desc: "Use remote monitoring, app control, and secure OTA updates to manage your chargers with absolute ease."
              },
              {
                icon: <ShieldCheck className="w-10 h-10 text-[#005F73]" />,
                title: "Built for Heavy-Duty",
                desc: "Designed to handle high-traffic locations and large commercial fleet charging volumes 24/7 reliably."
              },
              {
                icon: <TrendingUp className="w-10 h-10 text-[#005F73]" />,
                title: "Universal Compatibility",
                desc: "Works seamlessly across leading EV brands and large-scale commercial fleet vehicles in India."
              },
              {
                icon: <CheckCircle2 className="w-10 h-10 text-[#005F73]" />,
                title: "Trusted by Businesses",
                desc: "Adopted by leading fleet operators, logistics enterprises, and commercial charging networks nationwide."
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="sticky bg-white p-8 md:p-12 rounded-3xl border border-gray-200 shadow-2xl flex flex-col md:flex-row gap-8 items-start md:items-center origin-top"
                style={{ 
                  top: `calc(15vh + ${idx * 1.5}rem)`,
                  marginBottom: idx !== 3 ? '100px' : '0'
                }}
              >
                <div className="w-20 h-20 shrink-0 bg-[#005F73]/10 rounded-2xl flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="mb-3 text-[#1F2933]" style={{ fontFamily: '"Gilroy", sans-serif', fontWeight: 800, letterSpacing: '0.5px', fontSize: '1.125rem', lineHeight: '1.2' }}>{feature.title}</h3>
                  <p className="text-[#52606D] text-base leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Models Section */}
      <section className="py-24 bg-[#F1EFE1] text-[#222222] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
              <span className="text-[#222222]">Choose Your EV Charging</span>
              <span className="text-[#222222] italic">Business Model</span>
            </h2>
            <p className="text-lg text-[#1F2933] font-medium">
              Whether you want complete ownership or a fully managed franchise, DYU provides flexible models tailored to your investment goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* FOCO Model */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative p-[3px] overflow-hidden group rounded-3xl shadow-2xl"
            >
              <div className="dark-card relative z-10 bg-[#002B36] border border-[#005F73]/20 hover:border-white/30 hover:shadow-2xl transition-all duration-300 h-full w-full p-8 md:p-10 rounded-3xl flex flex-col">
                <div className="mb-6">
                  <span className="text-base font-semibold tracking-widest text-white uppercase mb-2 block">Model 01 — FOCO</span>
                  <h3 className="text-white" style={{ fontFamily: '"Gilroy", sans-serif', fontWeight: 800, letterSpacing: '0.5px', fontSize: '1.25rem', lineHeight: '1.2' }}>Franchise Owned, Company Operated</h3>
                </div>
                <p className="text-white mb-8 h-20 leading-relaxed font-medium">
                  Ideal for investors, MSMEs, and businesses looking to participate in EV infrastructure while leveraging DYU's operational expertise.
                </p>
                <ul className="space-y-4 mb-10">
                  {[
                    "Investment ranges from ₹30 Lakhs to ₹3 Crores depending on station configuration.",
                    "DC Fast Charging Stations (60kW - 360kW) with scalable parking bays.",
                    "Charger deployment and technology integration supported by DYU.",
                    "Ongoing technical monitoring and uptime support.",
                    "Branding, app visibility, and network access within the DYU ecosystem."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                      <span className="text-white text-base leading-relaxed font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact-us" className="btn-primary w-full inline-flex items-center justify-center py-4 px-8 rounded-full font-extrabold transition-all duration-300 mt-auto">
                  Enquire Now
                </Link>
              </div>
            </motion.div>

            {/* Outright Purchase Model */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative p-[3px] overflow-hidden group rounded-3xl shadow-2xl"
            >
              <div className="dark-card relative z-10 bg-[#002B36] border border-[#005F73]/20 hover:border-white/30 hover:shadow-2xl transition-all duration-300 h-full w-full p-8 md:p-10 rounded-3xl flex flex-col">
                <div className="mb-6">
                  <span className="text-base font-semibold tracking-widest text-white uppercase mb-2 block">Model 02 — Direct</span>
                  <h3 className="text-white" style={{ fontFamily: '"Gilroy", sans-serif', fontWeight: 800, letterSpacing: '0.5px', fontSize: '1.25rem', lineHeight: '1.2' }}>Outright Purchase</h3>
                </div>
                <p className="text-white mb-8 h-20 leading-relaxed font-medium">
                  Best for hotels, fleet operators, commercial properties, and businesses that want complete ownership and control of their charging infrastructure.
                </p>
                <ul className="space-y-4 mb-10">
                  {[
                    "Complete ownership of the charger.",
                    "No recurring AMC or SaaS (optional flexibility).",
                    "Branding flexibility with our industry-leading hardware.",
                    "Flexible pricing, operations, and direct customer billing.",
                    "EPC (Engineering, Procurement & Construction) support for charging infrastructure setup."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                      <span className="text-white text-base leading-relaxed font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact-us" className="btn-primary w-full inline-flex items-center justify-center py-4 px-8 rounded-full font-extrabold transition-all duration-300 mt-auto">
                  Enquire Now
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
