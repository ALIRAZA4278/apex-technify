"use client";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Rocket = () => {
  const containerRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      // Set initial rotation to 30deg
      gsap.set(containerRef.current, { rotation: 30 });
      gsap.to(containerRef.current, {
        y: -12,
        x: 3,
        rotation: 31.5,
        duration: 2.5,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    }

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.8,
        scale: 1.15,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
      className="relative flex items-center justify-center"
    >
      {/* Rotating squares/frames behind rocket */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-[340px] h-[340px] border border-[#d946ef]/20 rounded-xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-[290px] h-[290px] border border-[#a855f7]/25 rounded-xl"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute w-[380px] h-[380px] border border-[#06b6d4]/15 rounded-xl"
        />
      </div>

      {/* Background glow */}
      <div
        ref={glowRef}
        className="absolute"
        style={{
          width: 350,
          height: 350,
          background: "radial-gradient(circle, rgba(217,70,239,0.35) 0%, rgba(6,182,212,0.2) 40%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div
        ref={containerRef}
        className="relative"
        style={{
          filter: "drop-shadow(0 0 40px rgba(217,70,239,0.5)) drop-shadow(0 0 80px rgba(6,182,212,0.3))",
        }}
      >
        <svg
          width="260"
          height="340"
          viewBox="0 0 260 340"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Main gradient */}
            <linearGradient id="mainGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9333ea" />
              <stop offset="25%" stopColor="#c026d3" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="75%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>

            {/* Darker gradient for shading */}
            <linearGradient id="shadeGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
            </linearGradient>

            {/* Highlight gradient */}
            <linearGradient id="highlightGrad" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>

            {/* Window gradient */}
            <radialGradient id="windowGrad" cx="30%" cy="30%">
              <stop offset="0%" stopColor="#312e81" />
              <stop offset="100%" stopColor="#0a0a0f" />
            </radialGradient>

            {/* Cyan tip gradient */}
            <linearGradient id="tipGrad" x1="50%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>

            {/* Glow filter */}
            <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Strong glow */}
            <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* === MAIN ROCKET BODY === */}
          <path
            d="M130 15
               C130 15 185 75 185 160
               L185 230
               Q185 245 130 260
               Q75 245 75 230
               L75 160
               C75 75 130 15 130 15Z"
            fill="url(#mainGrad)"
          />

          {/* Body shading */}
          <path
            d="M130 15
               C130 15 185 75 185 160
               L185 230
               Q185 245 130 260
               Q75 245 75 230
               L75 160
               C75 75 130 15 130 15Z"
            fill="url(#shadeGrad)"
          />

          {/* Body highlight - left edge */}
          <path
            d="M130 20
               C115 45 90 90 90 160
               L90 225
               Q88 235 85 238
               L75 230
               L75 160
               C75 75 130 15 130 15Z"
            fill="url(#highlightGrad)"
          />

          {/* === NOSE CONE TIP === */}
          <path
            d="M130 15
               C135 30 145 50 150 75
               L130 80
               L110 75
               C115 50 125 30 130 15Z"
            fill="url(#tipGrad)"
            opacity="0.9"
          />

          {/* Nose shine */}
          <ellipse cx="125" cy="45" rx="6" ry="12" fill="white" opacity="0.15" />

          {/* === PORTHOLE WINDOW === */}
          {/* Outer ring */}
          <circle cx="130" cy="145" r="38" fill="#1a1625" />
          {/* Metallic ring */}
          <circle cx="130" cy="145" r="34" fill="none" stroke="url(#mainGrad)" strokeWidth="4" />
          {/* Inner dark ring */}
          <circle cx="130" cy="145" r="30" fill="#0f0a18" />
          {/* Glass */}
          <circle cx="130" cy="145" r="26" fill="url(#windowGrad)" />
          {/* Glass reflection - large */}
          <ellipse cx="120" cy="135" rx="12" ry="10" fill="#818cf8" opacity="0.15" />
          {/* Glass reflection - small */}
          <circle cx="116" cy="132" r="5" fill="#c4b5fd" opacity="0.3" />
          {/* Glass reflection - tiny */}
          <circle cx="140" cy="155" r="3" fill="#06b6d4" opacity="0.2" />

          {/* === DECORATIVE DOTS ON NOSE === */}
          <circle cx="110" cy="85" r="5" fill="#f0abfc" opacity="0.8" filter="url(#softGlow)" />
          <circle cx="130" cy="75" r="5" fill="#c4b5fd" opacity="0.8" filter="url(#softGlow)" />
          <circle cx="150" cy="85" r="5" fill="#22d3ee" opacity="0.8" filter="url(#softGlow)" />
          <circle cx="118" cy="105" r="3" fill="#a5b4fc" opacity="0.6" />
          <circle cx="142" cy="105" r="3" fill="#a5b4fc" opacity="0.6" />

          {/* === BODY DETAILS === */}
          {/* Stripe 1 */}
          <rect x="82" y="200" width="96" height="4" rx="2" fill="#06b6d4" opacity="0.6" />
          {/* Stripe 2 */}
          <rect x="88" y="215" width="84" height="3" rx="1.5" fill="#a855f7" opacity="0.4" />
          {/* Center line detail */}
          <line x1="130" y1="185" x2="130" y2="250" stroke="#c4b5fd" strokeWidth="1" opacity="0.2" />

          {/* === LEFT FIN === */}
          <path
            d="M75 195
               C55 220 35 260 30 295
               L45 295
               Q60 265 75 235Z"
            fill="url(#mainGrad)"
          />
          {/* Fin shadow */}
          <path
            d="M75 200
               C62 220 50 250 45 280
               L52 278
               Q63 255 75 230Z"
            fill="rgba(0,0,0,0.25)"
          />

          {/* === RIGHT FIN === */}
          <path
            d="M185 195
               C205 220 225 260 230 295
               L215 295
               Q200 265 185 235Z"
            fill="url(#mainGrad)"
          />

          {/* === CENTER/BACK FIN === */}
          <path
            d="M110 245
               L130 310
               L150 245
               Q140 255 130 255
               Q120 255 110 245Z"
            fill="url(#tipGrad)"
          />

          {/* === EXHAUST AREA === */}
          <ellipse cx="130" cy="258" rx="28" ry="10" fill="#1a1625" />
          <ellipse cx="130" cy="258" rx="20" ry="6" fill="#0a0a0f" />
        </svg>

        {/* Exhaust trail lines */}
        <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2">
          <svg width="100" height="80" viewBox="0 0 100 80">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.rect
                key={i}
                x={15 + i * 8}
                y={10 + i * 12}
                width={30 - i * 4}
                height={5}
                rx={2.5}
                fill="#d946ef"
                opacity={0.7 - i * 0.12}
                animate={{ opacity: [0.7 - i * 0.12, 0.3, 0.7 - i * 0.12] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
            {/* Exhaust dots */}
            {[0, 1, 2, 3].map((i) => (
              <motion.circle
                key={`dot-${i}`}
                cx={70 + (i % 2) * 15}
                cy={25 + i * 15}
                r={4 - i * 0.5}
                fill="#d946ef"
                opacity={0.5 - i * 0.1}
                animate={{ opacity: [0.5 - i * 0.1, 0.2, 0.5 - i * 0.1], scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Floating particles around rocket */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 3 + (i % 4),
            height: 3 + (i % 4),
            background: i % 3 === 0 ? "#d946ef" : i % 3 === 1 ? "#a855f7" : "#22d3ee",
            left: `${10 + (i % 4) * 22}%`,
            top: `${15 + i * 10}%`,
            boxShadow: `0 0 6px ${i % 3 === 0 ? "#d946ef" : i % 3 === 1 ? "#a855f7" : "#22d3ee"}`,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.5],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3,
            delay: i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Speed/motion lines */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`speed-${i}`}
          className="absolute rounded-full"
          style={{
            width: 50 + i * 20,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? "#d946ef" : "#06b6d4"}40, transparent)`,
            left: -80 - i * 25,
            top: `${30 + i * 18}%`,
            transform: "rotate(-45deg)",
          }}
          animate={{
            opacity: [0, 0.5, 0],
            x: [0, 50, 100],
          }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </motion.div>
  );
};

export default Rocket;
