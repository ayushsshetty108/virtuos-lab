"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";
import { AnimatedGrid } from "@/components/ui/AnimatedGrid";
import { useMouseParallax } from "@/hooks/useMouseParallax";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-[#030712]" /> }
);

const stats = [
  { value: "50+", label: "Experiments" },
  { value: "12K", label: "Students" },
  { value: "99%", label: "Accuracy" },
  { value: "24/7", label: "AI Tutor" },
];

export function HeroSection() {
  const mouse = useMouseParallax(0.5);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1.4 });

    if (badgeRef.current) {
      tl.fromTo(badgeRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });
    }
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll(".char");
      tl.fromTo(
        chars,
        { y: 80, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.04,
          ease: "back.out(1.4)",
        },
        "-=0.2"
      );
    }
    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.4");
    }
    if (ctaRef.current) {
      tl.fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3");
    }
    if (statsRef.current) {
      tl.fromTo(
        statsRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        "-=0.2"
      );
    }
  }, []);

  const titleLine1 = "VIRTUAL SCIENCE";
  const titleLine2 = "REIMAGINED";

  return (
    <section className="relative min-h-screen overflow-hidden">
      <AnimatedGrid />
      <HeroScene mouse={mouse} />

      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${50 + mouse.x * 20}% ${50 + mouse.y * 20}%, rgba(0,240,255,0.15), transparent 60%)`,
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
        <div ref={badgeRef} className="mb-8 opacity-0">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs tracking-widest text-cyan-300"
            animate={{ boxShadow: ["0 0 20px rgba(0,240,255,0.1)", "0 0 30px rgba(0,240,255,0.25)", "0 0 20px rgba(0,240,255,0.1)"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI-POWERED IMMERSIVE LABORATORY
          </motion.div>
        </div>

        <h1
          ref={titleRef}
          className="max-w-5xl font-[family-name:var(--font-orbitron)] text-4xl font-black leading-tight tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ perspective: "600px" }}
        >
          <span className="block text-white">
            {titleLine1.split("").map((c, i) => (
              <span key={`l1-${i}`} className="char inline-block" style={{ transformStyle: "preserve-3d" }}>
                {c === " " ? "\u00A0" : c}
              </span>
            ))}
          </span>
          <span className="block bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent text-glow-cyan">
            {titleLine2.split("").map((c, i) => (
              <span key={`l2-${i}`} className="char inline-block">
                {c === " " ? "\u00A0" : c}
              </span>
            ))}
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="mt-8 max-w-2xl text-lg text-slate-400 opacity-0 sm:text-xl"
        >
          Step inside a cinematic 3D science metaverse. Run physics simulations,
          chemistry experiments, and learn with your AI lab companion — Jarvis for science.
        </p>

        <div ref={ctaRef} className="mt-10 flex flex-wrap items-center justify-center gap-4 opacity-0">
          <GlowButton variant="primary" href="/experiments/projectile-motion">
            <Play className="h-4 w-4" />
            Start Experiment
          </GlowButton>
          <GlowButton variant="secondary" href="/#experiments">
            Explore Experiments
            <ArrowRight className="h-4 w-4" />
          </GlowButton>
        </div>

        <div
          ref={statsRef}
          className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-12"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="opacity-0">
              <p className="font-[family-name:var(--font-orbitron)] text-2xl font-bold text-cyan-400 sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs tracking-wider text-slate-500 uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2 text-slate-600">
          <span className="text-[10px] tracking-[0.3em]">SCROLL</span>
          <div className="h-8 w-px bg-gradient-to-b from-cyan-500/50 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
