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

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFE] text-slate-900 font-sans selection:bg-[#A8D0A6] selection:text-slate-900">
      {/* Top Header */}
      <Header />

      {/* Main Landing Page Content */}
      <main className="flex-grow">
        {/* 1. SOW 3.1 Hero Section */}
        <HeroSection />

        {/* 2. SOW 3.1 Key Achievements & Statistics Bar */}
        <StatsSection />

        {/* 3. SOW 3.2 Clinic Overview & Video Feature */}
        <AboutSection />

        {/* 4. SOW 3.3 & 3.5 Specialized Departments & Treatments */}
        <ServicesSection />

        {/* 5. SOW 3.4 Featured Doctors & Founder Spotlight */}
        <DoctorsSection />

        {/* 6. SOW 3.1 Why Choose Us / Clinical Excellence */}
        <ExcellenceSection />

        {/* 7. SOW 3.6 Facilities & Equipment Showcase */}
        <FacilitiesSection />

        {/* 8. SOW 3.7 Hospital Gallery & Infrastructure Showcase */}
        <GallerySection />

        {/* 9. SOW 3.1 Patient Recovery Testimonials */}
        <TestimonialsSection />

        {/* 10. SOW 3.9 Patient Information & FAQs */}
        <FaqSection />

        {/* 11. SOW 3.8 Contact & Appointment Enquiry Form */}
        <EnquirySection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

