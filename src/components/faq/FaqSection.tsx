"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  Shield,
  PhoneCall,
  CheckCircle,
  Sparkles,
  MessageSquare,
  ArrowUpRight
} from "lucide-react";
import { HOSPITAL_INFO } from "@/data/hospitalData";

interface FaqItem {
  id: string;
  category: "Treatments" | "Appointments" | "General";
  question: string;
  answer: string;
}

const FAQS_DATA: FaqItem[] = [
  {
    id: "f1",
    category: "General",
    question: "Do I need a doctor referral before starting physical therapy at Venkata Ganapathy Physiotherapy Clinic?",
    answer:
      "No direct referral is mandatory. You can walk in or book an appointment directly with Dr. Maruti Rao Pulavarthi for a comprehensive physical evaluation and customized treatment plan.",
  },
  {
    id: "f2",
    category: "Treatments",
    question: "Is non-surgical computer traction effective for slipped disc and sciatica?",
    answer:
      "Yes! Our computerized lumbar & cervical traction decompresses pinched spinal nerves, relieves disc pressure, and reduces sciatica leg numbness without invasive surgery.",
  },
  {
    id: "f3",
    category: "Treatments",
    question: "How long does stroke paralysis recovery usually take?",
    answer:
      "Recovery varies by severity. With our daily Neuromuscular Electrical Stimulation (NMES) and parallel walking bar gait retraining, most stroke patients show significant motor improvement within 4 to 12 weeks.",
  },
  {
    id: "f4",
    category: "Appointments",
    question: "What are the hospital OPD timings in Hanuman Junction?",
    answer:
      "Venkata Ganapathy Physiotherapy Clinic operates Monday to Sunday from 10:00 AM to 9:00 PM. Prior appointment booking is recommended for minimum waiting time.",
  },
  {
    id: "f5",
    category: "General",
    question: "Are home physiotherapy services available for paralysis patients?",
    answer:
      "Yes, for severe paralysis or non-ambulatory post-operative cases, home visit consultations can be scheduled based on location and doctor availability.",
  },
];

export default function FaqSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [openId, setOpenId] = useState<string>("f2");

  const filteredFaqs =
    activeCategory === "All"
      ? FAQS_DATA
      : FAQS_DATA.filter((f) => f.category === activeCategory);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? "" : id);
  };

  return (
    <section id="faq" className="py-12 sm:py-16 bg-[#FAFAFE]">
      <div className="max-w-7xl mx-auto px-2">
        
        {/* Header - Editorial Style (Mobile Optimized) */}
        <div className="mb-8 sm:mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 pb-6 lg:pb-8 text-center lg:text-left">
          <div className="flex flex-col items-center lg:items-start lg:mb-0">
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2 sm:mb-3 block">
              Patient Help Center
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.1] sm:leading-[1.08] mb-3 sm:mb-4">
              Frequently Asked <br className="hidden lg:block" /> Questions
            </h2>
            <p className="text-slate-600 text-xs sm:text-base font-medium max-w-md lg:max-w-xl">
              Everything you need to know about our non-surgical treatment protocols, OPD schedules, and recovery plans.
            </p>
          </div>

          {/* Category Pills (Scrollable on mobile) */}
          <div className="flex overflow-x-auto lg:overflow-visible flex-nowrap lg:flex-wrap items-center justify-start lg:justify-end gap-2 shrink-0 w-full lg:w-auto pb-2 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {["All", "Treatments", "Appointments", "General"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-5 py-2 lg:py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-[#588356] text-white border-[#588356] shadow-sm"
                    : "bg-transparent text-slate-600 border-slate-200 hover:border-[#588356] hover:text-[#588356]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Clean Accordion */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`bg-transparent rounded-[20px] transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border border-[#A8D0A6] shadow-sm"
                      : "border border-slate-200 hover:border-[#A8D0A6]/50"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 text-left flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-[#588356]">
                        <span>0{idx + 1}</span>
                        <span>•</span>
                        <span>{faq.category}</span>
                      </div>
                      <h3 className={`font-bold text-base sm:text-lg leading-snug transition-colors ${isOpen ? 'text-[#588356]' : 'text-slate-900'}`}>
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? "bg-[#588356] text-white rotate-180"
                          : "bg-[#FAFAFE] text-slate-400 border border-slate-200"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </button>

                  <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm font-medium leading-relaxed border-t border-slate-100">
                        <p className="pt-3">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Information Cards */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Card 1: Emergency & Quick Contact (Editorial Box) */}
            <div className="bg-[#E8ECF0] rounded-[24px] p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-bl-full opacity-50 pointer-events-none transition-transform duration-500 group-hover:scale-110" />
              
              <div className="relative z-10 space-y-5">
                <div className="w-11 h-11 bg-white text-[#588356] rounded-xl flex items-center justify-center shadow-sm">
                  <PhoneCall className="w-5 h-5 stroke-[2]" />
                </div>
                
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider block text-[#588356] mb-1">
                    OPD &amp; REHAB ASSISTANCE
                  </span>
                  <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
                    Have a Specific Question?
                  </h4>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  Contact our clinical coordinator directly for immediate OPD appointment booking, home visit requests, or stroke recovery evaluations.
                </p>

                <div className="space-y-2 pt-1">
                  <a
                    href={`tel:${HOSPITAL_INFO.primaryPhone}`}
                    className="w-full py-3 px-5 bg-[#588356] hover:bg-[#4a6e49] text-white rounded-full font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-between shadow-sm"
                  >
                    <span>Call Hotline</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={`https://wa.me/${HOSPITAL_INFO.whatsapp}?text=Hello%20Venkata%20Ganapathi%20Hospital,%20I%20have%20a%20query%20regarding%20physiotherapy.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-5 bg-white hover:bg-slate-50 text-slate-900 rounded-full font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-between shadow-sm border border-slate-200"
                  >
                    <span>WhatsApp Enquiry</span>
                    <MessageSquare className="w-3.5 h-3.5 text-[#588356]" />
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2: Patient Rights Guarantee */}
            <div className="bg-transparent border border-slate-200 p-6 rounded-[24px] hover:border-[#A8D0A6]/50 transition-colors">
              <div className="flex items-center space-x-2.5 text-slate-900 font-extrabold text-base pb-4 border-b border-slate-100">
                <Shield className="w-4 h-4 text-[#588356]" />
                <span>Patient Rights Guarantee</span>
              </div>

              <div className="space-y-3 pt-4 text-xs sm:text-sm text-slate-600 font-semibold">
                <div className="flex items-start space-x-2.5">
                  <CheckCircle className="w-4 h-4 text-[#A8D0A6] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">100% Transparent clinical treatment procedures & costs</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle className="w-4 h-4 text-[#A8D0A6] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Zero side-effect non-invasive physical therapy focus</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle className="w-4 h-4 text-[#A8D0A6] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Official Licensed Practice (Govt Reg. No: 75/2015)</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
