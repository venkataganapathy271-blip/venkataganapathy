"use client";

import * as React from "react";
import { motion, type Transition } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DiagonalCarouselItem {
  id: string | number;
  src: string;
  title: string;
  patientName: string;
  age: string;
  condition: string;
  duration: string;
  quote: string;
  doctor: string;
  rating?: number;
  alt?: string;
}

export interface DiagonalCarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: DiagonalCarouselItem[];
  activeIndex?: number;
  defaultActiveIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  loop?: boolean;
  slideSize?: number;
  rotationStep?: number;
  verticalStep?: number;
  inactiveScale?: number;
  transition?: Transition;
  showControls?: boolean;
  showDots?: boolean;
  viewportClassName?: string;
  slideClassName?: string;
  imageClassName?: string;
  labelClassName?: string;
  controlsClassName?: string;
}

const DEFAULT_TRANSITION: Transition = {
  type: "spring",
  bounce: 0.16,
  duration: 0.85,
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function DiagonalCarousel({
  items,
  activeIndex,
  defaultActiveIndex = 1,
  onActiveIndexChange,
  loop = true,
  slideSize = 380,
  rotationStep = 18,
  verticalStep = 35,
  inactiveScale = 0.82,
  transition = DEFAULT_TRANSITION,
  showControls = true,
  showDots = true,
  viewportClassName,
  slideClassName,
  imageClassName,
  labelClassName,
  controlsClassName,
  className,
  onKeyDown,
  tabIndex,
  ...props
}: DiagonalCarouselProps) {
  const maxIndex = Math.max(0, items.length - 1);
  const [uncontrolledIndex, setUncontrolledIndex] = React.useState(() =>
    clamp(defaultActiveIndex, 0, maxIndex)
  );
  const currentIndex = clamp(activeIndex ?? uncontrolledIndex, 0, maxIndex);
  const safeSlideSize = Math.max(120, slideSize);
  const safeInactiveScale = clamp(inactiveScale, 0.35, 1);

  // Touch swipe handlers
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);

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

    if (isLeftSwipe && (loop || currentIndex < maxIndex)) {
      selectSlide(currentIndex + 1);
    }
    if (isRightSwipe && (loop || currentIndex > 0)) {
      selectSlide(currentIndex - 1);
    }
  };

  const selectSlide = React.useCallback(
    (nextIndex: number) => {
      if (!items.length) {
        return;
      }

      const resolvedIndex = loop
        ? (nextIndex + items.length) % items.length
        : clamp(nextIndex, 0, maxIndex);

      if (activeIndex === undefined) {
        setUncontrolledIndex(resolvedIndex);
      }

      onActiveIndexChange?.(resolvedIndex);
    },
    [activeIndex, items.length, loop, maxIndex, onActiveIndexChange]
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectSlide(currentIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectSlide(currentIndex + 1);
    }
  };

  if (!items.length) {
    return null;
  }

  const isPreviousDisabled = !loop && currentIndex === 0;
  const isNextDisabled = !loop && currentIndex === maxIndex;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Diagonal image carousel"
      tabIndex={tabIndex ?? 0}
      onKeyDown={handleKeyDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEndEvent}
      className={cn("relative isolate h-[520px] sm:h-[540px] w-full overflow-hidden", className)}
      {...props}
    >
      <div className={cn("absolute inset-0 overflow-hidden", viewportClassName)}>
        <motion.div
          className="absolute left-1/2 top-[12%] flex w-fit"
          animate={{ x: -(currentIndex * safeSlideSize + safeSlideSize / 2) }}
          transition={transition}
        >
          {items.map((item, index) => {
            const isActive = currentIndex === index;
            const distance = index - currentIndex;

            return (
              <motion.div
                key={`${item.id}-${index}`}
                className={cn(
                  "flex shrink-0 flex-col items-center gap-2 will-change-transform",
                  slideClassName
                )}
                style={{ width: safeSlideSize }}
                animate={{
                  rotate: distance * rotationStep,
                  scale: isActive ? 1 : safeInactiveScale,
                  y: distance * verticalStep,
                  opacity: Math.abs(distance) > 2 ? 0.3 : isActive ? 1 : 0.75,
                }}
                transition={transition}
              >
                {/* Testimonial Card Slide Frame */}
                <div
                  onClick={() => selectSlide(index)}
                  className={`w-full h-[400px] cursor-pointer rounded-3xl overflow-hidden border flex flex-col justify-between transition-all duration-300 ${
                    isActive
                      ? "border-slate-300 bg-[#FAFAFE] text-slate-900"
                      : "border-slate-200 bg-[#FAFAFE] text-slate-700 opacity-80"
                  }`}
                >
                  {/* Photo Header */}
                  <div className="relative h-40 sm:h-44 w-full overflow-hidden bg-slate-100 border-b border-slate-200 shrink-0">
                    <img
                      src={item.src}
                      alt={item.title}
                      draggable={false}
                      className="w-full h-full object-cover object-center select-none"
                    />

                    {/* Duration Tag */}
                    <span className="absolute top-3 left-3 px-3 py-1 bg-[#EBF5EA] text-[#588356] text-[10px] font-black uppercase rounded-full border border-[#A8D0A6]/60">
                      {item.duration}
                    </span>

                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 px-2.5 py-0.5 bg-[#FAFAFE] text-slate-900 border border-slate-200 text-[10px] font-extrabold rounded-full flex items-center">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500 mr-1" />
                      <span>{item.rating || 5.0}</span>
                    </div>
                  </div>

                  {/* Card Body: Quote & Patient Details */}
                  <div className="p-5 flex flex-col justify-between flex-1 bg-[#FAFAFE] space-y-3">
                    <span className="text-[10px] font-extrabold uppercase text-[#588356] block truncate">
                      Condition: {item.condition}
                    </span>

                    <p className="text-xs text-slate-700 font-medium italic leading-relaxed line-clamp-4">
                      "{item.quote}"
                    </p>

                    <div className="pt-2.5 border-t border-slate-200/80 flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-black text-slate-900 truncate">
                          {item.patientName} <span className="text-[11px] font-normal text-slate-500">({item.age})</span>
                        </h4>
                        <p className="text-[10px] text-slate-500 font-medium">
                          Treated by: <strong className="text-[#588356]">{item.doctor}</strong>
                        </p>
                      </div>

                      <span className="text-[10px] text-[#588356] font-extrabold flex items-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-[#588356]" /> Verified
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Navigation Control Bar */}
      {showControls && (
        <div
          className={cn(
            "absolute inset-x-4 bottom-3 z-20 mx-auto flex w-fit items-center justify-center gap-3 rounded-full border border-slate-200 bg-[#FAFAFE] px-3 py-1.5 text-slate-700 shadow-xs",
            controlsClassName
          )}
        >
          <button
            type="button"
            aria-label="Show previous slide"
            disabled={isPreviousDisabled}
            className="inline-flex size-8 items-center justify-center rounded-full bg-[#EBF5EA] text-[#588356] hover:bg-[#d8edd6] transition-colors disabled:cursor-not-allowed disabled:opacity-35"
            onClick={() => selectSlide(currentIndex - 1)}
          >
            <ChevronLeft className="size-4" />
          </button>

          {showDots && (
            <div 
              className="flex items-center justify-start gap-2 px-1 max-w-[140px] sm:max-w-md overflow-x-auto hide-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {items.map((item, index) => (
                <button
                  key={`${item.title}-${index}`}
                  type="button"
                  aria-label={`Show slide ${index + 1}: ${item.title}`}
                  aria-current={currentIndex === index ? "true" : undefined}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300 cursor-pointer shrink-0",
                    currentIndex === index ? "w-6 bg-[#588356]" : "w-2 bg-slate-300 hover:bg-slate-400"
                  )}
                  onClick={() => selectSlide(index)}
                />
              ))}
            </div>
          )}

          <button
            type="button"
            aria-label="Show next slide"
            disabled={isNextDisabled}
            className="inline-flex size-8 items-center justify-center rounded-full bg-[#EBF5EA] text-[#588356] hover:bg-[#d8edd6] transition-colors disabled:cursor-not-allowed disabled:opacity-35"
            onClick={() => selectSlide(currentIndex + 1)}
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default DiagonalCarousel;
