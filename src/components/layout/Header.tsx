"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Activity } from "lucide-react";
import { HOSPITAL_INFO } from "@/data/hospitalData";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home", active: true },
    { name: "About", href: "#about" },
    { name: "Services", href: "#departments" },
    { name: "Symptom Finder", href: "#symptom-checker" },
    { name: "Doctors", href: "#doctors" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "pt-0 px-0" : "pt-2 px-2"
      }`}
    >
      {/* Heavy Glassmorphism Header with tight px-2 horizontal padding */}
      <div
        className={`mx-auto flex items-center justify-between transition-all duration-300 ${
          isScrolled
            ? "w-full max-w-full h-16 bg-[#FAFAFE]/90 backdrop-blur-xl rounded-none px-2 shadow-sm border-b border-slate-200/80"
            : "w-full bg-[#FAFAFE]/90 backdrop-blur-xl rounded-full px-2 py-2 shadow-sm border border-white/80"
        }`}
      >
        {/* Logo (Aligned tight to left edge with px-2) */}
        <a href="#home" className="flex items-center space-x-2 transition-all">
          <div className="w-7 h-7 rounded-full bg-[#A8D0A6] text-slate-900 flex items-center justify-center font-bold">
            <Activity className="w-3.5 h-3.5 text-slate-900" />
          </div>
          <span className="text-base font-black text-slate-900 tracking-tight">
            {HOSPITAL_INFO.name}
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-7 text-xs font-bold text-slate-800">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`transition-colors ${
                link.active ? "text-[#588356] font-extrabold" : "hover:text-[#588356]"
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Sage Green Pill Button CTA (Aligned tight to right edge with px-2) */}
        <div className="flex items-center space-x-2">
          <a
            href="#contact"
            className={
              isScrolled
                ? "hidden sm:inline-flex items-center justify-center space-x-2 bg-[#A8D0A6] hover:bg-[#96c494] text-[#101827] font-black px-6 h-9 text-[10px] tracking-widest uppercase rounded-full transition-transform hover:scale-105 shadow-lg shadow-[#A8D0A6]/20"
                : "hidden sm:inline-flex items-center space-x-2 px-4 py-1.5 bg-[#A8D0A6] hover:bg-[#96C494] text-slate-900 text-xs font-bold rounded-full transition-all"
            }
          >
            <span>Book Appointment</span>
            <div className="w-4 h-4 rounded-full bg-slate-900 flex items-center justify-center">
              <ArrowRight className="w-2.5 h-2.5 text-white" />
            </div>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full text-slate-700 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-[#FAFAFE]/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-slate-200 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-bold text-slate-800 py-1.5"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full mt-2 flex items-center justify-center space-x-2 px-4 py-2 bg-[#A8D0A6] text-slate-900 text-xs font-bold rounded-full"
          >
            <span>Book Appointment</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      )}
    </header>
  );
}
