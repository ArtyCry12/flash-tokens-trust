"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";
import { useState } from "react";
import "./Dock.css";

export type DockItemData = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

function DockItemButton({
  item,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
}: {
  item: DockItemData;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  spring: { mass: number; stiffness: number; damping: number };
  distance: number;
  magnification: number;
  baseItemSize: number;
}) {
  const [hovered, setHovered] = useState(false);

  const mouseDistance = useTransform(mouseX, (val) => {
    if (typeof val !== "number" || !Number.isFinite(val)) return 0;
    return val;
  });

  const size = useSpring(
    useTransform(mouseDistance, [-distance, 0, distance], [
      baseItemSize,
      magnification,
      baseItemSize,
    ]),
    spring,
  );

  return (
    <motion.button
      type="button"
      style={{ width: size, height: size }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={item.onClick}
      className="dock-item"
      aria-label={item.label}
    >
      <span className="dock-icon">{item.icon}</span>
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="dock-label"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default function Dock({
  items,
  className = "",
  magnification = 64,
  distance = 200,
  panelHeight = 68,
  baseItemSize = 48,
}: {
  items: DockItemData[];
  className?: string;
  magnification?: number;
  distance?: number;
  panelHeight?: number;
  dockHeight?: number;
  baseItemSize?: number;
}) {
  const mouseX = useMotionValue(Infinity);
  const spring = { mass: 0.1, stiffness: 150, damping: 12 };

  return (
    <div className={`dock-outer ${className}`} style={{ height: panelHeight + 24 }}>
      <div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="dock-panel"
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Navigation dock"
      >
        {items.map((item) => (
          <DockItemButton
            key={item.label}
            item={item}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          />
        ))}
      </div>
    </div>
  );
}
