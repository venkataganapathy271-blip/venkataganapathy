"use client";

import React from "react";
import type { StatDoc } from "@/lib/data";

export default function StatsSection({ stats }: { stats: StatDoc[] }) {

  return (
    <section className="bg-[#FAFAFE]/90 backdrop-blur-xl py-14">
      <div className="max-w-7xl mx-auto px-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 items-center justify-between">
          {stats.map((stat, index) => (
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
