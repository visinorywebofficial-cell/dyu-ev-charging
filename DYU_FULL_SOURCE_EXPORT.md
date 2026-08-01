# DYU Website Full Project Export

## 1. FULL PROJECT FOLDER STRUCTURE
`	ext
src/
    app/
        favicon.ico
        globals.css
        layout.tsx
        page.tsx
        about-us/
            page.tsx
        ac-chargers/
            page.tsx
        adwall/
            page.tsx
        contact-us/
            page.tsx
        csms-dashboard/
            page.tsx
        dc-chargers/
            page.tsx
        ev-calculator/
            page.tsx
        ev-charging-app/
            page.tsx
        ev-charging-software/
            csms/
                page.tsx
            evlinq/
                page.tsx
        ev-charging-station-franchise/
            page.tsx
        faq/
            page.tsx
        partner-with-us/
            page.tsx
        products/
            portable-charger/
                page.tsx
        shop/
            page.tsx
    components/
        Car3D.tsx
        CSMSDashboardPreview.tsx
        EVLinqDashboardPreview.tsx
        FrameScrubSection.tsx
        ImageTrail.tsx
        Navbar.tsx
        SmoothScrollProvider.tsx
        ac-charger/
            ScrollRevealSection.tsx
        ui/
            layered-stack.tsx
            scroll-split-card.tsx
    lib/
        utils.ts
`

## 2. ALL PAGE/COMPONENT FILES
### src\app\layout.tsx
`	sx

import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { Figtree } from "next/font/google";
import { cn } from "@/lib/utils";

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  weight: ['300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "DYU — Power, Delivered.",
  description: "Building the largest network of EV chargers in India. Reliable, fast and accessible charging — anywhere you go.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("h-full antialiased", "font-sans", figtree.variable)} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        style={{
          backgroundColor: 'var(--color-cream-paper)',
          color: 'var(--color-midnight-ink)',
          fontFamily: 'var(--font-figtree)',
        }}
        className="min-h-full flex flex-col"
      >
        {/* Announcement Banner — Deep Forest Teal */}
        <div className="announcement-banner">
          ⚡ DYU is expanding across India — Secure your EV charging franchise location today →
        </div>

        <Navbar />

        <SmoothScrollProvider>
          <main className="flex-1">
            {children}
          </main>
        </SmoothScrollProvider>

        {/* FOOTER — Dark gray bg, Light text */}
        <footer style={{ backgroundColor: '#222222', borderTop: 'none', position: 'relative', zIndex: 20 }} className="py-16">
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
                  Building India's most reliable EV charging network — one station at a time.
                </p>
                <a href="https://wa.me/919949055516" style={{ fontFamily: 'var(--font-figtree)', fontSize: '14px', fontWeight: 600, color: '#a7f3d0' }}>
                  📞 +91 99490 55516
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
                © {new Date().getFullYear()} DYU. All rights reserved.
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


`

### src\app\page.tsx
`	sx

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
    "/images/hero-new-2.jpg",
    "/images/hero-new-3.jpg"
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
                <span className="pulse-dot" style={{ background: '#888888' }} />
                Empowering India's EV Network
              </span>
            </motion.div>

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
              <SplitText text="Reliable, fast and accessible charging — anywhere you go." startIndex={10} />
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
              bgColor: "#222222",
              textColor: "#F1EFE1",
              image: "/images/ev-vs-ice.jpg"
            },
            {
              title: "DC Fast Charging",
              description: "Configurable DC Fast Chargers 60kW to 360kW. Built for highways, commercial hubs, and fleets across India.",
              bgColor: "#1a1a1a",
              textColor: "#F1EFE1",
              image: "/images/dyu_charger_cluster.png"
            },
            {
              title: "Public Network",
              description: "Find chargers instantly via app. Live status, one-tap start, seamless payment. 1,014+ cities and growing.",
              bgColor: "#2a2820",
              textColor: "#F1EFE1",
              image: "/images/hero-new-2.jpg"
            }
          ]}
        />
      </div>

      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {/* SECTION 4 — IMPACT (cream) */}
      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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
                <span className="text-[#888888] italic">makes a difference</span>
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
                  <p className="text-[#F1EFE1] font-semibold text-base tracking-tight">Cleaner Air</p>
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
                  <p className="text-[#F1EFE1] font-semibold text-base tracking-tight">Green Jobs</p>
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
                  <p className="text-[#F1EFE1] font-semibold text-base tracking-tight">Secure Network</p>
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
                  <p className="text-[#F1EFE1] font-semibold text-base tracking-tight">Smart Ops</p>
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


`

### src\app\about-us\page.tsx
`	sx
'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';

const Car3D = dynamic(() => import('@/components/Car3D'), { ssr: false });

export default function AboutUsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Force scroll to top on mount to ensure starting fresh
    window.scrollTo(0, 0);
    setMounted(true);

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Content reveal animations
      gsap.utils.toArray('.content-block').forEach((block: any) => {
        gsap.fromTo(block, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1,
            scrollTrigger: {
              trigger: block,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div 
      id="about-container"
      ref={containerRef}
      className="relative w-full" 
      style={{ 
        backgroundColor: '#F1EFE1', 
        color: '#222222', 
        fontFamily: "'Gilroy', sans-serif",
        height: '400vh' 
      }}
    >
      {/* LOCAL 3D CANVAS - Pure mathematics, no GSAP DOM proxies */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 10, pointerEvents: 'none' }}>
        {mounted && <Car3D />}
      </div>

      {/* SVG Background Track */}
      <svg 
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" 
        viewBox="0 0 1000 4000" 
        preserveAspectRatio="none"
      >
        <path 
          id="car-path" 
          d="M 500,0 
             C 900,500 900,1000 500,1500 
             C 100,2000 100,2500 500,3000 
             C 900,3500 500,4000 500,4000" 
          fill="none" 
          stroke="#222222" 
          strokeWidth="4" 
          strokeDasharray="20 20"
          opacity="0.3"
        />
      </svg>

      {/* Content Blocks (z-index 20 to appear above everything) */}
      <div className="relative z-20 w-full h-full pointer-events-none">
        
        <div className="absolute top-[10vh] left-0 w-full flex justify-center text-center px-4">
          <div className="content-block max-w-2xl pointer-events-auto">
            <h1 className="flex flex-col gap-1 mb-6 tracking-tighter" style={{ fontFamily: '"Gilroy", sans-serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              <span className="text-[#222222]">Driving the future</span>
              <span className="text-[#888888] italic">of mobility</span>
            </h1>
            <p className="text-base md:text-lg font-medium opacity-80">
              Scroll down to ride along our journey and discover how we are building the future of mobility.
            </p>
          </div>
        </div>

        <div className="absolute top-[100vh] left-[5%] md:left-[10%] w-[80%] md:w-[30%] pointer-events-auto">
          <div className="content-block bg-[#F1EFE1]/90 backdrop-blur-md p-4 md:p-6 rounded-2xl border border-[#222222]/10 shadow-xl">
            <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
              <span className="block text-[#222222]">Our vision</span>
              <span className="block text-[#888888] italic">for a sustainable future</span>
            </h2>
            <p className="text-base md:text-lg opacity-80 leading-relaxed font-medium">
              To make EV charging as accessible and effortless as grabbing a cup of coffee. We believe in a sustainable future where range anxiety is a thing of the past. 
              By deploying smart, reliable, and ultra-fast charging stations across the country, we are paving the way for mass EV adoption.
            </p>
          </div>
        </div>

        <div className="absolute top-[225vh] right-[5%] md:right-[10%] w-[80%] md:w-[30%] text-right pointer-events-auto">
          <div className="content-block bg-[#222222] text-[#F1EFE1] p-4 md:p-6 rounded-2xl shadow-xl">
            <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
              <span className="block text-[#F1EFE1]">Smart hardware</span>
              <span className="block text-[#a3a3a3] italic">connected to the cloud</span>
            </h2>
            <p className="text-base md:text-lg opacity-90 leading-relaxed font-medium">
              Our charging stations aren't just plugs; they are intelligent nodes connected to a robust cloud infrastructure. 
              Featuring real-time diagnostics, seamless payment integrations, and dynamic load balancing, our hardware ensures a premium experience every single time you plug in.
            </p>
          </div>
        </div>

        <div className="absolute top-[340vh] left-[5%] md:left-[10%] w-[80%] md:w-[30%] pointer-events-auto">
          <div className="content-block bg-[#F1EFE1]/90 backdrop-blur-md p-4 md:p-6 rounded-2xl border border-[#222222]/10 shadow-xl">
            <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
              <span className="block text-[#222222]">The largest network</span>
              <span className="block text-[#888888] italic">always within reach</span>
            </h2>
            <p className="text-base md:text-lg opacity-80 leading-relaxed font-medium">
              With over 10,000 active charging points and growing, we are building the most expansive and reliable EV charging network in the country.
              Whether you are on a daily commute or a cross-country road trip, our chargers are always within your reach.
            </p>
          </div>
        </div>

        <div className="absolute top-[380vh] left-0 w-full flex justify-center text-center pointer-events-auto">
          <div className="content-block">
            <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
              <span className="text-[#222222]">The journey</span>
              <span className="text-[#888888] italic">continues...</span>
            </h2>
          </div>
        </div>

      </div>
    </div>
  );
}

`

### src\app\ac-chargers\page.tsx
`	sx
"use client";

import { Navbar } from "@/components/Navbar";
import { ScrollRevealSection } from "@/components/ac-charger/ScrollRevealSection";
import { motion, Variants } from "framer-motion";

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

export default function ACChargersPage() {
  return (
    <div className="min-h-screen bg-[#F1EFE1] text-[#222222] font-['Figtree'] selection:bg-[#00F0FF] selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <main className="pt-24 md:pt-32 pb-12 md:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-4xl mx-auto mb-12 md:mb-20"
            initial="hidden"
            animate="visible"
          >
            <h1 className="flex flex-col gap-1 mb-6 tracking-tighter" style={{ fontFamily: '"Gilroy", sans-serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              <span className="text-[#222222]">Powering Your Drive</span>
              <span className="text-[#888888] italic">With True AC Energy</span>
            </h1>
            <motion.p 
              style={{
                fontFamily: 'var(--font-figtree), sans-serif',
                fontSize: 'clamp(16px, 2vw, 18px)',
                color: 'rgba(0,0,0,0.6)',
                maxWidth: '600px',
                margin: '0 auto 24px',
                lineHeight: 1.6,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              Smart, reliable, and premium EV charging solutions designed for homes, workplaces, and commercial spaces.
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll Reveal Sections */}
        <div className="space-y-0">
          <ScrollRevealSection
            imageSrc="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1200&auto=format&fit=crop"
            imageAlt="DYU 7.4 kW Home AC Charger"
            title={
              <div className="flex flex-col">
                <span className="text-[#222222]">DYU</span>
                <span className="text-[#888888] italic">AC 7.4 kW</span>
              </div>
            }
            description="Perfect for residential and light commercial use. Wake up every morning to a fully charged vehicle."
            features={[
              { title: "Smart Connectivity", desc: "Wi-Fi & Bluetooth built-in. Monitor and schedule charging sessions directly from your smartphone." },
              { title: "Sleek & Compact", desc: "Designed to blend seamlessly into your home garage or driveway with a minimal footprint." },
              { title: "Weatherproof", desc: "IP65 rated enclosure ensures your charger works flawlessly in heavy rain or extreme heat." }
            ]}
            reverse={false}
          />

          <ScrollRevealSection
            imageSrc="/images/ev-2.jpg"
            imageAlt="DYU 22 kW Commercial AC Charger"
            title={
              <div className="flex flex-col">
                <span className="text-[#222222]">DYU</span>
                <span className="text-[#888888] italic">AC 22 kW</span>
              </div>
            }
            description="High-performance charging for commercial parking, fleets, and public spaces. Fast, durable, and designed for heavy usage."
            features={[
              { title: "3-Phase Power", desc: "Delivers up to 22 kW of pure charging power, significantly reducing wait times for larger battery packs." },
              { title: "OCPP 1.6J Compliant", desc: "Easily integrate with existing management systems for billing, load balancing, and fleet management." },
              { title: "Robust Security", desc: "RFID authentication and advanced ground fault protection keep your users and grid safe." }
            ]}
            reverse={true}
          />

          <ScrollRevealSection
            imageSrc="/images/ev-3.jpg"
            imageAlt="EV Charger Connectors"
            title={
              <div className="flex flex-col">
                <span className="text-[#222222]">Universal</span>
                <span className="text-[#888888] italic">Compatibility</span>
              </div>
            }
            description="Our AC chargers are designed to work seamlessly with all major electric vehicle brands on the road today."
            features={[
              { title: "Type 2 Connectors", desc: "The standard across India and Europe, ensuring a perfect fit for Tata, MG, BYD, Audi, and more." },
              { title: "Dynamic Load Balancing", desc: "Intelligently adjusts power output based on your building's current electrical load to prevent tripping." },
              { title: "24/7 Support", desc: "Backed by DYU's premium nationwide support network. We're here whenever you need us." }
            ]}
            reverse={false}
          />
        </div>
      </main>
    </div>
  );
}

`

### src\app\adwall\page.tsx
`	sx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plug, Zap, MonitorPlay, Shield, Server, ArrowRight, CheckCircle2, TrendingUp, Users, Building } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useInView } from "framer-motion";

function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.max(Math.floor((duration * 1000) / end), 15);
    const timer = setInterval(() => {
      start += 1;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, step);
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  return <span ref={ref}>{count}</span>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } }
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

export default function AdWallPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-cream-paper)' }}>
      
      {/* ─── HERO SECTION ─── */}
      <section 
        className="relative overflow-hidden pt-32 pb-16 md:pt-[160px] md:pb-[80px]" 
        style={{ 
          textAlign: 'center',
          minHeight: '80dvh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div className="absolute inset-0 z-0 bg-[#222222]">
          <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#222222] via-[#222222]/80 to-transparent" />
        </div>

        <div className="container-wispr relative z-20">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            
            <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <span className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)' }}>
                <MonitorPlay size={14} /> AD WALL AC EV CHARGER
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="flex flex-col gap-1 mb-6 tracking-tighter" style={{ fontFamily: '"Gilroy", sans-serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              <span className="text-white">Charge Smarter. Earn Smarter.</span>
              <span className="text-[#888888] italic">Advertise Better.</span>
            </motion.h1>

            <motion.p variants={fadeUp} style={{
              fontFamily: 'var(--font-figtree)',
              fontSize: '18px',
              color: 'rgba(255,255,255,0.8)',
              maxWidth: '600px',
              margin: '0 auto 40px',
              lineHeight: 1.6,
            }}>
              Revenue-ready AC EV charger with dual-gun charging and a 55-inch ad display. Charge up to 4 vehicles and earn from ads and sessions.
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/ev-charging-station-franchise" className="btn-primary">
                Talk to an Expert <ArrowRight size={14} />
              </Link>
              <a href="#tech-specs" className="btn-ghost" style={{ color: '#ffffff', borderColor: '#ffffff' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = '#222'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ffffff'; }}
              >
                View Technical Specs
              </a>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ─── KEY FEATURES (BENTO BOX) ─── */}
      <section className="section-light py-24">
        <div className="container-wispr">
          <div className="text-center mb-16">
            <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]" style={{ fontFamily: 'var(--font-figtree)' }}>
              <span className="text-[#222222]">Key</span>
              <span className="text-[#888888] italic">Features</span>
            </h2>
            <p className="mt-4 text-[#666666] font-medium max-w-2xl mx-auto">
              Everything you need for efficient charging, smooth operations, and added value in one seamless setup.
            </p>
          </div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Feature 1 */}
            <motion.div variants={fadeUp} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#00F0FF]/20 flex items-center justify-center text-[#00F0FF]">
                <Plug size={24} />
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900 mt-2">4x</h3>
              <div>
                <h4 className="text-lg font-extrabold text-gray-900 mb-2">Multi-Output Smart Charging</h4>
                <p className="text-[#666666] text-base leading-relaxed">Supports 2 Type-2 AC connectors and 2 three-pin sockets, enabling charging for up to 4 vehicles simultaneously.</p>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={fadeUp} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#00F0FF]/20 flex items-center justify-center text-[#00F0FF]">
                <Zap size={24} />
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900 mt-2">22 kW</h3>
              <div>
                <h4 className="text-lg font-extrabold text-gray-900 mb-2">Dual Gun AC Charging</h4>
                <p className="text-[#666666] text-base leading-relaxed">High-performance AC charging with dual-gun support, perfectly suited for heavy commercial environments.</p>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={fadeUp} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start gap-4 lg:row-span-2">
              <div className="w-12 h-12 rounded-xl bg-[#00F0FF]/20 flex items-center justify-center text-[#00F0FF]">
                <MonitorPlay size={24} />
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900 mt-2">55" 4K</h3>
              <div>
                <h4 className="text-lg font-extrabold text-gray-900 mb-2">Digital Advertisement Display</h4>
                <p className="text-[#666666] text-base leading-relaxed mb-6">Built-in digital display supports remote advertisement broadcasting, creating an additional revenue opportunity through ad displays. Features up to 4,000 nits brightness ensuring clear visibility even in direct sunlight.</p>
                <div className="w-full h-48 bg-gray-100 rounded-xl overflow-hidden relative">
                   <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" alt="Ad Display Placeholder" />
                   <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                     <span className="bg-white/90 text-black text-xs font-extrabold px-3 py-1 rounded-full">AD SPACE</span>
                   </div>
                </div>
              </div>
            </motion.div>

            {/* Feature 4 */}
            <motion.div variants={fadeUp} className="bg-[#222] p-8 rounded-3xl shadow-sm border border-gray-800 flex flex-col items-start gap-4 text-white">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <Server size={24} />
              </div>
              <h3 className="text-3xl font-extrabold mt-2">SS</h3>
              <div>
                <h4 className="text-lg font-extrabold mb-2">Durable Stainless-Steel Body</h4>
                <p className="text-[#888888] text-base leading-relaxed">Features a robust stainless-steel enclosure suitable for outdoor and long-term commercial use.</p>
              </div>
            </motion.div>

            {/* Feature 5 */}
            <motion.div variants={fadeUp} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#00F0FF]/20 flex items-center justify-center text-[#00F0FF]">
                <Shield size={24} />
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900 mt-2">6+</h3>
              <div>
                <h4 className="text-lg font-extrabold text-gray-900 mb-2">Advanced Safety Systems</h4>
                <p className="text-[#666666] text-base leading-relaxed">Includes ground fault detection, residual current detection, surge protection, over/under-voltage shutdown, and thermal protection.</p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ─── WHY CHOOSE AD WALL ─── */}
      <section className="py-24 bg-[#F1EFE1]">
        <div className="container-wispr">
          <div className="text-center mb-16">
            <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]" style={{ fontFamily: 'var(--font-figtree)' }}>
              <span className="text-[#222222]">Why Businesses</span>
              <span className="text-[#888888] italic">Choose AdWall</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: MonitorPlay, title: "Capture Attention", desc: "Turn waiting time into meaningful engagement." },
              { icon: TrendingUp, title: "Earn More", desc: "Generate revenue from both charging and on-screen ads." },
              { icon: Users, title: "Attract EV Users", desc: "Increase footfall with a connected charging experience." },
              { icon: Building, title: "Commercial Grade", desc: "Ideal for malls, offices, and high-traffic locations." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-8 bg-[#222222] rounded-3xl shadow-sm border border-white/10"
              >
                <div className="w-16 h-16 rounded-full bg-[#00F0FF]/20 flex items-center justify-center text-[#00F0FF] mb-6">
                  <item.icon size={24} />
                </div>
                <h4 className="text-lg font-extrabold text-[#F1EFE1] mb-3">{item.title}</h4>
                <p className="text-[#888888] text-base leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-20 bg-[#222] text-white">
        <div className="container-wispr">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center divide-x divide-white/10">
            {[
              { val: 100, suffix: "+", label: "AdWall Units" },
              { val: 20, suffix: "+", label: "Cities in India" },
              { val: 5000, suffix: "+", label: "Sessions" },
              { val: 77, suffix: "+", label: "Live Locations" },
              { val: 10, suffix: "+", label: "Brands Advertising" }
            ].map((stat, i) => (
              <div key={i} className={`flex flex-col items-center justify-center ${i === 0 || i === 2 ? '' : 'pl-8'} ${i % 2 === 0 ? 'border-none md:border-solid md:border-l' : ''} ${i === 0 ? 'border-none' : ''}`}>
                <div className="text-4xl md:text-5xl font-['Gilroy'] font-extrabold mb-2">
                  <CountUp end={stat.val} duration={2.5} />{stat.suffix}
                </div>
                <div className="text-xs text-[#888888] uppercase tracking-widest font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TECH SPECS ─── */}
      <section id="tech-specs" className="py-24 bg-[#F1EFE1]">
        <div className="container-wispr max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]" style={{ fontFamily: 'var(--font-figtree)' }}>
              <span className="text-[#222222]">Technical</span>
              <span className="text-[#888888] italic">Specifications</span>
            </h2>
          </div>

          <div className="bg-[#222222] rounded-3xl shadow-sm border border-white/10 overflow-hidden">
            {[
              { label: "Charging Type", detail: "AC Charging" },
              { label: "Connector Type", detail: "Type 2 AC (2 outputs) and 3-pin socket (2 outputs)" },
              { label: "Power Rating", detail: "22 kW (7.4 kW × 2 + 3.3 kW × 2)" },
              { label: "User Authentication", detail: "Mobile App, RFID, QR Code" },
              { label: "Connectivity Options", detail: "3G, 4G, Ethernet, Wi-Fi" },
              { label: "Advertising Display", detail: "55-inch LED digital display" },
            ].map((row, i) => (
              <div key={i} className={`flex flex-col sm:flex-row items-start sm:items-center p-6 ${i !== 5 ? 'border-b border-white/10' : ''} ${i % 2 === 0 ? 'bg-[#222222]' : 'bg-white/5'}`}>
                <div className="w-full sm:w-1/3 font-semibold text-[#F1EFE1] mb-2 sm:mb-0">{row.label}</div>
                <div className="w-full sm:w-2/3 flex items-start text-[#888888]">
                  <CheckCircle2 size={18} className="text-[#00F0FF] mr-3 mt-1 flex-shrink-0" />
                  <span className="leading-relaxed">{row.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PARTNER WITH US ─── */}
      <section className="py-24 bg-[#F1EFE1]">
        <div className="container-wispr text-center">
          <span className="badge" style={{ background: 'rgba(34,34,34,0.1)', color: '#222222', marginBottom: '24px' }}>Partner With Us</span>
          <h2 className="flex flex-col gap-1 mb-6 text-4xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1] text-center" style={{ fontFamily: 'var(--font-figtree)' }}>
            <span className="text-[#222222]">Turn Your Location into a</span>
            <span className="text-[#888888] italic">Revenue Hub</span>
          </h2>
          <p className="text-[#666666] text-lg max-w-2xl mx-auto mb-16 font-medium">
            Bring EV charging and advertising to your location in 4 simple steps.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { step: "1", title: "Get Started with DYU", desc: "Contact our team to evaluate your location." },
              { step: "2", title: "Install & Activate", desc: "Set up charging with built-in digital screens." },
              { step: "3", title: "Earn Revenue", desc: "Generate revenue from every charging session & ad display." },
              { step: "4", title: "Grow Visibility", desc: "Attract more EV users and increase local footfall." }
            ].map((s, i) => (
              <div key={i} className="bg-[#222222] border border-white/10 rounded-3xl p-8 text-left shadow-sm relative overflow-hidden">
                <div className="text-5xl font-black text-[#F1EFE1]/5 absolute -top-4 -right-2">{s.step}</div>
                <div className="w-10 h-10 rounded-full bg-[#00F0FF]/20 text-[#00F0FF] flex items-center justify-center font-extrabold mb-6">
                  {s.step}
                </div>
                <h4 className="text-xl font-extrabold text-[#F1EFE1] mb-2">{s.title}</h4>
                <p className="text-[#888888] text-base leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <Link href="/partner-with-us" className="btn-primary shadow-[0_0_20px_rgba(34,34,34,0.3)] transition-all hover:scale-105" style={{ background: '#222222', color: '#F1EFE1' }}>
            Become A Partner <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </section>

    </div>
  );
}


`

