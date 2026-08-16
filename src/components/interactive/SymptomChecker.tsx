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
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-teal-100 border border-teal-300 text-teal-800 text-xs font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-teal-700" />
            <span>Interactive Patient Guidance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Where is Your Pain? <br className="hidden sm:inline" />
            <span className="text-sky-700">
              Find Your Recommended Rehabilitation Plan
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Select your primary pain area below to see our clinical treatment methodology, expected recovery duration, and recommended doctor specialist.
          </p>
        </div>

        {/* Interactive Layout (Light Theme, No Shadows, No Gradients) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Symptom Selectors */}
          <div className="lg:col-span-5 space-y-3">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Your Symptom / Condition:
            </p>
            {SYMPTOM_OPTIONS.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedOption(item)}
                className={`w-full text-left p-4 rounded-xl border transition-colors flex items-center justify-between group ${
                  selectedOption.id === item.id
                    ? "bg-sky-700 text-white border-sky-800 font-bold"
                    : "bg-white border-slate-300 hover:bg-slate-100 text-slate-800"
                }`}
              >
                <div>
                  <h3 className={`text-sm font-extrabold ${selectedOption.id === item.id ? "text-white" : "text-slate-900"}`}>
                    {item.area}
                  </h3>
                  <p className={`text-xs mt-0.5 line-clamp-1 ${selectedOption.id === item.id ? "text-sky-100" : "text-slate-600"}`}>
                    {item.symptom}
                  </p>
                </div>
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ml-3 ${
                    selectedOption.id === item.id
                      ? "bg-white text-sky-800"
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
            <div className="bg-white border border-slate-300 rounded-2xl p-6 sm:p-8 space-y-6">
              
              <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                <div>
                  <span className="px-2.5 py-1 bg-sky-100 text-sky-800 text-xs font-bold rounded border border-sky-300">
                    Target Condition
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-2">
                    {selectedOption.area}
                  </h3>
                </div>
                <div className="p-3 bg-teal-50 border border-teal-200 text-teal-700 rounded-xl">
                  <HelpCircle className="w-6 h-6" />
                </div>
              </div>

              {/* Symptom summary */}
              <div>
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Common Presentation</p>
                <p className="text-sm text-slate-800 mt-1 italic bg-slate-50 p-3 rounded-lg border border-slate-200">
                  "{selectedOption.symptom}"
                </p>
              </div>

              {/* Recommended Protocol */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-teal-800 uppercase tracking-wider">Recommended Non-Surgical Protocol</p>
                <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl space-y-2">
                  <div className="flex items-center text-sm font-bold text-slate-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                    <span>{selectedOption.recommendedTherapy}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed pl-6">
                    {selectedOption.description}
                  </p>
                </div>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center space-x-3">
                  <div className="p-2 bg-amber-100 border border-amber-300 text-amber-800 rounded-lg">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Expected Recovery</p>
                    <p className="text-xs font-bold text-slate-900">{selectedOption.expectedDuration}</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center space-x-3">
                  <div className="p-2 bg-sky-100 border border-sky-300 text-sky-800 rounded-lg">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Suggested Specialist</p>
                    <p className="text-xs font-bold text-slate-900">{selectedOption.suggestedSpecialist}</p>
                  </div>
                </div>
              </div>

              {/* Action Banner */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center text-xs text-slate-600 font-semibold space-x-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Early therapy prevents chronic joint degeneration.</span>
                </div>

                <a
                  href="#contact"
                  className="w-full sm:w-auto px-6 py-3 bg-sky-700 hover:bg-sky-800 border border-sky-800 text-white rounded-lg text-xs font-bold text-center transition-colors"
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
