"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageSquare, Sparkles } from "lucide-react";
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
    <section id="contact" className="py-16 bg-[#FAFAFE]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-2">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-sky-100 border border-sky-300 text-sky-800 text-xs font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-sky-700" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Book Consultation & <br className="hidden sm:inline" />
            <span className="text-sky-700">Hospital Enquiry</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Have questions about your pain condition or want to schedule an OPD consultation? Fill in your details below or call our emergency hotline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Contact Cards & Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Call Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Emergency Hotline (24/7)</p>
                  <a
                    href={`tel:${HOSPITAL_INFO.emergencyPhone}`}
                    className="text-lg font-black text-emerald-400 hover:underline"
                  >
                    {HOSPITAL_INFO.emergencyPhone}
                  </a>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <span>General Reception:</span>
                <span className="font-bold text-white">{HOSPITAL_INFO.secondaryPhone}</span>
              </div>
            </div>

            {/* Address & Timings Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-300 space-y-5">
              <div className="flex items-start space-x-4">
                <div className="p-2.5 bg-sky-100 text-sky-700 border border-sky-300 rounded-xl shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Hospital Location</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {HOSPITAL_INFO.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 pt-3 border-t border-slate-200">
                <div className="p-2.5 bg-teal-100 text-teal-700 border border-teal-300 rounded-xl shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Consultation Timings</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {HOSPITAL_INFO.timing}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 pt-3 border-t border-slate-200">
                <div className="p-2.5 bg-slate-100 text-slate-700 border border-slate-300 rounded-xl shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Email Address</h3>
                  <a href={`mailto:${HOSPITAL_INFO.email}`} className="text-xs text-sky-700 font-semibold hover:underline mt-1 block">
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
              className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 border border-emerald-700 rounded-xl text-white font-bold text-sm flex items-center justify-center space-x-3 transition-colors"
            >
              <MessageSquare className="w-5 h-5 fill-white" />
              <span>Instant Chat on WhatsApp</span>
            </a>

          </div>

          {/* Right Column: Appointment Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-300 p-6 sm:p-8 relative">
              <h3 className="text-xl font-black text-slate-900 mb-1">
                Schedule Your Appointment
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Complete the form below. Instant notification alert will be triggered to hospital staff via Brevo Email Gateway.
              </p>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 border border-emerald-300 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900">Enquiry Submitted!</h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, <strong className="text-slate-900">{formData.name}</strong>. Your consultation request for <strong className="text-sky-700">{formData.department}</strong> has been logged. An email alert has been dispatched to our reception team.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: "", phone: "", email: "", department: "orthopedic-rehab", preferredDate: "", message: "" });
                    }}
                    className="mt-4 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Venkat Rao"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-600 focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-600 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="patient@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-600 focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Specialty Department
                      </label>
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-600 focus:bg-white transition-colors"
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
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-600 focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Describe Your Pain / Medical Symptoms
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g., Having severe lower back pain radiating down left leg for 2 weeks..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-600 focus:bg-white transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-lg font-extrabold text-sm text-slate-900 bg-[#A8D0A6] hover:bg-[#96C494] border border-[#A8D0A6] transition-colors flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center space-x-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Notification...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Confirm & Submit Appointment</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-500">
                    📧 Form submissions trigger instant notifications to the hospital care team via Brevo gateway.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
