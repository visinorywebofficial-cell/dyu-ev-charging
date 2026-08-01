"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CoolThemeToggleProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function CoolThemeToggle({
  size = "md",
  className,
}: CoolThemeToggleProps) {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const hasDarkClass = document.documentElement.classList.contains("dark");
    const storedTheme = localStorage.getItem("dyu-theme");
    if (storedTheme === "dark" || (!storedTheme && hasDarkClass)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dyu-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("dyu-theme", "light");
    }
  };

  if (!mounted) {
    return (
      <div
        className={cn(
          "rounded-full bg-[#005F73]/10 border border-[#005F73]/20 opacity-0",
          size === "sm" ? "w-12 h-6" : size === "lg" ? "w-20 h-10" : "w-16 h-8",
          className
        )}
      />
    );
  }

  const dimensions = {
    sm: { track: "w-12 h-6 p-0.5", thumb: "w-5 h-5", icon: 12, translate: 24 },
    md: { track: "w-16 h-8 p-1", thumb: "w-6 h-6", icon: 14, translate: 32 },
    lg: { track: "w-20 h-10 p-1", thumb: "w-8 h-8", icon: 18, translate: 40 },
  }[size];

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle Night Mode"
      title={isDark ? "Switch to Light Mode" : "Switch to Night Mode"}
      className={cn(
        "relative flex items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#005F73] shadow-inner cursor-pointer",
        dimensions.track,
        isDark
          ? "bg-[#11262E] border border-[#264653]"
          : "bg-[#F8FBFC] border border-[#DDE6EA]",
        className
      )}
    >
      {/* Background Icons */}
      <span className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none text-xs">
        <Sun
          size={dimensions.icon}
          className={cn(
            "transition-opacity duration-200",
            isDark ? "opacity-30 text-[#F5F7FA]" : "opacity-0"
          )}
        />
        <Moon
          size={dimensions.icon}
          className={cn(
            "transition-opacity duration-200",
            !isDark ? "opacity-30 text-[#005F73]" : "opacity-0"
          )}
        />
      </span>

      {/* Animated Sliding Thumb */}
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        animate={{ x: isDark ? dimensions.translate : 0 }}
        className={cn(
          "relative z-10 flex items-center justify-center rounded-full shadow-md transition-colors duration-200",
          dimensions.thumb,
          isDark
            ? "bg-[#0A9396] text-[#0A1920]"
            : "bg-[#005F73] text-white"
        )}
      >
        {isDark ? (
          <Moon size={dimensions.icon} className="stroke-[2.5]" />
        ) : (
          <Sun size={dimensions.icon} className="stroke-[2.5]" />
        )}
      </motion.span>
    </button>
  );
}

export function CoolThemeToggleDemo() {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <CoolThemeToggle size="lg" />
    </div>
  );
}
