"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ShutterPreloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Disable scroll on mount
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "";
    }, 2000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 1.0,
              ease: [0.76, 0, 0.24, 1], // Premium cubic-bezier transition curve
            }
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#001E2B", // Brand Petrol Blue background
            color: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999999,
          }}
        >
          <div className="flex flex-col items-center gap-4">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" }
              }}
              exit={{
                opacity: 0,
                y: -30,
                transition: { duration: 0.5, ease: "easeIn" }
              }}
              style={{
                fontFamily: '"Plus Jakarta Sans", "Gilroy", sans-serif',
                fontWeight: 900,
                fontSize: "4.5rem",
                letterSpacing: "-0.05em",
                lineHeight: 1
              }}
            >
              DYU
            </motion.span>
            
            {/* Smooth loading indicator line */}
            <div style={{ width: "80px", height: "1px", backgroundColor: "rgba(255,255,255,0.15)", position: "relative", overflow: "hidden" }}>
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  ease: "easeInOut"
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  width: "50%",
                  height: "100%",
                  backgroundColor: "#005F73"
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
