import Header from "@/components/layout/Header";
import HeroSection from "@/components/hero/HeroSection";
import StatsSection from "@/components/stats/StatsSection";
import AboutSection from "@/components/about/AboutSection";
import ServicesSection from "@/components/departments/ServicesSection";
import ExcellenceSection from "@/components/features/ExcellenceSection";
import DoctorsSection from "@/components/doctors/DoctorsSection";
import FacilitiesSection from "@/components/facilities/FacilitiesSection";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import EnquirySection from "@/components/contact/EnquirySection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFE] text-slate-900 font-sans selection:bg-[#A8D0A6] selection:text-slate-900">
      {/* Top Header */}
      <Header />

      {/* Main Landing Page Content */}
      <main className="flex-grow">
        {/* 1. Hero Section with Live Background Video */}
        <HeroSection />

        {/* 2. Key Achievements & Statistics Bar */}
        <StatsSection />

        {/* 3. Clinic Overview & Video Feature */}
        <AboutSection />

        {/* 5. Specialized Departments & Treatments */}
        <ServicesSection />

        {/* 7. Featured Doctors & Lead Specialist */}
        <DoctorsSection />

        {/* 8. Facilities & Equipment Showcase */}
        <FacilitiesSection />

        {/* 9. Verified Patient Recovery Testimonials */}
        <TestimonialsSection />

        {/* 10. Contact & Appointment Enquiry Form */}
        <EnquirySection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
