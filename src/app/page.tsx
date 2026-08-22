
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, Variants, AnimatePresence } from "framer-motion";
import { Zap, ShieldCheck, MapPin, Briefcase, Leaf, Globe, ArrowRight, ChevronRight, ChevronLeft, ChevronDown, Home, Star } from "lucide-react";
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

/* ── CUSTOM IMAGE CAROUSEL COMPONENT ── */
const carouselVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95
  })
};

interface CarouselImage {
  src: string;
  title: string;
}

const FAQS = [
  {
    q: "Why choose DYU EV chargers?",
    a: "DYU combines EV charging hardware, software and infrastructure support to provide a complete charging solution rather than just a standalone charger. Our portfolio covers AC charging, DC fast charging and higher-power charging solutions for different types of applications. We focus on reliability, ease of operation, scalability and suitability for the Indian market, helping businesses build charging infrastructure that can grow with their EV requirements."
  },
  {
    q: "What makes DYU different from other EV charger manufacturers?",
    a: "DYU takes a solution-oriented approach to EV charging. Instead of focusing only on the charger itself, we look at the entire charging ecosystem—from the right charger and electrical infrastructure to software, installation, commissioning and ongoing support. This gives businesses a single partner for their charging requirements and makes it easier to deploy, manage and scale their charging network as demand grows."
  },
  {
    q: "What EV charging solutions does DYU provide?",
    a: "DYU provides EV charging solutions for residential, commercial, fleet and public-charging applications. Our portfolio includes AC chargers, portable EV chargers, DC fast chargers, high-power DC charging systems, charging software and charging infrastructure solutions. Depending on the project, DYU can also support site assessment, installation, commissioning, network integration and after-sales service."
  },
  {
    q: "Where is DYU EV Chargers based?",
    a: "DYU is an India-focused EV charging company serving customers and businesses across India. Headquarters & registered-office Hyderabad, Telangana."
  },
  {
    q: "Who manufactures DYU EV chargers?",
    a: "DYU develops and supplies EV charging solutions under the DYU brand, working with qualified manufacturing and technology partners where required to deliver reliable charging products for the Indian market."
  },
  {
    q: "Are DYU EV chargers designed for Indian conditions?",
    a: "Yes. DYU's charging solutions are intended for the requirements of the Indian EV market, including commercial and public charging environments. Indian charging locations can experience high temperatures, dust, voltage fluctuations, monsoon conditions and demanding operating environments, so charger selection needs to take the site conditions and electrical infrastructure into account. DYU focuses on providing charging solutions that are practical for these operating conditions, while the exact environmental and electrical specifications depend on the individual charger model."
  },
  {
    q: "What industries and businesses does DYU serve?",
    a: "DYU serves businesses and organisations looking to install EV charging infrastructure across a range of applications. These include:\n\n• Public EV charging stations\n• Highways and highway amenities\n• Hotels and resorts\n• Restaurants and cafés\n• Shopping malls and commercial properties\n• Corporate offices and campuses\n• Apartment communities\n• Petrol and fuel stations\n• Fleet and logistics operators\n• Automotive dealerships\n• Parking operators\n• Retail and destination locations\n\nWhether the requirement is a single AC charger or a high-power DC charging station, the solution can be selected according to the site's traffic, vehicle mix, available electrical capacity and expected charging demand."
  },
  {
    q: "Why should businesses choose DYU for EV charging infrastructure?",
    a: "Businesses should choose DYU when they want more than simply purchasing an EV charger. DYU can bring together charging hardware, software, installation, commissioning and infrastructure support, allowing businesses to approach EV charging as a complete commercial solution. We also offer a range of charging capacities, from everyday AC charging to high-power DC fast charging, so businesses can start with what they need today and scale their charging infrastructure as EV adoption increases. Ultimately, our focus is to help businesses build reliable, scalable and commercially viable EV charging infrastructure without having to coordinate multiple technology providers for every part of the project."
  }
];