### src\app\contact-us\page.tsx
`	sx
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

`

### src\app\csms-dashboard\page.tsx
`	sx
"use client";

import React from "react";
import { 
  LayoutDashboard, 
  Building2, 
  ChevronDown, 
  ChevronUp, 
  BatteryCharging, 
  Users, 
  CreditCard, 
  MessageSquareWarning, 
  Ticket, 
  Zap, 
  Settings,
  MapPin,
  Smartphone,
  CheckCircle2,
  MoreVertical
} from "lucide-react";

// Donut Chart Component
const ConcentricDonut = ({ 
  centerValue, 
  centerLabel,
  data 
}: { 
  centerValue: string, 
  centerLabel: string,
  data: { label: string, color: string, value: number, radius: number }[] 
}) => {
  return (
    <div className="flex items-center gap-8">
      <div className="relative flex items-center justify-center w-[160px] h-[160px]">
        <svg width="160" height="160" viewBox="0 0 160 160" className="transform -rotate-90">
          {data.map((item, i) => {
            const circumference = 2 * Math.PI * item.radius;
            const strokeDasharray = `${(item.value / 100) * circumference} ${circumference}`;
            return (
              <g key={`arc-${i}`}>
                {/* Background track */}
                <circle 
                  cx="80" cy="80" r={item.radius} 
                  fill="none" 
                  stroke="#E2E5EA" 
                  strokeWidth="8" 
                />
                {/* Progress arc */}
                <circle 
                  cx="80" cy="80" r={item.radius} 
                  fill="none" 
                  stroke={item.color} 
                  strokeWidth="8" 
                  strokeDasharray={strokeDasharray}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </g>
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xs font-semibold text-gray-500">{centerLabel}</span>
          <span className="text-2xl font-bold text-[#1a2b4c] font-['Gilroy']">{centerValue}</span>
        </div>
      </div>
      
      <div className="flex flex-col gap-2">
        {data.map((item, i) => (
          <div key={`legend-${i}`} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-sm font-medium text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function DashboardPreview() {
  return (
    <div className="min-h-screen bg-[#F4F5F5] font-['Figtree'] p-4 md:p-8 flex items-center justify-center">
      {/* MAC-LIKE WINDOW CONTAINER */}
      <div className="w-full max-w-[1400px] h-[900px] bg-[#EBECEF] rounded-[2.5rem] shadow-2xl border-4 border-[#333333] overflow-hidden flex relative ring-4 ring-black/5">
        
        {/* SIDEBAR */}
        <div className="w-[280px] bg-[#EBECEF] border-r border-gray-300/50 flex flex-col pt-8 pb-4 shrink-0">
          <div className="px-8 mb-10">
            <h1 className="text-3xl font-black text-[#1a2b4c] font-['Gilroy'] tracking-tight">dyu</h1>
          </div>
          
          <div className="flex-1 overflow-y-auto px-4">
            <ul className="space-y-1">
              <li>
                <button className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-200/50 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <LayoutDashboard className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold text-sm">Dashboard</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </li>
              
              <li className="mt-2">
                <button className="w-full flex items-center justify-between px-4 py-3 text-[#1a2b4c] font-bold rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-gray-700" />
                    <span className="font-bold text-sm">Company Management</span>
                  </div>
                  <ChevronUp className="w-4 h-4 text-gray-700" />
                </button>
                <div className="pl-12 pr-2 mt-1 space-y-1">
                  <button className="w-full text-left px-4 py-2.5 bg-[#DCE0E5] text-[#1a2b4c] font-bold text-sm rounded-lg shadow-sm">
                    Company Details
                  </button>
                  <button className="w-full text-left px-4 py-2.5 text-gray-500 font-semibold hover:text-gray-700 text-sm rounded-lg transition-colors">
                    Company
                  </button>
                  <button className="w-full text-left px-4 py-2.5 text-gray-500 font-semibold hover:text-gray-700 text-sm rounded-lg transition-colors">
                    Clients
                  </button>
                </div>
              </li>

              <li className="pt-2">
                <button className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-200/50 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <BatteryCharging className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold text-sm">Charger Management</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </li>
              
              <li>
                <button className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-200/50 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold text-sm">User Management</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </li>

              <li>
                <button className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-200/50 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold text-sm">Billings & Payments</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </li>

              <li>
                <button className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-200/50 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <MessageSquareWarning className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold text-sm">Complaints</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </li>
              
              <li>
                <button className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-200/50 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <Ticket className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold text-sm">Coupons</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </li>

              <li>
                <button className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-200/50 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold text-sm">Auto Triggers</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </li>

              <li>
                <button className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-200/50 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold text-sm">Subscription</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 bg-[#F1F2F4] p-8 overflow-y-auto">
          
          <h2 className="text-2xl font-bold text-[#1a2b4c] font-['Gilroy'] mb-8">Company Details</h2>
          
          {/* Header Row */}
          <div className="mb-6">
            <div className="flex items-baseline gap-3 mb-1">
              <h3 className="text-3xl font-black text-[#1a2b4c] font-['Gilroy']">DYU</h3>
              <span className="text-xs font-bold text-[#E55A43] tracking-wide">MKTP</span>
            </div>
            <p className="text-sm font-semibold text-gray-500 mb-4">8787</p>
            
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#E8EAEF] rounded-md border border-gray-300/50 shadow-sm text-xs font-bold text-gray-700">
              <img src="https://flagcdn.com/w20/in.png" alt="India" className="w-4 h-3 object-cover rounded-sm" />
              India
              <ChevronDown className="w-3 h-3 ml-2 text-gray-500" />
            </button>
          </div>

          {/* Metric Cards Top Row */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-[#EBECEF] p-5 rounded-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),_0_4px_10px_rgba(0,0,0,0.05)] border border-white/50 flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-[#1a2b4c] font-['Gilroy'] mb-1">29</div>
                <div className="text-xs font-semibold text-gray-500">CPOs</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#E55A43]">
                <MapPin className="w-5 h-5" />
              </div>
            </div>
            
            <div className="bg-[#EBECEF] p-5 rounded-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),_0_4px_10px_rgba(0,0,0,0.05)] border border-white/50 flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-[#1a2b4c] font-['Gilroy'] mb-1">41</div>
                <div className="text-xs font-semibold text-gray-500">eMSPs</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#E55A43]">
                <BatteryCharging className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-[#EBECEF] p-5 rounded-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),_0_4px_10px_rgba(0,0,0,0.05)] border border-white/50 flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-[#1a2b4c] font-['Gilroy'] mb-1">38</div>
                <div className="text-xs font-semibold text-gray-500">Platform</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#E55A43]">
                <Smartphone className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-[#EBECEF] p-5 rounded-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),_0_4px_10px_rgba(0,0,0,0.05)] border border-white/50 flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-[#1a2b4c] font-['Gilroy'] mb-1">254</div>
                <div className="text-xs font-semibold text-gray-500">Clients</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#E55A43]">
                <Users className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-[#EBECEF] p-8 rounded-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),_0_4px_10px_rgba(0,0,0,0.05)] border border-white/50 relative">
              <h3 className="text-lg font-bold text-[#1a2b4c] font-['Gilroy'] mb-6 absolute top-8 left-8">DC Charger Licenses</h3>
              <div className="mt-12 flex justify-center">
                <ConcentricDonut 
                  centerLabel="Total"
                  centerValue="500"
                  data={[
                    { label: "Total DC Licenses", color: "#3B82F6", value: 85, radius: 70 },
                    { label: "Available DC Licenses", color: "#EF4444", value: 70, radius: 56 },
                    { label: "Active DC Licenses", color: "#EAB308", value: 45, radius: 42 }
                  ]}
                />
              </div>
            </div>

            <div className="bg-[#EBECEF] p-8 rounded-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),_0_4px_10px_rgba(0,0,0,0.05)] border border-white/50 relative">
              <h3 className="text-lg font-bold text-[#1a2b4c] font-['Gilroy'] mb-6 absolute top-8 left-8">AC Charger Licenses</h3>
              <div className="mt-12 flex justify-center">
                <ConcentricDonut 
                  centerLabel="Total"
                  centerValue="800"
                  data={[
                    { label: "Total AC Licenses", color: "#3B82F6", value: 92, radius: 70 },
                    { label: "Available AC Licenses", color: "#EF4444", value: 60, radius: 56 },
                    { label: "Active AC Licenses", color: "#EAB308", value: 30, radius: 42 }
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#EBECEF] p-8 rounded-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),_0_4px_10px_rgba(0,0,0,0.05)] border border-white/50 relative">
              <h3 className="text-lg font-bold text-[#1a2b4c] font-['Gilroy'] mb-6 absolute top-8 left-8">Total EV Owners</h3>
              <div className="mt-12 flex justify-center">
                <ConcentricDonut 
                  centerLabel="Total"
                  centerValue="254"
                  data={[
                    { label: "EV Users", color: "#3B82F6", value: 75, radius: 70 },
                    { label: "Active Users", color: "#EF4444", value: 50, radius: 56 },
                    { label: "Inactive Users", color: "#EAB308", value: 25, radius: 42 }
                  ]}
                />
              </div>
            </div>

            <div className="bg-[#EBECEF] p-8 rounded-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),_0_4px_10px_rgba(0,0,0,0.05)] border border-white/50 relative">
              <h3 className="text-lg font-bold text-[#1a2b4c] font-['Gilroy'] mb-6 absolute top-8 left-8">Total Chargers</h3>
              <div className="mt-12 flex justify-center">
                <ConcentricDonut 
                  centerLabel="Total"
                  centerValue="1300"
                  data={[
                    { label: "Total chargers", color: "#3B82F6", value: 80, radius: 70 },
                    { label: "Commissioned chargers", color: "#EF4444", value: 55, radius: 56 }
                  ]}
                />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

`

