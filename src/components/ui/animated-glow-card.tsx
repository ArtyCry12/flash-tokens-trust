"use client";

import type { ReactNode } from "react";
import "./animated-glow-card.css";

export function AnimatedGlowCard({
  children,
  className = "",
  label,
}: {
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div className={`glow-card ${className}`}>
      <div className="glow-card-inner">
        {label && (
          <p className="border-b border-white/10 px-4 py-2 text-center text-xs font-medium uppercase tracking-widest text-white/70">
            {label}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
