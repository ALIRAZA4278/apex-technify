"use client";
import { motion } from "motion/react";
import { useState } from "react";

const stats = [
  { number: "150+", label: "Projects Completed", icon: "🚀" },
  { number: "50+", label: "Happy Clients", icon: "😊" },
  { number: "5+", label: "Years Experience", icon: "⏱️" },
  { number: "15+", label: "Team Members", icon: "👥" },
];

const About = () => {
  const [hoveredStat, setHoveredStat] = useState(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  return (
    <section id="aboutus" className="py-12 sm:py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background Elements - Static for performance */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-[#d946ef]/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] bg-[#06b6d4]/5 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        {/* Section Header - Centered like other sections */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-10 sm:mb-14 md:mb-20"
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
            About Us
          </motion.span>

          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Who{" "}
            <span className="bg-gradient-to-r from-[#d946ef] to-[#06b6d4] bg-clip-text text-transparent">
              We Are
            </span>
          </motion.h2>

          <motion.p
            className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Transforming ideas into powerful digital experiences with innovation and creativity
          </motion.p>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          className="relative max-w-6xl mx-auto rounded-[20px] sm:rounded-[30px] md:rounded-[40px] overflow-hidden mb-10 sm:mb-14 md:mb-16"
          style={{
            background: "linear-gradient(160deg, #0d0d12 0%, #0a0a0f 50%, #08080c 100%)",
            boxShadow: "0 50px 100px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Corner accents */}
          <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-[#d946ef]/20 rounded-tr-2xl" />
          <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-[#06b6d4]/20 rounded-bl-2xl" />

          {/* Gradient overlays */}
          <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-[#d946ef]/10 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-[#06b6d4]/10 to-transparent pointer-events-none" />

          <div className="relative z-10 p-5 sm:p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
              {/* Left Side - Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center lg:text-left"
              >
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">
                  We Create{" "}
                  <span className="bg-gradient-to-r from-[#d946ef] to-[#a855f7] bg-clip-text text-transparent">
                    Digital Excellence
                  </span>
                </h3>

                <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-5">
                  At Apex Technify, we are passionate about transforming ideas into
                  powerful digital experiences. Our team of creative minds and tech
                  experts work together to deliver innovative solutions that drive
                  results.
                </p>

                <p className="text-gray-500 text-xs sm:text-sm md:text-base leading-relaxed">
                  From stunning websites to comprehensive digital marketing strategies,
                  we help businesses stand out in the digital landscape and achieve
                  their goals with cutting-edge technology and creative excellence.
                </p>
              </motion.div>

              {/* Right Side - Stats Grid */}
              <motion.div
                className="grid grid-cols-2 gap-4 md:gap-5"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
            {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="relative p-5 md:p-6 rounded-2xl cursor-pointer overflow-hidden"
                    style={{
                      background: hoveredStat === index
                        ? "linear-gradient(145deg, rgba(217,70,239,0.1) 0%, rgba(13,13,18,1) 100%)"
                        : "linear-gradient(145deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0.2) 100%)",
                      border: `1px solid ${hoveredStat === index ? "rgba(217,70,239,0.4)" : "rgba(255,255,255,0.05)"}`,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    onMouseEnter={() => setHoveredStat(index)}
                    onMouseLeave={() => setHoveredStat(null)}
                    whileHover={{ y: -5, scale: 1.03 }}
                  >
                    {/* Background glow */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "radial-gradient(circle at 50% 0%, rgba(217,70,239,0.2) 0%, transparent 70%)",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredStat === index ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Number */}
                    <motion.h3
                      className="text-3xl md:text-4xl font-bold mb-1 relative z-10"
                      style={{
                        color: hoveredStat === index ? "#d946ef" : "#ffffff",
                        textShadow: hoveredStat === index ? "0 0 20px rgba(217,70,239,0.5)" : "none",
                      }}
                    >
                      {stat.number}
                    </motion.h3>

                    {/* Label */}
                    <p className="text-gray-400 text-xs md:text-sm relative z-10">
                      {stat.label}
                    </p>

                    {/* Bottom accent */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px]"
                      style={{
                        background: "linear-gradient(90deg, #d946ef, #a855f7, transparent)",
                      }}
                      initial={{ width: "0%" }}
                      animate={{ width: hoveredStat === index ? "100%" : "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Feature Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {[
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              title: "Quality First",
              description: "We deliver excellence in every pixel and line of code",
              gradient: ["#d946ef", "#a855f7"],
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ),
              title: "On-Time Delivery",
              description: "Your projects delivered on schedule, every time",
              gradient: ["#a855f7", "#6366f1"],
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              title: "24/7 Support",
              description: "Round-the-clock assistance for all your needs",
              gradient: ["#06b6d4", "#0ea5e9"],
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="relative p-6 md:p-8 rounded-2xl cursor-pointer overflow-hidden group"
              style={{
                background: "linear-gradient(145deg, #0d0d12 0%, #08080c 100%)",
                border: `1px solid ${hoveredFeature === index ? feature.gradient[0] + "50" : "rgba(255,255,255,0.05)"}`,
              }}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Background glow on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${feature.gradient[0]}15 0%, transparent 70%)`,
                }}
              />

              {/* Icon */}
              <motion.div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 relative"
                style={{
                  background: hoveredFeature === index
                    ? `linear-gradient(135deg, ${feature.gradient[0]}30, ${feature.gradient[1]}20)`
                    : "rgba(255,255,255,0.03)",
                  color: feature.gradient[0],
                }}
                animate={{
                  scale: hoveredFeature === index ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {feature.icon}
                {/* Icon glow */}
                <motion.div
                  className="absolute inset-0 blur-xl rounded-xl"
                  style={{ backgroundColor: feature.gradient[0] }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredFeature === index ? 0.4 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Title */}
              <h4 className="text-white text-lg font-semibold mb-2 relative z-10">
                {feature.title}
                <motion.span
                  style={{ color: feature.gradient[0] }}
                  animate={{ opacity: hoveredFeature === index ? 1 : 0.5 }}
                >.</motion.span>
              </h4>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed relative z-10">{feature.description}</p>

              {/* Bottom line accent */}
              <motion.div
                className="absolute bottom-0 left-0 h-[2px]"
                style={{
                  background: `linear-gradient(90deg, ${feature.gradient[0]}, ${feature.gradient[1]}, transparent)`,
                }}
                initial={{ width: "0%" }}
                animate={{ width: hoveredFeature === index ? "100%" : "0%" }}
                transition={{ duration: 0.4 }}
              />

              {/* Arrow icon */}
              <motion.div
                className="absolute top-6 right-6 md:top-8 md:right-8"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: hoveredFeature === index ? 1 : 0, x: hoveredFeature === index ? 0 : -10 }}
                transition={{ duration: 0.2 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ color: feature.gradient[0] }}>
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