### src\app\dc-chargers\page.tsx
`	sx
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

export default function DCChargersPage() {
  return (
    <div className="min-h-screen bg-[#F1EFE1] text-[#222222] font-['Figtree'] selection:bg-[#00F0FF] selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <main className="pt-24 md:pt-32 pb-12 md:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:6 lg:px-8">
          <motion.div 
            className="text-center max-w-4xl mx-auto mb-12 md:mb-20"
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00F0FF]/30 bg-[#00F0FF]/5 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{ fontFamily: 'var(--font-figtree)' }}
            >
              <Zap size={16} className="text-[#00F0FF]" />
              <span className="text-base font-semibold tracking-wider text-[#00F0FF] uppercase" style={{ fontFamily: 'Figtree, sans-serif' }}>Commercial & Fleet Solutions</span>
            </motion.div>
            
            <h1 className="flex flex-col gap-1 mb-6 tracking-tighter" style={{ fontFamily: '"Gilroy", sans-serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              <span className="text-[#222222]">Ultra-Fast DC Charging</span>
              <span className="text-[#888888] italic">for Commercial Hubs</span>
            </h1>
            <motion.p 
              style={{
                fontFamily: 'var(--font-figtree), sans-serif',
                fontSize: 'clamp(16px, 2vw, 18px)',
                color: 'rgba(0,0,0,0.6)',
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
      <div className="bg-[#F1EFE1]">
        <ScrollRevealSection
          imageSrc="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=1200"
          imageAlt="DYU Configurable DC Fast Charger"
          title="Configurable DC Fast Charger"
          description="High-power DC fast charging solutions available in multiple variants from 60 kW to 360 kW, built to support different business use cases and scalable deployments across locations."
          features={[
            {
              title: "Scalable Architecture",
              desc: "Easily upgrade charging capabilities from 60 kW up to 360 kW as your commercial fleet or user base grows."
            },
            {
              title: "Multi-Protocol Support",
              desc: "CCS2 and CHAdeMO compliant, ensuring compatibility with all major modern electric vehicles."
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
              <span className="text-[#222222]">DC Charger</span>
              <span className="text-[#888888] italic">60kW to 120kW</span>
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
          imageAlt="DC Charger 80kW to 360kW"
          title={
            <>
              <span className="text-[#222222]">DC Charger</span>
              <span className="text-[#888888] italic">80kW to 360kW</span>
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
              <span className="text-[#888888] italic">DC Fast Chargers?</span>
            </h2>
            <p className="text-lg text-gray-600">
              Engineered for absolute reliability, our commercial chargers form the backbone of India's rapidly growing EV infrastructure.
            </p>
          </div>

          <div className="flex flex-col relative w-full max-w-3xl mx-auto pb-32">
            {[
              {
                icon: <Server className="w-10 h-10 text-[#00F0FF]" />,
                title: "Smart Monitoring",
                desc: "Use remote monitoring, app control, and secure OTA updates to manage your chargers with absolute ease."
              },
              {
                icon: <ShieldCheck className="w-10 h-10 text-[#00F0FF]" />,
                title: "Built for Heavy-Duty",
                desc: "Designed to handle high-traffic locations and large commercial fleet charging volumes 24/7 reliably."
              },
              {
                icon: <TrendingUp className="w-10 h-10 text-[#00F0FF]" />,
                title: "Universal Compatibility",
                desc: "Works seamlessly across leading EV brands and large-scale commercial fleet vehicles in India."
              },
              {
                icon: <CheckCircle2 className="w-10 h-10 text-[#00F0FF]" />,
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
                <div className="w-20 h-20 shrink-0 bg-[#00F0FF]/10 rounded-2xl flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="mb-3 text-[#333333]" style={{ fontFamily: '"Gilroy", sans-serif', fontWeight: 800, letterSpacing: '0.5px', fontSize: '1.125rem', lineHeight: '1.2' }}>{feature.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Models Section */}
      <style>{`
        @keyframes spinBorder {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spin-border-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(from 0deg, transparent 0%, transparent 35%, #00008b 45%, #90ee90 50%, transparent 50%, transparent 85%, #00008b 95%, #90ee90 100%);
          animation: spinBorder 4s linear infinite;
          z-index: 0;
        }
        @keyframes cardMorphing {
          0%, 100% { border-radius: 24px; }
          33% { border-radius: 40px 16px 50px 24px; }
          66% { border-radius: 16px 50px 24px 40px; }
        }
        .morph-card-anim {
          animation: cardMorphing 8s ease-in-out infinite;
        }
      `}</style>
      <section className="py-24 bg-[#F1EFE1] text-[#222222] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#00F0FF]/5 rounded-bl-[100px] blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
              <span className="text-[#222222]">Choose Your EV Charging</span>
              <span className="text-[#888888] italic">Business Model</span>
            </h2>
            <p className="text-lg text-[#888888]">
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
              className="relative p-[3px] overflow-hidden group morph-card-anim shadow-2xl"
            >

              <div className="relative z-10 bg-[#222222] h-full w-full p-8 md:p-10 morph-card-anim flex flex-col">
                <div className="absolute inset-0 -z-10 opacity-60 mesh-bg-anim transition-opacity duration-700 group-hover:opacity-100" />

              <div className="mb-6">
                <span className="text-base font-semibold tracking-widest text-[#00F0FF] uppercase mb-2 block">Model 01 — FOCO</span>
                <h3 className="text-white" style={{ fontFamily: '"Gilroy", sans-serif', fontWeight: 800, letterSpacing: '0.5px', fontSize: '1.25rem', lineHeight: '1.2' }}>Franchise Owned, Company Operated</h3>
              </div>
              <p className="text-[#666666] mb-8 h-20">
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
                    <CheckCircle2 className="w-5 h-5 text-[#00F0FF] shrink-0 mt-0.5" />
                    <span className="text-[#888888] text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/contact-us" className="inline-flex items-center justify-center w-full bg-[#00F0FF] text-white py-4 px-8 rounded-full font-extrabold hover:bg-[#00C0CC] transition-colors mt-auto">
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
              className="relative p-[3px] overflow-hidden group morph-card-anim shadow-2xl"
              style={{ animationDelay: '-4s' }}
            >

              <div className="relative z-10 bg-[#222222] h-full w-full p-8 md:p-10 morph-card-anim flex flex-col" style={{ animationDelay: '-4s' }}>
                <div className="absolute inset-0 -z-10 opacity-60 mesh-bg-anim transition-opacity duration-700 group-hover:opacity-100" style={{ animationDelay: '-5s' }} />

              <div className="mb-6">
                <span className="text-base font-semibold tracking-widest text-[#666666] uppercase mb-2 block">Model 02 — Direct</span>
                <h3 className="text-white" style={{ fontFamily: '"Gilroy", sans-serif', fontWeight: 800, letterSpacing: '0.5px', fontSize: '1.25rem', lineHeight: '1.2' }}>Outright Purchase</h3>
              </div>
              <p className="text-[#666666] mb-8 h-20">
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
                    <CheckCircle2 className="w-5 h-5 text-[#666666] shrink-0 mt-0.5" />
                    <span className="text-[#888888] text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/contact-us" className="inline-flex items-center justify-center w-full bg-white/10 text-white py-4 px-8 rounded-full font-extrabold hover:bg-white/20 transition-colors mt-auto">
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

`

### src\app\ev-calculator\page.tsx
`	sx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  Wind,
  Droplet,
  CircleDollarSign,
  TreePine,
  Zap,
  MessageCircle,
  MapPin,
  Users,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { ImageTrail } from "../../components/ImageTrail";

export default function EVCalculatorPage() {
  const [dailyKm, setDailyKm] = useState<number>(50);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);

  const annualKm = dailyKm * daysPerWeek * 52;
  const co2Prevented = (annualKm * 0.12).toFixed(0); 
  const moneySaved = (annualKm * 8).toLocaleString("en-IN"); 
  const treesAbsorbed = Math.round(Number(co2Prevented) / 21);

  return (
    <div className="min-h-screen relative font-['Figtree'] bg-[#F1EFE1] text-[#222222]">
      
      {/* FIXED BACKGROUND OVERLAY (matching DYU Franchise page) */}
      <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-[#F1EFE1]/80 via-[#F1EFE1]/90 to-[#F1EFE1] backdrop-blur-[2px]" />

      <main className="pb-20 relative">
        
        {/* HERO SECTION */}
        <section className="min-h-[50vh] flex items-center justify-center relative z-10 pt-[8.5rem] pb-16 overflow-hidden">
          {/* BACKGROUND VIDEO */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
          {/* DARK OVERLAY (Light Black Parda) */}
          <div className="absolute inset-0 bg-black/60 z-0" />
          
          <div className="container mx-auto px-4 text-center relative z-10">
            
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 shadow-sm"
              style={{ fontFamily: 'var(--font-figtree)' }}
            >
              <span className="text-base font-extrabold text-white" style={{ fontFamily: 'Figtree, sans-serif' }}>Real-Time Environmental Savings</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-col gap-1 mb-6 tracking-tighter"
              style={{ fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}
            >
              <span className="text-white">Your Charge.</span>
              <span className="text-gray-300 italic">Your Climate Impact.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl font-bold text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              You didn't just power your EV - you powered a cleaner planet. Join the revolution that's transforming India's roads.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white/10 shadow-2xl backdrop-blur-xl border border-white/10 rounded-3xl p-8 max-w-2xl mx-auto mt-12"
            >
              <p className="text-white/90 font-extrabold text-lg mb-6 tracking-wider uppercase">Average Monthly Impact</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-4xl md:text-5xl font-extrabold text-white mb-2">8,005 kg</p>
                  <p className="text-gray-300 text-lg">CO2 Prevented Monthly</p>
                </div>
                <div>
                  <p className="text-4xl md:text-5xl font-extrabold text-white mb-2">33,759</p>
                  <p className="text-gray-300 text-lg">Charging Sessions</p>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* WHY IT MATTERS SECTION */}
        <section className="py-20 relative z-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="flex flex-col gap-1 mb-8 text-3xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1] relative z-10">
                <span className="text-[#222222]">Start Making</span>
                <span className="text-[#888888] italic">a Difference Today</span>
              </h2>
              <p className="text-xl text-[#666666] font-bold">Real facts behind switching to an EV</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#222222] shadow-xl backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-10 text-white text-center hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                  <Droplet size={32} />
                </div>
                <p className="text-3xl font-extrabold mb-3">2.3 kg</p>
                <p className="text-[#888888] text-lg leading-relaxed">1 litre of petrol = ~2.3 kg of CO2</p>
              </div>
              
              <div className="bg-[#222222] shadow-xl backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-10 text-white text-center hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                  <Wind size={32} />
                </div>
                <p className="text-3xl font-extrabold mb-3">70%</p>
                <p className="text-[#888888] text-lg leading-relaxed">EVs cut emissions by up to 70%</p>
              </div>
              
              <div className="bg-[#222222] shadow-xl backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-10 text-white text-center hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                  <Leaf size={32} />
                </div>
                <p className="text-3xl font-extrabold mb-3">4-6 tons</p>
                <p className="text-[#888888] text-lg leading-relaxed">CO2 avoided per year driving electric</p>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE CALCULATOR SECTION */}
        <section className="py-24 relative z-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="flex flex-col gap-1 mb-6 text-4xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-[#222222]">Calculate Your</span>
                <span className="text-[#888888] italic">Impact</span>
              </h2>
              <p className="text-xl text-[#666666] font-bold">Move the sliders to describe your commute.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
              
              {/* Controls */}
              <div className="bg-[#222222] shadow-xl backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12 text-white">
                <h3 className="text-3xl font-extrabold mb-2 flex items-center gap-3">
                  <Zap className="text-white w-8 h-8" />
                  Your Driving Habits
                </h3>
                <p className="text-[#888888] text-lg mb-12">Tell us about your daily commute</p>
                
                <div className="space-y-12">
                  <div>
                    <div className="flex justify-between mb-4">
                      <label className="text-xl font-bold">Daily Kilometers</label>
                      <span className="text-white font-extrabold text-2xl">{dailyKm} km</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="200"
                      step="1"
                      value={dailyKm}
                      onChange={(e) => setDailyKm(Number(e.target.value))}
                      className="w-full h-3 bg-white/20 rounded-full appearance-none cursor-pointer accent-white"
                    />
                    <div className="flex justify-between text-base text-[#888888] font-semibold mt-3">
                      <span>10 km</span>
                      <span>200 km</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-4">
                      <label className="text-xl font-bold">Days per Week</label>
                      <span className="text-white font-extrabold text-2xl">{daysPerWeek} days</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="7"
                      step="1"
                      value={daysPerWeek}
                      onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                      className="w-full h-3 bg-white/20 rounded-full appearance-none cursor-pointer accent-white"
                    />
                    <div className="flex justify-between text-base text-[#888888] font-semibold mt-3">
                      <span>1 day</span>
                      <span>7 days</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-14 pt-8 border-t border-white/10">
                  <p className="text-[#888888] text-lg font-bold mb-2">Total Kilometers per year</p>
                  <p className="text-4xl md:text-5xl font-extrabold">{annualKm.toLocaleString()}</p>
                </div>
              </div>
              
              {/* Results */}
              <div className="space-y-6 flex flex-col justify-center">
                <div className="bg-white shadow-xl backdrop-blur-lg rounded-3xl p-8 md:p-10 flex items-center gap-8 border border-gray-200">
                  <div className="w-20 h-20 bg-[#F1EFE1] rounded-2xl flex items-center justify-center text-[#222222] shrink-0">
                    <Wind size={40} />
                  </div>
                  <div>
                    <p className="text-4xl md:text-5xl font-extrabold text-[#222222] mb-2">{Number(co2Prevented).toLocaleString()} kg</p>
                    <p className="text-[#666666] font-bold text-lg">CO2 Emissions Prevented</p>
                  </div>
                </div>
                
                <div className="bg-white shadow-xl backdrop-blur-lg rounded-3xl p-8 md:p-10 flex items-center gap-8 border border-gray-200">
                  <div className="w-20 h-20 bg-[#F1EFE1] rounded-2xl flex items-center justify-center text-[#222222] shrink-0">
                    <CircleDollarSign size={40} />
                  </div>
                  <div>
                    <p className="text-4xl md:text-5xl font-extrabold text-[#222222] mb-2">₹{moneySaved}</p>
                    <p className="text-[#666666] font-bold text-lg">Money Saved Annually</p>
                  </div>
                </div>
                
                <div className="bg-white shadow-xl backdrop-blur-lg rounded-3xl p-8 md:p-10 flex items-center gap-8 border border-gray-200">
                  <div className="w-20 h-20 bg-[#F1EFE1] rounded-2xl flex items-center justify-center text-[#222222] shrink-0">
                    <TreePine size={40} />
                  </div>
                  <div>
                    <p className="text-4xl md:text-5xl font-extrabold text-[#222222] mb-2">{treesAbsorbed}</p>
                    <p className="text-[#666666] font-bold text-lg">Trees Worth of CO2 Absorption</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* MOVEMENT SECTION */}
        <section className="py-20 relative z-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="flex flex-col gap-1 mb-6 text-4xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-[#222222]">Keep the Movement</span>
                <span className="text-[#888888] italic">Going</span>
              </h2>
              <p className="text-xl text-[#666666] font-bold max-w-2xl mx-auto">Small actions after every charge can grow your impact even more.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white shadow-lg rounded-3xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                <div className="w-14 h-14 bg-[#222222] rounded-xl flex items-center justify-center text-white mb-6">
                  <Zap size={28} />
                </div>
                <h3 className="text-2xl font-extrabold mb-3 text-[#222222] tracking-tight">Choose EV charging</h3>
                <p className="text-[#666666] font-medium leading-relaxed">Every charge is a vote for cleaner air and a sustainable future.</p>
              </div>
              <div className="bg-white shadow-lg rounded-3xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                <div className="w-14 h-14 bg-[#222222] rounded-xl flex items-center justify-center text-white mb-6">
                  <MessageCircle size={28} />
                </div>
                <h3 className="text-2xl font-extrabold mb-3 text-[#222222] tracking-tight">Talk about it</h3>
                <p className="text-[#666666] font-medium leading-relaxed">Your experiences inspire friends and family to make the switch.</p>
              </div>
              <div className="bg-white shadow-lg rounded-3xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                <div className="w-14 h-14 bg-[#222222] rounded-xl flex items-center justify-center text-white mb-6">
                  <MapPin size={28} />
                </div>
                <h3 className="text-2xl font-extrabold mb-3 text-[#222222] tracking-tight">Cleaner routes</h3>
                <p className="text-[#666666] font-medium leading-relaxed">Choose charging stations powered by renewable energy.</p>
              </div>
              <div className="bg-white shadow-lg rounded-3xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                <div className="w-14 h-14 bg-[#222222] rounded-xl flex items-center justify-center text-white mb-6">
                  <Users size={28} />
                </div>
                <h3 className="text-2xl font-extrabold mb-3 text-[#222222] tracking-tight">Be part of shift</h3>
                <p className="text-[#666666] font-medium leading-relaxed">Join millions of Indians driving towards carbon neutrality.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 relative z-20">
          <div className="container mx-auto px-4 text-center max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#222222] shadow-2xl backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 md:p-20"
            >
              <h2 className="flex flex-col gap-2 mb-8 text-3xl md:text-5xl font-extrabold tracking-tighter leading-tight">
                <span className="text-white">The next time you plug in, remember -</span>
                <span className="text-[#888888] italic text-2xl md:text-4xl mt-2">you're not just charging a vehicle.</span>
                <span className="text-white text-4xl md:text-6xl mt-4">You're changing the game.</span>
              </h2>
              
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12">
                Join thousands of Indians who choose clean energy every day. Every charge matters. Every journey counts.
              </p>
              
              <div className="flex justify-center">
                <Link href="/dc-chargers" className="btn-primary flex items-center gap-2 text-lg">
                  View Our Chargers <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-20 mt-20 pt-16 border-t border-white/10">
                <div>
                  <p className="text-4xl md:text-5xl font-extrabold text-white mb-3">50,000+</p>
                  <p className="text-[#888888] font-bold uppercase tracking-widest text-sm">Happy EV Drivers</p>
                </div>
                <div>
                  <p className="text-4xl md:text-5xl font-extrabold text-white mb-3">8,000+</p>
                  <p className="text-[#888888] font-bold uppercase tracking-widest text-sm">Charging Stations</p>
                </div>
                <div>
                  <p className="text-4xl md:text-5xl font-extrabold text-white mb-3">500+</p>
                  <p className="text-[#888888] font-bold uppercase tracking-widest text-sm">Charging Locations</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>



      </main>
    </div>
  );
}

`

### src\app\ev-charging-app\page.tsx
`	sx
"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { 
  ArrowRight,
  Smartphone,
  MapPin,
  CreditCard,
  Headset,
  Building2,
  TrendingUp,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Download,
  PlugZap,
  Star,
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

export default function EvChargingAppPage() {
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
        <section className="min-h-[70vh] flex items-center justify-center relative z-10">
          <div className="container mx-auto px-4 text-center">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#222222]/10 backdrop-blur-md border border-[#222222]/20 mb-8 shadow-sm"
              style={{ fontFamily: 'var(--font-figtree)' }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-pulse" />
              <span className="text-base font-extrabold text-[#222222]" style={{ fontFamily: 'Figtree, sans-serif' }}>Discover • Charge • Pay</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-col gap-1 mb-6 tracking-tighter"
              style={{ fontFamily: '"Gilroy", sans-serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}
            >
              <span className="text-[#222222]">India's Best</span>
              <span className="text-[#888888] italic">EV Charging App</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl font-bold text-[#666666] max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              Find nearby EV charging stations, plan routes, pay seamlessly, and charge with confidence using DYU.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center flex-wrap gap-4 mb-16"
            >
              <button className="px-8 py-4 bg-[#222222] hover:bg-black text-white rounded-xl font-extrabold text-lg transition-all shadow-[0_0_20px_rgba(34,34,34,0.4)] flex items-center gap-2">
                Download App <ArrowRight className="w-5 h-5" />
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
                <h3 className="text-4xl font-black text-[#222222] mb-2 font-['Gilroy']">12M+</h3>
                <p className="text-[#666666] font-medium">Charging Sessions</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm border border-[#222222]/10 p-6 rounded-2xl shadow-sm">
                <h3 className="text-4xl font-black text-[#222222] mb-2 font-['Gilroy']">6000+</h3>
                <p className="text-[#666666] font-medium">EVs Charged Daily</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm border border-[#222222]/10 p-6 rounded-2xl shadow-sm flex flex-col justify-center">
                <h3 className="text-4xl font-black text-[#222222] mb-2 font-['Gilroy'] flex items-center justify-center gap-2">4.8 <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" /></h3>
                <p className="text-[#666666] font-medium">Rated By EV Drivers</p>
              </div>
            </motion.div>

          </div>
        </section>

        {/* APP VISUALS SECTION */}
        <section className="py-20 relative z-20 border-t border-black/5">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-[#222222]">Why Choose</span>
                <span className="text-[#888888] italic">DYU App?</span>
              </h2>
              <p className="text-xl text-[#666666] font-medium max-w-2xl mx-auto">
                Everything you need for a seamless EV experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-end">
              <div className="flex flex-col items-center text-center group cursor-default">
                <img src="/images/app-step-1.jpg" alt="Locate & Route" className="w-full h-auto object-contain mix-blend-multiply mb-8 group-hover:-translate-y-3 transition-transform duration-500" />
                <h3 className="text-2xl font-extrabold mb-3 font-['Gilroy'] text-[#222222]">Locate & Route</h3>
                <p className="text-[#666666] font-medium leading-relaxed">Easily find available chargers near you and plan your journey with optimal charging stops.</p>
              </div>
              <div className="flex flex-col items-center text-center group cursor-default">
                <img src="/images/app-step-2.jpg" alt="Connect & Charge" className="w-full h-auto object-contain mix-blend-multiply mb-8 group-hover:-translate-y-3 transition-transform duration-500" />
                <h3 className="text-2xl font-extrabold mb-3 font-['Gilroy'] text-[#222222]">Connect & Charge</h3>
                <p className="text-[#666666] font-medium leading-relaxed">Scan the QR code or use the app to start your charging session instantly without any hassle.</p>
              </div>
              <div className="flex flex-col items-center text-center group cursor-default">
                <img src="/images/app-step-3.jpg" alt="Pay & Go" className="w-full h-auto object-contain mix-blend-multiply mb-8 group-hover:-translate-y-3 transition-transform duration-500" />
                <h3 className="text-2xl font-extrabold mb-3 font-['Gilroy'] text-[#222222]">Pay & Go</h3>
                <p className="text-[#666666] font-medium leading-relaxed">Seamless automated payments from your DYU wallet so you can get back on the road faster.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ADVANCED FEATURES SECTION */}
        <section className="py-20 relative z-20 border-t border-black/5">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-[#222222]">Advanced Features for</span>
                <span className="text-[#888888] italic">effortless EV charging.</span>
              </h2>
              <p className="text-xl text-[#666666] max-w-2xl mx-auto font-medium">
                Smart charging solutions that move you forward.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#222222] p-8 rounded-3xl text-white shadow-xl hover:-translate-y-1 transition-transform border border-white/5">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-['Gilroy']" style={{ letterSpacing: '0.5px' }}>Find Nearby EV Chargers Instantly</h3>
                <p className="text-gray-400">Locate the nearest active EV charging stations in real time</p>
              </div>
              <div className="bg-[#222222] p-8 rounded-3xl text-white shadow-xl hover:-translate-y-1 transition-transform border border-white/5">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <Smartphone className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-['Gilroy']" style={{ letterSpacing: '0.5px' }}>Smart Route Planner with Charging Stops</h3>
                <p className="text-gray-400">Plan city and highway trips with built-in EV stops for stress-free travel.</p>
              </div>
              <div className="bg-[#222222] p-8 rounded-3xl text-white shadow-xl hover:-translate-y-1 transition-transform border border-white/5">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <CreditCard className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-['Gilroy']" style={{ letterSpacing: '0.5px' }}>Secure Wallet & Seamless Payments</h3>
                <p className="text-gray-400">Recharge your wallet, make instant EV charging payments, and track all your spending in one place.</p>
              </div>
              <div className="bg-[#222222] p-8 rounded-3xl text-white shadow-xl hover:-translate-y-1 transition-transform border border-white/5">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <Headset className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-['Gilroy']" style={{ letterSpacing: '0.5px' }}>24x7 Support & Real-Time Alerts</h3>
                <p className="text-gray-400">Get round-the-clock customer support, charging updates, and important alerts.</p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE SECTION */}
        <section className="py-20 relative z-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-[#222222]">Built for EV Drivers,</span>
                <span className="text-[#888888] italic">by EV Drivers</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/60 p-8 rounded-3xl border border-[#222222]/10 shadow-sm backdrop-blur-md">
                <Building2 className="w-10 h-10 text-[#00F0FF] mb-6" />
                <h3 className="text-xl font-extrabold text-[#222222] mb-3 font-['Gilroy']">10000+ Charging Stations</h3>
                <p className="text-[#666666]">One of India's fastest-growing EV charging networks, offering reliable charging in cities and on highways.</p>
              </div>
              <div className="bg-white/60 p-8 rounded-3xl border border-[#222222]/10 shadow-sm backdrop-blur-md">
                <TrendingUp className="w-10 h-10 text-[#00F0FF] mb-6" />
                <h3 className="text-xl font-extrabold text-[#222222] mb-3 font-['Gilroy']">High Uptime Network</h3>
                <p className="text-[#666666]">Chargers are continuously monitored to maintain reliability and reduce failed or interrupted sessions.</p>
              </div>
              <div className="bg-white/60 p-8 rounded-3xl border border-[#222222]/10 shadow-sm backdrop-blur-md">
                <Zap className="w-10 h-10 text-[#00F0FF] mb-6" />
                <h3 className="text-xl font-extrabold text-[#222222] mb-3 font-['Gilroy']">Nationwide DC Fast Charging</h3>
                <p className="text-[#666666]">Access fast chargers across cities and highways, ideal for long-distance EV travel.</p>
              </div>
              <div className="bg-white/60 p-8 rounded-3xl border border-[#222222]/10 shadow-sm backdrop-blur-md md:col-span-2">
                <ShieldCheck className="w-10 h-10 text-[#00F0FF] mb-6" />
                <h3 className="text-xl font-extrabold text-[#222222] mb-3 font-['Gilroy']">DYU Flux - Uninterrupted Charging</h3>
                <p className="text-[#666666]">Avoid slow charging caused by power sharing. Flux blocks shared power during your session, ensuring consistent charging speed from start to finish.</p>
              </div>
              <div className="bg-white/60 p-8 rounded-3xl border border-[#222222]/10 shadow-sm backdrop-blur-md">
                <CheckCircle2 className="w-10 h-10 text-[#00F0FF] mb-6" />
                <h3 className="text-xl font-extrabold text-[#222222] mb-3 font-['Gilroy']">Backed by Trusted Partners</h3>
                <p className="text-[#666666]">Charging available at partner locations including malls, corporate hubs, and key destinations across India.</p>
              </div>
            </div>
          </div>
        </section>

        {/* THREE EASY STEPS */}
        <section className="py-20 bg-[#222222] text-white relative z-20 overflow-hidden">
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                  <span className="text-[#222222]">Charge with the</span>
                  <span className="text-[#888888] italic">DYU App</span>
                </h2>
                <p className="text-gray-400 text-lg mb-12">
                  Real-time availability. Smart routing. Easy payments. Full control.
                </p>
                <h3 className="text-2xl font-bold mb-8 font-['Gilroy'] text-white">Three Easy Steps</h3>
                
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-xl flex-shrink-0">1</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Download & Sign Up</h4>
                      <p className="text-gray-400">Quick onboarding in minutes</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-xl flex-shrink-0">2</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Find a Charger Near You</h4>
                      <p className="text-gray-400">Search, filter & navigate easily</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-xl flex-shrink-0">3</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Plug, Play & Go</h4>
                      <p className="text-gray-400">Charge smoothly and continue your journey</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-12 flex-wrap">
                  <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-bold transition-all flex items-center gap-3">
                    <Download className="w-5 h-5" /> App Store
                  </button>
                  <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-bold transition-all flex items-center gap-3">
                    <Download className="w-5 h-5" /> Google Play
                  </button>
                </div>
              </div>

              <div className="relative flex justify-center">
                <div className="w-full max-w-[300px] aspect-[1/2] rounded-[2.5rem] border-[8px] border-white/10 bg-[#111111] shadow-2xl relative overflow-hidden flex items-center justify-center">
                  <div className="absolute top-0 inset-x-0 h-6 flex justify-center pt-2">
                    <div className="w-16 h-4 bg-black rounded-full" />
                  </div>
                  <PlugZap className="w-20 h-20 text-white/20" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#00F0FF]/20 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-20 relative z-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="flex flex-col gap-1 mb-12 text-3xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1] text-center">
              <span className="text-[#222222]">What Our</span>
              <span className="text-[#888888] italic">Users Say</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border border-[#222222]/10 p-8 rounded-3xl shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-[#222222] font-bold text-xl">R</div>
                  <div>
                    <h4 className="font-extrabold text-[#222222]">Rajeshbabu Dodda</h4>
                    <p className="text-sm text-[#888888] font-medium">Gurugram</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4 text-yellow-500">
                  <Star className="w-4 h-4 fill-yellow-500" /><Star className="w-4 h-4 fill-yellow-500" /><Star className="w-4 h-4 fill-yellow-500" /><Star className="w-4 h-4 fill-yellow-500" /><Star className="w-4 h-4 fill-yellow-500" />
                </div>
                <p className="text-[#666666]">Best charging network in India. The app is easy to use, and the interface is good. The prices are low, and the machines are reliable.</p>
              </div>
              <div className="bg-white border border-[#222222]/10 p-8 rounded-3xl shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-[#222222] font-bold text-xl">S</div>
                  <div>
                    <h4 className="font-extrabold text-[#222222]">Sohan Patel</h4>
                    <p className="text-sm text-[#888888] font-medium">Jaipur</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4 text-yellow-500">
                  <Star className="w-4 h-4 fill-yellow-500" /><Star className="w-4 h-4 fill-yellow-500" /><Star className="w-4 h-4 fill-yellow-500" /><Star className="w-4 h-4 fill-yellow-500" /><Star className="w-4 h-4 fill-yellow-500" />
                </div>
                <p className="text-[#666666]">DYU is the best charging company... The best thing about their charger is that it immediately starts charging without any hassle.</p>
              </div>
              <div className="bg-white border border-[#222222]/10 p-8 rounded-3xl shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-[#222222] font-bold text-xl">M</div>
                  <div>
                    <h4 className="font-extrabold text-[#222222]">Manish Saran</h4>
                    <p className="text-sm text-[#888888] font-medium">Delhi</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4 text-yellow-500">
                  <Star className="w-4 h-4 fill-yellow-500" /><Star className="w-4 h-4 fill-yellow-500" /><Star className="w-4 h-4 fill-yellow-500" /><Star className="w-4 h-4 fill-yellow-500" /><Star className="w-4 h-4 fill-yellow-500" />
                </div>
                <p className="text-[#666666]">One of the most trusted charging apps and station networks I've used! Reliable, user-friendly interface with accurate station availability and real-time updates.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FUTURE CTA */}
        <section className="py-20 relative z-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="flex flex-col gap-1 mb-10 text-4xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
              <span className="text-[#222222]">Ready to</span>
              <span className="text-[#888888] italic">Drive Smart?</span>
            </h2>
            <div className="flex justify-center flex-wrap gap-4">
              <button className="px-8 py-4 bg-[#222222] hover:bg-black text-white rounded-xl font-extrabold text-lg transition-all shadow-[0_0_20px_rgba(34,34,34,0.4)] flex items-center gap-2">
                Download on App Store
              </button>
              <button className="px-8 py-4 bg-[#222222] hover:bg-black text-white rounded-xl font-extrabold text-lg transition-all shadow-[0_0_20px_rgba(34,34,34,0.4)] flex items-center gap-2">
                Get it on Google Play
              </button>
            </div>
          </div>
        </section>

        {/* FAQS */}
        <section className="py-20 relative z-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-[#222222]">Got questions about</span>
                <span className="text-[#888888] italic">the DYU App?</span>
              </h2>
            </div>

            <div className="space-y-2">
              <FAQItem 
                question="Which is the best EV charging app in India?" 
                answer="The best EV charging app is one that helps you easily find, access, and pay for charging without confusion. The DYU App offers a large network of charging stations across India, along with real-time availability, route planning, and seamless payments, making it suitable for daily EV use." 
              />
              <FAQItem 
                question="Do you need an app to charge your EV?" 
                answer="Yes, having an EV charging app like DYU makes the process much more convenient. It allows you to find nearby chargers, check their availability, plan routes, and pay for the charging session directly from your phone." 
              />
              <FAQItem 
                question="How do I find a fast EV charging station near me?" 
                answer="You can use the DYU App to locate fast EV charging stations near your location. Simply open the app, and the map will show you available fast chargers along with their current status and charging speeds." 
              />
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

`

### src\app\ev-charging-software\csms\page.tsx
`	sx
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

`

### src\app\ev-charging-software\evlinq\page.tsx
`	sx
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
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="border border-white/10 bg-[#222222] shadow-xl backdrop-blur-md rounded-2xl mb-4 overflow-hidden"
    >
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
    </motion.div>
  );
};

// Common animation variants
const fadeUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" }
};

const staggerItemProps = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, ease: "easeOut" }
};

export default function EVLinqPage() {
  const introRef = useRef<HTMLElement>(null);
  const { scrollYProgress: introScrollYProgress } = useScroll({
    target: introRef,
    offset: ["start start", "end end"]
  });

  const introText = "EVlinq is a roaming platform that connects multiple EV charging networks through a single integration, enabling charge point operators (CPOs), eMobility service providers (eMSPs), OEMs, and fleet operators to access and share charging infrastructure across networks. As EV adoption grows, interoperability between networks becomes essential. EVlinq simplifies this by acting as a central roaming layer that allows different charging networks to work together without requiring multiple integrations or agreements.";
  const introWords = introText.split(" ");

  return (
    <div className="min-h-screen relative font-['Figtree'] bg-[#F1EFE1] text-[#222222]">
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

      <main className="pt-32 pb-20 relative">
        
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
            Your Go-To EV Charging <span className="italic text-[#222222]">Roaming Platform</span>
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
        <section className="py-24 relative z-20 bg-[#222222] overflow-hidden mt-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <motion.h2 {...fadeUpProps} className="text-4xl md:text-5xl font-['Gilroy'] font-extrabold text-white mb-6 tracking-tighter">
                Key <span className="text-[#888888] italic">Features</span>
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
                  className="bg-[#111111] p-8 rounded-3xl text-white shadow-xl hover:-translate-y-1 transition-transform border border-white/5"
                >
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 font-['Gilroy']">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </motion.div>
              ))}

              <motion.div 
                {...staggerItemProps}
                transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
                className="bg-[#111111] p-8 rounded-3xl text-white shadow-xl hover:-translate-y-1 transition-transform border border-white/5 lg:col-span-3 lg:max-w-md lg:mx-auto"
              >
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <Lock className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-['Gilroy']">Encrypted data exchange</h3>
                <p className="text-gray-400">Ensure secure and reliable data transfer between connected charging networks.</p>
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
                      <div className="mt-1 bg-[#222222] rounded-full p-1 flex-shrink-0">
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
                className="bg-[#222222] p-10 rounded-[2rem] shadow-lg flex flex-col h-full text-white"
              >
                <div className="mb-8">
                  <h3 className="text-3xl font-extrabold text-white mb-3 font-['Gilroy']">For OEMs</h3>
                  <p className="text-gray-400 font-medium leading-relaxed">
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
                      <div className="mt-1 bg-white rounded-full p-1 flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-[#222222]" />
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
              className="bg-[#222222] p-12 md:p-16 rounded-[3rem] shadow-2xl border-4 border-white/20"
            >
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-white">Enable EV Roaming with a</span>
                <span className="text-[#888888] italic">Single Integration</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium mb-10">
                Connect to multiple EV charging networks, without multiple integrations!
              </p>
              <button className="px-10 py-5 bg-white hover:bg-gray-100 text-[#222222] rounded-xl font-extrabold text-lg transition-all flex items-center gap-2 mx-auto">
                Talk to an Expert <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* FAQS */}
        <section className="py-20 relative z-20 overflow-hidden">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <motion.h6 {...fadeUpProps} className="text-[#666666] font-bold tracking-widest uppercase mb-4 text-sm">FAQs</motion.h6>
              <motion.h2 {...fadeUpProps} transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }} className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-[#222222]">Got questions about</span>
                <span className="text-[#888888] italic">EVLinq?</span>
              </motion.h2>
              <motion.p {...fadeUpProps} transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }} className="text-xl text-[#666666] max-w-2xl mx-auto font-medium">
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
              <button className="px-8 py-4 bg-[#222222] hover:bg-black text-white rounded-xl font-extrabold text-lg transition-all shadow-xl flex items-center gap-2">
                Got More Questions? <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </section>

      </main>
    </div>
  );
}

`

### src\app\ev-charging-station-franchise\page.tsx
`	sx
"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  TrendingUp, 
  Headset, 
  BadgeCheck, 
  ArrowRight,
  MapPin,
  Zap,
  CheckCircle2,
  Wallet,
  Landmark,
  BarChart3,
  Wrench,
  ShoppingBag,
  Car,
  Briefcase,
  CircleDollarSign,
  ChevronDown,
  ChevronUp
} from "lucide-react";

const calculatorData = {
  "60 kW": {
    cost: "12,00,000",
    loan: "9,60,000",
    equity: "2,40,000",
    year1Roi: "120.5%",
    table: [
      { year: 1, roi: "10%", roe: "45%" },
      { year: 2, roi: "12%", roe: "50%" },
      { year: 3, roi: "15%", roe: "60%" },
      { year: 4, roi: "25%", roe: "110%" },
      { year: 5, roi: "40%", roe: "150%" },
      { year: 6, roi: "60%", roe: "220%" },
      { year: 7, roi: "80%", roe: "300%" },
      { year: 8, roi: "90%", roe: "350%" }
    ]
  },
  "120 kW": {
    cost: "22,50,000",
    loan: "18,00,000",
    equity: "4,50,000",
    year1Roi: "145.2%",
    table: [
      { year: 1, roi: "12%", roe: "55%" },
      { year: 2, roi: "14%", roe: "58%" },
      { year: 3, roi: "18%", roe: "85%" },
      { year: 4, roi: "30%", roe: "140%" },
      { year: 5, roi: "45%", roe: "210%" },
      { year: 6, roi: "68%", roe: "300%" },
      { year: 7, roi: "85%", roe: "380%" },
      { year: 8, roi: "95%", roe: "420%" }
    ]
  },
  "180 kW": {
    cost: "31,50,000",
    loan: "25,20,000",
    equity: "6,30,000",
    year1Roi: "155.4%",
    table: [
      { year: 1, roi: "13%", roe: "62%" },
      { year: 2, roi: "14%", roe: "65%" },
      { year: 3, roi: "18%", roe: "92%" },
      { year: 4, roi: "32%", roe: "155%" },
      { year: 5, roi: "48%", roe: "235%" },
      { year: 6, roi: "71%", roe: "340%" },
      { year: 7, roi: "88%", roe: "420%" },
      { year: 8, roi: "96%", roe: "460%" }
    ]
  },
  "240 kW": {
    cost: "40,40,000",
    loan: "32,32,000",
    equity: "8,08,000",
    year1Roi: "162.3%",
    table: [
      { year: 1, roi: "14%", roe: "68%" },
      { year: 2, roi: "15%", roe: "59%" },
      { year: 3, roi: "19%", roe: "97%" },
      { year: 4, roi: "33%", roe: "163%" },
      { year: 5, roi: "50%", roe: "252%" },
      { year: 6, roi: "74%", roe: "370%" },
      { year: 7, roi: "91%", roe: "456%" },
      { year: 8, roi: "98%", roe: "491%" }
    ]
  }
};

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

export default function FranchisePage() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [selectedCharger, setSelectedCharger] = useState<keyof typeof calculatorData>("240 kW");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const currentCalcData = calculatorData[selectedCharger];

  return (
    <div ref={containerRef as React.RefObject<HTMLDivElement>} className="min-h-screen relative font-['Figtree'] bg-[#F1EFE1] text-[#222222]">
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
        <section className="min-h-[70vh] flex items-center justify-center relative z-10">
          <div className="container mx-auto px-4 text-center">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#222222]/10 backdrop-blur-md border border-[#222222]/20 mb-8 shadow-sm"
              style={{ fontFamily: 'var(--font-figtree)' }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-pulse" />
              <span className="text-base font-extrabold text-[#222222]" style={{ fontFamily: 'Figtree, sans-serif' }}>High ROI Business Opportunity</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-col gap-1 mb-6 tracking-tighter"
              style={{ fontFamily: '"Gilroy", sans-serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}
            >
              <span className="text-[#222222]">Start Your EV Charging</span>
              <span className="text-[#888888] italic">Station Franchise</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl font-bold text-[#666666] max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              Own India's EV Charging Infrastructure Starting from ₹30 Lakhs with DC fast charging stations (60kW - 360kW).
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center"
            >
              <button className="px-8 py-4 bg-white hover:bg-gray-200 text-[#222222] rounded-xl font-extrabold text-lg transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center gap-2">
                Enquire Now <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* FOCO MODEL SECTION */}
        <section className="py-20 relative z-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#222222] shadow-xl backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-16 text-center"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white font-extrabold text-base mb-6">
                Franchise Model
              </div>
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-white">FOCO (Franchise Owned,</span>
                <span className="text-[#888888] italic">Company Operated)</span>
              </h2>
              <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                Invest in EV charging stations backed by DYU's growing network and technology ecosystem. Through the FOCO model, investors own the charging infrastructure while DYU supports deployment, technology integration, and operational management.
              </p>
            </motion.div>
          </div>
        </section>

        {/* WHAT YOU DO VS WHAT DYU SUPPORTS */}
        <section className="py-10 relative z-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* What You Do */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#222222] shadow-xl backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-10"
              >
                <h3 className="text-2xl font-extrabold mb-8 flex items-center gap-3 text-white">
                  <Wallet className="w-8 h-8 text-[#888888]" /> What You Do
                </h3>
                <ul className="space-y-6">
                  {[
                    "Invest in the EV charging station setup",
                    "Participate in the growing EV infrastructure ecosystem",
                    "Earn revenue from charging usage at your station"
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <CheckCircle2 className="w-6 h-6 text-[#888888] flex-shrink-0 mt-0.5" />
                      <span className="text-lg text-gray-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* What DYU Supports */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#222222] shadow-xl backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-10"
              >
                <h3 className="text-2xl font-extrabold mb-8 flex items-center gap-3 text-white">
                  <Building2 className="w-8 h-8 text-[#888888]" /> What DYU Supports
                </h3>
                <ul className="space-y-5">
                  {[
                    "Location evaluation and assistance in identifying suitable sites if required",
                    "Charger technology and installation",
                    "Integration with DYU's charging network and app",
                    "Technical monitoring and uptime support",
                    "Branding and platform visibility"
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <CheckCircle2 className="w-6 h-6 text-[#888888] flex-shrink-0 mt-0.5" />
                      <span className="text-lg text-gray-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

            </div>
          </div>
        </section>

        {/* CALCULATOR SECTION (STATIC UI) */}
        <section className="py-20 relative z-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#222222] shadow-xl backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12"
            >
              <div className="text-center mb-12">
                <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                  <span className="text-white">Calculate Your EV</span>
                  <span className="text-[#888888] italic">Franchise Returns</span>
                </h2>
                <p className="text-[#888888] text-lg">Estimate your potential returns from a DYU EV charging station franchise investment.</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-10">
                {/* Left Controls */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-[#111111]/50 rounded-2xl p-6 border border-white/5">
                    <p className="text-base text-[#888888] font-extrabold mb-2 uppercase tracking-wider">Select Charger Type</p>
                    <div className="relative">
                      <div 
                        className="w-full bg-white/10 p-4 rounded-xl border border-white/10 text-white font-extrabold text-lg flex justify-between items-center cursor-pointer hover:bg-white/20 transition-colors"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                      >
                        {selectedCharger} <ChevronDown className={`w-5 h-5 text-[#888888] transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                      </div>
                      <AnimatePresence>
                        {dropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 w-full mt-2 bg-[#222222] border border-white/10 rounded-xl overflow-hidden z-30 shadow-2xl"
                          >
                            {(Object.keys(calculatorData) as Array<keyof typeof calculatorData>).map((type) => (
                              <div 
                                key={type}
                                className={`p-4 text-white font-bold cursor-pointer hover:bg-white/10 ${selectedCharger === type ? 'bg-white/5' : ''}`}
                                onClick={() => {
                                  setSelectedCharger(type);
                                  setDropdownOpen(false);
                                }}
                              >
                                {type}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  
                  <div className="bg-[#111111]/50 rounded-2xl p-6 border border-white/5 space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-white/10">
                      <span className="text-[#888888] font-extrabold text-base tracking-wider">INTEREST</span>
                      <span className="text-xl font-extrabold text-white">9%</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-white/10">
                      <span className="text-[#888888] font-extrabold text-base tracking-wider">LOAN TERM</span>
                      <span className="text-xl font-extrabold text-white">8 years</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#888888] font-extrabold text-base tracking-wider">LOAN PERCENTAGE</span>
                      <span className="text-xl font-extrabold text-white">80%</span>
                    </div>
                  </div>
                </div>

                {/* Right Cards */}
                <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
                  <div className="bg-[#222222] shadow-xl border border-white/5 rounded-2xl p-6 flex flex-col justify-center">
                    <p className="text-[#888888] font-medium mb-1">Total Project Cost</p>
                    <p className="text-4xl md:text-5xl font-['Gilroy'] font-extrabold text-white mb-2">₹ {currentCalcData.cost}</p>
                    <p className="text-base text-[#888888]">{selectedCharger} Charger</p>
                  </div>
                  <div className="bg-[#222222] shadow-xl border border-white/5 rounded-2xl p-6 flex flex-col justify-center">
                    <p className="text-[#888888] font-medium mb-1">Loan Availed</p>
                    <p className="text-4xl md:text-5xl font-['Gilroy'] font-extrabold text-white mb-2">₹ {currentCalcData.loan}</p>
                    <p className="text-base text-[#888888]">80% of total</p>
                  </div>
                  <div className="bg-[#222222] shadow-xl border border-white/5 rounded-2xl p-6 flex flex-col justify-center">
                    <p className="text-[#888888] font-medium mb-1">Equity Invested</p>
                    <p className="text-4xl md:text-5xl font-['Gilroy'] font-extrabold text-white mb-2">₹ {currentCalcData.equity}</p>
                    <p className="text-base text-[#888888]">20% of total</p>
                  </div>
                  <div className="bg-[#222222] shadow-xl border border-white/5 rounded-2xl p-6 flex flex-col justify-center">
                    <p className="text-[#888888] font-medium mb-1">Year 1 ROI</p>
                    <p className="text-4xl md:text-5xl font-['Gilroy'] font-extrabold text-white mb-2">{currentCalcData.year1Roi}</p>
                    <p className="text-base text-[#888888]">Return on investment</p>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="mt-12 overflow-x-auto">
                <h3 className="text-2xl font-extrabold mb-6 text-white">Investment Over The Years</h3>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-4 px-4 font-extrabold text-gray-300">Year</th>
                      <th className="py-4 px-4 font-extrabold text-gray-300">Return On Investment (ROI)</th>
                      <th className="py-4 px-4 font-extrabold text-gray-300">Return On Equity (ROE)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCalcData.table.map((row) => (
                      <tr key={row.year} className="border-b border-white/5 hover:bg-[#222222] shadow-xl transition-colors">
                        <td className="py-4 px-4 text-white font-extrabold">{row.year}</td>
                        <td className="py-4 px-4 text-[#888888] font-extrabold">{row.roi}</td>
                        <td className="py-4 px-4 text-[#888888] font-extrabold">{row.roe}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 relative z-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-[#222222]">How the EV Charging</span>
                <span className="text-[#888888] italic">Franchise Works</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Share Your Interest", desc: "Connect with the DYU team and share details about your location or investment interest. If you don't have a location, we can assist in identifying suitable high-demand sites." },
                { step: "02", title: "Site Evaluation", desc: "The location is evaluated based on EV demand, power availability, and accessibility." },
                { step: "03", title: "Installation and Integration", desc: "Once approved, charging infrastructure is installed and integrated into the DYU network." },
                { step: "04", title: "Go Live", desc: "Your EV charging station becomes active and available to EV users across the DYU platform." }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[#222222] shadow-xl backdrop-blur-md border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:bg-white/10 transition-all"
                >
                  <div className="text-6xl font-black text-white/5 absolute top-4 right-4 group-hover:scale-110 transition-transform">
                    {item.step}
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-6">
                    <span className="text-[#888888] font-extrabold text-xl">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-extrabold mb-4 text-white relative z-10">{item.title}</h3>
                  <p className="text-[#888888] text-base leading-relaxed relative z-10">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHO CAN START */}
        <section className="py-20 relative z-20">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
              <span className="text-[#222222]">Who Can Start an</span>
              <span className="text-[#888888] italic">EV Charging Station?</span>
            </h2>
            <p className="text-[#888888] text-lg mb-12">This opportunity is suitable for</p>

            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: Building2, text: "Commercial real estate owners" },
                { icon: ShoppingBag, text: "Mall & retail asset owners" },
                { icon: MapPin, text: "Highway property holders" },
                { icon: Briefcase, text: "SME business owners" },
                { icon: Landmark, text: "Infra-focused investors" }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[#222222] shadow-xl border border-white/10 rounded-full px-6 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors cursor-default"
                >
                  <item.icon className="w-5 h-5 text-[#888888]" />
                  <span className="font-medium text-white">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* MODELS & RANGE */}
        <section className="py-20 relative z-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12">
              
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="bg-[#222222] shadow-xl border border-white/5 rounded-3xl p-10">
                  <h3 className="text-[#888888] font-extrabold mb-2">Investment Range</h3>
                  <p className="text-4xl md:text-5xl font-extrabold text-white mb-4">₹30 Lakhs - ₹3 Crores+</p>
                  <p className="text-gray-300">Scalable investment starting from ₹30 lakhs</p>
                </div>
                
                <div className="bg-[#222222] shadow-xl border border-white/10 rounded-3xl p-10">
                  <h3 className="text-xl font-extrabold text-white mb-6">Station Configurations</h3>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {["60 kW", "120 kW", "240 kW", "360 kW"].map(kw => (
                      <span key={kw} className="bg-white/20 text-[#888888] px-4 py-2 rounded-lg font-extrabold border border-[#00F0FF]/20">{kw}</span>
                    ))}
                  </div>
                  <p className="text-[#888888]">Multiple configurations based on your location & usage. Supports 2-20 Parking Bays.</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                  <span className="text-[#222222]">Choose Your EV Charging</span>
                  <span className="text-[#888888] italic">Business Model</span>
                </h2>
                
                <div className="bg-[#222222] shadow-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-extrabold text-white mb-1">FOCO</h3>
                      <p className="text-gray-300 font-medium">Franchise Owned, Company Operated</p>
                    </div>
                    <span className="bg-white/10 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider text-white">Model 01</span>
                  </div>
                  <p className="text-[#888888] mb-6 text-base leading-relaxed">Ideal for investors, MSMEs, and businesses looking to participate in EV infrastructure while leveraging DYU's operational expertise.</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex gap-2 text-base text-gray-300"><CheckCircle2 className="w-5 h-5 text-gray-400 flex-shrink-0" /> Investment ranges from ₹30 Lakhs to ₹3 Crores</li>
                    <li className="flex gap-2 text-base text-gray-300"><CheckCircle2 className="w-5 h-5 text-gray-400 flex-shrink-0" /> DC Fast Charging Stations (60kW - 360kW)</li>
                    <li className="flex gap-2 text-base text-gray-300"><CheckCircle2 className="w-5 h-5 text-gray-400 flex-shrink-0" /> Charger deployment & technology by DYU</li>
                  </ul>
                  <button className="w-full py-3 bg-white hover:bg-gray-200 text-[#222222] rounded-xl font-extrabold transition-colors">Enquire Now</button>
                </div>

                <div className="bg-[#222222] shadow-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-extrabold text-white mb-1">Direct</h3>
                      <p className="text-gray-300 font-medium">Outright Purchase</p>
                    </div>
                    <span className="bg-white/10 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider text-white">Model 02</span>
                  </div>
                  <p className="text-[#888888] mb-6 text-base leading-relaxed">Best for hotels, fleet operators, commercial properties that want complete ownership and control of their charging infrastructure.</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex gap-2 text-base text-gray-300"><CheckCircle2 className="w-5 h-5 text-gray-400 flex-shrink-0" /> Complete ownership of the charger</li>
                    <li className="flex gap-2 text-base text-gray-300"><CheckCircle2 className="w-5 h-5 text-gray-400 flex-shrink-0" /> No recurring AMC or SaaS (optional)</li>
                    <li className="flex gap-2 text-base text-gray-300"><CheckCircle2 className="w-5 h-5 text-gray-400 flex-shrink-0" /> Flexible pricing, operations, and billing</li>
                  </ul>
                  <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-extrabold transition-colors border border-white/10">Enquire Now</button>
                </div>

              </motion.div>

            </div>
          </div>
        </section>

        {/* FAQS */}
        <section className="py-20 relative z-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-[#222222]">Frequently Asked</span>
                <span className="text-[#888888] italic">Questions</span>
              </h2>
              <p className="text-[#666666] text-lg font-medium">Have Questions About Starting an EV Charging Station?</p>
            </div>

            <div className="space-y-2">
              <FAQItem 
                question="How much can I realistically earn from an EV charging station?" 
                answer={
                  <div className="space-y-2">
                    <p>It depends on three main factors:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Location demand</li>
                      <li>Charger capacity (60kW vs 240kW+)</li>
                      <li>Daily usage (number of sessions)</li>
                    </ul>
                    <p>In high-traffic locations, revenue tends to grow as EV adoption increases. Returns may feel slow at the beginning, but improve over time with higher utilization.</p>
                  </div>
                } 
              />
              <FAQItem 
                question="What is the cost and investment required to start an EV charging station franchise in India?" 
                answer="The investment starts from ₹30 Lakhs and can go up to ₹3 Crores+, depending on the number of parking bays and the charger capacity (60kW to 360kW) you choose to install." 
              />
              <FAQItem 
                question="How do I actually start an EV charging station franchise?" 
                answer="Simply share your interest with our team. We will evaluate your site for EV demand and power availability, install the infrastructure, and integrate it with our network to go live." 
              />
              <FAQItem 
                question="How does the EV charging business model work?" 
                answer="Under the FOCO model, you invest in the physical infrastructure and earn revenue from charging sessions, while DYU handles the installation, software network, and maintenance." 
              />
              <FAQItem 
                question="Which is the best EV charging station franchise in India?" 
                answer="With high ROI, complete turnkey setup, 24/7 technical support, and an advanced technology ecosystem, DYU is rapidly emerging as the premier choice for EV charging franchises." 
              />
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

`

### src\app\faq\page.tsx
`	sx
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

`

### src\app\partner-with-us\page.tsx
`	sx
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
              className="text-2xl md:text-4xl font-black mb-6"
              style={{ fontFamily: "'Gilroy', sans-serif" }}
            >
              Partner <span className="text-gray-400">With Us</span>
            </h1>
            <p className="text-lg md:text-2xl font-medium max-w-3xl text-gray-500 mb-10 leading-snug" style={{ fontFamily: "var(--font-figtree)" }}>
              Manage, Monitor, and Optimise Your EV Charging Network.
            </p>
            <a 
              href="#request-form"
              className="inline-flex items-center gap-3 bg-[#222222] text-[#F1EFE1] px-8 py-4 text-lg font-bold tracking-wider hover:bg-gray-300 hover:text-[#222222] transition-colors"
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
              <span className="text-sm font-bold tracking-widest text-gray-400 border-b-2 border-gray-400 pb-2 w-max" style={{ fontFamily: "var(--font-figtree)" }}>
                Franchise
              </span>
              <h2 className="flex flex-col gap-1 mb-6 text-2xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-[#222222]">Start an EV Charging</span>
                <span className="text-[#888888] italic">Station Franchise</span>
              </h2>
              <p className="text-lg text-gray-300 font-medium leading-relaxed max-w-lg" style={{ fontFamily: "var(--font-figtree)" }}>
                Partner with one of India's growing EV charging networks and launch your own EV charging station franchise through our FOCO (Franchise Owned, Company Operated) model. Investors own the charging infrastructure while we support deployment, technology integration, and operational management.
                <br/><br/>
                Set up an EV charging hub with support across site evaluation, installation, network integration, and operational monitoring, helping you participate in the growing EV charging ecosystem.
              </p>
              <a href="#" className="inline-flex items-center gap-2 font-bold tracking-widest hover:text-gray-400 transition-colors mt-4 w-max border-b-2 border-transparent hover:border-gray-400 pb-1" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                Learn More <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-[4/3] bg-black overflow-hidden rounded-2xl shadow-xl">
              </div>
            </div>
          </div>

          {/* Model 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[#222222] text-[#F1EFE1] p-8 md:p-12 rounded-[2rem]">
            <div className="order-1 lg:order-1">
              <div className="aspect-[4/3] bg-black overflow-hidden rounded-2xl shadow-xl">
              </div>
            </div>
            <div className="order-2 lg:order-2 flex flex-col gap-6 lg:pl-12">
              <span className="text-sm font-bold tracking-widest text-gray-400 border-b-2 border-gray-400 pb-2 w-max" style={{ fontFamily: "var(--font-figtree)" }}>
                Destination and Commercial charging
              </span>
              <h2 className="flex flex-col gap-1 mb-6 text-2xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-[#222222]">Offer EV charging as an</span>
                <span className="text-[#888888] italic">amenity at your property</span>
              </h2>
              <p className="text-lg text-gray-300 font-medium leading-relaxed max-w-lg" style={{ fontFamily: "var(--font-figtree)" }}>
                Make the most of your parking space and attract premium customers with India's largest EV charging network. Modernize your amenities by setting up an EV charging station at your property.
              </p>
              <a href="#request-form" className="inline-flex items-center gap-2 font-bold tracking-widest hover:text-gray-400 transition-colors mt-4 w-max border-b-2 border-transparent hover:border-gray-400 pb-1" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                Talk to an Expert <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Model 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[#222222] text-[#F1EFE1] p-8 md:p-12 rounded-[2rem]">
            <div className="order-2 lg:order-1 flex flex-col gap-6">
              <span className="text-sm font-bold tracking-widest text-gray-400 border-b-2 border-gray-400 pb-2 w-max" style={{ fontFamily: "var(--font-figtree)" }}>
                Products and Services
              </span>
              <h2 className="flex flex-col gap-1 mb-6 text-2xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-[#222222]">Your investment on</span>
                <span className="text-[#888888] italic">your terms</span>
              </h2>
              <p className="text-lg text-gray-300 font-medium leading-relaxed max-w-lg" style={{ fontFamily: "var(--font-figtree)" }}>
                Own EV Charging stations at prime locations, which are handpicked and built by us to maximize your earnings. Invest, Own and Earn.
              </p>
              <a href="#request-form" className="inline-flex items-center gap-2 font-bold tracking-widest hover:text-gray-400 transition-colors mt-4 w-max border-b-2 border-transparent hover:border-gray-400 pb-1" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                Talk to an Expert <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-[4/3] bg-black overflow-hidden rounded-2xl shadow-xl">
              </div>
            </div>
          </div>

        </section>

        {/* Why Partner With Us */}
        <section className="max-w-6xl mx-auto mb-32 border-t-2 border-[#222222] pt-16">
          <h2 className="flex flex-col gap-1 mb-16 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1] text-center">
            <span className="text-[#222222]">Why Partner</span>
            <span className="text-[#888888] italic">With Us?</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="border-2 border-[#222222] bg-[#222222] text-[#F1EFE1] p-8 flex flex-col hover:bg-gray-300 hover:text-[#222222] transition-colors duration-300 group rounded-[2rem]">
              <div className="flex justify-between items-start mb-12">
                <ShieldCheck className="w-10 h-10 text-gray-400 group-hover:text-[#222222] transition-colors" />
                <span className="text-2xl font-bold font-mono">01</span>
              </div>
              <h3 className="text-xl font-black mb-4" style={{ fontFamily: "'Gilroy', sans-serif" }}>Reliability</h3>
              <p className="font-medium opacity-80 leading-relaxed" style={{ fontFamily: "var(--font-figtree)" }}>
                Manufactured, designed, and made in India. Largest EV charging network and growing.
              </p>
            </div>

            {/* Card 2 */}
            <div className="border-2 border-[#222222] bg-[#222222] text-[#F1EFE1] p-8 flex flex-col hover:bg-gray-300 hover:text-[#222222] transition-colors duration-300 group rounded-[2rem]">
              <div className="flex justify-between items-start mb-12">
                <Eye className="w-10 h-10 text-gray-400 group-hover:text-[#222222] transition-colors" />
                <span className="text-2xl font-bold font-mono">02</span>
              </div>
              <h3 className="text-xl font-black mb-4" style={{ fontFamily: "'Gilroy', sans-serif" }}>Transparency</h3>
              <p className="font-medium opacity-80 leading-relaxed" style={{ fontFamily: "var(--font-figtree)" }}>
                Complete visibility of your chargers and its usage through our Charging System Management Software (CSMS).
              </p>
            </div>

            {/* Card 3 */}
            <div className="border-2 border-[#222222] bg-[#222222] text-[#F1EFE1] p-8 flex flex-col hover:bg-gray-300 hover:text-[#222222] transition-colors duration-300 group rounded-[2rem]">
              <div className="flex justify-between items-start mb-12">
                <Scale className="w-10 h-10 text-gray-400 group-hover:text-[#222222] transition-colors" />
                <span className="text-2xl font-bold font-mono">03</span>
              </div>
              <h3 className="text-xl font-black mb-4" style={{ fontFamily: "'Gilroy', sans-serif" }}>Feasibility</h3>
              <p className="font-medium opacity-80 leading-relaxed" style={{ fontFamily: "var(--font-figtree)" }}>
                Both Hardware and Software built in-house, means no technical pendency on any third-party vendor. End-to-end solution in-house.
              </p>
            </div>

          </div>
        </section>

        {/* FAQs Section */}
        <section className="max-w-6xl mx-auto mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="text-sm font-bold tracking-widest text-gray-500" style={{ fontFamily: "var(--font-figtree)" }}>FAQs</span>
            <h2 className="flex flex-col gap-1 mb-6 text-2xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
              <span className="text-[#222222]">Got questions</span>
              <span className="text-[#888888] italic">about EVs?</span>
            </h2>
            <p className="text-lg text-gray-600 font-medium mb-6" style={{ fontFamily: "var(--font-figtree)" }}>Contact us if you still have any questions to make your experience smoother.</p>
            <a 
              href="/contact-us"
              className="inline-flex items-center justify-center gap-3 bg-[#222222] text-[#F1EFE1] px-6 py-3 font-bold tracking-wider hover:bg-gray-300 hover:text-[#222222] transition-colors w-max"
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

        {/* Request Form Section */}
        <section id="request-form" className="max-w-4xl mx-auto border-2 border-[#222222] bg-[#222222] text-[#F1EFE1] p-8 md:p-12 rounded-[2rem]">
          <div className="text-center mb-10">
            <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
              <span className="text-white">Request</span>
              <span className="text-[#888888] italic">Form</span>
            </h2>
            <p className="text-lg text-gray-400 font-medium" style={{ fontFamily: "var(--font-figtree)" }}>Fill out the details below and our team will get in touch.</p>
          </div>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm tracking-widest text-gray-400" style={{ fontFamily: "var(--font-figtree)" }}>First Name *</label>
                <input 
                  type="text" 
                  className="bg-transparent border-2 border-[#444] text-[#F1EFE1] p-4 focus:outline-none focus:border-gray-400 font-medium rounded-xl"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm tracking-widest text-gray-400" style={{ fontFamily: "var(--font-figtree)" }}>Last Name *</label>
                <input 
                  type="text" 
                  className="bg-transparent border-2 border-[#444] text-[#F1EFE1] p-4 focus:outline-none focus:border-gray-400 font-medium rounded-xl"
                  required
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-bold text-sm tracking-widest text-gray-400" style={{ fontFamily: "var(--font-figtree)" }}>Email Address *</label>
              <input 
                type="email" 
                className="bg-transparent border-2 border-[#444] text-[#F1EFE1] p-4 focus:outline-none focus:border-gray-400 font-medium rounded-xl"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold text-sm tracking-widest text-gray-400" style={{ fontFamily: "var(--font-figtree)" }}>Phone Number *</label>
              <input 
                type="tel" 
                className="bg-transparent border-2 border-[#444] text-[#F1EFE1] p-4 focus:outline-none focus:border-gray-400 font-medium rounded-xl"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold text-sm tracking-widest text-gray-400" style={{ fontFamily: "var(--font-figtree)" }}>Message / Inquiry Details</label>
              <textarea 
                rows={4}
                className="bg-transparent border-2 border-[#444] text-[#F1EFE1] p-4 focus:outline-none focus:border-gray-400 font-medium resize-none rounded-xl"
              ></textarea>
            </div>

            <button 
              type="button"
              className="w-full bg-gray-300 text-[#222222] py-5 text-xl font-black tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-3 mt-4 rounded-xl"
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

`

### src\app\products\portable-charger\page.tsx
`	sx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Zap, 
  ShieldCheck, 
  Settings, 
  ThermometerSnowflake, 
  MonitorPlay, 
  Plug, 
  CheckCircle2, 
  ArrowRight,
  Star,
  Quote
} from "lucide-react";
import Link from "next/link";

// Custom CountUp hook to avoid third-party hydration/SSR issues
function CountUp({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <>{count}{suffix}</>;
}

export default function PortableChargerPage() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Card 1: Top-Left (Fly out to top left)
  const c1X = useTransform(scrollYProgress, [0.1, 0.3], ["0vw", "-100vw"]);
  const c1Y = useTransform(scrollYProgress, [0.1, 0.3], ["0vh", "-100vh"]);
  const c1Rotate = useTransform(scrollYProgress, [0.1, 0.3], [0, -45]);
  const c1Scale = useTransform(scrollYProgress, [0.1, 0.3], [1, 0.5]);
  const c1Opacity = useTransform(scrollYProgress, [0.1, 0.3], [1, 0]);

  // Card 2: Top-Right (Fly out to top right)
  const c2X = useTransform(scrollYProgress, [0.2, 0.4], ["0vw", "100vw"]);
  const c2Y = useTransform(scrollYProgress, [0.2, 0.4], ["0vh", "-100vh"]);
  const c2Rotate = useTransform(scrollYProgress, [0.2, 0.4], [0, 45]);
  const c2Scale = useTransform(scrollYProgress, [0.2, 0.4], [1, 0.5]);
  const c2Opacity = useTransform(scrollYProgress, [0.2, 0.4], [1, 0]);

  // Card 3: Bottom-Left (Fly out to bottom left)
  const c3X = useTransform(scrollYProgress, [0.4, 0.6], ["0vw", "-100vw"]);
  const c3Y = useTransform(scrollYProgress, [0.4, 0.6], ["0vh", "100vh"]);
  const c3Rotate = useTransform(scrollYProgress, [0.4, 0.6], [0, -45]);
  const c3Scale = useTransform(scrollYProgress, [0.4, 0.6], [1, 0.5]);
  const c3Opacity = useTransform(scrollYProgress, [0.4, 0.6], [1, 0]);

  // Card 4: Bottom-Right (Fly out to bottom right)
  const c4X = useTransform(scrollYProgress, [0.6, 0.8], ["0vw", "100vw"]);
  const c4Y = useTransform(scrollYProgress, [0.6, 0.8], ["0vh", "100vh"]);
  const c4Rotate = useTransform(scrollYProgress, [0.6, 0.8], [0, 45]);
  const c4Scale = useTransform(scrollYProgress, [0.6, 0.8], [1, 0.5]);
  const c4Opacity = useTransform(scrollYProgress, [0.6, 0.8], [1, 0]);

  return (
    <div className="min-h-screen relative font-['Figtree'] bg-transparent">
      {/* FIXED BACKGROUND VIDEO & LIGHT OVERLAY */}
      <div className="fixed inset-0 z-[-2]">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
          src="/ev-charging-2.mp4"
        />
      </div>
      <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-white/90 via-white/80 to-slate-100/95 backdrop-blur-[2px]" />

      <main className="pt-24 pb-20 relative">
        
        {/* HERO SECTION */}
        <section className="min-h-[70vh] flex items-center justify-center relative z-10">
          <div className="container mx-auto px-4 text-center">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-md border border-white mb-8 shadow-sm"
              style={{ fontFamily: 'var(--font-figtree)' }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-base font-semibold text-[#222222]" style={{ fontFamily: 'Figtree, sans-serif' }}>Home & Travel Ready</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-col gap-1 mb-6 tracking-tighter"
              style={{ fontFamily: '"Gilroy", sans-serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}
            >
              <span className="text-[#222222]">3.3 kW Portable</span>
              <span className="text-[#888888] italic">EV Charger</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl font-medium text-black/80 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Simple charging, wherever you need it. Just plug into any standard 3-pin socket and power up your electric vehicle safely.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button className="w-full sm:w-auto px-8 py-3.5 bg-black text-white rounded-xl font-extrabold text-lg hover:bg-black/80 transition-all shadow-lg flex items-center justify-center gap-2">
                Buy Now <ArrowRight className="w-5 h-5" />
              </button>
              <button className="w-full sm:w-auto px-8 py-3.5 bg-white/80 backdrop-blur-md text-black border border-gray-300 rounded-xl font-extrabold text-lg hover:bg-white transition-all shadow-sm">
                Talk to an Expert
              </button>
            </motion.div>
          </div>
        </section>

        {/* KEY FEATURES (SCROLL-SCRUBBED 4-CORNER FLY OUT ANIMATION) */}
        <section ref={containerRef} className="h-[400vh] relative w-full z-20">
          <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden pt-16 md:pt-24 pb-8">
            <div className="container mx-auto px-4 max-w-5xl h-full flex flex-col justify-center">
              <div className="text-center max-w-3xl mx-auto mb-4 md:mb-8 shrink-0">
                <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                  <span className="text-[#222222]">Key</span>
                  <span className="text-[#888888] italic">Features</span>
                </h2>
                <p className="text-sm md:text-lg font-medium text-black/70">
                  Scroll down slowly to reveal. Designed for reliability and ultimate convenience.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 w-full max-w-4xl mx-auto">
                
                {/* Card 1 */}
                <motion.div 
                  style={{ x: c1X, y: c1Y, rotate: c1Rotate, scale: c1Scale, opacity: c1Opacity }}
                  className="bg-[#111111] backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 border border-white/10 shadow-2xl flex flex-col justify-center"
                >
                  <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-[#888888] mb-2 md:mb-3" />
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-figtree)' }}><CountUp end={5} suffix="+" /></div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-figtree)' }}>Safety Protections</h3>
                  <p className="text-base md:text-lg font-medium text-gray-300 leading-relaxed line-clamp-2 md:line-clamp-none" style={{ fontFamily: 'var(--font-figtree)' }}>
                    Safe for Everyday Charging. Built to handle voltage fluctuations, heat, and leakage.
                  </p>
                </motion.div>

                {/* Card 2 */}
                <motion.div 
                  style={{ x: c2X, y: c2Y, rotate: c2Rotate, scale: c2Scale, opacity: c2Opacity }}
                  className="bg-[#111111] backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 border border-white/10 shadow-2xl flex flex-col justify-center"
                >
                  <Plug className="w-8 h-8 md:w-10 md:h-10 text-[#888888] mb-2 md:mb-3" />
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-figtree)' }}>3-Pin</div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-figtree)' }}>Plug Compatible</h3>
                  <p className="text-base md:text-lg font-medium text-gray-300 leading-relaxed line-clamp-2 md:line-clamp-none" style={{ fontFamily: 'var(--font-figtree)' }}>
                    Easy to carry, easy to use across different locations with no setup required.
                  </p>
                </motion.div>

                {/* Card 3 */}
                <motion.div 
                  style={{ x: c3X, y: c3Y, rotate: c3Rotate, scale: c3Scale, opacity: c3Opacity }}
                  className="bg-[#111111] backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 border border-white/10 shadow-2xl flex flex-col justify-center"
                >
                  <Zap className="w-8 h-8 md:w-10 md:h-10 text-[#888888] mb-2 md:mb-3" />
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-figtree)' }}>IK10</div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-figtree)' }}>Impact Rated</h3>
                  <p className="text-base md:text-lg font-medium text-gray-300 leading-relaxed line-clamp-2 md:line-clamp-none" style={{ fontFamily: 'var(--font-figtree)' }}>
                    Control box handles drops and heavy pressure. Extremely durable for travel.
                  </p>
                </motion.div>

                {/* Card 4 */}
                <motion.div 
                  style={{ x: c4X, y: c4Y, rotate: c4Rotate, scale: c4Scale, opacity: c4Opacity }}
                  className="bg-[#111111] backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 border border-white/10 shadow-2xl flex flex-col justify-center"
                >
                  <MonitorPlay className="w-8 h-8 md:w-10 md:h-10 text-[#888888] mb-2 md:mb-3" />
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-figtree)' }}>4-in-1</div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-figtree)' }}>LED Display</h3>
                  <p className="text-base md:text-lg font-medium text-gray-300 leading-relaxed line-clamp-2 md:line-clamp-none" style={{ fontFamily: 'var(--font-figtree)' }}>
                    Clearly displays voltage, current, power, and charging status at a glance.
                  </p>
                </motion.div>

              </div>
            </div>
          </div>
        </section>

        {/* TECHNICAL SPECIFICATIONS */}
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 text-center"
            >
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-[#222222]">Technical</span>
                <span className="text-[#888888] italic">Specifications</span>
              </h2>
            </motion.div>

            <div className="bg-white/70 backdrop-blur-2xl rounded-3xl border border-white overflow-hidden shadow-lg">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/5 border-b border-black/10">
                    <th className="py-5 px-6 font-bold text-black w-1/3 text-lg" style={{ fontFamily: 'var(--font-figtree)' }}>Specification</th>
                    <th className="py-5 px-6 font-bold text-black text-lg" style={{ fontFamily: 'var(--font-figtree)' }}>Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {[
                    { spec: "Charging Type", detail: "AC Portable Charger" },
                    { spec: "Output Power", detail: "3.3 kW Max" },
                    { spec: "Input Plug", detail: "3-pin Domestic Plug" },
                    { spec: "Input Supply", detail: "1 Phase, 230 ±10% Vac" },
                    { spec: "Output Connector", detail: "Type 2 AC" },
                    { spec: "Adjustable Current", detail: "6A – 16A" },
                    { spec: "Protection Rating", detail: "IP66 (Weather & Dust Protection)" },
                    { spec: "Display", detail: "LED display showing voltage, current, power, time" },
                    { spec: "Dimensions (L × W × H)", detail: "220 × 100 × 60 mm" },
                  ].map((item, idx) => (
                    <tr key={idx} className="hover:bg-white/50 transition-colors">
                      <td className="py-4 px-6 font-bold text-black text-base" style={{ fontFamily: 'var(--font-figtree)' }}>{item.spec}</td>
                      <td className="py-4 px-6 font-medium text-black/80 text-base flex items-start gap-3" style={{ fontFamily: 'var(--font-figtree)' }}>
                        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                        {item.detail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-[#222222]">What Our Users</span>
                <span className="text-[#888888] italic">Say</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Aarav Sharma",
                  location: "Delhi",
                  quote: "This is a great backup charger and especially useful for people who travel frequently or don't always have access to a dedicated charging point."
                },
                {
                  name: "Aditya Singh",
                  location: "Gurugram",
                  quote: "Nice portable charger with adjustable amperage from 6 amp to 16 amp. This helps in balancing the battery pack effectively."
                },
                {
                  name: "Arjun Mehta",
                  location: "Mumbai",
                  quote: "This is the best portable charger for any EV. The build quality feels very premium and top-notch for everyday use."
                }
              ].map((testimonial, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[#111111] backdrop-blur-xl border border-white/10 rounded-2xl p-8 relative shadow-xl hover:shadow-2xl transition-all flex flex-col"
                >
                  <Quote className="absolute top-6 right-6 w-10 h-10 text-white/10" />
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-white text-white" />)}
                  </div>
                  <p className="text-base font-medium text-gray-300 mb-8 italic relative z-10 leading-relaxed grow">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-extrabold text-base text-black">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white text-base">{testimonial.name}</h4>
                      <p className="text-sm font-medium text-[#888888]">{testimonial.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-black/90 backdrop-blur-2xl rounded-3xl p-12 text-center shadow-2xl">
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="text-white">Ready to Charge</span>
                <span className="text-[#888888] italic">Anywhere?</span>
              </h2>
              <p className="text-lg font-medium text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Carry it with you or keep it at home - just plug in and charge whenever you need it. No setup, no extra steps required.
              </p>
              <button className="px-8 py-3.5 bg-white text-black rounded-xl font-extrabold text-lg hover:bg-gray-100 transition-all hover:scale-105 inline-flex items-center gap-2">
                Enquire Now <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

`

### src\app\shop\page.tsx
`	sx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, ShieldCheck, Plug, Wrench, ChevronDown, ChevronUp } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
};

const products = [
  {
    id: "home-ev-charger",
    name: "Home EV Charger",
    tagline: "Your All-in-One Home EV Charging Station",
    image: "https://static.vecteezy.com/system/resources/previews/038/451/353/large_2x/electric-car-small-home-wall-charger-with-cable-fast-smart-intelligent-wallbox-ev-charging-station-isolated-on-transparent-background-file-png.png",
    badgeText: "11,000+ Chargers Sold",
    discount: "28% Off",
    rating: 5,
    reviews: 1000,
    options: ["7.4 kW", "11 kW", "22 kW"],
    specs: [
      { label: "Warranty", value: "2 Years", icon: ShieldCheck },
      { label: "Connector", value: "Type 2", icon: Plug },
      { label: "Installation", value: "Standard Installation", icon: Wrench },
    ],
    priceLabel: "Starting From:",
    price: "₹35,999",
    originalPrice: "₹50,000",
    ctaPrimary: { label: "Buy Now →", href: "/shop/home-ev-charger" },
    ctaSecondary: { label: "Check Compatibility", href: "#compatibility" },
  },
  {
    id: "portable-ev-charger",
    name: "Portable EV Charger",
    tagline: "Your All-in-One Portable EV Charging Solution",
    image: "https://image.made-in-china.com/202f0j00qCyhJAGRreUz/Beny-32A-Home-EV-Wallbox-22kw-White-Charging-Station-3-Phase-400V-Charger-Station-with-Leakage-Protection.webp",
    badgeText: "1,500+ Chargers Sold",
    discount: "48% Off",
    rating: 5,
    reviews: 100,
    options: ["3.3 kW", "7.4 kW"],
    specs: [
      { label: "Warranty", value: "2 Years", icon: ShieldCheck },
      { label: "Connector", value: "Type 2", icon: Plug },
      { label: "Installation", value: "Instant Setup", icon: Wrench },
    ],
    priceLabel: "Price:",
    price: "₹14,999",
    originalPrice: "₹28,999",
    ctaPrimary: { label: "Buy Now →", href: "/shop/portable-ev-charger" },
    ctaSecondary: { label: "Talk to an Expert", href: "https://wa.me/919949055516" },
  },
];

const faqs = [
  {
    q: "How do I choose the right EV charger for my home?",
    a: "The right charger depends on your EV model, electricity phase (single or three-phase), and available load. You can use the compatibility check tool or contact our team to find the most suitable charger for your setup.",
  },
  {
    q: "What is the difference between a home charger and a portable charger?",
    a: "A home charger is a wall-mounted unit permanently installed at your residence, offering faster charging speeds (7.4–22 kW). A portable charger is compact, plug-and-play, and useful for travel or as a backup when a fixed charger isn't available.",
  },
  {
    q: "Do you provide installation support? Is it free?",
    a: "Yes, DYU provides professional installation support with every home charger purchase. A site survey is conducted before installation to assess your electrical setup. Standard installation charges may apply depending on your location and requirements.",
  },
  {
    q: "What does the warranty cover?",
    a: "Both products come with a 2-year manufacturer warranty covering hardware defects and component failures under normal usage conditions. Our support team is available to assist with any issues during the warranty period.",
  },
  {
    q: "Can I use the portable charger with any EV?",
    a: "The portable charger uses a Type 2 connector, compatible with most modern EVs sold in India. It supports adjustable amperage (6A–16A) for safe and flexible charging across different vehicle models.",
  },
];

const testimonials = [
  { name: "Rohit M", location: "Delhi", date: "26 Oct 2025", rating: 5, text: "Build quality is excellent and charging has been smooth. The DYU app makes it super easy to manage everything remotely." },
  { name: "Sneha S", location: "Mumbai", date: "16 Feb 2026", rating: 4, text: "Installation was done quickly after the site visit. The charger looks modern and it's very convenient to manage from the app." },
  { name: "Sanjay B", location: "Delhi", date: "02 Mar 2026", rating: 5, text: "Great backup charger and especially useful for people who travel frequently. Highly recommended for peace of mind while traveling." },
  { name: "Sudarshan", location: "Bangalore", date: "26 Mar 2026", rating: 5, text: "Excellent portable charger with adjustable amperage from 6A to 16A. This helps in balancing the battery pack perfectly." },
];

function StarRating({ count }: { count: number }) {
  return (
    <span style={{ display: "inline-flex", gap: "2px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          fill={i < count ? "#F59E0B" : "none"}
          color={i < count ? "#F59E0B" : "#D1D5DB"}
        />
      ))}
    </span>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: "1px solid var(--color-stone-mist)",
        paddingBottom: "20px",
        marginBottom: "20px",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          textAlign: "left",
          gap: "16px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-figtree)",
            fontSize: "15px",
            fontWeight: 600,
            color: "var(--color-midnight-ink)",
            lineHeight: 1.4,
          }}
        >
          {q}
        </span>
        {open ? (
          <ChevronUp size={18} color="var(--color-deep-forest-teal)" style={{ flexShrink: 0 }} />
        ) : (
          <ChevronDown size={18} color="var(--color-graphite-veil)" style={{ flexShrink: 0 }} />
        )}
      </button>
      {open && (
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontFamily: "var(--font-figtree)",
            fontSize: "14px",
            color: "var(--color-smoke)",
            lineHeight: 1.7,
            marginTop: "12px",
          }}
        >
          {a}
        </motion.p>
      )}
    </div>
  );
}

export default function ShopPage() {
  const [heroSlide, setHeroSlide] = useState(0);
  const heroImages = [
    { src: "/images/dyu_home_charger.png", label: "Home EV Charger", position: "center 35%" },
    { src: "/images/dyu_portable_charger.png", label: "Portable EV Charger", position: "center 40%" },
  ];

  return (
    <div style={{ backgroundColor: "var(--color-cream-paper)", paddingTop: "64px" }}>

      {/* ── HERO CAROUSEL ── */}
      <section style={{ position: "relative", width: "100%", aspectRatio: "21/9", minHeight: "400px", overflow: "hidden", background: "#0d0d0d" }}>
        <motion.div
          key={heroSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${heroImages[heroSlide].src})`,
            backgroundSize: "cover",
            backgroundPosition: heroImages[heroSlide].position,
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 60%)" }} />

        {/* Title */}
        <div style={{ position: "absolute", bottom: "48px", left: "6%", zIndex: 10 }}>
          <p style={{ fontFamily: "var(--font-figtree)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.6)", marginBottom: "8px" }}>
            Now available
          </p>
          <h1 className="flex flex-col gap-1 tracking-tighter" style={{ fontFamily: '"Gilroy", sans-serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
            <span className="text-white">{heroImages[heroSlide].label.replace(' EV Charger', '')}</span>
            <span className="text-[#888888] italic">EV Charger</span>
          </h1>
        </div>

        {/* Dots */}
        <div style={{ position: "absolute", bottom: "48px", right: "6%", display: "flex", gap: "8px", zIndex: 10 }}>
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroSlide(i)}
              style={{
                width: i === heroSlide ? "28px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: i === heroSlide ? "#ffffff" : "rgba(255,255,255,0.4)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* Arrows */}
        <div style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "8px", zIndex: 10 }}>
          <button
            onClick={() => setHeroSlide((p) => (p - 1 + heroImages.length) % heroImages.length)}
            style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}
          >
            ←
          </button>
          <button
            onClick={() => setHeroSlide((p) => (p + 1) % heroImages.length)}
            style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}
          >
            →
          </button>
        </div>
      </section>

      {/* ── PRODUCT GRID ── */}
      <section style={{ padding: "80px 0", backgroundColor: "var(--color-cream-paper)" }}>
        <div className="container-wispr">
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <p style={{ fontFamily: "var(--font-figtree)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--color-graphite-veil)", marginBottom: "12px", fontWeight: 600 }}>
              DYU Shop
            </p>
            <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]" style={{ fontFamily: 'var(--font-figtree)' }}>
              <span className="text-[#222222]">Find Your Perfect</span>
              <span className="text-[#888888] italic">EV Charger</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(440px, 1fr))", gap: "32px" }}>
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                style={{
                  background: "#ffffff",
                  borderRadius: "24px",
                  border: "1px solid var(--color-stone-mist)",
                  overflow: "hidden",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}
              >
                {/* Image */}
                <div style={{ position: "relative", aspectRatio: "4/3", background: "#f8f8f5", overflow: "hidden" }}>
                  {/* Badges */}
                  <div style={{ position: "absolute", top: "16px", left: "16px", zIndex: 2, display: "flex", flexDirection: "column", gap: "8px" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#E1F4E8", color: "#04C046", fontSize: "12px", fontWeight: 600, fontFamily: "var(--font-figtree)", padding: "4px 10px", borderRadius: "20px" }}>
                      ✓ {product.badgeText}
                    </span>
                    <span style={{ display: "inline-flex", alignItems: "center", background: "var(--color-midnight-ink)", color: "#ffffff", fontSize: "12px", fontWeight: 700, fontFamily: "var(--font-figtree)", padding: "4px 10px", borderRadius: "20px" }}>
                      {product.discount}
                    </span>
                  </div>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "100%", height: "100%", objectFit: "contain", padding: "24px" }}
                  />
                </div>

                {/* Info */}
                <div style={{ padding: "28px" }}>
                  {/* Name + Offers */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "8px" }}>
                    <h3 style={{ fontFamily: "var(--font-figtree)", fontSize: "20px", fontWeight: 700, color: "var(--color-midnight-ink)", lineHeight: 1.2 }}>
                      {product.name}
                    </h3>
                    <span style={{ fontFamily: "var(--font-figtree)", fontSize: "12px", color: "var(--color-deep-forest-teal)", fontWeight: 600, whiteSpace: "nowrap", marginLeft: "12px", marginTop: "3px", cursor: "pointer", textDecoration: "underline" }}>
                      Offers Available
                    </span>
                  </div>

                  {/* Tagline + Rating */}
                  <p style={{ fontFamily: "var(--font-figtree)", fontSize: "13px", color: "var(--color-smoke)", marginBottom: "4px" }}>
                    {product.tagline}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "20px" }}>
                    <StarRating count={product.rating} />
                    <span style={{ fontFamily: "var(--font-figtree)", fontSize: "12px", color: "var(--color-graphite-veil)" }}>
                      {product.reviews}+ customers rated
                    </span>
                  </div>

                  <hr style={{ border: "none", borderTop: "1px solid var(--color-stone-mist)", marginBottom: "20px" }} />

                  {/* Options */}
                  <div style={{ marginBottom: "20px" }}>
                    <p style={{ fontFamily: "var(--font-figtree)", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-graphite-veil)", marginBottom: "10px" }}>
                      Available Options
                    </p>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {product.options.map((opt) => (
                        <span key={opt} style={{ fontFamily: "var(--font-figtree)", fontSize: "13px", fontWeight: 600, color: "var(--color-midnight-ink)", border: "1.5px solid var(--color-stone-mist)", borderRadius: "8px", padding: "5px 14px", cursor: "pointer" }}>
                          {opt}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Specs */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "24px" }}>
                    {product.specs.map(({ label, value, icon: Icon }) => (
                      <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", background: "#f8f8f5", borderRadius: "12px", padding: "12px 8px", textAlign: "center" }}>
                        <Icon size={18} color="var(--color-deep-forest-teal)" />
                        <span style={{ fontFamily: "var(--font-figtree)", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-graphite-veil)" }}>{label}</span>
                        <span style={{ fontFamily: "var(--font-figtree)", fontSize: "12px", fontWeight: 600, color: "var(--color-midnight-ink)" }}>{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "20px" }}>
                    <span style={{ fontFamily: "var(--font-figtree)", fontSize: "13px", color: "var(--color-smoke)" }}>{product.priceLabel}</span>
                    <span style={{ fontFamily: "var(--font-figtree)", fontSize: "28px", fontWeight: 700, color: "var(--color-midnight-ink)", letterSpacing: "-0.02em" }}>{product.price}</span>
                    <span style={{ fontFamily: "var(--font-figtree)", fontSize: "14px", color: "var(--color-graphite-veil)", textDecoration: "line-through" }}>{product.originalPrice}</span>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "10px" }}>
                    <a
                      href={product.ctaSecondary.href}
                      className="btn-ghost"
                      style={{ flex: 1, justifyContent: "center", fontSize: "13px", padding: "10px 16px" }}
                    >
                      {product.ctaSecondary.label}
                    </a>
                    <Link
                      href={product.ctaPrimary.href}
                      className="btn-primary"
                      style={{ flex: 1, justifyContent: "center", fontSize: "13px", padding: "10px 16px" }}
                    >
                      {product.ctaPrimary.label}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPATIBILITY CTA ── */}
      <section style={{ background: "var(--color-midnight-ink)", padding: "64px 0" }}>
        <div className="container-wispr">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
            <div style={{ aspectRatio: "4/3", position: "relative", borderRadius: "20px", overflow: "hidden" }}>
              <img
                src="/images/dyu_charger_cluster_trans.png"
                alt="EV Charger Compatibility"
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "contain"
                }}
              />
            </div>
            <div>
              <span className="badge badge-teal" style={{ marginBottom: "24px" }}>Smart Matching</span>
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]" style={{ fontFamily: 'var(--font-figtree)' }}>
                <span className="text-white">Don't know what</span>
                <span className="text-[#888888] italic">you are buying?</span>
              </h2>
              <p style={{ fontFamily: "var(--font-figtree)", fontSize: "16px", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: "32px" }}>
                Discover the most compatible charging solution for your EV model. Our experts guide you from selection to installation.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a href="#compatibility" className="btn-primary">
                  Check Compatibility <ArrowRight size={14} />
                </a>
                <a href="https://wa.me/919949055516" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)" }}>
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "80px 0", backgroundColor: "var(--color-cream-paper)" }}>
        <div className="container-wispr">
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]" style={{ fontFamily: 'var(--font-figtree)' }}>
              <span className="text-[#222222]">What people say about our</span>
              <span className="text-[#888888] italic">home EV chargers</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="card-wispr"
                style={{ display: "flex", flexDirection: "column", gap: "12px" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--color-deep-forest-teal)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "var(--font-figtree)", fontWeight: 700, fontSize: "14px", flexShrink: 0 }}>
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-figtree)", fontSize: "14px", fontWeight: 600, color: "var(--color-midnight-ink)" }}>{t.name}</p>
                    <p style={{ fontFamily: "var(--font-figtree)", fontSize: "12px", color: "var(--color-graphite-veil)" }}>{t.date} · {t.location}</p>
                  </div>
                </div>
                <StarRating count={t.rating} />
                <p style={{ fontFamily: "var(--font-figtree)", fontSize: "14px", color: "var(--color-smoke)", lineHeight: 1.7 }}>{t.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "80px 0", borderTop: "1px solid var(--color-stone-mist)" }}>
        <div className="container-wispr">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "80px", alignItems: "flex-start" }}>
            <div>
              <span style={{ fontFamily: "var(--font-figtree)", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--color-graphite-veil)", display: "block", marginBottom: "16px" }}>FAQs</span>
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]" style={{ fontFamily: 'var(--font-figtree)' }}>
                <span className="text-[#222222]">Got questions about</span>
                <span className="text-[#888888] italic">EVs?</span>
              </h2>
              <p style={{ fontFamily: "var(--font-figtree)", fontSize: "15px", color: "var(--color-smoke)", lineHeight: 1.7, marginBottom: "32px" }}>
                Contact us if you still have any questions to make your experience smoother.
              </p>
              <Link href="/contact-us" className="btn-primary">
                Got More Questions? <ArrowRight size={14} />
              </Link>
            </div>
            <div>
              {faqs.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

`

### src\components\Car3D.tsx
`	sx
'use client';
import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, useGLTF, Clone } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense } from 'react';

function CarMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  
  // Load the model automatically with caching
  const { scene } = useGLTF('/car.glb');

  // Mathematical Sync to SVG Path (No DOM Proxy, No GSAP Plugins)
  useFrame(() => {
    if (!groupRef.current) return;
    
    const container = document.getElementById('about-container');
    const path = document.getElementById('car-path') as any as SVGPathElement;
    
    if (container && path) {
      // 1. Calculate pure mathematical scroll progress relative to the container
      const containerRect = container.getBoundingClientRect();
      const scrollY = -containerRect.top;
      const maxScroll = containerRect.height - window.innerHeight;
      
      let progress = 0;
      if (maxScroll > 0) {
        progress = Math.max(0, Math.min(1, scrollY / maxScroll));
      }
      
      const totalLen = path.getTotalLength();
      
      // 2. Get the exact mathematical point on the SVG curve
      const pt = path.getPointAtLength(progress * totalLen);
      
      // The SVG is set to viewBox="0 0 1000 4000" and preserves no aspect ratio,
      // mapping 1000 directly to window width, and 4000 to container height.
      const screenX = (pt.x / 1000) * window.innerWidth;
      const containerY = (pt.y / 4000) * containerRect.height;
      const screenY = containerRect.top + containerY;
      
      // 3. Convert screen coordinates to Normalized Device Coordinates (-1 to 1)
      const ndcX = (screenX / window.innerWidth) * 2 - 1;
      const ndcY = -(screenY / window.innerHeight) * 2 + 1;
      
      // 4. Unproject perfectly into 3D world space at Z=0
      const vec = new THREE.Vector3(ndcX, ndcY, 0.5);
      vec.unproject(camera);
      vec.sub(camera.position).normalize();
      const distance = -camera.position.z / vec.z;
      const pos = camera.position.clone().add(vec.multiplyScalar(distance));
      
      groupRef.current.position.copy(pos);
      
      // 5. Calculate rotation by sampling two points slightly apart
      // If we are at the very end of the path, we look backwards to get a valid tangent
      let p1 = progress;
      let p2 = progress + 0.005;
      
      if (p2 > 1) {
        p1 = 1 - 0.005;
        p2 = 1;
      }
      
      const pt1 = path.getPointAtLength(p1 * totalLen);
      const pt2 = path.getPointAtLength(p2 * totalLen);
      
      const screenX1 = (pt1.x / 1000) * window.innerWidth;
      const screenY1 = containerRect.top + ((pt1.y / 4000) * containerRect.height);
      
      const screenX2 = (pt2.x / 1000) * window.innerWidth;
      const screenY2 = containerRect.top + ((pt2.y / 4000) * containerRect.height);
      
      // Calculate angle in 2D screen space
      const angle = Math.atan2(screenY2 - screenY1, screenX2 - screenX1);
      
      // Map screen angle to 3D Z-rotation.
      // The car natively points DOWN on screen (-Y) due to its initial rotation.
      // So when the path goes down (angle = PI/2), we want 0 rotation.
      groupRef.current.rotation.z = -(angle - Math.PI / 2);
    }
  });

  return (
    <group ref={groupRef}>
      <group rotation={[Math.PI / 2, Math.PI, 0]} scale={[1.5, 1.5, 1.5]}>
        <Clone object={scene} />
      </group>
    </group>
  );
}

// Preload the model
useGLTF.preload('/car.glb');

export default function Car3D() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 15], fov: 40 }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={2} />
      <Environment preset="city" />
      
      <Suspense fallback={null}>
        <CarMesh />
      </Suspense>
      
    </Canvas>
  );
}

`

### src\components\CSMSDashboardPreview.tsx
`	sx
"use client";

import React from "react";
import { 
  LayoutDashboard, 
  Building2, 
  ChevronDown, 
  ChevronUp, 
  BatteryCharging, 
  Users, 
  CreditCard, 
  MessageSquareWarning, 
  Ticket, 
  Zap, 
  Settings,
  MapPin,
  Smartphone
} from "lucide-react";

const ConcentricDonut = ({ 
  centerValue, 
  centerLabel,
  data 
}: { 
  centerValue: string, 
  centerLabel: string,
  data: { label: string, color: string, value: number, radius: number }[] 
}) => {
  return (
    <div className="flex items-center gap-8">
      <div className="relative flex items-center justify-center w-[160px] h-[160px]">
        <svg width="160" height="160" viewBox="0 0 160 160" className="transform -rotate-90">
          {data.map((item, i) => {
            const circumference = 2 * Math.PI * item.radius;
            const strokeDasharray = `${(item.value / 100) * circumference} ${circumference}`;
            return (
              <g key={`arc-${i}`}>
                <circle 
                  cx="80" cy="80" r={item.radius} 
                  fill="none" 
                  stroke="#E2E5EA" 
                  strokeWidth="8" 
                />
                <circle 
                  cx="80" cy="80" r={item.radius} 
                  fill="none" 
                  stroke={item.color} 
                  strokeWidth="8" 
                  strokeDasharray={strokeDasharray}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </g>
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xs font-semibold text-gray-500">{centerLabel}</span>
          <span className="text-2xl font-bold text-[#1a2b4c] font-['Gilroy']">{centerValue}</span>
        </div>
      </div>
      
      <div className="flex flex-col gap-2">
        {data.map((item, i) => (
          <div key={`legend-${i}`} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-sm font-medium text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function CSMSDashboardPreview() {
  return (
    <div className="w-full h-full bg-[#EBECEF] flex relative overflow-hidden font-['Figtree'] text-left">
      {/* SIDEBAR */}
      <div className="w-[280px] bg-[#EBECEF] border-r border-gray-300/50 flex flex-col pt-8 pb-4 shrink-0">
        <div className="px-8 mb-10">
          <h1 className="text-3xl font-black text-[#1a2b4c] font-['Gilroy'] tracking-tight">dyu</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4">
          <ul className="space-y-1">
            <li>
              <button className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-200/50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold text-sm">Dashboard</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </li>
            
            <li className="mt-2">
              <button className="w-full flex items-center justify-between px-4 py-3 text-[#1a2b4c] font-bold rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-gray-700" />
                  <span className="font-bold text-sm">Company Management</span>
                </div>
                <ChevronUp className="w-4 h-4 text-gray-700" />
              </button>
              <div className="pl-12 pr-2 mt-1 space-y-1">
                <button className="w-full text-left px-4 py-2.5 bg-[#DCE0E5] text-[#1a2b4c] font-bold text-sm rounded-lg shadow-sm">
                  Company Details
                </button>
                <button className="w-full text-left px-4 py-2.5 text-gray-500 font-semibold hover:text-gray-700 text-sm rounded-lg transition-colors">
                  Company
                </button>
                <button className="w-full text-left px-4 py-2.5 text-gray-500 font-semibold hover:text-gray-700 text-sm rounded-lg transition-colors">
                  Clients
                </button>
              </div>
            </li>

            <li className="pt-2">
              <button className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-200/50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <BatteryCharging className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold text-sm">Charger Management</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </li>
            
            <li>
              <button className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-200/50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold text-sm">User Management</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </li>

            <li>
              <button className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-200/50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold text-sm">Billings & Payments</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </li>

            <li>
              <button className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-200/50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <MessageSquareWarning className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold text-sm">Complaints</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </li>
            
            <li>
              <button className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-200/50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <Ticket className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold text-sm">Coupons</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </li>

            <li>
              <button className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-200/50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold text-sm">Auto Triggers</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </li>

            <li>
              <button className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-200/50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold text-sm">Subscription</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 bg-[#F1F2F4] p-8 overflow-y-auto">
        <h2 className="text-2xl font-bold text-[#1a2b4c] font-['Gilroy'] mb-8">Company Details</h2>
        
        {/* Header Row */}
        <div className="mb-6">
          <div className="flex items-baseline gap-3 mb-1">
            <h3 className="text-3xl font-black text-[#1a2b4c] font-['Gilroy']">DYU</h3>
            <span className="text-xs font-bold text-[#E55A43] tracking-wide">MKTP</span>
          </div>
          <p className="text-sm font-semibold text-gray-500 mb-4">8787</p>
          
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#E8EAEF] rounded-md border border-gray-300/50 shadow-sm text-xs font-bold text-gray-700">
            <img src="https://flagcdn.com/w20/in.png" alt="India" className="w-4 h-3 object-cover rounded-sm" />
            India
            <ChevronDown className="w-3 h-3 ml-2 text-gray-500" />
          </button>
        </div>

        {/* Metric Cards Top Row */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-[#EBECEF] p-5 rounded-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),_0_4px_10px_rgba(0,0,0,0.05)] border border-white/50 flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-[#1a2b4c] font-['Gilroy'] mb-1">29</div>
              <div className="text-xs font-semibold text-gray-500">CPOs</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#E55A43]">
              <MapPin className="w-5 h-5" />
            </div>
          </div>
          
          <div className="bg-[#EBECEF] p-5 rounded-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),_0_4px_10px_rgba(0,0,0,0.05)] border border-white/50 flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-[#1a2b4c] font-['Gilroy'] mb-1">41</div>
              <div className="text-xs font-semibold text-gray-500">eMSPs</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#E55A43]">
              <BatteryCharging className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#EBECEF] p-5 rounded-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),_0_4px_10px_rgba(0,0,0,0.05)] border border-white/50 flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-[#1a2b4c] font-['Gilroy'] mb-1">38</div>
              <div className="text-xs font-semibold text-gray-500">Platform</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#E55A43]">
              <Smartphone className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#EBECEF] p-5 rounded-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),_0_4px_10px_rgba(0,0,0,0.05)] border border-white/50 flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-[#1a2b4c] font-['Gilroy'] mb-1">254</div>
              <div className="text-xs font-semibold text-gray-500">Clients</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#E55A43]">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-[#EBECEF] p-8 rounded-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),_0_4px_10px_rgba(0,0,0,0.05)] border border-white/50 relative">
            <h3 className="text-lg font-bold text-[#1a2b4c] font-['Gilroy'] mb-6 absolute top-8 left-8">DC Charger Licenses</h3>
            <div className="mt-12 flex justify-center">
              <ConcentricDonut 
                centerLabel="Total"
                centerValue="500"
                data={[
                  { label: "Total DC Licenses", color: "#3B82F6", value: 85, radius: 70 },
                  { label: "Available DC Licenses", color: "#EF4444", value: 70, radius: 56 },
                  { label: "Active DC Licenses", color: "#EAB308", value: 45, radius: 42 }
                ]}
              />
            </div>
          </div>

          <div className="bg-[#EBECEF] p-8 rounded-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),_0_4px_10px_rgba(0,0,0,0.05)] border border-white/50 relative">
            <h3 className="text-lg font-bold text-[#1a2b4c] font-['Gilroy'] mb-6 absolute top-8 left-8">AC Charger Licenses</h3>
            <div className="mt-12 flex justify-center">
              <ConcentricDonut 
                centerLabel="Total"
                centerValue="800"
                data={[
                  { label: "Total AC Licenses", color: "#3B82F6", value: 92, radius: 70 },
                  { label: "Available AC Licenses", color: "#EF4444", value: 60, radius: 56 },
                  { label: "Active AC Licenses", color: "#EAB308", value: 30, radius: 42 }
                ]}
              />
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-[#EBECEF] p-8 rounded-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),_0_4px_10px_rgba(0,0,0,0.05)] border border-white/50 relative">
            <h3 className="text-lg font-bold text-[#1a2b4c] font-['Gilroy'] mb-6 absolute top-8 left-8">Total EV Owners</h3>
            <div className="mt-12 flex justify-center">
              <ConcentricDonut 
                centerLabel="Total"
                centerValue="254"
                data={[
                  { label: "EV Users", color: "#3B82F6", value: 75, radius: 70 },
                  { label: "Active Users", color: "#EF4444", value: 50, radius: 56 },
                  { label: "Inactive Users", color: "#EAB308", value: 25, radius: 42 }
                ]}
              />
            </div>
          </div>

          <div className="bg-[#EBECEF] p-8 rounded-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),_0_4px_10px_rgba(0,0,0,0.05)] border border-white/50 relative">
            <h3 className="text-lg font-bold text-[#1a2b4c] font-['Gilroy'] mb-6 absolute top-8 left-8">Total Chargers</h3>
            <div className="mt-12 flex justify-center">
              <ConcentricDonut 
                centerLabel="Total"
                centerValue="1300"
                data={[
                  { label: "Total chargers", color: "#3B82F6", value: 80, radius: 70 },
                  { label: "Commissioned chargers", color: "#EF4444", value: 55, radius: 56 }
                ]}
              />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

`

### src\components\EVLinqDashboardPreview.tsx
`	sx
"use client";

import React from "react";
import { 
  Building2, 
  CreditCard, 
  MapPin, 
  Network, 
  Activity, 
  Ticket, 
  Clock, 
  FileText, 
  MessageSquareWarning,
  Calendar,
  Download,
  XCircle,
  PlusCircle
} from "lucide-react";

export function EVLinqDashboardPreview() {
  return (
    <div className="w-full min-w-[1024px] bg-[#f9f9f9] rounded-2xl overflow-hidden shadow-2xl flex flex-col font-['Figtree'] text-[#333333] border border-gray-200" style={{ height: '700px' }}>
      
      {/* MAC WINDOW CONTROLS */}
      <div className="h-10 bg-white border-b border-gray-200 flex items-center px-4 shrink-0">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
          <div className="p-6">
            <span className="font-['Gilroy'] font-black text-2xl tracking-tighter text-[#222222]">DYU</span>
          </div>
          <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
            {[
              { icon: Building2, label: "Company Management" },
              { icon: CreditCard, label: "Settlements" },
              { icon: MapPin, label: "Locations" },
              { icon: Network, label: "Network", active: true },
              { icon: Activity, label: "Tariff" },
              { icon: Ticket, label: "Tokens" },
              { icon: Clock, label: "Sessions" },
              { icon: FileText, label: "Logs" },
              { icon: MessageSquareWarning, label: "Complaint" },
            ].map((item, i) => (
              <div 
                key={i} 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold cursor-pointer ${
                  item.active ? "text-[#f26522] bg-[#fff0e6]" : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <item.icon size={18} strokeWidth={item.active ? 2.5 : 2} />
                <span>{item.label}</span>
              </div>
            ))}
          </nav>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 bg-[#fbfbfb] flex flex-col overflow-hidden">
          <div className="p-6 overflow-y-auto flex-1">
            
            {/* Header */}
            <div className="flex justify-between items-end mb-6">
              <div>
                <h1 className="text-2xl font-bold font-['Gilroy'] text-[#222222]">
                  Network Details - <span className="text-[#f26522]">EVlinq</span>
                </h1>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs font-semibold text-gray-600 shadow-sm">
                  <Calendar size={14} /> 05/05/2025 - 05/05/2026
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs font-semibold text-gray-600 shadow-sm">
                  <Download size={14} /> Download Report
                </button>
              </div>
            </div>

            {/* Filter Tags */}
            <div className="flex gap-3 mb-8">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#fff0e6] border border-[#f26522]/20 text-[#f26522] rounded-full text-xs font-semibold">
                <XCircle size={14} />
                <span>Company Name (31) : DYU</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 text-gray-500 rounded-full text-xs font-semibold">
                <PlusCircle size={14} />
                <span>Charger Name</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 text-gray-500 rounded-full text-xs font-semibold">
                <PlusCircle size={14} />
                <span>Station Name</span>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {['Total Capacity', 'Available Capacity', 'Utilization'].map((title, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm h-28 flex flex-col">
                  <span className="text-xs font-semibold text-gray-400 mb-2">{title}</span>
                  <div className="mt-auto opacity-20 flex gap-1 flex-wrap">
                    {Array.from({ length: 48 }).map((_, j) => (
                      <div key={j} className="w-1 h-2 bg-gray-400 rounded-sm" />
                    ))}
                  </div>
                </div>
              ))}
              <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm h-28 flex flex-col relative overflow-hidden">
                 <span className="text-xs font-semibold text-gray-400 z-10 relative">Uptime</span>
                 <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full border-[12px] border-gray-100" />
                 <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full border-[12px] border-[#5e6ad2] border-t-transparent border-r-transparent -rotate-45" />
                 <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[#5e6ad2] font-bold text-lg">%</div>
                 <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs font-bold text-gray-500">
                   <div className="w-2 h-2 rounded-full bg-[#5e6ad2]" /> Uptime
                 </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#f8f9fa] text-gray-400 font-semibold border-b border-gray-100">
                    <th className="px-4 py-3 font-semibold">Charger Name</th>
                    <th className="px-4 py-3 font-semibold">CPO Name</th>
                    <th className="px-4 py-3 font-semibold">Station Name</th>
                    <th className="px-4 py-3 font-semibold">State</th>
                    <th className="px-4 py-3 font-semibold">Total Uptime (%)</th>
                    <th className="px-4 py-3 font-semibold">Total Utilization (Units)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-500 font-medium">
                  {[
                    ["DYU DC-120", "Electra Charge", "Cyber Hub Tower B", "Delhi"],
                    ["DYU DC-120", "UrbanVolt", "Cyber Hub Tower B", "Delhi"],
                    ["DYU DC-60", "Hydra charging", "Cyber Hub Tower B", "Delhi"],
                    ["DYU DC-60", "Hydra charging", "DYU Vasant Vihar", "Delhi"],
                    ["DYU DC-120 pro", "Hydra charging", "DYU Vasant Vihar", "Delhi"],
                    ["DYU DC Charger", "Del com", "DLF Mall of India", "Haryana"],
                    ["DYU DC-120", "HPCL", "DLF Mall of India", "Haryana"],
                    ["DYU DC-60", "Hydra charging", "DLF Mall of India", "Haryana"],
                    ["DYU DC-120 pro", "EV Motors", "DLF Mall of India", "Haryana"],
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                      <td className="px-4 py-3">{row[0]}</td>
                      <td className="px-4 py-3">{row[1]}</td>
                      <td className="px-4 py-3">{row[2]}</td>
                      <td className="px-4 py-3">{row[3]}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-[2px] opacity-20">
                          {Array.from({ length: 24 }).map((_, j) => (
                            <div key={j} className="w-1 h-2.5 bg-gray-400 rounded-sm" />
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                         <div className="flex gap-[2px] opacity-20">
                          {Array.from({ length: 24 }).map((_, j) => (
                            <div key={j} className="w-1 h-2.5 bg-gray-400 rounded-sm" />
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

`

### src\components\FrameScrubSection.tsx
`	sx

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FrameScrubSectionProps {
  totalFrames?: number;
  framePathPrefix?: string;
}

export function FrameScrubSection({
  totalFrames = 280,
  framePathPrefix = "/dyu-frames-280"
}: FrameScrubSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  const getFrameSrc = (index: number): string => {
    const padded = String(index).padStart(3, "0");
    return `${framePathPrefix}/ezgif-frame-${padded}.png`;
  };

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
    for (let i = 0; i < totalFrames; i++) {
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

    // GSAP ScrollTrigger — pin section, scrub through frames
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 4}`,
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate: (self) => {
        const frameIndex = Math.min(
          Math.floor(self.progress * (totalFrames - 1)),
          totalFrames - 1
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

    </div>
  );
}


`

### src\components\ImageTrail.tsx
`	sx
"use client";

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

function lerp(a: number, b: number, n: number): number {
  return (1 - n) * a + n * b;
}

function getLocalPointerPos(e: MouseEvent | TouchEvent, rect: DOMRect): { x: number; y: number } {
  let clientX = 0,
    clientY = 0;
  if ('touches' in e && e.touches.length > 0) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else if ('clientX' in e) {
    const mouseEv = e as MouseEvent;
    clientX = mouseEv.clientX;
    clientY = mouseEv.clientY;
  }
  return {
    x: clientX - rect.left,
    y: clientY - rect.top
  };
}

function getMouseDistance(p1: { x: number; y: number }, p2: { x: number; y: number }): number {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.hypot(dx, dy);
}

class ImageItem {
  public DOM: { el: HTMLDivElement; inner: HTMLDivElement | null } = {
    el: null as unknown as HTMLDivElement,
    inner: null
  };
  public defaultStyle: gsap.TweenVars = { scale: 1, x: 0, y: 0, opacity: 0 };
  public rect: DOMRect | null = null;
  private resize!: () => void;

  constructor(DOM_el: HTMLDivElement) {
    this.DOM.el = DOM_el;
    this.DOM.inner = this.DOM.el.querySelector('.content__img-inner');
    this.getRect();
    this.initEvents();
  }

  private initEvents() {
    this.resize = () => {
      gsap.set(this.DOM.el, this.defaultStyle);
      this.getRect();
    };
    window.addEventListener('resize', this.resize);
  }

  private getRect() {
    this.rect = this.DOM.el.getBoundingClientRect();
  }

  public destroy() {
    window.removeEventListener('resize', this.resize);
  }
}

abstract class ImageTrailBase {
  protected container: HTMLDivElement;
  protected images: ImageItem[];
  protected imagesTotal: number;
  protected imgPosition: number = 0;
  protected zIndexVal: number = 1;
  protected activeImagesCount: number = 0;
  protected isIdle: boolean = true;
  protected threshold: number = 80;
  protected mousePos: { x: number; y: number } = { x: 0, y: 0 };
  protected lastMousePos: { x: number; y: number } = { x: 0, y: 0 };
  protected cacheMousePos: { x: number; y: number } = { x: 0, y: 0 };
  private rafId: number | null = null;

  constructor(container: HTMLDivElement) {
    this.container = container;
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img as HTMLDivElement));
    this.imagesTotal = this.images.length;

    const handlePointerMove = (ev: MouseEvent | TouchEvent) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('touchmove', handlePointerMove);

    const initRender = (ev: MouseEvent | TouchEvent) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };
      this.rafId = requestAnimationFrame(() => this.render());
      container.removeEventListener('mousemove', initRender as EventListener);
      container.removeEventListener('touchmove', initRender as EventListener);
    };

    container.addEventListener('mousemove', initRender as EventListener);
    container.addEventListener('touchmove', initRender as EventListener);
  }

  protected abstract render(): void;
  protected abstract showNextImage(): void;

  protected onImageActivated() {
    this.activeImagesCount++;
    this.isIdle = false;
  }

  protected onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) {
      this.isIdle = true;
    }
  }

  public destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.images.forEach(img => img.destroy());
  }
}

