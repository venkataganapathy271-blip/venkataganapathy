"use client";

import React, { useState, useRef } from "react";
import { X, Play, Volume2, VolumeX, Maximize2 } from "lucide-react";

type MediaType = "image" | "video";

interface GalleryItem {
  id: string;
  title: string;
  category: "Facilities" | "Equipment" | "Therapy" | "Video";
  mediaType: MediaType;
  src: string;
  description: string;
}

const GALLERY_IMAGE_FILES = [
  "WhatsApp Image 2026-08-19 at 12.23.02 PM.jpeg",
  "WhatsApp Image 2026-08-19 at 12.23.03 PM (1).jpeg",
  "WhatsApp Image 2026-08-19 at 12.23.03 PM.jpeg",
  "WhatsApp Image 2026-08-19 at 12.23.04 PM (1).jpeg",
  "WhatsApp Image 2026-08-19 at 12.23.04 PM.jpeg",
  "WhatsApp Image 2026-08-19 at 12.23.05 PM (1).jpeg",
  "WhatsApp Image 2026-08-19 at 12.23.05 PM.jpeg",
  "WhatsApp Image 2026-08-19 at 12.23.06 PM (1).jpeg",
  "WhatsApp Image 2026-08-19 at 12.23.06 PM.jpeg",
  "WhatsApp Image 2026-08-21 at 3.38.45 AM (1).jpeg",
  "WhatsApp Image 2026-08-21 at 3.38.45 AM.jpeg",
  "WhatsApp Image 2026-08-21 at 3.38.46 AM (1).jpeg",
  "WhatsApp Image 2026-08-21 at 3.38.46 AM (2).jpeg",
  "WhatsApp Image 2026-08-21 at 3.38.46 AM (3).jpeg",
  "WhatsApp Image 2026-08-21 at 3.38.46 AM.jpeg",
  "WhatsApp Image 2026-08-21 at 3.38.47 AM (1).jpeg",
  "WhatsApp Image 2026-08-21 at 3.38.47 AM (2).jpeg",
  "WhatsApp Image 2026-08-21 at 3.38.47 AM (3).jpeg",
  "WhatsApp Image 2026-08-21 at 3.38.47 AM.jpeg",
  "WhatsApp Image 2026-08-21 at 3.38.48 AM (1).jpeg",
  "WhatsApp Image 2026-08-21 at 3.38.48 AM (2).jpeg",
  "WhatsApp Image 2026-08-21 at 3.38.48 AM.jpeg",
  "WhatsApp Image 2026-08-21 at 3.38.49 AM (1).jpeg",
  "WhatsApp Image 2026-08-21 at 3.38.49 AM (2).jpeg",
  "WhatsApp Image 2026-08-21 at 3.38.49 AM (3).jpeg",
  "WhatsApp Image 2026-08-21 at 3.38.49 AM.jpeg",
  "WhatsApp Image 2026-08-21 at 3.38.50 AM (1).jpeg",
  "WhatsApp Image 2026-08-21 at 3.38.50 AM.jpeg",
  "WhatsApp Image 2026-08-26 at 10.41.33 PM.jpeg",
  "WhatsApp Image 2026-08-26 at 10.48.51 AM.jpeg",
  "WhatsApp Image 2026-08-27 at 2.17.57 PM.jpeg",
];

const BASE_VIDEOS: GalleryItem[] = [
  {
    id: "v1",
    title: "Computerized Lumbar & Cervical Traction Unit",
    category: "Equipment",
    mediaType: "video",
    src: "/5991800-uhd_3840_2160_25fps.mp4",
    description: "Automated digital decompression system for non-surgical slipped disc treatment.",
  },
  {
    id: "v2",
    title: "Electrotherapy in Action",
    category: "Video",
    mediaType: "video",
    src: "/6023232-uhd_3840_2160_25fps.mp4",
    description: "FDA-approved electrotherapy unit for pain relief and nerve activation.",
  },
  {
    id: "v3",
    title: "Gait Retraining & Stroke Recovery",
    category: "Video",
    mediaType: "video",
    src: "/6023241-uhd_3840_2160_25fps.mp4",
    description: "Post-stroke gait retraining using parallel walking bars.",
  },
  {
    id: "v4",
    title: "Rehabilitation Overview",
    category: "Video",
    mediaType: "video",
    src: "/6326960-hd_2048_1054_25fps.mp4",
    description: "A complete overview of our state-of-the-art rehabilitation facilities.",
  }
];

