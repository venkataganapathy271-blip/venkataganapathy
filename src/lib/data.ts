import connectDB from "@/lib/db";
import {
  HospitalInfo,
  HeroSlide,
  Stat,
  Service,
  Doctor,
  Facility,
  GalleryItem,
  Faq,
  Testimonial,
  AboutPillar,
  SiteSettings,
  LegalPage,
} from "@/lib/models";

/* ---------- Types (plain objects passed to client components) ---------- */

export interface HospitalInfoDoc {
  name: string;
  subtitle: string;
  tagline: string;
  regNo: string;
  chiefDoctor: string;
  doctorQualification: string;
  primaryPhone: string;
  secondaryPhone: string;
  emergencyPhone: string;
  email: string;
  address: string;
  timing: string;
  whatsapp: string;
  googleMapsUrl: string;
  logo: string;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
  footerAbout: string;
  footerAccreditation: string;
  aboutVideoMain: string;
  aboutVideoSecondary: string;
  aboutDoctorImage: string;
  excellenceImage1: string;
  excellenceImage2: string;
}

export interface HeroSlideDoc {
  video: string;
  poster: string;
  line1: string;
  line2: string;
}

export interface StatDoc {
  value: string;
  line1: string;
  line2: string;
}

export interface ServiceDoc {
  id: string;
  title: string;
  badge: string;
  isHighlighted: boolean;
  category: string;
  description: string;
  image: string;
  treatments: string[];
  features: string[];
  doctorInCharge: string;
}

export interface DoctorDoc {
  id: string;
  name: string;
  title: string;
  qualification: string;
  regNo: string;
  specialization: string;
  specializations: string[];
  experienceYears: number;
  departmentId: string;
  departmentName: string;
  bio: string;
  availableDays: string;
  image: string;
  rating: number;
  patientsCount: number;
  role: string;
  expertise: string;
  imageClassName: string;
  accent: string;
}

export interface FacilityDoc {
  id: string;
  title: string;
  category: string;
  badge: string;
  description: string;
  image: string;
  highlights: string[];
}

export interface GalleryItemDoc {
  id: string;
  title: string;
  category: "Facilities" | "Equipment" | "Therapy" | "Video";
  mediaType: "image" | "video";
  src: string;
  description: string;
}

export interface FaqDoc {
  id: string;
  category: "Treatments" | "Appointments" | "General";
  question: string;
  answer: string;
}

export interface TestimonialDoc {
  id: string;
  patientName: string;
  patientAge: number;
  condition: string;
  recoveryPeriod: string;
  rating: number;
  comment: string;
  doctorName: string;
  avatar: string;
  verified: boolean;
}

export interface AboutPillarDoc {
  id: string;
  title: string;
  desc: string;
  iconName: string;
}

export interface SiteSettingsDoc {
  navLinks: { name: string; href: string }[];
  footerQuickLinks: { label: string; href: string }[];
  footerDepartments: string[];
  enquiryDepartments: { value: string; label: string }[];
}

export interface LegalPageSection {
  heading: string;
  body: string;
}

export interface LegalPageDoc {
  slug: string;
  title: string;
  description: string;
  sections: LegalPageSection[];
  order: number;
}

/* ---------- Default fallbacks (used ONLY if DB is empty, e.g. before seeding) ---------- */

