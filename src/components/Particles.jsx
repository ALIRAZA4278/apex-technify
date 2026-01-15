"use client";
import { useRef, useEffect, useState } from "react";

const Particles = ({
  className = "",
  particleCount = 25,
  speed = 0.08,
  particleColors = ["#d946ef", "#a855f7", "#06b6d4"],
  alphaParticles = true,
  sizeRandomness = 1,
  backgroundColor = "transparent",
}) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  // Handle visibility change to pause animation when tab is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    // Check for reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });

    // Reduce particle count on mobile
    const isMobile = window.innerWidth < 768;
    const actualParticleCount = isMobile ? Math.min(particleCount, 10) : particleCount;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < actualParticleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * sizeRandomness + 1.5,
          speedX: (Math.random() - 0.5) * speed,
          speedY: (Math.random() - 0.5) * speed,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          alpha: alphaParticles ? Math.random() * 0.4 + 0.2 : 1,
        });
      }
    };

    let lastTime = 0;
    const fps = 30; // Limit to 30fps for better performance
    const interval = 1000 / fps;

    const drawParticles = (currentTime) => {
      // Skip if tab not visible
      if (!isVisible) {
        animationRef.current = requestAnimationFrame(drawParticles);
        return;
      }

      const delta = currentTime - lastTime;

      if (delta >= interval) {
        lastTime = currentTime - (delta % interval);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particlesRef.current.forEach((particle) => {
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.globalAlpha = particle.alpha;
          ctx.fill();
        });

        ctx.globalAlpha = 1;
      }

      animationRef.current = requestAnimationFrame(drawParticles);
    };

    resizeCanvas();
    createParticles();
    animationRef.current = requestAnimationFrame(drawParticles);

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [particleCount, speed, particleColors, alphaParticles, sizeRandomness, isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ backgroundColor }}
    />
  );
};

export default Particles;
