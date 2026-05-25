"use client";

import { motion, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";
import "./Counter.css";

function Number({
  mv,
  number,
  height,
}: {
  mv: ReturnType<typeof useSpring>;
  number: number;
  height: number;
}) {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) memo -= 10 * height;
    return memo;
  });
  return (
    <motion.span className="counter-number" style={{ y }}>
      {number}
    </motion.span>
  );
}

function Digit({
  place,
  value,
  height,
}: {
  place: number;
  value: number;
  height: number;
}) {
  const valueRounded = Math.floor(value / place);
  const animatedValue = useSpring(valueRounded);
  useEffect(() => {
    animatedValue.set(valueRounded);
  }, [animatedValue, valueRounded]);

  return (
    <span className="counter-digit" style={{ height }}>
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </span>
  );
}

export default function Counter({
  value,
  fontSize = 72,
  padding = 4,
  places = [10, 1],
  textColor = "white",
  fontWeight = 900,
}: {
  value: number;
  fontSize?: number;
  padding?: number;
  places?: number[];
  textColor?: string;
  fontWeight?: string | number;
}) {
  const height = fontSize + padding;
  return (
    <span className="counter-container">
      <span
        className="counter-counter"
        style={{ fontSize, color: textColor, fontWeight, gap: 8 }}
      >
        {places.map((place) => (
          <Digit key={place} place={place} value={value} height={height} />
        ))}
      </span>
    </span>
  );
}
