"use client";

import { useEffect, useState } from "react";

export function MaintenanceGuard({ children }: { children: React.ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hostname = window.location.hostname;
    const search = window.location.search;
    const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
    const hasSecretKey = search.includes("preview=dyu2026") || search.includes("secret=dyu");
    const storedAuth = localStorage.getItem("dyu_preview_unlocked") === "true";

    if (isLocal || hasSecretKey || storedAuth) {
      if (hasSecretKey) {
        localStorage.setItem("dyu_preview_unlocked", "true");
      }
      setIsUnlocked(true);
    } else {
      setIsUnlocked(false);
    }
  }, []);

  if (isUnlocked === null) {
    return (
      <div className="fixed inset-0 z-[999999] bg-[#001E2B]" />
    );
  }

  if (isUnlocked) {
    return null; // Render nothing so site content below layout displays normally
  }

  return (
    <div className="fixed inset-0 z-[999999] bg-[#001E2B] text-white flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-5xl font-black font-['Gilroy'] tracking-tight text-white">DYU</div>
        <div className="w-16 h-1 bg-[#00F0FF] mx-auto rounded-full" />
        <h1 className="text-2xl md:text-3xl font-bold font-['Gilroy'] text-white">Website Temporarily Offline</h1>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
          DYU EV Charging network website is currently undergoing maintenance. We will be back online shortly.
        </p>
      </div>
    </div>
  );
}
