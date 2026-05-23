"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Atom, Beaker, Brain, CircuitBoard, Microscope, Waves } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Atom,
    title: "Physics Simulations",
    description:
      "Projectile motion, pendulums, circuits — all with real-time calculations.",
    color: "cyan",
    href: "/experiments/projectile-motion",
  },
  {
    icon: Beaker,
    title: "Chemistry Lab",
    description:
      "Acid-base reactions, glowing liquids, smoke effects, and color-changing mixes.",
    color: "violet",
    href: "/experiments/chemistry-lab",
  },
  {
    icon: Brain,
    title: "AI Lab Companion",
    description:
      "Voice-guided walkthroughs, real-time explanations, and doubt-solving.",
    color: "pink",
    href: "/ai-assistant",
  },
  {
    icon: Microscope,
    title: "Molecular Viewer",
    description:
      "Interactive 3D molecules with bonds, rotation, and zoom controls.",
    color: "emerald",
    href: "/experiments/molecular-viewer",
  },
  {
    icon: CircuitBoard,
    title: "Circuit Builder",
    description:
      "Drag components, connect wires, and watch current flow in real time.",
    color: "cyan",
    href: "/experiments/circuit-builder",
  },
  {
    icon: Waves,
    title: "Pendulum Lab",
    description:
      "Realistic swinging motion with gravity, damping, and speed controls.",
    color: "violet",
    href: "/experiments/pendulum",
  },
];

const colorMap: Record<string, string> = {
  cyan: "text-cyan-400 border-cyan-500/30 shadow-[0_0_30px_rgba(0,240,255,0.15)]",
  violet: "text-violet-400 border-violet-500/30 shadow-[0_0_30px_rgba(139,92,246,0.15)]",
  pink: "text-pink-400 border-pink-500/30 shadow-[0_0_30px_rgba(236,72,153,0.15)]",
  emerald: "text-emerald-400 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)]",
};

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current) return;

    gsap.fromTo(
      headingRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="relative px-6 py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />

      <div ref={headingRef} className="mx-auto max-w-7xl text-center mb-20">
        <p className="text-xs tracking-[0.4em] text-cyan-500/80 mb-4">PLATFORM CAPABILITIES</p>
        <h2 className="font-[family-name:var(--font-orbitron)] text-3xl font-bold text-white sm:text-5xl">
          Science,{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Elevated
          </span>
        </h2>
        <p className="mt-6 max-w-2xl mx-auto text-slate-400">
          A premium virtual laboratory built for the next generation of curious minds.
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <Link key={feature.title} href={feature.href}>
              <GlassPanel
                holographic={i % 2 === 0}
                delay={i * 0.08}
                className="h-full group cursor-pointer hover:border-cyan-500/30 transition-all duration-500"
              >
                <div
                  className={`mb-5 inline-flex rounded-xl border p-3 ${colorMap[feature.color]}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-[family-name:var(--font-orbitron)] text-lg font-semibold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  {feature.description}
                </p>
                <span className="inline-flex items-center gap-1 text-xs text-cyan-400">
                  Learn More <ArrowRight className="h-3 w-3" />
                </span>
              </GlassPanel>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
