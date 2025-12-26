"use client";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

const services = [
  "All",
  "Web Development",
  "UI/UX Design",
  "Digital Marketing",
  "Brand Identity",
  "SEO Optimization",
  "Social Media",
  "Content Strategy",
  "E-Commerce",
];

const packages = [
  // Web Development
  {
    service: "Web Development",
    tier: "Basic",
    price: "499",
    description: "Perfect for small businesses & startups",
    features: [
      "5 Pages Website",
      "Responsive Design",
      "Contact Form",
      "Basic SEO Setup",
      "1 Month Support",
      "Social Media Links",
    ],
    notIncluded: ["Custom Animations", "CMS Integration", "E-commerce"],
  },
  {
    service: "Web Development",
    tier: "Standard",
    price: "999",
    popular: true,
    description: "Ideal for growing businesses",
    features: [
      "10 Pages Website",
      "Responsive Design",
      "Contact Form & Chat",
      "Advanced SEO Setup",
      "3 Months Support",
      "Custom Animations",
      "CMS Integration",
      "Performance Optimization",
    ],
    notIncluded: ["E-commerce Features"],
  },
  {
    service: "Web Development",
    tier: "Premium",
    price: "1999",
    description: "Complete solution for enterprises",
    features: [
      "Unlimited Pages",
      "Responsive Design",
      "Advanced Forms & Chat",
      "Full SEO Package",
      "6 Months Support",
      "Custom Animations",
      "CMS Integration",
      "E-commerce Ready",
      "API Integration",
      "Priority Support",
    ],
    notIncluded: [],
  },

  // UI/UX Design
  {
    service: "UI/UX Design",
    tier: "Basic",
    price: "399",
    description: "Essential design for your product",
    features: [
      "5 Screen Designs",
      "Basic Wireframes",
      "Color Palette",
      "Typography Guide",
      "2 Revisions",
      "Source Files",
    ],
    notIncluded: ["Prototyping", "User Research", "Design System"],
  },
  {
    service: "UI/UX Design",
    tier: "Standard",
    price: "799",
    popular: true,
    description: "Professional design experience",
    features: [
      "15 Screen Designs",
      "Detailed Wireframes",
      "Complete Style Guide",
      "Interactive Prototype",
      "5 Revisions",
      "Source Files",
      "Icon Set Design",
      "Responsive Designs",
    ],
    notIncluded: ["User Research"],
  },
  {
    service: "UI/UX Design",
    tier: "Premium",
    price: "1499",
    description: "End-to-end design solution",
    features: [
      "Unlimited Screens",
      "User Research & Analysis",
      "Complete Design System",
      "Interactive Prototype",
      "Unlimited Revisions",
      "All Source Files",
      "Custom Illustrations",
      "Usability Testing",
      "Design Handoff",
      "1 Month Support",
    ],
    notIncluded: [],
  },

  // Digital Marketing
  {
    service: "Digital Marketing",
    tier: "Basic",
    price: "299",
    description: "Start your digital presence",
    features: [
      "Social Media Setup",
      "5 Posts/Week",
      "Basic Analytics",
      "1 Platform",
      "Monthly Report",
      "Content Calendar",
    ],
    notIncluded: ["Paid Ads", "Influencer Marketing", "Email Marketing"],
  },
  {
    service: "Digital Marketing",
    tier: "Standard",
    price: "599",
    popular: true,
    description: "Grow your online reach",
    features: [
      "Social Media Management",
      "15 Posts/Week",
      "Advanced Analytics",
      "3 Platforms",
      "Weekly Reports",
      "Paid Ads Management",
      "Content Strategy",
      "Community Management",
    ],
    notIncluded: ["Influencer Marketing"],
  },
  {
    service: "Digital Marketing",
    tier: "Premium",
    price: "1199",
    description: "Dominate digital marketing",
    features: [
      "Full Marketing Suite",
      "Unlimited Posts",
      "Real-time Analytics",
      "All Platforms",
      "Daily Reports",
      "Paid Ads ($500 budget)",
      "Influencer Outreach",
      "Email Marketing",
      "Lead Generation",
      "Dedicated Manager",
    ],
    notIncluded: [],
  },

  // Brand Identity
  {
    service: "Brand Identity",
    tier: "Basic",
    price: "349",
    description: "Essential brand elements",
    features: [
      "Logo Design (3 Concepts)",
      "Color Palette",
      "Typography Selection",
      "Business Card Design",
      "2 Revisions",
      "Source Files",
    ],
    notIncluded: ["Brand Guidelines", "Stationery Design", "Brand Strategy"],
  },
  {
    service: "Brand Identity",
    tier: "Standard",
    price: "699",
    popular: true,
    description: "Complete brand package",
    features: [
      "Logo Design (5 Concepts)",
      "Full Color System",
      "Typography Guide",
      "Business Card & Letterhead",
      "Social Media Kit",
      "Brand Guidelines",
      "5 Revisions",
      "All Source Files",
    ],
    notIncluded: ["Brand Strategy"],
  },
  {
    service: "Brand Identity",
    tier: "Premium",
    price: "1299",
    description: "Full brand transformation",
    features: [
      "Logo Design (Unlimited)",
      "Complete Visual Identity",
      "Brand Strategy Document",
      "Full Stationery Design",
      "Social Media Kit",
      "Brand Guidelines Book",
      "Packaging Design",
      "Brand Voice Guide",
      "Unlimited Revisions",
      "Ongoing Support",
    ],
    notIncluded: [],
  },

  // SEO Optimization
  {
    service: "SEO Optimization",
    tier: "Basic",
    price: "249",
    description: "Foundation SEO setup",
    features: [
      "Website Audit",
      "Keyword Research (20)",
      "On-Page SEO",
      "Meta Tags Optimization",
      "Monthly Report",
      "Google Analytics Setup",
    ],
    notIncluded: ["Link Building", "Content Creation", "Local SEO"],
  },
  {
    service: "SEO Optimization",
    tier: "Standard",
    price: "499",
    popular: true,
    description: "Comprehensive SEO strategy",
    features: [
      "Full Website Audit",
      "Keyword Research (50)",
      "On-Page & Off-Page SEO",
      "Technical SEO",
      "Link Building (10/month)",
      "Bi-weekly Reports",
      "Competitor Analysis",
      "Local SEO Setup",
    ],
    notIncluded: ["Content Creation"],
  },
  {
    service: "SEO Optimization",
    tier: "Premium",
    price: "999",
    description: "Enterprise SEO solution",
    features: [
      "Complete SEO Overhaul",
      "Unlimited Keywords",
      "Full Technical SEO",
      "Link Building (30/month)",
      "Content Strategy",
      "Weekly Reports",
      "Local & National SEO",
      "Voice Search Optimization",
      "E-commerce SEO",
      "Dedicated SEO Manager",
    ],
    notIncluded: [],
  },

  // Social Media Management
  {
    service: "Social Media",
    tier: "Basic",
    price: "199",
    description: "Essential social presence",
    features: [
      "2 Platforms",
      "8 Posts/Month",
      "Basic Graphics",
      "Hashtag Research",
      "Monthly Analytics",
      "Content Calendar",
    ],
    notIncluded: ["Stories/Reels", "Community Management", "Influencer Collab"],
  },
  {
    service: "Social Media",
    tier: "Standard",
    price: "449",
    popular: true,
    description: "Active social engagement",
    features: [
      "4 Platforms",
      "20 Posts/Month",
      "Custom Graphics",
      "Stories & Reels",
      "Community Management",
      "Bi-weekly Reports",
      "Trend Analysis",
      "Engagement Strategy",
    ],
    notIncluded: ["Influencer Collaboration"],
  },
  {
    service: "Social Media",
    tier: "Premium",
    price: "899",
    description: "Full social media domination",
    features: [
      "All Platforms",
      "Daily Posts",
      "Premium Graphics & Videos",
      "Stories, Reels & Lives",
      "24/7 Community Management",
      "Weekly Reports",
      "Influencer Collaboration",
      "Crisis Management",
      "Paid Campaign Setup",
      "Dedicated Manager",
    ],
    notIncluded: [],
  },

  // Content Strategy
  {
    service: "Content Strategy",
    tier: "Basic",
    price: "299",
    description: "Content foundation",
    features: [
      "Content Audit",
      "4 Blog Posts/Month",
      "Content Calendar",
      "Basic SEO Writing",
      "1 Platform Focus",
      "Monthly Review",
    ],
    notIncluded: ["Video Content", "Email Newsletters", "Content Distribution"],
  },
  {
    service: "Content Strategy",
    tier: "Standard",
    price: "599",
    popular: true,
    description: "Strategic content growth",
    features: [
      "Content Strategy Plan",
      "8 Blog Posts/Month",
      "Email Newsletter",
      "SEO Optimized Content",
      "Multi-platform Strategy",
      "Content Repurposing",
      "Bi-weekly Reviews",
      "Performance Tracking",
    ],
    notIncluded: ["Video Production"],
  },
  {
    service: "Content Strategy",
    tier: "Premium",
    price: "1199",
    description: "Complete content ecosystem",
    features: [
      "Full Content Strategy",
      "Unlimited Blog Posts",
      "Video Scripts",
      "Email Sequences",
      "All Platform Content",
      "Content Distribution",
      "Influencer Content",
      "Weekly Reviews",
      "A/B Testing",
      "Content Team Access",
    ],
    notIncluded: [],
  },

  // E-Commerce
  {
    service: "E-Commerce",
    tier: "Basic",
    price: "799",
    description: "Start selling online",
    features: [
      "Up to 50 Products",
      "Payment Gateway",
      "Basic Theme",
      "Mobile Responsive",
      "Order Management",
      "1 Month Support",
    ],
    notIncluded: ["Custom Design", "Inventory System", "Multi-currency"],
  },
  {
    service: "E-Commerce",
    tier: "Standard",
    price: "1499",
    popular: true,
    description: "Professional online store",
    features: [
      "Up to 200 Products",
      "Multiple Payment Options",
      "Custom Theme Design",
      "Inventory Management",
      "Shipping Integration",
      "3 Months Support",
      "SEO Optimization",
      "Analytics Dashboard",
    ],
    notIncluded: ["Multi-currency"],
  },
  {
    service: "E-Commerce",
    tier: "Premium",
    price: "2999",
    description: "Enterprise e-commerce",
    features: [
      "Unlimited Products",
      "All Payment Gateways",
      "Custom Design & Dev",
      "Advanced Inventory",
      "Multi-currency Support",
      "6 Months Support",
      "Full SEO Package",
      "Marketing Automation",
      "CRM Integration",
      "Priority Support",
    ],
    notIncluded: [],
  },
];

