import type { MetadataRoute } from "next";
import { getHospitalInfo } from "@/lib/data";
import { SITE_URL } from "@/lib/seo";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  let logo =
    "https://res.cloudinary.com/djnlblv5m/image/upload/v1788004579/venkataganapathi/branding/logo.png";
  try {
    const hospitalInfo = await getHospitalInfo();
    if (hospitalInfo.logo) logo = hospitalInfo.logo;
  } catch {
    // fall back to hardcoded logo above
  }

  return {
    name: "Venkata Ganapathi Physiotherapy Clinic — Hanuman Junction",
    short_name: "VG Physio Clinic",
    description:
      "Physiotherapy clinic in Hanuman Junction since 2014. Paralysis care, slipped disc decompression, sports injury rehab & post-surgical recovery by Dr. Maruthi Rao Pulavarthi.",
    start_url: SITE_URL,
    scope: SITE_URL,
    display: "standalone",
    background_color: "#FAFAFE",
    theme_color: "#588356",
    icons: [
      {
        src: logo,
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
