import type { Metadata } from "next";
import Link from "next/link";
import { getHospitalInfo, getLegalPage, getLegalPages, getSiteSettings } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const pages = await getLegalPages();
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLegalPage(slug);
  if (!page) return {};
  const hospitalInfo = await getHospitalInfo();
  const name = `${hospitalInfo.name} ${hospitalInfo.subtitle}`.trim();
  return {
    title: `${page.title} | ${name}`,
    description: page.description,
    alternates: { canonical: absoluteUrl(`/legal/${page.slug}`) },
    openGraph: {
      title: `${page.title} | ${name}`,
      description: page.description,
      url: absoluteUrl(`/legal/${page.slug}`),
      type: "website",
      locale: "en_IN",
    },
    robots: { index: true, follow: true },
  };
}

export default async function LegalPage({ params }: Params) {
  const { slug } = await params;
  const [page, pages, hospitalInfo, siteSettings] = await Promise.all([
    getLegalPage(slug),
    getLegalPages(),
    getHospitalInfo(),
    getSiteSettings(),
  ]);

  if (!page) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAFAFE] text-slate-900 font-sans selection:bg-[#A8D0A6] selection:text-slate-900">
        <Header hospitalInfo={hospitalInfo} siteSettings={siteSettings} />
        <main className="flex-grow flex items-center justify-center py-24">
          <div className="text-center">
            <h1 className="text-3xl font-black tracking-tight">Page not found</h1>
            <p className="mt-3 text-sm text-slate-500">
              The legal page you are looking for does not exist.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#588356] text-white text-sm font-bold hover:bg-[#4a6f49] transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </main>
        <Footer hospitalInfo={hospitalInfo} siteSettings={siteSettings} />
      </div>
    );
  }

  const others = pages.filter((p) => p.slug !== page.slug);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFE] text-slate-900 font-sans selection:bg-[#A8D0A6] selection:text-slate-900">
      <Header hospitalInfo={hospitalInfo} siteSettings={siteSettings} />

      <main className="flex-grow py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-xs font-bold text-slate-400 mb-4">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#588356] transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[#588356]">{page.title}</li>
            </ol>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">{page.title}</h1>
          {page.description && (
            <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed">
              {page.description}
            </p>
          )}

          <div className="mt-10 space-y-8">
            {page.sections.map((section, i) => (
              <section
                key={i}
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8"
              >
                <h2 className="text-lg sm:text-xl font-black tracking-tight text-slate-900">
                  {section.heading}
                </h2>
                <p className="mt-3 text-sm sm:text-[15px] text-slate-600 leading-relaxed whitespace-pre-line">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          {others.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-200">
              <h2 className="text-sm font-black uppercase tracking-wide text-slate-400">
                Also read
              </h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {others.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/legal/${p.slug}`}
                    className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-bold text-slate-700 hover:border-[#588356] hover:text-[#588356] transition-colors"
                  >
                    {p.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer hospitalInfo={hospitalInfo} siteSettings={siteSettings} />
    </div>
  );
}
