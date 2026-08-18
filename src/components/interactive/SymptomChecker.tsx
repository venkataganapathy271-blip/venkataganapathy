"use client";

import React, { useState } from "react";
import { SYMPTOM_OPTIONS, SymptomOption } from "@/data/hospitalData";
import { HelpCircle, Clock, Stethoscope, ArrowRight, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

export default function SymptomChecker() {
  const [selectedOption, setSelectedOption] = useState<SymptomOption>(SYMPTOM_OPTIONS[0]);

  return (
    <section id="symptom-checker" className="py-16 bg-[#FAFAFE]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-2">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#EBF5EA] border border-[#A8D0A6] text-[#588356] text-xs font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#588356]" />
            <span>Interactive Patient Guidance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-[1.18]">
            Where is Your Pain? <br className="hidden sm:inline" />
            <span className="text-[#588356]">
              Find Your Recommended Rehabilitation Plan
            </span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Select your primary pain area below to see our clinical treatment methodology, expected recovery duration, and recommended doctor specialist.
          </p>
        </div>

        {/* Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Symptom Selectors */}
          <div className="lg:col-span-5 space-y-3">
            <p className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
              Select Your Symptom / Condition:
            </p>
            {SYMPTOM_OPTIONS.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedOption(item)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group ${
                  selectedOption.id === item.id
                    ? "bg-slate-900 text-white border-slate-900 font-bold"
                    : "bg-white border-slate-200 hover:bg-slate-50 text-slate-800"
                }`}
              >
                <div>
                  <h3 className={`text-sm font-extrabold ${selectedOption.id === item.id ? "text-white" : "text-slate-900"}`}>
                    {item.area}
                  </h3>
                  <p className={`text-xs mt-0.5 line-clamp-1 ${selectedOption.id === item.id ? "text-slate-300" : "text-slate-500"}`}>
                    {item.symptom}
                  </p>
                </div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ml-3 ${
                    selectedOption.id === item.id
                      ? "bg-[#A8D0A6] text-slate-900"
                      : "bg-slate-100 border border-slate-200 text-slate-600"
                  }`}
                >
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>

          {/* Right Column: Detailed Treatment Recommendation Box */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
              
              <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                <div>
                  <span className="px-3 py-1 bg-[#EBF5EA] text-[#588356] text-xs font-extrabold rounded-full border border-[#A8D0A6]/60">
                    Target Condition
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                    {selectedOption.area}
                  </h3>
                </div>
                <div className="p-3 bg-[#EBF5EA] border border-[#A8D0A6]/60 text-[#588356] rounded-2xl">
                  <HelpCircle className="w-6 h-6" />
                </div>
              </div>

              {/* Symptom summary */}
              <div>
                <p className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Common Presentation</p>
                <p className="text-xs sm:text-sm text-slate-800 mt-1 italic bg-[#FAFAFE] p-3.5 rounded-2xl border border-slate-200">
                  "{selectedOption.symptom}"
                </p>
              </div>

              {/* Recommended Protocol */}
              <div className="space-y-3">
                <p className="text-xs font-extrabold text-[#588356] uppercase tracking-wider">Recommended Non-Surgical Protocol</p>
                <div className="p-4 bg-[#EBF5EA]/50 border border-[#A8D0A6]/60 rounded-2xl space-y-2">
                  <div className="flex items-center text-sm font-black text-slate-900">
                    <CheckCircle2 className="w-4 h-4 text-[#588356] mr-2 shrink-0" />
                    <span>{selectedOption.recommendedTherapy}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed pl-6 font-medium">
                    {selectedOption.description}
                  </p>
                </div>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center space-x-3">
                  <div className="p-2 bg-[#EBF5EA] border border-[#A8D0A6]/60 text-[#588356] rounded-xl">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Expected Recovery</p>
                    <p className="text-xs font-extrabold text-slate-900">{selectedOption.expectedDuration}</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center space-x-3">
                  <div className="p-2 bg-[#EBF5EA] border border-[#A8D0A6]/60 text-[#588356] rounded-xl">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Suggested Specialist</p>
                    <p className="text-xs font-extrabold text-slate-900">{selectedOption.suggestedSpecialist}</p>
                  </div>
                </div>
              </div>

              {/* Action Banner */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center text-xs text-slate-600 font-bold space-x-2">
                  <AlertCircle className="w-4 h-4 text-[#588356] shrink-0" />
                  <span>Early therapy prevents chronic joint degeneration.</span>
                </div>

                <a
                  href="#contact"
                  className="w-full sm:w-auto px-6 py-3 bg-[#A8D0A6] hover:bg-[#96C494] text-slate-900 rounded-full text-xs font-black text-center transition-all border border-[#A8D0A6]"
                >
                  Schedule Assessment Now
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

