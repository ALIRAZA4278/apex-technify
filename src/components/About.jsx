"use client";

const stats = [
  { number: "150+", label: "Projects Completed" },
  { number: "50+", label: "Happy Clients" },
  { number: "5+", label: "Years Experience" },
  { number: "15+", label: "Team Members" },
];

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Quality First",
    description: "We deliver excellence in every pixel and line of code",
    color: "#d946ef",
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
    color: "#a855f7",
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
    color: "#06b6d4",
  },
];

const About = () => {
  return (
    <section id="aboutus" className="py-12 sm:py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[200px] h-[200px] bg-[#d946ef]/5 rounded-full blur-[50px]" />
        <div className="absolute bottom-0 right-1/4 w-[150px] h-[150px] bg-[#06b6d4]/5 rounded-full blur-[50px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14 md:mb-20">
          <span className="inline-block text-[#d946ef] text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase font-medium mb-3 sm:mb-4">
            About Us
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6">
            Who{" "}
            <span className="bg-gradient-to-r from-[#d946ef] to-[#06b6d4] bg-clip-text text-transparent">
              We Are
            </span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto px-4">
            Transforming ideas into powerful digital experiences with innovation and creativity
          </p>
        </div>

        {/* Main Content Card */}
        <div
          className="relative max-w-6xl mx-auto rounded-[20px] sm:rounded-[30px] md:rounded-[40px] overflow-hidden mb-10 sm:mb-14 md:mb-16"
          style={{
            background: "linear-gradient(160deg, #0d0d12 0%, #0a0a0f 50%, #08080c 100%)",
            boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
          }}
        >
          {/* Corner accents */}
          <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-[#d946ef]/20 rounded-tr-2xl" />
          <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-[#06b6d4]/20 rounded-bl-2xl" />

          <div className="relative z-10 p-5 sm:p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
              {/* Left Side - Content */}
              <div className="text-center lg:text-left">
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
              </div>

              {/* Right Side - Stats Grid */}
              <div className="grid grid-cols-2 gap-4 md:gap-5">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="group relative p-5 md:p-6 rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#d946ef]/40"
                    style={{
                      background: "linear-gradient(145deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0.2) 100%)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    {/* Number */}
                    <h3 className="text-3xl md:text-4xl font-bold mb-1 relative z-10 text-white group-hover:text-[#d946ef] transition-colors duration-300">
                      {stat.number}
                    </h3>
                    {/* Label */}
                    <p className="text-gray-400 text-xs md:text-sm relative z-10">
                      {stat.label}
                    </p>
                    {/* Bottom accent */}
                    <div
                      className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300"
                      style={{ background: "linear-gradient(90deg, #d946ef, #a855f7, transparent)" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-6 md:p-8 rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-2"
              style={{
                background: "linear-gradient(145deg, #0d0d12 0%, #08080c 100%)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  color: feature.color,
                }}
              >
                {feature.icon}
              </div>

              {/* Title */}
              <h4 className="text-white text-lg font-semibold mb-2 relative z-10">
                {feature.title}
                <span style={{ color: feature.color }} className="opacity-50 group-hover:opacity-100 transition-opacity duration-300">.</span>
              </h4>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed relative z-10">{feature.description}</p>

              {/* Bottom line accent */}
              <div
                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300"
                style={{ background: `linear-gradient(90deg, ${feature.color}, transparent)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
