"use client";

import React, { useState, useEffect } from "react";
import { TESTIMONIALS } from "@/data/hospitalData";
import { Star, CheckCircle } from "lucide-react";
import { DiagonalCarousel } from "@/components/ui/diagonal-carousel";

export default function TestimonialsSection() {
  const [slideSize, setSlideSize] = useState(400);

  useEffect(() => {
    const handleResize = () => {
      setSlideSize(window.innerWidth < 640 ? 300 : 400);
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        
        {/* Editorial Section Header (Mobile Optimized) */}
        <div className="mb-8 sm:mb-10 pb-6 border-b border-slate-200">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end text-center lg:text-left">
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2 sm:mb-3 block">
                Verified Patient Outcomes
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] sm:leading-[1.08]">
                Real Recovery <br className="hidden lg:block" />Stories
              </h2>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row items-center sm:items-center justify-center lg:justify-between gap-3 p-4 bg-[#EBF5EA] border border-[#A8D0A6]/60 rounded-[24px]">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-black text-[#588356]">4.9</span>
                <div className="text-left">
                  <div className="flex items-center space-x-0.5 text-amber-500 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-[11px] font-extrabold text-slate-800">
                    1,250+ Verified Patient Reviews
                  </p>
                </div>
              </div>

              <span className="px-4 py-2 bg-white text-[#588356] rounded-full text-[10px] font-extrabold border border-[#A8D0A6]/60 flex items-center shrink-0">
                <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-[#588356]" /> 100% Non-Surgical
              </span>
            </div>
          </div>
        </div>

        {/* Diagonal Spring-Driven Carousel Component */}
        <div className="pt-2">
          <DiagonalCarousel
            items={carouselItems}
            defaultActiveIndex={1}
            slideSize={slideSize}
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


