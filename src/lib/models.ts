import mongoose, { Schema, models, model } from "mongoose";

/* ============ 1. Hospital Info (Singleton) ============ */
const HospitalInfoSchema = new Schema(
  {
    name: { type: String, required: true },
    subtitle: { type: String, required: true },
    tagline: { type: String, default: "" },
    regNo: { type: String, default: "" },
    chiefDoctor: { type: String, default: "" },
    doctorQualification: { type: String, default: "" },
    primaryPhone: { type: String, required: true },
    secondaryPhone: { type: String, default: "" },
    emergencyPhone: { type: String, default: "" },
    email: { type: String, default: "" },
    address: { type: String, default: "" },
    timing: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
    googleMapsUrl: { type: String, default: "" },
    logo: { type: String, default: "" },
    facebookUrl: { type: String, default: "https://www.facebook.com/share/1BpVQYJbak/" },
    instagramUrl: { type: String, default: "#" },
    twitterUrl: { type: String, default: "#" },
    youtubeUrl: { type: String, default: "#" },
    footerAbout: {
      type: String,
      default:
        "A state-of-the-art super-speciality hospital dedicated to non-surgical joint rehabilitation, computerized spine decompression, sports injury science, and post-stroke movement recovery.",
    },
    footerAccreditation: { type: String, default: "NABH & Quality Healthcare Accredited" },
    aboutVideoMain: { type: String, default: "" },
    aboutVideoSecondary: { type: String, default: "" },
    aboutDoctorImage: { type: String, default: "" },
    excellenceImage1: { type: String, default: "" },
    excellenceImage2: { type: String, default: "" },
  },
  { timestamps: true }
);

