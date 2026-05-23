"use client";

import { Play, RotateCcw, Rocket } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";
import { FuturisticSlider } from "@/components/experiments/ui/FuturisticSlider";
import type { ProjectileParams } from "@/lib/physics/projectile";
import type { SimStatus } from "@/hooks/useProjectileSimulation";

interface ControlsPanelProps {
  params: ProjectileParams;
  status: SimStatus;
  onAngleChange: (v: number) => void;
  onVelocityChange: (v: number) => void;
  onGravityChange: (v: number) => void;
  onLaunch: () => void;
  onReset: () => void;
}

export function ControlsPanel({
  params,
  status,
  onAngleChange,
  onVelocityChange,
  onGravityChange,
  onLaunch,
  onReset,
}: ControlsPanelProps) {
  const isRunning = status === "running";

  return (
    <aside className="glass-strong rounded-2xl p-5 sm:p-6 w-full lg:w-80 shrink-0 border border-cyan-500/15">
      <div className="flex items-center gap-2 mb-6">
        <Rocket className="h-5 w-5 text-cyan-400" />
        <h2 className="font-[family-name:var(--font-orbitron)] text-sm font-bold tracking-wider text-white">
          LAUNCH CONTROLS
        </h2>
      </div>

      <div className="space-y-5">
        <FuturisticSlider
          label="Launch Angle"
          value={params.angleDeg}
          min={5}
          max={85}
          step={1}
          unit="°"
          onChange={onAngleChange}
          disabled={isRunning}
          color="cyan"
        />
        <FuturisticSlider
          label="Initial Velocity"
          value={params.velocity}
          min={5}
          max={50}
          step={1}
          unit="m/s"
          onChange={onVelocityChange}
          disabled={isRunning}
          color="violet"
        />
        <FuturisticSlider
          label="Gravity"
          value={params.gravity}
          min={1}
          max={20}
          step={0.1}
          unit="m/s²"
          onChange={onGravityChange}
          disabled={isRunning}
          color="pink"
        />
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <GlowButton
          variant="primary"
          onClick={isRunning ? undefined : onLaunch}
          className={isRunning ? "opacity-60 pointer-events-none" : ""}
        >
          <Play className="h-4 w-4" />
          {isRunning ? "Simulating..." : "Launch Projectile"}
        </GlowButton>
        <GlowButton variant="secondary" onClick={onReset}>
          <RotateCcw className="h-4 w-4" />
          Reset
        </GlowButton>
      </div>

      <p className="mt-5 text-[10px] text-slate-600 leading-relaxed">
        Adjust parameters and launch to observe realistic parabolic motion with live physics calculations.
      </p>
    </aside>
  );
}
