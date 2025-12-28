"use client";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Lenis from "lenis";
import { getServiceBySlug, getServicePackages } from "@/data/services";
import ContactModal from "@/components/ContactModal";

// Service-specific packages data
const packages = {
  "Web Development": [
    { tier: "Basic", price: "499", description: "Excellent for small companies", features: ["5 Pages", "Mobile-friendly", "Contact Form", "Basic SEO", "1 Month Support"] },
    { tier: "Standard", price: "999", popular: true, description: "Open for business expansion", features: ["10 Pages", "Custom Animations", "CMS Integration", "Advanced SEO", "3 Months Support"] },
    { tier: "Premium", price: "1999", description: "Corporate packages", features: ["No Limit on Pages", "E-commerce", "Custom Features", "Priority Support", "12 Months Support"] },
  ],
  "Logo Design": [
    { tier: "Basic", price: "199", description: "Straightforward Logo Design", features: ["3 Logo Ideas", "2 Changes", "PNG & JPG Files", "Social Media Kit"] },
    { tier: "Standard", price: "399", popular: true, description: "Professional Branding", features: ["5 Logo Ideas", "Unlimited Changes", "All Formats", "Branding Guidelines", "Letterhead Design"] },
    { tier: "Premium", price: "799", description: "Total Brand Identity", features: ["8 Logo Ideas", "Unlimited Changes", "Complete Branding Manual", "Promotional Materials", "Social Media Designs"] },
  ],
  "UI/UX Design": [
    { tier: "Basic", price: "599", description: "Fundamental UI/UX Design", features: ["5 Screens", "UX Wireframes", "Basic Prototype", "1 Revision Round"] },
    { tier: "Standard", price: "1299", popular: true, description: "Full UI/UX Design", features: ["15 Screens", "User Research", "Interactive Prototype", "Design System", "3 Revision Rounds"] },
    { tier: "Premium", price: "2499", description: "Total UX Package", features: ["Unlimited Screens", "User Testing", "Complete Design System", "Developer-Ready Handoff", "Ongoing Support"] },
  ],
  "Video Editing": [
    { tier: "Basic", price: "149", description: "Basic Video Editing", features: ["Maximum of 3 Minutes", "Basic Cuts", "Music & Text", "1 Revision"] },
    { tier: "Standard", price: "349", popular: true, description: "Professional Video Editing", features: ["Up to 10 Minutes", "Color Grading", "Motion Graphics", "Sound Design", "3 Revisions"] },
    { tier: "Premium", price: "699", description: "Cinematic Video Production", features: ["Up to 30 Minutes", "Advanced VFX", "Custom Animations", "Full Audio Mix", "Unlimited Revisions"] },
  ],
  "Digital Marketing": [
    { tier: "Basic", price: "499", description: "Starter package", features: ["1 Platform", "10 Posts/Month", "Basic Analytics", "Monthly Report"] },
    { tier: "Standard", price: "999", popular: true, description: "Growth package", features: ["3 Platforms", "20 Posts/Month", "Ad Management", "Weekly Reports", "Content Strategy"] },
    { tier: "Premium", price: "1999", description: "Enterprise package", features: ["All Platforms", "Daily Posts", "Full Ad Management", "Real-time Dashboard", "Dedicated Manager"] },
  ],
  "SEO Optimization": [
    { tier: "Basic", price: "399", description: "Local SEO", features: ["5 Target Keywords", "On-Page SEO Optimization", "Google Business Profile Optimization", "Monthly SEO Report"] },
    { tier: "Standard", price: "799", popular: true, description: "National SEO", features: ["15 Target Keywords", "Technical SEO Optimization", "Link Building Campaigns", "SEO Content Strategy", "Bi-Monthly Reports"] },
    { tier: "Premium", price: "1499", description: "Enterprise SEO", features: ["50+ Target Keywords", "Full Website SEO Audit", "Advanced Link Building", "SEO Content Creation", "Weekly Performance Reports"] },
  ],
  "Social Media Management": [
    { tier: "Basic", price: "399", description: "Essential management", features: ["2 Platforms", "12 Posts/Month", "Basic Graphics", "Monthly Analytics"] },
    { tier: "Standard", price: "799", popular: true, description: "Professional management", features: ["4 Platforms", "20 Posts/Month", "Custom Graphics", "Stories & Reels", "Community Management"] },
    { tier: "Premium", price: "1499", description: "Full service", features: ["All Platforms", "Daily Content", "Video Content", "Influencer Outreach", "Paid Campaigns"] },
  ],
  "E-Commerce": [
    { tier: "Basic", price: "799", description: "Starter store", features: ["Up to 50 Products", "Payment Setup", "Basic Theme", "1 Month Support"] },
    { tier: "Standard", price: "1499", popular: true, description: "Professional store", features: ["Up to 500 Products", "Custom Design", "Multi-payment", "Shipping Integration", "3 Months Support"] },
    { tier: "Premium", price: "2999", description: "Enterprise store", features: ["Unlimited Products", "Custom Development", "Advanced Features", "Multi-currency", "12 Months Support"] },
  ],
};

