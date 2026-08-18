
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, Variants, AnimatePresence } from "framer-motion";
import { Zap, ShieldCheck, MapPin, Briefcase, Leaf, Globe, ArrowRight, ChevronRight, Home, Star } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSplitCard } from "@/components/ui/scroll-split-card";
import { LayeredStack } from "@/components/ui/layered-stack";
import { ShutterPreloader } from "@/components/ui/ShutterPreloader";


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
  "/images/hero-new-3.png"
];

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const chargingSectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // States and refs for dynamic background scroll transitions
  const [wordRevealActive, setWordRevealActive] = useState(false);
  const wordRevealRef = useRef<HTMLDivElement>(null);

  const [resourcesActive, setResourcesActive] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);

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

  // Intersection Observer for Word Reveal Section
  useEffect(() => {
    const el = wordRevealRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      setWordRevealActive(entry.isIntersecting);
    }, {
      threshold: 0.25,
      rootMargin: "-10% 0px -10% 0px"
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Intersection Observer for Resources Section
  useEffect(() => {
    const el = resourcesRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      setResourcesActive(entry.isIntersecting);
    }, {
      threshold: 0.15,
      rootMargin: "-10% 0px -10% 0px"
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* Shutter Preloader splash entrance */}
      <ShutterPreloader />

      {/* Eager Preload for All 3 Hero Background Images */}
      <link rel="preload" as="image" href="/images/ev-vs-ice.jpg" />
      <link rel="preload" as="image" href="/images/hero-new-2.jpg" />
      <link rel="preload" as="image" href="/images/hero-new-3.png" />

      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {/* SECTION 1 — HERO (with background slideshow) */}
      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section 
        className="relative overflow-hidden pt-32 pb-16 md:pt-[160px] md:pb-[80px]" 
        style={{ 
          textAlign: 'center',
          minHeight: '100vh',
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
                DYU — EV Charging Infrastructure & EV Chargers in India
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
              DYU provides EV charging infrastructure and charging solutions
            </h1>

            {/* Tagline */}
            <div style={{ marginBottom: '24px', maxWidth: '850px', margin: '0 auto 24px' }}>
              <span style={{
                fontFamily: 'var(--font-figtree)',
                fontSize: 'clamp(11px, 1.4vw, 14px)',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.9)',
                textTransform: 'uppercase',
                lineHeight: 1.5,
                display: 'block'
              }}>
                AC EV Chargers | DC Fast Chargers | EV Charging Stations | EV Charging Network | Charging Software | Fleet Charging | Highway Charging.
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
              AC & DC EV Chargers from 7.4 kW to 360 kW
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
      </section>

      {/* ———————————————————————————————————————————————— */}
      {/* SECTION 2 — WORD REVEAL (cream) */}
      {/* ———————————————————————————————————————————————— */}
      <section 
        ref={wordRevealRef}
        className="section-light" 
        style={{ 
          borderTop: '1px solid var(--color-stone-mist)',
          backgroundColor: wordRevealActive ? '#001E2B' : 'var(--color-cream-paper)',
          color: wordRevealActive ? '#ffffff' : 'var(--color-midnight-ink)',
          transition: 'background-color 0.8s cubic-bezier(0.25, 1, 0.5, 1), color 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
        }}
      >
        <div className="container-wispr" style={{ maxWidth: '900px' }}>
          <WordReveal
            text="DYU is an Indian EV charging solutions company providing AC chargers, DC fast chargers, charging software, installation and EV charging infrastructure for businesses, fleets and public charging networks..."
            className=""
          />
          <style>{`
            .word-reveal-container {
              font-family: var(--font-figtree);
              font-size: clamp(24px, 6vw, 56px);
              font-weight: 400;
              line-height: 1.2;
              letter-spacing: -0.03em;
              color: inherit;
              text-align: justify;
            }
            .word-reveal-container .word.active {
              color: inherit !important;
            }
          `}</style>
        </div>
      </section>


      {/* ———————————————————————————————————————————————— */}
      {/* SECTION 4 — PRODUCTS (ScrollSplitCard) */}
      {/* ———————————————————————————————————————————————— */}
      <div className="w-full bg-white">
        <ScrollSplitCard
          imageSrc="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2832&auto=format&fit=crop"
          cards={[
            {
              title: "Home Charging",
              description: "DYU smart home EV chargers from 7.4kW to 22kW and portable chargers from 3.3kW to 7.4kW. Safe and efficient charging at home or office.",
              bgColor: "#002B36",
              textColor: "#FFFFFF",
              image: "/images/home-charging-split-1.jpg"
            },
            {
              title: "DC Fast Charging",
              description: "DYU DC Fast Chargers from 30kW to 360kW. Built for high-speed highway charging, commercial hubs, and fleets across India.",
              bgColor: "#002B36",
              textColor: "#FFFFFF",
              image: "/images/home-charging-split-2.jpg"
            },
            {
              title: "Public Network",
              description: "Find DYU chargers instantly via app. Real-time status, one-tap start, and seamless payment. Rapidly expanding network across India.",
              bgColor: "#002B36",
              textColor: "#FFFFFF",
              image: "/images/hero-new-2.jpg"
            }
          ]}
        />
      </div>

      {/* ———————————————————————————————————————————————— */}
      {/* SECTION 4 — RESOURCES (cream) */}
      {/* ———————————————————————————————————————————————— */}
      <section 
        ref={resourcesRef}
        className="section-light"
        style={{
          backgroundColor: resourcesActive ? '#001E2B' : 'var(--color-cream-paper)',
          color: resourcesActive ? '#ffffff' : 'var(--color-midnight-ink)',
          transition: 'background-color 0.8s cubic-bezier(0.25, 1, 0.5, 1), color 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
        }}
      >
        <div className="container-wispr">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="badge badge-outline" style={{ marginBottom: '24px', color: resourcesActive ? '#ffffff' : 'inherit', borderColor: resourcesActive ? 'rgba(255,255,255,0.4)' : 'inherit' }}>Resources</span>
              <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
                <span style={{ color: resourcesActive ? '#ffffff' : '#222222', transition: 'color 0.8s ease' }}>DYU EV Charging</span>
                <span style={{ color: resourcesActive ? '#ffffff' : '#222222', transition: 'color 0.8s ease' }} className="italic">Resources</span>
              </h2>
              <p style={{ fontFamily: 'var(--font-figtree)', fontSize: '16px', color: resourcesActive ? 'rgba(255, 255, 255, 0.7)' : 'var(--color-smoke)', lineHeight: 1.7, marginBottom: '32px', transition: 'color 0.8s ease' }}>
                Everything you need to evaluate, install, operate, and maintain DYU EV charging infrastructure.
              </p>

              {/* Numbered List */}
              <div className="flex flex-col gap-5 mb-8">
                {[
                  { num: 1, title: "EV Charger Datasheets", desc: "Technical specifications for DYU AC and DC EV chargers, including power output, connectors, input/output ratings, efficiency, protection, communication, dimensions, and operating conditions." },
                  { num: 2, title: "Installation Guides", desc: "Electrical, civil, mounting, cabling, earthing, protection, and commissioning requirements for DYU EV chargers." },
                  { num: 3, title: "EV Charging Guides", desc: "Practical guides covering AC vs. DC charging, CCS2, charging speeds, charger selection, electrical requirements, and EV charging infrastructure." },
                  { num: 4, title: "Technical Specifications", desc: "Detailed specifications for DYU's 7.4 kW–360 kW EV charging portfolio, organized by charger type and power rating." },
                  { num: 5, title: "OCPP & CMS Documentation", desc: "Information about connectivity, OCPP compatibility, charger management, remote monitoring, RFID, and software integration." }
                ].map((item) => (
                  <div key={item.num} className="flex gap-3 text-left">
                    <span style={{ 
                      fontFamily: 'var(--font-figtree)', 
                      fontSize: '15px', 
                      fontWeight: 800, 
                      color: resourcesActive ? '#ffffff' : 'var(--color-midnight-ink)', 
                      flexShrink: 0,
                      transition: 'color 0.8s ease'
                    }}>
                      {item.num}.
                    </span>
                    <div>
                      <strong style={{ 
                        fontFamily: 'var(--font-figtree)', 
                        fontSize: '15px', 
                        fontWeight: 700, 
                        color: resourcesActive ? '#ffffff' : 'var(--color-midnight-ink)', 
                        display: 'block', 
                        marginBottom: '2px',
                        transition: 'color 0.8s ease'
                      }}>
                        {item.title}
                      </strong>
                      <span style={{ 
                        fontFamily: 'var(--font-figtree)', 
                        fontSize: '14px', 
                        color: resourcesActive ? 'rgba(255, 255, 255, 0.7)' : 'var(--color-smoke)', 
                        lineHeight: 1.5, 
                        display: 'block',
                        transition: 'color 0.8s ease'
                      }}>
                        {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <LayeredStack className="w-full max-w-[920px] grid grid-cols-2 gap-3 p-0 md:gap-4 md:p-8">

              {/* Card 1 — EV Charger Datasheets */}
              <div className="relative overflow-hidden rounded-3xl aspect-[250/320] shadow-xl group">
                <img
                  src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=500&auto=format&fit=crop"
                  alt="EV Charger Datasheets"
                  className="object-cover w-full h-full opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <p style={{ color: '#ffffff' }} className="!text-white font-bold text-lg md:text-xl tracking-tight leading-tight">EV Charger Datasheets</p>
                </div>
              </div>

              {/* Card 2 — Installation Guides */}
              <div className="relative overflow-hidden rounded-3xl aspect-[250/320] shadow-xl group mt-12">
                <img
                  src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=500&auto=format&fit=crop"
                  alt="Installation Guides"
                  className="object-cover w-full h-full opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <p style={{ color: '#ffffff' }} className="!text-white font-bold text-lg md:text-xl tracking-tight leading-tight">Installation Guides</p>
                </div>
              </div>

              {/* Card 3 — EV Charging Guides */}
              <div className="relative overflow-hidden rounded-3xl aspect-[250/320] shadow-xl group">
                <img
                  src="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=500&auto=format&fit=crop"
                  alt="EV Charging Guides"
                  className="object-cover w-full h-full opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <p style={{ color: '#ffffff' }} className="!text-white font-bold text-lg md:text-xl tracking-tight leading-tight">EV Charging Guides</p>
                </div>
              </div>

              {/* Card 4 — Technical Specifications */}
              <div className="relative overflow-hidden rounded-3xl aspect-[250/320] shadow-xl group mt-12">
                <img
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=500&auto=format&fit=crop"
                  alt="Technical Specifications"
                  className="object-cover w-full h-full opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <p style={{ color: '#ffffff' }} className="!text-white font-bold text-lg md:text-xl tracking-tight leading-tight">Technical Specifications</p>
                </div>
              </div>

              {/* Card 5 — OCPP & CMS Documentation */}
              <div className="relative overflow-hidden rounded-3xl aspect-[250/320] shadow-xl group">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=500&auto=format&fit=crop"
                  alt="OCPP & CMS Documentation"
                  className="object-cover w-full h-full opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <p style={{ color: '#ffffff' }} className="!text-white font-bold text-lg md:text-xl tracking-tight leading-tight">OCPP & CMS Documentation</p>
                </div>
              </div>

            </LayeredStack>
          </div>
        </div>
      </section>

      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {/* SECTION 5 — PARTNER CTA (teal) */}
      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}


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
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  <Star size={16} fill="#FFB800" color="#FFB800" />
                  <Star size={16} fill="#FFB800" color="#FFB800" />
                  <Star size={16} fill="#FFB800" color="#FFB800" />
                  <Star size={16} fill="#FFB800" color="#FFB800" />
                  <Star size={16} fill="#FFB800" color="#FFB800" />
                </div>
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

