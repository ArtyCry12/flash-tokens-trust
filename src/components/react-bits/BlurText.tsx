"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState, useMemo } from "react";

export default function BlurText({
  text = "",
  delay = 150,
  className = "",
  animateBy = "words" as "words" | "letters",
  direction = "top" as "top" | "bottom",
  threshold = 0.1,
  stepDuration = 0.35,
}: {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  stepDuration?: number;
}) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  const from = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -30 }
        : { filter: "blur(10px)", opacity: 0, y: 30 },
    [direction]
  );
  const to = { filter: "blur(0px)", opacity: 1, y: 0 };

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {elements.map((segment, index) => (
        <motion.span
          key={`${segment}-${index}`}
          className="inline-block will-change-[transform,filter,opacity]"
          initial={from}
          animate={inView ? to : from}
          transition={{
            duration: stepDuration,
            delay: (index * delay) / 1000,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {segment === " " ? "\u00A0" : segment}
          {animateBy === "words" && index < elements.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </p>
  );
}
