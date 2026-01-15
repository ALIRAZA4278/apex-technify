"use client";
import { useState } from "react";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Health Mate",
    category: "Web Development",
    description: "AI-powered health report analyzer that provides detailed insights and recommendations from medical reports",
    image: "/website/healthmate.png",
    tags: ["Next.js", "AI Integration", "Healthcare"],
  },
  {
    id: 2,
    title: "Halwaiii",
    category: "E-Commerce",
    description: "Premium Pakistani sweets e-commerce platform blending heritage craftsmanship with modern shopping experience",
    image: "/website/halwaiii.png",
    tags: ["E-Commerce", "React", "Payment Integration"],
  },
  {
    id: 3,
    title: "GracePoint Medical",
    category: "Web Development",
    description: "Healthcare staffing agency platform connecting medical professionals with facilities worldwide",
    image: "/website/gracepoint.png",
    tags: ["Next.js", "Healthcare", "Staffing"],
  },
  {
    id: 4,
    title: "NDIS Beauty Collective",
    category: "Web Development",
    description: "Mobile beauty services platform specializing in accessible, sensory-friendly experiences for clients with disabilities",
    image: "/website/ndis.png",
    tags: ["React", "Accessibility", "Booking System"],
  },
  {
    id: 5,
    title: "Quality Care Senior Living",
    category: "Web Development",
    description: "Elegant senior care home website featuring warm aesthetics and comprehensive service showcase",
    image: "/website/QualityCare.png",
    tags: ["Next.js", "Design", "Healthcare"],
  },
  {
    id: 6,
    title: "Workoura",
    category: "Web Development",
    description: "Modern job board platform connecting job seekers with verified employers across the globe",
    image: "/website/workoura.png",
    tags: ["Next.js", "Job Portal", "Full-Stack"],
  },
  {
    id: 7,
    title: "Mohit Computers",
    category: "E-Commerce",
    description: "Complete computer hardware and electronics e-commerce store with extensive product catalog",
    image: "/website/mohitcomputers.png",
    tags: ["Next.js", "E-Commerce", "Full-Stack"],
  },
  {
    id: 8,
    title: "Furniro",
    category: "E-Commerce",
    description: "Modern furniture e-commerce platform with elegant design and seamless shopping experience",
    image: "/website/furniture.png",
    tags: ["Next.js", "E-Commerce", "Furniture"],
  },
  {
    id: 9,
    title: "Luxury Brand Logo",
    category: "Logo Design",
    description: "Elegant and sophisticated logo design for a premium luxury brand with timeless appeal",
    image: "/logo/logo-1.jpg",
    tags: ["Logo Design", "Branding", "Luxury"],
  },
  {
    id: 10,
    title: "Modern Tech Logo",
    category: "Logo Design",
    description: "Clean and modern logo design for a technology company with minimalist aesthetics",
    image: "/logo/logo-2.jpg",
    tags: ["Logo Design", "Tech", "Minimalist"],
  },
  {
    id: 11,
    title: "Creative Agency Logo",
    category: "Logo Design",
    description: "Dynamic and creative logo design that captures the essence of innovation and creativity",
    image: "/logo/logo-4.jpg",
    tags: ["Logo Design", "Creative", "Agency"],
  },
  {
    id: 12,
    title: "Corporate Brand Logo",
    category: "Logo Design",
    description: "Professional corporate logo design that conveys trust, reliability and excellence",
    image: "/logo/logo-5.jpg",
    tags: ["Logo Design", "Corporate", "Professional"],
  },
  {
    id: 13,
    title: "Startup Logo Design",
    category: "Logo Design",
    description: "Fresh and innovative logo design for a startup brand looking to make an impact",
    image: "/logo/logo-6.jpg",
    tags: ["Logo Design", "Startup", "Innovation"],
  },
  {
    id: 14,
    title: "Premium Brand Identity",
    category: "Logo Design",
    description: "Complete brand identity logo design with versatile applications across all media",
    image: "/logo/logo-9.jpg",
    tags: ["Logo Design", "Brand Identity", "Premium"],
  },
  {
    id: 15,
    title: "Social Media Banner",
    category: "Graphics Design",
    description: "Eye-catching social media banner design that boosts engagement and brand visibility",
    image: "/design/design-1.jpg",
    tags: ["Graphics Design", "Social Media", "Banner"],
  },
  {
    id: 16,
    title: "Marketing Flyer",
    category: "Graphics Design",
    description: "Professional marketing flyer design that effectively communicates brand message",
    image: "/design/design-2.jpg",
    tags: ["Graphics Design", "Marketing", "Print"],
  },
  {
    id: 17,
    title: "Brand Poster",
    category: "Graphics Design",
    description: "Creative poster design that captures attention and promotes brand awareness",
    image: "/design/design-3.jpg",
    tags: ["Graphics Design", "Poster", "Creative"],
  },
  {
    id: 19,
    title: "Business Brochure",
    category: "Graphics Design",
    description: "Professional brochure design showcasing products and services elegantly",
    image: "/design/design-5.jpg",
    tags: ["Graphics Design", "Brochure", "Corporate"],
  },
  {
    id: 20,
    title: "Event Banner",
    category: "Graphics Design",
    description: "Stunning event banner design that creates excitement and drives attendance",
    image: "/design/design-6.jpg",
    tags: ["Graphics Design", "Event", "Banner"],
  },
  {
    id: 21,
    title: "Product Packaging",
    category: "Graphics Design",
    description: "Creative product packaging design that stands out on shelves",
    image: "/design/design-7.jpg",
    tags: ["Graphics Design", "Packaging", "Product"],
  },
  {
    id: 22,
    title: "Instagram Banner",
    category: "Graphics Design",
    description: "Eye-catching Instagram banner design that increases social media reach",
    image: "/design/design-8.jpg",
    tags: ["Graphics Design", "Banner", "Social Media"],
  },
  {
    id: 23,
    title: "Corporate Presentation",
    category: "Graphics Design",
    description: "Professional presentation design that impresses clients and stakeholders",
    image: "/design/design-9.jpg",
    tags: ["Graphics Design", "Presentation", "Corporate"],
  },
  {
    id: 24,
    title: "Brand Infographic",
    category: "Graphics Design",
    description: "Informative infographic design that simplifies complex data beautifully",
    image: "/design/design-10.jpg",
    tags: ["Graphics Design", "Infographic", "Data"],
  },
  {
    id: 25,
    title: "Promotional Graphics",
    category: "Graphics Design",
    description: "Attractive promotional graphics designed to drive sales and conversions",
    image: "/design/design-11.jpg",
    tags: ["Graphics Design", "Promotion", "Marketing"],
  },
];

