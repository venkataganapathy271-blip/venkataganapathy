import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  getHospitalInfo,
  getHeroSlides,
  getStats,
  getServices,
  getDoctors,
  getFacilities,
  getGalleryItems,
  getFaqs,
  getTestimonials,
  getAboutPillars,
  getSiteSettings,
  getLegalPages,
} from "@/lib/data";

export const dynamic = "force-dynamic";

const HANDLERS: Record<string, () => Promise<unknown>> = {
  "hospital-info": getHospitalInfo,
  "hero-slides": getHeroSlides,
  stats: getStats,
  services: getServices,
  doctors: getDoctors,
  facilities: getFacilities,
  "gallery-items": getGalleryItems,
  faqs: getFaqs,
  testimonials: getTestimonials,
  "about-pillars": getAboutPillars,
  "site-settings": getSiteSettings,
  "legal-pages": getLegalPages,
};

export async function GET(
  _request: NextRequest,
  ctx: RouteContext<"/api/public/[collection]">
) {
  const { collection } = await ctx.params;
  const handler = HANDLERS[collection];
  if (!handler) {
    return NextResponse.json(
      { error: `Unknown collection "${collection}"` },
      { status: 404 }
    );
  }
  try {
    const data = await handler();
    return NextResponse.json({ data });
  } catch (error) {
    console.error(`[api/public/${collection}]`, error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
