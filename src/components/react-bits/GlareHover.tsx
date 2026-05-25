"use client";

import type { CSSProperties, ReactNode } from "react";
import "./GlareHover.css";

export default function GlareHover({
  width = "100%",
  height = "auto",
  background = "#111",
  borderRadius = "16px",
  borderColor = "#333",
  children,
  glareColor = "#ffffff",
  glareOpacity = 0.35,
  glareAngle = -30,
  glareSize = 300,
  transitionDuration = 800,
  className = "",
  style = {},
}: {
  width?: string;
  height?: string;
  background?: string;
  borderRadius?: string;
  borderColor?: string;
  children?: ReactNode;
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  glareSize?: number;
  transitionDuration?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const hex = glareColor.replace("#", "");
  let rgba = glareColor;
  if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  }

  const vars: CSSProperties = {
    ["--gh-width" as string]: width,
    ["--gh-height" as string]: height,
    ["--gh-bg" as string]: background,
    ["--gh-br" as string]: borderRadius,
    ["--gh-angle" as string]: `${glareAngle}deg`,
    ["--gh-duration" as string]: `${transitionDuration}ms`,
    ["--gh-size" as string]: `${glareSize}%`,
    ["--gh-rgba" as string]: rgba,
    ["--gh-border" as string]: borderColor,
    ...style,
  };

  return (
    <div className={`glare-hover ${className}`} style={vars}>
      {children}
    </div>
  );
}
