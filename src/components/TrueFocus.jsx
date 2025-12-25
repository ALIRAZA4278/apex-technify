"use client";
import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

const TrueFocus = ({
  sentence = 'True Focus',
  separator = ' ',
  manualMode = false,
  blurAmount = 5,
  borderColor = '#d946ef',
  glowColor = 'rgba(217, 70, 239, 0.6)',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  textClassName = '',
  containerClassName = '',
}) => {
  const words = sentence.split(separator);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState(null);
  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(
        () => {
          setCurrentIndex(prev => (prev + 1) % words.length);
        },
        (animationDuration + pauseBetweenAnimations) * 1000
      );

      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    if (currentIndex === null || currentIndex === -1) return;
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex].getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height
    });
  }, [currentIndex, words.length]);

  const handleMouseEnter = index => {
    if (manualMode) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode) {
      setCurrentIndex(lastActiveIndex);
    }
  };

  return (
    <div
      className={`relative flex gap-0 justify-center items-center flex-wrap ${containerClassName}`}
      ref={containerRef}
      style={{
        outline: 'none',
        userSelect: 'none',
        fontFamily: "var(--font-sora), 'Sora', sans-serif",
      }}
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        // Apply gradient to "Technify" (second word)
        const isGradient = index === 1;

        return (
          <span
            key={index}
            ref={el => (wordRefs.current[index] = el)}
            className={`relative cursor-pointer ${textClassName}`}
            style={{
              filter: isActive ? `blur(0px)` : `blur(${blurAmount}px)`,
              '--border-color': borderColor,
              '--glow-color': glowColor,
              transition: `filter ${animationDuration}s ease`,
              outline: 'none',
              userSelect: 'none',
              ...(isGradient ? {
                background: 'linear-gradient(90deg, #d946ef 0%, #a855f7 50%, #06b6d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              } : {
                color: '#ffffff',
              }),
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        className="absolute top-0 left-0 pointer-events-none box-border border-0"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 ? 1 : 0
        }}
        transition={{
          duration: animationDuration,
          ease: "easeInOut"
        }}
        style={{
          '--border-color': borderColor,
          '--glow-color': glowColor
        }}
      >
        {/* Top Left Corner */}
        <span
          className="absolute w-5 h-5 border-[3px] rounded-[3px] top-[-12px] left-[-12px] border-r-0 border-b-0"
          style={{
            borderColor: 'var(--border-color)',
            filter: 'drop-shadow(0 0 6px var(--glow-color))'
          }}
        />
        {/* Top Right Corner */}
        <span
          className="absolute w-5 h-5 border-[3px] rounded-[3px] top-[-12px] right-[-12px] border-l-0 border-b-0"
          style={{
            borderColor: 'var(--border-color)',
            filter: 'drop-shadow(0 0 6px var(--glow-color))'
          }}
        />
        {/* Bottom Left Corner */}
        <span
          className="absolute w-5 h-5 border-[3px] rounded-[3px] bottom-[-12px] left-[-12px] border-r-0 border-t-0"
          style={{
            borderColor: 'var(--border-color)',
            filter: 'drop-shadow(0 0 6px var(--glow-color))'
          }}
        />
        {/* Bottom Right Corner */}
        <span
          className="absolute w-5 h-5 border-[3px] rounded-[3px] bottom-[-12px] right-[-12px] border-l-0 border-t-0"
          style={{
            borderColor: 'var(--border-color)',
            filter: 'drop-shadow(0 0 6px var(--glow-color))'
          }}
        />
      </motion.div>
    </div>
  );
};

export default TrueFocus;
