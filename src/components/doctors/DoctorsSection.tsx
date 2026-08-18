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
  ShieldCheck,
  Stethoscope,
  HeartHandshake,
  X,
} from "lucide-react";
import { HOSPITAL_INFO } from "@/data/hospitalData";
import { TeamRevealGrid, TeamRevealMember } from "@/components/ui/team-reveal-grid";

export default function DoctorsSection() {
  const [showModal, setShowModal] = useState(false);

  const leadDoctor = {
    name: "Dr. Maruthi Rao Pulavarthi",
    title: "Founder & Chief Physiotherapy Consultant",
    qualification: "B.P.T, P.G. Diploma in Sports Rehab",
    regNo: "Reg. No: APF0170",
    experience: "10+",
    patientsCount: "8,500+",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800",
    sessionImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    timing: "Monday - Sunday: 10:00 AM - 9:00 PM",
    bio: "At Venkata Ganapathi Hospital, we empower you to live a pain-free and active life. Dr. Maruthi Rao Pulavarthi (B.P.T, P.G. Diploma in Sports Rehab, Reg. No: APF0170) helps you restore movement, improve joint flexibility, and enhance overall well-being. Whether you are recovering from stroke paralysis, slipped disc, or joint replacement surgery, we are here to guide your journey.",
    specializations: [
      "Stroke & Paralysis Recovery (NMES Therapy)",
      "Slipped Disc & Sciatica Non-Surgical Traction",
      "Post-Knee & Hip Replacement Joint Mobilization",
      "Sports Muscle Strain & Ligament Conditioning",
      "Bell's Palsy & Facial Muscle Re-education",
      "Frozen Shoulder & Cervical Spine Rehab",
    ],
  };

  const teamMembers: TeamRevealMember[] = [
    {
      id: "dr-maruthi-rao",
      name: "Dr. Maruthi Rao Pulavarthi",
      role: "Founder & Director",
      qualification: "B.P.T",
      regNo: "Reg. No: APF0170",
      expertise: "Founder & Chief Clinical Director with 10+ years expertise in paralysis NMES, slipped disc traction, and post-surgical joint mobilization.",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
      accent: "#588356",
    },
    {
      id: "konka-jayaswai",
      name: "Konka Jayaswai",
      role: "Clinical Physio",
      qualification: "B.P.T",
      expertise: "Clinical physiotherapist specializing in 1-on-1 joint mobilization, electrotherapy application, and exercise protocols.",
      image: "https://images.unsplash.com/photo-1594824813571-24a69c100d37?auto=format&fit=crop&q=80&w=600",
      accent: "#588356",
    },
    {
      id: "dr-danny-christopher",
      name: "Dr. D. Danny Christopher",
      role: "Consultant Doctor",
      qualification: "B.P.T, B.Sc. PSY, PGDHHM, DIPLOMA GEN.",
      expertise: "Consultant physiotherapist bringing a multi-disciplinary approach in physical rehab, chronic pain psychology, and health management.",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600",
      accent: "#588356",
    },
    {
      id: "dr-galeesha-sk",
      name: "Dr. Galeesha SK",
      role: "Consultant Orthopedic",
      qualification: "M.P.T (ORTHO)",
      regNo: "Reg. No: 18P301008004",
      expertise: "Specialist Master of Physiotherapy in Orthopedics focusing on complex joint deformities, spine adjustments, and manual therapy.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
      accent: "#588356",
    },
  ];

  return (
    <section id="doctors" className="py-10 sm:py-14 bg-[#FAFAFE]">
      <div className="max-w-7xl mx-auto px-2">
        
        {/* Main 2-Column Doctor Spotlight Layout (Compact Balanced Heights) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-10">
          
          {/* Left Column: Primary Therapy Image Card */}
          <div className="lg:col-span-6 relative flex flex-col">
            <div className="relative w-full h-full min-h-[320px] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"
                alt="Dr. Maruthi Rao Pulavarthi - Lead Physiotherapy Session"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Right Column: Compact Text Info + Secondary Therapy Image */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4 sm:space-y-5">
            
            {/* Top Text Header Area */}
            <div className="space-y-2.5">
              <div className="inline-flex items-center space-x-1.5 text-[11px] font-bold tracking-widest text-[#588356] uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#588356]" />
                <span>WELCOME TO VENKATA GANAPATHI</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-snug">
                Meet Our Expert <br className="hidden sm:inline" />
                <span className="text-[#588356]">Physiotherapist & Founder</span>
              </h2>

              <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed max-w-xl">
                {leadDoctor.bio}
              </p>
            </div>

            {/* Bottom Therapy Image */}
            <div className="relative h-44 sm:h-48 lg:h-52 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 bg-slate-100">
              <img
                src={leadDoctor.sessionImage}
                alt="Patient Rehabilitation Session at Venkata Ganapathi Clinic"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Clean Action Buttons Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
              <a
                href="#contact"
                className="w-full sm:w-auto px-5 py-2.5 bg-[#A8D0A6] hover:bg-[#96C494] text-slate-900 rounded-full text-[11px] font-black text-center transition-all border border-[#A8D0A6] flex items-center justify-center space-x-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Consultation with Dr. Maruthi Rao</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setShowModal(true)}
                className="w-full sm:w-auto px-4 py-2.5 bg-[#EBF5EA] hover:bg-[#d8edd6] text-slate-900 rounded-full text-[11px] font-extrabold text-center transition-all border border-[#A8D0A6] flex items-center justify-center space-x-1.5"
              >
                <Stethoscope className="w-3.5 h-3.5 text-[#588356]" />
                <span>View Specializations & OPD Hours</span>
              </button>
            </div>

          </div>

        </div>

        {/* Double-Frame Team Reveal Grid with Smooth Expansion Reveal */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="mb-6">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#588356]">
              ✦ MEDICAL TEAM & CONSULTANTS
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              Our Experienced Physiotherapists & Consultant Doctors
            </h3>
          </div>

          <TeamRevealGrid members={teamMembers} />
        </div>

      </div>

      {/* Doctor Clinical Profile & OPD Hours Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6 pb-5 border-b border-slate-200">
              <img
                src={leadDoctor.image}
                alt={leadDoctor.name}
                className="w-20 h-20 rounded-2xl object-cover border border-slate-200"
              />
              <div className="text-center sm:text-left space-y-1">
                <span className="px-3 py-0.5 bg-[#EBF5EA] text-[#588356] border border-[#A8D0A6]/60 text-xs font-extrabold rounded-full inline-block">
                  FOUNDER & CHIEF CONSULTANT
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  {leadDoctor.name}
                </h3>
                <p className="text-xs font-semibold text-slate-500">
                  {leadDoctor.qualification} • {leadDoctor.regNo}
                </p>
              </div>
            </div>

            {/* Specialization Tags inside Modal */}
            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                Key Clinical Specializations:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {leadDoctor.specializations.map((spec, idx) => (
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

            {/* OPD Consultation Hours Bar inside Modal */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-3 text-xs mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#EBF5EA] text-[#588356] rounded-xl border border-[#A8D0A6]/60">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-medium">OPD Consultation Hours</p>
                  <p className="font-extrabold text-slate-900">{leadDoctor.timing}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-slate-700 font-extrabold">
                <Building2 className="w-4 h-4 text-[#588356]" />
                <span>Hanuman Junction OPD</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 px-4 bg-[#A8D0A6] hover:bg-[#96C494] border border-[#A8D0A6] rounded-full text-xs font-black text-slate-900 text-center flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Consultation Now</span>
              </a>

              <a
                href={`https://wa.me/${HOSPITAL_INFO.whatsapp}?text=Hello%20Dr.%20Maruthi%20Rao,%20I%20want%20to%20book%20a%20physiotherapy%20consultation.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 px-4 bg-[#EBF5EA] hover:bg-[#d8edd6] text-slate-900 border border-[#A8D0A6] rounded-full text-xs font-extrabold text-center flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
