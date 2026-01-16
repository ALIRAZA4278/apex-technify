"use client";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const ContactModal = ({ isOpen, onClose, selectedPackage }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Update form when package is selected
  useEffect(() => {
    if (selectedPackage) {
      const isCustom = selectedPackage.tier === "Custom";
      const isMeeting = selectedPackage.tier === "Meeting";
      const isInquiry = selectedPackage.tier === "Inquiry";

      let message = "";
      if (isMeeting) {
        message = `I'd like to schedule a free consultation to discuss ${selectedPackage.service}.\n\nPreferred meeting times:\n`;
      } else if (isCustom) {
        message = "I'm interested in a custom package. Here are my requirements:\n\n";
      } else if (isInquiry) {
        message = `I'm interested in ${selectedPackage.service} services. Please provide more information.\n\n`;
      } else {
        message = `I'm interested in the ${selectedPackage.tier} ${selectedPackage.service} package ($${selectedPackage.price}).`;
      }

      setFormData(prev => ({
        ...prev,
        service: selectedPackage.service || "",
        message: message,
      }));
    }
  }, [selectedPackage]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const services = [
    "Web Development",
    "Logo Design",
    "UI/UX Design",
    "Video Editing",
    "Digital Marketing",
    "SEO Optimization",
    "Social Media Management",
    "E-Commerce",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          package: selectedPackage || null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-lg mx-4 rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
            style={{
              background: "linear-gradient(160deg, #0d0d12 0%, #0a0a0f 50%, #08080c 100%)",
              boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
            }}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Content */}
            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="text-center mb-6">
                <span className="text-[#d946ef] text-xs tracking-[0.2em] uppercase font-medium">
                  Get In Touch
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                  Let's Start a{" "}
                  <span className="bg-gradient-to-r from-[#d946ef] via-[#a855f7] to-[#06b6d4] bg-clip-text text-transparent">
                    Project
                  </span>
                </h2>
                <p className="text-gray-400 text-sm mt-2">
                  Fill out the form and we'll get back to you within 24 hours.
                </p>
              </div>

              {/* Success Message */}
              {isSubmitted && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0f]/95 z-20 rounded-3xl">
                  <div className="text-center">
                    <div
                      className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, #d946ef, #06b6d4)",
                      }}
                    >
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-400 text-sm">We'll be in touch soon.</p>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`w-full px-4 py-3 rounded-xl bg-[#0d0d12] border transition-colors outline-none text-white placeholder-gray-500 ${
                      focusedField === "name" ? "border-[#d946ef]" : "border-white/10"
                    }`}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`w-full px-4 py-3 rounded-xl bg-[#0d0d12] border transition-colors outline-none text-white placeholder-gray-500 ${
                      focusedField === "email" ? "border-[#d946ef]" : "border-white/10"
                    }`}
                  />
                </div>

                {/* Phone & Service Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 rounded-xl bg-[#0d0d12] border transition-colors outline-none text-white placeholder-gray-500 ${
                      focusedField === "phone" ? "border-[#d946ef]" : "border-white/10"
                    }`}
                  />
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("service")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`w-full px-4 py-3 rounded-xl bg-[#0d0d12] border transition-colors outline-none text-white cursor-pointer ${
                      focusedField === "service" ? "border-[#d946ef]" : "border-white/10"
                    } ${!formData.service ? "text-gray-500" : ""}`}
                  >
                    <option value="" disabled>Select Service</option>
                    {services.map((service) => (
                      <option key={service} value={service} className="bg-[#0d0d12] text-white">
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <textarea
                  name="message"
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl bg-[#0d0d12] border transition-colors outline-none text-white placeholder-gray-500 resize-none ${
                    focusedField === "message" ? "border-[#d946ef]" : "border-white/10"
                  }`}
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-medium text-white relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                  style={{
                    background: "linear-gradient(135deg, #d946ef 0%, #a855f7 50%, #06b6d4 100%)",
                  }}
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
