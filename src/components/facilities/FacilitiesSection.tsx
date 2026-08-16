"use client";

import React from "react";
import { FACILITIES } from "@/data/hospitalData";
import { Activity, Zap, Layers, Dumbbell, CheckCircle2, Sparkles } from "lucide-react";

export default function FacilitiesSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Activity": return <Activity className="w-6 h-6 text-sky-700" />;
      case "Zap": return <Zap className="w-6 h-6 text-amber-600" />;
      case "Layers": return <Layers className="w-6 h-6 text-teal-700" />;
      default: return <Dumbbell className="w-6 h-6 text-emerald-700" />;
    }
  };

  return (
    <section id="facilities" className="py-16 bg-[#FAFAFE]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-2">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-teal-100 border border-teal-300 text-teal-800 text-xs font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-teal-700" />
            <span>World-Class Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Advanced Medical Equipment & <br className="hidden sm:inline" />
            <span className="text-sky-700">Rehabilitation Facilities</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Equipped with state-of-the-art diagnostic and therapeutic modalities designed for non-invasive joint healing, spine decompression, and bio-mechanical retraining.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FACILITIES.map((fac) => (
            <div
              key={fac.id}
              className="bg-white border border-slate-300 rounded-2xl overflow-hidden grid grid-cols-1 sm:grid-cols-12 group"
            >
              {/* Image side */}
              <div className="sm:col-span-5 relative h-56 sm:h-full overflow-hidden bg-slate-100">
                <img
                  src={fac.image}
                  alt={fac.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-slate-900 text-white text-[11px] font-bold rounded">
                  {fac.category}
                </span>
              </div>

              {/* Text side */}
              <div className="sm:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div>
                  <div className="p-2.5 bg-slate-100 rounded-lg w-fit border border-slate-200 mb-3">
                    {getIcon(fac.icon)}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {fac.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {fac.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 space-y-1.5">
                  {fac.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center text-xs font-semibold text-slate-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 mr-2 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
