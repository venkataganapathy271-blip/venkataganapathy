import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getHospitalInfo, getSiteSettings } from "@/lib/data";

export default async function NotFound() {
  const [hospitalInfo, siteSettings] = await Promise.all([
    getHospitalInfo(),
    getSiteSettings(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFE] text-slate-900 font-sans selection:bg-[#A8D0A6] selection:text-slate-900">
      <Header hospitalInfo={hospitalInfo} siteSettings={siteSettings} />

      <main className="flex-grow flex items-center justify-center py-24 px-4 bg-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#A8D0A6]/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#588356]/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6 relative">
            <h1 className="text-9xl md:text-[150px] font-bold text-[#588356] leading-none tracking-tighter drop-shadow-sm">404</h1>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
              <div className="w-full h-2 bg-[#A8D0A6] -rotate-12 opacity-80 mix-blend-multiply rounded-full" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-[#142A4A] mb-4">
            Oops! Page Not Found
          </h2>
          
          <p className="text-slate-600 text-lg mb-10 max-w-lg mx-auto">
            It looks like you've reached a page that doesn't exist. The link might be broken, or the page may have been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#588356] text-white font-medium rounded-full hover:bg-[#436442] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
            >
              Return Home
            </Link>
            <Link 
              href="/#contact"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#142A4A] border border-slate-200 font-medium rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 w-full sm:w-auto"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>

      <Footer hospitalInfo={hospitalInfo} siteSettings={siteSettings} />
    </div>
  );
}
