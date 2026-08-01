"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Briefcase, 
  Clock, 
  Plus,
  Minus,
  ArrowRight
} from "lucide-react";

export default function ContactUsPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "Can my platform show chargers from different networks?",
      answer: "Yes. EVlinq connects multiple networks, so chargers from different operators can be accessed through a single platform."
    },
    {
      question: "How are payments handled if multiple networks are involved?",
      answer: "Payments are streamlined through our unified wallet and billing system, ensuring a seamless transaction experience regardless of the network you use."
    },
    {
      question: "Will I still need separate agreements with different partners?",
      answer: "No, our centralized roaming hub eliminates the need for multiple bilateral agreements. You sign once and get access to the entire integrated network."
    },
    {
      question: "How do I handle issues or complaints across networks?",
      answer: "We provide a unified dashboard and a 24/7 support center that coordinates with the respective CPOs to resolve any charging issues seamlessly."
    },
    {
      question: "Which protocols or standards does EVlinq work with?",
      answer: "EVlinq is fully compliant with OCPI (Open Charge Point Interface) and OCPP protocols, ensuring wide compatibility with global and local networks."
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
    <main className="min-h-screen bg-[var(--color-cream-paper)] text-[var(--color-midnight-ink)] pt-24 pb-20 px-4 md:px-8">
      
      {/* Header Section */}
      <section className="max-w-6xl mx-auto mb-16 mt-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 
            className="text-3xl md:text-5xl font-black uppercase mb-4"
            style={{ fontFamily: "'Gilroy', sans-serif" }}
          >
            Contact <span className="text-[var(--color-smoke)]">Us</span>
          </h1>
          <p className="text-xl md:text-2xl font-medium max-w-2xl text-[var(--color-smoke)]">
            Reach our support team for queries & partnerships.
          </p>
        </motion.div>
      </section>

      {/* Main Grid: Info & Form */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-32">
        
        {/* Left Column: Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-10"
        >
          <div>
            <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
              <span className="text-[#222222]">Contact</span>
              <span className="text-[#888888] italic">Information</span>
            </h2>
            
            {/* Map */}
            <div className="w-full h-64 border-2 border-[var(--color-midnight-ink)] rounded-xl overflow-hidden relative mb-8">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2670.952773455608!2d77.09098077408808!3d28.495154990308478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1996f833586f%3A0xe5e353fb6125ba5e!2sStatiq%20Corporate%20Office!5e1!3m2!1sen!2sin!4v1723188079296!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Statiq Corporate Office"
                className="grayscale contrast-125 opacity-90" // DYU stylistic touch to map
              ></iframe>
            </div>

            {/* Info Blocks */}
            <div className="space-y-6">
              
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 bg-[var(--color-stone-mist)] rounded-full flex items-center justify-center border border-[var(--color-midnight-ink)]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-sm text-[var(--color-smoke)] mb-1">Address</h3>
                  <p className="font-medium text-lg leading-snug">
                    Building No. 9B, 3rd Floor, DLF Cyber City,<br/>
                    Gurugram, Haryana-122002, India.
                  </p>
                </div>
              </div>

              {/* Contact Us */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 bg-[var(--color-stone-mist)] rounded-full flex items-center justify-center border border-[var(--color-midnight-ink)]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-sm text-[var(--color-smoke)] mb-1">Contact Us</h3>
                  <p className="font-medium text-lg leading-snug">
                    <a href="tel:+918070743743" className="hover:underline">+91 8070743743</a>
                    <br />
                    <a href="mailto:support@statiq.in" className="hover:underline">support@statiq.in</a>
                  </p>
                </div>
              </div>

              {/* Careers */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 bg-[var(--color-stone-mist)] rounded-full flex items-center justify-center border border-[var(--color-midnight-ink)]">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-sm text-[var(--color-smoke)] mb-1">Careers</h3>
                  <p className="font-medium text-lg leading-snug">
                    <a href="mailto:careers@statiq.in" className="hover:underline">careers@statiq.in</a>
                  </p>
                </div>
              </div>

              {/* Workdays */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 bg-[var(--color-stone-mist)] rounded-full flex items-center justify-center border border-[var(--color-midnight-ink)]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-sm text-[var(--color-smoke)] mb-1">Workdays</h3>
                  <p className="font-medium text-lg leading-snug">
                    Monday - Friday<br/>
                    7:30 am - 4:30 pm
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Socials */}
          <div className="pt-6 border-t border-[var(--color-stone-mist)]">
            <h3 className="font-bold uppercase tracking-widest text-sm text-[var(--color-smoke)] mb-4">Follow us on</h3>
            <div className="flex gap-4">
              {[
                { name: "Facebook", href: "https://facebook.com", path: "M8 10h-2v3h2v7h3v-7h2.8l.2-3h-3v-2c0-.6.4-1 1-1h2v-3h-2.5c-2.5 0-3.5 1.5-3.5 3.5v2.5z" },
                { name: "Instagram", href: "https://instagram.com", path: "M12 2c2.7 0 3 .01 4.1.06 1 .05 1.6.2 1.9.4.5.2.8.4 1.1.7.3.3.5.6.7 1.1.2.4.3.9.4 1.9.05 1.1.06 1.4.06 4.1s-.01 3-.06 4.1c-.05 1-.2 1.6-.4 1.9-.2.5-.4.8-.7 1.1-.3.3-.6.5-1.1.7-.4.2-.9.3-1.9.4-1.1.05-1.4.06-4.1.06s-3-.01-4.1-.06c-1-.05-1.6-.2-1.9-.4-.5-.2-.8-.4-1.1-.7-.3-.3-.5-.6-.7-1.1-.2-.4-.3-.9-.4-1.9-.05-1.1-.06-1.4-.06-4.1s.01-3 .06-4.1c.05-1 .2-1.6.4-1.9.2-.5.4-.8.7-1.1.3-.3.6-.5 1.1-.7.4-.2.9-.3 1.9-.4C9 2.01 9.3 2 12 2zm0 2c-2.7 0-3 .01-4 .06-.9.04-1.4.2-1.7.3-.4.1-.7.3-.9.6-.3.3-.5.5-.6.9-.2.3-.3.8-.3 1.7-.05 1-.06 1.3-.06 4s.01 3 .06 4c.04.9.2 1.4.3 1.7.1.4.3.7.6.9.3.3.5.5.9.6.3.2.8.3 1.7.3 1 .05 1.3.06 4 .06s3-.01 4-.06c.9-.04 1.4-.2 1.7-.3.4-.1.7-.3.9-.6.3-.3.5-.5.6-.9.2-.3.3-.8.3-1.7.05-1 .06-1.3.06-4s-.01-3-.06-4c-.04-.9-.2-1.4-.3-1.7-.1-.4-.3-.7-.6-.9-.3-.3-.5-.5-.9-.6-.3-.2-.8-.3-1.7-.3-1-.05-1.3-.06-4-.06zM12 7c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm3.5-7.5c-.7 0-1.2.5-1.2 1.2s.5 1.2 1.2 1.2 1.2-.5 1.2-1.2-.5-1.2-1.2-1.2z" },
                { name: "Twitter", href: "https://twitter.com", path: "M22 5.8c-.8.4-1.6.6-2.5.7.9-.5 1.6-1.4 1.9-2.4-.8.5-1.8.8-2.7 1-1.6-1.7-4.3-1.8-6-.1-1.2 1.2-1.6 2.9-1.1 4.5-4.2-.2-8-2.2-10.5-5.4-1.2 2-1 4.6.5 6-1 0-1.9-.3-2.7-.7v.1c0 2.2 1.5 4.1 3.7 4.5-.8.2-1.6.3-2.4.1.6 1.9 2.3 3.2 4.3 3.2-1.8 1.4-4 2.1-6.3 1.8 2 1.3 4.4 2 6.9 2 8.3 0 13-7 12.7-13.3.9-.7 1.6-1.5 2.2-2.4z" },
                { name: "Linkedin", href: "https://linkedin.com", path: "M5 3.5C5 4.9 3.9 6 2.5 6S0 4.9 0 3.5 1.1 1 2.5 1 5 2.1 5 3.5zM5 8v14H0V8h5zm5.5 0h4.8v2.4h.1c.7-1.3 2.4-2.7 4.9-2.7 5.2 0 6.2 3.4 6.2 7.9v6.4h-5v-5.6c0-1.3-.1-3.1-1.9-3.1-1.9 0-2.2 1.5-2.2 3v5.7H10.5V8z" },
                { name: "Youtube", href: "https://youtube.com", path: "M21.6 7.6c-.2-.9-1-1.6-1.9-1.8C18 5.5 12 5.5 12 5.5s-6 0-7.7.3c-.9.2-1.7.9-1.9 1.8-.3 1.3-.3 4.1-.3 4.1s0 2.8.3 4.1c.2.9 1 1.6 1.9 1.8 1.7.3 7.7.3 7.7.3s6 0 7.7-.3c.9-.2 1.7-.9 1.9-1.8.3-1.3.3-4.1.3-4.1s0-2.8-.3-4.1zm-11.5 7v-5.4L15.3 12l-5.2 2.6z" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 flex items-center justify-center border-2 border-[var(--color-midnight-ink)] rounded-full hover:bg-[var(--color-midnight-ink)] hover:text-[var(--color-cream-paper)] transition-colors duration-300"
                  title={social.name}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bg-[var(--color-white)] p-8 md:p-12 rounded-3xl border-2 border-[var(--color-midnight-ink)] shadow-[8px_8px_0px_0px_var(--color-midnight-ink)]">
            <h2 className="text-4xl font-black tracking-tight mb-8 lowercase">
              let's get in touch.
            </h2>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm uppercase tracking-wider text-[var(--color-smoke)]">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Enter Name"
                  className="w-full bg-[var(--color-cream-paper)] border-2 border-[var(--color-midnight-ink)] rounded-xl px-4 py-4 text-lg font-medium focus:outline-none focus:ring-4 focus:ring-[var(--color-charcoal-mist)]/20 transition-all placeholder:text-[var(--color-graphite-veil)]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm uppercase tracking-wider text-[var(--color-smoke)]">
                  Email <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  placeholder="Enter Email"
                  className="w-full bg-[var(--color-cream-paper)] border-2 border-[var(--color-midnight-ink)] rounded-xl px-4 py-4 text-lg font-medium focus:outline-none focus:ring-4 focus:ring-[var(--color-charcoal-mist)]/20 transition-all placeholder:text-[var(--color-graphite-veil)]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm uppercase tracking-wider text-[var(--color-smoke)]">
                  Mobile <span className="text-red-500">*</span>
                </label>
                <input 
                  type="tel" 
                  placeholder="Enter Number"
                  maxLength={10}
                  className="w-full bg-[var(--color-cream-paper)] border-2 border-[var(--color-midnight-ink)] rounded-xl px-4 py-4 text-lg font-medium focus:outline-none focus:ring-4 focus:ring-[var(--color-charcoal-mist)]/20 transition-all placeholder:text-[var(--color-graphite-veil)]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm uppercase tracking-wider text-[var(--color-smoke)]">
                  Anything else you'd like us to know?
                </label>
                <textarea 
                  placeholder="Type your message here"
                  rows={4}
                  className="w-full bg-[var(--color-cream-paper)] border-2 border-[var(--color-midnight-ink)] rounded-xl px-4 py-4 text-lg font-medium focus:outline-none focus:ring-4 focus:ring-[var(--color-charcoal-mist)]/20 transition-all placeholder:text-[var(--color-graphite-veil)] resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full group bg-[var(--color-midnight-ink)] text-[var(--color-cream-paper)] rounded-xl px-8 py-5 font-bold text-lg flex items-center justify-between hover:bg-[var(--color-charcoal-mist)] transition-colors mt-4"
              >
                <span>Submit</span>
                <span className="w-8 h-8 rounded-full bg-[var(--color-cream-paper)]/10 flex items-center justify-center group-hover:bg-[var(--color-cream-paper)]/20 transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </button>
            </form>
          </div>
        </motion.div>
      </section>

      {/* FAQs Section */}
      <section className="max-w-4xl mx-auto pt-16 border-t-2 border-[var(--color-midnight-ink)]">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          
          <div className="md:w-1/3 shrink-0">
            <h6 className="font-bold uppercase tracking-widest text-sm text-[var(--color-smoke)] mb-4">FAQs</h6>
            <h2 className="flex flex-col gap-1 mb-6 text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
              <span className="text-[#222222]">Got questions</span>
              <span className="text-[#888888] italic">about EVs?</span>
            </h2>
            <p className="text-lg font-medium text-[var(--color-smoke)] mb-8">
              Contact us if you still have any questions to make your experience smoother.
            </p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 border-2 border-[var(--color-midnight-ink)] rounded-full px-6 py-3 font-bold hover:bg-[var(--color-midnight-ink)] hover:text-[var(--color-cream-paper)] transition-colors"
            >
              Got More Questions? <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="md:w-2/3 w-full flex flex-col gap-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index} 
                  className="border-2 border-[var(--color-midnight-ink)] rounded-2xl overflow-hidden bg-[var(--color-white)] transition-all duration-300"
                >
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-6 flex items-center justify-between text-left focus:outline-none"
                  >
                    <div className="flex items-start gap-6 pr-4">
                      <span className="font-bold text-sm text-[var(--color-graphite-veil)] mt-1 shrink-0">
                        0{index + 1}
                      </span>
                      <span className="text-xl font-bold leading-tight">
                        {faq.question}
                      </span>
                    </div>
                    <div className={`shrink-0 w-8 h-8 rounded-full border-2 border-[var(--color-midnight-ink)] flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[var(--color-midnight-ink)] text-[var(--color-cream-paper)]' : 'bg-transparent text-[var(--color-midnight-ink)]'}`}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-6 pb-6 pt-0 ml-11">
                          <p className="text-lg text-[var(--color-smoke)] leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

        </div>
      </section>

    </main>
  );
}