export const DEFAULT_HOSPITAL_INFO: HospitalInfoDoc = {
  name: "Venkata Ganapathi",
  subtitle: "Physiotherapy Clinic",
  tagline: "14+ Years of Modern Physiotherapy Excellence in Hanuman Junction",
  regNo: "Establishment 2014",
  chiefDoctor: "Dr. Maruthi Rao Pulavarthi",
  doctorQualification: "B.P.T, P.G. Diploma (Sports Rehab)",
  primaryPhone: "9441829648",
  secondaryPhone: "8121411991",
  emergencyPhone: "9441829648",
  email: "care@venkataganapathiphysio.com",
  address:
    "Opposite Dr. Dutta Ramachandra Rao (Rambabu Garu) Hospital, K.S. Talkies Road, Vijayawada Road, Hanuman Junction - 521105",
  timing: "Monday - Saturday: 9:00 AM - 8:00 PM (Sunday Holiday)",
  whatsapp: "919441829648",
  googleMapsUrl: "https://maps.google.com/?q=Hanuman+Junction+Vijayawada+Road",
  logo: "https://res.cloudinary.com/djnlblv5m/image/upload/v1788004579/venkataganapathi/branding/logo.png",
  facebookUrl: "https://www.facebook.com/share/1BpVQYJbak/",
  instagramUrl: "#",
  twitterUrl: "#",
  youtubeUrl: "#",
  footerAbout:
    "A state-of-the-art super-speciality hospital dedicated to non-surgical joint rehabilitation, computerized spine decompression, sports injury science, and post-stroke movement recovery.",
  footerAccreditation: "NABH & Quality Healthcare Accredited",
  aboutVideoMain: "https://res.cloudinary.com/djnlblv5m/video/upload/v1788004559/venkataganapathi/videos/hero-3.mp4",
  aboutVideoSecondary: "https://res.cloudinary.com/djnlblv5m/video/upload/v1788004550/venkataganapathi/videos/hero-1.mp4",
  aboutDoctorImage: "https://res.cloudinary.com/djnlblv5m/image/upload/v1788004565/venkataganapathi/doctors/dr-maruthi-rao.png",
  excellenceImage1: "https://res.cloudinary.com/djnlblv5m/image/upload/v1788004577/venkataganapathi/excellence/floor-hip-flexors.webp",
  excellenceImage2: "https://res.cloudinary.com/djnlblv5m/image/upload/v1788004578/venkataganapathi/excellence/hip-circles.webp",
};

