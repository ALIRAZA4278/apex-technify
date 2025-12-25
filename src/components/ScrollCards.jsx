"use client";
import { motion } from "motion/react";

const services = [
  {
    id: 1,
    title: "Web Development",
    icon: "🌐",
    hueA: 280,
    hueB: 320,
  },
  {
    id: 2,
    title: "Mobile Apps",
    icon: "📱",
    hueA: 260,
    hueB: 290,
  },
  {
    id: 3,
    title: "UI/UX Design",
    icon: "🎨",
    hueA: 180,
    hueB: 210,
  },
  {
    id: 4,
    title: "Digital Marketing",
    icon: "📈",
    hueA: 20,
    hueB: 50,
  },
  {
    id: 5,
    title: "Brand Identity",
    icon: "⭐",
    hueA: 40,
    hueB: 70,
  },
  {
    id: 6,
    title: "SEO Optimization",
    icon: "🔍",
    hueA: 120,
    hueB: 150,
  },
  {
    id: 7,
    title: "E-Commerce",
    icon: "🛒",
    hueA: 320,
    hueB: 350,
  },
  {
    id: 8,
    title: "Cloud Solutions",
    icon: "☁️",
    hueA: 200,
    hueB: 230,
  },
];

const cardVariants = {
  offscreen: {
    y: 300,
    opacity: 0,
  },
  onscreen: {
    y: 50,
    opacity: 1,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const hue = (h) => `hsl(${h}, 100%, 50%)`;

const Card = ({ service, index }) => {
  const background = `linear-gradient(306deg, ${hue(service.hueA)}, ${hue(service.hueB)})`;

  return (
    <motion.div
      style={{
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        paddingTop: 20,
        marginBottom: -120,
      }}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.8 }}
    >
      {/* Splash background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background,
          clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
        }}
      />

      {/* Card */}
      <motion.div
        style={{
          width: 300,
          height: 430,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 20,
          background: "linear-gradient(145deg, #0d0d12 0%, #0a0a0f 100%)",
          boxShadow: "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075), 0 25px 50px rgba(0,0,0,0.5)",
          transformOrigin: "10% 60%",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
        variants={cardVariants}
      >
        <span style={{ fontSize: 100, marginBottom: 20 }}>{service.icon}</span>
        <h3
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: "#fff",
            textAlign: "center",
          }}
        >
          {service.title}
        </h3>
        <div
          style={{
            width: 60,
            height: 3,
            background,
            borderRadius: 2,
            marginTop: 15,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const ScrollCards = () => {
  return (
    <section className="py-20 md:py-32">
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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
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
            Scroll down to explore our comprehensive digital solutions
          </motion.p>
        </motion.div>

        {/* Scroll Cards Container */}
        <div
          style={{
            margin: "0 auto",
            maxWidth: 500,
            paddingBottom: 100,
            width: "100%",
          }}
        >
          {services.map((service, index) => (
            <Card key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollCards;
