
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

