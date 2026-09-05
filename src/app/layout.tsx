import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { getHospitalInfo } from "@/lib/data";
import { SITE_URL, absoluteUrl } from "@/lib/seo";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#588356",
};

export async function generateMetadata(): Promise<Metadata> {
  let name = "Venkata Ganapathi Physiotherapy Clinic";
  let tagline =
    "14+ Years of Modern Physiotherapy Excellence in Hanuman Junction";
  let logo: string | undefined;
  try {
    const hospitalInfo = await getHospitalInfo();
    name = `${hospitalInfo.name} ${hospitalInfo.subtitle}`.trim();
    tagline = hospitalInfo.tagline || tagline;
    logo = hospitalInfo.logo || undefined;
  } catch {
    logo = undefined;
  }

  const title = `${name} | Best Physiotherapist in Hanuman Junction, AP`;
  const description =
    `Top-rated physiotherapy clinic in Hanuman Junction, Andhra Pradesh since 2014. ` +
    `Dr. Maruthi Rao Pulavarthi (BPT, 14+ yrs) provides paralysis treatment, slipped disc & sciatica relief, ` +
    `knee replacement rehab, sports injury recovery & post-surgical physiotherapy. Book: 9441829648.`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    applicationName: name,
    keywords: [
      // Primary money keywords — city + service
      "physiotherapy in Hanuman Junction",
      "physiotherapist in Hanuman Junction",
      "best physiotherapy clinic Hanuman Junction",
      "physiotherapy clinic near me",
      "Hanuman Junction physio clinic",
      "physiotherapy Vijayawada Road",
      "physiotherapy Eluru district",
      // Treatment keywords + city
      "paralysis treatment Hanuman Junction",
      "stroke rehabilitation Andhra Pradesh",
      "slipped disc treatment Hanuman Junction",
      "sciatica pain relief Vijayawada",
      "back pain physiotherapy Hanuman Junction",
      "neck pain treatment Hanuman Junction",
      "knee pain physiotherapy Hanuman Junction",
      "knee replacement rehabilitation AP",
      "sports injury physiotherapy Hanuman Junction",
      "post surgery physiotherapy Andhra Pradesh",
      "neuro physiotherapy Vijayawada",
      "shoulder pain physiotherapy Hanuman Junction",
      // Brand keywords
      "Venkata Ganapathi Physiotherapy Clinic",
      "Dr Maruthi Rao Pulavarthi physiotherapist",
      "Dr Maruthi Rao Pulavarthi BPT",
      "VG physio clinic Hanuman Junction",
      // Adjacent localities people search from
      "physiotherapy Gudivada",
      "physiotherapy Nuzvid",
      "physiotherapy Eluru",
      "physiotherapist near Vijayawada",
    ],
    authors: [{ name: "Dr. Maruthi Rao Pulavarthi" }],
    creator: "Dr. Maruthi Rao Pulavarthi",
    publisher: name,
    category: "Healthcare",
    alternates: {
      canonical: absoluteUrl("/"),
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: absoluteUrl("/"),
      siteName: name,
      title: `${name} — Physiotherapy in Hanuman Junction`,
      description: `${tagline}. Paralysis care, spine decompression, sports rehab & post-surgical recovery. Opp. Dutta Ramachandra Rao Hospital, K.S. Talkies Road, Hanuman Junction.`,
      images: logo
        ? [{ url: logo, width: 512, height: 512, alt: `${name} logo` }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} — Physiotherapy in Hanuman Junction`,
      description:
        "Best physiotherapy clinic in Hanuman Junction since 2014. Paralysis, spine, sports & post-surgical rehab. Call 9441829648.",
      images: logo ? [logo] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: logo ? { icon: logo } : undefined,
    other: {
      // Local SEO geo signals
      "geo.region": "IN-AP",
      "geo.placename": "Hanuman Junction, Andhra Pradesh",
      "geo.position": "16.6439; 80.8458",
      ICBM: "16.6439, 80.8458",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${geist.variable} scroll-smooth antialiased`}>
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
