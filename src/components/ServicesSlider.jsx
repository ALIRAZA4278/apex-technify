"use client";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";

const services = [
  {
    id: 1,
    title: "Web Development",
    description: "Custom websites built with cutting-edge technologies",
    icon: "🌐",
    gradient: ["#d946ef", "#a855f7"],
  },
  {
    id: 2,
    title: "Mobile Apps",
    description: "Native & cross-platform mobile applications",
    icon: "📱",
    gradient: ["#a855f7", "#6366f1"],
  },
  {
    id: 3,
    title: "UI/UX Design",
    description: "Beautiful interfaces that engage users",
    icon: "🎨",
    gradient: ["#06b6d4", "#0ea5e9"],
  },
  {
    id: 4,
    title: "Digital Marketing",
    description: "Data-driven strategies to grow your presence",
    icon: "📈",
    gradient: ["#f97316", "#fb923c"],
  },
  {
    id: 5,
    title: "Brand Identity",
    description: "Complete visual identity systems",
    icon: "⭐",
    gradient: ["#eab308", "#facc15"],
  },
  {
    id: 6,
    title: "SEO Optimization",
    description: "Improve rankings & drive organic traffic",
    icon: "🔍",
    gradient: ["#22c55e", "#4ade80"],
  },
  {
    id: 7,
    title: "E-Commerce",
    description: "Powerful online stores with secure payments",
    icon: "🛒",
    gradient: ["#ec4899", "#f472b6"],
  },
  {
    id: 8,
    title: "Cloud Solutions",
    description: "Scalable infrastructure for modern apps",
    icon: "☁️",
    gradient: ["#3b82f6", "#60a5fa"],
  },
];

const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  // Alternate slide direction based on position
  const slideDirection = index % 2 === 0 ? -100 : 100;
  const rowIndex = Math.floor(index / 4);
  const isEvenRow = rowIndex % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      initial={{
        opacity: 0,
        x: isEvenRow ? slideDirection : -slideDirection,
        y: 50,
        scale: 0.8,
        rotateY: isEvenRow ? -15 : 15,
      }}
      animate={isInView ? {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotateY: 0,
      } : {}}
      transition={{
        duration: 0.8,
        delay: (index % 4) * 0.15,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="relative h-full rounded-3xl overflow-hidden cursor-pointer"
        style={{
          background: "linear-gradient(145deg, #0d0d12 0%, #08080c 100%)",
          border: `1px solid ${isHovered ? service.gradient[0] + "60" : "rgba(255,255,255,0.06)"}`,
        }}
        whileHover={{
          y: -12,
          rotateX: 5,
          rotateY: -5,
          scale: 1.02,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Gradient background on hover */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${service.gradient[0]}15 0%, transparent 50%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Animated border gradient */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: `linear-gradient(135deg, ${service.gradient[0]}30, transparent, ${service.gradient[1]}30)`,
            padding: "1px",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative z-10 p-6 md:p-8">
          {/* Icon with gradient background */}
          <motion.div
            className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden"
            style={{
              background: isHovered
                ? `linear-gradient(135deg, ${service.gradient[0]}30, ${service.gradient[1]}20)`
                : "rgba(255,255,255,0.03)",
            }}
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? [0, -5, 5, 0] : 0,
            }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-4xl md:text-5xl relative z-10">{service.icon}</span>

            {/* Icon glow */}
            <motion.div
              className="absolute inset-0 blur-xl"
              style={{
                background: `linear-gradient(135deg, ${service.gradient[0]}, ${service.gradient[1]})`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0.4 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Title */}
          <motion.h3
            className="text-xl md:text-2xl font-bold text-white mb-3"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {service.title}
            <motion.span
              className="inline-block ml-1"
              style={{ color: service.gradient[0] }}
              animate={{ scale: isHovered ? [1, 1.3, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              .
            </motion.span>
          </motion.h3>

          {/* Description */}
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
            {service.description}
          </p>

          {/* Bottom gradient line */}
          <motion.div
            className="h-1 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${service.gradient[0]}, ${service.gradient[1]})`,
            }}
            initial={{ width: "30%" }}
            animate={{ width: isHovered ? "100%" : "30%" }}
            transition={{ duration: 0.4 }}
          />

          {/* Arrow */}
          <motion.div
            className="absolute top-6 right-6 md:top-8 md:right-8 w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: isHovered
                ? `linear-gradient(135deg, ${service.gradient[0]}, ${service.gradient[1]})`
                : "rgba(255,255,255,0.05)",
            }}
            animate={{
              scale: isHovered ? 1 : 0.8,
              rotate: isHovered ? 0 : -45,
            }}
            transition={{ duration: 0.3 }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white"
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
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)",
            transform: "translateX(-100%)",
          }}
          animate={{
            transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
          }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>
    </motion.div>
  );
};

const ServicesSlider = () => {
  const containerRef = useRef(null);

  return (
    <section className="py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-16">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="text-[#d946ef] text-sm md:text-base tracking-[0.3em] uppercase font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            What We Offer
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6"
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
            className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Comprehensive digital solutions to transform your business
          </motion.p>
        </motion.div>

        {/* Services Grid with Sliding Animation */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            className="group relative px-8 py-4 rounded-full font-medium text-white overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #d946ef 0%, #a855f7 50%, #06b6d4 100%)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              View All Services
              <motion.svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </span>
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.2 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSlider;
