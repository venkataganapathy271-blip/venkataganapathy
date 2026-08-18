"use client";

import React from "react";
import { FACILITIES } from "@/data/hospitalData";
import { Sparkles, CheckCircle } from "lucide-react";
import { ScrollDissolveReveal } from "@/components/ui/scroll-dissolve-reveal";

export default function FacilitiesSection() {
  const backImages = [
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
  ];

  return (
    <section id="facilities" className="py-16 sm:py-20 bg-[#FAFAFE]">
      <div className="max-w-7xl mx-auto px-2">
        
        {/* Editorial Section Header (2-Column Banner Layout) */}
        <div className="mb-12 pb-6 border-b border-slate-200">
          {/* Top Badge */}
          <div className="flex items-center space-x-2 text-[11px] font-bold tracking-widest text-[#588356] uppercase mb-3">
            <span className="text-[#588356]">✦</span>
            <span>WORLD-CLASS INFRASTRUCTURE</span>
          </div>

          {/* Main 2-Column Banner Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            {/* Left Column: Big Typographic Title */}
            <div className="lg:col-span-7">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                ADVANCED EQUIPMENT <span className="font-light text-[#588356]">— MODALITIES</span>
                <br />
                <span className="text-[#588356]">WORLD-CLASS</span> REHABILITATION
              </h2>
            </div>

            {/* Right Column: Italic Callout Box with Left Accent Line */}
            <div className="lg:col-span-5 border-l-4 border-[#A8D0A6] pl-5 sm:pl-6 py-1">
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed font-serif">
                "Equipped with computerized spinal decompression, FDA-approved electrotherapy, and specialized post-operative knee & hip mobilization zones."
              </p>
            </div>
          </div>
        </div>

        {/* Facilities Alternating Feature Rows with ScrollDissolveReveal */}
        <div className="space-y-12">
          {FACILITIES.map((fac, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={fac.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-12 border-b border-slate-200 last:border-0 last:pb-0"
              >
                {/* Image Column with Scroll Dissolve Reveal Effect */}
                <div className={`lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <ScrollDissolveReveal
                    imageFront={fac.image}
                    imageBack={backImages[idx % backImages.length]}
                    altFront={`${fac.title} Modality Equipment`}
                    altBack={`${fac.title} Patient Session`}
                    category={fac.category}
                    className="h-64 sm:h-72 lg:h-80 w-full"
                  />
                </div>

                {/* Content Column */}
                <div className={`lg:col-span-6 space-y-4 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-mono font-bold text-[#588356] bg-[#EBF5EA] px-2.5 py-1 rounded-lg border border-[#A8D0A6]/50">
                      0{idx + 1}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#588356]">
                      {fac.category} MODALITY
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                    {fac.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {fac.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {fac.highlights.map((item, hIdx) => (
                      <span
                        key={hIdx}
                        className="inline-flex items-center text-xs font-bold text-slate-800 bg-[#EBF5EA] border border-[#A8D0A6]/60 px-3.5 py-1.5 rounded-full"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-[#588356] mr-1.5 shrink-0" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


