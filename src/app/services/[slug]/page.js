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
    { tier: "Basic", price: "499", description: "Perfect for small businesses", features: ["5 Pages", "Responsive Design", "Contact Form", "Basic SEO", "1 Month Support"] },
    { tier: "Standard", price: "999", popular: true, description: "Ideal for growing businesses", features: ["10 Pages", "Custom Animations", "CMS Integration", "Advanced SEO", "3 Months Support"] },
    { tier: "Premium", price: "1999", description: "Enterprise solutions", features: ["Unlimited Pages", "E-commerce", "Custom Features", "Priority Support", "12 Months Support"] },
  ],
  "Logo Design": [
    { tier: "Basic", price: "199", description: "Simple logo design", features: ["3 Concepts", "2 Revisions", "PNG & JPG Files", "Social Media Kit"] },
    { tier: "Standard", price: "399", popular: true, description: "Professional branding", features: ["5 Concepts", "Unlimited Revisions", "All File Formats", "Brand Guidelines", "Stationery Design"] },
    { tier: "Premium", price: "799", description: "Complete brand identity", features: ["8 Concepts", "Unlimited Revisions", "Full Brand Book", "Marketing Materials", "Social Templates"] },
  ],
  "UI/UX Design": [
    { tier: "Basic", price: "599", description: "Essential design", features: ["5 Screens", "Wireframes", "Basic Prototype", "1 Revision Round"] },
    { tier: "Standard", price: "1299", popular: true, description: "Complete design", features: ["15 Screens", "User Research", "Interactive Prototype", "Design System", "3 Revision Rounds"] },
    { tier: "Premium", price: "2499", description: "Full UX package", features: ["Unlimited Screens", "User Testing", "Complete Design System", "Developer Handoff", "Ongoing Support"] },
  ],
  "Video Editing": [
    { tier: "Basic", price: "149", description: "Simple edits", features: ["Up to 3 min", "Basic Cuts", "Music & Text", "1 Revision"] },
    { tier: "Standard", price: "349", popular: true, description: "Professional editing", features: ["Up to 10 min", "Color Grading", "Motion Graphics", "Sound Design", "3 Revisions"] },
    { tier: "Premium", price: "699", description: "Cinematic production", features: ["Up to 30 min", "Advanced VFX", "Custom Animation", "Full Audio Mix", "Unlimited Revisions"] },
  ],
  "Digital Marketing": [
    { tier: "Basic", price: "499", description: "Starter package", features: ["1 Platform", "10 Posts/Month", "Basic Analytics", "Monthly Report"] },
    { tier: "Standard", price: "999", popular: true, description: "Growth package", features: ["3 Platforms", "20 Posts/Month", "Ad Management", "Weekly Reports", "Content Strategy"] },
    { tier: "Premium", price: "1999", description: "Enterprise package", features: ["All Platforms", "Daily Posts", "Full Ad Management", "Real-time Dashboard", "Dedicated Manager"] },
  ],
  "SEO Optimization": [
    { tier: "Basic", price: "399", description: "Local SEO", features: ["5 Keywords", "On-Page SEO", "Google Business", "Monthly Report"] },
    { tier: "Standard", price: "799", popular: true, description: "National SEO", features: ["15 Keywords", "Technical SEO", "Link Building", "Content Strategy", "Bi-weekly Reports"] },
    { tier: "Premium", price: "1499", description: "Enterprise SEO", features: ["50+ Keywords", "Full Site Audit", "Advanced Link Building", "Content Creation", "Weekly Reports"] },
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
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
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
    if (!service) return;
    setSelectedPackage({
      service: service.title,
      tier: "Meeting",
      price: "Free",
    });
    setIsContactOpen(true);
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

      {/* Quick Meeting CTA */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <motion.div
            className="relative rounded-3xl overflow-hidden p-8 sm:p-12 text-center"
            style={{
              background: `linear-gradient(135deg, ${service.color}15 0%, transparent 50%, #06b6d410 100%)`,
              border: `1px solid ${service.color}30`,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Let's Discuss Your Project
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">
              Book a free 30-minute consultation to discuss your {service.title.toLowerCase()} needs.
              We'll analyze your requirements and provide a custom solution.
            </p>
            <motion.button
              onClick={handleMeetingRequest}
              className="px-8 py-4 rounded-full font-medium text-white inline-flex items-center gap-2"
              style={{ background: `linear-gradient(135deg, ${service.color}, #06b6d4)` }}
              whileHover={{ scale: 1.05, boxShadow: `0 0 40px ${service.color}40` }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Schedule Free Meeting
            </motion.button>
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
            <p className="text-gray-400 mb-4">Need something custom?</p>
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
              Questions
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
            Ready to Get Started?
          </motion.h2>
          <motion.p
            className="text-gray-400 max-w-xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Let's create something amazing together. Contact us today and take the first step towards your digital transformation.
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