class ImageTrailVariant1 extends ImageTrailBase {
  protected render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    requestAnimationFrame(() => this.render());
  }

  protected showNextImage() {
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    gsap.killTweensOf(img.DOM.el);
    gsap.timeline({
      onStart: () => this.onImageActivated(),
      onComplete: () => this.onImageDeactivated()
    })
    .fromTo(img.DOM.el, {
      opacity: 1, scale: 1, zIndex: this.zIndexVal,
      x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,
      y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2
    }, {
      duration: 0.4, ease: 'power1',
      x: this.mousePos.x - (img.rect?.width ?? 0) / 2,
      y: this.mousePos.y - (img.rect?.height ?? 0) / 2
    }, 0)
    .to(img.DOM.el, {
      duration: 0.4, ease: 'power3', opacity: 0, scale: 0.2
    }, 0.4);
  }
}

class ImageTrailVariant2 extends ImageTrailBase {
  protected render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    requestAnimationFrame(() => this.render());
  }

  protected showNextImage() {
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    gsap.killTweensOf(img.DOM.el);
    gsap.timeline({
      onStart: () => this.onImageActivated(),
      onComplete: () => this.onImageDeactivated()
    })
    .fromTo(img.DOM.el, {
      opacity: 1, scale: 0, zIndex: this.zIndexVal,
      x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,
      y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2
    }, {
      duration: 0.4, ease: 'power1', scale: 1,
      x: this.mousePos.x - (img.rect?.width ?? 0) / 2,
      y: this.mousePos.y - (img.rect?.height ?? 0) / 2
    }, 0)
    .fromTo(img.DOM.inner, { scale: 2.8, filter: 'brightness(250%)' }, {
      duration: 0.4, ease: 'power1', scale: 1, filter: 'brightness(100%)'
    }, 0)
    .to(img.DOM.el, {
      duration: 0.4, ease: 'power2', opacity: 0, scale: 0.2
    }, 0.45);
  }
}

