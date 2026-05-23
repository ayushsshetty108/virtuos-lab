"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import gsap from "gsap";
import { ArrowLeft } from "lucide-react";
import { useProjectileSimulation } from "@/hooks/useProjectileSimulation";
import { ControlsPanel } from "./ControlsPanel";
import { ExperimentHUD } from "./ExperimentHUD";
import { TrajectoryGraph } from "./TrajectoryGraph";

const ProjectileScene = dynamic(
  () => import("./ProjectileScene").then((m) => m.ProjectileScene),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-[#030712]" /> }
);

export function ProjectileExperiment() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [resetKey, setResetKey] = useState(0);
  const {
    params,
    updateParam,
    metrics,
    trajectory,
    status,
    liveState,
    reset: simReset,
    launch: simLaunch,
  } = useProjectileSimulation();

  const reset = () => {
    simReset();
    setResetKey((k) => k + 1);
  };

  const launch = () => {
    setResetKey((k) => k + 1);
    simLaunch();
  };

  const isRunning = status === "running";
  const progress = useMemo(() => {
    if (metrics.timeOfFlight <= 0) return 0;
    return Math.min(1, liveState.t / metrics.timeOfFlight);
  }, [liveState.t, metrics.timeOfFlight]);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#030712] overflow-hidden">
      {/* 3D Viewport */}
      <div className="absolute inset-0 lg:inset-0 lg:right-auto lg:w-[calc(100%-20rem)]">
        <ProjectileScene
          angleDeg={params.angleDeg}
          trajectory={trajectory}
          liveState={liveState}
          isRunning={isRunning}
          progress={progress}
          resetKey={resetKey}
        />
        <ExperimentHUD
          liveState={liveState}
          metrics={metrics}
          status={status}
        />
      </div>

      {/* Side panel + graph */}
      <div className="relative z-30 flex flex-col lg:flex-row min-h-screen pointer-events-none">
        <div className="flex-1 min-h-[50vh] lg:min-h-screen" />

        <div className="pointer-events-auto p-4 sm:p-6 flex flex-col gap-4 lg:max-h-screen lg:overflow-y-auto lg:w-96">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-cyan-400 transition-colors w-fit"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Lab
          </Link>

          <ControlsPanel
            params={params}
            status={status}
            onAngleChange={(v) => updateParam("angleDeg", v)}
            onVelocityChange={(v) => updateParam("velocity", v)}
            onGravityChange={(v) => updateParam("gravity", v)}
            onLaunch={launch}
            onReset={reset}
          />

          <TrajectoryGraph
            trajectory={trajectory}
            liveState={liveState}
            isRunning={isRunning}
          />

          {/* Mobile predicted metrics */}
          <div className="glass-strong rounded-xl p-4 sm:hidden">
            <p className="text-[10px] tracking-[0.3em] text-violet-400/80 mb-2">PREDICTED</p>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-cyan-300">
              <span>Range: {metrics.range.toFixed(2)} m</span>
              <span>Height: {metrics.maxHeight.toFixed(2)} m</span>
              <span>Time: {metrics.timeOfFlight.toFixed(2)} s</span>
              <span>V₀: {params.velocity} m/s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
