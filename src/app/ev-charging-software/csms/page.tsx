"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import CSMSDashboardPreview from "@/components/CSMSDashboardPreview";
import { 
  ArrowRight,
  Activity,
  IndianRupee,
  AlertTriangle,
  Users,
  BarChart3,
  MonitorPlay,
  Settings,
  CreditCard,
  TrendingUp,
  ShieldCheck,
  Smile,
  Database,
  ChevronDown,
  ChevronUp
} from "lucide-react";

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

export default function CSMSPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="min-h-screen relative font-['Figtree'] bg-[#001E2B] text-white">
      {/* FIXED BACKGROUND VIDEO & DARK OVERLAY */}
      <div className="fixed inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="auto"
          className="w-full h-full object-cover opacity-85"
        >
          <source src="https://cdn.jsdelivr.net/gh/visinorywebofficial-cell/dyu-ev-charging@main/public/ev-charging-2.mp4" type="video/mp4" />
          <source src="/ev-charging-2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 z-0" />
      </div>

      <main className="pt-24 pb-20 relative z-10">
        
        {/* HERO SECTION */}
        <section className="min-h-[60vh] flex items-center justify-center relative z-10">
          <div className="container mx-auto px-4 text-center">
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-col gap-1 mb-6 tracking-tighter"
              style={{ fontFamily: '"Gilroy", sans-serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}
            >
              <span className="text-[#222222]">Charging Station</span>
              <span className="text-[#005F73] font-bold">Management System (CSMS)</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl font-bold text-[#666666] max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              Manage, Monitor, and Optimise Your EV Charging Network.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center flex-wrap gap-4 mb-16"
            >
              <button className="btn-primary px-8 py-4 bg-[#005F73] hover:bg-[#002B36] text-white rounded-xl font-extrabold text-lg transition-all shadow-[0_0_20px_rgba(0,95,115,0.4)] flex items-center gap-2">
                Enquire Now <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              <div className="group bg-white/70 hover:bg-[#002B36] backdrop-blur-sm border border-[#222222]/10 hover:border-[#005F73] p-6 rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
                <h3 className="text-3xl font-black text-[#222222] group-hover:!text-white mb-2 font-['Gilroy'] transition-colors duration-300">CPOs</h3>
                <p className="text-[#666666] group-hover:!text-white/90 font-medium transition-colors duration-300">Charging Point Operators</p>
              </div>
              <div className="group bg-white/70 hover:bg-[#002B36] backdrop-blur-sm border border-[#222222]/10 hover:border-[#005F73] p-6 rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
                <h3 className="text-3xl font-black text-[#222222] group-hover:!text-white mb-2 font-['Gilroy'] transition-colors duration-300">Franchise Owners</h3>
                <p className="text-[#666666] group-hover:!text-white/90 font-medium transition-colors duration-300">EV Charging Franchise Owners</p>
              </div>
              <div className="group bg-white/70 hover:bg-[#002B36] backdrop-blur-sm border border-[#222222]/10 hover:border-[#005F73] p-6 rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
                <h3 className="text-3xl font-black text-[#222222] group-hover:!text-white mb-2 font-['Gilroy'] transition-colors duration-300">Charger Owners</h3>
                <p className="text-[#666666] group-hover:!text-white/90 font-medium transition-colors duration-300">EV Charging Station Owners</p>
              </div>
            </motion.div>

          </div>
        </section>

        {/* INTRO SECTION */}
        <section className="py-20 relative z-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-[#222222]">Manage Your EV Chargers from a</span>
                <span className="text-[#222222] italic">Single Dashboard</span>
              </h2>
              <p className="text-xl text-[#1F2933] max-w-4xl mx-auto font-medium">
                CSMS is the software layer that enables EV chargers to operate, communicate, and be managed within a network. It allows operators to track charger status, manage charging sessions, and handle users efficiently. It also includes built-in tools for issue and error management, helping reduce downtime and maintain reliable charger operations.
              </p>
            </div>
            <div className="w-full bg-[#002B36] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/10 aspect-video relative">
              <div className="w-full h-full overflow-hidden">
                <div className="min-w-[1024px] w-full h-full">
                  <CSMSDashboardPreview />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* KEY FEATURES SECTION */}
        <section className="py-20 relative z-20 bg-[#002B36]">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-white">Key</span>
                <span className="text-white italic">Features</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group bg-[#002B36] hover:bg-white p-8 rounded-3xl text-white shadow-xl border border-[#005F73]/20 hover:border-white hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
                <div className="w-14 h-14 bg-white/10 group-hover:bg-[#002B36] rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300">
                  <Activity className="w-7 h-7 text-white group-hover:text-[#00F0FF] transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-['Gilroy'] text-white group-hover:!text-[#222222] transition-colors duration-300">Real-time monitoring</h3>
                <p className="text-white/90 group-hover:!text-[#444444] leading-relaxed font-medium transition-colors duration-300">Track charger status, performance, and availability across your network.</p>
              </div>

              <div className="group bg-[#002B36] hover:bg-white p-8 rounded-3xl text-white shadow-xl border border-[#005F73]/20 hover:border-white hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
                <div className="w-14 h-14 bg-white/10 group-hover:bg-[#002B36] rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300">
                  <IndianRupee className="w-7 h-7 text-white group-hover:text-[#00F0FF] transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-['Gilroy'] text-white group-hover:!text-[#222222] transition-colors duration-300">Revenue Management</h3>
                <p className="text-white/90 group-hover:!text-[#444444] leading-relaxed font-medium transition-colors duration-300">Monitor earnings, pricing, and transactions across all charging stations.</p>
              </div>

              <div className="group bg-[#002B36] hover:bg-white p-8 rounded-3xl text-white shadow-xl border border-[#005F73]/20 hover:border-white hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
                <div className="w-14 h-14 bg-white/10 group-hover:bg-[#002B36] rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300">
                  <AlertTriangle className="w-7 h-7 text-white group-hover:text-[#00F0FF] transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-['Gilroy'] text-white group-hover:!text-[#222222] transition-colors duration-300">Error & Complaint Management</h3>
                <p className="text-white/90 group-hover:!text-[#444444] leading-relaxed font-medium transition-colors duration-300">Identify issues quickly and resolve user complaints with built-in tools.</p>
              </div>

              <div className="group bg-[#002B36] hover:bg-white p-8 rounded-3xl text-white shadow-xl border border-[#005F73]/20 hover:border-white hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
                <div className="w-14 h-14 bg-white/10 group-hover:bg-[#002B36] rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300">
                  <Users className="w-7 h-7 text-white group-hover:text-[#00F0FF] transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-['Gilroy'] text-white group-hover:!text-[#222222] transition-colors duration-300">User & Admin Management</h3>
                <p className="text-white/90 group-hover:!text-[#444444] leading-relaxed font-medium transition-colors duration-300">Manage user access, roles, and permissions across the platform.</p>
              </div>

              <div className="group bg-[#002B36] hover:bg-white p-8 rounded-3xl text-white shadow-xl border border-[#005F73]/20 hover:border-white hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
                <div className="w-14 h-14 bg-white/10 group-hover:bg-[#002B36] rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300">
                  <BarChart3 className="w-7 h-7 text-white group-hover:text-[#00F0FF] transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-['Gilroy'] text-white group-hover:!text-[#222222] transition-colors duration-300">Reports & Notifications</h3>
                <p className="text-white/90 group-hover:!text-[#444444] leading-relaxed font-medium transition-colors duration-300">Access detailed reports and receive alerts for key activities and issues.</p>
              </div>

              <div className="group bg-[#002B36] hover:bg-white p-8 rounded-3xl text-white shadow-xl border border-[#005F73]/20 hover:border-white hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
                <div className="w-14 h-14 bg-white/10 group-hover:bg-[#002B36] rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300">
                  <CreditCard className="w-7 h-7 text-white group-hover:text-[#00F0FF] transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-['Gilroy'] text-white group-hover:!text-[#222222] transition-colors duration-300">T+1 Payment Settlement</h3>
                <p className="text-white/90 group-hover:!text-[#444444] leading-relaxed font-medium transition-colors duration-300">Ensure faster payouts with next-day settlement of transactions.</p>
              </div>

              <div className="group bg-[#002B36] hover:bg-white p-8 rounded-3xl text-white shadow-xl border border-[#005F73]/20 hover:border-white hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
                <div className="w-14 h-14 bg-white/10 group-hover:bg-[#002B36] rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300">
                  <MonitorPlay className="w-7 h-7 text-white group-hover:text-[#00F0FF] transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-['Gilroy'] text-white group-hover:!text-[#222222] transition-colors duration-300">Dynamic Dashboards</h3>
                <p className="text-white/90 group-hover:!text-[#444444] leading-relaxed font-medium transition-colors duration-300">Visualize network performance and key metrics through customizable dashboards.</p>
              </div>

              <div className="group bg-[#002B36] hover:bg-white p-8 rounded-3xl text-white shadow-xl border border-[#005F73]/20 hover:border-white hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
                <div className="w-14 h-14 bg-white/10 group-hover:bg-[#002B36] rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300">
                  <Settings className="w-7 h-7 text-white group-hover:text-[#00F0FF] transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-['Gilroy'] text-white group-hover:!text-[#222222] transition-colors duration-300">OCPI & OCPP Compliant</h3>
                <p className="text-white/90 group-hover:!text-[#444444] leading-relaxed font-medium transition-colors duration-300">Enable standardized communication and interoperability across charging networks.</p>
              </div>

              <div className="group bg-[#002B36] hover:bg-white p-8 rounded-3xl text-white shadow-xl border border-[#005F73]/20 hover:border-white hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
                <div className="w-14 h-14 bg-white/10 group-hover:bg-[#002B36] rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300">
                  <CreditCard className="w-7 h-7 text-white group-hover:text-[#00F0FF] transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-['Gilroy'] text-white group-hover:!text-[#222222] transition-colors duration-300">Payments, Coupons & Invoicing</h3>
                <p className="text-white/90 group-hover:!text-[#444444] leading-relaxed font-medium transition-colors duration-300">Support multiple payment options, discounts, and automated invoicing.</p>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS SECTION */}
        <section className="py-20 relative z-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-[#222222]">Benefits that Matter</span>
                <span className="text-[#005F73] italic">to Your Business</span>
              </h2>
              <p className="text-xl text-[#666666] max-w-2xl mx-auto font-medium">
                CSMS helps you run your EV charging network more efficiently, improve reliability, and maximize returns from your infrastructure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/60 p-8 rounded-3xl border border-[#222222]/10 shadow-sm backdrop-blur-md flex items-start gap-6">
                <TrendingUp className="w-10 h-10 text-[#00F0FF] flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-extrabold text-[#222222] mb-2 font-['Gilroy']">Optimize Charger Performance & ROI</h3>
                  <p className="text-[#666666]">Track usage and improve efficiency to maximize returns.</p>
                </div>
              </div>
              <div className="bg-white/60 p-8 rounded-3xl border border-[#222222]/10 shadow-sm backdrop-blur-md flex items-start gap-6">
                <ShieldCheck className="w-10 h-10 text-[#00F0FF] flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-extrabold text-[#222222] mb-2 font-['Gilroy']">Boost Network Reliability</h3>
                  <p className="text-[#666666]">Monitor charger health and resolve issues faster.</p>
                </div>
              </div>
              <div className="bg-white/60 p-8 rounded-3xl border border-[#222222]/10 shadow-sm backdrop-blur-md flex items-start gap-6">
                <Smile className="w-10 h-10 text-[#00F0FF] flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-extrabold text-[#222222] mb-2 font-['Gilroy']">Enhance User Satisfaction</h3>
                  <p className="text-[#666666]">Ensure reliable charging experiences with fewer disruptions.</p>
                </div>
              </div>
              <div className="bg-white/60 p-8 rounded-3xl border border-[#222222]/10 shadow-sm backdrop-blur-md flex items-start gap-6">
                <Database className="w-10 h-10 text-[#00F0FF] flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-extrabold text-[#222222] mb-2 font-['Gilroy']">Make Data-Driven Decisions</h3>
                  <p className="text-[#666666]">Leverage insights to scale and optimize operations.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQS */}
        <section className="py-20 relative z-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-[#222222]">Got questions about</span>
                <span className="text-[#888888] italic">CSMS?</span>
              </h2>
              <p className="text-xl text-[#666666] max-w-2xl mx-auto font-medium">
                Contact us if you still have any questions to make your experience smoother.
              </p>
            </div>

            <div className="space-y-2">
              <FAQItem 
                question="Can I check my revenue trend?" 
                answer="Yes. CSMS allows you to view historical data and track revenue trends through graphs. You can also select the date range you want to analyse." 
              />
              <FAQItem 
                question="Do I get information about charging sessions performed on my charger?" 
                answer="Yes, the CSMS dashboard provides comprehensive details about all charging sessions, including start/stop times, energy consumed, and payment status." 
              />
              <FAQItem 
                question="Can I view transactions on the CSMS platform?" 
                answer="Absolutely. You can track all successful, pending, and failed transactions in real time from the Transactions tab." 
              />
              <FAQItem 
                question="Can I view invoices for charging sessions?" 
                answer="Yes, invoices are automatically generated for each charging session and can be viewed or downloaded directly from the platform." 
              />
              <FAQItem 
                question="Do you support payment gateway integrations?" 
                answer="Yes, we support seamless integration with major payment gateways, ensuring secure and automated payment collections." 
              />
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
