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
  { name: "Rohit M", location: "Hyderabad", date: "26 Oct 2025", rating: 5, text: "Build quality is excellent and charging has been smooth. The DYU app makes it super easy to manage everything remotely." },
  { name: "Ananya R", location: "Vijayawada", date: "14 Jan 2026", rating: 5, text: "Extremely reliable charger! Fast delivery and great customer support. Highly recommended for EV owners." },
  { name: "Sanjay B", location: "Secunderabad", date: "02 Mar 2026", rating: 5, text: "Great backup charger and especially useful for people who travel frequently. Highly recommended for peace of mind while traveling." },
  { name: "Sudarshan", location: "Bangalore", date: "26 Mar 2026", rating: 5, text: "Excellent portable charger with adjustable amperage from 6A to 16A. This helps in balancing the battery pack perfectly." },
];

function StarRating({ count }: { count: number }) {
  return (
    <span style={{ display: "inline-flex", gap: "2px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          fill={i < count ? "#FFB800" : "none"}
          color={i < count ? "#FFB800" : "#D1D5DB"}
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
