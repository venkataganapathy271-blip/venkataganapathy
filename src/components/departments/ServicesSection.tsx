"use client";

import React, { useState } from "react";
import { DEPARTMENTS, Department } from "@/data/hospitalData";
import { Activity, Brain, Zap, ShieldCheck, HeartPulse, Users, ArrowRight, CheckCircle, X, Stethoscope, Sparkles } from "lucide-react";

export default function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);

  const categories = ["All", "Orthopedics", "Neurology", "Sports Science", "Spine Care", "Post-Op"];

  const filteredDepts = activeCategory === "All"
    ? DEPARTMENTS
    : DEPARTMENTS.filter((d) => d.category === activeCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Activity": return <Activity className="w-5 h-5 text-sky-700" />;
      case "Brain": return <Brain className="w-5 h-5 text-teal-700" />;
      case "Zap": return <Zap className="w-5 h-5 text-amber-600" />;
      case "ShieldPulse": return <ShieldCheck className="w-5 h-5 text-emerald-700" />;
      case "HeartPulse": return <HeartPulse className="w-5 h-5 text-rose-600" />;
      default: return <Users className="w-5 h-5 text-indigo-700" />;
    }
  };

  return (
    <section id="departments" className="py-16 bg-[#FAFAFE]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-2">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#EBF5EA] border border-[#A8D0A6] text-[#588356] text-xs font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#588356]" />
            <span>Specialized Clinical Care</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Comprehensive Physiotherapy <br className="hidden sm:inline" />
            <span className="text-[#588356]">Departments & Treatments</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            From acute sports tears to chronic spinal degeneration and post-stroke rehabilitation, our specialized clinical divisions provide targeted therapy protocols tailored to your recovery goals.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold border transition-colors ${
                activeCategory === cat
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDepts.map((dept) => (
            <div
              key={dept.id}
              className="bg-white border border-slate-300 rounded-2xl overflow-hidden flex flex-col group"
            >
              {/* Image Banner */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={dept.image}
                  alt={dept.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded">
                  {dept.category}
                </span>
                <div className="absolute bottom-3 left-3 right-3 text-white bg-slate-900/90 p-2 rounded-lg flex items-center space-x-2 border border-slate-800">
                  <div className="p-1 bg-white rounded">
                    {getIcon(dept.iconName)}
                  </div>
                  <span className="text-xs font-semibold text-slate-200 truncate">
                    Lead: {dept.doctorInCharge}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-2">
                    {dept.shortDesc}
                  </p>

                  {/* Highlights list */}
                  <div className="mt-4 space-y-1.5">
                    {dept.treatments.slice(0, 3).map((treatment, idx) => (
                      <div key={idx} className="flex items-center text-xs text-slate-700 font-medium">
                        <CheckCircle className="w-3.5 h-3.5 text-teal-600 mr-2 shrink-0" />
                        <span className="truncate">{treatment}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedDept(dept)}
                    className="text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center space-x-1"
                  >
                    <span>View Protocol</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href="#contact"
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-sky-700 hover:bg-sky-800 border border-sky-800"
                  >
                    Book Specialist
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Department Detail Modal */}
      {selectedDept && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-300 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedDept(null)}
              className="absolute top-5 right-5 p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2.5 bg-slate-100 border border-slate-200 rounded-xl">
                {getIcon(selectedDept.iconName)}
              </div>
              <div>
                <span className="text-xs font-bold text-sky-700 uppercase">
                  {selectedDept.category} Department
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  {selectedDept.name}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {selectedDept.fullDesc}
            </p>

            <div className="space-y-4 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Key Treatments Offered
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedDept.treatments.map((t, i) => (
                  <div key={i} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 flex items-center">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
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
                  <div key={i} className="p-2.5 bg-sky-50 border border-sky-200 rounded-lg text-xs font-semibold text-sky-950 flex items-center">
                    <Stethoscope className="w-4 h-4 text-sky-700 mr-2 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Head of Department</p>
                <p className="text-sm font-bold text-white">{selectedDept.doctorInCharge}</p>
              </div>
              <a
                href="#contact"
                onClick={() => setSelectedDept(null)}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-lg text-xs font-bold text-white border border-sky-700"
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
