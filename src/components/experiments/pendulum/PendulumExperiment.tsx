"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Pause, Play, RotateCcw } from "lucide-react";
import { ExperimentShell } from "@/components/layout/ExperimentShell";
import { FuturisticSlider } from "@/components/experiments/ui/FuturisticSlider";
import { GlowButton } from "@/components/ui/GlowButton";

const PendulumScene = dynamic(
  () => import("./PendulumScene").then((m) => m.PendulumScene),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-[#030712]" /> }
);

export function PendulumExperiment() {
  const [length, setLength] = useState(2);
  const [gravity, setGravity] = useState(9.81);
  const [angleDeg, setAngleDeg] = useState(45);
  const [damping, setDamping] = useState(0.02);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [resetKey, setResetKey] = useState(0);

  const angleRad = (angleDeg * Math.PI) / 180;
  const period = 2 * Math.PI * Math.sqrt(length / gravity);

  const sidebar = (
    <>
      <div className="glass-strong rounded-2xl p-5 border border-violet-500/15">
        <h3 className="font-[family-name:var(--font-orbitron)] text-sm text-white mb-4">
          PENDULUM CONTROLS
        </h3>
        <div className="space-y-4">
          <FuturisticSlider label="Length" value={length} min={0.5} max={4} step={0.1} unit="m" onChange={setLength} color="violet" />
          <FuturisticSlider label="Gravity" value={gravity} min={1} max={20} step={0.1} unit="m/s²" onChange={setGravity} color="cyan" />
          <FuturisticSlider label="Initial Angle" value={angleDeg} min={5} max={85} step={1} unit="°" onChange={setAngleDeg} color="pink" />
          <FuturisticSlider label="Damping" value={damping} min={0} max={0.2} step={0.01} onChange={setDamping} color="violet" />
          <FuturisticSlider label="Sim Speed" value={speed} min={0.25} max={3} step={0.25} unit="×" onChange={setSpeed} color="cyan" />
        </div>
        <div className="mt-6 flex gap-2">
          <GlowButton variant="primary" onClick={() => setPlaying(!playing)} className="flex-1 !px-4">
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {playing ? "Pause" : "Play"}
          </GlowButton>
          <GlowButton variant="secondary" onClick={() => { setResetKey((k) => k + 1); setPlaying(false); setTimeout(() => setPlaying(true), 100); }} className="!px-4">
            <RotateCcw className="h-4 w-4" />
          </GlowButton>
        </div>
      </div>
      <div className="glass rounded-xl p-4 font-mono text-sm text-cyan-300 space-y-2">
        <p className="text-[10px] text-slate-500 tracking-widest">LIVE DATA</p>
        <p>Period ≈ {period.toFixed(2)} s</p>
        <p>ω ≈ {(2 * Math.PI / period).toFixed(2)} rad/s</p>
      </div>
    </>
  );

  return (
    <ExperimentShell
      title="PENDULUM"
      subtitle="Simple Harmonic Motion"
      experimentId="pendulum"
      sidebar={sidebar}
    >
      <PendulumScene
        length={length}
        gravity={gravity}
        initialAngle={angleRad}
        damping={damping}
        playing={playing}
        speed={speed}
        resetKey={resetKey}
      />
    </ExperimentShell>
  );
}
