export interface Department {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  category: string;
  treatments: string[];
  features: string[];
  image: string;
  doctorInCharge: string;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  qualification: string;
  specialization: string;
  experienceYears: number;
  departmentId: string;
  departmentName: string;
  bio: string;
  availableDays: string;
  image: string;
  rating: number;
  patientsCount: number;
}

export interface Facility {
  id: string;
  title: string;
  description: string;
  category: 'Diagnostic' | 'Therapy' | 'Amenities' | 'Infrastructure';
  icon: string;
  image: string;
  highlights: string[];
}

export interface Testimonial {
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

export interface SymptomOption {
  id: string;
  area: string;
  symptom: string;
  recommendedTherapy: string;
  expectedDuration: string;
  description: string;
  suggestedSpecialist: string;
}

export const HOSPITAL_INFO = {
  name: "Venkata Ganapathi",
  subtitle: "Physiotherapy Clinic",
  tagline: "10+ Years of Modern Physiotherapy Excellence in Hanuman Junction",
  regNo: "Reg. No: 75/2015",
  chiefDoctor: "Dr. Maruti Rao Pulavarthi",
  doctorQualification: "B.P.T, P.G. Diploma (Sports Rehab)",
  primaryPhone: "9441829648",
  secondaryPhone: "8121411991",
  emergencyPhone: "9441829648",
  email: "care@venkataganapathiphysio.com",
  address: "Opposite Dr. Dutta Ramachandra Rao (Rambabu Garu) Hospital, K.S. Talkies Road, Vijayawada Road, Hanuman Junction - 521105",
  timing: "Monday - Sunday: 10:00 AM - 9:00 PM",
  whatsapp: "919441829648",
  googleMapsUrl: "https://maps.google.com/?q=Hanuman+Junction+Vijayawada+Road",
};

export const HOSPITAL_STATS = [
  { label: "Years of Service", value: "10+", description: "Serving Hanuman Junction & surrounding areas" },
  { label: "Govt Registration", value: "75/2015", description: "Official licensed clinical practice" },
  { label: "Patients Treated", value: "8,500+", description: "Successful recovery cases" },
  { label: "Specialty Focus", value: "100%", description: "Non-surgical joint & neuro rehab" },
];

export const DEPARTMENTS: Department[] = [
  {
    id: "post-op-rehab",
    name: "Post-Operative & Replacement Rehab",
    shortDesc: "Specialized post-knee replacement, hip replacement, and post-surgical joint mobilization.",
    fullDesc: "Comprehensive post-surgical joint mobilization designed for patients recovering from knee replacement, hip replacement, or major fracture surgeries to restore full joint flexibility and walking independence.",
    iconName: "Activity",
    category: "Orthopedics",
    treatments: ["Post Knee Replacement Rehabilitation", "Post Hip Replacement Mobility", "Post-Surgical Joint Mobilization", "Post-Fracture Stiffness Therapy"],
    features: ["Step-by-step Gait Retraining", "Manual Joint Mobilization", "Targeted Muscle Strengthening"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    doctorInCharge: "Dr. Maruti Rao Pulavarthi (B.P.T)",
  },
  {
    id: "spine-disc-care",
    name: "Spine & Disc Care Clinic",
    shortDesc: "Non-surgical treatment for Slipped Disc, Lower Back Pain, Neck Pain, and Sciatica.",
    fullDesc: "Advanced treatment protocols for herniated discs, chronic lumbago, cervical spondylosis, sciatica leg numbness, and spinal cord alignment issues.",
    iconName: "ShieldPulse",
    category: "Spine Care",
    treatments: ["Slipped Disc / Disc Problems", "Lower Back Pain (Nadumu Noppi)", "Neck Pain & Stiffness (Meda Noppi)", "Sciatica & Leg Numbness (Sciatica / Kaalu Jaalu)"],
    features: ["Lumbar Traction Therapy", "Cervical Decompression", "Spine Core Stabilization"],
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
    doctorInCharge: "Dr. Maruti Rao Pulavarthi (B.P.T)",
  },
  {
    id: "neuro-paralysis",
    name: "Neurological & Stroke Paralysis Rehab",
    shortDesc: "Specialized recovery programs for Stroke Paralysis, Facial Palsy (Bell's Palsy), and Cerebral Palsy.",
    fullDesc: "Targeted neuro-rehabilitation for patients suffering from stroke (hemiplegia), facial paralysis (mooti vankara), cerebral palsy in children, and muscular dystrophy.",
    iconName: "Brain",
    category: "Neurology",
    treatments: ["Stroke & Paralysis Care (Pakshavathamu)", "Facial Weakness / Bell's Palsy (Mooti Vankara)", "Cerebral Palsy (Child Rehab)", "Nerve Compression Therapy"],
    features: ["Neuromuscular Stimulation (NMES)", "Facial Re-education Exercises", "Pediatric Motor Milestone Training"],
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800",
    doctorInCharge: "Dr. Maruti Rao Pulavarthi (B.P.T)",
  },
  {
    id: "joint-arthritis",
    name: "Joint Pain & Arthritis Clinic",
    shortDesc: "Relief for Knee Pain, Rheumatoid Arthritis, Shoulder Stiffness, and Heel Pain.",
    fullDesc: "Targeted physical therapy for osteoarthritis knee pain, frozen shoulder, elbow tendonitis, heel pain (plantar fasciitis), and rheumatoid joint swelling.",
    iconName: "Zap",
    category: "Joint Care",
    treatments: ["Knee Joint Pain (Mokalla Noppi)", "Rheumatoid Arthritis (Keella Vaathamu)", "Shoulder Pain / Frozen Shoulder (Bhujamu Noppi)", "Heel Pain (Madama Noppi)"],
    features: ["Electrotherapy & Ultrasound", "Soft Tissue Myofascial Release", "Therapeutic Joint Exercises"],
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800",
    doctorInCharge: "Dr. Maruti Rao Pulavarthi (B.P.T)",
  },
  {
    id: "sports-rehab",
    name: "Sports Injury & Muscle Pain Clinic",
    shortDesc: "Specialized P.G. Diploma level care for muscle strains, tennis elbow, and athletic conditioning.",
    fullDesc: "Head consultant Dr. Maruti Rao holds a P.G. Diploma in Sports Rehab, providing expert treatment for muscle tears, sprains, elbow stiffness, and sports conditioning.",
    iconName: "Activity",
    category: "Sports Science",
    treatments: ["Elbow Pain / Tennis Elbow (Mocheti Noppi)", "Muscle Pains & Strains (Kandarala Noppulu)", "Ligament Sprains & Conditioning", "Postural Muscle Pain"],
    features: ["P.G. Diploma Sports Rehab Techniques", "Kinesiology Taping", "Muscle Trigger Point Therapy"],
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
    doctorInCharge: "Dr. Maruti Rao Pulavarthi (B.P.T, P.G Dip Sports)",
  },
];

export const DOCTORS: Doctor[] = [
  {
    id: "doc-maruti-rao",
    name: "Dr. Maruti Rao Pulavarthi",
    title: "Chief Physiotherapist & Founder",
    qualification: "B.P.T, P.G. Diploma in Sports Rehab",
    specialization: "Stroke Paralysis, Slipped Disc, Joint Replacements & Sports Injury Care",
    experienceYears: 10,
    departmentId: "post-op-rehab",
    departmentName: "Physiotherapy & Rehabilitation",
    bio: "Dr. Maruti Rao Pulavarthi (B.P.T, P.G. Diploma Sports Rehab) has been serving Hanuman Junction and surrounding areas for over 10 years with modern, evidence-based physiotherapy techniques for paralysis, back pain, joint stiffness, and post-surgical recovery.",
    availableDays: "Monday - Sunday: 10:00 AM - 9:00 PM",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
    rating: 4.95,
    patientsCount: 8500,
  },
];

export const FACILITIES: Facility[] = [
  {
    id: "fac-1",
    title: "Electrotherapy & Ultrasound Modalities",
    description: "Modern IFT, TENS, Ultrasound, and Electrical Stimulation units for fast pain relief and nerve activation.",
    category: "Therapy",
    icon: "Zap",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    highlights: ["Nerve Stimulation for Paralysis", "Deep Tissue Healing", "Zero-Side-Effect Pain Relief"],
  },
  {
    id: "fac-2",
    title: "Computerized Lumbar & Cervical Traction",
    description: "Digital traction system for automated spinal decompression of slipped discs, cervical spondylosis, and sciatica.",
    category: "Therapy",
    icon: "Layers",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800",
    highlights: ["Non-Surgical Slipped Disc Relief", "Targeted Sciatica Decompression", "Custom Pull Settings"],
  },
  {
    id: "fac-3",
    title: "Post-Operative Mobilization Zone",
    description: "Dedicated exercise area for step-by-step joint mobilization following knee and hip replacement surgeries.",
    category: "Infrastructure",
    icon: "Activity",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
    highlights: ["1-on-1 Doctor Assistance", "Parallel Walking Bars", "Joint Flexion Aids"],
  },
];

export const SYMPTOM_OPTIONS: SymptomOption[] = [
  {
    id: "sym-1",
    area: "Stroke / Paralysis (పక్షవాతము)",
    symptom: "Loss of movement on one side of body, muscle weakness after stroke.",
    recommendedTherapy: "Neuromuscular Electrical Stimulation (NMES) + Parallel Bar Gait Retraining",
    expectedDuration: "4 to 12 Weeks Intensive Care",
    description: "Retrains motor brain pathways to activate dormant limb muscles and restore daily walking independence.",
    suggestedSpecialist: "Dr. Maruti Rao Pulavarthi B.P.T",
  },
  {
    id: "sym-2",
    area: "Lower Back Pain & Slipped Disc (నడుము నొప్పి / డిస్క్)",
    symptom: "Severe lower back ache, inability to bend, stiffness while sitting or standing.",
    recommendedTherapy: "Computerized Lumbar Traction Decompression + Core Mobilization",
    expectedDuration: "2 to 4 Weeks (10-15 sessions)",
    description: "Decompresses pinched spinal nerves and relieves intervertebral disc pressure.",
    suggestedSpecialist: "Dr. Maruti Rao Pulavarthi B.P.T",
  },
  {
    id: "sym-3",
    area: "Knee Joint Pain & Post-Replacement (మోకాళ్ళ నొప్పి / రీప్లేస్‌మెంట్)",
    symptom: "Pain while walking, stair difficulty, or post-knee replacement joint stiffness.",
    recommendedTherapy: "Post-Operative Joint Mobilization + Quadriceps Strengthening + Ultrasound",
    expectedDuration: "3 to 6 Weeks",
    description: "Reduces joint swelling, restores full knee bend angle, and improves gait stability.",
    suggestedSpecialist: "Dr. Maruti Rao Pulavarthi B.P.T",
  },
  {
    id: "sym-4",
    area: "Facial Weakness / Bell's Palsy (మూతి వంకర)",
    symptom: "Asymmetry in mouth alignment, inability to close eye or smile properly.",
    recommendedTherapy: "Facial Muscle Re-education + Gentle Electrical Stimulation",
    expectedDuration: "2 to 4 Weeks",
    description: "Stimulates facial nerve recovery and restores symmetrical facial muscle movements.",
    suggestedSpecialist: "Dr. Maruti Rao Pulavarthi B.P.T",
  },
  {
    id: "sym-5",
    area: "Sciatica & Leg Numbness (సయాటికా / కాలుజాలు)",
    symptom: "Sharp radiating pain or tingling sensation from lower back down to legs/feet.",
    recommendedTherapy: "Targeted Sciatic Nerve Gliding + Lumbar Decompression",
    expectedDuration: "2 to 4 Weeks",
    description: "Relieves sciatic nerve root compression and eliminates leg numbness.",
    suggestedSpecialist: "Dr. Maruti Rao Pulavarthi B.P.T",
  },
  {
    id: "sym-6",
    area: "Shoulder & Neck Pain (భుజము నొప్పి / మెడ నొప్పి)",
    symptom: "Frozen shoulder reach restriction, neck stiffness, arm radiating pain.",
    recommendedTherapy: "Manual Joint Mobilization + Cervical Traction + Electrotherapy",
    expectedDuration: "3 to 5 Weeks",
    description: "Restores full overhead shoulder reach and relieves neck spondylosis pressure.",
    suggestedSpecialist: "Dr. Maruti Rao Pulavarthi B.P.T",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    patientName: "K. Venkateswara Rao",
    patientAge: 56,
    condition: "Lower Back Pain & Slipped Disc (నడుము నొప్పి)",
    recoveryPeriod: "3 Weeks Recovery",
    rating: 5,
    comment: "I was suffering from severe lower back pain and sciatica leg numbness. Dr. Maruti Rao garu treated me at Hanuman Junction clinic with digital traction and exercises. I am completely pain-free now!",
    doctorName: "Dr. Maruti Rao Pulavarthi",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    verified: true,
  },
  {
    id: "test-2",
    patientName: "Smt. Lakshmi Devi",
    patientAge: 62,
    condition: "Post Knee Replacement Rehab (మోకాలీ మార్పిడి)",
    recoveryPeriod: "4 Weeks Recovery",
    rating: 5,
    comment: "After my knee replacement surgery, my joint was very stiff. Dr. Maruti Rao's post-operative mobilization helped me walk normally again without any support.",
    doctorName: "Dr. Maruti Rao Pulavarthi",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    verified: true,
  },
  {
    id: "test-3",
    patientName: "M. Satyanarayana",
    patientAge: 48,
    condition: "Stroke Paralysis Care (పక్షవాతము)",
    recoveryPeriod: "8 Weeks Recovery",
    rating: 5,
    comment: "My right side leg and hand lost movement after stroke. Thanks to 10+ years experienced Dr. Maruti Rao's daily paralysis rehab, I am able to walk independently today.",
    doctorName: "Dr. Maruti Rao Pulavarthi",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    verified: true,
  },
];
