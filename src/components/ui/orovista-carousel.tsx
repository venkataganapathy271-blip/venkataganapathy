"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface OrovistaCarouselItem {
  id: string | number;
  src: string;
  patientName: string;
  age: string;
  condition: string;
  duration: string;
  quote: string;
  doctor: string;
  rating?: number;
}

interface OrovistaCarouselProps {
  items: OrovistaCarouselItem[];
  className?: string;
}

export function OrovistaCarousel({ items, className }: OrovistaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndEvent = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      slideRight();
    }
    if (isRightSwipe) {
      slideLeft();
    }
  };

  const slideLeft = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const slideRight = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      slideRight();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  if (!items.length) return null;

  const currentItem = items[currentIndex];

  return (
    <div 
      className={cn("w-full", className)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEndEvent}
    >
      <div className="bg-[#1a1a1a] rounded-[24px] sm:rounded-[40px] p-6 sm:p-10 flex flex-col md:flex-row gap-8 md:gap-12 overflow-hidden relative min-h-[500px] md:min-h-[450px]">
        {/* Left Side: Quote and Controls */}
        <div className="flex-1 flex flex-col justify-between z-10 relative">
          <div>
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#d4af37] text-[#d4af37]" />
              ))}
            </div>
            
            <div className="relative h-[200px] sm:h-[180px] md:h-[220px]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute inset-0"
                >
                  <p className="text-xl sm:text-2xl md:text-3xl text-white font-medium leading-relaxed font-serif">
                    "{currentItem.quote}"
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={slideLeft}
              className="w-12 h-12 rounded-full border border-neutral-700 flex items-center justify-center text-white hover:bg-neutral-800 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={slideRight}
              className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            
            <div className="flex gap-2 ml-4">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1);
                    setCurrentIndex(i);
                  }}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === currentIndex ? "w-6 bg-[#d4af37]" : "w-1.5 bg-neutral-600"
                  )}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Image and Details */}
        <div className="flex-1 relative rounded-[20px] overflow-hidden min-h-[300px] md:min-h-full">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute inset-0"
            >
              <div className="relative w-full h-full">
                <img
                  src={currentItem.src}
                  alt={currentItem.patientName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                  <h3 className="text-white text-2xl sm:text-3xl font-bold font-serif mb-1 uppercase tracking-wider">
                    {currentItem.patientName}
                  </h3>
                  <div className="flex items-center gap-3 text-neutral-300 text-sm font-medium tracking-widest uppercase">
                    <span>{currentItem.condition}</span>
                    <span className="w-1 h-1 rounded-full bg-[#d4af37]" />
                    <span>{currentItem.age}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
