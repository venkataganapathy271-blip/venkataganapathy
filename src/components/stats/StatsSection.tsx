"use client";

import React from "react";
import { HOSPITAL_STATS } from "@/data/hospitalData";

export default function StatsSection() {
  const statsList = [
    {
      value: "10+",
      line1: "Years of Clinical",
      line2: "Experience",
    },
    {
      value: "75/2015",
      line1: "Govt Registration",
      line2: "Reg. No.",
    },
    {
      value: "8,500+",
      line1: "Patients Treated",
      line2: "Successfully",
    },
    {
      value: "100%",
      line1: "Specialty Non-Surgical",
      line2: "Focus",
    },
  ];

  return (
    <section className="bg-[#FAFAFE]/90 backdrop-blur-xl py-14">
      <div className="max-w-7xl mx-auto px-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 items-center justify-between">
          {statsList.map((stat, index) => (
            <div key={index} className="flex items-center space-x-3 justify-center sm:justify-start">
              {/* Stat Number */}
              <span className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-slate-900 shrink-0">
                {stat.value}
              </span>
              
              {/* 2-Line Stacked Label */}
              <div className="text-[11px] sm:text-xs leading-tight text-slate-600 font-medium">
                <div>{stat.line1}</div>
                <div className="text-slate-500">{stat.line2}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
