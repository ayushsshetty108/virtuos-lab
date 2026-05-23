"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Battery, Lightbulb, RotateCcw, Zap } from "lucide-react";
import { ExperimentShell } from "@/components/layout/ExperimentShell";
import { FuturisticSlider } from "@/components/experiments/ui/FuturisticSlider";
import { GlowButton } from "@/components/ui/GlowButton";
import { cn } from "@/lib/utils";

type ComponentType = "battery" | "resistor" | "bulb";

interface PlacedComponent {
  id: string;
  type: ComponentType;
  x: number;
  y: number;
}

const PALETTE: { type: ComponentType; label: string; icon: typeof Battery }[] = [
  { type: "battery", label: "Battery", icon: Battery },
  { type: "resistor", label: "Resistor", icon: Zap },
  { type: "bulb", label: "Bulb", icon: Lightbulb },
];

export function CircuitExperiment() {
  const [voltage, setVoltage] = useState(9);
  const [resistance, setResistance] = useState(100);
  const [components, setComponents] = useState<PlacedComponent[]>([
    { id: "b1", type: "battery", x: 80, y: 120 },
    { id: "r1", type: "resistor", x: 220, y: 120 },
    { id: "l1", type: "bulb", x: 360, y: 120 },
  ]);
  const [powered, setPowered] = useState(false);
  const dragId = useRef<string | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  const current = powered ? voltage / resistance : 0;
  const bulbOn = powered && current > 0.01;

  const onPointerDown = (id: string) => {
    dragId.current = id;
  };

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragId.current || !boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - 40;
    const y = e.clientY - rect.top - 24;
    setComponents((prev) =>
      prev.map((c) =>
        c.id === dragId.current
          ? { ...c, x: Math.max(20, Math.min(rect.width - 80, x)), y: Math.max(40, Math.min(rect.height - 60, y)) }
          : c
      )
    );
  }, []);

  const onPointerUp = () => {
    dragId.current = null;
  };

  const reset = () => {
    setComponents([
      { id: "b1", type: "battery", x: 80, y: 120 },
      { id: "r1", type: "resistor", x: 220, y: 120 },
      { id: "l1", type: "bulb", x: 360, y: 120 },
    ]);
    setPowered(false);
  };

  const sidebar = (
    <>
      <div className="glass-strong rounded-2xl p-5">
        <h3 className="font-[family-name:var(--font-orbitron)] text-sm text-white mb-4">CIRCUIT CONTROLS</h3>
        <FuturisticSlider label="Voltage" value={voltage} min={1} max={24} step={1} unit="V" onChange={setVoltage} />
        <FuturisticSlider label="Resistance" value={resistance} min={10} max={500} step={10} unit="Ω" onChange={setResistance} color="violet" />
        <div className="mt-6 flex gap-2">
          <GlowButton variant="primary" onClick={() => setPowered(true)} className="flex-1 !px-4">
            <Zap className="h-4 w-4" /> Power On
          </GlowButton>
          <GlowButton variant="secondary" onClick={reset} className="!px-4">
            <RotateCcw className="h-4 w-4" />
          </GlowButton>
        </div>
      </div>
      <div className="glass rounded-xl p-4 font-mono text-sm text-cyan-300">
        <p className="text-[10px] text-slate-500 mb-2">LIVE READINGS</p>
        <p>I = {current.toFixed(3)} A</p>
        <p>P = {(current * voltage).toFixed(2)} W</p>
        <p>Status: {bulbOn ? "CLOSED" : "OPEN"}</p>
      </div>
      <p className="text-xs text-slate-600">Drag components on the board. Connect battery → resistor → bulb.</p>
    </>
  );

  return (
    <ExperimentShell title="CIRCUIT BUILDER" subtitle="Electric Current Flow" experimentId="circuit-builder" sidebar={sidebar}>
      <div
        ref={boardRef}
        className="absolute inset-0 flex flex-col p-4 pt-2"
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div className="flex-1 relative glass-strong rounded-2xl border border-cyan-500/20 overflow-hidden min-h-[400px]">
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="wireGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00f0ff" stopOpacity={powered ? 0.8 : 0.2} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={powered ? 0.8 : 0.2} />
              </linearGradient>
            </defs>
            {components.length >= 2 &&
              components.slice(0, -1).map((c, i) => {
                const next = components[i + 1];
                return (
                  <line
                    key={`wire-${c.id}`}
                    x1={c.x + 40}
                    y1={c.y + 24}
                    x2={next.x + 40}
                    y2={next.y + 24}
                    stroke="url(#wireGlow)"
                    strokeWidth={powered ? 3 : 2}
                    strokeDasharray={powered ? "none" : "8 4"}
                  />
                );
              })}
            {powered &&
              [0, 1, 2].map((i) => (
                <circle
                  key={i}
                  r={4}
                  fill="#00f0ff"
                  cx={components[0]?.x + 40 + i * 30}
                  cy={components[0]?.y + 24}
                  opacity={0.9 - i * 0.2}
                >
                  <animate
                    attributeName="cx"
                    values={`${components[0]?.x + 40};${components[2]?.x + 40};${components[0]?.x + 40}`}
                    dur={`${1.5 / (current + 0.1)}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
          </svg>

          {components.map((comp) => {
            const meta = PALETTE.find((p) => p.type === comp.type)!;
            const Icon = meta.icon;
            return (
              <motion.div
                key={comp.id}
                className={cn(
                  "absolute cursor-grab active:cursor-grabbing glass rounded-xl p-3 border select-none touch-none",
                  comp.type === "bulb" && bulbOn
                    ? "border-yellow-400/60 shadow-[0_0_30px_rgba(250,204,21,0.4)]"
                    : "border-white/10"
                )}
                style={{ left: comp.x, top: comp.y }}
                onPointerDown={() => onPointerDown(comp.id)}
                whileHover={{ scale: 1.05 }}
              >
                <Icon
                  className={cn(
                    "h-8 w-8",
                    comp.type === "bulb" && bulbOn ? "text-yellow-300" : "text-cyan-400"
                  )}
                />
                <p className="text-[10px] text-slate-500 mt-1">{meta.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </ExperimentShell>
  );
}
