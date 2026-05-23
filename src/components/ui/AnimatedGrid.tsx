"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function AnimatedGrid() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      backgroundPosition: "60px 60px",
      duration: 20,
      repeat: -1,
      ease: "none",
    });
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 grid-bg opacity-60"
      aria-hidden
    />
  );
}
