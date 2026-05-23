"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import {
  ArrowLeft,
  Award,
  Beaker,
  Brain,
  Trophy,
  Zap,
} from "lucide-react";
import { EXPERIMENTS } from "@/lib/experiments";
import { getProgress, type UserProgress } from "@/lib/progress";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { GlowButton } from "@/components/ui/GlowButton";

const LEADERBOARD = [
  { name: "Nova Chen", xp: 4200, rank: 1 },
  { name: "Alex Rivera", xp: 3850, rank: 2 },
  { name: "You", xp: 0, rank: 3 },
  { name: "Sam Okonkwo", xp: 2900, rank: 4 },
  { name: "Mira Patel", xp: 2650, rank: 5 },
];

const AI_TIPS = [
  "Try the Pendulum lab to understand harmonic motion.",
  "Complete Circuit Builder to unlock the Explorer badge.",
  "Ask the AI Assistant to explain projectile range equations.",
];

export function DashboardView() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
    gsap.fromTo(".dash-card", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 });
  }, []);

  const completed = progress?.completedExperiments.length ?? 0;
  const total = EXPERIMENTS.length;
  const pct = Math.round((completed / total) * 100);
  const xp = progress?.xp ?? 0;

  const board = LEADERBOARD.map((e) =>
    e.name === "You" ? { ...e, xp: Math.max(xp, e.xp) } : e
  ).sort((a, b) => b.xp - a.xp);

  return (
    <div className="min-h-screen bg-[#030712] px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-10">
          <Link href="/" className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-cyan-400">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Lab
          </Link>
          <GlowButton variant="primary" href="/ai-assistant">
            <Brain className="h-4 w-4" /> AI Assistant
          </GlowButton>
        </div>

        <h1 className="font-[family-name:var(--font-orbitron)] text-3xl sm:text-4xl font-bold text-white mb-2">
          Command <span className="text-cyan-400">Dashboard</span>
        </h1>
        <p className="text-slate-400 mb-12">Track progress, achievements, and AI recommendations.</p>

        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <GlassPanel className="dash-card lg:col-span-2">
            <p className="text-[10px] tracking-widest text-cyan-500 mb-4">OVERALL PROGRESS</p>
            <div className="flex items-end gap-4 mb-4">
              <span className="font-[family-name:var(--font-orbitron)] text-5xl font-bold text-white">{pct}%</span>
              <span className="text-slate-500 pb-2">{completed}/{total} experiments</span>
            </div>
            <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-violet-500"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <p className="mt-4 text-sm text-slate-400 flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-400" /> {xp} XP earned
            </p>
          </GlassPanel>

          <GlassPanel className="dash-card holographic">
            <p className="text-[10px] tracking-widest text-violet-400 mb-4">AI RECOMMENDATION</p>
            <p className="text-sm text-slate-300 leading-relaxed">
              {AI_TIPS[completed % AI_TIPS.length]}
            </p>
            <GlowButton variant="secondary" href="/ai-assistant" className="mt-4 !px-4 !py-2 text-xs">
              Ask AI Tutor
            </GlowButton>
          </GlassPanel>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <GlassPanel className="dash-card">
            <p className="text-[10px] tracking-widest text-cyan-500 mb-4 flex items-center gap-2">
              <Beaker className="h-4 w-4" /> EXPERIMENTS
            </p>
            <ul className="space-y-3">
              {EXPERIMENTS.map((exp) => {
                const done = progress?.completedExperiments.includes(exp.id);
                return (
                  <li key={exp.id}>
                    <Link
                      href={exp.href}
                      className="flex items-center justify-between rounded-xl border border-white/5 p-3 hover:border-cyan-500/30 transition-colors"
                    >
                      <span className="text-sm text-slate-300">{exp.title}</span>
                      <span className={`text-xs ${done ? "text-emerald-400" : "text-slate-600"}`}>
                        {done ? "Completed" : "Start →"}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </GlassPanel>

          <div className="space-y-6">
            <GlassPanel className="dash-card">
              <p className="text-[10px] tracking-widest text-pink-400 mb-4 flex items-center gap-2">
                <Trophy className="h-4 w-4" /> LEADERBOARD
              </p>
              <ul className="space-y-2">
                {board.map((entry, i) => (
                  <li key={entry.name} className="flex justify-between text-sm py-2 border-b border-white/5">
                    <span className="text-slate-400">#{i + 1} {entry.name}</span>
                    <span className="font-mono text-cyan-300">{entry.xp} XP</span>
                  </li>
                ))}
              </ul>
            </GlassPanel>

            <GlassPanel className="dash-card">
              <p className="text-[10px] tracking-widest text-emerald-400 mb-4 flex items-center gap-2">
                <Award className="h-4 w-4" /> ACHIEVEMENTS
              </p>
              <div className="flex flex-wrap gap-2">
                {(progress?.achievements.length
                  ? progress.achievements
                  : ["none"]
                ).map((a) => (
                  <span
                    key={a}
                    className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300"
                  >
                    {a === "none" ? "Complete an experiment to earn badges" : a.replace(/-/g, " ")}
                  </span>
                ))}
              </div>
            </GlassPanel>
          </div>
        </div>
      </div>
    </div>
  );
}
