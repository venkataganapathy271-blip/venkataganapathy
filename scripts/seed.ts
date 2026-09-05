/**
 * Seed script — migrates ALL existing static data to MongoDB Atlas
 * and uploads ALL local media assets to Cloudinary.
 *
 * Run: npx tsx scripts/seed.ts
 */
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

/* ---------------- Cloudinary config ---------------- */
const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;
const apiKey = process.env.CLOUDINARY_API_KEY!;
const apiSecret = process.env.CLOUDINARY_API_SECRET!;
const FOLDER = process.env.CLOUDINARY_FOLDER || "venkataganapathi";

cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret, secure: true });

/* ---------------- Mongo config ---------------- */
const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB || "venkataganapathi";

/* ---------------- Asset upload helper ---------------- */
const uploadedCache = new Map<string, string>();

async function uploadAsset(localPath: string, publicId: string, resourceType: "image" | "video"): Promise<string> {
  if (uploadedCache.has(publicId)) return uploadedCache.get(publicId)!;

  const abs = path.join(process.cwd(), "public", localPath);
  if (!fs.existsSync(abs)) {
    console.warn(`  [skip] file not found: ${localPath}`);
    return localPath; // fall back to local path
  }

  console.log(`  [upload ${resourceType}] ${localPath} -> ${FOLDER}/${publicId}`);
  const result = await cloudinary.uploader.upload(abs, {
    folder: FOLDER,
    public_id: publicId,
    resource_type: resourceType,
    overwrite: true,
    invalidate: true,
  });
  uploadedCache.set(publicId, result.secure_url);
  return result.secure_url;
}

