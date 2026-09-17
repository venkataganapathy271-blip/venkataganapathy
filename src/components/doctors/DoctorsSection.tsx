"use client";

import React, { useState } from "react";
import {
  Award,
  Calendar,
  Clock,
  CheckCircle,
  Sparkles,
  MessageSquare,
  Building2,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Stethoscope,
  HeartHandshake,
  X,
} from "lucide-react";
import type { DoctorDoc, HospitalInfoDoc } from "@/lib/data";
import { TeamRevealGrid, TeamRevealMember } from "@/components/ui/team-reveal-grid";

interface DoctorsSectionProps {
  doctors: DoctorDoc[];
  hospitalInfo: HospitalInfoDoc;
}

export default function DoctorsSection({ doctors, hospitalInfo }: DoctorsSectionProps) {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);

  const leadDoctor = doctors[0];

  if (!leadDoctor) return null;

  const selectedDoctor = selectedDoctorId ? doctors.find(d => d.id === selectedDoctorId) : null;

  const teamMembers: TeamRevealMember[] = doctors.map((doc) => ({
    id: doc.id,
    name: doc.name,
    role: doc.role,
    qualification: doc.qualification,
    regNo: doc.regNo,
    expertise: doc.expertise,
    image: doc.image,
    imageClassName: doc.imageClassName,
    accent: doc.accent,
  }));

  return (
    <section id="doctors" className="py-10 sm:py-14 bg-[#FAFAFE]">
      <div className="max-w-7xl mx-auto px-2">

        {/* Founder Section - Premium L-Shape Editorial Layout */}
        <div className="relative mb-16 py-6 sm:py-8 lg:min-h-[580px]">

          {/* DESKTOP ONLY: L-Shaped Image Container using overlay masking for smooth corners */}
          <div
            className="hidden lg:block absolute top-6 left-0 w-full h-[calc(100%-48px)] z-0 cursor-pointer group"
            onClick={() => setSelectedDoctorId(leadDoctor.id)}
          >
            {/* Main Image - full rectangle, rounded on all 4 corners */}
            <div className="absolute top-0 left-[70px] right-0 bottom-0 rounded-[40px] overflow-hidden bg-[#E8ECF0]">
              <img
                src={leadDoctor.image}
                alt={`${leadDoctor.name} - Founder`}
                className="w-full h-full object-contain object-[93%_bottom] opacity-100 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-80" />
            </div>

            {/* Overlay 1: Covers bottom-left of image (0 to 58%, from 100px down) */}
            {/* This creates the L-shape cutout for the text area */}
            <div
              className="absolute top-[100px] left-[70px] bottom-0 bg-[#FAFAFE] pointer-events-none"
              style={{ right: '42%' }}
            />

            {/* Overlay 2: Smooth INNER corner (concave curve at top-right of text area) */}
            {/* A #FAFAFE box with rounded-tr creates the smooth concave curve */}
            <div
              className="absolute bg-[#FAFAFE] pointer-events-none rounded-tr-[32px]"
              style={{ top: '68px', left: '70px', right: '42%', height: '64px' }}
            />

            {/* Overlay 3: Top-left strip (covers from left:0 to left:70px fully) */}
            <div className="absolute top-0 left-0 bottom-0 w-[70px] bg-[#FAFAFE] pointer-events-none" />

            {/* Bottom Left Content inside visible Photo area */}
            <div className="absolute bottom-6 z-20 pointer-events-none" style={{ left: 'calc(58% + 24px)' }}>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                {leadDoctor.name}
              </h3>
              <p className="text-[#A8D0A6] text-xs font-bold mt-1 tracking-wider uppercase">View Clinical Profile</p>
            </div>

            {/* CSS Magic: SVG Overlay for Flawless 3-Corner Smooth Squircle Cutout (bottom-right) */}
            <div className="absolute bottom-0 right-0 w-[92px] h-[92px] pointer-events-none z-10 text-[#FAFAFE]">
              <svg viewBox="0 0 92 92" fill="currentColor" className="w-full h-full">
                <path d="M 92 0 A 16 16 0 0 1 76 16 L 40 16 A 24 24 0 0 0 16 40 L 16 76 A 16 16 0 0 1 0 92 L 92 92 Z" />
              </svg>
            </div>

            {/* Squircle Arrow Button */}
            <div className="absolute bottom-[8px] right-[8px] z-20 pointer-events-none">
              <div className="w-[60px] h-[60px] rounded-[20px] bg-[#1c0707] text-white flex items-center justify-center font-black transition-all group-hover:bg-[#588356] shadow-sm">
                <ArrowUpRight className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* The Content Grid (on top) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-14 relative z-10 pointer-events-none">

            {/* Left Column: Quote Icon & Text (Moves below image on mobile) */}
            <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col pointer-events-auto mt-8 lg:mt-0">

              {/* Double Quotes Icon (Top Left, strictly inside the 70x100px space left by clip-path on desktop) */}
              <div className="w-[70px] h-[100px] hidden lg:flex items-start justify-start pt-2">
                <svg
                  className="w-12 h-12 text-[#588356]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Text starts exactly where the top image extension ends (100px) */}
              <div className="text-slate-600 text-[13px] sm:text-base leading-relaxed font-medium">
                <p className="text-[22px] sm:text-2xl lg:text-3xl font-extrabold text-slate-900 lg:text-slate-900 leading-snug tracking-tight mb-5 sm:mb-6 px-1 lg:px-0">
                  <span className="lg:hidden text-[#588356]">"</span>Our mission has always been to push the boundaries of clinical care and physical recovery innovation.<span className="lg:hidden text-[#588356]">"</span>
                </p>
                <div className="space-y-4 bg-white p-5 sm:p-6 rounded-[24px] shadow-sm border border-slate-100 lg:bg-transparent lg:p-0 lg:shadow-none lg:border-none lg:space-y-5">
                  <p>
                    We believe that great evidence-based therapy and cutting-edge non-surgical technology have the power to transform lives and restore complete mobility to every patient. Our team is committed to delivering exceptional rehabilitation experiences that not only meet but exceed our patients&apos; expectations.
                  </p>
                  <p>
                    As we continue to grow and evolve, our focus remains on staying ahead of advanced physical rehab trends and embracing new non-invasive challenges. We are passionate about what we do, and our dedication to clinical excellence is reflected in every recovery we guide.
                  </p>
                </div>
              </div>

              {/* Founder Name & Designation */}
              <div className="pt-2 lg:border-t lg:border-slate-200 inline-block w-fit mt-6 lg:mt-8 px-2 lg:px-0 text-center lg:text-left self-center lg:self-start">
                <h3 className="text-lg sm:text-xl font-black tracking-wider text-slate-900 uppercase mt-4">
                  {leadDoctor.name}
                </h3>
                <p className="text-[11px] sm:text-xs font-extrabold text-[#588356] mt-1 uppercase tracking-widest">
                  {leadDoctor.title}
                </p>
              </div>

            </div>

            {/* MOBILE ONLY: Normal Founder Portrait (Moves to top on mobile) */}
            <div className="order-1 lg:hidden col-span-1 flex justify-center pointer-events-auto">
              <div
                className="group relative w-full max-w-md aspect-[4/4.8] sm:aspect-[4/5] rounded-[32px] sm:rounded-[40px] rounded-tl-[80px] overflow-hidden bg-slate-900 cursor-pointer transition-all duration-500 border-[6px] border-white"
                onClick={() => setSelectedDoctorId(leadDoctor.id)}
              >
                <img
                  src={leadDoctor.image}
                  alt={`${leadDoctor.name} - Founder`}
                  className="w-full h-full object-cover object-top opacity-100 group-hover:scale-105 transition-all duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-80" />

                <div className="absolute bottom-6 left-6 right-24 z-20 pointer-events-none">
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                    {leadDoctor.name}
                  </h3>
                  <p className="text-[#A8D0A6] text-xs font-bold mt-1 tracking-wider uppercase">View Clinical Profile</p>
                </div>

                <div className="absolute bottom-0 right-0 w-[92px] h-[92px] pointer-events-none z-10 text-[#FAFAFE]">
                  <svg viewBox="0 0 92 92" fill="currentColor" className="w-full h-full">
                    <path d="M 92 0 A 16 16 0 0 1 76 16 L 40 16 A 24 24 0 0 0 16 40 L 16 76 A 16 16 0 0 1 0 92 L 92 92 Z" />
                  </svg>
                </div>

                <div className="absolute bottom-[8px] right-[8px] z-20 pointer-events-none">
                  <div className="w-[60px] h-[60px] rounded-[20px] bg-[#1c0707] text-white flex items-center justify-center font-black transition-all group-hover:bg-[#588356] shadow-sm">
                    <ArrowUpRight className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Team Section */}
        <div className="mt-8 pt-12">

          {/* 2-Column Header - matching Services section style (Mobile Optimized) */}
          <div className="mb-8 sm:mb-10 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-12 items-end text-center lg:text-left">

            {/* Left: Big Heading */}
            <div className="lg:col-span-7">
              <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.1] sm:leading-[1.08]">
                Our Expert <br className="hidden lg:block" />Clinical Team
              </h3>
            </div>

            {/* Right: Description + Link */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start space-y-4 sm:space-y-5 mt-2 lg:mt-0">
              <p className="text-slate-600 text-xs sm:text-base leading-relaxed max-w-md lg:max-w-none">
                Experienced physiotherapists and specialist consultant doctors, each dedicated to guiding your complete recovery journey.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-[11px] sm:text-sm font-black text-slate-900 hover:text-[#588356] transition-colors border border-slate-200 lg:border-transparent px-4 py-2 lg:px-0 lg:py-0 rounded-full"
              >
                <span>Book a Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#588356]" />
              </a>
            </div>

          </div>

          <TeamRevealGrid members={teamMembers} onMemberClick={setSelectedDoctorId} />
        </div>

      </div>

      {/* Doctor Clinical Profile & OPD Hours Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedDoctorId(null)}
              className="absolute top-5 right-5 p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-5 pb-5 border-b border-slate-200">
              <img
                src={selectedDoctor.image}
                alt={selectedDoctor.name}
                className="w-20 h-20 rounded-2xl object-cover border border-slate-200"
              />
              <div className="text-center sm:text-left space-y-1">
                {selectedDoctor.role && (
                  <span className="px-3 py-0.5 bg-[#EBF5EA] text-[#588356] border border-[#A8D0A6]/60 text-xs font-extrabold rounded-full inline-block uppercase">
                    {selectedDoctor.role}
                  </span>
                )}
                <h3 className="text-xl font-black text-slate-900">
                  {selectedDoctor.name}
                </h3>
                <p className="text-xs font-semibold text-slate-500">
                  {selectedDoctor.qualification} {selectedDoctor.regNo ? `• ${selectedDoctor.regNo}` : ''}
                </p>
              </div>
            </div>

            {/* Doctor Bio / Expertise */}
            {selectedDoctor.expertise && (
              <div className="mb-6">
                <p className="text-[13px] sm:text-sm text-slate-600 font-medium leading-relaxed">
                  {selectedDoctor.expertise}
                </p>
              </div>
            )}

            {/* Specialization Tags inside Modal */}
            {selectedDoctor.specializations && selectedDoctor.specializations.length > 0 && (
              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Key Clinical Specializations:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedDoctor.specializations.map((spec, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#EBF5EA] border border-[#A8D0A6]/60 rounded-xl text-xs font-bold text-slate-900 flex items-center"
                    >
                      <CheckCircle className="w-4 h-4 text-[#588356] mr-2 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* OPD Consultation Hours Bar inside Modal */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-3 text-xs mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#EBF5EA] text-[#588356] rounded-xl border border-[#A8D0A6]/60">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-medium">OPD Consultation Hours</p>
                  <p className="font-extrabold text-slate-900">{selectedDoctor.availableDays || hospitalInfo.timing}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-slate-700 font-extrabold hidden sm:flex">
                <Building2 className="w-4 h-4 text-[#588356]" />
                <span>Hanuman Junction OPD</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                onClick={() => setSelectedDoctorId(null)}
                className="flex-1 py-3 px-4 bg-[#A8D0A6] hover:bg-[#96C494] border border-[#A8D0A6] rounded-full text-xs font-black text-slate-900 text-center flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Consultation Now</span>
              </a>

              <a
                href={`https://wa.me/${hospitalInfo.whatsapp}?text=Hello%20${encodeURIComponent(selectedDoctor.name)},%20I%20want%20to%20book%20a%20physiotherapy%20consultation.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setSelectedDoctorId(null)}
                className="flex-1 py-3 px-4 bg-[#EBF5EA] hover:bg-[#d8edd6] text-slate-900 border border-[#A8D0A6] rounded-full text-xs font-extrabold text-center flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-4 h-4 text-[#588356]" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
