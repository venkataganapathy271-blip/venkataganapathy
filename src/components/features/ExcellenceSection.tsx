"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export default function ExcellenceSection() {
  return (
    <section className="py-10 sm:py-12 bg-[#FAFAFE]">
      <div className="max-w-7xl mx-auto px-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Column: Text Header + Bottom Landscape Therapy Image */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4 sm:space-y-5">
            {/* Text Header Area */}
            <div className="space-y-2.5">
              <div className="inline-flex items-center space-x-1.5 text-[11px] font-bold tracking-widest text-[#588356] uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#588356]" />
                <span>PHYSIOTHERAPY EXCELLENCE</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-snug">
                Delivering Excellence in <br className="hidden sm:inline" />
                <span className="text-[#588356]">Care, Every Time</span>
              </h2>

              <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed max-w-xl">
                At Venkata Ganapathi Hospital, we blend advanced clinical science with compassionate care to help you regain complete mobility, alleviate chronic pain, and restore your quality of life. Our dedicated team is committed to guiding you toward a stronger, healthier tomorrow.
              </p>
            </div>

            {/* Bottom Left Image Card */}
            <div className="relative h-44 sm:h-48 lg:h-52 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
                alt="Personalized Shoulder & Arm Therapy Session"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Right Column: Therapy Image Card */}
          <div className="lg:col-span-6">
            <div className="relative h-[320px] sm:h-[360px] lg:h-full min-h-[360px] max-h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"
                alt="Expert Joint Mobilization & Leg Stretch Therapy"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
