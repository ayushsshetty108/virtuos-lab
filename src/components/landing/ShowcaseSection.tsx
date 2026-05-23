"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  "Real-time physics engine with live graph visualization",
  "Glowing liquid shaders and animated chemical reactions",
  "Holographic AI assistant with voice wave animations",
  "Multiplayer collaboration and experiment sharing",
  "VR-ready architecture for headset experiences",
  "Gamified XP, badges, and global leaderboard",
];

export function ShowcaseSection() {
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!panelRef.current) return;

    gsap.fromTo(
      panelRef.current,
      { x: -80, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: panelRef.current,
          start: "top 70%",
        },
      }
    );

    if (listRef.current) {
      gsap.fromTo(
        listRef.current.children,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 75%",
          },
        }
      );
    }
  }, []);

  return (
    <section className="relative px-6 py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[120px]" />
      <div className="absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-violet-500/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
        <div ref={panelRef} className="relative">
          <div className="gradient-border rounded-3xl">
            <div className="glass-strong rounded-3xl p-8 sm:p-12 holographic">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-3 w-3 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs tracking-widest text-cyan-400/80 font-mono">
                  JARVIS LAB ASSISTANT — ONLINE
                </span>
              </div>

              <div className="space-y-4 font-mono text-sm">
                <motion.p
                  className="text-cyan-300/90"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {">"} Initializing quantum chemistry module...
                </motion.p>
                <motion.p
                  className="text-violet-300/80"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  {">"} Loading molecular structure: C₆H₁₂O₆
                </motion.p>
                <motion.p
                  className="text-slate-400"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  {">"} Ready. Welcome to Virtuos Lab, Commander.
                </motion.p>
              </div>

              <div className="mt-10 flex items-end gap-1 h-12">
                {Array.from({ length: 24 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 rounded-full bg-gradient-to-t from-cyan-500 to-violet-500"
                    animate={{ height: [8, 20 + Math.random() * 28, 8] }}
                    transition={{
                      duration: 0.8 + Math.random() * 0.4,
                      repeat: Infinity,
                      delay: i * 0.05,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs tracking-[0.4em] text-violet-400/80 mb-4">IMMERSIVE EXPERIENCE</p>
          <h2 className="font-[family-name:var(--font-orbitron)] text-3xl font-bold text-white sm:text-4xl mb-6">
            Your Personal
            <br />
            <span className="text-glow-cyan text-cyan-400">AI Science Commander</span>
          </h2>
          <p className="text-slate-400 mb-10 leading-relaxed">
            Navigate experiments with voice control, receive cinematic explanations,
            and watch reactions unfold in stunning 3D — like having Tony Stark&apos;s lab at your fingertips.
          </p>

          <div className="mb-8 flex flex-wrap gap-3">
            <GlowButton variant="primary" href="/ai-assistant">
              AI Assistant
            </GlowButton>
            <GlowButton variant="secondary" href="/dashboard">
              Open Dashboard
            </GlowButton>
          </div>

          <ul ref={listRef} className="space-y-4">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-slate-300">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20">
                  <Check className="h-3 w-3 text-cyan-400" />
                </span>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
