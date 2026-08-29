import type {
  DoctorDoc,
  FaqDoc,
  GalleryItemDoc,
  HeroSlideDoc,
  HospitalInfoDoc,
  ServiceDoc,
  TestimonialDoc,
} from "./data";

/* ------------------------------------------------------------------ */
/* Canonical site URL — override per environment via NEXT_PUBLIC_SITE_URL */
/* ------------------------------------------------------------------ */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.hanumanjunctionphysioclinic.com"
).replace(/\/+$/, "");

export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/* Clinic geo coordinates — Hanuman Junction, Andhra Pradesh, India */
const LAT = 16.6439;
const LNG = 80.8458;

const OPEN_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function clinicName(h: HospitalInfoDoc): string {
  return `${h.name} ${h.subtitle}`.trim();
}

function postalAddress(h: HospitalInfoDoc): Record<string, unknown> {
  return {
    "@type": "PostalAddress",
    streetAddress: h.address,
    addressLocality: "Hanuman Junction",
    addressRegion: "Andhra Pradesh",
    postalCode: "521105",
    addressCountry: "IN",
  };
}

/* ------------------------------------------------------------------ */
/* Physiotherapy / MedicalClinic / LocalBusiness — the core local-SEO   */
/* entity. Powers the Knowledge Panel, local pack and rich results.     */
/* ------------------------------------------------------------------ */
export function buildClinicJsonLd(
  hospitalInfo: HospitalInfoDoc,
  services: ServiceDoc[],
  doctors: DoctorDoc[],
  testimonials: TestimonialDoc[]
): Record<string, unknown> {
  const rated = testimonials.filter((t) => Number(t.rating) > 0);
  const avgRating = rated.length
    ? rated.reduce((sum, t) => sum + Number(t.rating), 0) / rated.length
    : 0;

  const sameAs = [
    hospitalInfo.facebookUrl,
    hospitalInfo.instagramUrl,
    hospitalInfo.twitterUrl,
    hospitalInfo.youtubeUrl,
  ].filter((u): u is string => Boolean(u) && u !== "#");

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["Physiotherapy", "MedicalClinic", "LocalBusiness"],
    "@id": absoluteUrl("/#clinic"),
    name: clinicName(hospitalInfo),
    alternateName: hospitalInfo.name,
    description: hospitalInfo.footerAbout,
    slogan: hospitalInfo.tagline,
    url: SITE_URL,
    logo: hospitalInfo.logo,
    image: [
      hospitalInfo.logo,
      hospitalInfo.excellenceImage1,
      hospitalInfo.excellenceImage2,
    ].filter(Boolean),
    telephone: hospitalInfo.primaryPhone,
    email: hospitalInfo.email,
    address: postalAddress(hospitalInfo),
    geo: { "@type": "GeoCoordinates", latitude: LAT, longitude: LNG },
    hasMap: hospitalInfo.googleMapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: OPEN_DAYS,
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "00:00",
        closes: "00:00",
      },
    ],
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Card",
    medicalSpecialty: "Physiotherapy",
    isAcceptingNewPatients: true,
    availableLanguage: ["English", "Telugu"],
    areaServed: [
      "Hanuman Junction",
      "Vijayawada",
      "Eluru",
      "Gudivada",
      "Nuzvid",
      "Andhra Pradesh",
    ],
    sameAs,
    founder: {
      "@type": "Person",
      name: hospitalInfo.chiefDoctor,
      jobTitle: "Chief Physiotherapist",
      honorificSuffix: hospitalInfo.doctorQualification,
      worksFor: { "@id": absoluteUrl("/#clinic") },
    },
    employee: doctors.map((d) => ({
      "@type": "Physician",
      name: d.name,
      jobTitle: d.title,
      medicalSpecialty: d.specialization || "Physiotherapy",
      worksFor: { "@id": absoluteUrl("/#clinic") },
    })),
    availableService: services.map((s) => ({
      "@type": "MedicalTherapy",
      name: s.title,
      description: s.description,
    })),
    potentialAction: {
      "@type": "ReserveAction",
      name: "Book Physiotherapy Consultation",
      target: {
        "@type": "EntryPoint",
        urlTemplate: absoluteUrl("/#contact"),
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
    },
  };

  if (avgRating > 0 && rated.length > 0) {
    jsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: Number(avgRating.toFixed(1)),
      reviewCount: rated.length,
      bestRating: 5,
      worstRating: 1,
    };
    jsonLd.review = rated.slice(0, 5).map((t) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating,
        bestRating: 5,
        worstRating: 1,
      },
      author: { "@type": "Person", name: t.patientName },
      reviewBody: t.comment,
    }));
  }

  return jsonLd;
}

