"use client";

import React, { useState } from "react";
import { DOCTORS, Doctor } from "@/data/hospitalData";
import { Award, Calendar, Star, Clock, UserCheck, Sparkles, X } from "lucide-react";

export default function DoctorsSection() {
  const [selectedDoc, setSelectedDoc] = useState<Doctor | null>(null);

  return (
    <section id="doctors" className="py-16 bg-[#FAFAFE]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-2">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-sky-100 border border-sky-300 text-sky-800 text-xs font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-sky-700" />
            <span>Expert Medical Team</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Meet Our Senior Physiotherapy <br className="hidden sm:inline" />
            <span className="text-sky-700">Consultants & Specialists</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Our team brings together Masters in Physiotherapy (MPT) holders with specialized expertise in spine care, neuro-rehabilitation, sports science, and orthopedic joint restoration.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {DOCTORS.map((doc) => (
            <div
              key={doc.id}
              className="bg-white border border-slate-300 rounded-2xl overflow-hidden flex flex-col group"
            >
              {/* Doctor Avatar Container */}
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover object-top"
                />
                
                {/* Rating Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900 flex items-center">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 mr-1" />
                  <span>{doc.rating}</span>
                </div>

                {/* Experience Badge */}
                <div className="absolute bottom-3 left-3 px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center">
                  <Award className="w-3.5 h-3.5 text-teal-400 mr-1.5" />
                  <span>{doc.experienceYears}+ Yrs Experience</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 block mb-1">
                    {doc.departmentName}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">
                    {doc.qualification}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-200 space-y-1 text-xs text-slate-600">
                    <p className="font-semibold text-slate-800 line-clamp-1">
                      {doc.specialization}
                    </p>
                    <div className="flex items-center text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-sky-600 mr-1.5 shrink-0" />
                      <span className="truncate">{doc.availableDays}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedDoc(doc)}
                    className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 transition-colors text-center"
                  >
                    Profile
                  </button>
                  <a
                    href="#contact"
                    className="flex-1 py-2 px-3 bg-sky-700 hover:bg-sky-800 border border-sky-800 rounded-lg text-xs font-bold text-white text-center flex items-center justify-center"
                  >
                    <Calendar className="w-3.5 h-3.5 mr-1" />
                    Book
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Doctor Profile Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-300 max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedDoc(null)}
              className="absolute top-5 right-5 p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6 pb-6 border-b border-slate-200">
              <img
                src={selectedDoc.image}
                alt={selectedDoc.name}
                className="w-24 h-24 rounded-xl object-cover border border-slate-300"
              />
              <div className="text-center sm:text-left space-y-1">
                <span className="px-2.5 py-0.5 bg-sky-100 text-sky-800 text-xs font-bold rounded">
                  {selectedDoc.departmentName}
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  {selectedDoc.name}
                </h3>
                <p className="text-xs font-semibold text-slate-500">
                  {selectedDoc.qualification}
                </p>
                <p className="text-xs text-teal-700 font-bold flex items-center justify-center sm:justify-start pt-1">
                  <UserCheck className="w-3.5 h-3.5 mr-1" />
                  {selectedDoc.patientsCount}+ Successful Patient Rehabs
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">
                  Specialist Expertise
                </h4>
                <p className="p-3 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800">
                  {selectedDoc.specialization}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">
                  Doctor Biography & Clinical Focus
                </h4>
                <p className="leading-relaxed text-slate-700">
                  {selectedDoc.bio}
                </p>
              </div>

              <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg flex items-center justify-between text-xs text-teal-950 font-bold">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-teal-700" />
                  Consultation Hours:
                </span>
                <span>{selectedDoc.availableDays}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href="#contact"
                onClick={() => setSelectedDoc(null)}
                className="w-full py-3 bg-sky-700 hover:bg-sky-800 border border-sky-800 rounded-lg text-xs font-bold text-white text-center"
              >
                Schedule Consultation With {selectedDoc.name.split(" ")[1]}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
