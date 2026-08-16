"use client";

import React from "react";
import { Activity, Phone, Mail, MapPin, ShieldCheck, ArrowUp, ChevronRight } from "lucide-react";
import { HOSPITAL_INFO } from "@/data/hospitalData";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#FAFAFE]/90 backdrop-blur-xl text-slate-400 text-xs relative">
      
      {/* Upper Footer CTA Strip */}
      <div className="bg-[#FAFAFE]/90 backdrop-blur-xl py-8 text-white">
        <div className="max-w-7xl mx-auto px-2 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <h3 className="text-lg font-bold tracking-tight">
              Need Immediate Physiotherapy Advice or Emergency Rehab?
            </h3>
            <p className="text-xs text-slate-300">
              Our clinical coordinator is available to assist you with appointment bookings and OPD queries.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href={`tel:${HOSPITAL_INFO.emergencyPhone}`}
              className="px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 font-bold text-xs text-white border border-emerald-700 flex items-center space-x-2 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call {HOSPITAL_INFO.emergencyPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-2 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        
        {/* Col 1: Brand Info */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-sky-600 flex items-center justify-center text-white">
              <Activity className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-lg font-bold text-white block leading-tight">
                {HOSPITAL_INFO.name}
              </span>
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wide block">
                {HOSPITAL_INFO.subtitle}
              </span>
            </div>
          </div>

          <p className="text-slate-400 leading-relaxed text-xs">
            A state-of-the-art super-speciality hospital dedicated to non-surgical joint rehabilitation, computerized spine decompression, sports injury science, and post-stroke movement recovery.
          </p>

          <div className="pt-2 flex items-center space-x-2 text-teal-400 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>NABH & Quality Healthcare Accredited</span>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2">
            {[
              { label: "Home", href: "#home" },
              { label: "About Hospital", href: "#about" },
              { label: "Departments", href: "#departments" },
              { label: "Symptom Finder", href: "#symptom-checker" },
              { label: "Our Doctors", href: "#doctors" },
              { label: "Facilities", href: "#facilities" },
              { label: "Patient Reviews", href: "#testimonials" },
              { label: "Book Consultation", href: "#contact" },
            ].map((item, idx) => (
              <li key={idx}>
                <a href={item.href} className="hover:text-teal-400 transition-colors flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-slate-600" />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Departments */}
        <div className="lg:col-span-3 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Clinical Departments</h4>
          <ul className="space-y-2">
            {[
              "Orthopedic & Joint Rehab",
              "Spine & Slipped Disc Decompression",
              "Neurological Paralysis Rehab",
              "Sports Injury & Performance",
              "Post-Surgical Mobility Care",
              "Pediatric & Geriatric Therapy",
              "High-Intensity Laser Therapy (HILT)",
              "Digital Gait Analysis Studio",
            ].map((dept, idx) => (
              <li key={idx} className="flex items-center">
                <ChevronRight className="w-3 h-3 mr-1 text-slate-600 shrink-0" />
                <span className="truncate">{dept}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Contact & Hours */}
        <div className="lg:col-span-3 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Contact & OPD Location</h4>
          
          <div className="space-y-2.5">
            <div className="flex items-start space-x-2.5">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span>{HOSPITAL_INFO.address}</span>
            </div>

            <div className="flex items-center space-x-2.5">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-200 font-semibold">{HOSPITAL_INFO.emergencyPhone}</span>
            </div>

            <div className="flex items-center space-x-2.5">
              <Mail className="w-4 h-4 text-teal-400 shrink-0" />
              <span>{HOSPITAL_INFO.email}</span>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-[11px] font-semibold text-slate-300">OPD Consultation Hours:</p>
            <p className="text-[11px] text-slate-400 mt-0.5">{HOSPITAL_INFO.timing}</p>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 py-6 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-[11px] text-slate-500">
            © {new Date().getFullYear()} {HOSPITAL_INFO.name} {HOSPITAL_INFO.subtitle}. All rights reserved.
          </p>

          <div className="flex items-center space-x-6 text-[11px] text-slate-500">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms & Conditions</a>
            <a href="#" className="hover:text-slate-300">Patient Rights</a>

            <button
              onClick={scrollToTop}
              className="p-2 bg-slate-900 hover:bg-slate-800 text-teal-400 border border-slate-800 rounded-lg transition-colors ml-4"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
}
