"use client";

import React, { useState } from "react";
import { DEPARTMENTS, Department } from "@/data/hospitalData";
import {
  Activity,
  Brain,
  Zap,
  ShieldCheck,
  HeartPulse,
  Users,
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  X,
  Stethoscope,
  Play,
  Sparkles,
} from "lucide-react";

export default function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeDeptId, setActiveDeptId] = useState<string>(DEPARTMENTS[0].id);
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);

  const categories = [
    "All",
    "Orthopedics",
    "Spine Care",
    "Neurology",
    "Joint Care",
    "Sports Science",
  ];

  const filteredDepts =
    activeCategory === "All"
      ? DEPARTMENTS
      : DEPARTMENTS.filter((d) => d.category === activeCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Activity":
        return <Activity className="w-5 h-5 text-[#588356]" />;
      case "Brain":
        return <Brain className="w-5 h-5 text-[#588356]" />;
      case "Zap":
        return <Zap className="w-5 h-5 text-[#588356]" />;
      case "ShieldPulse":
        return <ShieldCheck className="w-5 h-5 text-[#588356]" />;
      case "HeartPulse":
        return <HeartPulse className="w-5 h-5 text-[#588356]" />;
      default:
        return <Users className="w-5 h-5 text-[#588356]" />;
    }
  };

  return (
    <section id="departments" className="py-20 bg-[#FAFAFE]">
      <div className="max-w-7xl mx-auto px-2">
        
        {/* Section Header Matching Reference Image Exactly */}
        <div className="mb-14 pb-8 border-b border-slate-200">
          
          {/* Top Label */}
          <div className="flex items-center space-x-2 text-[11px] font-bold tracking-widest text-[#588356] uppercase mb-3">
            <span className="text-[#588356]">✦</span>
            <span>WHAT WE OFFER</span>
          </div>

          {/* Main 2-Column Banner Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            
            {/* Left Column: Huge Typographic Headline & Short Subtitle */}
            <div className="lg:col-span-7 space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.08]">
                ADVANCED REHAB <span className="font-light text-[#588356]">— 5</span>
                <br />
                <span className="italic font-serif font-normal text-[#588356] lowercase tracking-normal">specialized</span> DEPARTMENTS
              </h2>

              <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed max-w-lg pt-1">
                Our 5 specialized departments cover non-surgical spine care, orthopedic joint rehab, stroke neuro-recovery, and sports injury science.
              </p>
            </div>

            {/* Right Column: Italic Callout Quote Box with Left Accent Line */}
            <div className="lg:col-span-5 border-l-2 border-[#A8D0A6] pl-4 sm:pl-6 py-1">
              <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed font-serif">
                "Venkata Ganapathi Hospital provides targeted non-invasive recovery protocols. Hover or tap on any clinical department below to explore our treatment procedures."
              </p>
            </div>

          </div>

          {/* Category Filter Pills Track */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-black transition-all border ${
                    isActive
                      ? "bg-[#588356] text-white border-[#588356]"
                      : "bg-[#FAFAFE] text-slate-700 border-slate-300 hover:border-[#588356] hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* Hover-Expandable Accordion List (Matching Reference Image) */}
        <div className="divide-y divide-slate-200">
          {filteredDepts.map((dept, index) => {
            const isExpanded = activeDeptId === dept.id;

            return (
              <div
                key={dept.id}
                onMouseEnter={() => setActiveDeptId(dept.id)}
                onClick={() => setActiveDeptId(dept.id)}
                className={`py-6 sm:py-8 transition-all duration-300 cursor-pointer ${
                  isExpanded ? "bg-white/50 px-2 sm:px-4" : "hover:bg-slate-100/50"
                }`}
              >
                {/* Always-Visible Row Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left: Number + Uppercase Main Title & Subtitle */}
                  <div className="flex items-center gap-5 sm:gap-6">
                    <span
                      className={`font-serif text-2xl sm:text-3xl font-light shrink-0 transition-colors ${
                        isExpanded ? "text-[#588356] font-normal" : "text-slate-300"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <h3
                        className={`text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight transition-colors ${
                          isExpanded ? "text-slate-900" : "text-slate-800 hover:text-[#588356]"
                        }`}
                      >
                        {dept.name}
                      </h3>
                      <p className="text-[10px] sm:text-xs font-bold text-[#588356] uppercase tracking-wider mt-0.5">
                        {dept.category} DIVISION • LEAD: {dept.doctorInCharge.split(" ")[0]} {dept.doctorInCharge.split(" ")[1]}
                      </p>
                    </div>
                  </div>

                  {/* Right: Quick Summary Text + Circular Arrow Icon */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                    <span className="hidden md:inline-block text-xs font-medium text-slate-500 max-w-xs text-right truncate">
                      {dept.treatments.slice(0, 2).join(" • ")}
                    </span>

                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isExpanded
                          ? "bg-[#A8D0A6] text-slate-900 rotate-45 border border-[#A8D0A6]"
                          : "bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Expandable Body Content (Visible when active/hovered) */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-slate-100 animate-fadeIn">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      
                      {/* Left Image Card (Rounded image container matching reference screenshot) */}
                      <div className="lg:col-span-5 relative h-56 sm:h-64 overflow-hidden border border-slate-200 bg-slate-100 rounded-2xl sm:rounded-3xl">
                        <img
                          src={dept.image}
                          alt={dept.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 left-3 px-3 py-1 bg-white text-slate-900 text-[11px] font-extrabold rounded-full border border-slate-200">
                          {dept.category} SPECIALIST
                        </span>
                      </div>

                      {/* Right Details Box */}
                      <div className="lg:col-span-7 space-y-4">
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                          {dept.fullDesc || dept.shortDesc}
                        </p>

                        {/* Treatments Pills (Rounded) */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {dept.treatments.map((treatment, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center text-xs font-bold text-slate-800 bg-[#EBF5EA] border border-[#A8D0A6]/60 px-3.5 py-1.5 rounded-full"
                            >
                              <CheckCircle className="w-3.5 h-3.5 text-[#588356] mr-1.5 shrink-0" />
                              {treatment}
                            </span>
                          ))}
                        </div>

                        {/* Action CTA Buttons (Rounded) */}
                        <div className="flex flex-wrap items-center gap-3 pt-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDept(dept);
                            }}
                            className="px-6 py-2.5 bg-[#A8D0A6] hover:bg-[#96C494] text-slate-900 font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 border border-[#A8D0A6] rounded-full"
                          >
                            <span>EXPLORE PROTOCOL</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>

                          <a
                            href="#contact"
                            onClick={(e) => e.stopPropagation()}
                            className="px-6 py-2.5 bg-[#EBF5EA] hover:bg-[#d8edd6] text-slate-900 font-black text-xs uppercase tracking-wider transition-all border border-[#A8D0A6] rounded-full"
                          >
                            Book Specialist
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Department Detail Modal */}
      {selectedDept && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedDept(null)}
              className="absolute top-5 right-5 p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2.5 bg-[#EBF5EA] border border-[#A8D0A6]/60 rounded-xl">
                {getIcon(selectedDept.iconName)}
              </div>
              <div>
                <span className="text-xs font-bold text-[#588356] uppercase tracking-wider">
                  {selectedDept.category} Department
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {selectedDept.name}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6 font-medium">
              {selectedDept.fullDesc}
            </p>

            <div className="space-y-4 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Key Clinical Protocols Offered
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedDept.treatments.map((t, i) => (
                  <div
                    key={i}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 flex items-center"
                  >
                    <CheckCircle className="w-4 h-4 text-[#588356] mr-2 shrink-0" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Advanced Equipment & Modalities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedDept.features.map((f, i) => (
                  <div
                    key={i}
                    className="p-3 bg-[#EBF5EA] border border-[#A8D0A6]/60 rounded-xl text-xs font-bold text-slate-900 flex items-center"
                  >
                    <Stethoscope className="w-4 h-4 text-[#588356] mr-2 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#EBF5EA] border border-[#A8D0A6]/60 text-slate-900 p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[11px] text-[#588356] uppercase tracking-wider font-extrabold">
                  Head of Division
                </p>
                <p className="text-sm font-black text-slate-900">
                  {selectedDept.doctorInCharge}
                </p>
              </div>
              <a
                href="#contact"
                onClick={() => setSelectedDept(null)}
                className="px-5 py-2.5 bg-[#A8D0A6] hover:bg-[#96C494] rounded-full text-xs font-black text-slate-900 transition-colors"
              >
                Book Appointment
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}



