import Header from "@/components/layout/Header";
import HeroSection from "@/components/hero/HeroSection";
import StatsSection from "@/components/stats/StatsSection";
import AboutSection from "@/components/about/AboutSection";
import ServicesSection from "@/components/departments/ServicesSection";
import ExcellenceSection from "@/components/features/ExcellenceSection";
import DoctorsSection from "@/components/doctors/DoctorsSection";
import FacilitiesSection from "@/components/facilities/FacilitiesSection";
import GallerySection from "@/components/gallery/GallerySection";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import FaqSection from "@/components/faq/FaqSection";
import EnquirySection from "@/components/contact/EnquirySection";
import Footer from "@/components/layout/Footer";
import { FloatingCTA } from "@/components/layout/FloatingCTA";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildClinicJsonLd,
  buildFaqJsonLd,
  buildGalleryJsonLd,
  buildVideosJsonLd,
  buildWebsiteJsonLd,
  buildServicesItemListJsonLd,
} from "@/lib/seo";
import {
  getHospitalInfo,
  getSiteSettings,
  getHeroSlides,
  getStats,
  getAboutPillars,
  getServices,
  getDoctors,
  getFacilities,
  getGalleryItems,
  getTestimonials,
  getFaqs,
} from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [
    hospitalInfo,
    siteSettings,
    heroSlides,
    stats,
    pillars,
    services,
    doctors,
    facilities,
    galleryItems,
    testimonials,
    faqs,
  ] = await Promise.all([
    getHospitalInfo(),
    getSiteSettings(),
    getHeroSlides(),
    getStats(),
    getAboutPillars(),
    getServices(),
    getDoctors(),
    getFacilities(),
    getGalleryItems(),
    getTestimonials(),
    getFaqs(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFE] text-slate-900 font-sans selection:bg-[#A8D0A6] selection:text-slate-900">
      {/* Structured data for Google rich results — invisible, no UI impact */}
      <JsonLd data={buildWebsiteJsonLd(hospitalInfo)} />
      <JsonLd data={buildServicesItemListJsonLd(services)} />
      <JsonLd data={buildClinicJsonLd(hospitalInfo, services, doctors, testimonials)} />
      <JsonLd data={buildFaqJsonLd(faqs)} />
      <JsonLd data={buildGalleryJsonLd(galleryItems, hospitalInfo)} />
      {buildVideosJsonLd(hospitalInfo, heroSlides).map((video, i) => (
        <JsonLd key={i} data={video} />
      ))}
      {/* Top Header */}
      <Header hospitalInfo={hospitalInfo} siteSettings={siteSettings} />

      {/* Main Landing Page Content */}
      <main className="flex-grow">
        {/* 1. SOW 3.1 Hero Section */}
        <HeroSection slides={heroSlides} hospitalInfo={hospitalInfo} />

        {/* 2. SOW 3.1 Key Achievements & Statistics Bar */}
        <StatsSection stats={stats} />

        {/* 3. SOW 3.2 Clinic Overview & Video Feature */}
        <AboutSection hospitalInfo={hospitalInfo} pillars={pillars} />

        {/* 4. SOW 3.3 & 3.5 Specialized Departments & Treatments */}
        <ServicesSection services={services} />

        {/* 5. SOW 3.4 Featured Doctors & Founder Spotlight */}
        <DoctorsSection doctors={doctors} hospitalInfo={hospitalInfo} />

        {/* 6. SOW 3.1 Why Choose Us / Clinical Excellence */}
        <ExcellenceSection hospitalInfo={hospitalInfo} />

        {/* 7. SOW 3.6 Facilities & Equipment Showcase */}
        <FacilitiesSection facilities={facilities} />

        {/* 8. SOW 3.7 Hospital Gallery & Infrastructure Showcase */}
        <GallerySection galleryItems={galleryItems} />

        {/* 9. SOW 3.1 Patient Recovery Testimonials */}
        <TestimonialsSection testimonials={testimonials} />

        {/* 10. SOW 3.9 Patient Information & FAQs */}
        <FaqSection faqs={faqs} hospitalInfo={hospitalInfo} />

        {/* 11. SOW 3.8 Contact & Appointment Enquiry Form */}
        <EnquirySection hospitalInfo={hospitalInfo} siteSettings={siteSettings} />
      </main>

      {/* Footer */}
      <Footer hospitalInfo={hospitalInfo} siteSettings={siteSettings} />

      {/* Floating CTA (appears on scroll) */}
      <FloatingCTA hospitalInfo={hospitalInfo} />
    </div>
  );
}