const PackageCard = ({ pkg, index, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  const tierColors = {
    Basic: { primary: "#a855f7", secondary: "#7c3aed" },
    Standard: { primary: "#d946ef", secondary: "#a855f7" },
    Premium: { primary: "#a855f7", secondary: "#7c3aed" },
  };

  const colors = tierColors[pkg.tier];

  return (
    <motion.div
      className={`relative rounded-2xl sm:rounded-3xl overflow-hidden h-full ${pkg.popular ? "lg:-mt-4 lg:mb-4" : ""}`}
      style={{
        background: "linear-gradient(160deg, #0d0d12 0%, #08080c 100%)",
        border: `1px solid ${isHovered ? colors.primary + "50" : "rgba(255,255,255,0.05)"}`,
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
    >
      {/* Popular Badge */}
      {pkg.popular && (
        <div
          className="absolute top-0 right-0 px-3 sm:px-4 py-1 sm:py-1.5 text-xs font-semibold text-white rounded-bl-xl"
          style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
        >
          Most Popular
        </div>
      )}

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${colors.primary}15 0%, transparent 60%)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10 p-5 sm:p-6 md:p-8">
        {/* Tier Badge */}
        <div
          className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
          style={{
            background: `${colors.primary}20`,
            color: colors.primary,
            border: `1px solid ${colors.primary}40`,
          }}
        >
          {pkg.tier}
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-baseline gap-1">
            <span className="text-gray-400 text-lg">$</span>
            <span
              className="text-4xl sm:text-5xl font-bold"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {pkg.price}
            </span>
            <span className="text-gray-500 text-sm">/project</span>
          </div>
          <p className="text-gray-400 text-sm mt-2">{pkg.description}</p>
        </div>

        {/* Divider */}
        <div
          className="w-full h-[1px] my-5"
          style={{
            background: `linear-gradient(90deg, transparent, ${colors.primary}30, transparent)`,
          }}
        />

        {/* Features */}
        <ul className="space-y-3 mb-6">
          {pkg.features.map((feature, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-2.5 text-sm text-gray-300"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.05 }}
            >
              <svg
                className="w-4 h-4 mt-0.5 flex-shrink-0"
                style={{ color: colors.primary }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </motion.li>
          ))}
          {pkg.notIncluded.map((feature, i) => (
            <li key={`not-${i}`} className="flex items-start gap-2.5 text-sm text-gray-600">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.button
          onClick={() => onSelect({ service: pkg.service, tier: pkg.tier, price: pkg.price })}
          className="w-full py-3 sm:py-3.5 rounded-xl font-medium text-sm sm:text-base transition-all duration-300"
          style={{
            background: pkg.popular
              ? `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
              : "transparent",
            border: pkg.popular ? "none" : `1px solid ${colors.primary}50`,
            color: pkg.popular ? "#fff" : colors.primary,
            boxShadow: pkg.popular ? `0 0 30px ${colors.primary}30` : "none",
          }}
          whileHover={{
            scale: 1.02,
            boxShadow: `0 0 40px ${colors.primary}40`,
          }}
          whileTap={{ scale: 0.98 }}
        >
          Get Started
        </motion.button>
      </div>

      {/* Bottom Accent Line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary}, transparent)`,
        }}
        initial={{ width: "0%" }}
        animate={{ width: isHovered ? "100%" : "0%" }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

const Packages = ({ onPackageSelect }) => {
  const [activeService, setActiveService] = useState("All");

  const filteredPackages =
    activeService === "All"
      ? packages.filter((_, index) => index % 3 === 1) // Show only "Standard" packages when "All" is selected
      : packages.filter((pkg) => pkg.service === activeService);

  return (
    <section id="packages" className="py-12 sm:py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-[#d946ef]/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] bg-[#06b6d4]/5 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        {/* Section Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-10 sm:mb-14 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block text-[#d946ef] text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase font-medium mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Pricing Plans
          </motion.span>

          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Our{" "}
            <span className="bg-gradient-to-r from-[#d946ef] to-[#06b6d4] bg-clip-text text-transparent">
              Packages
            </span>
          </motion.h2>

          <motion.p
            className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Choose the perfect package for your business needs
          </motion.p>
        </motion.div>

        {/* Service Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14 md:mb-16 px-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {services.map((service) => (
            <motion.button
              key={service}
              onClick={() => setActiveService(service)}
              className="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300"
              style={{
                background:
                  activeService === service
                    ? "linear-gradient(135deg, #d946ef 0%, #a855f7 100%)"
                    : "rgba(255,255,255,0.03)",
                border: `1px solid ${activeService === service ? "transparent" : "rgba(255,255,255,0.1)"}`,
                color: activeService === service ? "#fff" : "#9ca3af",
                boxShadow: activeService === service ? "0 0 20px rgba(217,70,239,0.3)" : "none",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {service}
            </motion.button>
          ))}
        </motion.div>

        {/* Packages Grid */}
        <motion.div
          className={`grid gap-5 sm:gap-6 md:gap-8 max-w-6xl mx-auto ${
            activeService === "All"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1 md:grid-cols-3"
          }`}
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredPackages.map((pkg, index) => (
              <PackageCard key={`${pkg.service}-${pkg.tier}`} pkg={pkg} index={index} onSelect={onPackageSelect} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Custom Package CTA */}
        <motion.div
          className="mt-12 sm:mt-16 md:mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-gray-400 text-sm sm:text-base mb-4">
            Need a custom solution? Let's discuss your requirements.
          </p>
          <motion.button
            onClick={() => onPackageSelect({ service: "Custom Package", tier: "Custom", price: "Custom" })}
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-sm sm:text-base"
            style={{
              background: "transparent",
              border: "1px solid rgba(217,70,239,0.5)",
              color: "#d946ef",
            }}
            whileHover={{
              scale: 1.05,
              background: "linear-gradient(135deg, #d946ef 0%, #a855f7 100%)",
              color: "#fff",
              borderColor: "transparent",
              boxShadow: "0 0 30px rgba(217,70,239,0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Contact for Custom Package
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Packages;
