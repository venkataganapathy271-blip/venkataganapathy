"use client";

import React, { useState } from "react";
import { Play, Pause, Sparkles, CheckCircle2 } from "lucide-react";

interface VideoItem {
  id: string;
  title: string;
  category: string;
  description: string;
  src: string;
  duration: string;
}

export default function VideoShowcase() {
  const videos: VideoItem[] = [
    {
      id: "vid-1",
      title: "Hands-on Spine & Joint Mobilization Therapy",
      category: "Spine Care & Decompression",
      description: "Demonstration of manual joint mobilization for lower back pain, sciatica, and vertebral alignment.",
      src: "/5991800-uhd_3840_2160_25fps.mp4",
      duration: "0:45",
    },
    {
      id: "vid-2",
      title: "Electrotherapy & Neuromuscular Rehabilitation",
      category: "Nerve & Paralysis Care",
      description: "Advanced NMES electrical stimulation unit activating dormant arm and facial muscles.",
      src: "/6023232-uhd_3840_2160_25fps.mp4",
      duration: "0:50",
    },
    {
      id: "vid-3",
      title: "Post-Operative Knee & Hip Replacement Recovery",
      category: "Post-Surgical Care",
      description: "Step-by-step joint flexion, knee bending, and gait rehabilitation routine.",
      src: "/6023241-uhd_3840_2160_25fps.mp4",
      duration: "0:40",
    },
    {
      id: "vid-4",
      title: "Biomechanical Exercise & Gait Training",
      category: "Sports & Movement Science",
      description: "Targeted sports rehab stretching and gait balance conditioning exercises.",
      src: "/6326960-hd_2048_1054_25fps.mp4",
      duration: "0:35",
    },
  ];

  const [activeVideo, setActiveVideo] = useState<VideoItem>(videos[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  return (
    <section id="videos" className="py-16 bg-[#FAFAFE]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-2">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Clinical Video Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            See Our Modern Physiotherapy <br className="hidden sm:inline" />
            <span className="text-sky-700">Treatments in Action</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Watch live demonstrations of our hands-on joint mobilization, electrotherapy, stroke paralysis rehab, and sports recovery protocols at Hanuman Junction clinic.
          </p>
        </div>

        {/* Video Player & Selection Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Large Video Player (Left Col) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-300">
              <video
                key={activeVideo.id}
                autoPlay={isPlaying}
                controls
                loop
                muted
                playsInline
                className="w-full h-[360px] sm:h-[440px] object-cover"
              >
                <source src={activeVideo.src} type="video/mp4" />
              </video>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-sky-100 border border-sky-300 text-sky-800 text-xs font-bold rounded">
                  {activeVideo.category}
                </span>
                <span className="text-xs text-slate-500 font-semibold">HD Quality Video</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{activeVideo.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{activeVideo.description}</p>
            </div>
          </div>

          {/* Video List Playlist (Right Col) */}
          <div className="lg:col-span-5 space-y-3">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Video to Watch:
            </p>

            {videos.map((vid) => (
              <button
                key={vid.id}
                onClick={() => {
                  setActiveVideo(vid);
                  setIsPlaying(true);
                }}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start space-x-4 ${
                  activeVideo.id === vid.id
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white border-slate-300 hover:bg-slate-50 text-slate-900"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    activeVideo.id === vid.id
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 text-slate-700 border border-slate-200"
                  }`}
                >
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>

                <div className="flex-1 space-y-1">
                  <span className={`text-[11px] font-bold uppercase tracking-wider block ${
                    activeVideo.id === vid.id ? "text-emerald-400" : "text-sky-700"
                  }`}>
                    {vid.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold line-clamp-1">
                    {vid.title}
                  </h4>
                  <p className={`text-xs line-clamp-2 ${
                    activeVideo.id === vid.id ? "text-slate-300" : "text-slate-600"
                  }`}>
                    {vid.description}
                  </p>
                </div>
              </button>
            ))}

            <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-900 font-semibold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />
              <span>All videos shot on-location during active therapy sessions.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