class ImageTrailVariant3 extends ImageTrailBase {
  protected render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    requestAnimationFrame(() => this.render());
  }

  protected showNextImage() {
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    gsap.killTweensOf(img.DOM.el);
    gsap.timeline({
      onStart: () => this.onImageActivated(),
      onComplete: () => this.onImageDeactivated()
    })
    .fromTo(img.DOM.el, {
      opacity: 1, scale: 0, zIndex: this.zIndexVal,
      xPercent: 0, yPercent: 0,
      x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,
      y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2
    }, {
      duration: 0.4, ease: 'power1', scale: 1,
      x: this.mousePos.x - (img.rect?.width ?? 0) / 2,
      y: this.mousePos.y - (img.rect?.height ?? 0) / 2
    }, 0)
    .to(img.DOM.el, {
      duration: 0.6, ease: 'power2', opacity: 0, scale: 0.2,
      xPercent: () => gsap.utils.random(-30, 30),
      yPercent: -200
    }, 0.6);
  }
}

class ImageTrailVariant4 extends ImageTrailBase {
  protected render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    requestAnimationFrame(() => this.render());
  }

  protected showNextImage() {
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    gsap.killTweensOf(img.DOM.el);
    
    let dx = this.mousePos.x - this.cacheMousePos.x;
    let dy = this.mousePos.y - this.cacheMousePos.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    if (dist !== 0) { dx /= dist; dy /= dist; }
    dx *= dist / 100;
    dy *= dist / 100;

    gsap.timeline({
      onStart: () => this.onImageActivated(),
      onComplete: () => this.onImageDeactivated()
    })
    .fromTo(img.DOM.el, {
      opacity: 1, scale: 0, zIndex: this.zIndexVal,
      x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,
      y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2
    }, {
      duration: 0.4, ease: 'power1', scale: 1,
      x: this.mousePos.x - (img.rect?.width ?? 0) / 2,
      y: this.mousePos.y - (img.rect?.height ?? 0) / 2
    }, 0)
    .fromTo(img.DOM.inner, {
      scale: 2,
      filter: `brightness(${Math.max((400 * dist) / 100, 100)}%) contrast(${Math.max((400 * dist) / 100, 100)}%)`
    }, {
      duration: 0.4, ease: 'power1', scale: 1, filter: 'brightness(100%) contrast(100%)'
    }, 0)
    .to(img.DOM.el, { duration: 0.4, ease: 'power3', opacity: 0 }, 0.4)
    .to(img.DOM.el, { duration: 1.5, ease: 'power4', x: `+=${dx * 110}`, y: `+=${dy * 110}` }, 0.05);
  }
}

