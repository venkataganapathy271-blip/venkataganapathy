"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import type { TestimonialDoc } from "@/lib/data";

export default function TestimonialsSection({ testimonials }: { testimonials: TestimonialDoc[] }) {
   const [index, setIndex] = useState(0);
   const [touchStart, setTouchStart] = useState<number | null>(null);
   const [touchEnd, setTouchEnd] = useState<number | null>(null);

   if (!testimonials || testimonials.length === 0) return null;

   const displayStories = testimonials.map((t) => ({
      quote: t.comment,
      name: t.patientName,
      role: `${t.condition} • ${t.patientAge} yrs`,
      rating: Number(t.rating) || 5,
      image: t.avatar || "/image_84174571.jpg",
      heading: "Real Recovery Stories & Patient Experiences"
   }));

   const next = () => setIndex((prev) => (prev + 1) % displayStories.length);
   const prev = () => setIndex((prev) => (prev - 1 + displayStories.length) % displayStories.length);

   const minSwipeDistance = 50;

   const onTouchStart = (e: React.TouchEvent) => {
      setTouchEnd(null);
      setTouchStart(e.targetTouches[0].clientX);
   };

   const onTouchMove = (e: React.TouchEvent) => {
      setTouchEnd(e.targetTouches[0].clientX);
   };

   const onTouchEndEvent = () => {
      if (!touchStart || !touchEnd) return;
      const distance = touchStart - touchEnd;
      if (distance > minSwipeDistance) next();
      if (distance < -minSwipeDistance) prev();
   };

   return (
      <section id="testimonials" className="w-full bg-[#FAFAFE] py-16 sm:py-20 flex flex-col justify-center min-h-[90vh] font-sans overflow-hidden">
         <div className="max-w-7xl mx-auto px-2 w-full">

            {/* --- DUAL HEADER --- */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-6 md:mb-8">
               {/* Left Part */}
               <div className="max-w-2xl">
                  <div className="flex items-center gap-2 mb-4">
                     <div className="w-2 h-2 rounded-full bg-black shadow-[0_0_10px_rgba(141,214,214,0.5)]" />
                     <span className="text-[11px] font-black uppercase tracking-[0.3em] text-black italic">Patient Reviews</span>
                  </div>
                  <AnimatePresence mode="wait">
                     <motion.h2
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-[28px] md:text-[42px] lg:text-[54px] font-bold text-black leading-[1.1] tracking-tighter"
                     >
                        {displayStories[index].heading}
                     </motion.h2>
                  </AnimatePresence>
               </div>

               {/* Right Part (Social Proof) */}
               <div className="lg:max-w-[300px] flex flex-col items-start lg:items-end lg:text-right">
                  <div className="flex -space-x-3 mb-3">
                     {displayStories.slice(0, 5).map((story, i) => (
                        <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-neutral-200 overflow-hidden shadow-sm">
                           <img src={story.image} alt="" className="w-full h-full object-cover" />
                        </div>
                     ))}
                  </div>
                  <div className="flex gap-0.5 text-black mb-3">
                     {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                  <p className="text-[12px] text-black/40 font-semibold leading-relaxed uppercase tracking-tight italic">
                     {testimonials.length}+ Verified Patient Reviews. Highly recommended for pain recovery.
                  </p>
               </div>
            </div>

            {/* --- MAIN FEATURED CARD --- */}
            <div 
               className="relative bg-[#1c1c1c] rounded-[1rem] md:rounded-[1.5rem] overflow-hidden h-[550px] sm:h-[600px] lg:h-[420px] flex flex-col lg:flex-row"
               onTouchStart={onTouchStart}
               onTouchMove={onTouchMove}
               onTouchEnd={onTouchEndEvent}
            >
               {/* LEFT SIDE: QUOTE & NAVIGATION */}
               <div className="flex-1 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-between z-10">
                  <AnimatePresence mode="wait">
                     <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="max-w-xl"
                     >
                        <div className="flex gap-2 text-amber-500 mb-4 sm:mb-6">
                           {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                 key={i}
                                 className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 ${i < displayStories[index].rating ? 'fill-current' : 'text-white/10'}`}
                              />
                           ))}
                        </div>
                        
                        <div className="relative group cursor-pointer mb-6 sm:mb-8">
                           <p className="text-[18px] md:text-[24px] lg:text-[32px] font-medium text-white/90 leading-[1.3] tracking-tight line-clamp-4">
                              "{displayStories[index].quote}"
                           </p>

                           {/* Full Text Hover/Click Overlay */}
                           {displayStories[index].quote.length > 120 && (
                              <div className="absolute top-[-20px] left-[-20px] right-[-20px] z-50 bg-[#262626] border border-white/10 p-6 md:p-8 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 max-h-[300px] overflow-y-auto hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                 <p className="text-[15px] sm:text-[16px] md:text-[20px] lg:text-[22px] font-medium text-white/95 leading-[1.5]">
                                    "{displayStories[index].quote}"
                                 </p>
                              </div>
                           )}
                        </div>
                     </motion.div>
                  </AnimatePresence>

                  <div className="flex items-center gap-4 sm:gap-6">
                     <div className="flex gap-2 sm:gap-3">
                        <button
                           onClick={prev}
                           className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all group shrink-0"
                        >
                           <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-active:-translate-x-1" />
                        </button>
                        <button
                           onClick={next}
                           className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center text-black hover:bg-neutral-200 transition-all group shrink-0"
                        >
                           <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-active:translate-x-1" />
                        </button>
                     </div>

                     {displayStories.length > 10 ? (
                        <div className="flex items-center text-white/50 font-medium tracking-widest text-[12px] sm:text-[13px] ml-1 sm:ml-2">
                           <span className="text-white">{(index + 1).toString().padStart(2, '0')}</span>
                           <span className="mx-1">/</span>
                           <span>{displayStories.length.toString().padStart(2, '0')}</span>
                        </div>
                     ) : (
                        <div className="flex gap-1.5 sm:gap-2 max-w-[120px] sm:max-w-[150px] overflow-x-auto hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                           {displayStories.map((_, i) => (
                              <div
                                 key={i}
                                 className={`h-1.5 rounded-full transition-all duration-500 shrink-0 ${index === i ? 'w-4 sm:w-5 bg-amber-500' : 'w-1.5 bg-white/20'}`}
                              />
                           ))}
                        </div>
                     )}
                  </div>
               </div>

               {/* RIGHT SIDE: IMAGE & BIO */}
               <div className="relative h-[300px] sm:h-[350px] lg:h-auto lg:flex-1 shrink-0">
                  <AnimatePresence mode="wait">
                     <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 p-3 lg:p-7"
                     >
                        <div className="relative w-full h-full rounded-[1rem] md:rounded-[1.5rem] overflow-hidden">
                           <img
                              src={displayStories[index].image}
                              className="w-full h-full object-cover grayscale-[0.1] contrast-[1.1]"
                              alt={displayStories[index].name}
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                           <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-10 md:left-10 pr-4 sm:pr-6">
                              <h4 className="text-[16px] sm:text-[18px] md:text-[22px] font-bold text-white uppercase tracking-tight leading-none mb-1 truncate">
                                 {displayStories[index].name}
                              </h4>
                              <p className="text-white/50 text-[10px] sm:text-[12px] md:text-[13px] font-medium uppercase tracking-widest italic line-clamp-1">{displayStories[index].role}</p>
                           </div>
                        </div>
                     </motion.div>
                  </AnimatePresence>
               </div>

            </div>

         </div>
      </section>
   );
}


