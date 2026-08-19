
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
  image?: string;
  onClick: () => void;
  isProduct?: boolean;
}

function MegaMenuItem({ label, desc, href, icon: Icon, image, onClick, isProduct }: MegaMenuItemProps) {
  return (
    <motion.div variants={itemVariants}>
      <Link 
        href={href} 
        onClick={onClick}
        className="flex gap-4 p-3 -m-3 rounded-xl hover:bg-[#f5f5f0] transition-colors duration-200 group items-center"
      >
        {image ? (
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <img src={image} alt={label} className="w-full h-full object-contain" />
          </div>
        ) : (
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--color-stone-mist)] flex items-center justify-center text-[var(--color-deep-forest-teal)] group-hover:bg-[var(--color-deep-forest-teal)] group-hover:text-white transition-colors duration-200">
            <Icon size={20} />
          </div>
        )}
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
  const [mobileSoftwareOpen, setMobileSoftwareOpen] = useState(true);
  const [mobileChargersOpen, setMobileChargersOpen] = useState(false);
  const [mobileDiscoverOpen, setMobileDiscoverOpen] = useState(false);
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
    { label: "EV Charging App", desc: "Find charging stations, pay, and monitor in real-time.", href: "/ev-charging-app", icon: Smartphone, image: "/images/3d-app-nav.png" },
    { label: "CSMS Platform", desc: "Enterprise management system for your charging network.", href: "/ev-charging-software/csms", icon: Monitor, image: "/images/3d-csms-nav.png" },
    { label: "EV Linq Roaming Hub", desc: "Interoperable roaming hub to connect with other networks.", href: "/ev-charging-software/evlinq", icon: Globe, image: "/images/3d-evlinq-nav.png" }
  ];

  const hardwareItems = [
    { label: "Level 2 (AC Chargers)", desc: "Reliable charging for homes, offices, and destinations.", href: "/ac-chargers", icon: BatteryCharging, image: "/images/3d-ac-nav.png" },
    { label: "Level 3 (DC Chargers)", desc: "Ultra-fast highway charging from 60kW to 360kW.", href: "/dc-chargers", icon: Zap, image: "/images/3d-dc-nav.png" },
    { label: "Portable Charger", desc: "Convenient, plug-and-play charging on the go.", href: "/products/portable-charger", icon: Cable, image: "/images/3d-portable-nav.png" },
    { label: "Advertise With Us", desc: "Smart charging integrated with advertising screens.", href: "/adwall", icon: Tv, image: "/images/3d-ad-nav.png" }
  ];

  const companyItems = [
    { label: "About DYU", desc: "Building the largest green energy network in India.", href: "/about-us", icon: Info },
    { label: "Contact Us", desc: "Get in touch with our support and sales teams.", href: "/contact-us", icon: PhoneCall }
  ];

  const resourceItems = [
    { label: "EV Calculator", desc: "Estimate your savings and charging times easily.", href: "/ev-calculator", icon: Calculator }
  ];

  const headerStyle = {
    background: scrolled ? 'rgba(0, 43, 54, 0.95)' : 'var(--color-white)',
    color: scrolled ? 'var(--color-white)' : 'var(--color-primary-text)',
    borderBottom: scrolled ? '1px solid rgba(0, 95, 115, 0.2)' : '1px solid var(--color-border-light)',
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
          {/* Logo (Gilroy style font) — Petrol Blue (#005F73) per spec */}
          <Link 
            href="/" 
            className="flex items-center gap-1.5 group" 
            onClick={() => { setActiveDropdown(null); setIsOpen(false); }}
            style={{ textDecoration: 'none' }}
          >
            <span 
              className="font-black text-3xl md:text-4xl uppercase tracking-tighter transition-colors duration-300"
              style={{
                color: scrolled ? '#FFFFFF' : '#005F73',
                fontFamily: '"Plus Jakarta Sans", "Gilroy", sans-serif',
                fontWeight: 900
              }}
            >
              DYU
            </span>

          </Link>

          {/* Center Links — Software / EV Chargers / Discover / Business With Us / FAQ */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => toggleDropdown('software')}
              className="flex items-center gap-1 text-[12px] font-medium py-1.5 px-3 rounded-lg cursor-pointer transition-colors duration-200"
              style={{
                color: activeDropdown === 'software' ? '#005F73' : 'inherit',
                background: activeDropdown === 'software' ? 'rgba(0, 95, 115, 0.1)' : 'transparent',
                fontWeight: activeDropdown === 'software' ? 700 : 500
              }}
            >
              Software
              <ChevronDown size={12} className={`transition-transform duration-200 ${activeDropdown === 'software' ? 'rotate-180 text-[#005F73]' : ''}`} />
            </button>

            <button
              onClick={() => toggleDropdown('chargers')}
              className="flex items-center gap-1 text-[12px] font-medium py-1.5 px-3 rounded-lg cursor-pointer transition-colors duration-200"
              style={{
                color: activeDropdown === 'chargers' ? '#005F73' : 'inherit',
                background: activeDropdown === 'chargers' ? 'rgba(0, 95, 115, 0.1)' : 'transparent',
                fontWeight: activeDropdown === 'chargers' ? 700 : 500
              }}
            >
              EV Chargers
              <ChevronDown size={12} className={`transition-transform duration-200 ${activeDropdown === 'chargers' ? 'rotate-180 text-[#005F73]' : ''}`} />
            </button>

            <button
              onClick={() => toggleDropdown('discover')}
              className="flex items-center gap-1 text-[12px] font-medium py-1.5 px-3 rounded-lg cursor-pointer transition-colors duration-200"
              style={{
                color: activeDropdown === 'discover' ? '#005F73' : 'inherit',
                background: activeDropdown === 'discover' ? 'rgba(0, 95, 115, 0.1)' : 'transparent',
                fontWeight: activeDropdown === 'discover' ? 700 : 500
              }}
            >
              Discover
              <ChevronDown size={12} className={`transition-transform duration-200 ${activeDropdown === 'discover' ? 'rotate-180 text-[#005F73]' : ''}`} />
            </button>

            <Link
              href="/ev-charging-station-franchise"
              className="text-[12px] font-medium py-1.5 px-3 rounded-lg transition-colors duration-200"
              style={{ color: 'inherit' }}
            >
              Business With Us
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
            <button 
              className="md:hidden flex items-center justify-center p-2 rounded-lg" 
              onClick={() => setIsOpen(!isOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MEGA MENU PANEL (Desktop) */}
        <AnimatePresence>
          {activeDropdown !== null && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-0 right-0 overflow-hidden border-b border-[var(--color-stone-mist)] z-50 hidden md:block"
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
                  className="w-full"
                >
                  {activeDropdown === 'software' ? (
                    <div>
                      <div className="text-[13px] font-bold text-[var(--color-graphite-veil)] uppercase tracking-wider mb-6" style={{ fontFamily: 'var(--font-figtree)' }}>
                        Software
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {softwareItems.map((item) => (
                          <MegaMenuItem key={item.label} {...item} isProduct onClick={() => setActiveDropdown(null)} />
                        ))}
                      </div>
                    </div>
                  ) : activeDropdown === 'chargers' ? (
                    <div>
                      <div className="text-[13px] font-bold text-[var(--color-graphite-veil)] uppercase tracking-wider mb-6" style={{ fontFamily: 'var(--font-figtree)' }}>
                        EV Chargers & Hardware
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {hardwareItems.map((item) => (
                          <MegaMenuItem key={item.label} {...item} isProduct onClick={() => setActiveDropdown(null)} />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-12 gap-8">
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
                    </div>
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
            className="fixed inset-0 bg-[#222222]/40 backdrop-blur-[10px] z-40 hidden md:block"
            onClick={() => setActiveDropdown(null)}
          />
        )}
      </AnimatePresence>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              background: '#ffffff',
              color: '#111111',
            }}
            className="fixed inset-0 top-[56px] z-[99999] pointer-events-auto flex flex-col gap-4 overflow-y-auto p-6 border-t border-[#e4e4d0] shadow-2xl"
          >
            {/* Direct Home Link */}
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between text-base font-bold pb-3 border-b border-[#e4e4d0] text-[#111111]"
            >
              <span>Home</span>
            </Link>

            {/* Software Collapsible Accordion */}
            <div className="border-b border-[#e4e4d0] pb-3">
              <button 
                onClick={() => setMobileSoftwareOpen(!mobileSoftwareOpen)}
                className="w-full flex items-center justify-between text-base font-bold text-[#111111] py-1 cursor-pointer"
              >
                <span>Software</span>
                <ChevronDown size={18} className={`transition-transform duration-200 ${mobileSoftwareOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileSoftwareOpen && (
                <div className="mt-3 flex flex-col gap-3 pl-2">
                  {softwareItems.map((item) => (
                    <Link key={item.label} href={item.href} onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-1.5 text-sm font-semibold text-[#111111]">
                      <div className="w-7 h-7 flex items-center justify-center shrink-0">
                        <img src={item.image} alt={item.label} className="w-full h-full object-contain" />
                      </div>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* EV Chargers Collapsible Accordion */}
            <div className="border-b border-[#e4e4d0] pb-3">
              <button 
                onClick={() => setMobileChargersOpen(!mobileChargersOpen)}
                className="w-full flex items-center justify-between text-base font-bold text-[#111111] py-1 cursor-pointer"
              >
                <span>EV Chargers</span>
                <ChevronDown size={18} className={`transition-transform duration-200 ${mobileChargersOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileChargersOpen && (
                <div className="mt-3 flex flex-col gap-3 pl-2">
                  {hardwareItems.map((item) => (
                    <Link key={item.label} href={item.href} onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-1.5 text-sm font-semibold text-[#111111]">
                      <div className="w-7 h-7 flex items-center justify-center shrink-0">
                        <img src={item.image} alt={item.label} className="w-full h-full object-contain" />
                      </div>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Discover Collapsible Accordion */}
            <div className="border-b border-[#e4e4d0] pb-3">
              <button 
                onClick={() => setMobileDiscoverOpen(!mobileDiscoverOpen)}
                className="w-full flex items-center justify-between text-base font-bold text-[#111111] py-1 cursor-pointer"
              >
                <span>Discover</span>
                <ChevronDown size={18} className={`transition-transform duration-200 ${mobileDiscoverOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileDiscoverOpen && (
                <div className="mt-3 flex flex-col gap-3 pl-2">
                  {companyItems.concat(resourceItems).map((item) => (
                    <Link key={item.label} href={item.href} onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-1 text-sm font-medium text-[#333333]">
                      <item.icon size={16} className="text-[var(--color-deep-forest-teal)]" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* FAQ Link */}
            <Link 
              href="/faq" 
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between text-base font-bold pb-3 border-b border-[#e4e4d0] text-[#111111]"
            >
              <span>FAQ</span>
              <ChevronRight size={16} />
            </Link>

            {/* Shop Link */}
            <Link 
              href="/shop" 
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between text-base font-bold pb-3 border-b border-[#e4e4d0] text-[#111111]"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-[var(--color-deep-forest-teal)]" />
                <span>Shop</span>
              </div>
              <ChevronRight size={16} />
            </Link>

            {/* Business With Us Action Button */}
            <div className="pt-2 flex flex-col gap-3">
              <Link 
                href="/ev-charging-station-franchise" 
                onClick={() => setIsOpen(false)}
                className="btn-primary w-full text-center justify-center py-3.5 text-base font-bold rounded-xl"
              >
                Business With Us →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