/* ---------------- Main ---------------- */
async function main() {
  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(MONGODB_URI, { dbName: MONGODB_DB });
  const db = mongoose.connection.db;
  if (!db) throw new Error("No DB");

  /* ============ 1. Upload all media assets to Cloudinary ============ */
  console.log("\n=== Uploading media assets to Cloudinary ===");

  // Hero + gallery videos
  const videoFiles: [string, string][] = [
    ["/5991800-uhd_3840_2160_25fps.mp4", "videos/hero-1"],
    ["/6023232-uhd_3840_2160_25fps.mp4", "videos/hero-2"],
    ["/6023241-uhd_3840_2160_25fps.mp4", "videos/hero-3"],
    ["/6326960-hd_2048_1054_25fps.mp4", "videos/hero-4"],
  ];
  const videoUrls: Record<string, string> = {};
  for (const [file, pid] of videoFiles) {
    videoUrls[file] = await uploadAsset(file, pid, "video");
  }

  // Doctor images
  const doctorImages: [string, string][] = [
    ["/docter_team_3_transparent.png", "doctors/dr-maruthi-rao"],
    ["/docter_team.jpeg", "doctors/konka-jayaswai"],
    ["/docter_team_4.jpeg", "doctors/dr-danny-christopher"],
  ];
  const doctorImageUrls: Record<string, string> = {};
  for (const [file, pid] of doctorImages) {
    doctorImageUrls[file] = await uploadAsset(file, pid, "image");
  }

  // Service images
  const serviceImages: [string, string][] = [
    ["/services_images/Orthopedic & Joint Rehab.jpg", "services/ortho-rehab"],
    ["/services_images/Sports Injury Recovery.jpg", "services/sports-injury"],
    ["/services_images/Spine & Disc Decompression.jpg", "services/spine-decompression"],
    ["/services_images/Stroke Paralysis Recovery.jpg", "services/stroke-paralysis"],
    ["/services_images/Manual Therapy & Needling.jpg", "services/manual-needling"],
  ];
  const serviceImageUrls: Record<string, string> = {};
  for (const [file, pid] of serviceImages) {
    serviceImageUrls[file] = await uploadAsset(file, pid, "image");
  }

  // Facility images
  const facilityImages: [string, string][] = [
    ["/gallery/facility-electro.jpg", "facilities/facility-electro"],
    ["/gallery/Laser Pain Management.jpeg", "facilities/facility-laser"],
    ["/gallery/facility-exercise.jpg", "facilities/facility-exercise"],
  ];
  const facilityImageUrls: Record<string, string> = {};
  for (const [file, pid] of facilityImages) {
    facilityImageUrls[file] = await uploadAsset(file, pid, "image");
  }

  // Excellence section images
  const excellenceImages: [string, string][] = [
    ["/Floor-hip-flexors-.webp", "excellence/floor-hip-flexors"],
    ["/Hip-circles.webp", "excellence/hip-circles"],
  ];
  const excellenceImageUrls: Record<string, string> = {};
  for (const [file, pid] of excellenceImages) {
    excellenceImageUrls[file] = await uploadAsset(file, pid, "image");
  }

  // Logo
  const logoUrl = await uploadAsset("/Logo.png", "branding/logo", "image");

  // Gallery images (26 WhatsApp images)
  const galleryFiles = [
    "WhatsApp Image 2026-08-19 at 12.23.02 PM.jpeg",
    "WhatsApp Image 2026-08-19 at 12.23.03 PM (1).jpeg",
    "WhatsApp Image 2026-08-19 at 12.23.03 PM.jpeg",
    "WhatsApp Image 2026-08-19 at 12.23.04 PM (1).jpeg",
    "WhatsApp Image 2026-08-19 at 12.23.04 PM.jpeg",
    "WhatsApp Image 2026-08-19 at 12.23.05 PM (1).jpeg",
    "WhatsApp Image 2026-08-19 at 12.23.06 PM (1).jpeg",
    "WhatsApp Image 2026-08-19 at 12.23.06 PM.jpeg",
    "WhatsApp Image 2026-08-21 at 3.38.45 AM (1).jpeg",
    "WhatsApp Image 2026-08-21 at 3.38.45 AM.jpeg",
    "WhatsApp Image 2026-08-21 at 3.38.46 AM (1).jpeg",
    "WhatsApp Image 2026-08-21 at 3.38.46 AM (2).jpeg",
    "WhatsApp Image 2026-08-21 at 3.38.46 AM (3).jpeg",
    "WhatsApp Image 2026-08-21 at 3.38.46 AM.jpeg",
    "WhatsApp Image 2026-08-21 at 3.38.47 AM (1).jpeg",
    "WhatsApp Image 2026-08-21 at 3.38.47 AM (3).jpeg",
    "WhatsApp Image 2026-08-21 at 3.38.47 AM.jpeg",
    "WhatsApp Image 2026-08-21 at 3.38.48 AM (1).jpeg",
    "WhatsApp Image 2026-08-21 at 3.38.48 AM (2).jpeg",
    "WhatsApp Image 2026-08-21 at 3.38.48 AM.jpeg",
    "WhatsApp Image 2026-08-21 at 3.38.49 AM (2).jpeg",
    "WhatsApp Image 2026-08-21 at 3.38.49 AM (3).jpeg",
    "WhatsApp Image 2026-08-21 at 3.38.49 AM.jpeg",
    "WhatsApp Image 2026-08-27 at 7.01.39 PM.jpeg",
    "WhatsApp Image 2026-08-26 at 10.48.51 AM.jpeg",
    "WhatsApp Image 2026-08-27 at 2.17.57 PM.jpeg",
  ];
  const galleryUrls: string[] = [];
  for (let i = 0; i < galleryFiles.length; i++) {
    galleryUrls.push(await uploadAsset(`/gallery/${galleryFiles[i]}`, `gallery/img-${i + 1}`, "image"));
  }

  /* ============ 2. Clear existing collections ============ */
  console.log("\n=== Clearing existing collections ===");
  const collections = [
    "hospitalinfos",
    "heroslides",
    "stats",
    "services",
    "doctors",
    "facilities",
    "galleryitems",
    "faqs",
    "testimonials",
    "aboutpillars",
    "enquiries",
    "adminusers",
    "sitesettings",
  ];
  for (const c of collections) {
    try {
      await db.dropCollection(c);
      console.log(`  dropped ${c}`);
    } catch {
      /* collection may not exist */
    }
  }

  /* ============ 3. Seed Hospital Info ============ */
  console.log("\n=== Seeding Hospital Info ===");
  await db.collection("hospitalinfos").insertOne({
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
    logo: logoUrl,
    facebookUrl: "https://www.facebook.com/share/1BpVQYJbak/",
    instagramUrl: "#",
    twitterUrl: "#",
    youtubeUrl: "#",
    footerAbout:
      "A state-of-the-art super-speciality hospital dedicated to non-surgical joint rehabilitation, computerized spine decompression, sports injury science, and post-stroke movement recovery.",
    footerAccreditation: "NABH & Quality Healthcare Accredited",
    aboutVideoMain: videoUrls["/6023241-uhd_3840_2160_25fps.mp4"],
    aboutVideoSecondary: videoUrls["/5991800-uhd_3840_2160_25fps.mp4"],
    aboutDoctorImage: doctorImageUrls["/docter_team_3_transparent.png"],
    excellenceImage1: excellenceImageUrls["/Floor-hip-flexors-.webp"],
    excellenceImage2: excellenceImageUrls["/Hip-circles.webp"],
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  /* ============ 4. Seed Hero Slides ============ */
  console.log("=== Seeding Hero Slides ===");
  await db.collection("heroslides").insertMany([
    {
      video: videoUrls["/5991800-uhd_3840_2160_25fps.mp4"],
      poster: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1920",
      line1: "Relieve Pain, Restore Mobility",
      line2: "Body Balance",
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      video: videoUrls["/6023232-uhd_3840_2160_25fps.mp4"],
      poster: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1920",
      line1: "Advanced Stroke & Paralysis Care",
      line2: "Motor Independence",
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      video: videoUrls["/6023241-uhd_3840_2160_25fps.mp4"],
      poster: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1920",
      line1: "Post-Knee & Joint Replacement",
      line2: "Mobility Restoration",
      order: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      video: videoUrls["/6326960-hd_2048_1054_25fps.mp4"],
      poster: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1920",
      line1: "Sports Injury & Spine Decompression",
      line2: "Active Movement",
      order: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  /* ============ 5. Seed Stats ============ */
  console.log("=== Seeding Stats ===");
  await db.collection("stats").insertMany([
    { value: "14+", line1: "Years of Clinical", line2: "Experience", order: 1, createdAt: new Date(), updatedAt: new Date() },
    { value: "2014", line1: "Clinic", line2: "Establishment", order: 2, createdAt: new Date(), updatedAt: new Date() },
    { value: "8,500+", line1: "Patients Treated", line2: "Successfully", order: 3, createdAt: new Date(), updatedAt: new Date() },
    { value: "100%", line1: "Specialty Non-Surgical", line2: "Focus", order: 4, createdAt: new Date(), updatedAt: new Date() },
  ]);

  /* ============ 6. Seed Services ============ */
  console.log("=== Seeding Services ===");
  await db.collection("services").insertMany([
    {
      id: "ortho-rehab",
      title: "Orthopedic & Joint Rehab",
      badge: "Most Popular",
      isHighlighted: true,
      category: "Joint Rehabilitation",
      description:
        "Targeted recovery for knee, hip, shoulder, and spine injuries. Evidence-based protocols that restore full range of motion and prevent re-injury.",
      image: serviceImageUrls["/services_images/Orthopedic & Joint Rehab.jpg"],
      treatments: [
        "Post-Knee & Hip Mobilization",
        "Frozen Shoulder Release",
        "Spine & Disc Realignment",
        "Full Range-of-Motion Restoration",
      ],
      features: ["Targeted Muscle Strengthening", "Gait Retraining & Balance", "Preventative Care Protocols"],
      doctorInCharge: "Dr. Maruthi Rao Pulavarthi",
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "sports-injury",
      title: "Sports Injury Recovery",
      badge: "Athletes Care",
      isHighlighted: false,
      category: "Sports Science",
      description:
        "From ACL tears to tennis elbow - we get athletes back in the game stronger than before, with sport-specific conditioning built in.",
      image: serviceImageUrls["/services_images/Sports Injury Recovery.jpg"],
      treatments: [
        "ACL Tear & Ligament Rehab",
        "Tennis & Golfer's Elbow Relief",
        "Muscle Strain & Tear Recovery",
        "Kinesiology Taping & Stability",
      ],
      features: ["P.G. Diploma Sports Rehab Expertise", "Athletic Conditioning", "Return-to-Sport Benchmarks"],
      doctorInCharge: "Dr. Maruthi Rao Pulavarthi",
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "spine-decompression",
      title: "Spine & Disc Decompression",
      badge: "Non-Surgical",
      isHighlighted: false,
      category: "Spine Care",
      description:
        "A multi-modal approach to long-standing pain that combines manual therapy, movement re-education, and computerized traction to break the pain cycle.",
      image: serviceImageUrls["/services_images/Spine & Disc Decompression.jpg"],
      treatments: [
        "Myofascial Trigger Point Therapy",
        "Spinal Decompression & Traction",
        "Movement Re-Education",
        "Desensitization Protocols",
      ],
      features: ["Multi-Modal Modalities (IFT/TENS)", "Zero-Side-Effect Pain Relief", "Personalized Exercise Therapy"],
      doctorInCharge: "Dr. Maruthi Rao Pulavarthi",
      order: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "stroke-paralysis",
      title: "Stroke Paralysis Recovery",
      badge: "Targeted Neuro",
      isHighlighted: false,
      category: "Neurology",
      description:
        "Structured neuro-rehabilitation following stroke (hemiplegia) and facial weakness - safe, progressive, and motor milestone outcome-focused.",
      image: serviceImageUrls["/services_images/Stroke Paralysis Recovery.jpg"],
      treatments: [
        "NMES Muscle Re-education",
        "Facial Bell's Palsy Therapy",
        "Parallel Bar Gait Retraining",
        "Motor Pathway Stimulation",
      ],
      features: ["Parallel Walking Bar Retraining", "Safe Progressive Load Expansion", "Outcome-Driven Recovery Tracking"],
      doctorInCharge: "Dr. Maruthi Rao Pulavarthi",
      order: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "manual-needling",
      title: "Manual Therapy & Needling",
      badge: "1-on-1 Care",
      isHighlighted: false,
      category: "Specialized Rehab",
      description:
        "Hands-on joint mobilization, soft tissue release, and therapeutic dry needling to reduce pain, restore mobility, and accelerate healing.",
      image: serviceImageUrls["/services_images/Manual Therapy & Needling.jpg"],
      treatments: [
        "Therapeutic Dry Needling",
        "Joint Mobilization & Manipulation",
        "Soft Tissue Myofascial Release",
        "Deep Muscle Trigger Point Release",
      ],
      features: ["1-on-1 Manual Manipulations", "Accelerated Muscle Healing", "Targeted Pain Point Inactivation"],
      doctorInCharge: "Dr. Maruthi Rao Pulavarthi",
      order: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  /* ============ 7. Seed Doctors ============ */
  console.log("=== Seeding Doctors ===");
  await db.collection("doctors").insertMany([
    {
      id: "doc-maruthi-rao",
      name: "Dr. Maruthi Rao Pulavarthi",
      title: "Founder & Chief Clinical Director",
      qualification: "B.P.T",
      regNo: "Reg. No: APF0170",
      specialization: "Stroke Paralysis, Slipped Disc, Joint Replacements & Sports Injury Care",
      specializations: [
        "Stroke & Paralysis Recovery (NMES Therapy)",
        "Slipped Disc & Sciatica Non-Surgical Traction",
        "Post-Knee & Hip Replacement Joint Mobilization",
        "Sports Muscle Strain & Ligament Conditioning",
        "Bell's Palsy & Facial Muscle Re-education",
        "Frozen Shoulder & Cervical Spine Rehab",
      ],
      experienceYears: 14,
      departmentId: "physiotherapy",
      departmentName: "Physiotherapy & Rehabilitation",
      bio: "Dr. Maruthi Rao Pulavarthi (B.P.T, Reg. No: APF0170) is the Founder & Senior Clinical Director bringing over a decade of proven non-surgical recovery expertise to Hanuman Junction.",
      availableDays: "Monday - Saturday: 9:00 AM - 8:00 PM",
      image: doctorImageUrls["/docter_team_3_transparent.png"],
      rating: 4.95,
      patientsCount: 8500,
      role: "Founder & Director",
      expertise:
        "Founder & Chief Clinical Director with 14+ years expertise in paralysis NMES, slipped disc traction, and post-surgical joint mobilization.",
      imageClassName: "scale-[1.25] translate-y-4",
      accent: "#588356",
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "doc-konka-jayaswai",
      name: "Konka Jayaswai",
      title: "Clinical Physiotherapist",
      qualification: "B.P.T",
      regNo: "",
      specialization: "General Physiotherapy & Movement Rehab",
      experienceYears: 5,
      departmentId: "physiotherapy",
      departmentName: "Clinical Physiotherapy",
      bio: "Clinical physiotherapist specializing in 1-on-1 joint mobilization, electrotherapy application, and post-surgical exercise protocols.",
      availableDays: "Monday - Saturday: 9:00 AM - 8:00 PM",
      image: doctorImageUrls["/docter_team.jpeg"],
      rating: 4.9,
      patientsCount: 3200,
      role: "Clinical Physio",
      expertise:
        "Clinical physiotherapist specializing in 1-on-1 joint mobilization, electrotherapy application, and exercise protocols.",
      imageClassName: "",
      accent: "#588356",
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "doc-danny-christopher",
      name: "Dr. D. Danny Christopher",
      title: "Consultant Physiotherapist",
      qualification: "B.P.T, BSC. PSY, PGDHHM, DIPLOMA GEN",
      regNo: "",
      specialization: "Rehabilitation Psychology & General Wellness",
      experienceYears: 8,
      departmentId: "consultant",
      departmentName: "Consultant Care",
      bio: "Consultant physiotherapist bringing a multi-disciplinary approach in physical rehabilitation, psychological coping for chronic pain, and hospital health management.",
      availableDays: "By Appointment",
      image: doctorImageUrls["/docter_team_4.jpeg"],
      rating: 4.9,
      patientsCount: 4100,
      role: "Consultant Doctor",
      expertise:
        "Consultant physiotherapist bringing a multi-disciplinary approach in physical rehab, chronic pain psychology, and health management.",
      imageClassName: "",
      accent: "#588356",
      order: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "doc-galeesha-sk",
      name: "Dr. Galeesha SK",
      title: "Consultant Orthopedic Physiotherapist",
      qualification: "M.P.T (Ortho)",
      regNo: "Reg. No: 18P301008004",
      specialization: "Orthopedic Manual Therapy & Spine Biomechanics",
      experienceYears: 7,
      departmentId: "consultant",
      departmentName: "Orthopedic Rehabilitation",
      bio: "Specialist Master of Physiotherapy in Orthopedics (M.P.T Ortho, Reg. No: 18P301008004), focusing on complex joint deformities, post-fracture stiffness, and manual spine adjustments.",
      availableDays: "By Appointment",
      image: "",
      rating: 4.95,
      patientsCount: 3900,
      role: "Consultant Orthopedic",
      expertise:
        "Specialist Master of Physiotherapy in Orthopedics (M.P.T Ortho), focusing on complex joint deformities and manual spine adjustments.",
      imageClassName: "",
      accent: "#588356",
      order: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  /* ============ 8. Seed Facilities ============ */
  console.log("=== Seeding Facilities ===");
  await db.collection("facilities").insertMany([
    {
      id: "fac-electro",
      title: "01 Electrotherapy",
      category: "Pain Management",
      badge: "IFT & TENS Unit",
      description:
        "Modern IFT, TENS, Ultrasound, and Electrical Stimulation units for fast pain relief and nerve activation.",
      image: facilityImageUrls["/gallery/facility-electro.jpg"],
      highlights: ["Nerve Stimulation for Paralysis", "Deep Tissue Healing", "Zero-Side-Effect Pain Relief"],
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "fac-laser",
      title: "02 Laser Pain Management",
      category: "Advanced Therapy",
      badge: "Laser Healing",
      description:
        "Advanced laser therapy for targeted, deep tissue pain relief and accelerated healing of sports injuries.",
      image: facilityImageUrls["/gallery/Laser Pain Management.jpeg"],
      highlights: ["Non-Invasive Pain Relief", "Accelerated Tissue Repair", "Targeted Joint Care"],
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "fac-exercise",
      title: "03 Exercise Therapy",
      category: "Joint Rehabilitation",
      badge: "Mobility Studio",
      description:
        "Dedicated exercise area for parallel bar walking, joint range of motion, and step-by-step joint mobilization.",
      image: facilityImageUrls["/gallery/facility-exercise.jpg"],
      highlights: ["Parallel Bar Walking", "Joint Range of Motion", "1-on-1 Doctor Assistance"],
      order: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  /* ============ 9. Seed Gallery Items ============ */
  console.log("=== Seeding Gallery Items ===");
  const galleryDocs: Record<string, unknown>[] = [];
  let order = 1;

  // Interleave: video, 4 images, video, 5 images, video, 7 images, video, 10 images (matches current layout)
  const videoMeta = [
    { title: "Core Strengthening & Yoga", description: "Guided group sessions focusing on core strength, flexibility, and overall well-being." },
    { title: "Exercise Therapy Session", description: "Guided exercise therapy session focused on mobility, strength, and recovery." },
    { title: "Supported Stretching Therapy", description: "Supervised stretching using specialized equipment to improve spinal flexibility and relieve tension." },
    { title: "Strength Training & Conditioning", description: "Targeted weight training exercises under professional supervision to rebuild muscle strength." },
  ];
  const videoSrcs = [
    videoUrls["/5991800-uhd_3840_2160_25fps.mp4"],
    videoUrls["/6023232-uhd_3840_2160_25fps.mp4"],
    videoUrls["/6023241-uhd_3840_2160_25fps.mp4"],
    videoUrls["/6326960-hd_2048_1054_25fps.mp4"],
  ];
  const slices: [number, number][] = [[0, 4], [4, 9], [9, 16], [16, 26]];
  for (let v = 0; v < 4; v++) {
    galleryDocs.push({
      id: `v${v + 1}`,
      title: videoMeta[v].title,
      category: "Therapy",
      mediaType: "video",
      src: videoSrcs[v],
      description: videoMeta[v].description,
      order: order++,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const [start, end] = slices[v];
    for (let i = start; i < end; i++) {
      galleryDocs.push({
        id: `img-${i}`,
        title: `Clinic Gallery ${i + 1}`,
        category: i % 3 === 0 ? "Facilities" : i % 3 === 1 ? "Equipment" : "Therapy",
        mediaType: "image",
        src: galleryUrls[i],
        description: "Venkata Ganapathi Physiotherapy Clinic in Hanuman Junction.",
        order: order++,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }
  await db.collection("galleryitems").insertMany(galleryDocs);

  /* ============ 10. Seed FAQs ============ */
  console.log("=== Seeding FAQs ===");
  await db.collection("faqs").insertMany([
    {
      id: "f1",
      category: "General",
      question: "Do I need a doctor referral before starting physical therapy at Venkata Ganapathi Physiotherapy Clinic?",
      answer:
        "No direct referral is mandatory. You can walk in or book an appointment directly with Dr. Maruthi Rao Pulavarthi for a comprehensive physical evaluation and customized treatment plan.",
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "f2",
      category: "Treatments",
      question: "Is non-surgical computer traction effective for slipped disc and sciatica?",
      answer:
        "Yes! Our computerized lumbar & cervical traction decompresses pinched spinal nerves, relieves disc pressure, and reduces sciatica leg numbness without invasive surgery.",
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "f3",
      category: "Treatments",
      question: "How long does stroke paralysis recovery usually take?",
      answer:
        "Recovery varies by severity. With our daily Neuromuscular Electrical Stimulation (NMES) and parallel walking bar gait retraining, most stroke patients show significant motor improvement within 4 to 12 weeks.",
      order: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "f4",
      category: "Appointments",
      question: "What are the hospital OPD timings in Hanuman Junction?",
      answer:
        "Venkata Ganapathi Physiotherapy Clinic operates Monday to Saturday from 9:00 AM to 8:00 PM. We are closed on Sundays (Holiday). Prior appointment booking is recommended for minimum waiting time.",
      order: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "f5",
      category: "General",
      question: "Are home physiotherapy services available for paralysis patients?",
      answer:
        "Yes, for severe paralysis or non-ambulatory post-operative cases, home visit consultations can be scheduled based on location and doctor availability.",
      order: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  /* ============ 11. Seed Testimonials ============ */
  console.log("=== Seeding Testimonials ===");
  await db.collection("testimonials").insertMany([
    {
      id: "test-1",
      patientName: "K. Venkateswara Rao",
      patientAge: 56,
      condition: "Lower Back Pain & Slipped Disc (నడుము నొప్పి)",
      recoveryPeriod: "3 Weeks Recovery",
      rating: 5,
      comment:
        "I was suffering from severe lower back pain and sciatica leg numbness. Dr. Maruthi Rao Pulavarthi garu treated me at Hanuman Junction clinic with digital traction and exercises. I am completely pain-free now!",
      doctorName: "Dr. Maruthi Rao Pulavarthi",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      verified: true,
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "test-2",
      patientName: "Smt. Lakshmi Devi",
      patientAge: 62,
      condition: "Post Knee Replacement Rehab (మోకాలీ మార్పిడి)",
      recoveryPeriod: "4 Weeks Recovery",
      rating: 5,
      comment:
        "After my knee replacement surgery, my joint was very stiff. Dr. Maruthi Rao Pulavarthi's post-operative mobilization helped me walk normally again without any support.",
      doctorName: "Dr. Maruthi Rao Pulavarthi",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
      verified: true,
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "test-3",
      patientName: "M. Satyanarayana",
      patientAge: 48,
      condition: "Stroke Paralysis Care (పక్షవాతము)",
      recoveryPeriod: "8 Weeks Recovery",
      rating: 5,
      comment:
        "My right side leg and hand lost movement after stroke. Thanks to 14+ years experienced Dr. Maruthi Rao Pulavarthi's daily paralysis rehab, I am able to walk independently today.",
      doctorName: "Dr. Maruthi Rao Pulavarthi",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
      verified: true,
      order: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  /* ============ 13. Seed About Pillars ============ */
  console.log("=== Seeding About Pillars ===");
  await db.collection("aboutpillars").insertMany([
    { id: "pillar-1", title: "1-on-1 Dedicated Therapy", desc: "Undivided senior specialist care by Dr. Maruthi Rao Pulavarthi.", iconName: "HeartPulse", order: 1, createdAt: new Date(), updatedAt: new Date() },
    { id: "pillar-2", title: "Evidence-Based Modalities", desc: "Electrotherapy, Laser pain management & NMES.", iconName: "Target", order: 2, createdAt: new Date(), updatedAt: new Date() },
    { id: "pillar-3", title: "Non-Surgical Disc Care", desc: "Decompression for herniated discs.", iconName: "Shield", order: 3, createdAt: new Date(), updatedAt: new Date() },
    { id: "pillar-4", title: "Personalized Roadmap", desc: "Exercise therapy & neuro rehabilitation.", iconName: "Compass", order: 4, createdAt: new Date(), updatedAt: new Date() },
  ]);

  /* ============ 14. Seed Site Settings ============ */
  console.log("=== Seeding Site Settings ===");
  await db.collection("sitesettings").insertOne({
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
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  /* ============ 15. Seed Admin User ============ */
  console.log("=== Seeding Admin User ===");
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const passwordHash = await bcrypt.hash(password, 12);
  await db.collection("adminusers").insertOne({
    username,
    passwordHash,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  console.log(`  Admin user created: ${username} / ${password}`);

  /* ============ Done ============ */
  console.log("\n=== SEED COMPLETE ===");
  console.log("All data migrated to MongoDB Atlas and media uploaded to Cloudinary.");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
