"use client";

import React from "react";
import { TESTIMONIALS } from "@/data/hospitalData";
import { Star, CheckCircle } from "lucide-react";
import { DiagonalCarousel } from "@/components/ui/diagonal-carousel";

export default function TestimonialsSection() {
  const carouselItems = TESTIMONIALS.map((t) => ({
    id: t.id,
    src: t.avatar,
    title: t.condition,
    patientName: t.patientName,
    age: `${t.patientAge} yrs`,
    condition: t.condition,
    duration: t.recoveryPeriod,
    quote: t.comment,
    doctor: t.doctorName,
    rating: t.rating,
  }));

  return (
    <section id="testimonials" className="py-16 sm:py-20 bg-[#FAFAFE] overflow-hidden">
      <div className="max-w-7xl mx-auto px-2">
        
        {/* Editorial Section Header */}
        <div className="mb-10 pb-6 border-b border-slate-200">
          <div className="flex items-center space-x-2 text-[11px] font-bold tracking-widest text-[#588356] uppercase mb-3">
            <span className="text-[#588356]">✦</span>
            <span>VERIFIED PATIENT OUTCOMES</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-7">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                REAL RECOVERY STORIES <span className="font-light text-[#588356]">— 1,250+ REVIEWS</span>
                <br />
                <span className="text-[#588356]">PATIENT</span> TESTIMONIALS
              </h2>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-[#EBF5EA] border border-[#A8D0A6]/60 rounded-2xl">
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-black text-[#588356]">4.9</span>
                <div>
                  <div className="flex items-center space-x-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-[11px] font-extrabold text-slate-800">
                    1,250+ Verified Patient Reviews
                  </p>
                </div>
              </div>

              <span className="px-3 py-1 bg-white text-[#588356] rounded-full text-[10px] font-extrabold border border-[#A8D0A6]/60 flex items-center shrink-0">
                <CheckCircle className="w-3 h-3 mr-1 text-[#588356]" /> 100% Non-Surgical
              </span>
            </div>
          </div>
        </div>

        {/* Diagonal Spring-Driven Carousel Component */}
        <div className="pt-2">
          <DiagonalCarousel
            items={carouselItems}
            defaultActiveIndex={1}
            slideSize={400}
            rotationStep={16}
            verticalStep={35}
            inactiveScale={0.82}
            loop={true}
          />
        </div>

      </div>
    </section>
  );
}


