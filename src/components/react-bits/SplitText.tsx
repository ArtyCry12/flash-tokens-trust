"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words";
  threshold?: number;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
};

export default function SplitText({
  text,
  className = "",
  delay = 50,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  threshold = 0.15,
  tag: Tag = "p",
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const parts =
      splitType === "words"
        ? text.split(" ").map((w) => w + "\u00A0")
        : text.split("");

    el.innerHTML = parts
      .map(
        (part) =>
          `<span class="split-part inline-block" style="opacity:0;transform:translateY(24px)">${part === " " ? "&nbsp;" : part}</span>`
      )
      .join(splitType === "words" ? "" : "");

    const targets = el.querySelectorAll(".split-part");
    const startPct = (1 - threshold) * 100;

    const tween = gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration,
      ease,
      stagger: delay / 1000,
      scrollTrigger: {
        trigger: el,
        start: `top ${startPct}%`,
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [text, delay, duration, ease, splitType, threshold]);

  return (
    <Tag
      ref={ref as never}
      className={`split-parent overflow-hidden ${className}`}
    >
      {text}
    </Tag>
  );
}
