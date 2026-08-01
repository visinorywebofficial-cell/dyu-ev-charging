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
    <main className="min-h-screen bg-[#F1EFE1] text-[#222222] pt-32 pb-24 px-4 md:px-8">
      
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
        <div className="flex flex-col border-t-2 border-[#222222]">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="border-b-2 border-[#222222]"
            >
              <button 
                onClick={() => toggleFaq(idx)}
                className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
              >
                <div className="flex items-center gap-6">
                  <span className="font-mono text-xl font-bold text-gray-400 w-8">
                    {(idx + 1).toString().padStart(2, '0')}
                  </span>
                  <span className="text-lg md:text-xl font-bold group-hover:text-gray-400 transition-colors pr-4" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                    {faq.question}
                  </span>
                </div>
                <div className="flex-shrink-0">
                  {activeFaq === idx ? (
                    <Minus className="w-6 h-6 text-[#222222] group-hover:text-gray-400" />
                  ) : (
                    <Plus className="w-6 h-6 text-[#222222] group-hover:text-gray-400" />
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

      {/* Still Have Questions CTA */}
      <section className="max-w-4xl mx-auto mt-24 text-center">
        <div className="bg-[#222222] text-[#F1EFE1] p-12 rounded-[2rem] flex flex-col items-center">
          <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
            <span className="text-white">Still have</span>
            <span className="text-[#888888] italic">questions?</span>
          </h2>
          <p className="text-lg font-medium text-gray-400 mb-8 max-w-lg" style={{ fontFamily: "var(--font-figtree)" }}>
            Can't find the answer you're looking for? Please contact our friendly team and we'd be happy to help.
          </p>
          <Link 
            href="/contact-us"
            className="inline-flex items-center justify-center gap-3 bg-[#F1EFE1] text-[#222222] px-8 py-4 text-lg font-bold tracking-wider hover:bg-gray-300 transition-colors rounded-xl"
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
