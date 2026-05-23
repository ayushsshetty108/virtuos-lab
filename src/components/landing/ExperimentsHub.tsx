"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EXPERIMENTS } from "@/lib/experiments";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { GlowButton } from "@/components/ui/GlowButton";

const colorMap: Record<string, string> = {
  cyan: "text-cyan-400 border-cyan-500/30",
  violet: "text-violet-400 border-violet-500/30",
  pink: "text-pink-400 border-pink-500/30",
  emerald: "text-emerald-400 border-emerald-500/30",
};

export function ExperimentsHub() {
  return (
    <section id="experiments" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl text-center mb-16">
        <p className="text-xs tracking-[0.4em] text-cyan-500/80 mb-4">VIRTUAL LABORATORY</p>
        <h2 className="font-[family-name:var(--font-orbitron)] text-3xl font-bold text-white sm:text-5xl">
          Explore{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Experiments
          </span>
        </h2>
        <p className="mt-6 max-w-2xl mx-auto text-slate-400">
          Launch interactive 3D physics and chemistry simulations — fully functional and ready to explore.
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {EXPERIMENTS.map((exp, i) => {
          const Icon = exp.icon;
          return (
            <Link key={exp.id} href={exp.href}>
              <GlassPanel
                holographic={i % 2 === 0}
                delay={i * 0.06}
                className="h-full group cursor-pointer hover:border-cyan-500/40 transition-all duration-300"
              >
                <div className={`inline-flex rounded-xl border p-3 mb-4 ${colorMap[exp.color]}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-[family-name:var(--font-orbitron)] text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {exp.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">{exp.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-600 tracking-wider">{exp.duration}</span>
                  <motion.span
                    className="inline-flex items-center gap-1 text-xs text-cyan-400"
                    whileHover={{ x: 4 }}
                  >
                    Start <ArrowRight className="h-3 w-3" />
                  </motion.span>
                </div>
              </GlassPanel>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-4">
        <GlowButton variant="primary" href="/dashboard">
          Open Dashboard
        </GlowButton>
        <GlowButton variant="secondary" href="/ai-assistant">
          AI Assistant
        </GlowButton>
      </div>
    </section>
  );
}
