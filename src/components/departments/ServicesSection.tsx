"use client";

import React, { useState } from "react";
import {
  ArrowUpRight,
  CheckCircle,
  X,
  Stethoscope,
  Calendar,
  ChevronRight,
} from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  badge: string;
  isHighlighted?: boolean;
  category: string;
  description: string;
  image: string;
  treatments: string[];
  features: string[];
  doctorInCharge: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "ortho-rehab",
    title: "Orthopedic & Joint Rehab",
    badge: "Most Popular",
    isHighlighted: true,
    category: "Joint Rehabilitation",
    description:
      "Targeted recovery for knee, hip, shoulder, and spine injuries. Evidence-based protocols that restore full range of motion and prevent re-injury.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    treatments: [
      "Post-Knee & Hip Mobilization",
      "Frozen Shoulder Release",
      "Spine & Disc Realignment",
      "Full Range-of-Motion Restoration",
    ],
    features: [
      "Targeted Muscle Strengthening",
      "Gait Retraining & Balance",
      "Preventative Care Protocols",
    ],
    doctorInCharge: "Dr. Maruthi Rao Pulavarthi",
  },
  {
    id: "sports-injury",
    title: "Sports Injury Recovery",
    badge: "Athletes Care",
    category: "Sports Science",
    description:
      "From ACL tears to tennis elbow - we get athletes back in the game stronger than before, with sport-specific conditioning built in.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
    treatments: [
      "ACL Tear & Ligament Rehab",
      "Tennis & Golfer's Elbow Relief",
      "Muscle Strain & Tear Recovery",
      "Kinesiology Taping & Stability",
    ],
    features: [
      "P.G. Diploma Sports Rehab Expertise",
      "Athletic Conditioning",
      "Return-to-Sport Benchmarks",
    ],
    doctorInCharge: "Dr. Maruthi Rao Pulavarthi",
  },
  {
    id: "spine-decompression",
    title: "Spine & Disc Decompression",
    badge: "Non-Surgical",
    category: "Spine Care",
    description:
      "A multi-modal approach to long-standing pain that combines manual therapy, movement re-education, and computerized traction to break the pain cycle.",
    image:
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=800",
    treatments: [
      "Myofascial Trigger Point Therapy",
      "Spinal Decompression & Traction",
      "Movement Re-Education",
      "Desensitization Protocols",
    ],
    features: [
      "Multi-Modal Modalities (IFT/TENS)",
      "Zero-Side-Effect Pain Relief",
      "Personalized Exercise Therapy",
    ],
    doctorInCharge: "Dr. Maruthi Rao Pulavarthi",
  },
  {
    id: "stroke-paralysis",
    title: "Stroke Paralysis Recovery",
    badge: "Targeted Neuro",
    category: "Neurology",
    description:
      "Structured neuro-rehabilitation following stroke (hemiplegia) and facial weakness - safe, progressive, and motor milestone outcome-focused.",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
    treatments: [
      "NMES Muscle Re-education",
      "Facial Bell's Palsy Therapy",
      "Parallel Bar Gait Retraining",
      "Motor Pathway Stimulation",
    ],
    features: [
      "Parallel Walking Bar Retraining",
      "Safe Progressive Load Expansion",
      "Outcome-Driven Recovery Tracking",
    ],
    doctorInCharge: "Dr. Maruthi Rao Pulavarthi",
  },
  {
    id: "manual-needling",
    title: "Manual Therapy & Needling",
    badge: "1-on-1 Care",
    category: "Specialized Rehab",
    description:
      "Hands-on joint mobilization, soft tissue release, and therapeutic dry needling to reduce pain, restore mobility, and accelerate healing.",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
    treatments: [
      "Therapeutic Dry Needling",
      "Joint Mobilization & Manipulation",
      "Soft Tissue Myofascial Release",
      "Deep Muscle Trigger Point Release",
    ],
    features: [
      "1-on-1 Manual Manipulations",
      "Accelerated Muscle Healing",
      "Targeted Pain Point Inactivation",
    ],
    doctorInCharge: "Dr. Maruthi Rao Pulavarthi",
  },
];

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section
      id="departments"
      className="py-12 sm:py-16 bg-[#FAFAFE] text-slate-900"
    >
      {/* Anchor for #services compatibility */}
      <div id="services" className="max-w-7xl mx-auto px-2">
        
        {/* Section Header (Mobile Optimized) */}
        <div className="mb-8 sm:mb-14 text-center lg:text-left">
          
          {/* Top Tagline */}
          <div className="flex items-center justify-center lg:justify-start space-x-1.5 text-xs sm:text-sm font-bold tracking-wider text-slate-700 uppercase mb-3 sm:mb-4">
            <span>Services We Offer</span>
          </div>

          {/* 2-Column Header Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-12 items-baseline">
            
            {/* Left Big Headline */}
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.1] sm:leading-[1.08]">
                Certified <br className="hidden lg:block" /> Excellence
              </h2>
            </div>

            {/* Right Subtitle & Links */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start space-y-4 sm:space-y-5 mt-2 lg:mt-0">
              <p className="text-slate-600 text-xs sm:text-base leading-relaxed font-normal max-w-md lg:max-w-none">
                From non-surgical joint care to advanced neuro rehabilitation, we&apos;ve got you covered. Choose reliability, choose Venkata Ganapathy Physiotherapy Clinic.
              </p>

              {/* Action Links */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-[11px] sm:text-sm font-bold text-slate-900">
                <a
                  href="#contact"
                  className="hover:text-[#588356] transition-colors inline-flex items-center space-x-1 border border-slate-200 lg:border-transparent px-4 py-2 lg:px-0 lg:py-0 rounded-full"
                >
                  <span>View All Services</span>
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#588356]" />
                </a>

                <a
                  href="#contact"
                  className="hover:text-[#588356] transition-colors inline-flex items-center space-x-1 border border-slate-200 lg:border-transparent px-4 py-2 lg:px-0 lg:py-0 rounded-full"
                >
                  <span>Call For Booking</span>
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#588356]" />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* 5-Card Grid (Mobile: Sleek Banners, Desktop: Tall 5-Col Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="group relative h-[160px] sm:h-[220px] lg:h-[420px] cursor-pointer transition-all duration-500"
            >
              {/* Smooth L-shaped Cutout Card Photo Container */}
              <div
                className="absolute inset-0 rounded-[20px] sm:rounded-[24px] lg:rounded-[32px] overflow-hidden bg-slate-900"
              >
                {/* Background Image */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle Bottom Overlay for Title Contrast Only */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Left Title */}
                <div className="absolute bottom-4 lg:bottom-6 left-4 lg:left-6 right-16 sm:right-20 z-20 pointer-events-none">
                  <h3 className="text-[13px] sm:text-base lg:text-lg font-extrabold text-white tracking-tight leading-snug group-hover:text-[#A8D0A6] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[9px] text-slate-300 font-medium uppercase tracking-wider mt-1 lg:hidden">
                    {service.category}
                  </p>
                </div>

                {/* CSS Magic: SVG Overlay for Flawless 3-Corner Smooth Squircle Cutout */}
                <div className="absolute bottom-0 right-0 w-[56px] h-[56px] sm:w-[72px] sm:h-[72px] lg:w-[92px] lg:h-[92px] pointer-events-none z-10 text-[#FAFAFE]">
                  <svg viewBox="0 0 92 92" fill="currentColor" className="w-full h-full">
                    <path d="M 92 0 A 16 16 0 0 1 76 16 L 40 16 A 24 24 0 0 0 16 40 L 16 76 A 16 16 0 0 1 0 92 L 92 92 Z" />
                  </svg>
                </div>
              </div>

              {/* Squircle Arrow Button Nestled Perfectly inside the Cutout Pocket */}
              <div className="absolute bottom-[4px] right-[4px] sm:bottom-[6px] sm:right-[6px] lg:bottom-[8px] lg:right-[8px] z-20 pointer-events-none">
                <div className="w-[38px] h-[38px] sm:w-[48px] sm:h-[48px] lg:w-[60px] lg:h-[60px] rounded-[12px] sm:rounded-[16px] lg:rounded-[20px] bg-[#1c0707] text-white flex items-center justify-center font-black transition-all group-hover:bg-[#588356] shadow-sm">
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6 pr-8">
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold bg-[#588356] text-white uppercase mb-2">
                {selectedService.category} • {selectedService.badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {selectedService.title}
              </h3>
            </div>

            {/* Featured Image inside Modal */}
            <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden mb-6 border border-slate-200">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/60 text-xs font-semibold text-white">
                Venkata Ganapathy Physiotherapy Clinical Protocol
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-medium">
              {selectedService.description}
            </p>

            {/* Treatments Grid */}
            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                Key Clinical Treatments
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.treatments.map((treatment, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 flex items-center"
                  >
                    <CheckCircle className="w-4 h-4 text-[#588356] mr-2 shrink-0" />
                    <span>{treatment}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Grid */}
            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                Program Highlights &amp; Modalities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 flex items-center"
                  >
                    <Stethoscope className="w-4 h-4 text-[#588356] mr-2 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="bg-slate-50 border border-slate-200 text-slate-900 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-[11px] text-[#588356] uppercase tracking-wider font-black">
                  Lead Clinical Director
                </p>
                <p className="text-sm font-black text-slate-900">
                  {selectedService.doctorInCharge}
                </p>
              </div>
              <a
                href="#contact"
                onClick={() => setSelectedService(null)}
                className="w-full sm:w-auto px-6 py-3 bg-[#588356] hover:bg-[#466944] text-white font-extrabold text-xs uppercase tracking-wider transition-colors rounded-full text-center flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