class ImageTrailVariant5 extends ImageTrailBase {
  private lastAngle: number = 0;

  protected render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    requestAnimationFrame(() => this.render());
  }

  protected showNextImage() {
    let dx = this.mousePos.x - this.cacheMousePos.x;
    let dy = this.mousePos.y - this.cacheMousePos.y;
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    if (angle < 0) angle += 360;
    if (angle > 90 && angle <= 270) angle += 180;
    const isMovingClockwise = angle >= this.lastAngle;
    this.lastAngle = angle;
    let startAngle = isMovingClockwise ? angle - 10 : angle + 10;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist !== 0) { dx /= dist; dy /= dist; }
    dx *= dist / 150; dy *= dist / 150;

    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    gsap.killTweensOf(img.DOM.el);
    gsap.timeline({
      onStart: () => this.onImageActivated(),
      onComplete: () => this.onImageDeactivated()
    })
    .fromTo(img.DOM.el, {
      opacity: 1, filter: 'brightness(80%)', scale: 0.1, zIndex: this.zIndexVal,
      x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,
      y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2,
      rotation: startAngle
    }, {
      duration: 1, ease: 'power2', scale: 1, filter: 'brightness(100%)',
      x: this.mousePos.x - (img.rect?.width ?? 0) / 2 + dx * 70,
      y: this.mousePos.y - (img.rect?.height ?? 0) / 2 + dy * 70,
      rotation: this.lastAngle
    }, 0)
    .to(img.DOM.el, { duration: 0.4, ease: 'expo', opacity: 0 }, 0.5)
    .to(img.DOM.el, { duration: 1.5, ease: 'power4', x: `+=${dx * 120}`, y: `+=${dy * 120}` }, 0.05);
  }
}

