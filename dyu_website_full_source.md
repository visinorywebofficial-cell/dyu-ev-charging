"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, Variants, AnimatePresence } from "framer-motion";
import { Zap, ShieldCheck, MapPin, Briefcase, Leaf, Globe, ArrowRight, ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSplitCard } from "@/components/ui/scroll-split-card";
import { LayeredStack } from "@/components/ui/layered-stack";

const FrameScrubSection = dynamic(
  () => import("@/components/FrameScrubSection").then((m) => ({ default: m.FrameScrubSection })),
  { ssr: false }
);

/* â”€â”€ COUNT UP â”€â”€ */
function CountUp({ value, suffix = "", prefix = "", duration = 2 }: { value: number; suffix?: string; prefix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.max(Math.floor((duration * 1000) / value), 15);
    const timer = setInterval(() => {
      start += 1;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(start);
    }, step);
    return () => clearInterval(timer);
  }, [inView, value, duration]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

/* â”€â”€ WORD REVEAL â”€â”€ */
function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        words.forEach((_, i) => {
          setTimeout(() => setActiveIndex(i), i * 80);
        });
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [words.length]);

  return (
    <div ref={ref} className={`word-reveal-container ${className}`}>
      {words.map((word, i) => (
        <span key={i} className={`word ${i <= activeIndex ? 'active' : ''}`}>
          {word}
        </span>
      ))}
    </div>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const testimonials = [
  { text: "Seamless experience for EV owners! DYU has completely changed the way I charge my EV. The app is super easy to use, and finding nearby stations is just a tap away.", name: "Arjun Mehta", role: "EV Owner" },
  { text: "One of the most trusted charging apps and station networks. Reliable and user-friendly, with accurate station availability and real-time updates.", name: "Kavya Nair", role: "Fleet Operator" },
  { text: "Best charging network in India. The prices are low, and the machines are reliable. If I have to travel an extra kilometer to charge with DYU, I do that without hesitation.", name: "Kabir Malhotra", role: "Daily Commuter" },
];

const wordRevealVariant = {
  hidden: { y: "120%" },
  visible: (i: number) => ({
    y: "0%",
    transition: {
      delay: i * 0.05,
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1], // Power4.out equivalent
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

export default function HomePage() {
  const images = [
    "/images/ev-vs-ice.jpg",
    "/images/green-chargers.jpg",
    "/images/solar-carport.jpg"
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const chargingSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure all ScrollTriggers refresh when mobile orientation changes
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const handleOrientationChange = () => {
      setTimeout(() => ScrollTrigger.refresh(), 200);
    };
    window.addEventListener("orientationchange", handleOrientationChange);

    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => {
      clearInterval(timer);
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, [images.length]);

  return (
    <div style={{ backgroundColor: 'var(--color-cream-paper)' }}>

      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {/* SECTION 1 â€” HERO (with background slideshow) */}
      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section 
        className="relative overflow-hidden pt-32 pb-16 md:pt-[160px] md:pb-[80px]" 
        style={{ 
          textAlign: 'center',
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Background Slideshow */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${images[currentImageIndex]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/60 z-10" />
        </div>

        <div className="container-wispr relative z-20">
          <motion.div initial="hidden" animate="visible" variants={stagger}>

            {/* Badge */}
            <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
              <span className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.4)', color: '#ffffff' }}>
                <span className="pulse-dot" style={{ background: 'var(--color-amber-pulse)' }} />
                Empowering India's EV Network
              </span>
            </motion.div>

            {/* H1 â€” Figtree */}
            <h1 style={{
              fontFamily: 'var(--font-figtree)',
              fontSize: 'clamp(40px, 5vw, 72px)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: '32px',
              maxWidth: '900px',
              margin: '0 auto 32px',
            }}>
              <SplitText text="Building the largest" color="rgba(255,255,255,0.6)" startIndex={2} />
              <SplitText text="EV charging network in India" color="#ffffff" startIndex={5} />
            </h1>

            {/* Tagline */}
            <motion.div variants={fadeUp} style={{ marginBottom: '24px' }}>
              <span style={{
                fontFamily: 'var(--font-figtree)',
                fontSize: '20px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.9)',
                textTransform: 'uppercase'
              }}>
                POWER, DELIVERED.
              </span>
            </motion.div>

            {/* Sub */}
            <p style={{
              fontFamily: 'var(--font-figtree)',
              fontSize: '18px',
              color: 'rgba(255,255,255,0.8)',
              maxWidth: '520px',
              margin: '0 auto 40px',
              lineHeight: 1.6,
            }}>
              <SplitText text="Reliable, fast and accessible charging â€” anywhere you go." startIndex={10} />
            </p>

            {/* CTAs */}
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/ev-charging-station-franchise" className="btn-primary">
                Get Franchise <ArrowRight size={14} />
              </Link>
              <Link href="/dc-chargers" className="btn-ghost" style={{ color: '#ffffff', borderColor: '#ffffff' }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.color = 'var(--color-midnight-ink)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#ffffff';
                }}
              >
                View Chargers
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats row with white borders and text */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{
              borderTop: '1px solid rgba(255,255,255,0.2)',
              borderBottom: '1px solid rgba(255,255,255,0.2)',
              marginTop: '80px',
            }}
            className="grid grid-cols-2 md:grid-cols-4"
          >
            {[
              { value: 10000, suffix: '+', label: 'EV Chargers' },
              { value: 1014, suffix: '+', label: 'Cities Across India' },
              { value: 99, suffix: '%', label: 'Uptime Reliability' },
              { value: 100, suffix: ' Cr+', label: 'KM Powered' },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeUp} 
                className={`p-6 md:p-10 text-center border-white/20 transition-colors duration-300 ${
                  i % 2 === 0 ? 'border-r' : ''
                } ${
                  i < 3 ? 'md:border-r' : ''
                } ${
                  i < 2 ? 'border-b md:border-b-0' : ''
                }`}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'none')}
              >
                <div style={{ fontFamily: 'var(--font-figtree)', fontSize: '48px', fontWeight: 700, color: '#ffffff', lineHeight: 1 }}>
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <div style={{ fontFamily: 'var(--font-figtree)', fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {/* SECTION 2 â€” WORD REVEAL (cream) */}
      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="section-light" style={{ borderTop: '1px solid var(--color-stone-mist)' }}>
        <div className="container-wispr" style={{ maxWidth: '900px' }}>
          <WordReveal
            text="Building the infrastructure that powers India's electric future â€” one charging station at a time. From highways to high streets, DYU puts clean energy exactly where India drives."
            className=""
          />
          <style>{`
            .word-reveal-container {
              font-family: var(--font-figtree);
              font-size: clamp(24px, 6vw, 56px);
              font-weight: 400;
              line-height: 1.2;
              letter-spacing: -0.03em;
              color: var(--color-midnight-ink);
            }
          `}</style>
        </div>
      </section>

      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {/* SECTION 3 â€” SCROLL SCRUB FRAME ANIMATION     */}
      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <FrameScrubSection />

      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {/* SECTION 4 â€” PRODUCTS (ScrollSplitCard) */}
      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="w-full">
        <ScrollSplitCard
          imageSrc="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2832&auto=format&fit=crop"
          cards={[
            {
              title: "Home Charging",
              description: "Nectar home EV chargers 7.4kW, 11kW, 22kW. Portable 3.3kW & 7.4kW. Safe overnight charging at home or office.",
              bgColor: "#222222",
              textColor: "#F1EFE1"
            },
            {
              title: "DC Fast Charging",
              description: "Configurable DC Fast Chargers 60kW to 360kW. Built for highways, commercial hubs, and fleets across India.",
              bgColor: "#1a1a1a",
              textColor: "#F1EFE1"
            },
            {
              title: "Public Network",
              description: "Find chargers instantly via app. Live status, one-tap start, seamless payment. 1,014+ cities and growing.",
              bgColor: "#2a2820",
              textColor: "#F1EFE1"
            }
          ]}
        />
      </div>

      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {/* SECTION 4 â€” IMPACT (cream) */}
      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="section-light">
        <div className="container-wispr">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="badge badge-outline" style={{ marginBottom: '24px' }}>Our Impact</span>
              <h2 style={{ fontFamily: 'var(--font-figtree)', fontSize: 'clamp(40px, 4vw, 56px)', fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--color-midnight-ink)', lineHeight: 1.1, marginBottom: '24px', margin: '0 0 24px' }}>
                Every charge <br /><em style={{ color: 'var(--color-graphite-veil)' }}>makes a difference</em>
              </h2>
              <p style={{ fontFamily: 'var(--font-figtree)', fontSize: '16px', color: 'var(--color-smoke)', lineHeight: 1.7, marginBottom: '40px' }}>
                What if every charge made a difference? We exist to make cities greener and more connected through accessible EV charging â€” creating impact both environmentally and socially.
              </p>
              {[
                { Icon: Leaf, title: 'Environmental Impact', desc: 'Reduced emissions, cleaner air. Renewable integration reduces carbon footprint. EV adoption lowers urban noise.' },
                { Icon: Globe, title: 'Social Impact', desc: 'Higher EV adoption through an accessible network. Job creation in green economy. Economic boost for local businesses.' },
              ].map(({ Icon, title, desc }) => (
                <div key={title} style={{ display: 'flex', gap: '16px', marginBottom: '28px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--color-stone-mist)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={18} color="var(--color-midnight-ink)" />
                  </div>
                  <div>
                    <h5 style={{ fontFamily: 'var(--font-figtree)', fontSize: '15px', fontWeight: 700, color: 'var(--color-midnight-ink)', marginBottom: '4px' }}>{title}</h5>
                    <p style={{ fontFamily: 'var(--font-figtree)', fontSize: '14px', color: 'var(--color-smoke)', lineHeight: 1.6 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <LayeredStack className="w-full max-w-[920px] grid grid-cols-2 gap-3 p-0 md:gap-4 md:p-8">

              {/* Card 1 â€” Cleaner Air */}
              <div className="relative overflow-hidden rounded-3xl aspect-[250/320] shadow-xl group">
                <img
                  src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=800&auto=format&fit=crop"
                  alt="Cleaner Air â€” EV charging reduces emissions"
                  className="object-cover w-full h-full opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5 z-10">
                  <p className="text-[#F1EFE1] font-semibold text-base tracking-tight">Cleaner Air</p>
                </div>
              </div>

              {/* Card 2 â€” Green Jobs */}
              <div className="relative overflow-hidden rounded-3xl aspect-[250/320] shadow-xl group mt-12">
                <img
                  src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop"
                  alt="Green Jobs â€” Clean energy workforce"
                  className="object-cover w-full h-full opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5 z-10">
                  <p className="text-[#F1EFE1] font-semibold text-base tracking-tight">Green Jobs</p>
                </div>
              </div>

              {/* Card 3 â€” Secure Network */}
              <div className="relative overflow-hidden rounded-3xl aspect-[250/320] shadow-xl group">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop"
                  alt="Secure Network â€” Reliable EV charging infrastructure"
                  className="object-cover w-full h-full opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5 z-10">
                  <p className="text-[#F1EFE1] font-semibold text-base tracking-tight">Secure Network</p>
                </div>
              </div>

              {/* Card 4 â€” Smart Ops */}
              <div className="relative overflow-hidden rounded-3xl aspect-[250/320] shadow-xl group mt-12">
                <img
                  src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=800&auto=format&fit=crop"
                  alt="Smart Operations â€” EV charging station technology"
                  className="object-cover w-full h-full opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5 z-10">
                  <p className="text-[#F1EFE1] font-semibold text-base tracking-tight">Smart Ops</p>
                </div>
              </div>

            </LayeredStack>
          </div>
        </div>
      </section>

      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {/* SECTION 5 â€” PARTNER CTA (teal) */}
      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="section-teal">
        <div className="container-wispr" style={{ textAlign: 'center' }}>
          <span className="badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', marginBottom: '32px' }}>B2B & Franchise</span>
          <h2 style={{ fontFamily: 'var(--font-figtree)', fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.04em', lineHeight: 1, maxWidth: '700px', margin: '0 auto 24px' }}>
            Turn your space into a <em>revenue stream</em>
          </h2>
          <p style={{ fontFamily: 'var(--font-figtree)', fontSize: '18px', color: 'rgba(255,255,255,0.75)', maxWidth: '500px', margin: '0 auto 40px', lineHeight: 1.6 }}>
            Join India's fastest-growing EV charging network. Full-ownership or FOCO model â€” DYU provides end-to-end support.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/ev-charging-station-franchise" className="btn-primary">
              Explore Franchise â†’
            </Link>
            <a href="https://wa.me/919949055516" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }}>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {/* SECTION 6 â€” TESTIMONIALS (cream) */}
      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="section-light">
        <div className="container-wispr">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontFamily: 'var(--font-figtree)', fontSize: 'clamp(40px, 4vw, 56px)', fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--color-midnight-ink)', lineHeight: 1 }}>
              <span style={{ color: 'var(--color-graphite-veil)' }}>Loved by </span>EV drivers
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
                className="card-wispr"
              >
                <div style={{ fontFamily: 'var(--font-figtree)', fontSize: '48px', color: 'var(--color-stone-mist)', lineHeight: 1, marginBottom: '16px' }}>"</div>
                <p style={{ fontFamily: 'var(--font-figtree)', fontSize: '15px', color: 'var(--color-smoke)', lineHeight: 1.7, marginBottom: '24px' }}>{t.text}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid var(--color-stone-mist)', paddingTop: '20px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-deep-forest-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'var(--font-figtree)', fontWeight: 700, fontSize: '14px' }}>
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h5 style={{ fontFamily: 'var(--font-figtree)', fontSize: '14px', fontWeight: 600, color: 'var(--color-midnight-ink)' }}>{t.name}</h5>
                    <p style={{ fontFamily: 'var(--font-figtree)', fontSize: '12px', color: 'var(--color-graphite-veil)' }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "DYU â€” Power, Delivered.",
  description: "Building the largest network of EV chargers in India. Reliable, fast and accessible charging â€” anywhere you go.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("h-full antialiased", "font-sans", geist.variable)}>

      <body
        style={{
          backgroundColor: 'var(--color-cream-paper)',
          color: 'var(--color-midnight-ink)',
          fontFamily: 'var(--font-figtree)',
        }}
        className="min-h-full flex flex-col"
      >
        {/* Announcement Banner â€” Deep Forest Teal */}
        <div className="announcement-banner">
          âš¡ DYU is expanding across India â€” Secure your EV charging franchise location today â†’
        </div>

        <Navbar />

        <SmoothScrollProvider>
          <main className="flex-1">
            {children}
          </main>
        </SmoothScrollProvider>

        {/* FOOTER â€” Dark gray bg, Light text */}
        <footer style={{ backgroundColor: '#222222', borderTop: 'none' }} className="py-16">
          <div className="container-wispr">
            {/* Top row */}
            <div className="flex flex-col md:flex-row items-start justify-between gap-12 pb-12" style={{ borderBottom: '1px solid #333333' }}>
              
              {/* Brand */}
              <div className="flex flex-col gap-4 max-w-xs">
                <div className="flex flex-col gap-1">
                  <div style={{ fontFamily: 'var(--font-figtree)', fontSize: '32px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1 }}>
                    DYU
                  </div>
                  <div style={{ fontFamily: 'var(--font-figtree)', fontSize: '13px', fontWeight: 700, color: '#e5e5e5', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                    Power, Delivered.
                  </div>
                </div>
                <p style={{ fontFamily: 'var(--font-figtree)', fontSize: '14px', color: '#a3a3a3', lineHeight: 1.5 }}>
                  Building India's most reliable EV charging network â€” one station at a time.
                </p>
                <a href="https://wa.me/919949055516" style={{ fontFamily: 'var(--font-figtree)', fontSize: '14px', fontWeight: 600, color: '#a7f3d0' }}>
                  ðŸ“ž +91 99490 55516
                </a>
              </div>

              {/* Links */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { heading: 'Solutions', links: ['Mobile App', 'CSMS', 'EVlinq'] },
                  { heading: 'Products', links: ['DC Chargers', 'AC Chargers', 'Nectar', 'Adwall', 'Portable Charger'] },
                  { heading: 'Discover', links: ['EV Calculator', 'Savings Calculator', 'Blogs'] },
                  { heading: 'Company', links: ['About Us', 'Contact Us', 'Partner With Us', 'Franchise'] },
                ].map((col) => (
                  <div key={col.heading}>
                    <p style={{ fontFamily: 'var(--font-figtree)', fontSize: '12px', fontWeight: 700, color: '#737373', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
                      {col.heading}
                    </p>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {col.links.map((link) => (
                        <li key={link}>
                          <a href="#" className="footer-link" style={{ color: '#a3a3a3' }}>
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom row */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
              <p style={{ fontFamily: 'var(--font-figtree)', fontSize: '13px', color: '#737373' }}>
                Â© {new Date().getFullYear()} DYU. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                {['Privacy Policy', 'Terms of Service'].map((item) => (
                  <a key={item} href="#" style={{ fontFamily: 'var(--font-figtree)', fontSize: '13px', color: '#737373', textDecoration: 'none' }}>
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;1,400&family=Figtree:wght@400;500;600;700&display=swap');
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme {
  /* â”€â”€ COLORS â”€â”€ */
  --color-cream-paper: #ffffeb;
  --color-midnight-ink: #1a1a1a;
  --color-pure-black: #000000;
  --color-white: #ffffff;
  --color-stone-mist: #e4e4d0;
  --color-graphite-veil: #8a8a80;
  --color-smoke: #5f5f59;
  --color-charcoal: #222222;
  --color-charcoal-mist: #333333;
  --color-deep-forest-teal: #034f46;
  --color-lavender-whisper: #f0d7ff;
  --color-amber-pulse: #ffa946;

  /* Semantic aliases */
  --color-background: #ffffeb;
  --color-foreground: #1a1a1a;
  --color-primary: #034f46;
  --color-accent: #f0d7ff;
  --color-border: #e4e4d0;
  --color-muted: #8a8a80;

  /* â”€â”€ TYPOGRAPHY â”€â”€ */
  --font-figtree: 'Figtree', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-eb-garamond: 'EB Garamond', 'Cormorant Garamond', 'Playfair Display', 'Lora', Georgia, serif;
  --font-sans: var(--font-figtree);
  --font-display: var(--font-figtree);
  --font-mono: var(--font-figtree);

  /* â”€â”€ TYPE SCALE â”€â”€ */
  --text-caption: 14px;
  --leading-caption: 1.3;
  --text-body: 16px;
  --leading-body: 1.3;
  --text-subheading: 20px;
  --leading-subheading: 1.3;
  --text-heading-sm: 24px;
  --leading-heading-sm: 1;
  --text-heading: 32px;
  --leading-heading: 1;
  --text-heading-lg: 48px;
  --leading-heading-lg: 0.95;
  --tracking-heading-lg: -0.07em;
  --text-display: 64px;
  --leading-display: 0.95;
  --tracking-display: -0.05em;
  --text-display-xl: 120px;
  --leading-display-xl: 0.85;
  --tracking-display-xl: -0.13em;

  /* â”€â”€ WEIGHTS â”€â”€ */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* â”€â”€ SPACING â”€â”€ */
  --spacing-unit: 8px;
  --spacing-8: 8px;
  --spacing-16: 16px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-56: 56px;
  --spacing-64: 64px;
  --spacing-80: 80px;
  --spacing-96: 96px;
  --spacing-104: 104px;
  --spacing-128: 128px;
  --spacing-168: 168px;
  --spacing-224: 224px;

  /* â”€â”€ LAYOUT â”€â”€ */
  --page-max-width: 1200px;
  --section-gap: 80px;
  --card-padding: 32px;

  /* â”€â”€ BORDER RADIUS â”€â”€ */
  --radius-sm: 8px;
  --radius-nav: 14px;
  --radius-buttons: 14px;
  --radius-cards: 32px;
  --radius-images: 40px;
  --radius-badges: 1000px;
  --radius-orbs: 1600px;

  /* â”€â”€ SURFACES â”€â”€ */
  --surface-base: #ffffeb;
  --surface-nav: #ffffff;
  --surface-muted: #e4e4d0;
  --surface-accent: #f0d7ff;
  --surface-teal: #034f46;
  --surface-dark: #1a1a1a;
}

:root {
  --color-cream-paper: #ffffeb;
  --color-midnight-ink: #1a1a1a;
  --color-pure-black: #000000;
  --color-white: #ffffff;
  --color-stone-mist: #e4e4d0;
  --color-graphite-veil: #8a8a80;
  --color-smoke: #5f5f59;
  --color-charcoal: #222222;
  --color-charcoal-mist: #333333;
  --color-deep-forest-teal: #034f46;
  --color-lavender-whisper: #f0d7ff;
  --color-amber-pulse: #ffa946;
  --font-figtree: 'Figtree', ui-sans-serif, system-ui, sans-serif;
  --font-eb-garamond: 'EB Garamond', Georgia, serif;
  --text-display-xl: 120px;
  --leading-display-xl: 0.85;
  --tracking-display-xl: -0.13em;
  --text-display: 64px;
  --leading-display: 0.95;
  --tracking-display: -0.05em;
  --text-heading-lg: 48px;
  --leading-heading-lg: 0.95;
  --tracking-heading-lg: -0.07em;
  --text-heading: 32px;
  --leading-heading: 1;
  --text-heading-sm: 24px;
  --leading-heading-sm: 1;
  --text-subheading: 20px;
  --leading-subheading: 1.3;
  --text-body: 16px;
  --leading-body: 1.3;
  --text-caption: 14px;
  --leading-caption: 1.3;
  --radius-nav: 14px;
  --radius-buttons: 14px;
  --radius-cards: 32px;
  --radius-images: 40px;
  --radius-badges: 1000px;
  --radius-orbs: 1600px;
  --page-max-width: 1200px;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

/* â”€â”€ BASE RESET â”€â”€ */
body {
  background-color: var(--color-cream-paper);
  color: var(--color-midnight-ink);
  font-family: var(--font-figtree);
  font-size: var(--text-body);
  line-height: var(--leading-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* â”€â”€ DISPLAY HEADLINES â€” EB GARAMOND ONLY â”€â”€ */
/* Rule: EB Garamond ONLY at 32px and above. Never on body/UI text. */
h1 {
  font-family: var(--font-figtree);
  font-size: clamp(64px, 9vw, 120px);
  font-weight: 700;
  line-height: var(--leading-display-xl);
  letter-spacing: var(--tracking-display-xl);
}

h2 {
  font-family: var(--font-figtree);
  font-size: clamp(48px, 5vw, 64px);
  font-weight: 700;
  line-height: var(--leading-display);
  letter-spacing: var(--tracking-display);
}

h3 {
  font-family: var(--font-figtree);
  font-size: 48px;
  font-weight: 700;
  line-height: var(--leading-heading-lg);
  letter-spacing: var(--tracking-heading-lg);
}

h4 {
  font-family: var(--font-figtree);
  font-size: var(--text-heading-sm);
  font-weight: 700;
  line-height: var(--leading-heading-sm);
}

h5, h6 {
  font-family: var(--font-figtree);
  font-size: var(--text-body);
  font-weight: 600;
}

p, span, li, a, label, input, textarea, select, button, td, th {
  font-family: var(--font-figtree);
}

/* â”€â”€ TWO-TONE HEADLINE (Wispr Flow signature) â”€â”€ */
.headline-two-tone .muted {
  color: var(--color-graphite-veil);
}
.headline-two-tone .strong {
  color: var(--color-midnight-ink);
}

/* â”€â”€ DARK SECTION OVERRIDES â”€â”€ */
.section-dark {
  background-color: var(--color-midnight-ink);
  color: var(--color-white);
}
.section-dark h1,
.section-dark h2,
.section-dark h3 {
  color: var(--color-white);
}
.section-dark p {
  color: rgba(255,255,255,0.7);
}

/* â”€â”€ TEAL SECTION â”€â”€ */
.section-teal {
  background-color: var(--color-deep-forest-teal);
  color: var(--color-white);
}

/* â”€â”€ ANNOUNCEMENT BANNER â”€â”€ */
.announcement-banner {
  background-color: var(--color-deep-forest-teal);
  color: var(--color-white);
  font-family: var(--font-figtree);
  font-size: 14px;
  font-weight: 500;
  padding: 10px 24px;
  text-align: center;
  width: 100%;
}

/* â”€â”€ NAVIGATION BAR â”€â”€ */
.nav-wispr {
  background: var(--color-white);
  border: 1px solid var(--color-stone-mist);
  border-radius: var(--radius-nav);
  padding: 8px 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.nav-link {
  font-family: var(--font-figtree);
  font-size: 14px;
  font-weight: 500;
  color: var(--color-midnight-ink);
  text-decoration: none;
  transition: opacity 0.2s ease;
}
.nav-link:hover { opacity: 0.65; }

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: var(--color-lavender-whisper);
  color: var(--color-midnight-ink);
  border: 1px solid var(--color-midnight-ink);
  border-radius: var(--radius-buttons);
  padding: 10px 18px;
  font-family: var(--font-figtree);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: color 0.4s cubic-bezier(0.19, 1, 0.22, 1), border-color 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  text-decoration: none;
  z-index: 1;
}

/* RULE: Only ONE lavender button per view. Never use lavender for backgrounds. */

/* â”€â”€ SECONDARY GHOST BUTTON â”€â”€ */
.btn-ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: transparent;
  color: var(--color-midnight-ink);
  border: 1px solid var(--color-midnight-ink);
  border-radius: var(--radius-buttons);
  padding: 10px 18px;
  font-family: var(--font-figtree);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: color 0.4s cubic-bezier(0.19, 1, 0.22, 1), border-color 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  text-decoration: none;
  z-index: 1;
}

/* Dark section ghost button */
.section-dark .btn-ghost {
  color: var(--color-white);
  border-color: var(--color-white);
}
.section-dark .btn-ghost:hover {
  background: var(--color-white);
  color: var(--color-midnight-ink);
}

/* â”€â”€ PLATFORM PILL â”€â”€ */
.btn-platform {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: 1px solid var(--color-midnight-ink);
  border-radius: var(--radius-badges);
  padding: 8px 16px;
  font-family: var(--font-figtree);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
}
.btn-platform:hover {
  background: var(--color-stone-mist);
}

/* â”€â”€ FEATURE CARD â”€â”€ */
.card-wispr {
  background: var(--color-cream-paper);
  border: 1px solid var(--color-stone-mist);
  border-radius: var(--radius-cards);
  padding: var(--card-padding);
  transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}
.card-wispr:hover {
  border-color: var(--color-graphite-veil);
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.08);
}

/* â”€â”€ BADGE / TAG â”€â”€ */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: var(--radius-badges);
  padding: 6px 14px;
  font-family: var(--font-figtree);
  font-size: 12px;
  font-weight: 500;
}
.badge-teal {
  background: var(--color-deep-forest-teal);
  color: var(--color-white);
}
.badge-outline {
  border: 1px solid var(--color-midnight-ink);
  color: var(--color-midnight-ink);
}
.badge-amber {
  background: var(--color-amber-pulse);
  color: var(--color-midnight-ink);
}

/* â”€â”€ UNDERLINE ACCENT (Lavender) â”€â”€ */
.underline-accent {
  position: relative;
  display: inline-block;
}
.underline-accent::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 5px;
  background: var(--color-lavender-whisper);
  border-radius: 4px;
}

/* â”€â”€ DECORATIVE ORB â”€â”€ */
.orb {
  border-radius: var(--radius-orbs);
  background: var(--color-midnight-ink);
}
.orb-lavender {
  background: var(--color-lavender-whisper);
}

/* â”€â”€ WORD REVEAL ANIMATION â”€â”€ */
.word-reveal-container .word {
  opacity: 0.15;
  transition: opacity 0.4s ease;
  display: inline-block;
  margin-right: 0.25em;
}
.word-reveal-container .word.active {
  opacity: 1;
}

/* â”€â”€ SECTION RHYTHM (cream â†’ dark â†’ cream â†’ teal â†’ cream) â”€â”€ */
.section-light {
  background-color: var(--color-cream-paper);
  color: var(--color-midnight-ink);
  padding: var(--section-gap) 0;
}
.section-dark {
  background-color: var(--color-midnight-ink);
  color: var(--color-white);
  padding: var(--section-gap) 0;
}
.section-teal {
  background-color: var(--color-deep-forest-teal);
  color: var(--color-white);
  padding: 64px 0;
}

/* â”€â”€ LAYOUT CONTAINER â”€â”€ */
.container-wispr {
  max-width: var(--page-max-width);
  margin: 0 auto;
  padding: 0 16px;
}
@media (min-width: 768px) {
  .container-wispr {
    padding: 0 24px;
  }
}

/* â”€â”€ SCROLLING MARQUEE â”€â”€ */
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.marquee-track {
  display: flex;
  width: 200%;
  animation: marquee 25s linear infinite;
}
.marquee-track:hover {
  animation-play-state: paused;
}

/* â”€â”€ SCAN LINE PROGRESS BAR â”€â”€ */
.scan-line-bar {
  position: relative;
  height: 2px;
  background: var(--color-stone-mist);
  overflow: hidden;
}
.scan-line-bar::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: #3b82f6;
  animation: scanline 2s infinite cubic-bezier(0.8, 0, 0.2, 1);
}
@keyframes scanline {
  0% { left: -100%; }
  100% { left: 200%; }
}

/* â”€â”€ WISPR FLOW ANIMATIONS â”€â”€ */
/* Hero badge pulse dot */
@keyframes wispr-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}
.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-deep-forest-teal);
  animation: wispr-pulse 2s ease-in-out infinite;
  display: inline-block;
}

/* â”€â”€ FAQ ACCORDION â”€â”€ */
.faq-item {
  border-top: 1px solid var(--color-stone-mist);
}
.faq-item:last-child {
  border-bottom: 1px solid var(--color-stone-mist);
}
.faq-question {
  font-family: var(--font-figtree);
  font-size: 16px;
  font-weight: 600;
  color: var(--color-midnight-ink);
  cursor: pointer;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.faq-answer {
  font-family: var(--font-figtree);
  font-size: 16px;
  color: var(--color-smoke);
  line-height: 1.6;
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.3s ease;
  max-height: 0;
  padding-bottom: 0;
}
.faq-item.open .faq-answer {
  max-height: 500px;
  padding-bottom: 20px;
}
.faq-toggle {
  color: var(--color-deep-forest-teal);
  font-size: 20px;
  font-weight: 700;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}
.faq-item.open .faq-toggle {
  transform: rotate(45deg);
}

/* â”€â”€ FOOTER LINKS â”€â”€ */
.footer-link {
  font-family: var(--font-figtree);
  font-size: 14px;
  color: #e5e5e5;
  text-decoration: none;
  opacity: 0.75;
  transition: opacity 0.2s ease;
}
.footer-link:hover {
  opacity: 1;
}

.animated-btn-hover:hover .btn-text-wrap { transform: translateY(-100%); }

/* â”€â”€ TRITIUM CTA ANIMATIONS (APPLIED GLOBALLY TO OVERRIDE INLINES) â”€â”€ */
.btn-primary, .btn-ghost, a[href="/shop"].md\:inline-flex, a[href="/shop"].hidden {
  position: relative !important;
  overflow: hidden !important;
  z-index: 1 !important;
  transition: color 0.4s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.4s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.4s cubic-bezier(0.25, 1, 0.5, 1) !important;
}
.btn-primary::before, .btn-ghost::before, a[href="/shop"].md\:inline-flex::before, a[href="/shop"].hidden::before {
  content: "" !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background-color: var(--color-midnight-ink) !important;
  transform: translateX(-101%) !important;
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1) !important;
  z-index: -1 !important;
}
.btn-primary:hover::before, .btn-ghost:hover::before, a[href="/shop"].md\:inline-flex:hover::before, a[href="/shop"].hidden:hover::before {
  transform: translateX(0) !important;
}
.btn-primary:hover, .btn-ghost:hover, a[href="/shop"].md\:inline-flex:hover, a[href="/shop"].hidden:hover {
  color: var(--color-white) !important;
  background-color: transparent !important;
  border-color: var(--color-midnight-ink) !important;
}
.btn-primary svg, .btn-ghost svg, a[href="/shop"].md\:inline-flex svg, a[href="/shop"].hidden svg {
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1) !important;
}
.btn-primary:hover svg, .btn-ghost:hover svg, a[href="/shop"].md\:inline-flex:hover svg, a[href="/shop"].hidden:hover svg {
  transform: translateX(4px) !important;
}

@theme inline {
  --font-heading: var(--font-sans);
  --font-sans: var(--font-sans);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --color-foreground: var(--foreground);
  --color-background: var(--background);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
  html {
    @apply font-sans;
  }
}
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  ChevronRight,
  Menu, 
  X, 
  Zap,
  Smartphone,
  Monitor,
  Globe,
  BatteryCharging,
  ShoppingBag,
  Home,
  Cable,
  Tv,
  Info,
  PhoneCall,
  HelpCircle,
  Calculator,
  BookOpen
} from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } }
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

interface MegaMenuItemProps {
  label: string;
  desc: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  onClick: () => void;
  isProduct?: boolean;
}

function MegaMenuItem({ label, desc, href, icon: Icon, onClick, isProduct }: MegaMenuItemProps) {
  return (
    <motion.div variants={itemVariants}>
      <Link 
        href={href} 
        onClick={onClick}
        className="flex gap-4 p-3 -m-3 rounded-xl hover:bg-[#f5f5f0] transition-colors duration-200 group"
      >
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--color-stone-mist)] flex items-center justify-center text-[var(--color-deep-forest-teal)] group-hover:bg-[var(--color-deep-forest-teal)] group-hover:text-white transition-colors duration-200">
          <Icon size={20} />
        </div>
        <div>
          <div className={`font-semibold text-[15px] text-[#333333] mb-1 flex items-center gap-1 group-hover:text-[var(--color-deep-forest-teal)] transition-colors duration-200`}>
            {label}
            <ChevronRight size={14} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
          </div>
          <p className="text-xs text-[var(--color-smoke)] leading-relaxed">
            {desc}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  // Escape key listener to close mega menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleDropdown = (menu: string) => {
    if (activeDropdown === menu) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menu);
    }
  };

  const softwareItems = [
    { label: "EV Charging App", desc: "Find charging stations, pay, and monitor in real-time.", href: "/ev-charging-app", icon: Smartphone },
    { label: "CSMS Platform", desc: "Enterprise management system for your charging network.", href: "/csms", icon: Monitor },
    { label: "EV Linq Roaming Hub", desc: "Interoperable roaming hub to connect with other networks.", href: "/ev-linq", icon: Globe }
  ];

  const hardwareItems = [
    { label: "AC Chargers", desc: "Reliable charging for homes, offices, and destinations.", href: "/ac-chargers", icon: BatteryCharging },
    { label: "DC Chargers", desc: "Ultra-fast highway charging from 60kW to 360kW.", href: "/dc-chargers", icon: Zap },
    { label: "Nectar Home Charger", desc: "Smart home charger with auto-schedule.", href: "/nectar", icon: Home },
    { label: "Portable Charger", desc: "Convenient, plug-and-play charging on the go.", href: "/portable-charger", icon: Cable },
    { label: "AdWall", desc: "Smart charging integrated with advertising screens.", href: "/adwall", icon: Tv }
  ];

  const companyItems = [
    { label: "About DYU", desc: "Building the largest green energy network in India.", href: "/about-us", icon: Info },
    { label: "Contact Us", desc: "Get in touch with our support and sales teams.", href: "/contact-us", icon: PhoneCall },
    { label: "FAQ", desc: "Frequently asked questions about our services.", href: "/faq", icon: HelpCircle }
  ];

  const resourceItems = [
    { label: "EV Calculator", desc: "Estimate your savings and charging times easily.", href: "/calculator", icon: Calculator },
    { label: "Blogs", desc: "Latest insights, news, and trends in the EV industry.", href: "/blog", icon: BookOpen }
  ];

  const headerStyle = {
    background: scrolled ? 'rgba(26, 26, 26, 0.92)' : 'var(--color-white)',
    color: scrolled ? 'var(--color-white)' : 'var(--color-midnight-ink)',
    borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid var(--color-stone-mist)',
    backdropFilter: scrolled ? 'blur(12px)' : 'none',
    transition: 'background 0.3s ease, color 0.3s ease, border-bottom 0.3s ease, backdrop-filter 0.3s ease',
  };

  return (
    <>
      <header 
        style={headerStyle} 
        className="fixed top-0 left-0 right-0 z-50 w-full"
      >
        <div 
          className="max-w-[1200px] mx-auto px-6 flex items-center justify-between"
          style={{
            height: '56px',
            paddingTop: '8px',
            paddingBottom: '8px',
          }}
        >
          {/* Logo (Gilroy style font) */}
          <Link 
            href="/" 
            className="flex items-center gap-2 group" 
            onClick={() => setActiveDropdown(null)}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            {/* Logo icon removed as requested */}
            <span 
              className="font-sans font-black text-xl uppercase tracking-tight"
              style={{
                fontFamily: 'var(--font-figtree), sans-serif'
              }}
            >
              DYU
            </span>
          </Link>

          {/* Center Links â€” Products/Discover/Franchise/FAQ */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => toggleDropdown('products')}
              className="flex items-center gap-1 text-[12px] font-medium py-1.5 px-3 rounded-lg cursor-pointer transition-colors duration-200"
              style={{
                color: activeDropdown === 'products' ? 'var(--color-deep-forest-teal)' : 'inherit',
                background: activeDropdown === 'products' ? (scrolled ? 'rgba(255,255,255,0.15)' : '#f5f5f0') : 'transparent'
              }}
            >
              Products
              <ChevronDown size={12} className={`transition-transform duration-200 ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
            </button>

            <button
              onClick={() => toggleDropdown('discover')}
              className="flex items-center gap-1 text-[12px] font-medium py-1.5 px-3 rounded-lg cursor-pointer transition-colors duration-200"
              style={{
                color: activeDropdown === 'discover' ? 'var(--color-deep-forest-teal)' : 'inherit',
                background: activeDropdown === 'discover' ? (scrolled ? 'rgba(255,255,255,0.15)' : '#f5f5f0') : 'transparent'
              }}
            >
              Discover
              <ChevronDown size={12} className={`transition-transform duration-200 ${activeDropdown === 'discover' ? 'rotate-180' : ''}`} />
            </button>

            <Link
              href="/ev-charging-station-franchise"
              className="text-[12px] font-medium py-1.5 px-3 rounded-lg transition-colors duration-200"
              style={{ color: 'inherit' }}
              
              
            >
              Franchise
            </Link>

            <Link
              href="/faq"
              className="text-[12px] font-medium py-1.5 px-3 rounded-lg transition-colors duration-200"
              style={{ color: 'inherit' }}
              
              
            >
              FAQ
            </Link>
          </nav>

          {/* Right CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Shop Button */}
            <Link
              href="/shop"
              className="hidden md:inline-flex btn-primary"
              style={{
                borderRadius: '999px',
                border: `1.5px solid ${scrolled ? 'rgba(255,255,255,0.35)' : 'var(--color-stone-mist)'}`,
                background: scrolled ? 'rgba(255,255,255,0.1)' : '#f5f5f0',
                color: scrolled ? '#ffffff' : 'var(--color-midnight-ink)',
                backdropFilter: 'blur(8px)'
              }}
            >
              <ShoppingBag size={14} />
              Shop
            </Link>
            <Link href="/ev-charging-station-franchise" className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
              Get Franchise â†’
            </Link>
            <button 
              className="md:hidden" 
              onClick={() => setIsOpen(!isOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: '4px' }}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* MEGA MENU PANEL (niche se expand, height 0 -> auto) */}
        <AnimatePresence>
          {activeDropdown !== null && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-0 right-0 overflow-hidden border-b border-[var(--color-stone-mist)] z-50"
              style={{
                background: 'var(--color-white)',
                color: 'var(--color-midnight-ink)'
              }}
            >
              <div className="max-w-[1200px] mx-auto py-8 px-6">
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-12 gap-8"
                >
                  {activeDropdown === 'products' ? (
                    <>
                      {/* Software Column */}
                      <div className="col-span-12 md:col-span-4 md:border-r md:border-[var(--color-stone-mist)] md:pr-8">
                        <div className="text-[13px] font-bold text-[var(--color-graphite-veil)] uppercase tracking-wider mb-6">
                          Software
                        </div>
                        <div className="flex flex-col gap-6">
                          {softwareItems.map((item) => (
                            <MegaMenuItem key={item.label} {...item} isProduct onClick={() => setActiveDropdown(null)} />
                          ))}
                        </div>
                      </div>
                      {/* Hardware Column */}
                      <div className="col-span-12 md:col-span-8 md:pl-4">
                        <div className="text-[13px] font-bold text-[var(--color-graphite-veil)] uppercase tracking-wider mb-6">
                          Hardware
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {hardwareItems.map((item) => (
                            <MegaMenuItem key={item.label} {...item} isProduct onClick={() => setActiveDropdown(null)} />
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Company Column */}
                      <div className="col-span-12 md:col-span-6 md:border-r md:border-[var(--color-stone-mist)] md:pr-8">
                        <div className="text-[13px] font-bold text-[var(--color-graphite-veil)] uppercase tracking-wider mb-6">
                          Company
                        </div>
                        <div className="flex flex-col gap-6">
                          {companyItems.map((item) => (
                            <MegaMenuItem key={item.label} {...item} onClick={() => setActiveDropdown(null)} />
                          ))}
                        </div>
                      </div>
                      {/* Resources Column */}
                      <div className="col-span-12 md:col-span-6 md:pl-4">
                        <div className="text-[13px] font-bold text-[var(--color-graphite-veil)] uppercase tracking-wider mb-6">
                          Resources
                        </div>
                        <div className="flex flex-col gap-6">
                          {resourceItems.map((item) => (
                            <MegaMenuItem key={item.label} {...item} onClick={() => setActiveDropdown(null)} />
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* BACKDROP BLUR & DARK OVERLAY */}
      <AnimatePresence>
        {activeDropdown !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#222222]/40 backdrop-blur-[10px] z-40"
            onClick={() => setActiveDropdown(null)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              marginTop: '64px',
              background: '#ffffff',
              border: '1px solid #e4e4d0',
              borderRadius: '14px',
              padding: '20px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              maxHeight: 'calc(100vh - 80px)',
              overflowY: 'auto'
            }}
            className="fixed top-0 left-4 right-4 z-50 pointer-events-auto flex flex-col gap-2"
          >
            {[
              { label: 'Home', href: '/' },
              { label: 'Franchise', href: '/ev-charging-station-franchise' },
              { label: 'Partner With Us', href: '/partner-with-us' },
              { label: 'DC Chargers', href: '/dc-chargers' },
              { label: 'AC Chargers', href: '/ac-chargers' },
              { label: 'About Us', href: '/about-us' },
              { label: 'Contact Us', href: '/contact-us' },
              { label: 'FAQ', href: '/faq' },
            ].map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setIsOpen(false)}
                style={{ display: 'block', fontFamily: 'var(--font-figtree)', fontSize: '15px', fontWeight: 500, color: 'var(--color-midnight-ink)', textDecoration: 'none', padding: '10px 0', borderBottom: '1px solid #e4e4d0' }}>
                {item.label}
              </Link>
            ))}
            <Link 
              href="/ev-charging-station-franchise" 
              onClick={() => setIsOpen(false)}
              className="btn-primary" 
              style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}
            >
              Get Franchise â†’
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 224;

function getFrameSrc(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `/dyu-frames/ezgif-frame-${padded}.png`;
}

export function FrameScrubSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  useEffect(() => {
    // Configure GSAP to handle mobile viewport resizing smoothly
    ScrollTrigger.config({ ignoreMobileResize: true });

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Set canvas size to match first frame aspect ratio
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Draw a specific frame index (0-based)
    const drawFrame = (index: number) => {
      const img = framesRef.current[index];
      if (!img?.complete || !img.naturalWidth) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Cover the canvas preserving aspect ratio
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = canvas.width / canvas.height;
      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
      if (imgAspect > canvasAspect) {
        sw = img.naturalHeight * canvasAspect;
        sx = (img.naturalWidth - sw) / 2;
      } else {
        sh = img.naturalWidth / canvasAspect;
        sy = (img.naturalHeight - sh) / 2;
      }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    };

    // Draw frame 0 immediately (white canvas until loaded)
    const firstImg = new Image();
    firstImg.src = getFrameSrc(1);
    firstImg.onload = () => {
      framesRef.current[0] = firstImg;
      drawFrame(0);
    };

    // Preload all frames in background
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i + 1);
      img.onload = () => {
        framesRef.current[i] = img;
        if (i === 0) drawFrame(0);
      };
    }

    // Resize handler (only trigger on actual width change to avoid mobile address bar glitches)
    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (!canvas) return;
      if (window.innerWidth === lastWidth) return; // Prevent height-only resize triggers on mobile
      lastWidth = window.innerWidth;
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };
    window.addEventListener("resize", handleResize);

    // GSAP ScrollTrigger â€” pin section, scrub through frames
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 4}`,
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate: (self) => {
        const frameIndex = Math.min(
          Math.floor(self.progress * (TOTAL_FRAMES - 1)),
          TOTAL_FRAMES - 1
        );
        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }
      },
    });

    return () => {
      trigger.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        width: "100%",
        height: "100dvh",
        position: "relative",
        overflow: "hidden",
        background: "#000",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      {/* Subtle progress indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          opacity: 0.6,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-figtree)",
            fontSize: "11px",
            color: "#ffffff",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            fontWeight: 500,
          }}
        >
          Scroll to explore
        </span>
        <div
          style={{
            width: "1px",
            height: "40px",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0))",
          }}
        />
      </div>
    </div>
  );
}
"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface ScrollSplitCardItem {
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
  icon?: React.ReactNode;
}

interface ScrollSplitCardProps {
  className?: string;
  imageSrc: string;
  cards: ScrollSplitCardItem[];
  containerRef?: React.RefObject<HTMLElement | null>;
}

export function ScrollSplitCard({
  className,
  imageSrc,
  cards,
  containerRef: externalContainerRef,
}: ScrollSplitCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollContainer, setScrollContainer] = useState<React.RefObject<HTMLElement | null> | undefined>();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Check initially
    window.addEventListener("resize", handleResize);
    
    if (externalContainerRef?.current) {
      setScrollContainer(externalContainerRef);
    }
    return () => window.removeEventListener("resize", handleResize);
  }, [externalContainerRef]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    ...(scrollContainer ? { container: scrollContainer } : {}),
    offset: ["start start", "end end"],
  });

  // Stage 1 to 2: Separation (0 to 0.4), then Stage 2 to 3: Overlap closer (0.4 to 0.8)
  const leftX = useTransform(scrollYProgress, [0, 0.4, 0.8], [0, -48, -24]);
  const rightX = useTransform(scrollYProgress, [0, 0.4, 0.8], [0, 48, 24]);
  
  // Mobile specific Y translations
  const topY = useTransform(scrollYProgress, [0, 0.4, 0.8], [0, -48, -24]);
  const bottomY = useTransform(scrollYProgress, [0, 0.4, 0.8], [0, 48, 24]);
  
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.9]);

  // Stage 2 to 3: Flip (0.4 to 0.8)
  const rotateY = useTransform(scrollYProgress, [0.4, 0.8], [0, 180]);
  // Due to 180deg Y flip, positive Z becomes visual counter-clockwise, negative Z becomes visual clockwise
  const rotateZLeft = useTransform(scrollYProgress, [0.4, 0.8], [0, 6]);
  const rotateZRight = useTransform(scrollYProgress, [0.4, 0.8], [0, -6]);

  // Dynamic borders/radii so it looks like ONE flat image initially
  const borderRadiusLeft = useTransform(scrollYProgress, [0, 0.2], ["16px 0px 0px 16px", "16px 16px 16px 16px"]);
  const borderRadiusMiddle = useTransform(scrollYProgress, [0, 0.2], ["0px 0px 0px 0px", "16px 16px 16px 16px"]);
  const borderRadiusRight = useTransform(scrollYProgress, [0, 0.2], ["0px 16px 16px 0px", "16px 16px 16px 16px"]);
  const borderOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 0.2]);
  const shadowOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 0.4]);
  const boxShadow = useMotionTemplate`inset 0 1px 1px rgba(255, 255, 255, ${borderOpacity}), inset 0 -24px 48px rgba(0, 0, 0, ${shadowOpacity}), 0 25px 50px -12px rgba(0, 0, 0, ${shadowOpacity})`;

  // Cards move up in the last viewport
  const cardsY = useTransform(scrollYProgress, [0.8, 1], [0, -200]);

  // Text appearance at the end in the sticky viewport
  const textOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.8, 1], [40, 0]);

  // Indicator text appearance at the start
  const startTextOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const startTextY = useTransform(scrollYProgress, [0, 0.1], [0, 20]);

  return (
    <div
      ref={containerRef}
      className={cn("relative h-[500dvh] w-full", className)}
    >
      <div className="sticky top-0 flex h-[100dvh] w-full items-center justify-center overflow-hidden [perspective:1200px]">
        {/* Starting Text indicator */}
        <motion.div
          className="absolute top-[20%] left-0 right-0 text-center"
          style={{
            opacity: startTextOpacity,
            y: startTextY,
          }}
        >
          <p className="text-sm font-medium tracking-widest text-foreground/50 uppercase">
            Scroll down
          </p>
        </motion.div>

        <motion.div
          style={{ scale, y: cardsY, transformStyle: "preserve-3d" }}
          className="flex flex-col md:flex-row h-[600px] md:h-[400px] w-full max-w-4xl px-4 relative"
        >
          {cards.slice(0, 3).map((card, i) => (
            <motion.div
              key={i}
              className="relative h-full flex-1"
              style={{
                x: isMobile ? 0 : (i === 0 ? leftX : i === 2 ? rightX : 0),
                y: isMobile ? (i === 0 ? topY : i === 2 ? bottomY : 0) : 0,
                rotateY,
                rotateZ: i === 0 ? rotateZLeft : i === 2 ? rotateZRight : 0,
                zIndex: i, // Ensures Left is under Middle, and Right is above Middle
                transformStyle: "preserve-3d",
              }}
            >
              {/* Front Side: Original Image Split */}
              <motion.div
                className="absolute inset-0 overflow-hidden [backface-visibility:hidden]"
                style={{
                  zIndex: 2, // Ensure front stays above initially
                  borderRadius: i === 0 ? borderRadiusLeft : i === 2 ? borderRadiusRight : borderRadiusMiddle,
                  boxShadow,
                }}
              >
                <div
                  className="absolute inset-0 h-full w-[300%]"
                  style={{
                    left: `${-100 * i}%`,
                    backgroundImage: `url(${imageSrc})`,
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                  }}
                />
              </motion.div>

              {/* Back Side: New Content Card */}
              <motion.div
                className={cn(
                  "absolute inset-0 overflow-hidden flex flex-col justify-end p-8 [backface-visibility:hidden] will-change-transform",
                  "border border-white/5 bg-gradient-to-br from-white/10 to-transparent",
                  "shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),inset_0_-24px_48px_rgba(0,0,0,0.2)]"
                )}
                style={{
                  backgroundColor: card.bgColor,
                  color: card.textColor,
                  transform: "rotateY(180deg)",
                  zIndex: 1, // Ensure back is behind before flip
                  borderRadius: i === 0 ? borderRadiusLeft : i === 2 ? borderRadiusRight : borderRadiusMiddle,
                  boxShadow,
                }}
              >
                {/* Grainy Noise Overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
                  style={{
                    backgroundImage: `url("https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png?width=256&height=256")`,
                    backgroundRepeat: "repeat",
                  }}
                />

                <div className="relative z-10 mb-auto">{card.icon}</div>
                <h3 className="relative z-10 mb-2 md:mb-4 text-[16px] leading-[1.1] md:text-2xl font-medium md:leading-tight">
                  {card.title}
                </h3>
                <p className="relative z-10 text-[10px] md:text-sm opacity-80 leading-snug">{card.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Ending Text fixed in the sticky viewport */}
        <motion.div
          className="absolute bottom-[20%] left-0 right-0 text-center"
          style={{
            opacity: textOpacity,
            y: textY,
          }}
        >
          <p className="text-3xl font-medium tracking-tight text-foreground/80 font-serif italic">
            So cool, right?
          </p>
        </motion.div>
      </div>
    </div>
  );
}
"use client";

import { ComponentProps, useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export type LayeredStackProps = ComponentProps<"div">;

export const LayeredStack = ({ children, className, ...props }: LayeredStackProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isStacked = useRef(true);

    const stackCards = useCallback((animate = true) => {
        const container = containerRef.current;
        if (!container) return;

        isStacked.current = true;
        const cards = Array.from(container.children) as HTMLElement[];

        // First clear all transforms so offsetLeft/offsetTop reflect true grid positions
        cards.forEach((card) => {
            gsap.killTweensOf(card);
        });

        if (!animate) {
            // Instant reposition: clear transforms, recalculate, set immediately
            cards.forEach((card) => gsap.set(card, { x: 0, y: 0, rotate: 0 }));
            // Wait a frame so the browser recalculates layout
            requestAnimationFrame(() => {
                const container = containerRef.current;
                if (!container || !isStacked.current) return;
                const cards = Array.from(container.children) as HTMLElement[];
                cards.forEach((card, i) => {
                    const offsetX = container.clientWidth / 2 - card.offsetWidth / 2 - card.offsetLeft;
                    const offsetY = container.clientHeight / 2 - card.offsetHeight / 2 - card.offsetTop;
                    gsap.set(card, {
                        x: offsetX,
                        y: offsetY,
                        rotate: gsap.utils.random(-10, 10),
                        zIndex: 100 - i,
                    });
                });
            });
            return;
        }

        // Animated: first clear, then after layout recalc, animate to center
        cards.forEach((card) => gsap.set(card, { x: 0, y: 0, rotate: 0 }));
        requestAnimationFrame(() => {
            const container = containerRef.current;
            if (!container || !isStacked.current) return;
            const cards = Array.from(container.children) as HTMLElement[];
            cards.forEach((card, i) => {
                const offsetX = container.clientWidth / 2 - card.offsetWidth / 2 - card.offsetLeft;
                const offsetY = container.clientHeight / 2 - card.offsetHeight / 2 - card.offsetTop;
                gsap.to(card, {
                    x: offsetX,
                    y: offsetY,
                    rotate: gsap.utils.random(-10, 10),
                    zIndex: 100 - i,
                    duration: 0.8,
                    ease: "expo.out",
                    overwrite: true,
                });
            });
        });
    }, []);

    const resetCards = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        isStacked.current = false;
        const cards = Array.from(container.children) as HTMLElement[];

        gsap.to(cards, {
            x: 0,
            y: 0,
            zIndex: (i: number) => 100 - i,
            duration: 0.8,
            rotate: 0,
            ease: "expo.out",
            stagger: {
                amount: 0.1,
                from: "start",
            },
            overwrite: true,
        });
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Initial z-index setup
        const cards = Array.from(container.children) as HTMLElement[];
        cards.forEach((card, i) => {
            gsap.set(card, { zIndex: 100 - i });
        });

        stackCards();

        // Re-run current state on resize
        const ro = new ResizeObserver(() => {
            if (isStacked.current) {
                stackCards(false);
            }
            // If expanded (reset), transforms are already 0 so nothing to fix
        });
        ro.observe(container);

        return () => ro.disconnect();
    }, [stackCards]);

    return (
        <div
            ref={containerRef}
            onMouseEnter={resetCards}
            onMouseLeave={() => stackCards(true)}
            className={cn("relative", className)}
            {...props}>
            {children}
        </div>
    );
};
