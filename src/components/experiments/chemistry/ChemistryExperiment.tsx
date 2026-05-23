"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { FlaskConical, RotateCcw } from "lucide-react";
import { ExperimentShell } from "@/components/layout/ExperimentShell";
import { GlowButton } from "@/components/ui/GlowButton";

const ChemistryScene = dynamic(
  () => import("./ChemistryScene").then((m) => m.ChemistryScene),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-[#030712]" /> }
);

const REACTIONS = [
  { id: "acid-base", name: "Acid + Base", colorA: "#ef4444", colorB: "#3b82f6", result: "#10b981", desc: "Neutralization → salt + water" },
  { id: "copper", name: "Copper + Nitric", colorA: "#f59e0b", colorB: "#22d3ee", result: "#84cc16", desc: "Oxidation with gas evolution" },
  { id: "thermite", name: "Thermite", colorA: "#f97316", colorB: "#78716c", result: "#fbbf24", desc: "Exothermic redox reaction" },
];

export function ChemistryExperiment() {
  const [reactionIdx, setReactionIdx] = useState(0);
  const [isReacting, setIsReacting] = useState(false);
  const reaction = REACTIONS[reactionIdx];

  const mix = () => {
    setIsReacting(true);
    setTimeout(() => setIsReacting(false), 5000);
  };

  const sidebar = (
    <>
      <div className="glass-strong rounded-2xl p-5">
        <h3 className="font-[family-name:var(--font-orbitron)] text-sm text-white mb-4">REACTIONS</h3>
        <div className="space-y-2">
          {REACTIONS.map((r, i) => (
            <button
              key={r.id}
              type="button"
              onClick={() => { setReactionIdx(i); setIsReacting(false); }}
              className={`w-full text-left rounded-xl p-3 border transition-all ${
                i === reactionIdx
                  ? "border-violet-500/50 bg-violet-500/10 text-white"
                  : "border-white/5 text-slate-400 hover:border-cyan-500/30"
              }`}
            >
              <p className="text-sm font-medium">{r.name}</p>
              <p className="text-[10px] text-slate-500 mt-1">{r.desc}</p>
            </button>
          ))}
        </div>
        <div className="mt-6 flex gap-2">
          <GlowButton variant="primary" onClick={mix} className="flex-1 !px-4">
            <FlaskConical className="h-4 w-4" /> Mix Reagents
          </GlowButton>
          <GlowButton variant="secondary" onClick={() => setIsReacting(false)} className="!px-4">
            <RotateCcw className="h-4 w-4" />
          </GlowButton>
        </div>
      </div>
      <div className="glass rounded-xl p-4 text-sm text-slate-400">
        <p className="text-[10px] text-cyan-500 tracking-widest mb-2">STATUS</p>
        {isReacting ? (
          <p className="text-emerald-400 animate-pulse">Reaction in progress — observe glow & smoke</p>
        ) : (
          <p>Select a reaction and press Mix to begin.</p>
        )}
      </div>
    </>
  );

  return (
    <ExperimentShell title="CHEMISTRY LAB" subtitle="3D Reactions & Fluids" experimentId="chemistry-lab" sidebar={sidebar}>
      <ChemistryScene
        colorA={reaction.colorA}
        colorB={reaction.colorB}
        mixedColor={reaction.result}
        isReacting={isReacting}
      />
    </ExperimentShell>
  );
}