/* ------------------------------------------------------------------ */
/* FAQPage — eligible for rich-result expandable FAQs in Google SERPs   */
/* ------------------------------------------------------------------ */
export function buildFaqJsonLd(faqs: FaqDoc[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": absoluteUrl("/#faq"),
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export interface FaqPair {
  question: string;
  answer: string;
}

/* FAQPage JSON-LD for any sub-page (service listings, hub). The Q&As   */
/* passed in MUST also be rendered visibly on that page.                */
export function buildFaqPageJsonLd(
  faqs: FaqPair[],
  urlPath: string
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": absoluteUrl(`${urlPath}#faq`),
    url: absoluteUrl(urlPath),
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/* ------------------------------------------------------------------ */
/* Auto-generated, service-specific + local Q&As for /services/[id].    */
/* Every answer is derived from live DB data (name, phone, address,     */
/* timing, doctor, treatments) so admin edits stay in sync.             */
/* ------------------------------------------------------------------ */
export function buildServiceFaqs(
  service: ServiceDoc,
  hospitalInfo: HospitalInfoDoc
): FaqPair[] {
  const clinic = clinicName(hospitalInfo);
  const faqs: FaqPair[] = [];

  faqs.push({
    question: `Where can I get ${service.title} treatment in Hanuman Junction?`,
    answer: `${clinic} offers ${service.title} in Hanuman Junction, Andhra Pradesh. ${service.description} We are located at ${hospitalInfo.address}, easily reachable from Vijayawada, Eluru, Gudivada and Nuzvid.`,
  });

  if (service.treatments.length > 0) {
    faqs.push({
      question: `What conditions does ${service.title} at ${clinic} treat?`,
      answer: `Our ${service.title} program in Hanuman Junction covers ${service.treatments
        .slice(0, 6)
        .join(", ")}. Every plan is customized after a complete physical evaluation by our physiotherapists.`,
    });
  }

  faqs.push({
    question: `Do I need a doctor's referral to start ${service.title}?`,
    answer: `No referral is mandatory. You can walk in directly or call ${hospitalInfo.primaryPhone} to book a consultation — our team will assess your condition and build a customized ${service.title.toLowerCase()} treatment plan for you.`,
  });

  if (service.doctorInCharge) {
    faqs.push({
      question: `Who provides ${service.title} at ${hospitalInfo.name}?`,
      answer: `${service.doctorInCharge} leads the ${service.title} program at our Hanuman Junction clinic, supported by trained physiotherapy staff and modern rehabilitation equipment.`,
    });
  }

  faqs.push({
    question: `How do I book a ${service.title} appointment in Hanuman Junction?`,
    answer: `Call ${hospitalInfo.primaryPhone} or use the enquiry form on this page. Clinic timings: ${hospitalInfo.timing}. Walk-ins are welcome, but booking in advance keeps your waiting time minimal.`,
  });

  faqs.push({
    question: `Do patients from Vijayawada, Eluru, Gudivada or Nuzvid come to ${hospitalInfo.name} for ${service.title}?`,
    answer: `Yes. Patients from Vijayawada, Eluru, Gudivada, Nuzvid and surrounding villages regularly visit our Hanuman Junction clinic for ${service.title}. We are situated on the Vijayawada–Eluru route, making travel convenient from all nearby towns.`,
  });

  return faqs;
}

/* Local clinic-level Q&As for the /services hub page.                  */
export function buildLocalClinicFaqs(
  hospitalInfo: HospitalInfoDoc,
  services: ServiceDoc[]
): FaqPair[] {
  const clinic = clinicName(hospitalInfo);
  const serviceTitles = services.map((s) => s.title).join(", ");

  return [
    {
      question: "What physiotherapy services are available in Hanuman Junction?",
      answer: `${clinic} provides ${serviceTitles}. Each treatment is delivered with modern equipment and a personalized recovery plan designed by experienced physiotherapists.`,
    },
    {
      question: `Where is ${hospitalInfo.name} located and what are the timings?`,
      answer: `We are located at ${hospitalInfo.address}, Andhra Pradesh 521105. Clinic timings: ${hospitalInfo.timing}. For appointments, call ${hospitalInfo.primaryPhone}.`,
    },
    {
      question: `Is ${hospitalInfo.name} accessible from Vijayawada and Eluru?`,
      answer: `Yes. Our Hanuman Junction clinic sits on the Vijayawada–Eluru route, so patients from Vijayawada, Eluru, Gudivada, Nuzvid and nearby villages can reach us easily by road.`,
    },
    {
      question: "How do I book a physiotherapy consultation near Hanuman Junction?",
      answer: `Call ${hospitalInfo.primaryPhone} or fill the enquiry form on any service page. No doctor referral is needed — walk in directly for a complete physical evaluation and customized treatment plan.`,
    },
  ];
}

/* ------------------------------------------------------------------ */
/* VideoObject — hero slides + about videos (video rich results)        */
/* ------------------------------------------------------------------ */
export function buildVideosJsonLd(
  hospitalInfo: HospitalInfoDoc,
  slides: HeroSlideDoc[]
): Record<string, unknown>[] {
  const publisher = {
    "@type": "Organization",
    name: clinicName(hospitalInfo),
    logo: { "@type": "ImageObject", url: hospitalInfo.logo },
  };

  const entries: { name: string; description: string; url: string; thumb: string }[] = [];

  for (const s of slides) {
    if (s.video) {
      entries.push({
        name: `${s.line1} ${s.line2}`.trim() || "Physiotherapy Clinic — Hanuman Junction",
        description: hospitalInfo.tagline,
        url: s.video,
        thumb: s.poster || hospitalInfo.logo,
      });
    }
  }
  if (hospitalInfo.aboutVideoMain) {
    entries.push({
      name: "Clinic Overview — Modern Physiotherapy in Hanuman Junction",
      description: hospitalInfo.footerAbout,
      url: hospitalInfo.aboutVideoMain,
      thumb: hospitalInfo.logo,
    });
  }
  if (hospitalInfo.aboutVideoSecondary) {
    entries.push({
      name: "Advanced Physiotherapy Treatment Highlights",
      description: hospitalInfo.tagline,
      url: hospitalInfo.aboutVideoSecondary,
      thumb: hospitalInfo.logo,
    });
  }

  return entries.map((v) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.name,
    description: v.description,
    thumbnailUrl: [v.thumb],
    uploadDate: "2025-01-01T00:00:00+05:30",
    contentUrl: v.url,
    embedUrl: v.url,
    publisher,
  }));
}

/* ------------------------------------------------------------------ */
/* ImageGallery — facility/equipment/therapy photos (image search)      */
/* ------------------------------------------------------------------ */
export function buildGalleryJsonLd(
  items: GalleryItemDoc[],
  hospitalInfo: HospitalInfoDoc
): Record<string, unknown> {
  const images = items.filter((i) => i.mediaType === "image" && i.src);
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": absoluteUrl("/#gallery"),
    name: `${clinicName(hospitalInfo)} — Facility & Therapy Gallery`,
    url: absoluteUrl("/#gallery"),
    isPartOf: { "@id": absoluteUrl("/#clinic") },
    image: images.map((i) => ({
      "@type": "ImageObject",
      contentUrl: i.src,
      name: i.title,
      description: i.description,
      creditText: clinicName(hospitalInfo),
    })),
  };
}

/* ------------------------------------------------------------------ */
/* ItemList of service pages — internal-link discovery for crawlers     */
/* ------------------------------------------------------------------ */
export function buildServicesItemListJsonLd(services: ServiceDoc[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Physiotherapy Services in Hanuman Junction",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${s.title} in Hanuman Junction`,
      url: absoluteUrl(`/services/${s.id}`),
    })),
  };
}

/* ------------------------------------------------------------------ */
/* WebSite + publisher — ties the site to the clinic entity             */
/* ------------------------------------------------------------------ */
export function buildWebsiteJsonLd(hospitalInfo: HospitalInfoDoc): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: clinicName(hospitalInfo),
    alternateName: hospitalInfo.name,
    url: SITE_URL,
    inLanguage: "en-IN",
    publisher: {
      "@type": "MedicalClinic",
      "@id": absoluteUrl("/#clinic"),
      name: clinicName(hospitalInfo),
      logo: hospitalInfo.logo,
      telephone: hospitalInfo.primaryPhone,
      address: postalAddress(hospitalInfo),
    },
  };
}
