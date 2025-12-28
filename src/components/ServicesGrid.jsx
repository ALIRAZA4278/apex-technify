"use client";
import Link from "next/link";

const themeColor = "#d946ef";

const services = [
  {
    id: 1,
    title: "Web Development",
    slug: "web-development",
    description: "Impressive, expandable, and beautiful websites from WordPress to custom web applications that captivate your audience and produce results.",
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
    title: "Logo Design",
    slug: "logo-design",
    description: "Professional logo creation that embodies your brand identity with timeless, flexible designs ready for trademark registration.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 22V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 16L12 12L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: "UI/UX Design",
    slug: "ui-ux-design",
    description: "User-friendly, attractive digital experiences focused on conversion through research-driven design and beautiful visuals.",
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
    title: "Video Editing",
    slug: "video-editing",
    description: "Professional video editing services that captivate with smooth transitions, stunning effects, and storytelling that keeps audiences hooked.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 9L15 12L10 15V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 8H22" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="5" cy="6" r="1" fill="currentColor"/>
        <circle cx="8" cy="6" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 5,
    title: "Digital Marketing",
    slug: "digital-marketing",
    description: "Data-driven digital marketing services that guarantee measurable growth through PPC advertising, content marketing, and strategic campaigns.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M21 21H4.6C4.03995 21 3.75992 21 3.54601 20.891C3.35785 20.7951 3.20487 20.6422 3.10899 20.454C3 20.2401 3 19.9601 3 19.4V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 14L11 10L15 14L21 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 8V12M21 8H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 6,
    title: "SEO Optimization",
    slug: "seo-optimization",
    description: "Professional SEO optimization services that enhance your search rankings and bring in visitors with high buying intent through data-driven strategies.",
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
    title: "Social Media Management",
    slug: "social-media",
    description: "Strategic social media management to build your brand presence and engage your audience.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <circle cx="6" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="18" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="18" cy="18" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8.5 8.5L10 10M14 10L15.5 8.5M8.5 15.5L10 14M14 14L15.5 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 8,
    title: "E-Commerce",
    slug: "e-commerce",
    description: "Powerful online stores with secure payments, inventory management, and seamless checkout.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 6H21" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const ServiceCard = ({ service }) => {
  return (
    <Link href={`/services/${service.slug}`}>
      <div
        className="relative group h-full p-6 md:p-8 rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-[#d946ef40]"
        style={{
          background: "linear-gradient(145deg, #0d0d12 0%, #0a0a0f 100%)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* Background glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${themeColor}15 0%, transparent 70%)`,
          }}
        />

        {/* Icon */}
        <div
          className="relative w-12 h-12 md:w-14 md:h-14 mb-5 text-gray-500 group-hover:text-[#d946ef] transition-colors duration-300"
        >
          {service.icon}
        </div>

        {/* Title */}
        <h3 className="text-lg md:text-xl font-semibold text-white mb-3 tracking-tight">
          {service.title}
          <span className="text-[#d946ef] opacity-50 group-hover:opacity-100 transition-opacity duration-300">.</span>
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed">
          {service.description}
        </p>

        {/* Bottom line accent */}
        <div
          className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300"
          style={{
            background: `linear-gradient(90deg, ${themeColor}, transparent)`,
          }}
        />

        {/* Arrow icon */}
        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: themeColor }}>
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </Link>
  );
};

const ServicesGrid = () => {
  return (
    <section id="expertise" className="py-12 sm:py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Static background elements */}
      <div className="absolute top-20 -left-20 w-[200px] h-[200px] bg-[#d946ef]/5 rounded-full blur-[50px] pointer-events-none" />
      <div className="absolute bottom-20 -right-20 w-[150px] h-[150px] bg-[#06b6d4]/5 rounded-full blur-[50px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14 md:mb-20">
          <span className="text-[#d946ef] text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] uppercase font-medium">
            What We Offer
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 sm:mt-4 mb-4 sm:mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-[#d946ef] via-[#a855f7] to-[#06b6d4] bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4">
            We provide comprehensive digital solutions to help your business thrive in the modern landscape.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button
            onClick={() => {
              const packagesSection = document.getElementById('packages');
              if (packagesSection) {
                packagesSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-8 py-4 rounded-full font-medium text-white relative overflow-hidden group hover:scale-105 active:scale-95 transition-transform duration-200"
            style={{
              background: "linear-gradient(135deg, #d946ef 0%, #a855f7 50%, #06b6d4 100%)",
            }}
          >
            <span className="relative z-10">Explore All Services</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
