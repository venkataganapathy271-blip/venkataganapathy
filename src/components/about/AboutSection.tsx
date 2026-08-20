"use client";

import React from "react";
import { HeartPulse, Target, Shield, Compass, Heart, Eye } from "lucide-react";
import { HOSPITAL_INFO } from "@/data/hospitalData";

export default function AboutSection() {
  const pillars = [
    {
      title: "1-on-1 Dedicated Therapy",
      desc: "Undivided senior specialist care by Dr. Maruti Rao.",
      icon: <HeartPulse className="w-4 h-4 text-[#588356]" />,
    },
    {
      title: "Evidence-Based Modalities",
      desc: "FDA-approved Electrotherapy, Traction & NMES.",
      icon: <Target className="w-4 h-4 text-[#588356]" />,
    },
    {
      title: "Non-Surgical Disc Care",
      desc: "Decompression for herniated discs.",
      icon: <Shield className="w-4 h-4 text-[#588356]" />,
    },
    {
      title: "Personalized Roadmap",
      desc: "Custom exercise & gait rehabilitation.",
      icon: <Compass className="w-4 h-4 text-[#588356]" />,
    },
  ];

  return (
    <section id="about" className="py-10 sm:py-14 bg-[#FAFAFE]">
      <div className="max-w-7xl mx-auto px-2">
        
        {/* Main Grid: Responsive 1-col on Mobile, 12-col on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: Tall Vertical Video Media Card (Mobile-Optimized Height) */}
          <div className="lg:col-span-4 relative flex flex-col">
            <div className="relative w-full h-[340px] sm:h-[420px] lg:h-full lg:min-h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 bg-slate-950 flex flex-col justify-between p-4 sm:p-5">
              
              {/* Live Background Video */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              >
                <source src="/6023241-uhd_3840_2160_25fps.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-slate-950/40" />

              {/* Top Badges Overlay */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>• LIVE REHAB</span>
                </div>

                <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-bold">
                  <Eye className="w-3.5 h-3.5 text-white" />
                  <span>8,500+</span>
                </div>
              </div>

              {/* Bottom Large Text Overlay */}
              <div className="relative z-10 space-y-1">
                <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight">
                  Heal with Senior <br />
                  <span className="text-[#A8D0A6]">Physio Specialists</span>
                </p>
                <p className="text-[11px] sm:text-xs text-slate-300 font-medium pt-0.5">
                  Established 2015 • Reg. No: 75/2015
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Narrative Header + 3-Card Bento Grid */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
            
            {/* Header Narrative */}
            <div className="space-y-3.5">
              {/* Top Pill Badges Row */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#EBF5EA] border border-[#A8D0A6] text-[#588356] text-xs font-bold uppercase">
                  <span>About Clinic</span>
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center space-x-2 px-3.5 py-1 bg-[#EBF5EA] text-slate-900 text-xs font-extrabold rounded-full hover:bg-[#d8edd6] transition-all border border-[#A8D0A6]"
                >
                  <span>Our History</span>
                </a>
              </div>

              {/* Main Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-[1.18]">
                We believe in the <br className="hidden sm:inline" />
                <span className="text-[#588356]">transformative power</span> of <br className="hidden sm:inline" />
                modern physical rehab
              </h2>

              {/* Subtitle Paragraph */}
              <p className="text-slate-600 leading-relaxed text-xs sm:text-sm max-w-2xl">
                Founded under the leadership of <strong className="text-slate-900 font-semibold">{HOSPITAL_INFO.chiefDoctor} ({HOSPITAL_INFO.doctorQualification})</strong>, {HOSPITAL_INFO.name} ({HOSPITAL_INFO.regNo}) has served Hanuman Junction for over 10 years. By combining electrotherapy, computerized traction, NMES paralysis re-education, and manual joint mobilization, we help patients overcome severe pain without surgery.
              </p>
            </div>

            {/* Bottom 3 Bento Grid Cards */}
            <div className="grid grid-cols-2 md:grid-cols-12 gap-3 sm:gap-4.5 items-stretch">
              
              {/* Card 1: 4-Pillars List Card */}
              <div className="col-span-2 md:col-span-5 bg-[#FAFAFE] p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl border border-slate-200 flex flex-col justify-center">
                <div className="grid grid-cols-2 md:grid-cols-1 gap-x-3 gap-y-4">
                  {pillars.map((pillar, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row items-start space-y-2 sm:space-y-0 sm:space-x-3 p-1.5 sm:p-2 rounded-xl hover:bg-[#EBF5EA]/60 transition-colors">
                      <div className="p-2 bg-[#EBF5EA] rounded-lg shrink-0 border border-[#A8D0A6]/60">
                        {pillar.icon}
                      </div>
                      <div>
                        <h4 className="text-[11px] sm:text-xs font-bold text-slate-900 leading-snug">
                          {pillar.title}
                        </h4>
                        <p className="text-[10px] text-slate-500 leading-tight pt-1 sm:pt-0.5">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2: Sage Green Accent Quote Card */}
              <div className="col-span-1 md:col-span-4 bg-[#A8D0A6] p-4 sm:p-5 rounded-2xl sm:rounded-3xl flex flex-col justify-between space-y-4 sm:space-y-5 border border-[#A8D0A6] relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white text-[#588356] flex items-center justify-center border border-white shrink-0">
                    <Heart className="w-3 h-3 sm:w-4 sm:h-4 fill-[#588356]" />
                  </div>
                </div>

                <p className="text-[12px] sm:text-base md:text-lg font-black text-slate-900 leading-snug">
                  "Physiotherapy has restored mobility to 8,500+ patients without surgery."
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 pt-1">
                  <img
                    className="w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-full object-cover ring-2 ring-white shrink-0"
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200"
                    alt="Dr. Maruti Rao Pulavarthi"
                  />
                  <div>
                    <h5 className="text-[10px] sm:text-xs font-black text-slate-900 leading-tight">
                      {HOSPITAL_INFO.chiefDoctor}
                    </h5>
                    <p className="text-[8px] sm:text-[10px] font-semibold text-slate-800">
                      Chief Physio (B.P.T)
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3: Secondary Video Media Card */}
              <div className="col-span-1 md:col-span-3 relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 min-h-[160px] sm:min-h-[190px] flex flex-col justify-between p-2.5 sm:p-3.5">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                >
                  <source src="/5991800-uhd_3840_2160_25fps.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-slate-950/40" />

                {/* Top Badge */}
                <div className="relative z-10 flex justify-end">
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-[8px] sm:text-[10px] font-bold">
                    Reg #75/2015
                  </span>
                </div>

                {/* Bottom Floating White Pill Badge */}
                <div className="relative z-10">
                  <div className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full bg-white text-slate-900 text-[9px] sm:text-[10px] font-extrabold text-center border border-white leading-tight">
                    Non-Surgical <br className="sm:hidden" /> Care
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
