"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";
import Lenis from "lenis";

// Lazy load heavy components for better performance
const Particles = dynamic(() => import("@/components/Particles"), {
  ssr: false,
  loading: () => null,
});

const Rocket = dynamic(() => import("@/components/Rocket"), {
  ssr: false,
  loading: () => (
    <div className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px] flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-[#d946ef] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

const Portfolio = dynamic(() => import("@/components/Portfolio"), {
  loading: () => (
    <div className="h-96 flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-[#d946ef] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

const Packages = dynamic(() => import("@/components/Packages"), {
  loading: () => (
    <div className="h-96 flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-[#d946ef] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

// Regular imports for lighter components
import SplitText from "@/components/SplitText";
import ServicesGrid from "@/components/ServicesGrid";
import Footer from "@/components/Footer";
import About from "@/components/About";
import TrueFocus from "@/components/TrueFocus";
import ContactModal from "@/components/ContactModal";

const Page = () => {
  // Icon hover states
  const [hoverBulb, setHoverBulb] = useState(false);
  const [hoverVR, setHoverVR] = useState(false);
  const [hoverStone, setHoverStone] = useState(false);

  // Contact modal state
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handlePackageSelect = (packageInfo) => {
    setSelectedPackage(packageInfo);
    setIsContactOpen(true);
  };

  const handleContactOpen = () => {
    setSelectedPackage(null);
    setIsContactOpen(true);
  };

  // Smooth scroll to section
  const scrollToSection = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const fadeRightVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Particles Background */}
      <Particles
        particleCount={20}
        speed={0.05}
        particleColors={["#d946ef", "#a855f7", "#06b6d4"]}
        alphaParticles={true}
        sizeRandomness={1.5}
      />

      {/* Gradient overlay - simplified */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-[#d946ef]/5 rounded-full blur-[60px]" />
        <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] bg-[#06b6d4]/5 rounded-full blur-[60px]" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 min-h-screen">
        {/* Hero Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 min-h-screen flex flex-col lg:flex-row items-center justify-between py-6 sm:py-8">

          {/* Left Side - Tagline */}
          <motion.div
            className="flex-1 flex flex-col justify-center text-center lg:text-left items-center lg:items-start"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p
              variants={fadeUpVariants}
              className="text-gray-400 text-sm sm:text-base md:text-lg mb-3 sm:mb-4 tracking-[0.2em] uppercase"
            >
              Digital Agency
            </motion.p>
            <motion.h1
              variants={fadeUpVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-4 sm:mb-6"
            >
              Let's Build Your
              <br />
              <span className="font-semibold">Digital Legacy.</span>
            </motion.h1>
            <motion.p
              variants={fadeUpVariants}
              className="text-gray-500 max-w-md text-sm sm:text-base md:text-lg"
            >
              Designing meaningful digital experiences that drive real impact.
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={fadeUpVariants} className="mt-6 sm:mt-8">
              <motion.button
                onClick={handleContactOpen}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(217, 70, 239, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#d946ef] to-[#06b6d4] rounded-full text-white font-medium text-sm sm:text-base md:text-lg transition-all duration-300"
              >
                Get Started
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Center - Rocket */}
          <motion.div
            className="flex-1 flex justify-center items-center py-12 lg:py-0"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, type: "spring" }}
          >
            <Rocket />
          </motion.div>

          {/* Right Side - Navigation (Hidden on mobile) */}
          <motion.nav
            className="hidden lg:flex flex-1 flex-col items-end justify-center gap-4 xl:gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
                  { name: "About us", href: "#aboutus" },
                  { name: "Services", href: "#expertise" },
                  { name: "Portfolio", href: "#portfolio" },
                  { name: "Packages", href: "#packages" },
                ].map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  variants={fadeRightVariants}
                  whileHover={{
                    x: -15,
                    transition: { duration: 0.3 },
                  }}
                  className={`text-base lg:text-lg xl:text-xl cursor-pointer transition-all duration-300 relative group ${
                    index === 0 ? "text-white font-medium" : "text-gray-600 hover:text-white"
                  }`}
                >
                  {item.name}.
                  <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#d946ef] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              )
            )}
          </motion.nav>
        </div>

        {/* Large Logo Section - Matching Brand Logo with TrueFocus */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 pb-8 sm:pb-12 lg:pb-16 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <TrueFocus
              sentence="Apex Technify"
              manualMode={false}
              blurAmount={5}
              borderColor="#d946ef"
              glowColor="rgba(217, 70, 239, 0.6)"
              animationDuration={0.6}
              pauseBetweenAnimations={2.5}
              textClassName="text-[26px] sm:text-[30px] md:text-[60px] lg:text-[100px] xl:text-[140px] font-bold tracking-tight"
              containerClassName="gap-2 sm:gap-3 md:gap-4"
            />
          </motion.div>
        </div>

        {/* Services Section - Premium Dark Card */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-12 sm:py-16 md:py-24">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="text-[#d946ef] text-sm md:text-base tracking-[0.3em] uppercase font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Our Process
            </motion.span>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              How We <span className="bg-gradient-to-r from-[#d946ef] to-[#06b6d4] bg-clip-text text-transparent">Create</span>
            </motion.h2>
          </motion.div>

          <motion.div
            className="relative max-w-5xl mx-auto rounded-[30px] md:rounded-[50px] overflow-hidden"
            style={{
              background: "linear-gradient(160deg, #0d0d12 0%, #0a0a0f 50%, #08080c 100%)",
              boxShadow: "0 50px 100px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.5)",
            }}
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Subtle texture overlay - optimized */}
            <div
              className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"
            />

            {/* Gradient overlays for depth */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#d946ef]/8 to-transparent" />
              <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#06b6d4]/5 to-transparent" />
            </div>

            {/* Corner accents */}
            <div className="absolute top-6 right-6 w-20 h-20 border-t-2 border-r-2 border-[#d946ef]/20 rounded-tr-3xl" />
            <div className="absolute bottom-6 left-6 w-20 h-20 border-b-2 border-l-2 border-[#06b6d4]/20 rounded-bl-3xl" />

            <div className="relative z-10 p-8 md:p-12 lg:p-16">
              {/* Define - Step 01 */}
              <motion.div
                className="flex flex-col md:flex-row justify-end items-center gap-6 md:gap-10 py-10 md:py-14"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                {/* Step Number */}
                <motion.span
                  className="hidden md:block text-[80px] lg:text-[100px] font-bold text-transparent absolute left-8 lg:left-12"
                  style={{
                    WebkitTextStroke: "1px rgba(217,70,239,0.15)",
                  }}
                >
                  01
                </motion.span>
                <div className="flex items-center gap-6 md:gap-8">
                  <div className="text-right max-w-[300px] md:max-w-sm">
                    <span className="text-[#d946ef] text-xs tracking-[0.2em] uppercase mb-2 block">Step 01</span>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
                      Define<span className="text-[#d946ef]">.</span>
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                      Our approach involves blending raw ideas and specific requirements into a comprehensive strategic vision, transforming mere concepts into solid foundations through concrete, actionable steps.
                    </p>
                  </div>
                  <motion.div
                    className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 flex-shrink-0 cursor-pointer"
                    whileHover={{ scale: 1.1, rotateY: 15 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    style={{ perspective: "500px", willChange: "transform" }}
                    onMouseEnter={() => setHoverBulb(true)}
                    onMouseLeave={() => setHoverBulb(false)}
                  >
                    <svg viewBox="0 0 100 130" fill="none" className={`w-full h-full transition-all duration-300 ${hoverBulb ? "drop-shadow-[0_0_25px_#d946ef]" : ""}`}>
                      {/* Shadow */}
                      <ellipse cx="50" cy="125" rx="22" ry="4" fill="#000" opacity="0.5" />

                      {/* Glass bulb - outer */}
                      <path d="M50 5C28 5 18 22 18 42c0 14 7 24 12 32 4 6 8 12 8 20v4h24v-4c0-8 4-14 8-20 5-8 12-18 12-32 0-20-12-37-32-37z"
                        fill={hoverBulb ? "url(#bulbGlassPink)" : "url(#bulbGlassGray)"}
                        className="transition-all duration-500" />

                      {/* Glass highlight - left */}
                      <path d="M24 42c0-16 10-30 26-32-18 2-28 16-28 32 0 12 6 20 10 28 2 3 4 7 5 10h6c-1-4-3-8-6-12-5-8-13-16-13-26z"
                        fill="rgba(255,255,255,0.2)" />

                      {/* Glass highlight - top reflection */}
                      <ellipse cx="38" cy="25" rx="8" ry="12" fill="rgba(255,255,255,0.15)" />
                      <ellipse cx="36" cy="22" rx="4" ry="6" fill="rgba(255,255,255,0.25)" />

                      {/* Filament */}
                      <path d="M42 50 Q45 60 50 55 Q55 50 50 45 Q45 40 50 35 Q55 30 58 40"
                        stroke={hoverBulb ? "#fbbf24" : "#666"}
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        className="transition-all duration-500" />
                      <path d="M42 50 L42 70 M58 40 L58 70"
                        stroke={hoverBulb ? "#a855f7" : "#555"}
                        strokeWidth="2"
                        className="transition-all duration-500" />

                      {/* Inner glow when hovered */}
                      {hoverBulb && (
                        <ellipse cx="50" cy="45" rx="15" ry="20" fill="url(#bulbInnerGlow)" opacity="0.6" />
                      )}

                      {/* Base - connector */}
                      <rect x="38" y="98" width="24" height="8" rx="2" fill={hoverBulb ? "#7c3aed" : "#3d3d3d"} className="transition-all duration-500" />
                      <rect x="36" y="98" width="28" height="3" rx="1" fill={hoverBulb ? "#9333ea" : "#4a4a4a"} className="transition-all duration-500" />

                      {/* Screw base - threads */}
                      <rect x="36" y="106" width="28" height="5" rx="1" fill={hoverBulb ? "#a855f7" : "#4a4a4a"} className="transition-all duration-500" />
                      <rect x="38" y="108" width="24" height="2" fill={hoverBulb ? "#7c3aed" : "#3a3a3a"} className="transition-all duration-500" />

                      <rect x="37" y="111" width="26" height="4" rx="1" fill={hoverBulb ? "#9333ea" : "#3d3d3d"} className="transition-all duration-500" />
                      <rect x="39" y="112" width="22" height="2" fill={hoverBulb ? "#7c3aed" : "#333"} className="transition-all duration-500" />

                      <rect x="39" y="115" width="22" height="4" rx="1" fill={hoverBulb ? "#7c3aed" : "#353535"} className="transition-all duration-500" />
                      <rect x="41" y="116" width="18" height="2" fill={hoverBulb ? "#6d28d9" : "#2a2a2a"} className="transition-all duration-500" />

                      {/* Bottom tip */}
                      <ellipse cx="50" cy="120" rx="8" ry="2" fill={hoverBulb ? "#6d28d9" : "#2a2a2a"} className="transition-all duration-500" />

                      <defs>
                        <linearGradient id="bulbGlassGray" x1="18" y1="5" x2="82" y2="98">
                          <stop stopColor="#5a5a5a" />
                          <stop offset="0.3" stopColor="#4a4a4a" />
                          <stop offset="0.7" stopColor="#3a3a3a" />
                          <stop offset="1" stopColor="#2d2d2d" />
                        </linearGradient>
                        <linearGradient id="bulbGlassPink" x1="18" y1="5" x2="82" y2="98">
                          <stop stopColor="#f0abfc" />
                          <stop offset="0.3" stopColor="#e879f9" />
                          <stop offset="0.6" stopColor="#d946ef" />
                          <stop offset="1" stopColor="#a855f7" />
                        </linearGradient>
                        <radialGradient id="bulbInnerGlow" cx="50%" cy="40%" r="50%">
                          <stop stopColor="#fef08a" />
                          <stop offset="0.5" stopColor="#fbbf24" />
                          <stop offset="1" stopColor="transparent" />
                        </radialGradient>
                      </defs>
                    </svg>
                  </motion.div>
                </div>
              </motion.div>

              {/* Divider Line 1 */}
              <motion.div
                className="relative w-full h-[1px] my-4"
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d946ef]/30 to-transparent" />
                <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 rounded-full bg-[#d946ef]" style={{ boxShadow: "0 0 10px #d946ef" }} />
              </motion.div>

              {/* Create - Step 02 */}
              <motion.div
                className="flex flex-col md:flex-row justify-start items-center gap-6 md:gap-10 py-10 md:py-14"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                {/* Step Number */}
                <motion.span
                  className="hidden md:block text-[80px] lg:text-[100px] font-bold text-transparent absolute right-8 lg:right-12"
                  style={{
                    WebkitTextStroke: "1px rgba(6,182,212,0.15)",
                  }}
                >
                  02
                </motion.span>
                <div className="flex items-center gap-6 md:gap-8">
                  <motion.div
                    className="w-24 h-20 md:w-32 md:h-28 lg:w-36 lg:h-32 flex-shrink-0 cursor-pointer"
                    whileHover={{ scale: 1.1, rotateX: -10 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    style={{ perspective: "500px", willChange: "transform" }}
                    onMouseEnter={() => setHoverVR(true)}
                    onMouseLeave={() => setHoverVR(false)}
                  >
                    <svg viewBox="0 0 120 100" fill="none" className={`w-full h-full transition-all duration-300 ${hoverVR ? "drop-shadow-[0_0_25px_#06b6d4]" : ""}`}>
                      {/* Shadow */}
                      <ellipse cx="60" cy="96" rx="40" ry="4" fill="#000" opacity="0.4" />

                      {/* Monitor Stand Base */}
                      <ellipse cx="60" cy="90" rx="25" ry="5" fill={hoverVR ? "#164e63" : "#2a2a2a"} className="transition-all duration-500" />
                      <ellipse cx="60" cy="89" rx="22" ry="4" fill={hoverVR ? "#0891b2" : "#3a3a3a"} className="transition-all duration-500" />

                      {/* Monitor Stand Neck */}
                      <rect x="55" y="72" width="10" height="18" rx="2" fill={hoverVR ? "#0e7490" : "#333"} className="transition-all duration-500" />
                      <rect x="56" y="72" width="3" height="18" fill={hoverVR ? "#22d3ee" : "#444"} opacity="0.3" className="transition-all duration-500" />

                      {/* Monitor Body */}
                      <rect x="8" y="8" width="104" height="66" rx="6" fill={hoverVR ? "#155e75" : "#1a1a1a"} className="transition-all duration-500" />
                      <rect x="10" y="10" width="100" height="58" rx="4" fill={hoverVR ? "#0c4a5e" : "#0d0d0d"} className="transition-all duration-500" />

                      {/* Screen */}
                      <rect x="14" y="14" width="92" height="50" rx="2" fill={hoverVR ? "url(#screenGradCyan)" : "url(#screenGradGray)"} className="transition-all duration-500" />

                      {/* Screen Content - Code/Design */}
                      <rect x="18" y="20" width="35" height="3" rx="1" fill={hoverVR ? "#22d3ee" : "#444"} className="transition-all duration-500" />
                      <rect x="18" y="26" width="28" height="3" rx="1" fill={hoverVR ? "#a855f7" : "#3a3a3a"} className="transition-all duration-500" />
                      <rect x="18" y="32" width="40" height="3" rx="1" fill={hoverVR ? "#f0abfc" : "#333"} className="transition-all duration-500" />
                      <rect x="18" y="38" width="20" height="3" rx="1" fill={hoverVR ? "#06b6d4" : "#3d3d3d"} className="transition-all duration-500" />
                      <rect x="18" y="44" width="32" height="3" rx="1" fill={hoverVR ? "#d946ef" : "#383838"} className="transition-all duration-500" />
                      <rect x="18" y="50" width="25" height="3" rx="1" fill={hoverVR ? "#67e8f9" : "#404040"} className="transition-all duration-500" />

                      {/* Design Preview Box */}
                      <rect x="62" y="20" width="40" height="36" rx="3" fill={hoverVR ? "#0e7490" : "#252525"} className="transition-all duration-500" />
                      <rect x="65" y="23" width="34" height="30" rx="2" fill={hoverVR ? "url(#designPreview)" : "#1a1a1a"} className="transition-all duration-500" />

                      {/* Design elements in preview */}
                      <circle cx="75" cy="33" r="6" fill={hoverVR ? "#d946ef" : "#333"} className="transition-all duration-500" />
                      <rect x="84" y="30" width="12" height="6" rx="1" fill={hoverVR ? "#06b6d4" : "#3a3a3a"} className="transition-all duration-500" />
                      <path d="M68 45 L82 38 L96 48 L68 48 Z" fill={hoverVR ? "#a855f7" : "#2d2d2d"} className="transition-all duration-500" />

                      {/* Cursor */}
                      {hoverVR && (
                        <path d="M88 42 L88 52 L91 49 L94 54 L96 53 L93 48 L97 48 Z" fill="#fff" />
                      )}

                      {/* Monitor chin/bezel bottom */}
                      <rect x="45" y="66" width="30" height="4" rx="2" fill={hoverVR ? "#0891b2" : "#2a2a2a"} className="transition-all duration-500" />
                      <circle cx="60" cy="68" r="1.5" fill={hoverVR ? "#22d3ee" : "#444"} className="transition-all duration-500" />

                      {/* Screen reflection */}
                      <path d="M14 14 L106 14 L106 24 Q60 30 14 24 Z" fill="rgba(255,255,255,0.05)" />

                      <defs>
                        <linearGradient id="screenGradGray" x1="14" y1="14" x2="106" y2="64">
                          <stop stopColor="#1a1a1a" />
                          <stop offset="1" stopColor="#0f0f0f" />
                        </linearGradient>
                        <linearGradient id="screenGradCyan" x1="14" y1="14" x2="106" y2="64">
                          <stop stopColor="#083344" />
                          <stop offset="1" stopColor="#042f2e" />
                        </linearGradient>
                        <linearGradient id="designPreview" x1="65" y1="23" x2="99" y2="53">
                          <stop stopColor="#0c4a5e" />
                          <stop offset="1" stopColor="#134e4a" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </motion.div>
                  <div className="text-left max-w-[300px] md:max-w-sm">
                    <span className="text-[#06b6d4] text-xs tracking-[0.2em] uppercase mb-2 block">Step 02</span>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
                      Create<span className="text-[#06b6d4]">.</span>
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                      With your confidence in this foundation, our creative professionals craft your visions into reality, amplifying your brand's unique identity.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Divider Line 2 */}
              <motion.div
                className="relative w-full h-[1px] my-4"
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#06b6d4]/30 to-transparent" />
                <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 rounded-full bg-[#06b6d4]" style={{ boxShadow: "0 0 10px #06b6d4" }} />
              </motion.div>

              {/* Deliver - Step 03 */}
              <motion.div
                className="flex flex-col md:flex-row justify-end items-center gap-6 md:gap-10 py-10 md:py-14"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.7 }}
              >
                {/* Step Number */}
                <motion.span
                  className="hidden md:block text-[80px] lg:text-[100px] font-bold text-transparent absolute left-8 lg:left-12"
                  style={{
                    WebkitTextStroke: "1px rgba(168,85,247,0.15)",
                  }}
                >
                  03
                </motion.span>
                <div className="flex items-center gap-6 md:gap-8">
                  <div className="text-right max-w-[300px] md:max-w-sm">
                    <span className="text-[#a855f7] text-xs tracking-[0.2em] uppercase mb-2 block">Step 03</span>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
                      Deliver<span className="text-[#a855f7]">.</span>
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                      From initial concept to comprehensive strategy and creative execution, your vision is actualized into a tangible, high-impact reality.
                    </p>
                  </div>
                  <motion.div
                    className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 flex-shrink-0 cursor-pointer"
                    whileHover={{ scale: 1.1, rotateY: -15 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    style={{ perspective: "500px", willChange: "transform" }}
                    onMouseEnter={() => setHoverStone(true)}
                    onMouseLeave={() => setHoverStone(false)}
                  >
                    <svg viewBox="0 0 100 120" fill="none" className={`w-full h-full transition-all duration-300 ${hoverStone ? "drop-shadow-[0_0_25px_#a855f7]" : ""}`}>
                      {/* Launch pad shadow */}
                      <ellipse cx="50" cy="115" rx="30" ry="4" fill="#000" opacity="0.5" />

                      {/* Smoke/Exhaust clouds */}
                      {hoverStone && (
                        <>
                          <ellipse cx="35" cy="108" rx="12" ry="6" fill="#9333ea" opacity="0.3" />
                          <ellipse cx="65" cy="110" rx="14" ry="5" fill="#7c3aed" opacity="0.25" />
                          <ellipse cx="50" cy="105" rx="18" ry="8" fill="#a855f7" opacity="0.35" />
                        </>
                      )}

                      {/* Exhaust flames */}
                      <path d="M42 85 Q50 110 50 95 Q50 110 58 85"
                        fill={hoverStone ? "url(#flameGrad)" : "#444"}
                        className="transition-all duration-500" />
                      <path d="M44 85 Q50 100 50 92 Q50 100 56 85"
                        fill={hoverStone ? "#fbbf24" : "#555"}
                        className="transition-all duration-500" />
                      {hoverStone && (
                        <path d="M46 85 Q50 95 50 90 Q50 95 54 85" fill="#fef08a" />
                      )}

                      {/* Rocket body main */}
                      <path d="M50 5 C50 5 70 25 70 55 L70 75 Q70 82 50 85 Q30 82 30 75 L30 55 C30 25 50 5 50 5Z"
                        fill={hoverStone ? "url(#rocketBodyPurple)" : "url(#rocketBodyGray)"}
                        className="transition-all duration-500" />

                      {/* Rocket body highlight */}
                      <path d="M50 8 C42 18 35 35 35 55 L35 72 Q34 78 32 80 L30 75 L30 55 C30 25 50 5 50 5Z"
                        fill="rgba(255,255,255,0.15)" />

                      {/* Nose cone */}
                      <path d="M50 5 C52 15 56 25 58 35 L50 38 L42 35 C44 25 48 15 50 5Z"
                        fill={hoverStone ? "#c084fc" : "#4a4a4a"}
                        className="transition-all duration-500" />
                      <ellipse cx="47" cy="18" rx="3" ry="8" fill="rgba(255,255,255,0.2)" />

                      {/* Window */}
                      <circle cx="50" cy="50" r="12" fill={hoverStone ? "#1e1b4b" : "#1a1a1a"} className="transition-all duration-500" />
                      <circle cx="50" cy="50" r="10" fill={hoverStone ? "#312e81" : "#0f0f0f"} className="transition-all duration-500" />
                      <circle cx="50" cy="50" r="8" fill={hoverStone ? "url(#windowGradPurple)" : "#0a0a0a"} className="transition-all duration-500" />
                      <ellipse cx="47" cy="47" rx="4" ry="3" fill="rgba(255,255,255,0.15)" />
                      <circle cx="46" cy="46" r="2" fill="rgba(255,255,255,0.25)" />

                      {/* Window ring */}
                      <circle cx="50" cy="50" r="11" stroke={hoverStone ? "#a855f7" : "#333"} strokeWidth="2" fill="none" className="transition-all duration-500" />

                      {/* Body stripes */}
                      <rect x="32" y="65" width="36" height="3" rx="1" fill={hoverStone ? "#06b6d4" : "#3a3a3a"} className="transition-all duration-500" />
                      <rect x="34" y="70" width="32" height="2" rx="1" fill={hoverStone ? "#d946ef" : "#333"} className="transition-all duration-500" />

                      {/* Left fin */}
                      <path d="M30 60 C20 70 12 85 10 95 L22 95 Q28 80 30 70Z"
                        fill={hoverStone ? "url(#finGradPurple)" : "url(#finGradGray)"}
                        className="transition-all duration-500" />
                      <path d="M30 60 C25 65 20 75 18 82 L22 82 Q26 72 30 65Z"
                        fill="rgba(255,255,255,0.1)" />

                      {/* Right fin */}
                      <path d="M70 60 C80 70 88 85 90 95 L78 95 Q72 80 70 70Z"
                        fill={hoverStone ? "url(#finGradPurple)" : "url(#finGradGray)"}
                        className="transition-all duration-500" />

                      {/* Bottom fin */}
                      <path d="M42 80 L50 100 L58 80 Q54 84 50 84 Q46 84 42 80Z"
                        fill={hoverStone ? "#7c3aed" : "#3a3a3a"}
                        className="transition-all duration-500" />

                      {/* Engine nozzle */}
                      <ellipse cx="50" cy="84" rx="10" ry="4" fill={hoverStone ? "#1e1b4b" : "#1a1a1a"} className="transition-all duration-500" />
                      <ellipse cx="50" cy="84" rx="7" ry="2.5" fill={hoverStone ? "#0f0a1a" : "#0a0a0a"} className="transition-all duration-500" />

                      {/* Stars around rocket when hovered */}
                      {hoverStone && (
                        <>
                          <circle cx="15" cy="25" r="1.5" fill="#f0abfc" />
                          <circle cx="85" cy="30" r="1" fill="#c4b5fd" />
                          <circle cx="20" cy="45" r="1" fill="#a855f7" />
                          <circle cx="80" cy="55" r="1.5" fill="#e879f9" />
                          <circle cx="12" cy="70" r="1" fill="#d946ef" />
                          <circle cx="88" cy="75" r="1" fill="#c084fc" />
                        </>
                      )}

                      <defs>
                        <linearGradient id="rocketBodyGray" x1="30" y1="5" x2="70" y2="85">
                          <stop stopColor="#4a4a4a" />
                          <stop offset="0.3" stopColor="#3d3d3d" />
                          <stop offset="0.7" stopColor="#333" />
                          <stop offset="1" stopColor="#2a2a2a" />
                        </linearGradient>
                        <linearGradient id="rocketBodyPurple" x1="30" y1="5" x2="70" y2="85">
                          <stop stopColor="#e879f9" />
                          <stop offset="0.3" stopColor="#d946ef" />
                          <stop offset="0.6" stopColor="#a855f7" />
                          <stop offset="1" stopColor="#7c3aed" />
                        </linearGradient>
                        <linearGradient id="finGradGray" x1="10" y1="60" x2="30" y2="95">
                          <stop stopColor="#3d3d3d" />
                          <stop offset="1" stopColor="#2a2a2a" />
                        </linearGradient>
                        <linearGradient id="finGradPurple" x1="10" y1="60" x2="30" y2="95">
                          <stop stopColor="#c084fc" />
                          <stop offset="1" stopColor="#7c3aed" />
                        </linearGradient>
                        <radialGradient id="windowGradPurple" cx="40%" cy="40%">
                          <stop stopColor="#4c1d95" />
                          <stop offset="1" stopColor="#0f0a1a" />
                        </radialGradient>
                        <linearGradient id="flameGrad" x1="50" y1="85" x2="50" y2="110">
                          <stop stopColor="#f97316" />
                          <stop offset="0.5" stopColor="#dc2626" />
                          <stop offset="1" stopColor="#7c3aed" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Animated border */}
            <div
              className="absolute inset-0 rounded-[30px] md:rounded-[50px] pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(217,70,239,0.1), transparent)",
                padding: "1px",
              }}
            />

            {/* Subtle inner glow */}
            <div
              className="absolute inset-0 rounded-[30px] md:rounded-[50px] pointer-events-none"
              style={{
                boxShadow: "inset 0 0 100px rgba(217,70,239,0.03), inset 0 0 40px rgba(6,182,212,0.02)",
              }}
            />
          </motion.div>
        </div>

        {/* About Section */}
        <About />

        {/* Services Grid Section */}
        <ServicesGrid />

        {/* Portfolio Section */}
        <Portfolio />

        {/* Packages Section */}
        <Packages onPackageSelect={handlePackageSelect} />

        {/* Footer */}
        <Footer onContactClick={handleContactOpen} />
      </main>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        selectedPackage={selectedPackage}
      />
    </div>
  );
};

export default Page;
