"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./BounceCards.css";

type BounceCardsProps = {
  className?: string;
  images: string[];
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
};

export default function BounceCards({
  className = "",
  images,
  containerWidth = 500,
  containerHeight = 280,
  animationDelay = 0.5,
  animationStagger = 0.08,
  easeType = "elastic.out(1, 0.8)",
  transformStyles = [
    "rotate(10deg) translate(-170px)",
    "rotate(5deg) translate(-85px)",
    "rotate(-3deg)",
    "rotate(-10deg) translate(85px)",
    "rotate(2deg) translate(170px)",
  ],
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bounce-card-item",
        { scale: 0 },
        {
          scale: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay,
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [animationStagger, easeType, animationDelay]);

  return (
    <div
      className={`bounceCardsContainer ${className}`}
      ref={containerRef}
      style={{ width: containerWidth, height: containerHeight }}
    >
      {images.map((src, idx) => (
        <div
          key={src}
          className={`card bounce-card-item card-${idx}`}
          style={{ transform: transformStyles[idx] ?? "none" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="image" src={src} alt="" />
        </div>
      ))}
    </div>
  );
}
