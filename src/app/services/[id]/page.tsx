import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getHospitalInfo, getServices } from "@/lib/data";
import { SITE_URL, absoluteUrl, buildServiceFaqs, buildFaqPageJsonLd } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EnquirySection from "@/components/contact/EnquirySection";
import { getSiteSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

type Params = Promise<{ id: string }>;

function serviceSlug(s: { title: string }): string {
    return s.title
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export async function generateStaticParams() {
    try {
        const services = await getServices();
        return services.map((s) => ({ id: s.id }));
    } catch {
        return [];
    }
}

export async function generateMetadata({
    params,
}: {
    params: Params;
}): Promise<Metadata> {
    const { id } = await params;
    const [services, hospitalInfo] = await Promise.all([
        getServices(),
        getHospitalInfo(),
    ]);
    const service = services.find((s) => s.id === id);
    if (!service) return {};

    const title = `${service.title} in Hanuman Junction | ${hospitalInfo.name} Physiotherapy Clinic`;
    const description = `${service.title} treatment in Hanuman Junction, Andhra Pradesh at ${hospitalInfo.name} ${hospitalInfo.subtitle}. ${service.description}`.slice(
        0,
        300
    );

    return {
        title,
        description,
        keywords: [
            `${service.title} Hanuman Junction`,
            `${service.title} Vijayawada`,
            `${service.title} Andhra Pradesh`,
            `best ${service.title.toLowerCase()} clinic near me`,
            ...service.treatments.map((t) => `${t} Hanuman Junction`),
        ],
        alternates: { canonical: absoluteUrl(`/services/${service.id}`) },
        openGraph: {
            title,
            description,
            url: absoluteUrl(`/services/${service.id}`),
            images: service.image ? [{ url: service.image }] : undefined,
            type: "article",
            locale: "en_IN",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: service.image ? [service.image] : undefined,
        },
    };
}

export default async function ServiceDetailPage({ params }: { params: Params }) {
    const { id } = await params;
    const [services, hospitalInfo, siteSettings] = await Promise.all([
        getServices(),
        getHospitalInfo(),
        getSiteSettings(),
    ]);
    const service = services.find((s) => s.id === id);
    if (!service) notFound();

    const clinicName = `${hospitalInfo.name} ${hospitalInfo.subtitle}`.trim();
    const others = services.filter((s) => s.id !== service.id);
    const serviceFaqs = buildServiceFaqs(service, hospitalInfo);
    const faqJsonLd = buildFaqPageJsonLd(serviceFaqs, `/services/${service.id}`);

    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "MedicalTherapy",
        name: `${service.title} in Hanuman Junction`,
        description: service.description,
        url: absoluteUrl(`/services/${service.id}`),
        image: service.image,
        provider: {
            "@type": ["Physiotherapy", "MedicalClinic"],
            "@id": absoluteUrl("/#clinic"),
            name: clinicName,
            telephone: hospitalInfo.primaryPhone,
            address: {
                "@type": "PostalAddress",
                streetAddress: hospitalInfo.address,
                addressLocality: "Hanuman Junction",
                addressRegion: "Andhra Pradesh",
                postalCode: "521105",
                addressCountry: "IN",
            },
        },
        areaServed: ["Hanuman Junction", "Vijayawada", "Eluru", "Gudivada", "Nuzvid"],
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            {
                "@type": "ListItem",
                position: 2,
                name: "Physiotherapy Services",
                item: absoluteUrl("/services"),
            },
            {
                "@type": "ListItem",
                position: 3,
                name: service.title,
                item: absoluteUrl(`/services/${service.id}`),
            },
        ],
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#FAFAFE] text-slate-900 font-sans selection:bg-[#A8D0A6] selection:text-slate-900">
            <JsonLd data={serviceJsonLd} />
            <JsonLd data={breadcrumbJsonLd} />
            <JsonLd data={faqJsonLd} />

            <Header hospitalInfo={hospitalInfo} siteSettings={siteSettings} />

            <main className="flex-grow">
                {/* Hero */}
                <section className="pt-10 pb-8 sm:pt-14">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <nav aria-label="Breadcrumb" className="text-xs font-bold text-slate-400 mb-4">
                            <Link href="/" className="hover:text-slate-900 transition-colors">
                                Home
                            </Link>
                            <span className="mx-2">/</span>
                            <Link href="/services" className="hover:text-slate-900 transition-colors">
                                Services
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="text-slate-900">{service.title}</span>
                        </nav>

                        <div className="grid lg:grid-cols-2 gap-8 items-center">
                            <div>
                                <p className="text-xs font-black text-[#588356] uppercase tracking-widest mb-3">
                                    {service.category} — Hanuman Junction
                                </p>
                                <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                                    {service.title} in Hanuman Junction
                                </h1>
                                <p className="mt-4 text-slate-600 leading-relaxed">
                                    {service.description}
                                </p>
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <a
                                        href={`tel:${hospitalInfo.primaryPhone}`}
                                        className="px-5 py-3 rounded-xl bg-[#588356] hover:bg-[#4a6f49] text-white text-sm font-bold transition-colors"
                                    >
                                        Call {hospitalInfo.primaryPhone}
                                    </a>
                                    <a
                                        href="/#contact"
                                        className="px-5 py-3 rounded-xl border border-slate-300 hover:border-slate-900 text-slate-900 text-sm font-bold transition-colors"
                                    >
                                        Book Appointment
                                    </a>
                                </div>
                            </div>
                            {service.image && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={service.image}
                                    alt={`${service.title} physiotherapy treatment at ${clinicName}, Hanuman Junction`}
                                    className="w-full rounded-2xl border border-slate-200 object-cover"
                                    loading="eager"
                                />
                            )}
                        </div>
                    </div>
                </section>

                {/* Treatments & Features */}
                <section className="py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
                        {service.treatments.length > 0 && (
                            <div className="bg-white rounded-2xl border border-slate-200 p-6">
                                <h2 className="text-lg font-black mb-4">
                                    {service.title} Treatments We Offer
                                </h2>
                                <ul className="space-y-2.5">
                                    {service.treatments.map((t) => (
                                        <li key={t} className="flex items-start gap-2.5 text-sm text-slate-600">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#588356] mt-1.5 shrink-0" />
                                            {t}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {service.features.length > 0 && (
                            <div className="bg-white rounded-2xl border border-slate-200 p-6">
                                <h2 className="text-lg font-black mb-4">Why Choose Us</h2>
                                <ul className="space-y-2.5">
                                    {service.features.map((f) => (
                                        <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#588356] mt-1.5 shrink-0" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </section>

                {/* Doctor */}
                {service.doctorInCharge && (
                    <section className="py-8">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#588356]/10 flex items-center justify-center text-[#588356] font-black">
                                    {service.doctorInCharge.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                                        Doctor in charge
                                    </p>
                                    <p className="font-bold">{service.doctorInCharge}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Service-specific FAQs */}
                {serviceFaqs.length > 0 && (
                    <section id="faq" className="py-8">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-lg font-black mb-4">
                                {service.title} in Hanuman Junction — Frequently Asked Questions
                            </h2>
                            <div className="space-y-3">
                                {serviceFaqs.map((f) => (
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
                        </div>
                    </section>
                )}

                {/* Other services */}
                {others.length > 0 && (
                    <section className="py-8 pb-14">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-lg font-black mb-4">Other Physiotherapy Services</h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {others.map((s) => (
                                    <Link
                                        key={s.id}
                                        href={`/services/${s.id}`}
                                        className="group bg-white rounded-xl border border-slate-200 p-4 hover:border-[#588356] transition-colors"
                                    >
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
                                            {s.category}
                                        </p>
                                        <p className="font-bold group-hover:text-[#588356] transition-colors">
                                            {s.title}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                                            {s.description}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Contact / booking */}
                <EnquirySection hospitalInfo={hospitalInfo} siteSettings={siteSettings} />
            </main>

            <Footer hospitalInfo={hospitalInfo} siteSettings={siteSettings} />
        </div>
    );
}
