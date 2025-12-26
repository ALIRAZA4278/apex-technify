"use client";

const Footer = ({ onContactClick }) => {
  // Smooth scroll to section
  const scrollToSection = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const socialLinks = [
    { name: "Facebook", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>, href: "#" },
    { name: "Instagram", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>, href: "#" },
    { name: "LinkedIn", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>, href: "#" },
    { name: "X", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>, href: "#" },
  ];

  const navLinks = [
    { name: "About us", href: "#aboutus" },
    { name: "Services", href: "#expertise" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Packages", href: "#packages" },
  ];

  const locations = ["Dubai", "New York", "London"];

  return (
    <footer
      className="relative pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-8 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, transparent 0%, rgba(217,70,239,0.08) 60%, rgba(217,70,239,0.15) 100%)",
      }}
    >
      {/* Gradient Glow at Top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[150px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center top, rgba(217,70,239,0.1) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Left Side - Social & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-3 sm:gap-4">
            {/* Social Icons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-md flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[#d946ef]/20"
                  style={{
                    background: "rgba(217,70,239,0.1)",
                    border: "1px solid rgba(217,70,239,0.3)",
                    color: "#d946ef",
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-xs sm:text-sm" style={{ color: "#d946ef" }}>
              copyright © 2025 apextechnify
            </p>
          </div>

          {/* Right Side - Nav Links & Locations */}
          <div className="flex flex-col items-center md:items-end gap-3 sm:gap-4">
            {/* Navigation Links */}
            <nav className="flex flex-wrap justify-center md:justify-end items-center gap-4 sm:gap-6 md:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-gray-300 text-xs sm:text-sm hover:text-[#d946ef] transition-colors duration-300 relative group hover:-translate-y-0.5"
                >
                  {link.name}
                  <span className="text-[#d946ef]">.</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#d946ef] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
              <button
                onClick={onContactClick}
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-white hover:scale-105 active:scale-95 transition-transform duration-200"
                style={{
                  background: "linear-gradient(135deg, #d946ef 0%, #a855f7 50%, #06b6d4 100%)",
                }}
              >
                Contact Us
              </button>
            </nav>

            {/* Locations */}
            <p className="text-gray-500 text-xs tracking-wide">
              {locations.join(" | ")}
            </p>
          </div>
        </div>

        {/* Bottom Divider Line */}
        <div
          className="w-full h-[1px] mb-6"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(217,70,239,0.3), transparent)",
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;
