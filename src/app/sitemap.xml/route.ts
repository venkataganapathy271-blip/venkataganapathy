import { getGalleryItems, getHeroSlides, getHospitalInfo, getServices } from "@/lib/data";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

/* Entities assembled at runtime so they survive any tooling transforms */
const AMP = "&" + "amp;";
const LT = "&" + "lt;";
const GT = "&" + "gt;";
const QUOT = "&" + "quot;";

function esc(s: string): string {
  return s
    .replace(/&/g, AMP)
    .replace(/</g, LT)
    .replace(/>/g, GT)
    .replace(/"/g, QUOT);
}

/**
 * Google Image + Video sitemap (image:image / video:video extensions).
 * Helps service images rank in Google Images and videos in video search.
 */
export async function GET() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
  xml += ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"';
  xml += ' xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">';

  try {
    const [hospitalInfo, services, gallery, slides] = await Promise.all([
      getHospitalInfo(),
      getServices(),
      getGalleryItems(),
      getHeroSlides(),
    ]);
    const clinic = `${hospitalInfo.name} ${hospitalInfo.subtitle}`.trim();

    /* Homepage — brand + section media */
    xml += `<url><loc>${SITE_URL}/</loc><changefreq>weekly</changefreq><priority>1.0</priority>`;
    const homeImages = [
      hospitalInfo.logo,
      hospitalInfo.aboutDoctorImage,
      hospitalInfo.excellenceImage1,
      hospitalInfo.excellenceImage2,
      ...services.map((s) => s.image),
      ...gallery.filter((g) => g.mediaType === "image").map((g) => g.src),
    ].filter(Boolean);
    for (const img of homeImages) {
      xml += `<image:image><image:loc>${esc(img)}</image:loc>` +
        `<image:title>${esc(clinic)} — Physiotherapy in Hanuman Junction</image:title></image:image>`;
    }
    const homeVideos = [
      ...slides.map((s) => s.video).filter(Boolean),
      hospitalInfo.aboutVideoMain,
      hospitalInfo.aboutVideoSecondary,
    ].filter(Boolean);
    for (const vid of homeVideos) {
      xml += `<video:video><video:content_loc>${esc(vid)}</video:content_loc>` +
        `<video:title>${esc(clinic)} — Physiotherapy Hanuman Junction</video:title>` +
        `<video:thumbnail_loc>${esc(hospitalInfo.logo)}</video:thumbnail_loc></video:video>`;
    }
    xml += `</url>`;

    /* Services hub */
    xml += `<url><loc>${SITE_URL}/services</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>`;

    /* Legal pages */
    for (const slug of ["privacy-policy", "terms-conditions", "patient-rights"]) {
      xml += `<url><loc>${SITE_URL}/legal/${slug}</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>`;
    }

    /* One listing URL per service — like product pages */
    for (const s of services) {
      xml += `<url><loc>${SITE_URL}/services/${s.id}</loc><changefreq>monthly</changefreq><priority>0.9</priority>`;
      if (s.image) {
        xml += `<image:image><image:loc>${esc(s.image)}</image:loc>` +
          `<image:title>${esc(`${s.title} physiotherapy in Hanuman Junction`)}</image:title>` +
          `<image:caption>${esc(s.description)}</image:caption></image:image>`;
      }
      xml += `</url>`;
    }
  } catch {
    // DB unavailable — emit homepage-only sitemap
    xml += `<url><loc>${SITE_URL}/</loc><priority>1.0</priority></url>`;
  }

  xml += `</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
