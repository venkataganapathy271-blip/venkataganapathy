"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight, Activity } from "lucide-react";
import type { HospitalInfoDoc, SiteSettingsDoc } from "@/lib/data";

interface HeaderProps {
  hospitalInfo: HospitalInfoDoc;
  siteSettings: SiteSettingsDoc;
  isSolid?: boolean;
}

export default function Header({ hospitalInfo, siteSettings, isSolid = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const effectiveScrolled = isScrolled || isSolid;

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Toggle background/pill state
      setIsScrolled(currentScrollY > 20);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false); // Scrolling down
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);  // Scrolling up
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = siteSettings.navLinks;

  return (
    <header
      id="main-navbar"
      className={cn(
        "fixed w-full z-50 transition-all duration-700 ease-in-out",
        !isVisible && "translate-y-[-100%]",
        isScrolled
          ? "top-2 px-2 md:px-4"
          : "top-0 px-0"
      )}
    >
      <div
        className={cn(
          "mx-auto flex justify-between items-center transition-all duration-700",
          effectiveScrolled
            ? "max-w-[85rem] bg-white/95 backdrop-blur-md shadow-lg rounded-full px-6 md:px-8 py-3 md:py-3.5 border border-slate-200/60"
            : "max-w-7xl px-4 py-5 bg-transparent"
        )}
      >
        <a href="#home" className="transition-all duration-500 flex items-center gap-2.5">
          <div className={cn(
            "relative w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 shrink-0 bg-white ring-2",
            effectiveScrolled ? "ring-transparent shadow-sm" : "ring-white/20 shadow-lg"
          )}>
            <img
              src={hospitalInfo.logo}
              alt={`${hospitalInfo.name} Logo`}
              className="absolute w-[280%] max-w-none h-auto left-1/2 -translate-x-1/2"
              style={{ top: '-18%' }}
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className={cn(
              "text-[16px] md:text-[18px] tracking-tight transition-colors duration-500 font-black",
              effectiveScrolled
                ? "bg-clip-text text-transparent bg-gradient-to-r from-[#1e293b] to-[#588356]"
                : "text-white drop-shadow-md"
            )}>
              {hospitalInfo.name}
            </span>
            <span className={cn(
              "text-[8.5px] md:text-[9px] font-extrabold uppercase tracking-[0.2em] transition-colors duration-500 mt-1",
              effectiveScrolled ? "text-[#588356]" : "text-white/90"
            )}>
              {hospitalInfo.subtitle}
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center space-x-8 font-bold text-[11px] uppercase tracking-[0.1em]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "relative transition-colors duration-300 hover:text-[#588356] after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-0 after:h-[2px] after:rounded-full after:bg-[#588356] after:transition-all hover:after:w-full",
                effectiveScrolled ? "text-slate-700" : "text-white/90"
              )}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4 md:gap-6">
          <a href="#contact" className={cn(
            "hidden md:inline-flex items-center space-x-2 px-6 py-2.5 rounded-full font-bold text-[10px] uppercase tracking-widest transition-all duration-300",
            effectiveScrolled
              ? "bg-slate-900 text-white hover:bg-[#588356] shadow-md"
              : "bg-white/15 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-slate-900"
          )}>
            <span>Book Appointment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <button
            className={cn(
              "md:hidden p-2 transition-colors",
              effectiveScrolled ? "text-slate-900" : "text-white"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#FAFAFE] z-50 flex flex-col items-center justify-center gap-8 animate-in fade-in duration-500">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-8 right-8 p-3 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[24px] font-black text-slate-800 hover:text-[#588356] transition-colors tracking-tight"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-6 flex items-center space-x-2 bg-slate-900 text-white px-8 py-3.5 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-[#588356] transition-all"
          >
            <span>Book Appointment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </header>
  );
}
