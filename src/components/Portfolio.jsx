"use client";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useState, useRef } from "react";

const projects = [
  {
    id: 1,
    title: "Nexus Finance",
    category: "Web App",
    description: "Modern fintech dashboard with real-time analytics",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tags: ["React", "Node.js", "D3.js"],
    size: "large",
  },
  {
    id: 2,
    title: "Vortex Gaming",
    category: "Mobile App",
    description: "Immersive mobile gaming platform",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b0d?w=800&q=80",
    tags: ["React Native", "Firebase"],
    size: "small",
  },
  {
    id: 3,
    title: "Pulse Health",
    category: "UI/UX",
    description: "Healthcare app redesign with accessibility focus",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    tags: ["Figma", "Prototyping"],
    size: "small",
  },
  {
    id: 4,
    title: "Echo Commerce",
    category: "E-Commerce",
    description: "Luxury fashion e-commerce experience",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    tags: ["Next.js", "Stripe", "Sanity"],
    size: "small",
  },
  {
    id: 5,
    title: "Aurora Analytics",
    category: "Web App",
    description: "AI-powered business intelligence platform",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    tags: ["Python", "TensorFlow", "React"],
    size: "large",
  },
  {
    id: 6,
    title: "Stellar Brand",
    category: "Branding",
    description: "Complete brand identity for tech startup",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
    tags: ["Branding", "Logo Design"],
    size: "small",
  },
];

const categories = ["All", "Web App", "Mobile App", "UI/UX", "E-Commerce", "Branding"];

const PortfolioCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl cursor-pointer h-[280px] md:h-[320px]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      layout
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${project.image})` }}
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Dark Overlay */}
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: isHovered
            ? "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%)"
            : "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Pink Glow on Hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(217,70,239,0.2) 0%, transparent 50%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Border */}
      <div
        className="absolute inset-0 rounded-2xl transition-all duration-300"
        style={{
          boxShadow: isHovered
            ? "inset 0 0 0 2px rgba(217,70,239,0.6), 0 0 40px rgba(217,70,239,0.2)"
            : "inset 0 0 0 1px rgba(255,255,255,0.08)",
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between">
        {/* Top Row - Category & Button */}
        <div className="flex items-start justify-between">
          <motion.span
            className="px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm"
            style={{
              background: "rgba(217,70,239,0.15)",
              border: "1px solid rgba(217,70,239,0.3)",
              color: "#e879f9",
            }}
            animate={{
              y: isHovered ? 0 : -5,
              opacity: isHovered ? 1 : 0.8
            }}
            transition={{ duration: 0.3 }}
          >
            {project.category}
          </motion.span>

          {/* Arrow Button */}
          <motion.div
            className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm"
            style={{
              background: "rgba(217,70,239,0.9)",
              boxShadow: "0 0 25px rgba(217,70,239,0.5)",
            }}
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.5,
              rotate: isHovered ? 0 : -45,
            }}
            transition={{ duration: 0.3, type: "spring", stiffness: 250 }}
            whileHover={{ scale: 1.1 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </div>

        {/* Bottom Content */}
        <div>
          {/* Title */}
          <motion.h3
            className="text-xl md:text-2xl font-bold text-white mb-2"
            animate={{ y: isHovered ? 0 : 8 }}
            transition={{ duration: 0.3 }}
          >
            {project.title}
            <span className="text-[#d946ef]">.</span>
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-gray-300 text-sm mb-3 line-clamp-2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 15 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            {project.description}
          </motion.p>

          {/* Tags */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 15 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-xs rounded-md bg-white/10 text-gray-300 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{
          background: "linear-gradient(90deg, #d946ef, #a855f7, transparent)",
        }}
        initial={{ scaleX: 0, transformOrigin: "left" }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const headerY = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((p) => p.category === category));
    }
  };

  return (
    <section ref={sectionRef} id="portfolio" className="py-12 sm:py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background Gradients with Parallax */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#d946ef]/5 rounded-full blur-[180px]"
          style={{ y: backgroundY }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#06b6d4]/5 rounded-full blur-[180px]"
          style={{ y: useTransform(scrollYProgress, [0, 1], [50, -100]) }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        {/* Section Header */}
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
            Portfolio
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
              Creative
            </span>{" "}
            Work
          </motion.h2>

          <motion.p
            className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Showcasing our finest projects that define innovation and excellence
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-2.5 md:gap-3 mb-8 sm:mb-12 md:mb-16 px-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300`}
              style={{
                background: activeCategory === category
                  ? "linear-gradient(135deg, #d946ef 0%, #a855f7 100%)"
                  : "rgba(255,255,255,0.03)",
                border: activeCategory === category
                  ? "1px solid transparent"
                  : "1px solid rgba(255,255,255,0.1)",
                color: activeCategory === category ? "#fff" : "#9ca3af",
                boxShadow: activeCategory === category
                  ? "0 0 30px rgba(217,70,239,0.4)"
                  : "none",
              }}
              whileHover={{
                scale: 1.05,
                backgroundColor: activeCategory !== category ? "rgba(255,255,255,0.08)" : undefined
              }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid - Clean 3 Column */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <PortfolioCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="flex justify-center mt-10 sm:mt-14 md:mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium overflow-hidden text-sm sm:text-base"
            style={{
              background: "linear-gradient(135deg, #d946ef 0%, #a855f7 100%)",
              boxShadow: "0 0 40px rgba(217,70,239,0.3)",
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(217,70,239,0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-3 text-white">
              View All Projects
              <motion.svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </motion.svg>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
