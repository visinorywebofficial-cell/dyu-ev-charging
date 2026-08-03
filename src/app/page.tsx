
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
          setTimeout(() => setActiveIndex(i), i * 60);
        });
      }
    }, { threshold: 0.05 });
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

const wordRevealVariant: Variants = {
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (isMobile) {
    return (
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ color, display: 'inline' }}
      >
        {text}{' '}
      </motion.span>
    );
  }

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

const HERO_IMAGES = [
  "/images/ev-vs-ice.jpg",
  "/images/hero-new-2.jpg",
  "/images/hero-new-3.jpg"
];

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const chargingSectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Dedicated 3-second slideshow timer loop (never reset by resize/re-render)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Resize & ScrollTrigger handler
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const handleOrientationChange = () => {
      setTimeout(() => ScrollTrigger.refresh(), 200);
    };
    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--color-cream-paper)' }}>
      {/* Eager Preload for All 3 Hero Background Images */}
      <link rel="preload" as="image" href="/images/ev-vs-ice.jpg" />
      <link rel="preload" as="image" href="/images/hero-new-2.jpg" />
      <link rel="preload" as="image" href="/images/hero-new-3.jpg" />

      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {/* SECTION 1 — HERO (with background slideshow) */}
      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section 
        className="relative overflow-hidden pt-32 pb-16 md:pt-[160px] md:pb-[80px]" 
        style={{ 
          textAlign: 'center',
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#002B36',
        }}
      >
        {/* Background Slideshow */}
        <div className="absolute inset-0 z-0 bg-[#002B36]">
          {HERO_IMAGES.map((img, index) => (
            <div
              key={img}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${img})`,
                backgroundSize: isMobile ? 'cover' : 'cover',
                backgroundPosition: isMobile ? 'center top' : 'center 40%',
                backgroundRepeat: 'no-repeat',
                opacity: index === currentImageIndex ? 1 : 0,
                transition: 'opacity 0.6s ease-in-out',
                zIndex: index === currentImageIndex ? 2 : 1,
              }}
            />
          ))}
          <div className="absolute inset-0 bg-black/55 z-10" />

          {/* Slide Indicator Dots (1, 2, 3) */}
          <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
            {HERO_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImageIndex(i)}
                className="w-8 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i === currentImageIndex ? '#ffffff' : 'rgba(255,255,255,0.4)',
                  width: i === currentImageIndex ? '28px' : '8px',
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="container-wispr relative z-20">
          <div className="flex flex-col items-center">

            {/* Badge */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
              <span className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.4)', color: '#ffffff' }}>
                <span className="pulse-dot" style={{ background: '#888888' }} />
                Empowering India's EV Network
              </span>
            </div>

            {/* H1 — Gilroy */}
            <h1 style={{
              fontFamily: 'Gilroy, sans-serif',
              fontSize: 'clamp(36px, 4vw, 56px)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: '32px',
              maxWidth: '900px',
              margin: '0 auto 32px',
              color: '#ffffff',
            }}>
              <span style={{ color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '4px' }}>
                Building the largest
              </span>
              <span style={{ color: '#ffffff', display: 'block' }}>
                EV charging network in India
              </span>
            </h1>

            {/* Tagline */}
            <div style={{ marginBottom: '24px' }}>
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
            </div>

            {/* Sub */}
            <p style={{
              fontFamily: 'var(--font-figtree)',
              fontSize: '18px',
              color: 'rgba(255,255,255,0.85)',
              maxWidth: '520px',
              margin: '0 auto 40px',
              lineHeight: 1.6,
            }}>
              Reliable, fast and accessible charging — anywhere you go.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/ev-charging-station-franchise" className="btn-primary">
                Get Franchise <ArrowRight size={14} />
              </Link>
              <Link 
                href="/dc-chargers" 
                className="btn-ghost" 
                style={{ 
                  background: 'transparent', 
                  color: '#ffffff', 
                  borderColor: 'rgba(255, 255, 255, 0.4)' 
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.color = '#002B36';
                  e.currentTarget.style.borderColor = '#ffffff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                }}
              >
                View Chargers
              </Link>
            </div>

          </div>
        </div>

          {/* Stats row with white borders and permanent crisp white text */}
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.3)',
              borderBottom: '1px solid rgba(255,255,255,0.3)',
              marginTop: '80px',
              backgroundColor: 'rgba(0,0,0,0.25)',
              backdropFilter: 'blur(8px)',
            }}
            className="grid grid-cols-2 md:grid-cols-4 relative z-20"
          >
            {[
              { value: 10000, suffix: '+', label: 'EV Chargers' },
              { value: 1014, suffix: '+', label: 'Cities Across India' },
              { value: 99, suffix: '%', label: 'Uptime Reliability' },
              { value: 100, suffix: ' Cr+', label: 'KM Powered' },
            ].map((stat, i) => (
              <div key={i} 
                className={`p-6 md:p-10 text-center border-white/30 transition-colors duration-300 ${
                  i % 2 === 0 ? 'border-r' : ''
                } ${
                  i < 3 ? 'md:border-r' : ''
                } ${
                  i < 2 ? 'border-b md:border-b-0' : ''
                }`}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'none')}
              >
                <div style={{ fontFamily: 'var(--font-figtree)', fontSize: '48px', fontWeight: 800, color: '#ffffff', lineHeight: 1, textShadow: '0 4px 12px rgba(0,0,0,0.9)' }}>
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <div style={{ fontFamily: 'var(--font-figtree)', fontSize: '14px', color: '#ffffff', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
      </section>

      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {/* SECTION 2 — WORD REVEAL (cream) */}
      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="section-light" style={{ borderTop: '1px solid var(--color-stone-mist)' }}>
        <div className="container-wispr" style={{ maxWidth: '900px' }}>
          <WordReveal
            text="Building the infrastructure that powers India's electric future — one charging station at a time. From highways to high streets, DYU puts clean energy exactly where India drives."
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
              text-align: justify;
            }
          `}</style>
        </div>
      </section>

      {/* ———————————————————————————————————————————————— */}
      {/* SECTION 3 — SCROLL SCRUB FRAME ANIMATION     */}
      {/* ———————————————————————————————————————————————— */}
      <FrameScrubSection totalFrames={224} framePathPrefix="/dyu-frames" />

      {/* ———————————————————————————————————————————————— */}
      {/* SECTION 4 — PRODUCTS (ScrollSplitCard) */}
      {/* ———————————————————————————————————————————————— */}
      <div className="w-full">
        <ScrollSplitCard
          imageSrc="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2832&auto=format&fit=crop"
          cards={[
            {
              title: "Home Charging",
              description: "Nectar home EV chargers 7.4kW, 11kW, 22kW. Portable 3.3kW & 7.4kW. Safe overnight charging at home or office.",
              bgColor: "#002B36",
              textColor: "#FFFFFF",
              image: "/images/ev-vs-ice.jpg"
            },
            {
              title: "DC Fast Charging",
              description: "Configurable DC Fast Chargers 60kW to 360kW. Built for highways, commercial hubs, and fleets across India.",
              bgColor: "#002B36",
              textColor: "#FFFFFF",
              image: "/images/dyu_charger_cluster.png"
            },
            {
              title: "Public Network",
              description: "Find chargers instantly via app. Live status, one-tap start, seamless payment. 1,014+ cities and growing.",
              bgColor: "#002B36",
              textColor: "#FFFFFF",
              image: "/images/hero-new-2.jpg"
            }
          ]}
        />
      </div>

      {/* ———————————————————————————————————————————————— */}
      {/* SECTION 4 — IMPACT (cream) */}
      {/* ———————————————————————————————————————————————— */}
      <section className="section-light">
        <div className="container-wispr">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="badge badge-outline" style={{ marginBottom: '24px' }}>Our Impact</span>
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-[#222222]">Every charge</span>
                <span className="text-[#222222] italic">makes a difference</span>
              </h2>
              <p style={{ fontFamily: 'var(--font-figtree)', fontSize: '16px', color: 'var(--color-smoke)', lineHeight: 1.7, marginBottom: '40px' }}>
                What if every charge made a difference? We exist to make cities greener and more connected through accessible EV charging — creating impact both environmentally and socially.
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

              {/* Card 1 — Cleaner Air */}
              <div className="relative overflow-hidden rounded-3xl aspect-[250/320] shadow-xl group">
                <img
                  src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=800&auto=format&fit=crop"
                  alt="Cleaner Air — EV charging reduces emissions"
                  className="object-cover w-full h-full opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5 z-10">
                  <p className="text-[#FFFFFF] font-semibold text-base tracking-tight">Cleaner Air</p>
                </div>
              </div>

              {/* Card 2 — Green Jobs */}
              <div className="relative overflow-hidden rounded-3xl aspect-[250/320] shadow-xl group mt-12">
                <img
                  src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop"
                  alt="Green Jobs — Clean energy workforce"
                  className="object-cover w-full h-full opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5 z-10">
                  <p className="text-[#FFFFFF] font-semibold text-base tracking-tight">Green Jobs</p>
                </div>
              </div>

              {/* Card 3 — Secure Network */}
              <div className="relative overflow-hidden rounded-3xl aspect-[250/320] shadow-xl group">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop"
                  alt="Secure Network — Reliable EV charging infrastructure"
                  className="object-cover w-full h-full opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5 z-10">
                  <p className="text-[#FFFFFF] font-semibold text-base tracking-tight">Secure Network</p>
                </div>
              </div>

              {/* Card 4 — Smart Ops */}
              <div className="relative overflow-hidden rounded-3xl aspect-[250/320] shadow-xl group mt-12">
                <img
                  src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=800&auto=format&fit=crop"
                  alt="Smart Operations — EV charging station technology"
                  className="object-cover w-full h-full opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5 z-10">
                  <p className="text-[#FFFFFF] font-semibold text-base tracking-tight">Smart Ops</p>
                </div>
              </div>

            </LayeredStack>
          </div>
        </div>
      </section>

      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {/* SECTION 5 — PARTNER CTA (teal) */}
      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="section-teal">
        <div className="container-wispr" style={{ textAlign: 'center' }}>
          <span className="badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', marginBottom: '32px' }}>B2B & Franchise</span>
          <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
            <span className="text-[#ffffff]">Turn your space into a</span>
            <span className="text-[#888888] italic">revenue stream</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-figtree)', fontSize: '18px', color: 'rgba(255,255,255,0.75)', maxWidth: '500px', margin: '0 auto 40px', lineHeight: 1.6 }}>
            Join India's fastest-growing EV charging network. Full-ownership or FOCO model — DYU provides end-to-end support.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/ev-charging-station-franchise" className="btn-primary">
              Explore Franchise →
            </Link>
            <a href="https://wa.me/919949055516" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }}>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {/* SECTION 6 — TESTIMONIALS (cream) */}
      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="section-light">
        <div className="container-wispr">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
              <span className="text-[#222222]">Loved by</span>
              <span className="text-[#888888] italic">EV drivers</span>
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
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#222222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'var(--font-figtree)', fontWeight: 700, fontSize: '14px' }}>
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