export const DEFAULT_SITE_SETTINGS: SiteSettingsDoc = {
  navLinks: [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#departments" },
    { name: "Doctors", href: "#doctors" },
    { name: "Facilities", href: "#facilities" },
    { name: "Gallery", href: "#gallery" },
    { name: "FAQs", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ],
  footerQuickLinks: [
    { label: "Home", href: "#home" },
    { label: "About Hospital", href: "#about" },
    { label: "Departments", href: "#departments" },
    { label: "Our Doctors", href: "#doctors" },
    { label: "Facilities", href: "#facilities" },
    { label: "Patient Reviews", href: "#testimonials" },
    { label: "Book Consultation", href: "#contact" },
  ],
  footerDepartments: [
    "Orthopedic & Joint Rehab",
    "Spine & Slipped Disc Decompression",
    "Neurological Paralysis Rehab",
    "Sports Injury & Performance",
    "Post-Surgical Mobility Care",
    "Pediatric & Geriatric Therapy",
    "High-Intensity Laser Therapy (HILT)",
    "Digital Gait Analysis Studio",
  ],
  enquiryDepartments: [
    { value: "orthopedic-rehab", label: "Orthopedic Rehabilitation" },
    { value: "spine-joint", label: "Spine & Sciatica Care" },
    { value: "neuro-rehab", label: "Neurological & Stroke Rehab" },
    { value: "sports-injury", label: "Sports Injury Clinic" },
    { value: "post-surgery", label: "Post-Surgical Care" },
    { value: "pediatric-geriatric", label: "Pediatric & Geriatric Therapy" },
  ],
};

/* ---------- Legal pages default content (DPDP Act 2023 aligned) ---------- */

export const DEFAULT_LEGAL_PAGES: LegalPageDoc[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description:
      "How Venkata Ganapathi Physiotherapy Clinic collects, uses, stores and protects your personal data under the Digital Personal Data Protection Act, 2023.",
    order: 1,
    sections: [
      {
        heading: "1. Introduction & Who We Are",
        body: "Venkata Ganapathi Physiotherapy Clinic ('the Clinic', 'we', 'us') operates at Opposite Dr. Dutta Ramachandra Rao (Rambabu Garu) Hospital, K.S. Talkies Road, Vijayawada Road, Hanuman Junction - 521105, Andhra Pradesh. Under the Digital Personal Data Protection Act, 2023 ('DPDP Act'), the Clinic acts as a Data Fiduciary — we determine the purpose and means of processing your personal data. This policy explains what data we collect about you (the 'Data Principal'), why we collect it, how long we keep it, the safeguards we apply, and the rights you have under the law. By visiting our clinic, using our website, or submitting an enquiry, you consent to the practices described here.",
      },
      {
        heading: "2. Personal Data We Collect",
        body: "We collect only the data necessary to provide physiotherapy care and respond to you:\n• Identity & contact data — name, age, gender, phone number, email address and residential address.\n• Health data — your medical history, doctor's prescriptions, diagnostic reports (X-ray, MRI, scans), current condition, medications, allergies and treatment notes recorded during physiotherapy sessions.\n• Appointment data — preferred dates, department chosen, enquiry messages submitted through our website or WhatsApp.\n• Technical data — when you browse our website, basic information such as pages visited and device/browser type may be collected for site security and performance.\nWe do not collect any data beyond what is needed for the purposes listed below (purpose limitation, s. 4 of the DPDP Act).",
      },
      {
        heading: "3. How We Use Your Data (Purpose Limitation)",
        body: "Your data is used strictly for:\n• Providing and managing your physiotherapy assessment, treatment and follow-up care.\n• Scheduling, confirming and reminding you of appointments (call, SMS or WhatsApp).\n• Maintaining clinical records as required under applicable medical record-keeping rules.\n• Responding to enquiries you submit through the website, phone or WhatsApp.\n• Internal quality improvement, outcome tracking and staff training, in anonymised form wherever possible.\n• Meeting legal and regulatory obligations applicable to a clinical establishment in India.\nWe do not sell, rent or trade your personal data to any third party for marketing purposes.",
      },
      {
        heading: "4. Consent & Notice (DPDP Act ss. 4–6)",
        body: "Before or at the time of collecting your data, we give you this notice describing the personal data we seek, the purpose of processing, and your rights. Processing of your data happens only with your consent, or where it is necessary for certain lawful purposes recognised by the DPDP Act — such as providing medical treatment or responding to a medical emergency involving a threat to life. You may withdraw your consent at any time by contacting us; however, withdrawal does not affect processing already completed, and we may be unable to continue treatment where clinical records are essential for your safety.",
      },
      {
        heading: "5. Data of Children & Persons with Disabilities",
        body: "Where the patient is a child (under 18 years) or a person with a disability or guardianship, we obtain and process their data only with the consent of the parent or lawful guardian, and we process it in a manner that protects the child's wellbeing. Verifiable consent of the guardian is recorded in our clinical records before treatment begins.",
      },
      {
        heading: "6. Data Retention (s. 8(9))",
        body: "Clinical records are retained for the period prescribed under applicable Indian medical record-keeping norms (typically a minimum of 3 years for adult records, and longer for medico-legal cases, minors — until majority plus the retention period — and statutory requirements). Enquiry data submitted through the website is retained only as long as needed to respond and follow up. Once the retention period expires or the purpose is exhausted, personal data is erased in a secure manner, unless retention is required by law.",
      },
      {
        heading: "7. Security Safeguards (s. 8(5))",
        body: "We apply reasonable security safeguards to protect your data against breach, unauthorised access, use, modification or disclosure:\n• Physical records are kept in locked cabinets accessible only to authorised clinic staff.\n• Digital records and the clinic's administrative systems are password-protected with restricted, role-based access.\n• Website enquiry data is transmitted over encrypted connections and stored in access-controlled databases.\n• Staff are trained on confidentiality; access to patient data is limited to the physiotherapist in charge and authorised personnel.\nDespite our safeguards, no system can be guaranteed as perfectly secure; in the unlikely event of a data breach, we will follow the breach notification process below.",
      },
      {
        heading: "8. Data Sharing & Disclosure",
        body: "Your data may be shared only in these limited circumstances:\n• With your referring doctor or a specialist you are referred to, for continuity of care.\n• With your explicit consent for insurance, medicolegal or employment documentation.\n• With authorities where disclosure is required by law, court order, or to respond to a medical emergency.\n• With service providers (e.g., cloud hosting, messaging) strictly under contract to process data only on our instructions.\nWe never share your health data for advertising or to any unrelated third party.",
      },
      {
        heading: "9. Your Rights as a Data Principal (DPDP Act ss. 11–14)",
        body: "You have the right to:\n• Access a summary of the personal data we process about you and the processing activities undertaken.\n• Correct inaccuracies, complete incomplete data, or update your details.\n• Erasure of your personal data, once the purpose is exhausted and retention is no longer required by law.\n• Withdraw consent for processing done on the basis of consent.\n• Nominate another individual to exercise your rights in case of death or incapacity.\n• Grievance redressal — you may complain to us first; if unresolved, you have the right to approach the Data Protection Board of India.\nTo exercise any right, contact the Grievance Officer below. We will respond within a reasonable period.",
      },
      {
        heading: "10. Breach Notification (s. 8(6))",
        body: "In the event of a personal data breach, we will without undue delay intimate the affected Data Principals and the Data Protection Board of India, describing the nature of the breach, likely consequences, and remedial action taken or proposed, in the manner prescribed by law.",
      },
      {
        heading: "11. Website & Cookies",
        body: "Our website may use essential cookies and analytics to keep the site functioning and understand aggregate usage. You can control cookies through your browser settings. Links to third-party platforms (Google Maps, WhatsApp, social media) are provided for your convenience; their privacy practices are governed by their own policies.",
      },
      {
        heading: "12. Changes to This Policy",
        body: "We may update this Privacy Policy to reflect changes in law or our practices. The revised version will be posted on this page with the updated date. Continued use of our services after changes constitutes acceptance of the revised policy.",
      },
      {
        heading: "13. Grievance Officer & Contact",
        body: "For any privacy concern, data request or grievance:\nVenkata Ganapathi Physiotherapy Clinic\nOpposite Dr. Dutta Ramachandra Rao (Rambabu Garu) Hospital, K.S. Talkies Road, Vijayawada Road, Hanuman Junction - 521105, Andhra Pradesh\nPhone: +91 94418 29648\nEmail: care@venkataganapathiphysio.com\nTimings: Monday – Saturday, 9:00 AM – 8:00 PM (Sunday closed)\nLast updated: August 2026",
      },
    ],
  },
  {
    slug: "terms-conditions",
    title: "Terms & Conditions",
    description:
      "Terms governing the use of the Venkata Ganapathi Physiotherapy Clinic website and the physiotherapy services offered at our Hanuman Junction clinic.",
    order: 2,
    sections: [
      {
        heading: "1. Acceptance of Terms",
        body: "These Terms & Conditions ('Terms') govern your use of the website of Venkata Ganapathi Physiotherapy Clinic ('the Clinic') and the physiotherapy services offered at our clinic in Hanuman Junction, Andhra Pradesh. By accessing this website, submitting an enquiry, or availing any of our services, you agree to be bound by these Terms. If you do not agree, please do not use the website or our services.",
      },
      {
        heading: "2. Nature of Services",
        body: "The Clinic provides non-surgical physiotherapy and rehabilitation services including orthopedic and joint rehabilitation, computerized spine decompression, neurological and post-stroke rehabilitation, sports injury care, post-surgical mobility care, pediatric and geriatric therapy, manual therapy, dry needling and high-intensity laser therapy. All treatment is provided by or under the supervision of qualified physiotherapists. Treatment plans, session counts and expected recovery timelines given during consultation are professional estimates; individual results vary with age, condition severity, adherence to the home exercise programme and overall health.",
      },
      {
        heading: "3. Appointments, Cancellation & No-Show",
        body: "Appointments are scheduled during clinic hours (Monday – Saturday, 9:00 AM – 8:00 PM; Sunday closed) subject to availability. Please arrive on time; arriving late may shorten your session so that following patients are not delayed. If you need to cancel or reschedule, kindly inform us at least a few hours in advance on +91 94418 29648 so the slot can be offered to another patient. Repeated no-shows without intimation may affect future advance booking privileges. Home-visit services (where available, e.g., for paralysis patients) must be pre-scheduled and are subject to service-area limits.",
      },
      {
        heading: "4. Fees & Payments",
        body: "Consultation and therapy fees are communicated before treatment begins. Fees may be paid in cash, UPI or other accepted modes at the clinic. Package pricing (where offered for multi-session programmes) is valid for the stated duration only and is non-transferable between patients. Advance payments for packages are refundable on a pro-rata basis for sessions not yet availed, less applicable administrative charges, if discontinued by the patient. Prices are subject to revision; the fee applicable at the time of your visit applies.",
      },
      {
        heading: "5. Medical Disclaimer",
        body: "Information on this website — including service descriptions, FAQs, recovery stories and educational content — is provided for general awareness and does not constitute medical advice, diagnosis or treatment. Always seek the advice of a qualified physiotherapist or physician with any questions regarding a medical condition. Never disregard professional medical advice or delay seeking it because of something you have read on this website. In a medical emergency (chest pain, breathlessness, sudden severe injury, loss of consciousness), go to the nearest hospital emergency department or call 108 — do not wait for a physiotherapy appointment. An online or telephonic enquiry does not create a doctor–patient relationship; that relationship begins only at in-clinic assessment.",
      },
      {
        heading: "6. Patient Responsibilities",
        body: "To make treatment safe and effective, you agree to:\n• Disclose your complete medical history, current medications, allergies and relevant reports honestly.\n• Inform the physiotherapist immediately of any pain, discomfort or adverse reaction during or after a session.\n• Follow the prescribed home exercise programme and precautions as instructed.\n• Not record other patients, staff or clinic premises without permission, and to respect the privacy of fellow patients.\n• Treat clinic staff and property with respect; abusive behaviour may result in termination of services.",
      },
      {
        heading: "7. Consent to Treatment",
        body: "Physiotherapy procedures, including manual therapy techniques, dry needling, electrotherapy modalities and decompression therapy, will be explained to you before administration. Your consent — verbal or written — will be recorded before starting the programme and before any significant change in the treatment plan. You have the right to refuse or discontinue any procedure; possible clinical consequences of refusal will be explained to you.",
      },
      {
        heading: "8. Website Use & Intellectual Property",
        body: "All content on this website — text, design, logo, images, videos and treatment descriptions — is the property of the Clinic or used with permission and is protected under applicable Indian intellectual property laws. You may view and share links to the content for personal, non-commercial use. You may not copy, reproduce, scrape or use the content for commercial purposes without written permission. Submitting false enquiries, attempting to disrupt the website, or misusing the enquiry form is prohibited.",
      },
      {
        heading: "9. Limitation of Liability",
        body: "To the maximum extent permitted by law, the Clinic shall not be liable for any indirect, incidental or consequential loss arising from use of this website or reliance on its general information. Clinical care is provided with due professional diligence; outcomes cannot be guaranteed, as recovery depends on individual physiological factors. Nothing in these Terms excludes liability that cannot be excluded under Indian law, including for negligence causing personal injury where established.",
      },
      {
        heading: "10. Governing Law & Jurisdiction",
        body: "These Terms are governed by the laws of India. Any dispute arising out of or in connection with these Terms or our services shall first be attempted to be resolved amicably at the clinic level through our grievance process; failing which, the courts at Vijayawada / Eluru, Andhra Pradesh shall have exclusive jurisdiction.",
      },
      {
        heading: "11. Changes to These Terms",
        body: "We may revise these Terms from time to time. The current version will always be available on this page. Continued use of the website or our services after revision constitutes acceptance of the updated Terms.\nContact: Venkata Ganapathi Physiotherapy Clinic, Hanuman Junction — Phone: +91 94418 29648 — Email: care@venkataganapathiphysio.com",
      },
    ],
  },
  {
    slug: "patient-rights",
    title: "Patient Rights & Responsibilities",
    description:
      "Our commitment to patient rights and the responsibilities of patients, aligned with the NABH patient charter and applicable Indian healthcare regulations.",
    order: 3,
    sections: [
      {
        heading: "1. Our Commitment",
        body: "At Venkata Ganapathi Physiotherapy Clinic, every patient is entitled to respectful, safe and quality care. This charter, aligned with the NABH (National Accreditation Board for Hospitals & Healthcare Providers) patient rights framework and applicable Indian healthcare regulations, sets out the rights you can expect from us and the responsibilities that help us care for you better.",
      },
      {
        heading: "2. Right to Information & Transparency",
        body: "You have the right to know the identity, qualification and experience of the physiotherapist treating you; the nature of your condition in understandable language; the proposed treatment plan, expected duration, likely outcomes and associated costs — before treatment begins. You will be told about any alternative treatment options so that you can make an informed choice.",
      },
      {
        heading: "3. Right to Consent & Refusal",
        body: "No procedure is performed without your informed consent. You have the right to accept, seek clarification on, or refuse any treatment or procedure, and to be informed of the medical consequences of your decision. You may withdraw consent and discontinue treatment at any time.",
      },
      {
        heading: "4. Right to Confidentiality & Privacy",
        body: "Your medical records, history and discussions are confidential. Consultations and treatments are conducted with reasonable privacy. Your data is handled in accordance with our Privacy Policy and the Digital Personal Data Protection Act, 2023. Photographs or videos for clinical documentation are taken only with your explicit permission.",
      },
      {
        heading: "5. Right to Access Your Records",
        body: "You (or a person authorised by you in writing, or your legal guardian) have the right to access your clinical records, treatment notes and reports maintained by the clinic, and to receive copies of relevant documents on request, subject to reasonable procedural formalities.",
      },
      {
        heading: "6. Right to Second Opinion",
        body: "You have the right to seek a second opinion from another qualified practitioner at any time. Choosing to obtain a second opinion will not affect the quality of care we provide to you, and we will share your records with the practitioner you designate.",
      },
      {
        heading: "7. Right to Emergency Care & Referral",
        body: "In an emergency within our scope, we will provide immediate care and, where the condition is beyond physiotherapy scope, stabilise and refer you promptly to an appropriate physician or hospital. You will never be refused care on grounds of religion, caste, gender, age, disability or social status.",
      },
      {
        heading: "8. Right to Dignity & Non-Discrimination",
        body: "You have the right to considerate, respectful care at all times, with recognition of your personal dignity and cultural values — regardless of background, condition or mode of payment. This includes senior citizens, children, women and persons with disabilities receiving appropriate, sensitive handling.",
      },
      {
        heading: "9. Right to Voice Concerns & Redressal",
        body: "You have the right to raise a concern or complaint about your care without it affecting your treatment, and to receive a timely, fair response. Concerns may be shared with the physiotherapist in charge, at the clinic front desk, by phone on +91 94418 29648, or by email at care@venkataganapathiphysio.com. Unresolved grievances may be escalated to the clinic's management. You also retain all statutory rights, including consumer remedies available under Indian law.",
      },
      {
        heading: "10. Right to Choose & Discharge",
        body: "You have the right to choose between available treatment options where clinically appropriate, to ask for the estimated cost of your treatment programme in advance, and to seek discharge from care or a transfer to another provider at any time, with your records handed over as per procedure.",
      },
      {
        heading: "11. Patient Responsibilities",
        body: "Quality care is a partnership. As our patient, you are responsible to:\n• Provide accurate and complete information about your health, medications and history.\n• Follow the agreed treatment plan and home exercises, or discuss difficulties honestly with your physiotherapist.\n• Keep appointments, or cancel with reasonable advance notice.\n• Pay applicable fees on time and as communicated.\n• Respect clinic rules, staff and fellow patients, and maintain the cleanliness and calm of the facility.\n• Not demand treatments, medicines or certificates that are clinically inappropriate or unlawful.",
      },
      {
        heading: "12. Feedback & Continuous Improvement",
        body: "Your feedback — appreciations and complaints alike — helps us improve. Please share your experience with us during your visit, over the phone, or through our website enquiry form. Every piece of feedback is reviewed by the clinic management as part of our quality commitment.\nContact: Venkata Ganapathi Physiotherapy Clinic, Hanuman Junction — Phone: +91 94418 29648 — Email: care@venkataganapathiphysio.com",
      },
    ],
  },
];

