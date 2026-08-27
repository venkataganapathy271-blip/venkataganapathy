"use client";

import React, { useState } from "react";
import { X, CheckCircle, ArrowUpRight } from "lucide-react";

interface FacilityItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  description: string;
  image: string;
  highlights: string[];
}

const FACILITIES_DATA: FacilityItem[] = [
  {
    id: "fac-electro",
    title: "01 Electrotherapy",
    category: "Pain Management",
    badge: "IFT & TENS Unit",
    description:
      "Modern IFT, TENS, Ultrasound, and Electrical Stimulation units for fast pain relief and nerve activation.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=900",
    highlights: [
      "Nerve Stimulation for Paralysis",
      "Deep Tissue Healing",
      "Zero-Side-Effect Pain Relief",
    ],
  },
  {
    id: "fac-laser",
    title: "02 Laser Pain Management",
    category: "Advanced Therapy",
    badge: "Laser Healing",
    description:
      "Advanced laser therapy for targeted, deep tissue pain relief and accelerated healing of sports injuries.",
    image:
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=900",
    highlights: [
      "Non-Invasive Pain Relief",
      "Accelerated Tissue Repair",
      "Targeted Joint Care",
    ],
  },
  {
    id: "fac-exercise",
    title: "03 Exercise Therapy",
    category: "Joint Rehabilitation",
    badge: "Mobility Studio",
    description:
      "Dedicated exercise area for parallel bar walking, joint range of motion, and step-by-step joint mobilization.",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=900",
    highlights: [
      "Parallel Bar Walking",
      "Joint Range of Motion",
      "1-on-1 Doctor Assistance",
    ],
  },
];

export default function FacilitiesSection() {
  const [activeId, setActiveId] = useState<string>("fac-electro");
  const [selectedFacility, setSelectedFacility] = useState<FacilityItem | null>(null);

  return (
    <section
      id="facilities"
      className="py-12 sm:py-16 bg-[#FAFAFE] text-slate-900"
    >
      <div className="max-w-7xl mx-auto px-2">
        
        {/* Header Row — 2-column editorial style */}
        <div className="mb-10 sm:mb-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          
          {/* Left: Eyebrow + Big Heading */}
          <div className="lg:col-span-7">
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-3 block">
              World-Class Infrastructure
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Advanced Equipment &amp; Facilities
            </h2>
          </div>

          {/* Right: Description + CTA */}
          <div className="lg:col-span-5 space-y-4 lg:pt-9">
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Equipped with computerized spinal decompression, FDA-approved electrotherapy, and specialized post-operative knee &amp; hip rehabilitation zones.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-slate-900 hover:text-[#588356] transition-colors"
            >
              <span>Book a Session</span>
              <ArrowUpRight className="w-4 h-4 text-[#588356]" />
            </a>
          </div>

        </div>

        {/* Hover Expandable Card Grid - Strict Black & White Base + No Shadows + No Gradients */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 mb-12 h-auto lg:h-[450px]">
          {FACILITIES_DATA.map((fac) => {
            const isHovered = activeId === fac.id;

            return (
              <div
                key={fac.id}
                onMouseEnter={() => setActiveId(fac.id)}
                onClick={() => setSelectedFacility(fac)}
                className={`relative rounded-[28px] sm:rounded-[36px] overflow-hidden bg-black border border-slate-200 cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  isHovered
                    ? "lg:flex-[2.8] h-[360px] lg:h-full"
                    : "lg:flex-1 h-[200px] lg:h-full"
                }`}
              >
                {/* Background Image */}
                <img
                  src={fac.image}
                  alt={fac.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                   isHovered ? "scale-105 opacity-100" : "scale-100 opacity-95"
                  }`}
                />

                {/* Light gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Top Badge Tag (Solid White / Black Border) */}
                <div className="absolute top-5 left-5 z-10">
                  <span className="px-3.5 py-1.5 rounded-full bg-white text-slate-900 text-xs font-bold uppercase tracking-wider border border-slate-200">
                    {fac.badge}
                  </span>
                </div>

                {/* Top-Right Arrow Icon (Solid White / Black Icon) */}
                <div className="absolute top-5 right-5 z-10">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isHovered
                        ? "bg-[#588356] text-white rotate-45"
                        : "bg-white text-slate-900"
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Content & Highlights */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 z-10 space-y-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                      {fac.category}
                    </span>
                    <h3
                      className={`font-bold text-white tracking-tight leading-snug transition-all ${
                        isHovered ? "text-xl sm:text-2xl lg:text-3xl" : "text-base sm:text-lg truncate"
                      }`}
                    >
                      {fac.title}
                    </h3>
                  </div>

                  {/* Highlights Badges (Solid White Pills) */}
                  {isHovered && (
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {fac.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="px-3.5 py-1.5 rounded-full bg-white text-slate-900 text-xs font-bold border border-slate-200 inline-block"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Facility Detail Modal (No Shadow, No Blur) */}
      {selectedFacility && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-xl w-full p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedFacility(null)}
              className="absolute top-5 right-5 p-2 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="px-3.5 py-1 rounded-full bg-[#588356] text-white text-xs font-bold uppercase tracking-wider inline-block mb-3">
              {selectedFacility.category}
            </span>

            <h3 className="text-2xl font-black text-slate-900 mb-2">
              {selectedFacility.title}
            </h3>

            <div className="relative h-48 rounded-2xl overflow-hidden mb-4 border border-slate-200">
              <img
                src={selectedFacility.image}
                alt={selectedFacility.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed mb-4">
              {selectedFacility.description}
            </p>

            <div className="space-y-2 mb-6">
              <p className="text-xs font-extrabold uppercase text-slate-900">Key Highlights:</p>
              {selectedFacility.highlights.map((h, i) => (
                <div key={i} className="flex items-center text-xs font-bold text-slate-800">
                  <CheckCircle className="w-4 h-4 text-[#588356] mr-2 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              onClick={() => setSelectedFacility(null)}
              className="w-full py-3 bg-[#588356] hover:bg-[#466944] text-white rounded-full font-black text-xs uppercase tracking-wider text-center block transition-colors"
            >
              Book Consultation for {selectedFacility.title}
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
