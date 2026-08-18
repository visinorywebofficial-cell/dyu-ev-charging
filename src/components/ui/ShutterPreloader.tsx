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
    }, 2200);

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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999999,
          }}
        >
          <div className="flex flex-col items-center gap-2" style={{ color: "#FFFFFF" }}>
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
                letterSpacing: "0.2em",
                paddingLeft: "0.2em", // Center offset adjustment for letter spacing
                lineHeight: 1,
                color: "#FFFFFF",
                textAlign: "center"
              }}
            >
              DYU
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.2, ease: "easeOut" }
              }}
              exit={{
                opacity: 0,
                y: -20,
                transition: { duration: 0.5, ease: "easeIn" }
              }}
              style={{
                fontFamily: '"Plus Jakarta Sans", "Gilroy", sans-serif',
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "0.4em",
                paddingLeft: "0.4em", // Center offset adjustment for letter spacing
                color: "rgba(255, 255, 255, 0.75)",
                textTransform: "uppercase",
                textAlign: "center",
                marginTop: "8px"
              }}
            >
              POWER, DELIVERED.
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
