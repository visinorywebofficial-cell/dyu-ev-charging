
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { cn } from "@/lib/utils";

import { MaintenanceGuard } from "@/components/MaintenanceGuard";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#001E2B",
};

export const metadata: Metadata = {
  title: "DYU | Power, Delivered. — EV Charging Network India",
  description: "Building India's most reliable EV charging network — one station at a time. High-speed DC fast chargers, AC chargers & CSMS software.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(plusJakarta.variable, inter.variable, "antialiased")}>
      <body
        suppressHydrationWarning
        style={{
          backgroundColor: '#ffffff',
          color: 'var(--color-midnight-ink)',
          fontFamily: 'var(--font-body)',
        }}
        className="min-h-full flex flex-col relative"
      >
        {/* PRIVATE MAINTENANCE GUARD (unlocked on laptop/secret key, offline for everyone else) */}
        <MaintenanceGuard />

        {/* Announcement Banner — Petrol Blue / Deep Ocean */}
        <div className="announcement-banner">
          ⚡ DYU is expanding across India — Secure your EV charging franchise location today →
        </div>

        <Navbar />

        <SmoothScrollProvider>
          <main className="flex-1">
            {children}
          </main>
        </SmoothScrollProvider>

        {/* FOOTER — Deep Ocean bg (#002B36), Light text */}
        <footer style={{ backgroundColor: '#002B36', borderTop: 'none', position: 'relative', zIndex: 20 }} className="py-20">
          <div className="container-wispr">
            {/* Top row */}
            <div className="flex flex-col md:flex-row items-start justify-between gap-12 md:gap-16 pb-16" style={{ borderBottom: '1px solid #1a3e49' }}>
              
              {/* Left Side: Navigation Links */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12 order-2 md:order-1">
                {[
                  { heading: 'Solutions', links: [{ name: 'Mobile App', href: '/ev-charging-app' }, { name: 'CSMS', href: '/ev-charging-software/csms' }, { name: 'EVlinq', href: '/ev-charging-software/evlinq' }] },
                  { heading: 'Products', links: [{ name: 'Level 3 (DC Chargers)', href: '/dc-chargers' }, { name: 'Level 2 (AC Chargers)', href: '/ac-chargers' }, { name: 'Advertise With Us', href: '/adwall' }, { name: 'Portable Charger', href: '/products/portable-charger' }] },
                  { heading: 'Discover', links: [{ name: 'EV Calculator', href: '/ev-calculator' }, { name: 'Franchise', href: '/ev-charging-station-franchise' }, { name: 'Partner With Us', href: '/partner-with-us' }] },
                  { heading: 'Company', links: [{ name: 'About Us', href: '/about-us' }, { name: 'Contact Us', href: '/contact-us' }] },
                ].map((col) => (
                  <div key={col.heading}>
                    <p style={{ fontFamily: 'var(--font-figtree)', fontSize: '12px', fontWeight: 700, color: '#737373', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
                      {col.heading}
                    </p>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {col.links.map((link) => (
                        <li key={link.name}>
                          <a href={link.href} className="footer-link hover:text-white transition-colors" style={{ color: '#a3a3a3' }}>
                            {link.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Right Side: Brand, Download App Badges & Registered HQ Address Box */}
              <div className="flex flex-col gap-6 max-w-sm order-1 md:order-2">
                <div className="flex flex-col gap-1">
                  <div style={{ fontFamily: '"Gilroy", sans-serif', fontSize: '36px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1 }}>
                    DYU
                  </div>
                  <div style={{ fontFamily: 'var(--font-figtree)', fontSize: '13px', fontWeight: 700, color: '#e5e5e5', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                    Power, Delivered.
                  </div>
                </div>
                <p style={{ fontFamily: 'var(--font-figtree)', fontSize: '14px', color: '#a3a3a3', lineHeight: 1.5 }}>
                  Building India's most reliable EV charging network — one station at a time.
                </p>

                {/* Download App Section with Blinkit Style Badges */}
                <div className="flex flex-col gap-3 pt-1">
                  <p style={{ fontFamily: 'var(--font-figtree)', fontSize: '12px', fontWeight: 700, color: '#737373', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Download App
                  </p>
                  <div className="flex flex-wrap gap-3 items-center">
                    {/* App Store Button */}
                    <a 
                      href="#" 
                      className="flex items-center gap-2.5 px-4 py-2.5 bg-[#111111] hover:bg-[#000000] border border-white/15 rounded-xl transition-all shadow-md group"
                    >
                      <svg className="w-6 h-6 fill-white shrink-0" viewBox="0 0 384 512">
                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-91.9-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.1 26.1 2 52.3-13.7 69.5-33.5z"/>
                      </svg>
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] text-gray-400 font-medium leading-none">Download on the</span>
                        <span className="text-sm font-bold text-white leading-tight font-sans">App Store</span>
                      </div>
                    </a>

                    {/* Play Store Button */}
                    <a 
                      href="#" 
                      className="flex items-center gap-2.5 px-4 py-2.5 bg-[#111111] hover:bg-[#000000] border border-white/15 rounded-xl transition-all shadow-md group"
                    >
                      <svg className="w-5 h-5 shrink-0" viewBox="0 0 512 512">
                        <path fill="#410593" d="M7.4 34.9C2.7 40.1 0 48.3 0 58.8v394.4c0 10.5 2.7 18.7 7.4 23.9l1.2 1.2L235 251.9V249.6L8.6 33.7l-1.2 1.2z"/>
                        <path fill="#04b8ff" d="M312.3 329.2l-77.3-77.3v-2.3l77.3-77.3 1.7 1 91.6 52.1c26.1 14.8 26.1 39.1 0 53.9l-91.6 52-1.7 .9z"/>
                        <path fill="#ff1f3b" d="M236.2 250.7L8.6 478.3c8.6 9.1 22.8 10.3 38.6 1.3l265.1-150.4-76.1-78.5z"/>
                        <path fill="#167946" d="M236.2 250.7l76.1-78.5L47.2 21.8C31.4 12.8 17.2 14 8.6 23.1l227.6 227.6z"/>
                      </svg>
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] text-gray-400 font-medium leading-none">GET IT ON</span>
                        <span className="text-sm font-bold text-white leading-tight font-sans">Google Play</span>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Contact Card Box */}
                <div className="bg-[#001F27] border border-white/10 rounded-2xl p-5 mt-2 flex flex-col gap-2.5 shadow-lg">
                  <div className="flex flex-col gap-1 text-xs text-gray-400 font-medium">
                    <p><strong className="text-gray-200">Phone:</strong> +91 99490 55516</p>
                    <p><strong className="text-gray-200">Email:</strong> sayhi@dyu.co.in</p>
                    <p><strong className="text-gray-200">Working Hours:</strong> 10am to 6pm</p>
                  </div>
                </div>

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

