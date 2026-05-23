"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const logoRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    if (logoRef.current) {
      tl.fromTo(
        logoRef.current,
        { scale: 0, opacity: 0, rotation: -180 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: "back.out(1.7)" }
      );
    }

    if (ringRef.current) {
      gsap.to(ringRef.current, {
        rotation: 360,
        duration: 2,
        repeat: -1,
        ease: "none",
      });
    }

    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 12 + 4;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(onComplete, 600);
      }
      setProgress(Math.min(p, 100));
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#030712]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-cyan-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div ref={logoRef} className="relative mb-12 flex flex-col items-center">
        <div
          ref={ringRef}
          className="absolute -inset-8 rounded-full border border-cyan-500/30"
          style={{
            background:
              "conic-gradient(from 0deg, transparent, #00f0ff40, transparent, #8b5cf640, transparent)",
          }}
        />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl glass-strong">
          <span className="font-[family-name:var(--font-orbitron)] text-3xl font-bold text-glow-cyan text-cyan-400">
            V
          </span>
        </div>
        <p className="mt-6 font-[family-name:var(--font-orbitron)] text-sm tracking-[0.4em] text-cyan-400/80">
          VIRTUOS LAB
        </p>
      </div>

      <div className="w-64">
        <div className="mb-2 flex justify-between text-xs text-slate-500">
          <span>Initializing quantum environment</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-0.5 overflow-hidden rounded-full bg-slate-800">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 to-cyan-500"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>
      </div>

      <motion.p
        className="mt-8 text-xs tracking-widest text-slate-600"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        LOADING IMMERSIVE LABORATORY
      </motion.p>
    </motion.div>
  );
}
