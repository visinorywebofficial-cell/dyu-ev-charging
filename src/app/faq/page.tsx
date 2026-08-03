"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FAQPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What types of EV chargers does DYU offer?",
      answer: "We offer a wide range of charging solutions including AC Destination Chargers for commercial spaces, DC Ultra-Fast Highway Chargers for quick top-ups, and the Nectar Home Charger for smart residential use."
    },
    {
      question: "How to setup a EV charging station?",
      answer: "Navigate to our blog to learn more about how to set up your own EV charging station with our comprehensive guide, or contact our team through the Partner With Us page."
    },
    {
      question: "How long is the installation process?",
      answer: "The installation process typically takes between 2 to 4 weeks depending on site readiness, local permits, and grid power availability."
    },
    {
      question: "How long the warranty contract is valid for?",
      answer: "Our standard warranty covers hardware and software for up to 3 years, with options to extend through our comprehensive Annual Maintenance Contract (AMC) packages."
    },
    {
      question: "Are there Public EV Car Charging Stations in India?",
      answer: "Yes, we operate one of the largest and fastest-growing networks of public EV charging stations across major highways and cities in India."
    },
    {
      question: "How Much Does it cost to Fully Charge Your Electric Car?",
      answer: "The cost depends on your vehicle's battery capacity and the local per-unit electricity tariff, but it generally ranges from ₹200 to ₹500 for a full charge."
    },
    {
      question: "Can I monitor my EV charging sessions in real-time?",
      answer: "Absolutely. Our DYU EV Charging App allows you to locate nearby stations, check charger availability, monitor your charging sessions in real-time, and make seamless digital payments."
    },
    {
      question: "Do you support all electric vehicle models?",
      answer: "Yes, our charging stations are equipped with universally accepted connectors (such as CCS2 for fast charging and Type 2 for AC charging), making them compatible with almost all electric cars and two-wheelers in India."
    },
    {
      question: "What is the FOCO model for franchise?",
      answer: "FOCO stands for Franchise Owned, Company Operated. In this model, you invest in and own the charging infrastructure, while DYU handles the installation, technology integration, and day-to-day operations."
    },
    {
      question: "How can I contact DYU support?",
      answer: "You can reach our 24/7 customer support directly through the DYU EV App, or by visiting the Contact Us page on our website for direct email and phone support details."
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
    <main className="min-h-screen bg-white text-[#222222] pt-32 pb-24 px-4 md:px-8">
      
      {/* Header Section */}
      <section className="max-w-4xl mx-auto mb-16 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-sm font-bold tracking-widest text-gray-500 mb-4 block uppercase" style={{ fontFamily: "var(--font-figtree)" }}>
            Help & Support
          </span>
          <h1 
            className="text-4xl md:text-6xl font-black mb-6"
            style={{ fontFamily: "'Gilroy', sans-serif" }}
          >
            Frequently Asked <span className="text-gray-400">Questions</span>
          </h1>
          <p className="text-lg md:text-xl font-medium max-w-2xl mx-auto text-gray-600 leading-snug" style={{ fontFamily: "var(--font-figtree)" }}>
            Find answers to common questions about our EV charging network, products, franchises, and more.
          </p>
        </motion.div>
      </section>

      {/* FAQs List Section */}
      <section className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="dark-card bg-[#002B36] border border-[#005F73]/20 hover:border-[#005F73] hover:shadow-lg hover:shadow-[#005F73]/20 rounded-2xl p-6 transition-all duration-300 group"
            >
              <button 
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between text-left focus:outline-none"
              >
                <div className="flex items-center gap-6">
                  <span className="font-mono text-xl font-bold text-white w-8">
                    {(idx + 1).toString().padStart(2, '0')}
                  </span>
                  <span className="text-lg md:text-xl font-bold text-white group-hover:text-white transition-colors pr-4" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                    {faq.question}
                  </span>
                </div>
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#005F73] transition-colors">
                  {activeFaq === idx ? (
                    <Minus className="w-5 h-5 text-white" />
                  ) : (
                    <Plus className="w-5 h-5 text-white" />
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
                    <p className="pt-6 pl-14 text-lg font-medium text-white/90 leading-relaxed" style={{ fontFamily: "var(--font-figtree)" }}>
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="max-w-4xl mx-auto mt-24 text-center">
        <div className="dark-card bg-[#002B36] text-[#FFFFFF] p-12 rounded-[2rem] flex flex-col items-center border border-[#005F73]/20">
          <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
            <span className="text-white">Still have</span>
            <span className="text-white italic">questions?</span>
          </h2>
          <p className="text-lg font-medium text-gray-300 mb-8 max-w-lg" style={{ fontFamily: "var(--font-figtree)" }}>
            Can't find the answer you're looking for? Please contact our friendly team and we'd be happy to help.
          </p>
          <Link 
            href="/contact-us"
            className="btn-primary inline-flex items-center justify-center gap-3 bg-[#005F73] text-white px-8 py-4 text-lg font-bold tracking-wider hover:bg-[#002B36] transition-colors rounded-xl border border-white/20"
            style={{ fontFamily: "'Gilroy', sans-serif" }}
          >
            Contact Support
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </main>
  );
}
