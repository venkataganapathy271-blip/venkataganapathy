import type { Metadata } from "next";
import Link from "next/link";
import { getHospitalInfo, getServices, getSiteSettings } from "@/lib/data";
import { absoluteUrl, buildLocalClinicFaqs, buildFaqPageJsonLd } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const hospitalInfo = await getHospitalInfo();
  const name = `${hospitalInfo.name} ${hospitalInfo.subtitle}`.trim();
  return {
    title: `Physiotherapy Services in Hanuman Junction | ${name}`,
    description:
      "Explore all physiotherapy treatments in Hanuman Junction: orthopedic & joint rehab, spine & disc decompression, stroke paralysis recovery, sports injury, manual therapy & dry needling. Book consultation today.",
    alternates: { canonical: absoluteUrl("/services") },
    openGraph: {
      title: `Physiotherapy Services in Hanuman Junction | ${name}`,
      url: absoluteUrl("/services"),
      type: "website",
      locale: "en_IN",
    },
  };
}

export default async function ServicesHubPage() {
  const [services, hospitalInfo, siteSettings] = await Promise.all([
    getServices(),
    getHospitalInfo(),
    getSiteSettings(),
  ]);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Physiotherapy Services in Hanuman Junction",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      url: absoluteUrl(`/services/${s.id}`),
    })),
  };

  const localFaqs = buildLocalClinicFaqs(hospitalInfo, services);
  const faqJsonLd = buildFaqPageJsonLd(localFaqs, "/services");

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFE] text-slate-900 font-sans selection:bg-[#A8D0A6] selection:text-slate-900">
      <JsonLd data={itemListJsonLd} />
      <JsonLd data={faqJsonLd} />
      <Header hospitalInfo={hospitalInfo} siteSettings={siteSettings} />

      <main className="flex-grow py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Physiotherapy Services in Hanuman Junction
          </h1>
          <p className="mt-3 text-slate-600 max-w-2xl">
            Specialized physiotherapy treatments at {hospitalInfo.name}{" "}
            {hospitalInfo.subtitle} — serving Hanuman Junction, Vijayawada, Eluru,
            Gudivada & Nuzvid since 2014.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.id}`}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-[#588356] transition-colors"
              >
                {s.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={s.image}
                    alt={`${s.title} physiotherapy in Hanuman Junction`}
                    className="w-full aspect-video object-cover"
                    loading="lazy"
                  />
                )}
                <div className="p-5">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
                    {s.category}
                  </p>
                  <p className="font-bold group-hover:text-[#588356] transition-colors">
                    {s.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">
                    {s.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Local clinic FAQs */}
          <section id="faq" className="mt-14">
            <h2 className="text-2xl font-black tracking-tight">
              Physiotherapy in Hanuman Junction — FAQs
            </h2>
            <div className="mt-5 space-y-3">
              {localFaqs.map((f) => (
                <details
                  key={f.question}
                  className="group bg-white rounded-xl border border-slate-200 open:border-[#588356]/40"
                >
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4 text-sm font-bold select-none">
                    {f.question}
                    <span className="text-[#588356] font-black text-lg leading-none transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer hospitalInfo={hospitalInfo} siteSettings={siteSettings} />
    </div>
  );
}