/* ============ 2. Hero Slides ============ */
const HeroSlideSchema = new Schema(
  {
    video: { type: String, required: true },
    poster: { type: String, required: true },
    line1: { type: String, required: true },
    line2: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/* ============ 3. Stats ============ */
const StatSchema = new Schema(
  {
    value: { type: String, required: true },
    line1: { type: String, required: true },
    line2: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/* ============ 4. Services ============ */
const ServiceSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    badge: { type: String, default: "" },
    isHighlighted: { type: Boolean, default: false },
    category: { type: String, default: "" },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    treatments: { type: [String], default: [] },
    features: { type: [String], default: [] },
    doctorInCharge: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/* ============ 6. Doctors ============ */
const DoctorSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    title: { type: String, default: "" },
    qualification: { type: String, default: "" },
    regNo: { type: String, default: "" },
    specialization: { type: String, default: "" },
    specializations: { type: [String], default: [] },
    experienceYears: { type: Number, default: 0 },
    departmentId: { type: String, default: "" },
    departmentName: { type: String, default: "" },
    bio: { type: String, default: "" },
    availableDays: { type: String, default: "" },
    image: { type: String, default: "" },
    rating: { type: Number, default: 5 },
    patientsCount: { type: Number, default: 0 },
    /* DoctorsSection team card fields */
    role: { type: String, default: "" },
    expertise: { type: String, default: "" },
    imageClassName: { type: String, default: "" },
    accent: { type: String, default: "#588356" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/* ============ 7. Facilities ============ */
const FacilitySchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, default: "" },
    badge: { type: String, default: "" },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    highlights: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/* ============ 8. Gallery Items ============ */
const GalleryItemSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, default: "" },
    category: { type: String, enum: ["Facilities", "Equipment", "Therapy", "Video"], default: "Facilities" },
    mediaType: { type: String, enum: ["image", "video"], default: "image" },
    src: { type: String, required: true },
    description: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/* ============ 9. FAQs ============ */
const FaqSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    category: { type: String, enum: ["Treatments", "Appointments", "General"], default: "General" },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/* ============ 10. Testimonials ============ */
const TestimonialSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    patientName: { type: String, required: true },
    patientAge: { type: Number, default: 0 },
    condition: { type: String, default: "" },
    recoveryPeriod: { type: String, default: "" },
    rating: { type: Number, default: 5 },
    comment: { type: String, default: "" },
    doctorName: { type: String, default: "" },
    avatar: { type: String, default: "" },
    verified: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/* ============ 12. About Pillars ============ */
const AboutPillarSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    desc: { type: String, default: "" },
    iconName: { type: String, default: "HeartPulse" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/* ============ 13. Enquiries ============ */
const EnquirySchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: "" },
    department: { type: String, default: "" },
    preferredDate: { type: String, default: "" },
    message: { type: String, default: "" },
    status: { type: String, enum: ["new", "contacted", "closed"], default: "new" },
  },
  { timestamps: true }
);

/* ============ 14. Admin Users ============ */
const AdminUserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

/* ============ 15. Site Settings (nav links, footer links, dept options) ============ */
const SiteSettingsSchema = new Schema(
  {
    navLinks: {
      type: [
        {
          name: { type: String, required: true },
          href: { type: String, required: true },
        },
      ],
      default: [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Services", href: "#departments" },
        { name: "Doctors", href: "#doctors" },
        { name: "Facilities", href: "#facilities" },
        { name: "Gallery", href: "#gallery" },
        { name: "FAQs", href: "#faq" },
        { name: "Contact", href: "#contact" },
      ],
    },
    footerQuickLinks: {
      type: [
        {
          label: { type: String, required: true },
          href: { type: String, required: true },
        },
      ],
      default: [
        { label: "Home", href: "#home" },
        { label: "About Hospital", href: "#about" },
        { label: "Departments", href: "#departments" },
        { label: "Our Doctors", href: "#doctors" },
        { label: "Facilities", href: "#facilities" },
        { label: "Patient Reviews", href: "#testimonials" },
        { label: "Book Consultation", href: "#contact" },
      ],
    },
    footerDepartments: {
      type: [String],
      default: [
        "Orthopedic & Joint Rehab",
        "Spine & Slipped Disc Decompression",
        "Neurological Paralysis Rehab",
        "Sports Injury & Performance",
        "Post-Surgical Mobility Care",
        "Pediatric & Geriatric Therapy",
        "High-Intensity Laser Therapy (HILT)",
        "Digital Gait Analysis Studio",
      ],
    },
    enquiryDepartments: {
      type: [
        {
          value: { type: String, required: true },
          label: { type: String, required: true },
        },
      ],
      default: [
        { value: "orthopedic-rehab", label: "Orthopedic Rehabilitation" },
        { value: "spine-joint", label: "Spine & Sciatica Care" },
        { value: "neuro-rehab", label: "Neurological & Stroke Rehab" },
        { value: "sports-injury", label: "Sports Injury Clinic" },
        { value: "post-surgery", label: "Post-Surgical Care" },
        { value: "pediatric-geriatric", label: "Pediatric & Geriatric Therapy" },
      ],
    },
  },
  { timestamps: true }
);

/* ============ Legal Pages (Privacy Policy / Terms / Patient Rights) ============ */
const LegalPageSectionSchema = new Schema(
  {
    heading: { type: String, required: true },
    body: { type: String, required: true },
  },
  { _id: false }
);

const LegalPageSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    sections: { type: [LegalPageSectionSchema], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/* ============ Register Models (avoid recompile on hot reload) ============ */
export const HospitalInfo = models.HospitalInfo || model("HospitalInfo", HospitalInfoSchema);
export const HeroSlide = models.HeroSlide || model("HeroSlide", HeroSlideSchema);
export const Stat = models.Stat || model("Stat", StatSchema);
export const Service = models.Service || model("Service", ServiceSchema);
export const Doctor = models.Doctor || model("Doctor", DoctorSchema);
export const Facility = models.Facility || model("Facility", FacilitySchema);
export const GalleryItem = models.GalleryItem || model("GalleryItem", GalleryItemSchema);
export const Faq = models.Faq || model("Faq", FaqSchema);
export const Testimonial = models.Testimonial || model("Testimonial", TestimonialSchema);
export const AboutPillar = models.AboutPillar || model("AboutPillar", AboutPillarSchema);
export const Enquiry = models.Enquiry || model("Enquiry", EnquirySchema);
export const AdminUser = models.AdminUser || model("AdminUser", AdminUserSchema);
export const SiteSettings = models.SiteSettings || model("SiteSettings", SiteSettingsSchema);
export const LegalPage = models.LegalPage || model("LegalPage", LegalPageSchema);

export const COLLECTIONS = {
  hospitalInfo: HospitalInfo,
  heroSlides: HeroSlide,
  stats: Stat,
  services: Service,
  doctors: Doctor,
  facilities: Facility,
  galleryItems: GalleryItem,
  faqs: Faq,
  testimonials: Testimonial,
  aboutPillars: AboutPillar,
  enquiries: Enquiry,
  siteSettings: SiteSettings,
  legalPages: LegalPage,
} as const;

export type CollectionKey = keyof typeof COLLECTIONS;
