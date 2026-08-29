/**
 * Field definitions that drive the generic admin CRUD forms.
 * Each collection maps to /api/admin/[collection].
 */

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "list"
  | "select"
  | "media"
  | "json"
  | "string-list"
  | "object-list";

export interface ObjectListSubField {
  name: string;
  label: string;
  placeholder?: string;
  width?: string; // tailwind width class e.g. "w-40"
  multiline?: boolean; // render as textarea instead of single-line input
}

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  placeholder?: string;
  help?: string;
  required?: boolean;
  full?: boolean; // render full-width in the form grid
  subFields?: ObjectListSubField[]; // for "object-list" rows
}

export interface CollectionDef {
  key: string;
  label: string;
  description: string;
  singleton: boolean;
  titleField: string;
  subtitleField?: string;
  imageField?: string;
  fields: FieldDef[];
}

export const ADMIN_COLLECTIONS: CollectionDef[] = [
  {
    key: "hospitalInfo",
    label: "Hospital Info",
    description: "Clinic name, contact details, social links and footer text",
    singleton: true,
    titleField: "name",
    fields: [
      { name: "name", label: "Hospital Name", type: "text", required: true },
      { name: "subtitle", label: "Subtitle", type: "text", required: true },
      { name: "tagline", label: "Tagline", type: "text" },
      { name: "regNo", label: "Registration No", type: "text" },
      { name: "chiefDoctor", label: "Chief Doctor", type: "text" },
      { name: "doctorQualification", label: "Doctor Qualification", type: "text" },
      { name: "primaryPhone", label: "Primary Phone", type: "text", required: true },
      { name: "secondaryPhone", label: "Secondary Phone", type: "text" },
      { name: "emergencyPhone", label: "Emergency Phone", type: "text" },
      { name: "email", label: "Email", type: "text" },
      { name: "address", label: "Address", type: "textarea", full: true },
      { name: "timing", label: "Timing", type: "text", full: true },
      { name: "whatsapp", label: "WhatsApp Number", type: "text" },
      { name: "googleMapsUrl", label: "Google Maps URL", type: "text" },
      { name: "logo", label: "Logo", type: "media" },
      { name: "facebookUrl", label: "Facebook URL", type: "text" },
      { name: "instagramUrl", label: "Instagram URL", type: "text" },
      { name: "twitterUrl", label: "Twitter / X URL", type: "text" },
      { name: "youtubeUrl", label: "YouTube URL", type: "text" },
      { name: "footerAbout", label: "Footer About Text", type: "textarea", full: true },
      { name: "footerAccreditation", label: "Footer Accreditation", type: "text", full: true },
      { name: "aboutVideoMain", label: "About Section - Main Video", type: "media", full: true },
      { name: "aboutVideoSecondary", label: "About Section - Secondary Video", type: "media", full: true },
      { name: "aboutDoctorImage", label: "About Section - Doctor Image", type: "media", full: true },
      { name: "excellenceImage1", label: "Excellence Section - Image 1", type: "media", full: true },
      { name: "excellenceImage2", label: "Excellence Section - Image 2", type: "media", full: true },
    ],
  },
  {
    key: "heroSlides",
    label: "Hero Slides",
    description: "Video slides shown in the top hero carousel",
    singleton: false,
    titleField: "line1",
    subtitleField: "line2",
    imageField: "poster",
    fields: [
      { name: "video", label: "Video (MP4)", type: "media", required: true, full: true },
      { name: "poster", label: "Poster Image", type: "media", required: true },
      { name: "line1", label: "Heading Line 1", type: "text", required: true },
      { name: "line2", label: "Heading Line 2", type: "text", required: true },
      { name: "order", label: "Order", type: "number" },
    ],
  },
  {
    key: "stats",
    label: "Stats",
    description: "Numbers bar below the hero (patients, experience…)",
    singleton: false,
    titleField: "value",
    subtitleField: "line1",
    fields: [
      { name: "value", label: "Value (e.g. 14+)", type: "text", required: true },
      { name: "line1", label: "Line 1", type: "text", required: true },
      { name: "line2", label: "Line 2", type: "text" },
      { name: "order", label: "Order", type: "number" },
    ],
  },
  {
    key: "services",
    label: "Services",
    description: "Service cards with treatments and features",
    singleton: false,
    titleField: "title",
    subtitleField: "category",
    imageField: "image",
    fields: [
      { name: "id", label: "Slug / ID", type: "text", required: true },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "badge", label: "Badge", type: "text" },
      { name: "isHighlighted", label: "Highlighted", type: "boolean" },
      { name: "category", label: "Category", type: "text" },
      { name: "description", label: "Description", type: "textarea", full: true },
      { name: "image", label: "Image", type: "media" },
      { name: "treatments", label: "Treatments (one per line)", type: "list", full: true },
      { name: "features", label: "Features (one per line)", type: "list", full: true },
      { name: "doctorInCharge", label: "Doctor In Charge", type: "text" },
      { name: "order", label: "Order", type: "number" },
    ],
  },
  {
    key: "doctors",
    label: "Doctors",
    description: "Lead doctor profile and team members",
    singleton: false,
    titleField: "name",
    subtitleField: "title",
    imageField: "image",
    fields: [
      { name: "id", label: "Slug / ID", type: "text", required: true },
      { name: "name", label: "Name", type: "text", required: true },
      { name: "title", label: "Title", type: "text" },
      { name: "qualification", label: "Qualification", type: "text" },
      { name: "regNo", label: "Registration No", type: "text" },
      { name: "specialization", label: "Specialization", type: "text" },
      { name: "specializations", label: "Key Specializations (modal)", type: "list", full: true },
      { name: "experienceYears", label: "Experience (years)", type: "number" },
      { name: "departmentId", label: "Department ID", type: "text" },
      { name: "departmentName", label: "Department Name", type: "text" },
      { name: "bio", label: "Bio", type: "textarea", full: true },
      { name: "availableDays", label: "Available Days", type: "text" },
      { name: "image", label: "Photo", type: "media" },
      { name: "rating", label: "Rating (0-5)", type: "number" },
      { name: "patientsCount", label: "Patients Count", type: "number" },
      { name: "role", label: "Role (team card)", type: "text" },
      { name: "expertise", label: "Expertise (team card)", type: "text" },
      { name: "imageClassName", label: "Image CSS Class", type: "text" },
      { name: "accent", label: "Accent Color", type: "text" },
      { name: "order", label: "Order", type: "number" },
    ],
  },
  {
    key: "facilities",
    label: "Facilities",
    description: "Facilities & equipment showcase cards",
    singleton: false,
    titleField: "title",
    subtitleField: "category",
    imageField: "image",
    fields: [
      { name: "id", label: "Slug / ID", type: "text", required: true },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "category", label: "Category", type: "text" },
      { name: "badge", label: "Badge", type: "text" },
      { name: "description", label: "Description", type: "textarea", full: true },
      { name: "image", label: "Image", type: "media" },
      { name: "highlights", label: "Highlights (one per line)", type: "list", full: true },
      { name: "order", label: "Order", type: "number" },
    ],
  },
  {
    key: "galleryItems",
    label: "Gallery",
    description: "Gallery images and videos",
    singleton: false,
    titleField: "title",
    subtitleField: "category",
    imageField: "src",
    fields: [
      { name: "id", label: "Slug / ID", type: "text", required: true },
      { name: "title", label: "Title", type: "text" },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: ["Facilities", "Equipment", "Therapy", "Video"],
      },
      {
        name: "mediaType",
        label: "Media Type",
        type: "select",
        options: ["image", "video"],
      },
      { name: "src", label: "Media (image or video)", type: "media", required: true, full: true },
      { name: "description", label: "Description", type: "textarea", full: true },
      { name: "order", label: "Order", type: "number" },
    ],
  },
  {
    key: "faqs",
    label: "FAQs",
    description: "Frequently asked questions",
    singleton: false,
    titleField: "question",
    subtitleField: "category",
    fields: [
      { name: "id", label: "Slug / ID", type: "text", required: true },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: ["Treatments", "Appointments", "General"],
      },
      { name: "question", label: "Question", type: "text", required: true, full: true },
      { name: "answer", label: "Answer", type: "textarea", required: true, full: true },
      { name: "order", label: "Order", type: "number" },
    ],
  },
  {
    key: "testimonials",
    label: "Testimonials",
    description: "Patient recovery testimonials",
    singleton: false,
    titleField: "patientName",
    subtitleField: "condition",
    imageField: "avatar",
    fields: [
      { name: "id", label: "Slug / ID", type: "text", required: true },
      { name: "patientName", label: "Patient Name", type: "text", required: true },
      { name: "patientAge", label: "Age", type: "number" },
      { name: "condition", label: "Condition", type: "text" },
      { name: "recoveryPeriod", label: "Recovery Period", type: "text" },
      { name: "rating", label: "Rating (0-5)", type: "number" },
      { name: "comment", label: "Comment", type: "textarea", full: true },
      { name: "doctorName", label: "Doctor Name", type: "text" },
      { name: "avatar", label: "Avatar", type: "media" },
      { name: "verified", label: "Verified", type: "boolean" },
      { name: "order", label: "Order", type: "number" },
    ],
  },
  {
    key: "aboutPillars",
    label: "About Pillars",
    description: "Pillars shown in the About section",
    singleton: false,
    titleField: "title",
    fields: [
      { name: "id", label: "Slug / ID", type: "text", required: true },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "desc", label: "Description", type: "textarea", full: true },
      { name: "iconName", label: "Icon Name (lucide)", type: "text" },
      { name: "order", label: "Order", type: "number" },
    ],
  },
  {
    key: "enquiries",
    label: "Enquiries",
    description: "Appointment enquiries submitted from the contact form",
    singleton: false,
    titleField: "name",
    subtitleField: "phone",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "phone", label: "Phone", type: "text", required: true },
      { name: "email", label: "Email", type: "text" },
      { name: "department", label: "Department", type: "text" },
      { name: "preferredDate", label: "Preferred Date", type: "text" },
      { name: "message", label: "Message", type: "textarea", full: true },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["new", "contacted", "closed"],
      },
    ],
  },
  {
    key: "siteSettings",
    label: "Site Settings",
    description: "Navigation links, footer links and form department options",
    singleton: true,
    titleField: "navLinks",
    fields: [
      {
        name: "navLinks",
        label: "Nav Links (Header Menu)",
        type: "object-list",
        full: true,
        help: "Links shown in the top navigation menu",
        subFields: [
          { name: "name", label: "Menu Name", placeholder: "e.g. Home", width: "flex-1" },
          { name: "href", label: "Link (section)", placeholder: "e.g. #home", width: "flex-1" },
        ],
      },
      {
        name: "footerQuickLinks",
        label: "Footer Quick Links",
        type: "object-list",
        full: true,
        help: "Links shown in the footer Quick Links column",
        subFields: [
          { name: "label", label: "Link Text", placeholder: "e.g. Home", width: "flex-1" },
          { name: "href", label: "Link (section)", placeholder: "e.g. #home", width: "flex-1" },
        ],
      },
      {
        name: "footerDepartments",
        label: "Footer Departments List",
        type: "string-list",
        full: true,
        help: "Department names shown in the footer Clinical Departments column",
        placeholder: "e.g. Orthopedic & Joint Rehab",
      },
      {
        name: "enquiryDepartments",
        label: "Enquiry Form Departments (Dropdown)",
        type: "object-list",
        full: true,
        help: "Options shown in the appointment form department dropdown",
        subFields: [
          { name: "value", label: "Value (internal)", placeholder: "e.g. ortho-rehab", width: "w-44" },
          { name: "label", label: "Shown Text", placeholder: "e.g. Orthopedic Rehabilitation", width: "flex-1" },
        ],
      },
    ],
  },
  {
    key: "legalPages",
    label: "Legal Pages",
    description: "Privacy Policy, Terms & Conditions and Patient Rights pages (footer links)",
    singleton: false,
    titleField: "title",
    subtitleField: "slug",
    fields: [
      {
        name: "slug",
        label: "Page Slug (URL)",
        type: "select",
        required: true,
        help: "Footer links point to /legal/<slug>",
        options: ["privacy-policy", "terms-conditions", "patient-rights"],
      },
      { name: "title", label: "Page Title", type: "text", required: true },
      { name: "description", label: "Short Description (SEO)", type: "textarea", full: true },
      {
        name: "sections",
        label: "Content Sections",
        type: "object-list",
        full: true,
        help: "Each section renders as a heading + paragraph block on the page",
        subFields: [
          { name: "heading", label: "Section Heading", placeholder: "e.g. Information We Collect", width: "w-full" },
          { name: "body", label: "Section Body", placeholder: "Full text of this section…", width: "w-full", multiline: true },
        ],
      },
      { name: "order", label: "Order", type: "number" },
    ],
  },
];

export function getCollectionDef(key: string): CollectionDef | undefined {
  return ADMIN_COLLECTIONS.find((c) => c.key === key);
}
