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

export default function CSMSPage() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="min-h-screen relative font-['Figtree'] bg-[#F1EFE1] text-[#222222]">
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
              <span className="text-[#888888] italic">Management System (CSMS)</span>
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
              <button className="px-8 py-4 bg-[#222222] hover:bg-black text-white rounded-xl font-extrabold text-lg transition-all shadow-[0_0_20px_rgba(34,34,34,0.4)] flex items-center gap-2">
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
              <div className="bg-white/50 backdrop-blur-sm border border-[#222222]/10 p-6 rounded-2xl shadow-sm">
                <h3 className="text-3xl font-black text-[#222222] mb-2 font-['Gilroy']">CPOs</h3>
                <p className="text-[#666666] font-medium">Charging Point Operators</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm border border-[#222222]/10 p-6 rounded-2xl shadow-sm">
                <h3 className="text-3xl font-black text-[#222222] mb-2 font-['Gilroy']">Franchise Owners</h3>
                <p className="text-[#666666] font-medium">EV Charging Franchise Owners</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm border border-[#222222]/10 p-6 rounded-2xl shadow-sm">
                <h3 className="text-3xl font-black text-[#222222] mb-2 font-['Gilroy']">Charger Owners</h3>
                <p className="text-[#666666] font-medium">EV Charging Station Owners</p>
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
                <span className="text-[#888888] italic">Single Dashboard</span>
              </h2>
              <p className="text-xl text-[#666666] max-w-4xl mx-auto font-medium">
                CSMS is the software layer that enables EV chargers to operate, communicate, and be managed within a network. It allows operators to track charger status, manage charging sessions, and handle users efficiently. It also includes built-in tools for issue and error management, helping reduce downtime and maintain reliable charger operations.
              </p>
            </div>
            <div className="w-full bg-[#222222] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/10 aspect-video relative">
              <div className="w-full h-full overflow-hidden">
                <div className="min-w-[1024px] w-full h-full">
                  <CSMSDashboardPreview />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* KEY FEATURES SECTION */}
        <section className="py-20 relative z-20 bg-[#222222]">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-white">Key</span>
                <span className="text-[#888888] italic">Features</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-[#111111] p-8 rounded-3xl text-white shadow-xl hover:-translate-y-1 transition-transform border border-white/5">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <Activity className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-['Gilroy']">Real-time monitoring</h3>
                <p className="text-gray-400">Track charger status, performance, and availability across your network.</p>
              </div>

              <div className="bg-[#111111] p-8 rounded-3xl text-white shadow-xl hover:-translate-y-1 transition-transform border border-white/5">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <IndianRupee className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-['Gilroy']">Revenue Management</h3>
                <p className="text-gray-400">Monitor earnings, pricing, and transactions across all charging stations.</p>
              </div>

              <div className="bg-[#111111] p-8 rounded-3xl text-white shadow-xl hover:-translate-y-1 transition-transform border border-white/5">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <AlertTriangle className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-['Gilroy']">Error & Complaint Management</h3>
                <p className="text-gray-400">Identify issues quickly and resolve user complaints with built-in tools.</p>
              </div>

              <div className="bg-[#111111] p-8 rounded-3xl text-white shadow-xl hover:-translate-y-1 transition-transform border border-white/5">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-['Gilroy']">User & Admin Management</h3>
                <p className="text-gray-400">Manage user access, roles, and permissions across the platform.</p>
              </div>

              <div className="bg-[#111111] p-8 rounded-3xl text-white shadow-xl hover:-translate-y-1 transition-transform border border-white/5">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-['Gilroy']">Reports & Notifications</h3>
                <p className="text-gray-400">Access detailed reports and receive alerts for key activities and issues.</p>
              </div>

              <div className="bg-[#111111] p-8 rounded-3xl text-white shadow-xl hover:-translate-y-1 transition-transform border border-white/5">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <CreditCard className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-['Gilroy']">T+1 Payment Settlement</h3>
                <p className="text-gray-400">Ensure faster payouts with next-day settlement of transactions.</p>
              </div>

              <div className="bg-[#111111] p-8 rounded-3xl text-white shadow-xl hover:-translate-y-1 transition-transform border border-white/5">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <MonitorPlay className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-['Gilroy']">Dynamic Dashboards</h3>
                <p className="text-gray-400">Visualize network performance and key metrics through customizable dashboards.</p>
              </div>

              <div className="bg-[#111111] p-8 rounded-3xl text-white shadow-xl hover:-translate-y-1 transition-transform border border-white/5">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <Settings className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-['Gilroy']">OCPI & OCPP Compliant</h3>
                <p className="text-gray-400">Enable standardized communication and interoperability across charging networks.</p>
              </div>

              <div className="bg-[#111111] p-8 rounded-3xl text-white shadow-xl hover:-translate-y-1 transition-transform border border-white/5">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <CreditCard className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-['Gilroy']">Payments, Coupons & Invoicing</h3>
                <p className="text-gray-400">Support multiple payment options, discounts, and automated invoicing.</p>
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
                <span className="text-[#888888] italic">to Your Business</span>
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