const ServicePage = () => {
  const params = useParams();
  const router = useRouter();
  const [service, setService] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Consultation booking state
  const [consultationForm, setConsultationForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferredTime: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const serviceData = getServiceBySlug(params.slug);
    if (serviceData) {
      setService(serviceData);
    }
    setIsLoading(false);
  }, [params.slug]);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
      gestureOrientation: "vertical",
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handlePackageSelect = (pkg) => {
    if (!service) return;
    setSelectedPackage({
      service: service.title,
      tier: pkg.tier,
      price: pkg.price,
    });
    setIsContactOpen(true);
  };

  const handleContactOpen = () => {
    if (!service) return;
    setSelectedPackage({
      service: service.title,
      tier: "Inquiry",
      price: "",
    });
    setIsContactOpen(true);
  };

  const handleMeetingRequest = () => {
    const consultationSection = document.getElementById("consultation");
    if (consultationSection) {
      consultationSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle consultation form submit
  const handleConsultationSubmit = async (e) => {
    e.preventDefault();
    if (!consultationForm.name || !consultationForm.email || !consultationForm.phone) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: consultationForm.name,
          email: consultationForm.email,
          phone: consultationForm.phone,
          service: service?.title,
          preferredTime: consultationForm.preferredTime,
          message: consultationForm.message,
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setConsultationForm({ name: "", email: "", phone: "", preferredTime: "", message: "" });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        const data = await response.json();
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#d946ef] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
        <Link href="/" className="text-[#d946ef] hover:underline">
          Go back home
        </Link>
      </div>
    );
  }

  const servicePackages = packages[service.title] || [];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            <span className="text-white">Apex</span>
            <span className="bg-gradient-to-r from-[#d946ef] via-[#a855f7] to-[#06b6d4] bg-clip-text text-transparent">Technify</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/#expertise" className="text-gray-400 hover:text-white text-sm hidden sm:block">
              All Services
            </Link>
            <motion.button
              onClick={handleContactOpen}
              className="px-4 py-2 rounded-full text-sm font-medium text-white"
              style={{ background: "linear-gradient(135deg, #d946ef 0%, #06b6d4 100%)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 sm:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full blur-[100px] opacity-20"
            style={{ backgroundColor: service.color }}
          />
          <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] bg-[#06b6d4]/10 rounded-full blur-[80px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-6"
              style={{
                background: `${service.color}20`,
                color: service.color,
                border: `1px solid ${service.color}40`,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              {service.tagline}
            </motion.span>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {service.title}
              <span style={{ color: service.color }}>.</span>
            </motion.h1>

            <motion.p
              className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {service.description}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                onClick={handleContactOpen}
                className="px-8 py-4 rounded-full font-medium text-white"
                style={{ background: `linear-gradient(135deg, ${service.color}, #06b6d4)` }}
                whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${service.color}50` }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
              <motion.button
                onClick={handleMeetingRequest}
                className="px-8 py-4 rounded-full font-medium border"
                style={{ borderColor: `${service.color}50`, color: service.color }}
                whileHover={{ scale: 1.05, background: `${service.color}10` }}
                whileTap={{ scale: 0.95 }}
              >
                Book Free Consultation
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: service.color }}>
              What We Offer
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
              Our <span style={{ color: service.color }}>Capabilities</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${service.color}20` }}
                >
                  <div className="w-6 h-6 rounded-full" style={{ background: service.color }} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 sm:py-24 bg-white/[0.02]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: service.color }}>
              How We Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
              Our <span style={{ color: service.color }}>Process</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.process.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className="text-6xl font-bold opacity-10 absolute -top-4 -left-2"
                  style={{ color: service.color }}
                >
                  {String(step.step).padStart(2, "0")}
                </div>
                <div className="relative pt-8">
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Consultation Section */}
      <section id="consultation" className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <motion.div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(160deg, #0d0d12 0%, #08080c 100%)",
              border: `1px solid ${service.color}20`,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Background Glow */}
            <div
              className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none"
              style={{ background: `radial-gradient(circle at 80% 20%, ${service.color}40 0%, transparent 60%)` }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 sm:p-12">
              {/* Left - Info */}
              <div>
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
                  style={{ background: `${service.color}20`, color: service.color }}
                >
                  Free Consultation
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                  Comprehending with <span style={{ color: service.color }}>Your Vision</span>
                </h2>
                <p className="text-gray-400 mb-6">
                  Arranging a complimentary 30 minutes strategic session with our masters of {service.title.toLowerCase()}.
                  Offers include custom project assessment, professional advice, and transparent pricing.
                </p>

                {/* Benefits */}
                <div className="space-y-3 mb-6">
                  {[
                    "Custom project assessment",
                    "Professional advice",
                    "Transparent pricing & deadlines",
                    "No commitment to continue"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: `${service.color}20` }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={service.color} strokeWidth="3">
                          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="text-gray-300 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Info badges */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={service.color} strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                    30 min call
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={service.color} strokeWidth="2">
                      <polygon points="23 7 16 12 23 17 23 7"/>
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                    </svg>
                    Video Call
                  </div>
                </div>
              </div>

              {/* Right - Form */}
              <div
                className="p-6 rounded-2xl"
                style={{
                  background: "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.2) 100%)",
                  border: "1px solid rgba(255,255,255,0.05)"
                }}
              >
                {/* Success Message */}
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 rounded-xl text-center"
                    style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)" }}
                  >
                    <p className="text-green-400 text-sm font-medium">Booked! Check your email for confirmation.</p>
                  </motion.div>
                )}

                <form onSubmit={handleConsultationSubmit} className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={consultationForm.name}
                      onChange={(e) => setConsultationForm({ ...consultationForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#d946ef]/50 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={consultationForm.email}
                      onChange={(e) => setConsultationForm({ ...consultationForm, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#d946ef]/50 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={consultationForm.phone}
                      onChange={(e) => setConsultationForm({ ...consultationForm, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#d946ef]/50 transition-colors"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Preferred Time & Timezone</label>
                    <input
                      type="text"
                      value={consultationForm.preferredTime}
                      onChange={(e) => setConsultationForm({ ...consultationForm, preferredTime: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#d946ef]/50 transition-colors"
                      placeholder="e.g., Mon-Fri 10AM-2PM (EST)"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Project Details (Optional)</label>
                    <textarea
                      rows="3"
                      value={consultationForm.message}
                      onChange={(e) => setConsultationForm({ ...consultationForm, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#d946ef]/50 transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-medium text-white flex items-center justify-center gap-3 disabled:opacity-50"
                    style={{ background: `linear-gradient(135deg, ${service.color}, #06b6d4)` }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        Booking...
                      </>
                    ) : (
                      <>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Book Free Consultation
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 sm:py-24 bg-white/[0.02]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: service.color }}>
              Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
              Choose Your <span style={{ color: service.color }}>Package</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {servicePackages.map((pkg, index) => (
              <motion.div
                key={index}
                className={`relative p-6 rounded-2xl border ${
                  pkg.popular ? "border-[#d946ef]/50" : "border-white/10"
                } bg-white/[0.02]`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {pkg.popular && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium text-white"
                    style={{ background: "linear-gradient(135deg, #d946ef, #a855f7)" }}
                  >
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-white mb-1">{pkg.tier}</h3>
                  <p className="text-gray-500 text-sm mb-4">{pkg.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-gray-400">$</span>
                    <span
                      className="text-4xl font-bold"
                      style={{
                        background: `linear-gradient(135deg, ${service.color}, #06b6d4)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {pkg.price}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2 text-sm text-gray-300">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={service.color}
                        strokeWidth="2"
                      >
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <motion.button
                  onClick={() => handlePackageSelect(pkg)}
                  className="w-full py-3 rounded-xl font-medium text-sm"
                  style={{
                    background: pkg.popular
                      ? `linear-gradient(135deg, ${service.color}, #06b6d4)`
                      : "transparent",
                    border: pkg.popular ? "none" : `1px solid ${service.color}50`,
                    color: pkg.popular ? "#fff" : service.color,
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Custom Package CTA */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 mb-4">In case you are requiring something not standard, just get in contact and we will do a Custom Package together!</p>
            <motion.button
              onClick={() => {
                setSelectedPackage({
                  service: service.title,
                  tier: "Custom",
                  price: "Custom",
                });
                setIsContactOpen(true);
              }}
              className="px-6 py-3 rounded-full font-medium border"
              style={{ borderColor: `${service.color}50`, color: service.color }}
              whileHover={{ scale: 1.05, background: `${service.color}10` }}
              whileTap={{ scale: 0.95 }}
            >
              Contact for Custom Package
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: service.color }}>
              Common Inquiries
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
              Frequently <span style={{ color: service.color }}>Asked</span>
            </h2>
          </motion.div>

          <div className="max-w-2xl mx-auto space-y-4">
            {service.faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-gray-400 text-sm">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 sm:py-24 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Start?
          </motion.h2>
          <motion.p
            className="text-gray-400 max-w-xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Let us create a site that will be not only aesthetically attractive but also efficient in converting. Contact us today and take your first step towards professional web development services and a strong online presence.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={handleContactOpen}
              className="px-8 py-4 rounded-full font-medium text-white"
              style={{ background: `linear-gradient(135deg, ${service.color}, #06b6d4)` }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Project
            </motion.button>
            <Link href="/">
              <motion.button
                className="px-8 py-4 rounded-full font-medium border border-white/20 text-white hover:bg-white/5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Services
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        selectedPackage={selectedPackage}
      />
    </div>
  );
};

export default ServicePage;
