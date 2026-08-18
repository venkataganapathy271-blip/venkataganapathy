"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Star, CheckCircle2, Quote } from "lucide-react";

export interface TestimonialItem {
  id: string | number;
  title: string;
  condition: string;
  duration: string;
  quote: string;
  patientName: string;
  age: string;
  doctor: string;
  image: string;
  rating?: number;
}

interface TestimonialsCardProps {
  items: TestimonialItem[];
  className?: string;
  width?: number;
  showNavigation?: boolean;
  showCounter?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function TestimonialsCard({
  items,
  className = "",
  width = 900,
  showNavigation = true,
  showCounter = true,
  autoPlay = true,
  autoPlayInterval = 4500,
}: TestimonialsCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const activeItem = items[activeIndex];

  // Pre-calculate rotations for visual variety
  const rotations = useMemo(() => [4, -2, -9, 7], []);

  // Auto-play effect
  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;

    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, items.length]);

  const handleNext = () => {
    if (activeIndex < items.length - 1) {
      setDirection(1);
      setActiveIndex(activeIndex + 1);
    } else {
      setDirection(1);
      setActiveIndex(0);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setDirection(-1);
      setActiveIndex(activeIndex - 1);
    } else {
      setDirection(-1);
      setActiveIndex(items.length - 1);
    }
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={`w-full max-w-5xl mx-auto bg-[#FAFAFE] border border-slate-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 ${className}`}>
      <div
        className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full"
        style={{ perspective: "1400px" }}
      >
        
        {/* Left Column: Image Card Stack (3D Perspective Rotations & Motion Animations) */}
        <div className="md:col-span-5 relative w-full aspect-4/3 sm:aspect-square">
          <AnimatePresence custom={direction}>
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              const offset = index - activeIndex;

              return (
                <motion.div
                  key={item.id}
                  className="absolute inset-0 w-full h-full overflow-hidden bg-[#FAFAFE] border border-slate-200 rounded-2xl sm:rounded-3xl"
                  initial={{
                    x: offset * 15,
                    y: Math.abs(offset) * 6,
                    z: -150 * Math.abs(offset),
                    scale: 0.85 - Math.abs(offset) * 0.04,
                    rotateZ: rotations[index % 4],
                    opacity: isActive ? 1 : 0.5,
                    zIndex: 10 - Math.abs(offset),
                  }}
                  animate={
                    isActive
                      ? {
                          x: [offset * 15, direction === 1 ? -180 : 180, 0],
                          y: [Math.abs(offset) * 6, 0, 0],
                          z: [-200, 150, 250],
                          scale: [0.85, 1.05, 1],
                          rotateZ: [rotations[index % 4], -3, 0],
                          opacity: 1,
                          zIndex: 100,
                        }
                      : {
                          x: offset * 15,
                          y: Math.abs(offset) * 6,
                          z: -150 * Math.abs(offset),
                          rotateZ: rotations[index % 4],
                          scale: 0.85 - Math.abs(offset) * 0.04,
                          opacity: 0.55,
                          zIndex: 10 - Math.abs(offset),
                        }
                  }
                  exit={{
                    x: direction === 1 ? -220 : 220,
                    z: -260,
                    scale: 0.75,
                    rotateZ: direction === 1 ? -10 : 10,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.75,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center"
                    draggable={false}
                  />

                  {/* Duration Tag */}
                  <span className="absolute top-3.5 left-3.5 px-3 py-1 bg-[#EBF5EA] text-[#588356] text-[10px] font-black uppercase rounded-full border border-[#A8D0A6]/60">
                    {item.duration}
                  </span>

                  {/* Rating Badge */}
                  <div className="absolute top-3.5 right-3.5 px-2.5 py-0.5 bg-white text-slate-900 border border-slate-200 text-[10px] font-extrabold rounded-full flex items-center">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500 mr-1" />
                    <span>{item.rating || 5.0}</span>
                  </div>

                  {/* Bottom Condition Banner Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-3.5 bg-gradient-to-t from-slate-950/70 to-transparent text-white">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-200 block truncate">
                      {item.condition}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Right Column: Featured Patient Quote Box & Information */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-5">
          
          {/* Top Info Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-[#588356] bg-[#EBF5EA] px-2.5 py-1 rounded-lg border border-[#A8D0A6]/50">
                0{activeIndex + 1} / 0{items.length}
              </span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                RECOVERY STORY
              </span>
            </div>

            <span className="text-[10px] font-extrabold text-[#588356] bg-[#EBF5EA] px-3 py-1 rounded-full border border-[#A8D0A6]/60 flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-[#588356]" /> 100% Non-Surgical
            </span>
          </div>

          {/* Featured Patient Quote Box */}
          <div className="bg-[#EBF5EA]/30 border border-[#A8D0A6]/50 rounded-2xl p-5 sm:p-6 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="space-y-4"
              >
                {/* Condition Tag */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-[#588356]">
                    Condition: {activeItem.condition}
                  </span>
                  <Quote className="w-6 h-6 text-[#A8D0A6]/70 shrink-0" />
                </div>

                {/* Patient Quote */}
                <p className="text-sm sm:text-base text-slate-800 font-serif italic leading-relaxed">
                  "{activeItem.quote}"
                </p>

                {/* Patient & Doctor Footer Info */}
                <div className="pt-3 border-t border-[#A8D0A6]/40 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-black text-slate-900">
                      {activeItem.patientName} <span className="text-xs font-normal text-slate-500">({activeItem.age})</span>
                    </h4>
                    <p className="text-xs text-slate-600 font-medium mt-0.5">
                      Treated by: <strong className="text-[#588356]">{activeItem.doctor}</strong>
                    </p>
                  </div>

                  <span className="text-[11px] text-[#588356] font-extrabold flex items-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-[#588356]" /> Verified Outcome
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls Bar */}
          {showNavigation && items.length > 1 && (
            <div className="flex items-center justify-between pt-1">
              {/* Slide Dots Indicator */}
              <div className="flex items-center space-x-1.5">
                {items.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === activeIndex ? "w-6 bg-[#588356]" : "w-2 bg-slate-200"
                    }`}
                  />
                ))}
              </div>

              {/* Prev / Next Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrev}
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-[#A8D0A6] bg-[#EBF5EA] text-[#588356] hover:bg-[#d8edd6] transition-all cursor-pointer"
                  aria-label="Previous card"
                >
                  <ArrowLeft className="w-4 h-4 text-[#588356]" />
                </button>
                <button
                  onClick={handleNext}
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-[#A8D0A6] bg-[#EBF5EA] text-[#588356] hover:bg-[#d8edd6] transition-all cursor-pointer"
                  aria-label="Next card"
                >
                  <ArrowRight className="w-4 h-4 text-[#588356]" />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default TestimonialsCard;
