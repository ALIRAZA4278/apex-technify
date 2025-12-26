"use client";
import { useState } from "react";

const projects = [
  { id: 1, title: "Nexus Finance Dashboard", category: "Web Development", description: "Modern fintech dashboard with real-time analytics", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", tags: ["React", "Node.js", "MongoDB"] },
  { id: 2, title: "RestroHub Restaurant Platform", category: "Web Development", description: "Full-stack restaurant management system", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80", tags: ["Next.js", "PostgreSQL", "Stripe"] },
  { id: 3, title: "TechVault Brand Identity", category: "Logo Design", description: "Modern minimalist logo design for a tech startup", image: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=800&q=80", tags: ["Logo", "Branding", "Identity"] },
  { id: 4, title: "GreenLeaf Organic Logo", category: "Logo Design", description: "Eco-friendly brand logo with natural elements", image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80", tags: ["Logo", "Organic", "Minimal"] },
  { id: 5, title: "HealthPlus App Design", category: "UI/UX Design", description: "Healthcare app redesign with accessibility focus", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80", tags: ["Figma", "Mobile UI", "Prototype"] },
  { id: 6, title: "EduLearn Dashboard", category: "UI/UX Design", description: "E-learning platform with intuitive student dashboard", image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80", tags: ["UX Research", "Wireframes", "Design System"] },
  { id: 7, title: "Brand Story Documentary", category: "Video Editing", description: "Corporate documentary with cinematic color grading", image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80", tags: ["Premiere Pro", "Color Grading", "Motion Graphics"] },
  { id: 8, title: "Product Launch Video", category: "Video Editing", description: "Dynamic product reveal with visual effects", image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80", tags: ["After Effects", "VFX", "Sound Design"] },
  { id: 9, title: "FitLife Campaign", category: "Digital Marketing", description: "360° digital marketing campaign for fitness brand", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", tags: ["Google Ads", "Meta Ads", "Analytics"] },
  { id: 10, title: "LegalEase SEO Strategy", category: "SEO Optimization", description: "Complete SEO overhaul resulting in 300% traffic increase", image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80", tags: ["Technical SEO", "Content Strategy", "Link Building"] },
  { id: 11, title: "StyleBox Social Growth", category: "Social Media Management", description: "Instagram growth from 5K to 100K followers", image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80", tags: ["Instagram", "Content Creation", "Influencer"] },
  { id: 12, title: "LuxeWear Fashion Store", category: "E-Commerce", description: "Premium fashion e-commerce with AR try-on feature", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80", tags: ["Shopify", "Custom Theme", "Payment Integration"] },
];

const categories = ["All", "Web Development", "Logo Design", "UI/UX Design", "Video Editing", "Digital Marketing", "SEO Optimization", "Social Media Management", "E-Commerce"];

const PortfolioCard = ({ project }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl cursor-pointer h-[280px] md:h-[320px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${project.image})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/90 transition-all duration-300" />

      {/* Border */}
      <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-[#d946ef]/50 transition-all duration-300" />

      {/* Content */}
      <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between">
        {/* Top Row */}
        <div className="flex items-start justify-between">
          <span
            className="px-3 py-1.5 rounded-full text-xs font-medium"
            style={{
              background: "rgba(217,70,239,0.15)",
              border: "1px solid rgba(217,70,239,0.3)",
              color: "#e879f9",
            }}
          >
            {project.category}
          </span>

          {/* Arrow Button */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300"
            style={{ background: "rgba(217,70,239,0.9)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Bottom Content */}
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            {project.title}<span className="text-[#d946ef]">.</span>
          </h3>
          <p className="text-gray-300 text-sm mb-3 line-clamp-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
            {project.tags.map((tag, i) => (
              <span key={i} className="px-2.5 py-1 text-xs rounded-md bg-white/10 text-gray-300">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
        style={{ background: "linear-gradient(90deg, #d946ef, #a855f7, transparent)" }}
      />
    </div>
  );
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-12 sm:py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[200px] h-[200px] bg-[#d946ef]/5 rounded-full blur-[50px]" />
        <div className="absolute bottom-0 right-1/4 w-[150px] h-[150px] bg-[#06b6d4]/5 rounded-full blur-[50px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14 md:mb-20">
          <span className="inline-block text-[#d946ef] text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase font-medium mb-3 sm:mb-4">
            Portfolio
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-[#d946ef] to-[#06b6d4] bg-clip-text text-transparent">
              Creative
            </span>{" "}
            Work
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto px-4">
            Showcasing our finest projects that define innovation and excellence
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 md:gap-3 mb-8 sm:mb-12 md:mb-16 px-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${
                activeCategory === category
                  ? "text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
              style={{
                background: activeCategory === category
                  ? "linear-gradient(135deg, #d946ef 0%, #a855f7 100%)"
                  : "rgba(255,255,255,0.03)",
                border: activeCategory === category
                  ? "1px solid transparent"
                  : "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {filteredProjects.map((project) => (
            <PortfolioCard key={project.id} project={project} />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-10 sm:mt-14 md:mt-20">
          <button
            className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium overflow-hidden text-sm sm:text-base text-white hover:scale-105 active:scale-95 transition-transform duration-200"
            style={{
              background: "linear-gradient(135deg, #d946ef 0%, #a855f7 100%)",
            }}
          >
            <span className="relative z-10 flex items-center gap-3">
              View All Projects
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