class ImageTrailVariant6 extends ImageTrailBase {
  protected render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.3);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.3);
    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    requestAnimationFrame(() => this.render());
  }

  protected showNextImage() {
    const dx = this.mousePos.x - this.cacheMousePos.x;
    const dy = this.mousePos.y - this.cacheMousePos.y;
    const speed = Math.sqrt(dx * dx + dy * dy);
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    
    const scaleFactor = 0.3 + (1.7) * Math.min(speed / 200, 1);
    const brightnessValue = 1 + (0.3) * Math.min(speed / 70, 1);
    const blurValue = 20 * (1 - Math.min(speed / 90, 1));
    const grayscaleValue = 1 * (1 - Math.min(speed / 90, 1));

    gsap.killTweensOf(img.DOM.el);
    gsap.timeline({
      onStart: () => this.onImageActivated(),
      onComplete: () => this.onImageDeactivated()
    })
    .fromTo(img.DOM.el, {
      opacity: 1, scale: 0, zIndex: this.zIndexVal,
      x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,
      y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2
    }, {
      duration: 0.8, ease: 'power3', scale: scaleFactor,
      filter: `grayscale(${grayscaleValue * 100}%) brightness(${brightnessValue * 100}%) blur(${blurValue}px)`,
      x: this.mousePos.x - (img.rect?.width ?? 0) / 2,
      y: this.mousePos.y - (img.rect?.height ?? 0) / 2
    }, 0)
    .to(img.DOM.el, { duration: 0.4, ease: 'power3.in', opacity: 0, scale: 0.2 }, 0.45);
  }
}

