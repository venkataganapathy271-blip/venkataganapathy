"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";

export interface TeamRevealMember {
  id?: string;
  name: string;
  role: string;
  qualification?: string;
  regNo?: string;
  image: string;
  imagePosition?: string;
  expertise: string;
  accent?: string;
}

export interface TeamRevealGridProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  members: readonly TeamRevealMember[];
  className?: string;
}

export function TeamRevealGrid({
  members,
  className = "",
}: TeamRevealGridProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-5 w-full">
        {members.map((member, index) => (
          <div
            key={member.id ?? `${member.name}-${index}`}
            className="group relative aspect-[3/4] rounded-[20px] lg:rounded-[28px] overflow-hidden bg-slate-900 cursor-pointer"
          >
            {/* Background Photo */}
            <img
              src={member.image}
              alt={member.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ objectPosition: member.imagePosition ?? "center top" }}
            />

            {/* Dark gradient overlay - always present at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none transition-all duration-500" />

            {/* Expertise text - slides up on hover */}
            <div className="absolute inset-x-0 bottom-[64px] lg:bottom-[88px] px-3 lg:px-5 z-10 pointer-events-none hidden sm:block">
              <p className="text-[9px] lg:text-[11px] leading-relaxed text-white/90 font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-out line-clamp-3">
                {member.expertise}
              </p>
            </div>

            {/* Name & Role - bottom left */}
            <div className="absolute bottom-3 left-3 right-[52px] lg:bottom-5 lg:left-5 lg:right-[80px] z-10 pointer-events-none">
              <h3 className="text-[11px] sm:text-sm lg:text-base font-black text-white tracking-tight leading-snug">
                {member.name}
              </h3>
              <p className="text-[9px] lg:text-[11px] font-bold text-[#A8D0A6] mt-0.5 tracking-wide leading-tight">
                {member.qualification || member.role}
              </p>
              {member.regNo && (
                <p className="text-[8px] lg:text-[10px] font-semibold text-white/50 mt-0.5 hidden sm:block">
                  {member.regNo}
                </p>
              )}
            </div>

            {/* SVG Overlay: 3-Corner Smooth Squircle Cutout (bottom-right) */}
            <div className="absolute bottom-0 right-0 w-[48px] h-[48px] lg:w-[76px] lg:h-[76px] pointer-events-none z-10 text-[#FAFAFE]">
              <svg viewBox="0 0 76 76" fill="currentColor" className="w-full h-full">
                <path d="M 76 0 A 14 14 0 0 1 62 14 L 32 14 A 20 20 0 0 0 12 34 L 12 62 A 14 14 0 0 1 0 76 L 76 76 Z" />
              </svg>
            </div>

            {/* Arrow Button in pocket */}
            <div className="absolute bottom-[4px] right-[4px] lg:bottom-[6px] lg:right-[6px] z-20 pointer-events-none">
              <div className="w-[32px] h-[32px] lg:w-[50px] lg:h-[50px] rounded-[10px] lg:rounded-[16px] bg-[#1c0707] text-white flex items-center justify-center transition-all duration-300 group-hover:bg-[#588356]">
                <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamRevealGrid;
