"use client";

import React, { useState, useEffect, useRef } from "react";

interface ScrollDissolveRevealProps {
  imageFront: string;
  imageBack: string;
  altFront?: string;
  altBack?: string;
  category?: string;
  className?: string;
}

export function ScrollDissolveReveal({
  imageFront,
  imageBack,
  altFront = "Clinical Equipment State",
  altBack = "Active Therapy Session State",
  category,
  className = "",
}: ScrollDissolveRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll progress when element is in middle of viewport
      const start = windowHeight * 0.85;
      const end = windowHeight * 0.15;
      const current = rect.top;

      let currentProgress = (start - current) / (start - end);
      currentProgress = Math.max(0, Math.min(1, currentProgress));
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Effective blend opacity combining scroll progress & hover interaction
  const effectiveProgress = isHovered ? 1 : progress;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 group transition-all duration-500 ${className}`}
    >
      {/* Back Revealed Image (Therapy in Action) */}
      <img
        src={imageBack}
        alt={altBack}
        className="w-full h-full object-cover object-center absolute inset-0"
      />

      {/* Front Dissolving Image (Equipment Modality) */}
      <img
        src={imageFront}
        alt={altFront}
        style={{ opacity: 1 - effectiveProgress }}
        className="w-full h-full object-cover object-center absolute inset-0 transition-opacity duration-700 ease-out"
      />

      {/* Subtle Overlay Gradient for Depth */}
      <div className="absolute inset-0 bg-slate-950/10 pointer-events-none" />

      {/* Category Pill Badge Overlay */}
      {category && (
        <span className="absolute top-4 left-4 z-10 px-3.5 py-1 bg-white text-slate-900 text-[10px] font-black uppercase tracking-wider rounded-full border border-slate-200">
          {category}
        </span>
      )}

      {/* Interactive Reveal Prompt Badge */}
      <div className="absolute bottom-4 right-4 z-10 px-3 py-1 bg-white/90 backdrop-blur-xs text-slate-800 text-[10px] font-extrabold rounded-full border border-slate-200 opacity-90 transition-opacity flex items-center space-x-1.5">
        <span className={`w-2 h-2 rounded-full transition-colors ${effectiveProgress > 0.5 ? "bg-[#588356]" : "bg-amber-500 animate-pulse"}`} />
        <span>{effectiveProgress > 0.5 ? "Active Treatment Revealed" : "Scroll / Hover to Dissolve"}</span>
      </div>
    </div>
  );
}