const IMAGE_ITEMS: GalleryItem[] = GALLERY_IMAGE_FILES.map((filename, i) => ({
  id: `img-${i}`,
  title: `Clinic Gallery ${i + 1}`,
  category: (i % 3 === 0 ? "Facilities" : (i % 3 === 1 ? "Equipment" : "Therapy")) as "Facilities" | "Equipment" | "Therapy",
  mediaType: "image" as MediaType,
  src: `/gallery/${filename}`,
  description: "Venkata Ganapathy Physiotherapy Clinic in Hanuman Junction.",
}));

const GALLERY_ITEMS: GalleryItem[] = [
  BASE_VIDEOS[0],
  ...IMAGE_ITEMS.slice(0, 4),
  BASE_VIDEOS[1],
  ...IMAGE_ITEMS.slice(4, 9),
  BASE_VIDEOS[2],
  ...IMAGE_ITEMS.slice(9, 16),
  BASE_VIDEOS[3],
  ...IMAGE_ITEMS.slice(16),
];

const CATEGORIES = ["All", "Facilities", "Equipment", "Therapy", "Video"];

// Removed BENTO_PATTERN for simple layout

function MediaCard({
  item,
  className,
  onClick,
}: {
  item: GalleryItem;
  className?: string;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [hovered, setHovered] = useState(false);

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (playing) { videoRef.current.pause(); setPlaying(false); }
      else { videoRef.current.play(); setPlaying(true); }
    }
  };

  const handleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-[24px] bg-slate-950 cursor-pointer ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Media */}
      {item.mediaType === "video" ? (
        <video
          ref={videoRef}
          src={item.src}
          muted
          loop
          playsInline
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      ) : (
        <img
          src={item.src}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      )}

      {/* Always-on subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 pointer-events-none" />

      {/* Top row: category + controls */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider backdrop-blur-md border transition-all ${
          item.mediaType === "video"
            ? "bg-white/15 text-white border-white/20"
            : "bg-white/15 text-white border-white/20"
        }`}>
          {item.mediaType === "video" ? "● Video" : item.category}
        </span>

        <div className="flex gap-1.5">
          {item.mediaType === "video" && (
            <button
              onClick={handleMute}
              className="w-7 h-7 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all"
            >
              {muted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
            </button>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            className="w-7 h-7 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Video play button */}
      {item.mediaType === "video" && (
        <button
          onClick={handlePlayPause}
          className={`absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-300 ${
            playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/35 transition-all hover:scale-110">
            {playing ? (
              <div className="flex gap-[3px]">
                <div className="w-[3px] h-4 bg-white rounded-full" />
                <div className="w-[3px] h-4 bg-white rounded-full" />
              </div>
            ) : (
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            )}
          </div>
        </button>
      )}

      {/* Bottom frosted glass info panel — slides up on hover */}
      <div className={`absolute bottom-0 left-0 right-0 z-20 transition-all duration-500 ease-out ${
        hovered ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}>
        <div className="m-2.5 rounded-[16px] bg-black/60 backdrop-blur-xl border border-white/10 p-3.5 shadow-xl">
          <h3 className="text-sm font-black text-white leading-snug line-clamp-2">
            {item.title}
          </h3>
          <p className="text-[11px] text-white/60 font-medium mt-1 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      {/* Title always visible (bottom) when not hovered */}
      <div className={`absolute bottom-3.5 left-3.5 right-3.5 z-10 transition-all duration-300 ${
        hovered ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"
      }`}>
        <h3 className="text-xs sm:text-sm font-black text-white leading-snug line-clamp-1 drop-shadow-lg">
          {item.title}
        </h3>
      </div>
    </div>
  );
}

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filteredItems =
    activeCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const displayedItems = showAll ? filteredItems : filteredItems.slice(0, 10);

  return (
    <section id="gallery" className="py-12 sm:py-16 bg-[#FAFAFE]">
      <div className="max-w-7xl mx-auto px-2">

        {/* Section Header (Mobile Optimized) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 sm:gap-4 lg:gap-12 items-end z-10 relative text-center lg:text-left">
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start mb-6 lg:mb-0">
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2 sm:mb-3 block">
              Hospital Media & Infrastructure
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.1] lg:leading-tight">
              Gallery &amp; Facilities Showcase
            </h2>
          </div>

          {/* Filter Pills — Horizontally scrollable on mobile */}
          <div className="lg:col-span-5 flex overflow-x-auto lg:overflow-visible flex-nowrap lg:flex-wrap items-end gap-1.5 px-8 sm:px-10 lg:px-0 lg:pr-8 justify-start lg:justify-end [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mb-[1px] z-10 relative">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setShowAll(false); }}
                className={`relative shrink-0 outline-none focus:outline-none px-4 lg:px-5 py-2 lg:py-2.5 text-[11px] lg:text-xs font-black transition-all rounded-t-xl border border-b-0 ${
                  activeCategory === cat
                    ? "bg-[#F3F5F8] text-slate-900 border-[#D1D5DB] -mb-[1px] z-10"
                    : "bg-transparent text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-200/50"
                }`}
              >
                {cat}
                {/* Perfect SVG inverted corners for the active tab */}
                {activeCategory === cat && (
                  <>
                    <svg className="absolute -bottom-[1px] -left-3 w-3 h-3 text-[#D1D5DB]" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0V12H0C6.62742 12 12 6.62742 12 0Z" fill="#F3F5F8" />
                      <path d="M0 12C6.62742 12 12 6.62742 12 0" stroke="currentColor" strokeWidth="1" />
                    </svg>
                    <svg className="absolute -bottom-[1px] -right-3 w-3 h-3 text-[#D1D5DB]" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0V12H12C5.37258 12 0 6.62742 0 0Z" fill="#F3F5F8" />
                      <path d="M12 12C5.37258 12 0 6.62742 0 0" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Connected Grid Container */}
        <div className="relative bg-[#F3F5F8] border border-[#D1D5DB] rounded-[24px] lg:rounded-[32px] p-2.5 sm:p-4 lg:p-5 shadow-sm z-0">
          {/* Simple Uniform Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
            {displayedItems.map((item) => (
              <div key={item.id} className="aspect-square">
                <MediaCard
                  item={item}
                  className="w-full h-full"
                  onClick={() => setActiveItem(item)}
                />
              </div>
            ))}
          </div>
          
          {/* Show More / Less Button */}
          {filteredItems.length > 10 && (
            <div className="mt-6 flex justify-center pb-2">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-[11px] font-black uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                {showAll ? "Show Less" : "Show More Gallery"}
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Lightbox */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-[28px] overflow-hidden bg-[#0f0f0f] border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative h-[60vh] bg-black">
              {activeItem.mediaType === "video" ? (
                <video
                  src={activeItem.src}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={activeItem.src}
                  alt={activeItem.title}
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            <div className="p-6 flex items-start gap-4">
              <span className="shrink-0 px-3 py-1 rounded-lg bg-white/10 text-white/80 text-[10px] font-black uppercase tracking-wider border border-white/10 mt-0.5">
                {activeItem.category}
              </span>
              <div>
                <h3 className="text-lg font-extrabold text-white leading-snug">
                  {activeItem.title}
                </h3>
                <p className="text-sm text-white/50 font-medium mt-1">
                  {activeItem.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
