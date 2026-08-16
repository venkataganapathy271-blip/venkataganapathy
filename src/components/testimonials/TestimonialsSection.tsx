"use client";

import React from "react";
import { TESTIMONIALS } from "@/data/hospitalData";
import { Star, Quote, CheckCircle, Sparkles } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 bg-[#FAFAFE]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-2">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Verified Patient Outcomes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Real Recovery Stories & <br className="hidden sm:inline" />
            <span className="text-sky-700">Patient Testimonials</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Read how non-surgical rehabilitation at Venkata Ganapathi Hospital helped patients overcome chronic disc pain, knee stiffness, and stroke limitations.
          </p>
        </div>

        {/* Overall Rating Summary Bar */}
        <div className="bg-slate-50 border border-slate-300 rounded-2xl p-6 mb-10 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-amber-100 border border-amber-300 rounded-xl flex items-center justify-center text-amber-800 font-black text-2xl">
              4.9
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start space-x-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <p className="text-xs text-slate-700 font-bold mt-1">
                Based on 1,250+ Verified Google & OPD Patient Reviews
              </p>
            </div>
          </div>

          <div className="px-3.5 py-2 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-lg text-xs font-bold flex items-center">
            <CheckCircle className="w-4 h-4 mr-2 text-emerald-700" />
            100% Non-Surgical Focus
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 border border-slate-300 rounded-2xl p-6 sm:p-8 relative flex flex-col justify-between space-y-6"
            >
              <Quote className="w-10 h-10 text-slate-300 absolute top-6 right-6" />

              <div className="space-y-4">
                {/* Rating stars & condition badge */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <span className="px-3 py-1 bg-teal-100 border border-teal-300 text-teal-800 text-xs font-bold rounded-full">
                    {item.recoveryPeriod}
                  </span>
                </div>

                {/* Condition Treated Banner */}
                <p className="text-xs font-extrabold uppercase tracking-wider text-sky-800">
                  Condition: {item.condition}
                </p>

                {/* Comment */}
                <p className="text-sm text-slate-800 leading-relaxed italic font-medium">
                  "{item.comment}"
                </p>
              </div>

              {/* Patient Footer info */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={item.avatar}
                    alt={item.patientName}
                    className="w-11 h-11 rounded-full object-cover border border-slate-300"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center">
                      {item.patientName}
                      <span className="text-xs text-slate-500 font-normal ml-2">({item.patientAge} yrs)</span>
                    </h3>
                    <p className="text-xs text-slate-600">
                      Treated by: <strong className="text-sky-800 font-semibold">{item.doctorName}</strong>
                    </p>
                  </div>
                </div>

                <div className="text-[11px] text-emerald-700 font-bold flex items-center">
                  <CheckCircle className="w-3.5 h-3.5 mr-1" />
                  Verified
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
