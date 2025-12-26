"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Lenis from "lenis";
import Particles from "@/components/Particles";
import Rocket from "@/components/Rocket";
import SplitText from "@/components/SplitText";
import ServicesGrid from "@/components/ServicesGrid";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";
import About from "@/components/About";
import TrueFocus from "@/components/TrueFocus";
import Packages from "@/components/Packages";
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
            <motion.h2
              variants={fadeUpVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-4 sm:mb-6"
            >
              Let's break
              <br />
              <span className="font-semibold">boundaries together.</span>
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="text-gray-500 max-w-md text-sm sm:text-base md:text-lg"
            >
              We craft digital experiences that push the limits of innovation and creativity.
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
            {/* Noise texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.02] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
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
              {/* Conception - Step 01 */}
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
                      Conception<span className="text-[#d946ef]">.</span>
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                      Aligning our services with our clients' requirements, we fuse the breath of life into mere ideas and turn them into robust new concepts.
                    </p>
                  </div>
                  <motion.div
                    className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 flex-shrink-0 cursor-pointer"
                    whileHover={{ scale: 1.1, rotateY: 15 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    style={{ perspective: "500px" }}
                    onMouseEnter={() => setHoverBulb(true)}
                    onMouseLeave={() => setHoverBulb(false)}
                  >
                    <svg viewBox="0 0 100 120" fill="none" className="w-full h-full transition-all duration-500" style={{ filter: hoverBulb ? "drop-shadow(0 0 30px #d946ef) drop-shadow(0 0 60px #d946ef)" : "drop-shadow(0 20px 40px rgba(0,0,0,0.6))" }}>
                      <ellipse cx="50" cy="110" rx="20" ry="5" fill="#000" opacity="0.4" />
                      <path d="M50 8C32 8 22 22 22 40c0 12 6 20 10 26 4 5 6 10 6 16h24c0-6 2-11 6-16 4-6 10-14 10-26 0-18-12-32-28-32z" fill={hoverBulb ? "url(#bulbPink)" : "url(#bulbMetal)"} className="transition-all duration-500" />
                      <path d="M50 8C40 8 32 14 28 24c12-6 28-6 40 4 3 3 5 7 6 12 0-14-8-28-24-32z" fill="rgba(255,255,255,0.15)" />
                      <path d="M22 40c0-18 12-32 28-32" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
                      <rect x="38" y="90" width="24" height="6" rx="2" fill={hoverBulb ? "#a855f7" : "#4a4a4a"} className="transition-all duration-500" />
                      <rect x="40" y="98" width="20" height="5" rx="2" fill={hoverBulb ? "#9333ea" : "#3a3a3a"} className="transition-all duration-500" />
                      <rect x="42" y="105" width="16" height="4" rx="2" fill={hoverBulb ? "#7c3aed" : "#2a2a2a"} className="transition-all duration-500" />
                      <ellipse cx="42" cy="45" rx="8" ry="10" fill={hoverBulb ? "rgba(217,70,239,0.3)" : "rgba(255,255,255,0.06)"} className="transition-all duration-500" />
                      <defs>
                        <linearGradient id="bulbMetal" x1="22" y1="8" x2="78" y2="90">
                          <stop stopColor="#5a5a5a" />
                          <stop offset="0.3" stopColor="#4a4a4a" />
                          <stop offset="0.6" stopColor="#3a3a3a" />
                          <stop offset="1" stopColor="#2a2a2a" />
                        </linearGradient>
                        <linearGradient id="bulbPink" x1="22" y1="8" x2="78" y2="90">
                          <stop stopColor="#d946ef" />
                          <stop offset="0.3" stopColor="#c026d3" />
                          <stop offset="0.6" stopColor="#a855f7" />
                          <stop offset="1" stopColor="#9333ea" />
                        </linearGradient>
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

              {/* Visualization - Step 02 */}
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
                    className="w-24 h-14 md:w-32 md:h-20 lg:w-36 lg:h-24 flex-shrink-0 cursor-pointer"
                    whileHover={{ scale: 1.1, rotateX: -10 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    style={{ perspective: "500px" }}
                    onMouseEnter={() => setHoverVR(true)}
                    onMouseLeave={() => setHoverVR(false)}
                  >
                    <svg viewBox="0 0 140 70" fill="none" className="w-full h-full transition-all duration-500" style={{ filter: hoverVR ? "drop-shadow(0 0 30px #d946ef) drop-shadow(0 0 60px #d946ef)" : "drop-shadow(0 15px 30px rgba(0,0,0,0.6))" }}>
                      <ellipse cx="70" cy="65" rx="35" ry="4" fill="#000" opacity="0.3" />
                      <rect x="8" y="18" width="48" height="30" rx="8" fill={hoverVR ? "#581c87" : "#1a1a1a"} className="transition-all duration-500" />
                      <rect x="84" y="18" width="48" height="30" rx="8" fill={hoverVR ? "#581c87" : "#1a1a1a"} className="transition-all duration-500" />
                      <rect x="52" y="28" width="36" height="10" rx="5" fill={hoverVR ? "#7c3aed" : "#252525"} className="transition-all duration-500" />
                      <rect x="14" y="26" width="36" height="14" rx="3" fill={hoverVR ? "#e879f9" : "#d946ef"} className="transition-all duration-500" />
                      <rect x="90" y="26" width="36" height="14" rx="3" fill={hoverVR ? "#e879f9" : "#d946ef"} className="transition-all duration-500" />
                      <rect x="14" y="26" width="36" height="5" rx="2" fill="rgba(255,255,255,0.35)" />
                      <rect x="90" y="26" width="36" height="5" rx="2" fill="rgba(255,255,255,0.35)" />
                      <rect x="8" y="18" width="48" height="8" rx="8" fill={hoverVR ? "rgba(217,70,239,0.2)" : "rgba(255,255,255,0.05)"} className="transition-all duration-500" />
                      <rect x="84" y="18" width="48" height="8" rx="8" fill={hoverVR ? "rgba(217,70,239,0.2)" : "rgba(255,255,255,0.05)"} className="transition-all duration-500" />
                    </svg>
                  </motion.div>
                  <div className="text-left max-w-[300px] md:max-w-sm">
                    <span className="text-[#06b6d4] text-xs tracking-[0.2em] uppercase mb-2 block">Step 02</span>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
                      Visualization<span className="text-[#06b6d4]">.</span>
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                      Your trust with the concepts enables our expert to visualize the emotion and make it more natural for human minds to comprehend.
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

              {/* Completion - Step 03 */}
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
                      Completion<span className="text-[#a855f7]">.</span>
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                      After the formative process, what once was merely early-on scribbled visions, are now a reality.
                    </p>
                  </div>
                  <motion.div
                    className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 flex-shrink-0 cursor-pointer"
                    whileHover={{ scale: 1.1, rotateY: -15 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    style={{ perspective: "500px" }}
                    onMouseEnter={() => setHoverStone(true)}
                    onMouseLeave={() => setHoverStone(false)}
                  >
                    <svg viewBox="0 0 100 110" fill="none" className="w-full h-full transition-all duration-500" style={{ filter: hoverStone ? "drop-shadow(0 0 30px #a855f7) drop-shadow(0 0 60px #a855f7)" : "drop-shadow(0 20px 40px rgba(0,0,0,0.6))" }}>
                      <ellipse cx="50" cy="105" rx="25" ry="5" fill="#000" opacity="0.4" />
                      <path d="M12 35L50 15L88 35V75L50 95L12 75V35Z" fill={hoverStone ? "url(#stonePink)" : "url(#stoneGrad2)"} className="transition-all duration-500" />
                      <path d="M12 35L50 15L88 35L50 55L12 35Z" fill={hoverStone ? "rgba(168,85,247,0.2)" : "rgba(255,255,255,0.06)"} className="transition-all duration-500" />
                      <path d="M50 55L50 95" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
                      <path d="M12 35L50 55L88 35" stroke={hoverStone ? "rgba(168,85,247,0.2)" : "rgba(255,255,255,0.05)"} strokeWidth="1" fill="none" className="transition-all duration-500" />
                      <path d="M30 55L44 69L70 43" stroke={hoverStone ? "#e879f9" : "url(#checkGradLine)"} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-500" />
                      <path d="M30 55L44 69L70 43" stroke="rgba(255,255,255,0.5)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "blur(10px)" }} />
                      <defs>
                        <linearGradient id="stoneGrad2" x1="12" y1="15" x2="88" y2="95">
                          <stop stopColor="#4a4a32" />
                          <stop offset="0.5" stopColor="#3a3a22" />
                          <stop offset="1" stopColor="#2a2a12" />
                        </linearGradient>
                        <linearGradient id="stonePink" x1="12" y1="15" x2="88" y2="95">
                          <stop stopColor="#9333ea" />
                          <stop offset="0.5" stopColor="#7c3aed" />
                          <stop offset="1" stopColor="#581c87" />
                        </linearGradient>
                        <linearGradient id="checkGradLine" x1="30" y1="55" x2="70" y2="43">
                          <stop stopColor="#d946ef" />
                          <stop offset="1" stopColor="#a855f7" />
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
