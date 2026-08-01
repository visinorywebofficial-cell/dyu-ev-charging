"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

export interface TimelineEvent {
  date: string;
  title: string;
  subtitle?: string;
  description: string;
  icon?: React.ReactNode;
}

export interface ScrollTimelineProps {
  events: TimelineEvent[];
  cardAlignment?: "alternating" | "left" | "right";
  revealAnimation?: "fade" | "slide" | "scale";
  cardVariant?: "elevated" | "outlined" | "flat";
  progressIndicator?: boolean;
  dateFormat?: "badge" | "text";
  className?: string;
}

export function ScrollTimeline({
  events,
  cardAlignment = "alternating",
  revealAnimation = "fade",
  cardVariant = "elevated",
  progressIndicator = true,
  dateFormat = "badge",
  className,
}: ScrollTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 50%"],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const getAnimationVariants = (index: number, isRight: boolean) => {
    const delay = index * 0.1;
    switch (revealAnimation) {
      case "slide":
        return {
          hidden: { opacity: 0, x: isRight ? 50 : -50 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay } },
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.85 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay } },
        };
      case "fade":
      default:
        return {
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
        };
    }
  };

  const getCardStyle = () => {
    switch (cardVariant) {
      case "outlined":
        return "bg-white border-2 border-[#005F73]/20 shadow-none hover:border-[#005F73]/50";
      case "flat":
        return "bg-[#F8FBFC] border border-[#DDE6EA] shadow-none hover:bg-white";
      case "elevated":
      default:
        return "bg-white border border-[#DDE6EA] shadow-lg hover:shadow-xl hover:border-[#005F73]/30";
    }
  };

  return (
    <div ref={containerRef} className={cn("relative max-w-5xl mx-auto py-12 px-4", className)}>
      {/* Central or Side Timeline Line */}
      <div
        className={cn(
          "absolute top-0 bottom-0 w-[3px] bg-[#DDE6EA] z-0 rounded-full",
          cardAlignment === "left"
            ? "left-6 md:left-8"
            : cardAlignment === "right"
            ? "right-6 md:right-8"
            : "left-6 md:left-1/2 md:-translate-x-1/2"
        )}
      >
        {progressIndicator && (
          <motion.div
            style={{ height: progressHeight }}
            className="w-full bg-gradient-to-b from-[#005F73] via-[#0A9396] to-[#C97B3D] rounded-full origin-top"
          />
        )}
      </div>

      {/* Timeline Events Stack */}
      <div className="space-y-12 md:space-y-16 relative z-10">
        {events.map((event, index) => {
          const isEven = index % 2 === 0;
          const isRight = cardAlignment === "right" || (cardAlignment === "alternating" && !isEven);

          return (
            <div
              key={index}
              className={cn(
                "relative flex flex-col md:flex-row items-start md:items-center",
                cardAlignment === "left"
                  ? "pl-14 md:pl-20"
                  : cardAlignment === "right"
                  ? "pr-14 md:pr-20 justify-end"
                  : isRight
                  ? "pl-14 md:pl-0 md:flex-row-reverse"
                  : "pl-14 md:pl-0"
              )}
            >
              {/* Timeline Node Icon Indicator */}
              <div
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border-4 border-white bg-[#005F73] text-white flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-110",
                  cardAlignment === "left"
                    ? "left-1 md:left-3"
                    : cardAlignment === "right"
                    ? "right-1 md:right-3"
                    : "left-1 md:left-1/2 md:-translate-x-1/2"
                )}
              >
                {event.icon ? (
                  <span className="w-4 h-4 flex items-center justify-center">{event.icon}</span>
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#94D2BD]" />
                )}
              </div>

              {/* Event Card Container */}
              <div
                className={cn(
                  "w-full",
                  cardAlignment === "alternating" ? "md:w-1/2" : "w-full",
                  cardAlignment === "alternating" && (!isRight ? "md:pr-12" : "md:pl-12")
                )}
              >
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={getAnimationVariants(index, isRight)}
                >
                  <Card className={cn("transition-all duration-300 rounded-2xl overflow-hidden", getCardStyle())}>
                    <CardContent className="p-6 md:p-8">
                      {/* Date rendering */}
                      <div className="flex items-center justify-between gap-4 mb-3">
                        {dateFormat === "badge" ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#005F73]/10 text-[#005F73] border border-[#005F73]/20 tracking-wide font-['Plus_Jakarta_Sans']">
                            {event.date}
                          </span>
                        ) : (
                          <span className="text-sm font-bold text-[#C97B3D] tracking-wide font-['Plus_Jakarta_Sans']">
                            {event.date}
                          </span>
                        )}

                        {event.subtitle && (
                          <span className="text-xs font-semibold text-[#52606D] uppercase tracking-wider">
                            {event.subtitle}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-bold text-[#1F2933] font-['Plus_Jakarta_Sans'] mb-2 leading-snug">
                        {event.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm md:text-base text-[#52606D] font-['Inter'] leading-relaxed font-normal">
                        {event.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
