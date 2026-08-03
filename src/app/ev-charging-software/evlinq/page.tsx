"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight,
  Network,
  PlugZap,
  IndianRupee,
  Clock,
  MessageSquareWarning,
  ShieldCheck,
  Lock,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { EVLinqDashboardPreview } from "@/components/EVLinqDashboardPreview";

const FAQItem = ({ question, answer }: { question: string, answer: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: "easeOut" as const }}
      className="border border-[#005F73]/20 dark-card bg-[#002B36] shadow-xl backdrop-blur-md rounded-2xl mb-4 overflow-hidden"
    >
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
            className="px-6 pb-5 text-gray-300"
            style={{ fontFamily: 'var(--font-figtree)' }}
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Common animation variants
const fadeUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" as const }
};

const staggerItemProps = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, ease: "easeOut" as const }
};

export default function EVLinqPage() {
  const introRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: introScrollYProgress } = useScroll({
    target: introRef,
    offset: ["start start", "end end"]
  });

  const introText = "EVlinq is a roaming platform that connects multiple EV charging networks through a single integration, enabling charge point operators (CPOs), eMobility service providers (eMSPs), OEMs, and fleet operators to access and share charging infrastructure across networks. As EV adoption grows, interoperability between networks becomes essential. EVlinq simplifies this by acting as a central roaming layer that allows different charging networks to work together without requiring multiple integrations or agreements.";
  const introWords = introText.split(" ");

  return (
    <div className="min-h-screen relative font-['Figtree'] bg-white text-[#222222]">
      {/* Dark background only - no video */}

      <main className="pt-32 pb-20 relative z-10">
        
        {/* TOP HERO TEXT (Scrolls away normally) */}
        <div className="container mx-auto px-4 text-center mb-16 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="flex flex-col gap-1 mb-6 tracking-tighter"
            style={{ fontFamily: '"Gilroy", sans-serif', fontSize: 'clamp(48px, 6vw, 80px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}
          >
            <span className="text-[#222222]">EVLinq</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-2xl md:text-3xl font-bold text-[#666666] max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Your Go-To EV Charging <span className="font-bold text-[#222222]">Roaming Platform</span>
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="flex justify-center flex-wrap gap-4 mb-4"
          >
            <button className="px-8 py-4 bg-[#222222] hover:bg-black text-white rounded-xl font-extrabold text-lg transition-all shadow-[0_0_20px_rgba(34,34,34,0.4)] flex items-center gap-2">
              Enquire Now <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* PINNED SECTION: STATS + TYPEWRITER TEXT + IMAGE */}
        <section ref={introRef} className="h-[250vh] relative z-20">
          <div className="sticky top-20 flex flex-col items-center pt-10 pb-4 overflow-hidden min-h-[85vh]">
            <div className="container mx-auto px-4 max-w-6xl w-full">
              
              {/* Stats - They stick at the top of the viewport */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16"
              >
                {[
                  { title: "CPOs", desc: "Charging Point Operators" },
                  { title: "EV OEMs", desc: "Electric Vehicle Manufacturers" },
                  { title: "eMSPs", desc: "E-Mobility Service Providers" },
                  { title: "Fleet Operators", desc: "EV Fleet Operators" }
                ].map((stat, i) => (
                  <div 
                    key={i}
                    className="bg-white/50 backdrop-blur-sm border border-[#222222]/10 p-6 rounded-2xl shadow-sm text-center"
                  >
                    <h3 className="text-2xl md:text-3xl font-black text-[#222222] mb-2 font-['Gilroy']">{stat.title}</h3>
                    <p className="text-[#666666] font-medium text-sm">{stat.desc}</p>
                  </div>
                ))}
              </motion.div>

              {/* Typewriter Effect Paragraph */}
              <div className="text-center mb-12">
                <p className="text-xl md:text-[22px] text-[#666666] max-w-5xl mx-auto font-medium leading-relaxed flex flex-wrap justify-center gap-x-2 gap-y-1">
                  {introWords.map((word, i) => {
                    const start = (i / introWords.length) * 0.5; // Finishes typing by 50% of scroll
                    const end = start + (1 / introWords.length);
                    const opacity = useTransform(introScrollYProgress, [start, end], [0.15, 1]);
                    const color = useTransform(introScrollYProgress, [start, end], ["#cccccc", "#222222"]);
                    return (
                      <motion.span key={i} style={{ opacity, color }}>
                        {word}
                      </motion.span>
                    );
                  })}
                </p>
              </div>
              
              {/* Image/Dashboard removed as requested */}

            </div>
          </div>
        </section>

        {/* KEY FEATURES SECTION */}
        <section className="py-24 relative z-20 bg-[#002B36] overflow-hidden mt-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <motion.h2 {...fadeUpProps} className="text-4xl md:text-5xl font-['Gilroy'] font-extrabold text-white mb-6 tracking-tighter">
                Key <span className="text-white italic">Features</span>
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Network, title: "Single integration to access multiple networks", desc: "Connect once and access a wide network of EV chargers." },
                { icon: PlugZap, title: "OCPI-based connectivity", desc: "Enable smooth data exchange and communication between charging networks using standard OCPI protocols." },
                { icon: IndianRupee, title: "Unified platform for payments", desc: "Manage transactions, billing, and settlements across networks from one centralized place." },
                { icon: Clock, title: "T+1 Payment Settlement", desc: "Ensure faster payouts with reliable next-day settlement of transactions." },
                { icon: MessageSquareWarning, title: "Communication & complaint management", desc: "Handle partner communication and resolve cross-network issues efficiently." },
                { icon: ShieldCheck, title: "Single legal agreement", desc: "Simplify partnerships with one agreement instead of multiple individual network contracts." }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  {...staggerItemProps}
                  transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
                  className="group bg-[#002B36] hover:bg-white p-8 rounded-3xl text-white shadow-xl border border-[#005F73]/20 hover:border-white hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-14 h-14 bg-white/10 group-hover:bg-[#002B36] rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300">
                    <feature.icon className="w-7 h-7 text-white group-hover:text-[#00F0FF] transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 font-['Gilroy'] text-white group-hover:!text-[#222222] transition-colors duration-300">{feature.title}</h3>
                  <p className="text-white/90 group-hover:!text-[#444444] leading-relaxed font-medium transition-colors duration-300">{feature.desc}</p>
                </motion.div>
              ))}

              <motion.div 
                {...staggerItemProps}
                transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
                className="group bg-[#002B36] hover:bg-white p-8 rounded-3xl text-white shadow-xl border border-[#005F73]/20 hover:border-white hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer lg:col-span-3 lg:max-w-md lg:mx-auto"
              >
                <div className="w-14 h-14 bg-white/10 group-hover:bg-[#002B36] rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300">
                  <Lock className="w-7 h-7 text-white group-hover:text-[#00F0FF] transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-['Gilroy'] text-white group-hover:!text-[#222222] transition-colors duration-300">Encrypted data exchange</h3>
                <p className="text-white/90 group-hover:!text-[#444444] leading-relaxed font-medium transition-colors duration-300">Protect sensitive transactions and user information with enterprise-grade security.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* BENEFITS SECTION */}
        <section className="py-24 relative z-20 overflow-hidden">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <motion.h2 {...fadeUpProps} className="text-3xl md:text-5xl font-['Gilroy'] font-extrabold text-[#222222] mb-6 tracking-tighter">
                Benefits <span className="text-[#888888] italic">that Matter to Your Business</span>
              </motion.h2>
              <motion.p {...fadeUpProps} transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }} className="text-xl text-[#666666] max-w-2xl mx-auto font-medium">
                Unlock smarter growth with EVlinq by connecting networks, simplifying operations, and expanding your charging ecosystem with ease.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* For CPOs */}
              <motion.div 
                {...fadeUpProps}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="bg-white/60 p-10 rounded-[2rem] border border-[#222222]/10 shadow-lg backdrop-blur-md flex flex-col h-full"
              >
                <div className="mb-8">
                  <h3 className="text-3xl font-extrabold text-[#222222] mb-3 font-['Gilroy']">For CPOs</h3>
                  <p className="text-[#666666] font-medium leading-relaxed">
                    Connect your charging network to multiple platforms effortlessly – without handling separate integrations.
                  </p>
                </div>
                <div className="w-full h-px bg-gray-200 mb-8" />
                <ul className="space-y-5 flex-1">
                  {[
                    "Expand reach across multiple eMSPs and platforms",
                    "Increase charger utilisation",
                    "Improve revenue opportunities",
                    "Avoid multiple integrations with different partners",
                    "Simplified payment settlements",
                    "Single-point legal integration"
                  ].map((benefit, i) => (
                    <motion.li 
                      key={i} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.1, ease: "easeOut" }}
                      className="flex items-start gap-4"
                    >
                      <div className="mt-1 bg-[#005F73] rounded-full p-1 flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[#222222] font-semibold">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* For OEMs */}
              <motion.div 
                {...fadeUpProps}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="dark-card bg-[#002B36] p-10 rounded-[2rem] shadow-lg flex flex-col h-full text-white border border-[#005F73]/20"
              >
                <div className="mb-8">
                  <h3 className="text-3xl font-extrabold text-white mb-3 font-['Gilroy']">For OEMs</h3>
                  <p className="text-gray-300 font-medium leading-relaxed">
                    Give your users seamless access to a wide charging network – without complex agreements or integrations.
                  </p>
                </div>
                <div className="w-full h-px bg-white/10 mb-8" />
                <ul className="space-y-5 flex-1">
                  {[
                    "Easy access to aggregated charging networks",
                    "Smooth and consistent charging experience for users",
                    "Insights into user behavior and charging patterns",
                    "Faster EV adoption through better accessibility",
                    "Strengthen brand presence by offering wider charging access"
                  ].map((benefit, i) => (
                    <motion.li 
                      key={i} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.1, ease: "easeOut" }}
                      className="flex items-start gap-4"
                    >
                      <div className="mt-1 bg-[#005F73] rounded-full p-1 flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-200 font-medium">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 relative z-20 overflow-hidden">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <motion.div 
              {...fadeUpProps}
              className="bg-[#002B36] p-12 md:p-16 rounded-[3rem] shadow-2xl border-4 border-white/20"
            >
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-white">Enable EV Roaming with a</span>
                <span className="text-white italic">Single Integration</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium mb-10">
                Connect to multiple EV charging networks, without multiple integrations!
              </p>
              <button className="btn-primary px-10 py-5 bg-[#005F73] hover:bg-[#002B36] text-white rounded-xl font-extrabold text-lg transition-all flex items-center gap-2 mx-auto">
                Talk to an Expert <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* FAQS */}
        <section className="py-20 relative z-20 overflow-hidden">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <motion.h6 {...fadeUpProps} className="text-[#222222] font-bold tracking-widest uppercase mb-4 text-sm">FAQs</motion.h6>
              <motion.h2 {...fadeUpProps} transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }} className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-[#222222]">Got questions about</span>
                <span className="text-[#222222] italic">EVLinq?</span>
              </motion.h2>
              <motion.p {...fadeUpProps} transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }} className="text-xl text-[#1F2933] max-w-2xl mx-auto font-medium">
                Contact us if you still have any questions to make your experience smoother.
              </motion.p>
            </div>

            <div className="space-y-2 mb-12">
              <FAQItem 
                question="Can my platform show chargers from different networks?" 
                answer="Yes. EVlinq connects multiple networks, so chargers from different operators can be accessed through a single platform." 
              />
              <FAQItem 
                question="How are payments handled if multiple networks are involved?" 
                answer="Payments are routed securely through our unified payment gateway, ensuring all parties receive their settlements accurately without manual intervention." 
              />
              <FAQItem 
                question="Will I still need separate agreements with different partners?" 
                answer="No, EVLinq operates on a single legal agreement model. You sign once with us, and we handle the legal complexities across the roaming network." 
              />
              <FAQItem 
                question="How do I handle issues or complaints across networks?" 
                answer="You can use our built-in communication and ticketing tools to escalate and resolve issues seamlessly with any connected network operator." 
              />
              <FAQItem 
                question="Which protocols or standards does EVlinq work with?" 
                answer="We fully support OCPI (Open Charge Point Interface) and OCPP protocols to guarantee broad interoperability, secure data exchange, and seamless roaming." 
              />
            </div>
            
            <motion.div {...fadeUpProps} className="flex justify-center">
              <button className="btn-primary px-8 py-4 bg-[#005F73] hover:bg-[#002B36] text-white rounded-xl font-extrabold text-lg transition-all shadow-xl flex items-center gap-2">
                Got More Questions? <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </section>

      </main>
    </div>
  );
}
