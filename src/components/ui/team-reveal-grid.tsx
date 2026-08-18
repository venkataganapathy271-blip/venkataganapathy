"use client";

import * as React from "react";

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
    <div className={`w-full py-4 text-center flex flex-col items-center ${className}`}>
      {/* Team Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 w-full max-w-7xl justify-center items-start">
        {members.map((member, index) => (
          <div key={member.id ?? `${member.name}-${index}`} className="relative flex flex-col items-center">
            {/* Invisible spacer to reserve static layout height */}
            <div aria-hidden="true" className="invisible flex flex-col items-center text-center">
              <div className="rounded-xl p-1 mb-4 w-44 h-44 sm:w-56 sm:h-56 lg:w-64 lg:h-64" />
              <h3 className="text-base font-bold tracking-tight mb-1">{member.name}</h3>
              <p className="text-xs font-medium">{member.role}</p>
            </div>

            {/* Hoverable / Focusable Card */}
            <div
              tabIndex={0}
              className="group absolute inset-x-0 top-0 z-10 flex flex-col items-center text-center cursor-pointer outline-none hover:z-30 focus-visible:z-30 transition-all"
            >
              {/* Outer Frame (Frame 1) */}
              <div className="rounded-2xl sm:rounded-3xl border border-slate-200/80 p-2 bg-[#EBF5EA]/50 mb-3 shadow-xs transition-all duration-300 group-hover:border-[#A8D0A6]">
                {/* Inner Frame (Frame 2) */}
                <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white overflow-hidden">
                  <div className="relative w-44 h-44 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-lg sm:rounded-xl overflow-hidden bg-slate-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-all duration-500 ease-out grayscale group-hover:grayscale-0"
                      style={{ objectPosition: member.imagePosition ?? "center top" }}
                    />
                  </div>

                  {/* Smooth Grid Rows Expertise Reveal */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[grid-template-rows]">
                    <div className="overflow-hidden">
                      <p className="w-44 sm:w-56 lg:w-64 mx-auto px-3 pt-3 pb-3 text-[11px] sm:text-xs leading-relaxed text-slate-700 font-medium text-center bg-[#FAFAFE] border-t border-slate-200">
                        {member.expertise}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Doctor Name, Qualification & Role */}
              <h3 className="text-sm sm:text-base font-black tracking-tight text-slate-900 mb-0.5 leading-snug">
                {member.name}
              </h3>
              <p className="text-xs font-bold text-[#588356]">
                {member.qualification || member.role}
              </p>
              {member.regNo && (
                <p className="text-[10px] font-semibold text-slate-500 mt-0.5">
                  {member.regNo}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamRevealGrid;
