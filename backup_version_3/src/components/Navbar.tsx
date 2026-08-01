
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

