"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageSquare } from "lucide-react";
import { HOSPITAL_INFO } from "@/data/hospitalData";

export default function EnquirySection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    department: "orthopedic-rehab",
    preferredDate: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    // Simulating instant enquiry storing & Brevo email gateway dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-[#FAFAFE]">
      <div className="max-w-7xl mx-auto px-2">
        
        {/* Editorial Section Header (2-Column Banner Layout) */}
        <div className="mb-12 pb-6 border-b border-slate-200">
          <div className="flex items-center space-x-2 text-[11px] font-bold tracking-widest text-[#588356] uppercase mb-3">
            <span className="text-[#588356]">✦</span>
            <span>GET IN TOUCH</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                BOOK CONSULTATION <span className="font-light text-[#588356]">— OPD ENQUIRY</span>
                <br />
                <span className="text-[#588356]">SCHEDULE YOUR</span> RECOVERY
              </h2>
            </div>

            <div className="lg:col-span-5 border-l-4 border-[#A8D0A6] pl-5 sm:pl-6 py-1">
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed font-serif">
                "Have questions about your pain condition or want to schedule an OPD consultation? Fill in your details below or call our emergency hotline."
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Contact Cards & Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Call Card */}
            <div className="bg-[#FAFAFE] text-slate-900 rounded-2xl sm:rounded-3xl p-6 border border-slate-200 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-[#EBF5EA] text-[#588356] border border-[#A8D0A6]/60 rounded-2xl">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-600 font-extrabold uppercase tracking-wider">Emergency Hotline (24/7)</p>
                  <a
                    href={`tel:${HOSPITAL_INFO.emergencyPhone}`}
                    className="text-xl font-black text-[#588356] hover:underline"
                  >
                    {HOSPITAL_INFO.emergencyPhone}
                  </a>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-700">
                <span className="font-medium">General Reception:</span>
                <span className="font-extrabold text-slate-900">{HOSPITAL_INFO.secondaryPhone}</span>
              </div>
            </div>

            {/* Address & Timings Card */}
            <div className="bg-[#FAFAFE] rounded-2xl sm:rounded-3xl p-6 border border-slate-200 space-y-5">
              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 bg-[#EBF5EA] text-[#588356] border border-[#A8D0A6]/60 rounded-2xl shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Hospital Location</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                    {HOSPITAL_INFO.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 pt-3.5 border-t border-slate-200">
                <div className="p-2.5 bg-[#EBF5EA] text-[#588356] border border-[#A8D0A6]/60 rounded-2xl shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Consultation Timings</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                    {HOSPITAL_INFO.timing}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 pt-3.5 border-t border-slate-200">
                <div className="p-2.5 bg-[#EBF5EA] text-[#588356] border border-[#A8D0A6]/60 rounded-2xl shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Email Address</h3>
                  <a href={`mailto:${HOSPITAL_INFO.email}`} className="text-xs text-[#588356] font-bold hover:underline mt-1 block">
                    {HOSPITAL_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            {/* WhatsApp Quick Action */}
            <a
              href={`https://wa.me/${HOSPITAL_INFO.whatsapp}?text=Hello%20Venkata%20Ganapathi%20Physiotherapy%20Hospital,%20I%20want%20to%20book%20an%20appointment.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 bg-[#A8D0A6] hover:bg-[#96C494] text-slate-900 font-black text-xs uppercase tracking-wider rounded-full flex items-center justify-center space-x-2 transition-all border border-[#A8D0A6]"
            >
              <MessageSquare className="w-4 h-4 fill-slate-900" />
              <span>Instant Chat on WhatsApp</span>
            </a>

          </div>

          {/* Right Column: Appointment Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAFAFE] rounded-2xl sm:rounded-3xl border border-slate-200 p-6 sm:p-8 relative">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">
                Schedule Your Appointment
              </h3>
              <p className="text-xs text-slate-500 mb-6 font-medium">
                Please fill in your details to book your OPD consultation.
              </p>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 bg-[#EBF5EA] border border-[#A8D0A6] text-[#588356] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900">Enquiry Submitted!</h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto font-medium">
                    Thank you, <strong className="text-slate-900">{formData.name}</strong>. Your consultation request for <strong className="text-[#588356]">{formData.department}</strong> has been logged. An email alert has been dispatched to our reception team.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: "", phone: "", email: "", department: "orthopedic-rehab", preferredDate: "", message: "" });
                    }}
                    className="mt-4 px-6 py-2.5 bg-[#588356] hover:bg-[#476b45] text-white text-xs font-black rounded-full transition-colors"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Venkat Rao"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#588356] transition-colors font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#588356] transition-colors font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="patient@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#588356] transition-colors font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                        Specialty Department
                      </label>
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#588356] transition-colors font-medium"
                      >
                        <option value="orthopedic-rehab">Orthopedic Rehabilitation</option>
                        <option value="spine-joint">Spine & Sciatica Care</option>
                        <option value="neuro-rehab">Neurological & Stroke Rehab</option>
                        <option value="sports-injury">Sports Injury Clinic</option>
                        <option value="post-surgery">Post-Surgical Care</option>
                        <option value="pediatric-geriatric">Pediatric & Geriatric Therapy</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#588356] transition-colors font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                      Describe Your Pain / Medical Symptoms
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g., Having severe lower back pain radiating down left leg for 2 weeks..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#588356] transition-colors font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-full font-black text-xs uppercase tracking-wider text-slate-900 bg-[#A8D0A6] hover:bg-[#96C494] border border-[#A8D0A6] transition-all flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center space-x-2">
                        <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                        <span>Sending Notification...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-slate-900" />
                        <span>Confirm & Submit Appointment</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

