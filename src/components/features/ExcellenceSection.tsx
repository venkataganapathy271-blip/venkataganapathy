"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function ExcellenceSection() {
  return (
    <section className="py-12 sm:py-16 bg-[#FAFAFE]">
      <div className="max-w-7xl mx-auto px-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* Left Column: Text Header + Bottom Landscape Therapy Image */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6 lg:space-y-5">
            
            {/* Text Header Area (Mobile Optimized) */}
            <div className="space-y-4 sm:space-y-5 text-center lg:text-left flex flex-col items-center lg:items-start">
              <span className="text-[10px] sm:text-[11px] font-black tracking-widest text-slate-500 uppercase">
                Physiotherapy Excellence
              </span>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.1] sm:leading-[1.08]">
                Delivering Excellence <br className="hidden lg:block" />in Care
              </h2>

              <p className="text-slate-600 text-xs sm:text-base leading-relaxed max-w-md lg:max-w-xl">
                At Venkata Ganapathy Physiotherapy Clinic, we blend advanced clinical science with compassionate care to help you regain complete mobility, alleviate chronic pain, and restore your quality of life. Our dedicated team is committed to guiding you toward a stronger, healthier tomorrow.
              </p>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-[11px] sm:text-sm font-black text-slate-900 hover:text-[#588356] transition-colors border border-slate-200 lg:border-transparent px-4 py-2 lg:px-0 lg:py-0 rounded-full mt-2 lg:mt-0"
              >
                <span>Book Appointment</span>
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#588356]" />
              </a>
            </div>

            {/* Bottom Left Image Card — same squircle style */}
            <div className="group relative h-48 sm:h-56 lg:h-60 rounded-[24px] lg:rounded-[32px] overflow-hidden bg-slate-900 cursor-pointer">
              <img
                src="/Floor-hip-flexors-.webp"
                alt="Personalized Shoulder & Arm Therapy Session"
                className="w-full h-full object-cover object-[center_60%] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 lg:bottom-5 lg:left-5 right-16 lg:right-20 z-10 pointer-events-none">
                <h3 className="text-[13px] sm:text-lg font-black text-white leading-snug">
                  Shoulder &amp; Arm Therapy
                </h3>
              </div>

              {/* Squircle cutout */}
              <div className="absolute bottom-0 right-0 w-[56px] h-[56px] lg:w-[76px] lg:h-[76px] pointer-events-none z-10 text-[#FAFAFE]">
                <svg viewBox="0 0 76 76" fill="currentColor" className="w-full h-full">
                  <path d="M 76 0 A 14 14 0 0 1 62 14 L 32 14 A 20 20 0 0 0 12 34 L 12 62 A 14 14 0 0 1 0 76 L 76 76 Z" />
                </svg>
              </div>
              <div className="absolute bottom-[4px] right-[4px] lg:bottom-[6px] lg:right-[6px] z-20 pointer-events-none">
                <div className="w-[38px] h-[38px] lg:w-[50px] lg:h-[50px] rounded-[12px] lg:rounded-[16px] bg-[#1c0707] flex items-center justify-center transition-all duration-300 group-hover:bg-[#588356]">
                  <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Tall Therapy Image Card */}
          <div className="lg:col-span-6">
            <div className="group relative h-[320px] sm:h-[420px] lg:h-full lg:min-h-[420px] rounded-[24px] lg:rounded-[32px] overflow-hidden bg-slate-900 cursor-pointer">
              <img
                src="/Hip-circles.webp"
                alt="Expert Joint Mobilization & Leg Stretch Therapy"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 lg:bottom-6 lg:left-6 right-20 lg:right-24 z-10 pointer-events-none">
                <p className="text-white/80 text-[9px] lg:text-[10px] font-bold uppercase tracking-widest mb-1">Featured Session</p>
                <h3 className="text-[14px] sm:text-xl font-black text-white leading-snug">
                  Expert Joint Mobilization &amp; Leg Stretch
                </h3>
              </div>

              {/* Squircle cutout */}
              <div className="absolute bottom-0 right-0 w-[64px] h-[64px] lg:w-[92px] lg:h-[92px] pointer-events-none z-10 text-[#FAFAFE]">
                <svg viewBox="0 0 92 92" fill="currentColor" className="w-full h-full">
                  <path d="M 92 0 A 16 16 0 0 1 76 16 L 40 16 A 24 24 0 0 0 16 40 L 16 76 A 16 16 0 0 1 0 92 L 92 92 Z" />
                </svg>
              </div>
              <div className="absolute bottom-[6px] right-[6px] lg:bottom-[8px] lg:right-[8px] z-20 pointer-events-none">
                <div className="w-[42px] h-[42px] lg:w-[60px] lg:h-[60px] rounded-[14px] lg:rounded-[20px] bg-[#1c0707] flex items-center justify-center transition-all duration-300 group-hover:bg-[#588356]">
                  <ArrowUpRight className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
