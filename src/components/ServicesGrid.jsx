"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useState, useRef } from "react";

const themeColor = "#d946ef";

const services = [
  {
    id: 1,
    title: "Web Development",
    description: "Custom websites and web applications built with cutting-edge technologies for optimal performance.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications that deliver seamless user experiences.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="12" y1="18" x2="12" y2="18.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces designed to engage users and enhance brand identity.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 2V4M12 20V22M2 12H4M20 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 4,
    title: "Digital Marketing",
    description: "Data-driven marketing strategies to grow your online presence and reach target audiences.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M21 21H4.6C4.03995 21 3.75992 21 3.54601 20.891C3.35785 20.7951 3.20487 20.6422 3.10899 20.454C3 20.2401 3 19.9601 3 19.4V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 14L11 10L15 14L21 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 8V12M21 8H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 5,
    title: "Brand Identity",
    description: "Comprehensive branding solutions from logo design to complete visual identity systems.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 6,
    title: "SEO Optimization",
    description: "Strategic SEO services to improve search rankings and drive organic traffic to your site.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M11 8V14M8 11H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 7,
    title: "E-Commerce",
    description: "Powerful online stores with secure payments, inventory management, and seamless checkout.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 6H21" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 8,
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and deployment services for modern applications.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M18 10H16.74C16.3659 8.55179 15.5928 7.23838 14.5086 6.20794C13.4245 5.17751 12.0727 4.47314 10.6069 4.17428C9.14114 3.87542 7.62082 3.99423 6.21982 4.51714C4.81882 5.04005 3.59366 5.94616 2.68474 7.13091C1.77583 8.31567 1.21918 9.7318 1.07689 11.2166C0.934604 12.7014 1.21227 14.1962 1.87887 15.536C2.54546 16.8758 3.57461 18.0086 4.85017 18.8059C6.12572 19.6033 7.59713 20.0346 9.1 20.05H18C19.3261 20.05 20.5979 19.5232 21.5355 18.5855C22.4732 17.6479 23 16.3761 23 15.05C23 13.7239 22.4732 12.4521 21.5355 11.5145C20.5979 10.5768 19.3261 10.05 18 10.05V10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative h-full p-6 md:p-8 rounded-2xl cursor-pointer overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #0d0d12 0%, #0a0a0f 100%)",
          border: `1px solid ${isHovered ? themeColor + "40" : "rgba(255,255,255,0.05)"}`,
        }}
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Background glow on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${themeColor}20 0%, transparent 70%)`,
          }}
        />

        {/* Corner accent */}
        <div
          className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, transparent 50%, ${themeColor}15 100%)`,
          }}
        />

        {/* Icon */}
        <motion.div
          className="relative w-12 h-12 md:w-14 md:h-14 mb-5"
          style={{ color: isHovered ? themeColor : "#6b7280" }}
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 5 : 0,
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {service.icon}
          {/* Icon glow */}
          <motion.div
            className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"
            style={{ backgroundColor: themeColor }}
          />
        </motion.div>

        {/* Title */}
        <h3 className="text-lg md:text-xl font-semibold text-white mb-3 tracking-tight">
          {service.title}
          <motion.span
            className="inline-block ml-1"
            style={{ color: themeColor }}
            animate={{ opacity: isHovered ? 1 : 0.5 }}
          >
            .
          </motion.span>
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed">
          {service.description}
        </p>

        {/* Bottom line accent */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, ${themeColor}, transparent)`,
          }}
          initial={{ width: "0%" }}
          animate={{ width: isHovered ? "100%" : "0%" }}
          transition={{ duration: 0.3 }}
        />

        {/* Arrow icon */}
        <motion.div
          className="absolute bottom-6 right-6 md:bottom-8 md:right-8"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
          transition={{ duration: 0.2 }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            style={{ color: themeColor }}
          >
            <path
              d="M7 17L17 7M17 7H7M17 7V17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ServicesGrid = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="expertise" ref={containerRef} className="py-12 sm:py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Parallax background elements */}
      <motion.div
        className="absolute top-20 -left-20 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-[#d946ef]/5 rounded-full blur-[150px] pointer-events-none"
        style={{ y }}
      />
      <motion.div
        className="absolute bottom-20 -right-20 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-[#06b6d4]/5 rounded-full blur-[150px] pointer-events-none"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10 sm:mb-14 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="text-[#d946ef] text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] uppercase font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            What We Offer
          </motion.span>
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 sm:mt-4 mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Our{" "}
            <span className="bg-gradient-to-r from-[#d946ef] via-[#a855f7] to-[#06b6d4] bg-clip-text text-transparent">
              Services
            </span>
          </motion.h2>
          <motion.p
            className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            We provide comprehensive digital solutions to help your business thrive in the modern landscape.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            className="px-8 py-4 rounded-full font-medium text-white relative overflow-hidden group"
            style={{
              background: "linear-gradient(135deg, #d946ef 0%, #a855f7 50%, #06b6d4 100%)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Explore All Services</span>
            <motion.div
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;
