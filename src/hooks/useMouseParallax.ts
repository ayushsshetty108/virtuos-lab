"use client";

import { useEffect, useState } from "react";

export function useMouseParallax(intensity = 1) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2 * intensity;
      const y = (e.clientY / window.innerHeight - 0.5) * 2 * intensity;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [intensity]);

  return mouse;
}