function ImageCarousel({ images }: { images: CarouselImage[] }) {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = Math.abs(page % images.length);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [page]);

  return (
    <div className="w-full bg-transparent flex flex-col items-center justify-center py-8 px-4 rounded-3xl overflow-hidden">
      <div className="relative flex items-center justify-center gap-4 md:gap-8 w-full max-w-[680px]">
        {/* Left Arrow */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(-1)}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-black/[0.04] hover:bg-black/[0.08] text-[#005F73] transition-all duration-200 cursor-pointer focus:outline-none shrink-0 shadow-sm border border-black/5"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        {/* Image Container */}
        <div className="relative w-full max-w-[500px] aspect-[3/2] rounded-[12px] overflow-hidden shadow-lg bg-white border border-black/5 shrink-0">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={page}
              src={images[imageIndex].src}
              custom={direction}
              variants={carouselVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 150, damping: 20, bounce: 0.3, duration: 0.8 },
                opacity: { duration: 0.25 },
                scale: { type: "spring", stiffness: 150, damping: 20, bounce: 0.3, duration: 0.8 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = offset.x;
                if (swipe < -50) {
                  paginate(1);
                } else if (swipe > 50) {
                  paginate(-1);
                }
              }}
              className="absolute inset-0 w-full h-full object-cover select-none cursor-grab active:cursor-grabbing rounded-[12px]"
            />
          </AnimatePresence>
        </div>

        {/* Right Arrow */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(1)}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-black/[0.04] hover:bg-black/[0.08] text-[#005F73] transition-all duration-200 cursor-pointer focus:outline-none shrink-0 shadow-sm border border-black/5"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Title */}
      <AnimatePresence mode="wait">
        <motion.div
          key={imageIndex}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="text-center text-lg md:text-xl font-bold text-[#005F73] mt-6 select-none"
        >
          {images[imageIndex].title}
        </motion.div>
      </AnimatePresence>

      {/* Counter */}
      <div className="text-center text-xs font-semibold tracking-wider text-gray-500 mt-2 select-none">
        {imageIndex + 1} / {images.length}
      </div>
    </div>
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
  const [activeChargerTab, setActiveChargerTab] = useState<'ac' | 'dc'>('ac');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [formExpanded, setFormExpanded] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleFormMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setFormExpanded(true);
  };

  const handleFormMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setFormExpanded(false);
    }, 250);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

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
      {/* SECTION 3 — AC & DC CHARGERS (TABBED) */}
      {/* ———————————————————————————————————————————————— */}
      <section className="py-20 bg-[#F8FBFC] relative z-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="badge badge-outline mb-6">Chargers</span>
            <h2 className="flex flex-col gap-1 mb-6 text-3xl md:text-5xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
              <span className="text-[#222222]">AC & DC Chargers</span>
              <span className="text-[#888888] font-bold">EV Chargers</span>
            </h2>
            <p className="text-lg md:text-xl text-[#666666] font-bold max-w-3xl mx-auto">
              Explore our high-performance AC and DC charging solutions.
            </p>
          </div>

          {/* TAB SELECTOR BUTTONS */}
          <div className="flex justify-center items-center gap-6 md:gap-16 mb-12 border-b border-gray-300/80 pb-4 flex-wrap">
            <button
              onClick={() => setActiveChargerTab('ac')}
              className={`text-xl md:text-3xl font-extrabold font-['Gilroy'] tracking-tight pb-3 transition-all relative ${
                activeChargerTab === 'ac' ? 'text-[#222222]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              AC Chargers
              {activeChargerTab === 'ac' && (
                <motion.div layoutId="activeChargerTabUnderline" className="absolute bottom-0 left-0 right-0 h-1 bg-[#005F73] rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveChargerTab('dc')}
              className={`text-xl md:text-3xl font-extrabold font-['Gilroy'] tracking-tight pb-3 transition-all relative ${
                activeChargerTab === 'dc' ? 'text-[#222222]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              DC Chargers
              {activeChargerTab === 'dc' && (
                <motion.div layoutId="activeChargerTabUnderline" className="absolute bottom-0 left-0 right-0 h-1 bg-[#005F73] rounded-full" />
              )}
            </button>
          </div>

          {/* TAB CONTENT PANEL */}
          <AnimatePresence mode="wait">
            {activeChargerTab === 'ac' ? (
              <motion.div 
                key="ac"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-8 max-w-5xl mx-auto"
              >
                <ImageCarousel 
                  images={[
                    { src: '/images/ac_7_4kw.webp', title: 'AC Charger 7.7 kW' },
                    { src: '/images/ac_11kw.webp', title: 'AC Charger 11 kW' },
                    { src: '/images/ac_22kw.webp', title: 'AC Charger 22 kW' }
                  ]} 
                />
              </motion.div>
            ) : (
              <motion.div 
                key="dc"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-8 max-w-5xl mx-auto"
              >
                <ImageCarousel 
                  images={[
                    { src: '/images/dc_30kw.webp', title: 'DC Fast Charger 30 kW' },
                    { src: '/images/dc_60kw.webp', title: 'DC Fast Charger 60 kW' },
                    { src: '/images/dc_120kw.webp', title: 'DC Fast Charger 120 kW' },
                    { src: '/images/dc_180kw.webp', title: 'DC Fast Charger 180 kW' },
                    { src: '/images/dc_240kw.webp', title: 'DC Fast Charger 240 kW' },
                    { src: '/images/dc_360kw.webp', title: 'DC Fast Charger 360 kW' }
                  ]} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
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

      {/* ———————————————————————————————————————————————— */}
      {/* SECTION 7 — FAQs */}
      {/* ———————————————————————————————————————————————— */}
      <section className="py-20 md:py-32 bg-white border-t border-[#005F73]/10">
        <div className="container-wispr max-w-4xl mx-auto px-6">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span className="badge badge-outline" style={{ marginBottom: '16px' }}>FAQs</span>
            <h2 className="flex flex-col gap-1 text-3xl md:text-4xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.1]">
              <span className="text-[#222222]">Frequently Asked</span>
              <span className="text-[#888888] italic">Questions</span>
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index} 
                  className="border-b border-[#005F73]/10 pb-4 transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left py-4 focus:outline-none group cursor-pointer"
                  >
                    <span className="text-base md:text-lg font-bold text-gray-800 group-hover:text-[#005F73] transition-colors duration-200">
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="ml-4 shrink-0 text-gray-500 group-hover:text-[#005F73]"
                    >
                      <ChevronDown size={20} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed pt-2 pb-4 whitespace-pre-line font-medium">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-28 md:py-44 bg-[var(--color-cream-paper)] border-t border-[#005F73]/10">
        <div className="container-wispr max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left info column */}
          <div 
            className="lg:col-span-5 flex flex-col justify-center cursor-pointer select-none"
            onMouseEnter={handleFormMouseEnter}
            onMouseLeave={handleFormMouseLeave}
            onClick={() => setFormExpanded(true)}
          >
            <span className="badge badge-outline" style={{ marginBottom: '20px', display: 'inline-block' }}>Get in touch</span>
            <h2 className="flex flex-col gap-2 text-4xl md:text-6xl font-['Gilroy'] font-extrabold tracking-tighter leading-[1.05]">
              <span className="text-[#222222]">Let's build the</span>
              <span className="text-[#888888]">future together.</span>
            </h2>
          </div>

          {/* Right form card column */}
          <div className="lg:col-span-7">
            <form 
              className={`form-uiverse ${formExpanded ? 'expanded' : ''}`}
              onMouseEnter={handleFormMouseEnter}
              onMouseLeave={handleFormMouseLeave}
              onSubmit={(e) => { 
                e.preventDefault(); 
                alert('Request submitted successfully! Our team will contact you soon.'); 
              }}
            >
              <label>
                <span>Full Name *</span>
                <input 
                  type="text" 
                  required 
                  placeholder="Enter Name" 
                />
              </label>

              <label>
                <span>Email *</span>
                <input 
                  type="email" 
                  required 
                  placeholder="Enter Email" 
                />
              </label>

              <label>
                <span>Mobile Number *</span>
                <input 
                  type="tel" 
                  required 
                  pattern="[0-9]{10}" 
                  maxLength={10} 
                  placeholder="Enter 10-digit number" 
                />
              </label>

              <label>
                <span>Your Message</span>
                <textarea 
                  placeholder="Tell us about your requirement..." 
                  rows={2}
                  className="resize-none"
                ></textarea>
              </label>

              <div className="submitCard">
                <button type="submit">
                  Submit Details
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}

