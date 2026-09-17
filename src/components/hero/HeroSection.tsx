"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import type { HeroSlideDoc, HospitalInfoDoc } from "@/lib/data";

interface HeroSectionProps {
  slides: HeroSlideDoc[];
  hospitalInfo: HospitalInfoDoc;
}

export default function HeroSection({ slides, hospitalInfo }: HeroSectionProps) {

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [loadedVideos, setLoadedVideos] = useState<Record<number, boolean>>({});
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    // Defer video loading to ensure the website loads instantly
    const timer = setTimeout(() => {
      setShouldLoadVideo(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoLoaded = (idx: number) => {
    setLoadedVideos((prev) => ({ ...prev, [idx]: true }));
  };

  // Auto-switch video background and headline text every 5 seconds with 1s smooth crossfade
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  // Hide browser scrollbar when in Hero section (at top of page), show when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.75;
      if (window.scrollY < heroHeight) {
        document.documentElement.classList.add("hide-scrollbar");
        document.body.classList.add("hide-scrollbar");
      } else {
        document.documentElement.classList.remove("hide-scrollbar");
        document.body.classList.remove("hide-scrollbar");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.classList.remove("hide-scrollbar");
      document.body.classList.remove("hide-scrollbar");
    };
  }, []);

  return (
    <section id="home" className="w-full h-screen max-h-screen bg-[#FAFAFE] p-2">
      <div className="relative w-full h-full bg-slate-900 flex flex-col justify-between overflow-hidden pt-20 pb-3 text-white rounded-xl sm:rounded-2xl shadow-sm">

        {/* Background Video Carousel with Smooth 1s Opacity Dissolve */}
        <div className="absolute inset-0 z-0 bg-[#FAFAFE]">
          {slides.map((slide, idx) => (
            <div
              key={slide.video}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlideIndex === idx ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
            >
              {/* Fallback Image (Loads instantly) */}
              <img
                src={slide.poster}
                alt="Hospital Background"
                fetchPriority={idx === 0 ? "high" : "auto"}
                loading={idx === 0 ? "eager" : "lazy"}
                className="absolute inset-0 w-full h-full object-cover z-0"
              />

              {/* Video (Fades in over the image only after it has loaded data) */}
              {shouldLoadVideo && (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  poster={slide.poster}
                  onLoadedData={() => handleVideoLoaded(idx)}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out pointer-events-none z-10 ${loadedVideos[idx] ? "opacity-100" : "opacity-0"
                    }`}
                >
                  <source src={slide.video} type="video/mp4" />
                </video>
              )}
            </div>
          ))}

          {/* Subtle gradient overlays for better text readability */}
          <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/40 via-black/5 to-transparent h-1/3" />
          <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none bg-gradient-to-t from-black/60 via-black/10 to-transparent h-1/2" />
        </div>

        {/* Main Hero Left Content */}
        <div className="max-w-7xl mx-auto px-2 relative z-20 w-full flex-1 flex flex-col justify-start pt-14 lg:pt-16">
          <div className="max-w-2xl relative min-h-[180px]">
            {slides.map((slide, idx) => (
              <div
                key={idx}
                className={`transition-all duration-1000 ease-in-out ${currentSlideIndex === idx
                    ? "opacity-100 translate-y-0 relative z-20"
                    : "opacity-0 -translate-y-2 absolute inset-0 z-0 pointer-events-none"
                  }`}
              >
                {/* 2-Line Main Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.5] text-white">
                  {slide.line1} <br />
                  <span className="font-serif italic font-normal text-white block mt-4 sm:mt-5">
                    {slide.line2}
                  </span>
                </h1>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Overlaid Area */}
        <div className="relative z-20 max-w-7xl mx-auto px-2 w-full shrink-0 pb-2 md:pb-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">

            {/* 1. Left: Action Buttons */}
            <div className="lg:col-span-4 flex flex-wrap items-center gap-3">
              {/* Primary White Pill Button with Sage Green Accent */}
              <a
                href="#contact"
                className="inline-flex items-center space-x-3 px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-900 rounded-full font-bold text-xs border border-slate-200 transition-all group"
              >
                <span>Book Appointment</span>
                <div className="w-5 h-5 rounded-full bg-[#A8D0A6] group-hover:bg-[#96C494] flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 text-slate-900" />
                </div>
              </a>

              {/* Secondary Dark Outline Pill Button */}
              <a
                href="#departments"
                className="inline-flex items-center space-x-3 px-5 py-2.5 bg-slate-950/40 hover:bg-slate-950/70 text-white rounded-full font-bold text-xs border border-white/30 transition-all group"
              >
                <span>Our Services</span>
                <div className="w-5 h-5 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 text-white" />
                </div>
              </a>
            </div>

            {/* 2. Center: Targeted Care Paragraph Text */}
            <div className="lg:col-span-4">
              <p className="text-slate-100 text-[11px] sm:text-xs font-normal leading-relaxed">
                Targeted care focused on relieving pain, improving movement, and restoring everyday comfort through guided, personalized hands-on treatment by <strong className="text-white font-semibold">{hospitalInfo.chiefDoctor} ({hospitalInfo.doctorQualification})</strong>.
              </p>
            </div>

            {/* 3. Right: Stacked Text Features */}
            <div className="lg:col-span-4 flex flex-wrap items-center justify-start lg:justify-end gap-6 text-xs font-semibold">
              {/* First Item */}
              <div className="flex items-center space-x-3">
                <div className="w-0.5 h-8 bg-[#A8D0A6] shrink-0" />
                <div className="leading-tight text-white">
                  <div className="font-normal text-slate-200">Personalized</div>
                  <div className="font-bold">Physiotherapy Treatments</div>
                </div>
              </div>

              {/* Second Item */}
              <div className="flex items-center space-x-3">
                <div className="w-0.5 h-8 bg-[#A8D0A6] shrink-0" />
                <div className="leading-tight text-white">
                  <div className="font-normal text-slate-200">Trusted and Trained</div>
                  <div className="font-bold">Physiotherapy Experts</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
