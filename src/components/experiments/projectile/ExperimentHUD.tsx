"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { ProjectileMetrics, ProjectileState } from "@/lib/physics/projectile";
import type { SimStatus } from "@/hooks/useProjectileSimulation";

interface ExperimentHUDProps {
  liveState: ProjectileState;
  metrics: ProjectileMetrics;
  status: SimStatus;
}

function HUDRow({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5 border-b border-white/5 last:border-0">
      <span className="text-[10px] tracking-widest text-slate-500 uppercase">{label}</span>
      <span className="font-mono text-sm text-cyan-300">
        {value}
        {unit && <span className="text-slate-500 text-xs ml-1">{unit}</span>}
      </span>
    </div>
  );
}

export function ExperimentHUD({ liveState, metrics, status }: ExperimentHUDProps) {
  const speed = Math.sqrt(liveState.vx ** 2 + liveState.vy ** 2);

  return (
    <>
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3 sm:px-6 pointer-events-none">
        <div className="glass rounded-xl px-4 py-2 pointer-events-auto">
          <p className="font-[family-name:var(--font-orbitron)] text-xs text-cyan-400 tracking-widest">
            VIRTUOS LAB
          </p>
          <p className="text-[10px] text-slate-500">Projectile Motion Experiment</p>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={status}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-full px-4 py-1.5 pointer-events-auto flex items-center gap-2"
          >
            <span
              className={`h-2 w-2 rounded-full ${
                status === "running"
                  ? "bg-emerald-400 animate-pulse"
                  : status === "done"
                    ? "bg-violet-400"
                    : "bg-slate-500"
              }`}
            />
            <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">
              {status === "running" ? "Live" : status === "done" ? "Complete" : "Ready"}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Live coordinates - bottom left */}
      <div className="absolute bottom-4 left-4 z-20 glass-strong rounded-xl p-4 w-56 sm:w-64 pointer-events-none">
        <p className="text-[10px] tracking-[0.3em] text-cyan-500/80 mb-3">LIVE TELEMETRY</p>
        <HUDRow label="Position X" value={liveState.x.toFixed(2)} unit="m" />
        <HUDRow label="Position Y" value={Math.max(0, liveState.y).toFixed(2)} unit="m" />
        <HUDRow label="Velocity X" value={liveState.vx.toFixed(2)} unit="m/s" />
        <HUDRow label="Velocity Y" value={liveState.vy.toFixed(2)} unit="m/s" />
        <HUDRow label="Speed" value={speed.toFixed(2)} unit="m/s" />
        <HUDRow label="Time" value={liveState.t.toFixed(2)} unit="s" />
      </div>

      {/* Predicted metrics - top right */}
      <div className="absolute top-16 right-4 z-20 glass-strong rounded-xl p-4 w-52 sm:w-56 pointer-events-none hidden sm:block">
        <p className="text-[10px] tracking-[0.3em] text-violet-400/80 mb-3">PREDICTED</p>
        <HUDRow label="Range" value={metrics.range.toFixed(2)} unit="m" />
        <HUDRow label="Max Height" value={metrics.maxHeight.toFixed(2)} unit="m" />
        <HUDRow label="Flight Time" value={metrics.timeOfFlight.toFixed(2)} unit="s" />
        <HUDRow label="V₀x" value={metrics.vx0.toFixed(2)} unit="m/s" />
        <HUDRow label="V₀y" value={metrics.vy0.toFixed(2)} unit="m/s" />
      </div>
    </>
  );
}