class ImageTrailVariant7 extends ImageTrailBase {
  private visibleImagesCount: number = 0;
  private visibleImagesTotal: number = 9;

  protected render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.3);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.3);
    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    requestAnimationFrame(() => this.render());
  }

  protected showNextImage() {
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    ++this.visibleImagesCount;
    gsap.killTweensOf(img.DOM.el);
    const scaleValue = gsap.utils.random(0.5, 1.6);
    
    gsap.timeline({
      onStart: () => this.onImageActivated(),
      onComplete: () => this.onImageDeactivated()
    })
    .fromTo(img.DOM.el, {
      scale: scaleValue - 0.4, rotationZ: 0, opacity: 1, zIndex: this.zIndexVal,
      x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,
      y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2
    }, {
      duration: 0.4, ease: 'power3', scale: scaleValue,
      rotationZ: gsap.utils.random(-3, 3),
      x: this.mousePos.x - (img.rect?.width ?? 0) / 2,
      y: this.mousePos.y - (img.rect?.height ?? 0) / 2
    }, 0);

    if (this.visibleImagesCount >= this.visibleImagesTotal) {
      const lastInQueue = (this.imgPosition - this.visibleImagesTotal + this.imagesTotal) % this.imagesTotal;
      const oldImg = this.images[lastInQueue];
      gsap.to(oldImg.DOM.el, { duration: 0.4, ease: 'power4', opacity: 0, scale: 1.3 });
    }
  }
}

class ImageTrailVariant8 extends ImageTrailBase {
  private lastSpawnedImg: ImageItem | null = null;

  protected render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    requestAnimationFrame(() => this.render());
  }

  protected showNextImage() {
    const rect = this.container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const relX = this.mousePos.x - centerX;
    const relY = this.mousePos.y - centerY;
    
    const rotX = -(relY / centerY) * 30;
    const rotY = (relX / centerX) * 30;
    const distFromCenter = Math.sqrt(relX * relX + relY * relY);
    const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
    const zValue = (distFromCenter / maxDist) * 1200 - 600;
    const brightness = 0.2 + ((zValue + 600) / 1200) * 2.3;

    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];

    this.lastSpawnedImg = img;
    this.images.forEach(i => {
      if (i !== img) {
        gsap.killTweensOf(i.DOM.el);
        gsap.set(i.DOM.el, { opacity: 0, autoAlpha: 0, scale: 0, zIndex: -1 });
        i.DOM.el.style.opacity = '0';
        i.DOM.el.style.visibility = 'hidden';
      }
    });

    gsap.killTweensOf(img.DOM.el);
    gsap.timeline({
      onStart: () => this.onImageActivated(),
      onComplete: () => this.onImageDeactivated()
    })
    .set(this.container, { perspective: 1000 })
    .set(img.DOM.el, { opacity: 1, autoAlpha: 1 })
    .fromTo(img.DOM.el, {
      z: 0, scale: 1 + zValue / 1000, zIndex: this.zIndexVal,
      x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,
      y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2,
      rotationX: rotX, rotationY: rotY, filter: `brightness(${brightness})`
    }, {
      duration: 1, ease: 'expo', scale: 1 + zValue / 1000,
      x: this.mousePos.x - (img.rect?.width ?? 0) / 2,
      y: this.mousePos.y - (img.rect?.height ?? 0) / 2,
      rotationX: rotX, rotationY: rotY
    }, 0);
  }
}

const variantMap: Record<number, any> = {
  1: ImageTrailVariant1,
  2: ImageTrailVariant2,
  3: ImageTrailVariant3,
  4: ImageTrailVariant4,
  5: ImageTrailVariant5,
  6: ImageTrailVariant6,
  7: ImageTrailVariant7,
  8: ImageTrailVariant8
};

export interface ImageTrailProps {
  /** Array of image URLs to trail */
  items: string[];
  /** Animation variant (1-8) */
  variant?: number;
  /** Custom threshold for triggering next image (distance in px) */
  threshold?: number;
}

export function ImageTrail({ items = [], variant = 1, threshold = 80 }: ImageTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || items.length === 0) return;

    const Cls = variantMap[variant] || variantMap[1];
    instanceRef.current = new Cls(containerRef.current);
    
    // Set threshold if custom
    if (instanceRef.current && threshold !== 80) {
      instanceRef.current.threshold = threshold;
    }

    return () => {
      if (instanceRef.current) {
        instanceRef.current.destroy();
      }
    };
  }, [variant, items, threshold]);

  return (
    <div 
      className="w-full h-full absolute inset-0 z-0 bg-transparent overflow-hidden touch-none" 
      ref={containerRef}
    >
      {items.map((url, i) => (
        <div
          className="content__img w-[350px] aspect-[1.1] rounded-[15px] absolute top-0 left-0 opacity-0 overflow-hidden [will-change:transform,filter] shadow-2xl pointer-events-none"
          key={i}
        >
          <div
            className="content__img-inner bg-center bg-cover w-[calc(100%+20px)] h-[calc(100%+20px)] absolute top-[-10px] left-[-10px]"
            style={{ backgroundImage: `url(${url})` }}
          />
        </div>
      ))}
    </div>
  );
}

export default ImageTrail;

`

### src\components\Navbar.tsx
`	sx

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
  BookOpen,
  Briefcase
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
    { label: "CSMS Platform", desc: "Enterprise management system for your charging network.", href: "/ev-charging-software/csms", icon: Monitor },
    { label: "EV Linq Roaming Hub", desc: "Interoperable roaming hub to connect with other networks.", href: "/ev-charging-software/evlinq", icon: Globe }
  ];

  const hardwareItems = [
    { label: "AC Chargers", desc: "Reliable charging for homes, offices, and destinations.", href: "/ac-chargers", icon: BatteryCharging },
    { label: "DC Chargers", desc: "Ultra-fast highway charging from 60kW to 360kW.", href: "/dc-chargers", icon: Zap },
    { label: "Nectar Home Charger", desc: "Smart home charger with auto-schedule.", href: "/nectar", icon: Home },
    { label: "Portable Charger", desc: "Convenient, plug-and-play charging on the go.", href: "/products/portable-charger", icon: Cable },
    { label: "AdWall", desc: "Smart charging integrated with advertising screens.", href: "/adwall", icon: Tv }
  ];

  const companyItems = [
    { label: "About DYU", desc: "Building the largest green energy network in India.", href: "/about-us", icon: Info },
    { label: "Partner With Us", desc: "Start an EV charging network with us.", href: "/partner-with-us", icon: Briefcase },
    { label: "Contact Us", desc: "Get in touch with our support and sales teams.", href: "/contact-us", icon: PhoneCall },
    { label: "FAQ", desc: "Frequently asked questions about our services.", href: "/faq", icon: HelpCircle }
  ];

  const resourceItems = [
    { label: "EV Calculator", desc: "Estimate your savings and charging times easily.", href: "/ev-calculator", icon: Calculator },
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
        className="fixed top-0 left-0 right-0 z-[999] w-full"
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

          {/* Center Links — Products/Discover/Franchise/FAQ */}
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
              href="/partner-with-us"
              className="text-[12px] font-medium py-1.5 px-3 rounded-lg transition-colors duration-200"
              style={{ color: 'inherit' }}
            >
              Partner With Us
            </Link>

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
              Get Franchise →
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
                        <div className="text-[13px] font-bold text-[var(--color-graphite-veil)] uppercase tracking-wider mb-6" style={{ fontFamily: 'var(--font-figtree)' }}>
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
                        <div className="text-[13px] font-bold text-[var(--color-graphite-veil)] uppercase tracking-wider mb-6" style={{ fontFamily: 'var(--font-figtree)' }}>
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
              Get Franchise →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


`

### src\components\SmoothScrollProvider.tsx
`	sx
"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Disable Lenis on touch devices to allow native, hardware-accelerated scrolling for GSAP
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    // Sync Lenis scroll position with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Tick Lenis inside GSAP ticker for frame-perfect sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP's default lag smoothing to avoid conflicts
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return <div suppressHydrationWarning>{children}</div>;
}

`

### src\components\ac-charger\ScrollRevealSection.tsx
`	sx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface ScrollRevealSectionProps {
  imageSrc: string;
  imageAlt: string;
  title: React.ReactNode;
  description: string;
  features: { title: string; desc: string }[];
  reverse?: boolean;
}

export function ScrollRevealSection({
  imageSrc,
  imageAlt,
  title,
  description,
  features,
  reverse = false,
}: ScrollRevealSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax and 3D effects
  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen py-16 md:py-32 overflow-hidden flex items-center bg-[#F1EFE1]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 lg:gap-24`}>
          
          {/* Image Side - Sticky/Parallax */}
          <div className="w-full md:w-1/2 h-[50vh] md:h-[80vh] relative rounded-[2rem] overflow-hidden shadow-2xl">
            <motion.div 
              className="w-full h-full relative origin-center"
              style={{ y: imageY, scale: imageScale }}
            >
              <div className="absolute inset-0 bg-black/10 z-10 transition-colors" />
              {/* Using standard img for external real unsplash images if not configured in next.config, but next/image works with Unsplash if configured. Assuming it's unconfigured, we might need img or to configure next.config. Let's use standard img for safety to avoid next/image domain errors, but we can style it to look identical */}
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>

          {/* Text Side - Scroll Reveal */}
          <motion.div 
            className="w-full md:w-1/2 flex flex-col justify-center"
            style={{ opacity }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="flex flex-col gap-1 mb-6 text-[clamp(32px,4vw,48px)] font-[900] tracking-tighter leading-[1.1]" style={{ fontFamily: '"Gilroy", sans-serif' }}>
                {title}
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {description}
              </p>

              <div className="space-y-6">
                {features.map((feature, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: reverse ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                    className="border-l-4 border-[#00F0FF] pl-6"
                  >
                    <h3 className="mb-2 text-[#333333]" style={{ fontFamily: '"Gilroy", sans-serif', fontWeight: 800, letterSpacing: '0.5px', fontSize: '1.25rem', lineHeight: '1.2' }}>{feature.title}</h3>
                    <p className="text-gray-500 text-sm">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}

`

### src\components\ui\layered-stack.tsx
`	sx

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



`

### src\components\ui\scroll-split-card.tsx
`	sx

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
  image?: string;
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

                {card.image && (
                  <div className="absolute top-0 left-0 right-0 h-[55%] md:h-[60%] overflow-hidden">
                    <img 
                      src={card.image} 
                      alt={card.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  </div>
                )}

                <div className="relative z-10 mt-auto">
                  {card.icon && <div className="mb-3">{card.icon}</div>}
                  <h3 className="mb-2 md:mb-3 text-[16px] leading-[1.1] md:text-2xl font-bold md:leading-tight drop-shadow-md">
                    {card.title}
                  </h3>
                  <p className="text-[12px] md:text-sm opacity-90 leading-relaxed font-medium drop-shadow-md">{card.description}</p>
                </div>
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


`

### src\lib\utils.ts
`	sx
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

`

## 3. ALL ANIMATION-RELATED FILES
*(Note: All GSAP and ScrollTrigger logic is embedded directly within the component files above, primarily using the useGSAP hook inside src/components/Car3DViewer.tsx, src/components/ScrollRevealSection.tsx, etc.)*

## 4. TAILWIND CONFIG & 5. GLOBAL CSS FILE
### src/app/globals.css
`css

@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;1,400&family=Figtree:wght@300;400;500;600;700;800;900&display=swap');
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme {
  /* ── COLORS ── */
  --color-cream-paper: #F1EFE1;
  --color-midnight-ink: #1a1a1a;
  --color-pure-black: #000000;
  --color-white: #ffffff;
  --color-stone-mist: #e4e4d0;
  --color-graphite-veil: #8a8a80;
  --color-smoke: #5f5f59;
  --color-charcoal: #222222;
  --color-charcoal-mist: #333333;
  --color-deep-forest-teal: #222222;
  --color-lavender-whisper: #f0d7ff;

  /* Global Electric Blue Override */
  --color-blue-50: #f0f7ff;
  --color-blue-100: #dcebfe;
  --color-blue-200: #bcdbfe;
  --color-blue-300: #88c1fe;
  --color-blue-400: #4da2fc;
  --color-blue-500: #1a7cf9;
  --color-blue-600: #00F0FF; /* Electric Blue */
  --color-blue-700: #003ce6;
  --color-blue-800: #0031b8;
  --color-blue-900: #002d8f;

  --color-sky-50: #f0f7ff;
  --color-sky-100: #dcebfe;
  --color-sky-200: #bcdbfe;
  --color-sky-300: #88c1fe;
  --color-sky-400: #4da2fc;
  --color-sky-500: #1a7cf9;
  --color-sky-600: #00F0FF; /* Electric Blue */
  --color-sky-700: #003ce6;
  --color-sky-800: #0031b8;
  --color-sky-900: #002d8f;
  
  /* Semantic aliases */
  --color-background: #ffffeb;
  --color-foreground: #1a1a1a;
  --color-primary: #222222;
  --color-accent: #f0d7ff;
  --color-border: #e4e4d0;
  --color-muted: #8a8a80;

  /* ── TYPOGRAPHY ── */
  --font-figtree: 'Figtree', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-eb-garamond: 'EB Garamond', 'Cormorant Garamond', 'Playfair Display', 'Lora', Georgia, serif;
  --font-sans: var(--font-figtree) !important;
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
  --surface-teal: #222222;
  --surface-dark: #1a1a1a;
}

:root {
  --color-cream-paper: #F1EFE1;
  --color-midnight-ink: #1a1a1a;
  --color-pure-black: #000000;
  --color-white: #ffffff;
  --color-stone-mist: #e4e4d0;
  --color-graphite-veil: #8a8a80;
  --color-smoke: #5f5f59;
  --color-charcoal: #222222;
  --color-charcoal-mist: #333333;
  --color-deep-forest-teal: #222222;
  --color-lavender-whisper: #f0d7ff;
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

/* â”€â”€ DISPLAY HEADLINES — EB GARAMOND ONLY â”€â”€ */
/* Rule: EB Garamond ONLY at 32px and above. Never on body/UI text. */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-figtree);
  font-weight: 700;
}

h1 {
  line-height: var(--leading-display-xl);
  letter-spacing: var(--tracking-display-xl);
}

h2 {
  line-height: var(--leading-display);
  letter-spacing: var(--tracking-display);
}

h3 {
  line-height: var(--leading-heading-lg);
  letter-spacing: var(--tracking-heading-lg);
}

h4 {
  font-weight: 700;
  line-height: var(--leading-heading-sm);
}

h5, h6 {
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
  font-family: var(--font-figtree) !important;
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
  font-family: var(--font-figtree) !important;
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
  font-family: var(--font-figtree) !important;
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
  background: #222222;
  color: var(--color-white);
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

/* â”€â”€ SECTION RHYTHM (cream → dark → cream → teal → cream) â”€â”€ */
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


/* Lenis Base Styles for Scrollbar Sync */
html.lenis, html.lenis body {
  height: auto;
}
.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}
.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}
.lenis.lenis-stopped {
  overflow: hidden;
}
.lenis.lenis-smooth iframe {
  pointer-events: none;
}

/* Mesh Gradient Animation */
.mesh-bg-anim {
  background: radial-gradient(circle at top left, rgba(232, 78, 27, 0.25) 0%, transparent 50%),
              radial-gradient(circle at bottom right, rgba(14, 165, 233, 0.2) 0%, transparent 50%),
              radial-gradient(circle at center, rgba(232, 78, 27, 0.1) 0%, transparent 60%);
  background-size: 200% 200%;
  animation: meshFlow 10s ease infinite alternate;
}

@keyframes meshFlow {
  0% { background-position: 0% 0%; }
  33% { background-position: 100% 0%; }
  66% { background-position: 100% 100%; }
  100% { background-position: 0% 100%; }
}

/* Morph Card Animation */
.morph-card {
  animation: cardMorphing 8s ease-in-out infinite;
}

@keyframes cardMorphing {
  0% {
    border-radius: 24px;
  }
  33% {
    border-radius: 40px 16px 50px 24px;
  }
  66% {
    border-radius: 16px 50px 24px 40px;
  }
  100% {
    border-radius: 24px;
  }
}

/* Spinning Border Animation */
.spin-border {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(
    from 0deg,
    transparent 0%,
    transparent 35%,
    #00008b 45%,
    #90ee90 50%,
    transparent 50%,
    transparent 85%,
    #00008b 95%,
    #90ee90 100%
  );
  animation: spinBorder 4s linear infinite;
  z-index: 0;
}

@keyframes spinBorder {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Global rule to ensure Gilroy font letters never touch each other */
.font-\[\'Gilroy\'\], [style*="Gilroy"] {
  letter-spacing: 0.5px !important;
}

/* Force Figtree on ALL CTA buttons globally */
button,
[type="button"],
[type="submit"],
[type="reset"],
.btn-primary,
.btn-ghost,
.btn-secondary,
.btn-platform,
a[role="button"],
a[class*="bg-[#222222]"],
a[class*="rounded-full"],
a[href="/ev-charging-station-franchise"],
a[href="/dc-chargers"],
.inline-flex.items-center.justify-center.whitespace-nowrap.rounded-md {
  font-family: var(--font-figtree) !important;
}

`

## 6. PACKAGE.JSON (Dependencies)
`json
{
  "dependencies": {
    "@base-ui/react": "^1.6.0",
    "@gsap/react": "^2.1.2",
    "@react-three/drei": "^10.7.7",
    "@react-three/fiber": "^9.6.1",
    "@studio-freight/lenis": "^1.0.42",
    "@types/three": "^0.185.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^12.42.2",
    "gsap": "^3.15.0",
    "lenis": "^1.3.25",
    "lucide-react": "^1.23.0",
    "next": "16.2.10",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "react-use": "^17.6.1",
    "shadcn": "^4.13.0",
    "tailwind-merge": "^3.6.0",
    "three": "^0.185.1",
    "three-stdlib": "^2.36.1",
    "tw-animate-css": "^1.4.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.10",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
`

## 7. RESPONSIVE/MEDIA QUERY CODE
Tailwind CSS responsive utility classes (like md:, lg:, sm:) are used extensively throughout the component files. Specifically:
- Layout changes from lex-col on mobile to md:flex-row on desktop.
- Typography scaling from 	ext-3xl on mobile to md:text-5xl on desktop.
- The GSAP 3D Car animations contain window.innerWidth checks to conditionally run or alter animations based on mobile vs desktop (e.g., in Car3DViewer.tsx).