const categories = ["All", "Web Development", "Logo Design", "Graphics Design", "E-Commerce"];

const PortfolioCard = ({ project, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl cursor-pointer h-[320px] md:h-[380px]"
    >
      {/* Background Image - Optimized with Next.js Image */}
      <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          loading="lazy"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 transition-all duration-300" />

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

          {/* Zoom Button - Only on Hover */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300"
            style={{ background: "rgba(217,70,239,0.9)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M11 8v6M8 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Bottom Content - Always Visible */}
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            {project.title}<span className="text-[#d946ef]">.</span>
          </h3>
          <p className="text-gray-300 text-sm mb-3 line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  // Show only visibleCount projects
  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMoreProjects = filteredProjects.length > visibleCount;

  // Reset visible count when category changes
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setVisibleCount(6);
  };

  const handleViewMore = () => {
    setVisibleCount(prev => prev + 6);
  };

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
            Work
            </span>{" "}
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
              onClick={() => handleCategoryChange(category)}
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
          {visibleProjects.map((project) => (
            <PortfolioCard
              key={project.id}
              project={project}
              onClick={() => setSelectedImage(project)}
            />
          ))}
        </div>

        {/* View More Button - Only show if there are more projects */}
        {hasMoreProjects && (
          <div className="text-center mt-10 sm:mt-12 md:mt-16">
            <button
              onClick={handleViewMore}
              className="px-8 py-4 rounded-full font-medium text-white relative overflow-hidden group hover:scale-105 active:scale-95 transition-transform duration-200"
              style={{
                background: "linear-gradient(135deg, #d946ef 0%, #a855f7 50%, #06b6d4 100%)",
              }}
            >
              <span className="relative z-10">View More Projects</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-5xl max-h-[90vh] w-full h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.image}
              alt={selectedImage.title}
              fill
              className="object-contain rounded-lg"
              sizes="100vw"
              priority
            />

            {/* Title */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-white text-center">
                {selectedImage.title}
                <span className="text-[#d946ef]">.</span>
              </h3>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const currentIndex = visibleProjects.findIndex(p => p.id === selectedImage.id);
              const prevIndex = currentIndex === 0 ? visibleProjects.length - 1 : currentIndex - 1;
              setSelectedImage(visibleProjects[prevIndex]);
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-[#d946ef]/80 flex items-center justify-center transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              const currentIndex = visibleProjects.findIndex(p => p.id === selectedImage.id);
              const nextIndex = currentIndex === visibleProjects.length - 1 ? 0 : currentIndex + 1;
              setSelectedImage(visibleProjects[nextIndex]);
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-[#d946ef]/80 flex items-center justify-center transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
