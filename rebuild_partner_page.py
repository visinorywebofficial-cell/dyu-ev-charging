import sys

new_content = """\
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight,
  ShieldCheck,
  Eye,
  Scale,
  Plus,
  Minus
} from "lucide-react";
import dynamic from "next/dynamic";

const FrameScrubSection = dynamic(
  () => import("@/components/FrameScrubSection").then((m) => ({ default: m.FrameScrubSection })),
  { ssr: false }
);

export default function PartnerWithUsPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How to setup a EV charging station?",
      answer: "Navigate to our blog to learn more about how to set up your own EV charging station with our comprehensive guide."
    },
    {
      question: "How long is the installation process?",
      answer: "The installation process typically takes between 2 to 4 weeks depending on site readiness and grid availability."
    },
    {
      question: "How long the warranty contract is valid for?",
      answer: "Our standard warranty covers hardware and software for up to 3 years, with options to extend through our comprehensive AMC packages."
    },
    {
      question: "Are there Public EV Car Charging Stations in India?",
      answer: "Yes, we operate one of the largest and fastest-growing networks of public EV charging stations across major highways and cities in India."
    },
    {
      question: "How Much Does it cost to Fully Charge Your Electric Car?",
      answer: "The cost depends on your vehicle's battery capacity and the local per-unit electricity tariff, but it generally ranges from ₹200 to ₹500 for a full charge."
    }
  ];

  const toggleFaq = (index: number) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  return (
    <main className="min-h-screen bg-[#F1EFE1] text-[#222222]">
      
      {/* Hero Section (Frame Scrub) */}
      <FrameScrubSection />

      {/* Main Content below Hero */}
      <div className="pt-24 pb-20 px-4 md:px-8">
        
        {/* Intro */}
        <section className="max-w-6xl mx-auto mb-24 mt-8 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 
              className="text-4xl md:text-6xl font-black uppercase mb-6"
              style={{ fontFamily: "'Gilroy', sans-serif" }}
            >
              Partner <span className="text-[#00F0FF]">With Us</span>
            </h1>
            <p className="text-xl md:text-3xl font-medium max-w-3xl text-gray-500 mb-10 leading-snug" style={{ fontFamily: "var(--font-figtree)" }}>
              Manage, Monitor, and Optimise Your EV Charging Network.
            </p>
            <a 
              href="#request-form"
              className="inline-flex items-center gap-3 bg-[#222222] text-[#F1EFE1] px-8 py-4 text-lg font-bold uppercase tracking-wider hover:bg-[#00F0FF] hover:text-[#222222] transition-colors"
              style={{ fontFamily: "'Gilroy', sans-serif" }}
            >
              Talk to an Expert
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </section>

        {/* Partnership Models Section */}
        <section className="max-w-6xl mx-auto mb-32 space-y-24">
          
          {/* Model 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[#222222] text-[#F1EFE1] p-8 md:p-12 rounded-[2rem]">
            <div className="order-2 lg:order-1 flex flex-col gap-6">
              <span className="text-sm font-bold uppercase tracking-widest text-[#00F0FF] border-b-2 border-[#00F0FF] pb-2 w-max" style={{ fontFamily: "var(--font-figtree)" }}>
                Franchise
              </span>
              <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                Start an EV Charging<br/>Station Franchise
              </h2>
              <p className="text-lg text-gray-300 font-medium leading-relaxed max-w-lg" style={{ fontFamily: "var(--font-figtree)" }}>
                Partner with one of India's growing EV charging networks and launch your own EV charging station franchise through our FOCO (Franchise Owned, Company Operated) model. Investors own the charging infrastructure while we support deployment, technology integration, and operational management.
                <br/><br/>
                Set up an EV charging hub with support across site evaluation, installation, network integration, and operational monitoring, helping you participate in the growing EV charging ecosystem.
              </p>
              <a href="#" className="inline-flex items-center gap-2 font-bold uppercase tracking-widest hover:text-[#00F0FF] transition-colors mt-4 w-max border-b-2 border-transparent hover:border-[#00F0FF] pb-1" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                Learn More <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-[4/3] bg-black overflow-hidden rounded-2xl shadow-xl">
                <img 
                  src="https://d3orevttu06iqr.cloudfront.net/website/partner_with_us/Franchise1.webp" 
                  alt="Franchise" 
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-all duration-700 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Model 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[#222222] text-[#F1EFE1] p-8 md:p-12 rounded-[2rem]">
            <div className="order-1 lg:order-1">
              <div className="aspect-[4/3] bg-black overflow-hidden rounded-2xl shadow-xl">
                <img 
                  src="https://d3orevttu06iqr.cloudfront.net/website/partner_with_us/Franchise2.webp" 
                  alt="Destination Charging" 
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-all duration-700 cursor-pointer"
                />
              </div>
            </div>
            <div className="order-2 lg:order-2 flex flex-col gap-6 lg:pl-12">
              <span className="text-sm font-bold uppercase tracking-widest text-[#00F0FF] border-b-2 border-[#00F0FF] pb-2 w-max" style={{ fontFamily: "var(--font-figtree)" }}>
                Destination and Commercial charging
              </span>
              <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                Offer EV charging as an<br/>amenity at your property
              </h2>
              <p className="text-lg text-gray-300 font-medium leading-relaxed max-w-lg" style={{ fontFamily: "var(--font-figtree)" }}>
                Make the most of your parking space and attract premium customers with India's largest EV charging network. Modernize your amenities by setting up an EV charging station at your property.
              </p>
              <a href="#request-form" className="inline-flex items-center gap-2 font-bold uppercase tracking-widest hover:text-[#00F0FF] transition-colors mt-4 w-max border-b-2 border-transparent hover:border-[#00F0FF] pb-1" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                Talk to an Expert <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Model 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[#222222] text-[#F1EFE1] p-8 md:p-12 rounded-[2rem]">
            <div className="order-2 lg:order-1 flex flex-col gap-6">
              <span className="text-sm font-bold uppercase tracking-widest text-[#00F0FF] border-b-2 border-[#00F0FF] pb-2 w-max" style={{ fontFamily: "var(--font-figtree)" }}>
                Products and Services
              </span>
              <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                Your investment on<br/>your terms
              </h2>
              <p className="text-lg text-gray-300 font-medium leading-relaxed max-w-lg" style={{ fontFamily: "var(--font-figtree)" }}>
                Own EV Charging stations at prime locations, which are handpicked and built by us to maximize your earnings. Invest, Own and Earn.
              </p>
              <a href="#request-form" className="inline-flex items-center gap-2 font-bold uppercase tracking-widest hover:text-[#00F0FF] transition-colors mt-4 w-max border-b-2 border-transparent hover:border-[#00F0FF] pb-1" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                Talk to an Expert <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-[4/3] bg-black overflow-hidden rounded-2xl shadow-xl">
                <img 
                  src="https://d3orevttu06iqr.cloudfront.net/website/partner_with_us/Franchise3.webp" 
                  alt="Products and Services" 
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-all duration-700 cursor-pointer"
                />
              </div>
            </div>
          </div>

        </section>

        {/* Why Partner With Us */}
        <section className="max-w-6xl mx-auto mb-32 border-t-2 border-[#222222] pt-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-16" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            Why <span className="text-[#00F0FF]">Partner</span> With Us?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="border-2 border-[#222222] bg-[#222222] text-[#F1EFE1] p-8 flex flex-col hover:bg-[#00F0FF] hover:text-[#222222] transition-colors duration-300 group rounded-[2rem]">
              <div className="flex justify-between items-start mb-12">
                <ShieldCheck className="w-10 h-10 text-[#00F0FF] group-hover:text-[#222222] transition-colors" />
                <span className="text-2xl font-bold font-mono">01</span>
              </div>
              <h3 className="text-2xl font-black uppercase mb-4" style={{ fontFamily: "'Gilroy', sans-serif" }}>Reliability</h3>
              <p className="font-medium opacity-80 leading-relaxed" style={{ fontFamily: "var(--font-figtree)" }}>
                Manufactured, designed, and made in India. Largest EV charging network and growing.
              </p>
            </div>

            {/* Card 2 */}
            <div className="border-2 border-[#222222] bg-[#222222] text-[#F1EFE1] p-8 flex flex-col hover:bg-[#00F0FF] hover:text-[#222222] transition-colors duration-300 group rounded-[2rem]">
              <div className="flex justify-between items-start mb-12">
                <Eye className="w-10 h-10 text-[#00F0FF] group-hover:text-[#222222] transition-colors" />
                <span className="text-2xl font-bold font-mono">02</span>
              </div>
              <h3 className="text-2xl font-black uppercase mb-4" style={{ fontFamily: "'Gilroy', sans-serif" }}>Transparency</h3>
              <p className="font-medium opacity-80 leading-relaxed" style={{ fontFamily: "var(--font-figtree)" }}>
                Complete visibility of your chargers and its usage through our Charging System Management Software (CSMS).
              </p>
            </div>

            {/* Card 3 */}
            <div className="border-2 border-[#222222] bg-[#222222] text-[#F1EFE1] p-8 flex flex-col hover:bg-[#00F0FF] hover:text-[#222222] transition-colors duration-300 group rounded-[2rem]">
              <div className="flex justify-between items-start mb-12">
                <Scale className="w-10 h-10 text-[#00F0FF] group-hover:text-[#222222] transition-colors" />
                <span className="text-2xl font-bold font-mono">03</span>
              </div>
              <h3 className="text-2xl font-black uppercase mb-4" style={{ fontFamily: "'Gilroy', sans-serif" }}>Feasibility</h3>
              <p className="font-medium opacity-80 leading-relaxed" style={{ fontFamily: "var(--font-figtree)" }}>
                Both Hardware and Software built in-house, means no technical pendency on any third-party vendor. End-to-end solution in-house.
              </p>
            </div>

          </div>
        </section>

        {/* FAQs Section */}
        <section className="max-w-6xl mx-auto mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="text-sm font-bold uppercase tracking-widest text-gray-500" style={{ fontFamily: "var(--font-figtree)" }}>FAQs</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight" style={{ fontFamily: "'Gilroy', sans-serif" }}>Got questions about EVs?</h2>
            <p className="text-lg text-gray-600 font-medium mb-6" style={{ fontFamily: "var(--font-figtree)" }}>Contact us if you still have any questions to make your experience smoother.</p>
            <a 
              href="/contact-us"
              className="inline-flex items-center justify-center gap-3 bg-[#222222] text-[#F1EFE1] px-6 py-3 font-bold uppercase tracking-wider hover:bg-[#00F0FF] hover:text-[#222222] transition-colors w-max"
              style={{ fontFamily: "'Gilroy', sans-serif" }}
            >
              Got More Questions?
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="lg:col-span-8 flex flex-col">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="border-b-2 border-[#222222] last:border-b-2"
              >
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                >
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-xl font-bold text-[#00F0FF] w-8">
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="text-xl md:text-2xl font-bold uppercase group-hover:text-[#00F0FF] transition-colors pr-4" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                      {faq.question}
                    </span>
                  </div>
                  <div className="flex-shrink-0">
                    {activeFaq === idx ? (
                      <Minus className="w-6 h-6 text-[#222222] group-hover:text-[#00F0FF]" />
                    ) : (
                      <Plus className="w-6 h-6 text-[#222222] group-hover:text-[#00F0FF]" />
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 pl-14 text-lg font-medium text-gray-600" style={{ fontFamily: "var(--font-figtree)" }}>
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </section>

        {/* Request Form Section */}
        <section id="request-form" className="max-w-4xl mx-auto border-2 border-[#222222] bg-[#222222] text-[#F1EFE1] p-8 md:p-12 rounded-[2rem]">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-4" style={{ fontFamily: "'Gilroy', sans-serif" }}>Request Form</h2>
            <p className="text-lg text-gray-400 font-medium" style={{ fontFamily: "var(--font-figtree)" }}>Fill out the details below and our team will get in touch.</p>
          </div>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-bold uppercase text-sm tracking-widest text-[#00F0FF]" style={{ fontFamily: "var(--font-figtree)" }}>First Name *</label>
                <input 
                  type="text" 
                  className="bg-transparent border-2 border-[#444] text-[#F1EFE1] p-4 focus:outline-none focus:border-[#00F0FF] font-medium rounded-xl"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold uppercase text-sm tracking-widest text-[#00F0FF]" style={{ fontFamily: "var(--font-figtree)" }}>Last Name *</label>
                <input 
                  type="text" 
                  className="bg-transparent border-2 border-[#444] text-[#F1EFE1] p-4 focus:outline-none focus:border-[#00F0FF] font-medium rounded-xl"
                  required
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-bold uppercase text-sm tracking-widest text-[#00F0FF]" style={{ fontFamily: "var(--font-figtree)" }}>Email Address *</label>
              <input 
                type="email" 
                className="bg-transparent border-2 border-[#444] text-[#F1EFE1] p-4 focus:outline-none focus:border-[#00F0FF] font-medium rounded-xl"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold uppercase text-sm tracking-widest text-[#00F0FF]" style={{ fontFamily: "var(--font-figtree)" }}>Phone Number *</label>
              <input 
                type="tel" 
                className="bg-transparent border-2 border-[#444] text-[#F1EFE1] p-4 focus:outline-none focus:border-[#00F0FF] font-medium rounded-xl"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold uppercase text-sm tracking-widest text-[#00F0FF]" style={{ fontFamily: "var(--font-figtree)" }}>Message / Inquiry Details</label>
              <textarea 
                rows={4}
                className="bg-transparent border-2 border-[#444] text-[#F1EFE1] p-4 focus:outline-none focus:border-[#00F0FF] font-medium resize-none rounded-xl"
              ></textarea>
            </div>

            <button 
              type="button"
              className="w-full bg-[#00F0FF] text-[#222222] py-5 text-xl font-black uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-3 mt-4 rounded-xl"
              style={{ fontFamily: "'Gilroy', sans-serif" }}
            >
              Submit Request
              <ArrowRight className="w-6 h-6" />
            </button>
          </form>
        </section>

      </div>
    </main>
  );
}
"""

with open('src/app/partner-with-us/page.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)
