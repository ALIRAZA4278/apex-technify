"use client";
import { motion } from "motion/react";

const Rocket = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
      className="relative flex items-center justify-center"
    >
      {/* Rotating squares - CSS animation for better performance */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="absolute w-[340px] h-[340px] border border-[#d946ef]/20 rounded-xl animate-spin"
          style={{ animationDuration: '20s' }}
        />
        <div
          className="absolute w-[290px] h-[290px] border border-[#a855f7]/25 rounded-xl animate-spin"
          style={{ animationDuration: '25s', animationDirection: 'reverse' }}
        />
        <div
          className="absolute w-[380px] h-[380px] border border-[#06b6d4]/15 rounded-xl animate-spin"
          style={{ animationDuration: '18s' }}
        />
      </div>

      {/* Background glow */}
      <motion.div
        className="absolute"
        style={{
          width: 350,
          height: 350,
          background: "radial-gradient(circle, rgba(217,70,239,0.35) 0%, rgba(6,182,212,0.2) 40%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{ opacity: [0.6, 0.8, 0.6], scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Rocket with floating animation */}
      <motion.div
        className="relative"
        style={{
          filter: "drop-shadow(0 0 40px rgba(217,70,239,0.5)) drop-shadow(0 0 80px rgba(6,182,212,0.3))",
          transform: "rotate(30deg)",
        }}
        animate={{ y: [-6, 6, -6], x: [-2, 2, -2], rotate: [29, 31, 29] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width="260"
          height="340"
          viewBox="0 0 260 340"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="mainGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9333ea" />
              <stop offset="25%" stopColor="#c026d3" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="75%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="shadeGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
            </linearGradient>
            <linearGradient id="highlightGrad" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <radialGradient id="windowGrad" cx="30%" cy="30%">
              <stop offset="0%" stopColor="#312e81" />
              <stop offset="100%" stopColor="#0a0a0f" />
            </radialGradient>
            <linearGradient id="tipGrad" x1="50%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
            <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Main rocket body */}
          <path
            d="M130 15 C130 15 185 75 185 160 L185 230 Q185 245 130 260 Q75 245 75 230 L75 160 C75 75 130 15 130 15Z"
            fill="url(#mainGrad)"
          />
          <path
            d="M130 15 C130 15 185 75 185 160 L185 230 Q185 245 130 260 Q75 245 75 230 L75 160 C75 75 130 15 130 15Z"
            fill="url(#shadeGrad)"
          />
          <path
            d="M130 20 C115 45 90 90 90 160 L90 225 Q88 235 85 238 L75 230 L75 160 C75 75 130 15 130 15Z"
            fill="url(#highlightGrad)"
          />

          {/* Nose cone */}
          <path
            d="M130 15 C135 30 145 50 150 75 L130 80 L110 75 C115 50 125 30 130 15Z"
            fill="url(#tipGrad)"
            opacity="0.9"
          />
          <ellipse cx="125" cy="45" rx="6" ry="12" fill="white" opacity="0.15" />

          {/* Window */}
          <circle cx="130" cy="145" r="38" fill="#1a1625" />
          <circle cx="130" cy="145" r="34" fill="none" stroke="url(#mainGrad)" strokeWidth="4" />
          <circle cx="130" cy="145" r="30" fill="#0f0a18" />
          <circle cx="130" cy="145" r="26" fill="url(#windowGrad)" />
          <ellipse cx="120" cy="135" rx="12" ry="10" fill="#818cf8" opacity="0.15" />
          <circle cx="116" cy="132" r="5" fill="#c4b5fd" opacity="0.3" />

          {/* Decorative dots */}
          <circle cx="110" cy="85" r="5" fill="#f0abfc" opacity="0.8" filter="url(#softGlow)" />
          <circle cx="130" cy="75" r="5" fill="#c4b5fd" opacity="0.8" filter="url(#softGlow)" />
          <circle cx="150" cy="85" r="5" fill="#22d3ee" opacity="0.8" filter="url(#softGlow)" />

          {/* Body details */}
          <rect x="82" y="200" width="96" height="4" rx="2" fill="#06b6d4" opacity="0.6" />
          <rect x="88" y="215" width="84" height="3" rx="1.5" fill="#a855f7" opacity="0.4" />

          {/* Fins */}
          <path d="M75 195 C55 220 35 260 30 295 L45 295 Q60 265 75 235Z" fill="url(#mainGrad)" />
          <path d="M185 195 C205 220 225 260 230 295 L215 295 Q200 265 185 235Z" fill="url(#mainGrad)" />
          <path d="M110 245 L130 310 L150 245 Q140 255 130 255 Q120 255 110 245Z" fill="url(#tipGrad)" />

          {/* Exhaust */}
          <ellipse cx="130" cy="258" rx="28" ry="10" fill="#1a1625" />
          <ellipse cx="130" cy="258" rx="20" ry="6" fill="#0a0a0f" />
        </svg>

        {/* Simple exhaust effect */}
        <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2">
          <svg width="80" height="60" viewBox="0 0 80 60">
            {[0, 1, 2].map((i) => (
              <rect
                key={i}
                x={20 + i * 6}
                y={5 + i * 12}
                width={20 - i * 4}
                height={4}
                rx={2}
                fill="#d946ef"
                opacity={0.6 - i * 0.15}
                className="animate-pulse"
              />
            ))}
          </svg>
        </div>
      </motion.div>

      {/* Minimal floating particles */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 4,
            height: 4,
            background: i % 2 === 0 ? "#d946ef" : "#22d3ee",
            left: `${15 + i * 20}%`,
            top: `${20 + i * 15}%`,
          }}
          animate={{ opacity: [0, 0.6, 0], y: [0, -10, 0] }}
          transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </motion.div>
  );
};

export default Rocket;
