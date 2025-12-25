"use client";
import { motion } from "motion/react";
import { useMemo } from "react";

const SplitText = ({
  text = "",
  className = "",
  delay = 0,
  duration = 0.05,
  ease = "easeOut",
  splitBy = "char", // "char" | "word"
  animation = "fadeUp", // "fadeUp" | "fadeIn" | "scale" | "blur" | "wave" | "bounce" | "glitch"
  stagger = 0.03,
  once = true,
}) => {
  const items = useMemo(() => {
    if (splitBy === "word") {
      return text.split(" ").map((word, i, arr) =>
        i < arr.length - 1 ? word + "\u00A0" : word
      );
    }
    return text.split("");
  }, [text, splitBy]);

  // Different animation presets
  const animations = {
    fadeUp: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0 },
      visible: { opacity: 1, scale: 1 },
    },
    blur: {
      hidden: { opacity: 0, filter: "blur(12px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
    },
    wave: {
      hidden: { opacity: 0, y: 20, rotateZ: -10 },
      visible: { opacity: 1, y: 0, rotateZ: 0 },
    },
    bounce: {
      hidden: { opacity: 0, y: -50, scale: 0.5 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", damping: 12, stiffness: 200 }
      },
    },
    glitch: {
      hidden: { opacity: 0, x: -20, skewX: 20 },
      visible: { opacity: 1, x: 0, skewX: 0 },
    },
  };

  const selectedAnimation = animations[animation] || animations.fadeUp;

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {items.map((item, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: selectedAnimation.hidden,
            visible: {
              ...selectedAnimation.visible,
              transition: {
                duration,
                ease,
                delay: delay + i * stagger,
                ...selectedAnimation.visible?.transition,
              },
            },
          }}
          style={{
            whiteSpace: "pre",
            willChange: "transform, opacity, filter",
          }}
        >
          {item === " " ? "\u00A0" : item}
        </motion.span>
      ))}
    </span>
  );
};

export default SplitText;
