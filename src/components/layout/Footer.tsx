"use client";

import React from "react";
import { Activity, Phone, Mail, MapPin, ShieldCheck, ArrowUp, ChevronRight } from "lucide-react";
import { HOSPITAL_INFO } from "@/data/hospitalData";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#FAFAFE] text-slate-600 text-xs relative border-t border-slate-200 rounded-t-[2.5rem] md:rounded-t-[4rem] overflow-hidden">
      
      {/* Footer Header - Brand & CTA */}
      <div className="pt-8 sm:pt-10 pb-8 border-b border-slate-200 mx-4 sm:mx-8 mb-8">
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Top Left: Brand Info */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full bg-white ring-2 ring-slate-200/50 shadow-sm shrink-0 flex items-center justify-center overflow-hidden">
              <img 
                src="/Logo.png" 
                alt="Venkata Ganapathy Logo" 
                className="absolute w-[280%] max-w-none h-auto left-1/2 -translate-x-1/2" 
                style={{ top: '-18%' }} 
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-extrabold text-[#588356] uppercase tracking-widest leading-tight">
                {HOSPITAL_INFO.subtitle}
              </span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
                {HOSPITAL_INFO.name}
              </span>
            </div>
          </div>

          {/* Top Right: Simple CTA */}
          <div className="flex items-center space-x-2.5 bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200/60">
            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest hidden sm:block">
              Emergency:
            </p>
            <a
              href={`tel:${HOSPITAL_INFO.emergencyPhone}`}
              className="inline-flex items-center space-x-1.5 text-slate-950 hover:text-[#588356] font-black transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#588356] stroke-[3]" />
              <span className="text-sm tracking-tight">{HOSPITAL_INFO.emergencyPhone}</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-2 pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
        
        {/* Col 1: About & Socials */}
        <div className="lg:col-span-4 space-y-6 lg:pr-8">
          <p className="text-slate-700 leading-loose text-sm font-semibold">
            A state-of-the-art super-speciality hospital dedicated to non-surgical joint rehabilitation, computerized spine decompression, sports injury science, and post-stroke movement recovery.
          </p>

          <div className="inline-flex items-center space-x-2 text-[#588356] font-black text-xs bg-[#EBF5EA] px-4 py-2.5 rounded-full shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#588356] stroke-[2.5]" />
            <span>NABH & Quality Healthcare Accredited</span>
          </div>

          <div className="pt-2 flex items-center space-x-3">
            {[
              { Icon: FacebookIcon, href: "#" },
              { Icon: InstagramIcon, href: "#" },
              { Icon: TwitterIcon, href: "#" },
              { Icon: YoutubeIcon, href: "#" }
            ].map((social, idx) => (
              <a 
                key={idx} 
                href={social.href}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-400 hover:shadow-md transition-all group"
              >
                <social.Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              </a>
            ))}
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="lg:col-span-2 space-y-5">
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Quick Links</h4>
          <ul className="space-y-3.5 font-bold text-sm">
            {[
              { label: "Home", href: "#home" },
              { label: "About Hospital", href: "#about" },
              { label: "Departments", href: "#departments" },
              { label: "Our Doctors", href: "#doctors" },
              { label: "Facilities", href: "#facilities" },
              { label: "Patient Reviews", href: "#testimonials" },
              { label: "Book Consultation", href: "#contact" },
            ].map((item, idx) => (
              <li key={idx}>
                <a href={item.href} className="text-slate-600 hover:text-slate-950 transition-colors flex items-center group">
                  <ChevronRight className="w-3 h-3 mr-2 text-slate-300 group-hover:text-slate-900 transition-colors stroke-[3]" />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Departments */}
        <div className="lg:col-span-3 space-y-5">
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Clinical Departments</h4>
          <ul className="space-y-3.5 font-bold text-sm text-slate-600">
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
              <li key={idx} className="flex items-center group hover:text-slate-950 transition-colors cursor-pointer">
                <ChevronRight className="w-3 h-3 mr-2 text-slate-300 group-hover:text-slate-900 transition-colors stroke-[3] shrink-0" />
                <span className="truncate">{dept}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Contact & Hours */}
        <div className="lg:col-span-3 space-y-5">
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Contact & Location</h4>
          
          <div className="space-y-4 text-slate-600 font-bold text-sm">
            <div className="flex items-start space-x-3 group">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5 group-hover:text-slate-900 transition-colors" />
              <span className="leading-relaxed">{HOSPITAL_INFO.address}</span>
            </div>

            <div className="flex items-center space-x-3 group">
              <Phone className="w-4 h-4 text-slate-400 shrink-0 group-hover:text-slate-900 transition-colors" />
              <span className="text-slate-950 font-black text-base tracking-tight">{HOSPITAL_INFO.emergencyPhone}</span>
            </div>

            <div className="flex items-center space-x-3 group">
              <Mail className="w-4 h-4 text-slate-400 shrink-0 group-hover:text-slate-900 transition-colors" />
              <span className="hover:text-slate-950 transition-colors">{HOSPITAL_INFO.email}</span>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest">OPD Consultation Hours:</p>
            <p className="text-sm text-slate-900 mt-1.5 font-black">{HOSPITAL_INFO.timing}</p>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="pb-6 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-[11px] text-slate-400 font-semibold">
            © {new Date().getFullYear()} {HOSPITAL_INFO.name} {HOSPITAL_INFO.subtitle}. All rights reserved.
          </p>

          <div className="flex items-center space-x-6 text-[11px] text-slate-400 font-semibold">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Patient Rights</a>

            <button
              onClick={scrollToTop}
              className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-full transition-colors ml-4 border border-slate-200"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4 text-slate-900" />
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
}