/* ---------- Query helpers ---------- */

function lean<T>(doc: T | null): T | null {
  return doc ? JSON.parse(JSON.stringify(doc)) : null;
}

export async function getHospitalInfo(): Promise<HospitalInfoDoc> {
  await connectDB();
  const doc = await HospitalInfo.findOne().sort({ updatedAt: -1 }).lean();
  return lean(doc) ?? DEFAULT_HOSPITAL_INFO;
}

export async function getHeroSlides(): Promise<HeroSlideDoc[]> {
  await connectDB();
  const docs = await HeroSlide.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(docs));
}

export async function getStats(): Promise<StatDoc[]> {
  await connectDB();
  const docs = await Stat.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(docs));
}

export async function getServices(): Promise<ServiceDoc[]> {
  await connectDB();
  const docs = await Service.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(docs));
}

export async function getDoctors(): Promise<DoctorDoc[]> {
  await connectDB();
  const docs = await Doctor.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(docs));
}

export async function getFacilities(): Promise<FacilityDoc[]> {
  await connectDB();
  const docs = await Facility.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(docs));
}

export async function getGalleryItems(): Promise<GalleryItemDoc[]> {
  await connectDB();
  const docs = await GalleryItem.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(docs));
}

export async function getFaqs(): Promise<FaqDoc[]> {
  await connectDB();
  const docs = await Faq.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(docs));
}

export async function getTestimonials(): Promise<TestimonialDoc[]> {
  await connectDB();
  const docs = await Testimonial.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(docs));
}

export async function getAboutPillars(): Promise<AboutPillarDoc[]> {
  await connectDB();
  const docs = await AboutPillar.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(docs));
}

export async function getSiteSettings(): Promise<SiteSettingsDoc> {
  await connectDB();
  const doc = await SiteSettings.findOne().sort({ updatedAt: -1 }).lean();
  return lean(doc) ?? DEFAULT_SITE_SETTINGS;
}

export async function getLegalPages(): Promise<LegalPageDoc[]> {
  await connectDB();
  const docs = await LegalPage.find().sort({ order: 1 }).lean();
  if (docs.length === 0) return DEFAULT_LEGAL_PAGES;
  return JSON.parse(JSON.stringify(docs));
}

export async function getLegalPage(slug: string): Promise<LegalPageDoc | null> {
  await connectDB();
  const doc = await LegalPage.findOne({ slug }).lean();
  return lean(doc) ?? DEFAULT_LEGAL_PAGES.find((p) => p.slug === slug) ?? null;
}
