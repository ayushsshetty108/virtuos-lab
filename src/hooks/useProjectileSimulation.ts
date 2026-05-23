"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import {
  computeMetrics,
  generateTrajectory,
  positionAt,
  type ProjectileParams,
  type ProjectileState,
} from "@/lib/physics/projectile";

export type SimStatus = "idle" | "running" | "done";

export interface ProjectileSimulationConfig extends ProjectileParams {
  timeScale?: number;
}

const DEFAULT: ProjectileSimulationConfig = {
  velocity: 25,
  angleDeg: 45,
  gravity: 9.81,
  timeScale: 1,
};

export function useProjectileSimulation(
  initial: Partial<ProjectileSimulationConfig> = {}
) {
  const [params, setParams] = useState<ProjectileSimulationConfig>({
    ...DEFAULT,
    ...initial,
  });
  const [status, setStatus] = useState<SimStatus>("idle");
  const [liveState, setLiveState] = useState<ProjectileState>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    t: 0,
  });

  const elapsedRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const metrics = useMemo(() => computeMetrics(params), [params]);
  const trajectory = useMemo(() => generateTrajectory(params), [params]);

  const updateParam = useCallback(
    <K extends keyof ProjectileParams>(key: K, value: ProjectileParams[K]) => {
      setParams((p) => {
        const next = { ...p, [key]: value };
        if (status !== "running") {
          setLiveState(positionAt(next, 0));
        }
        return next;
      });
    },
    [status]
  );

  const reset = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    lastTimeRef.current = null;
    elapsedRef.current = 0;
    setStatus("idle");
    setLiveState(positionAt(params, 0));
  }, [params]);

  const launch = useCallback(() => {
    reset();
    setStatus("running");
    elapsedRef.current = 0;
    lastTimeRef.current = null;

    const { timeOfFlight } = computeMetrics(params);
    const timeScale = params.timeScale ?? 1;

    const tick = (now: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = now;
      const dt = ((now - lastTimeRef.current) / 1000) * timeScale;
      lastTimeRef.current = now;
      elapsedRef.current += dt;

      const t = Math.min(elapsedRef.current, timeOfFlight);
      const state = positionAt(params, t);
      setLiveState({ ...state, y: Math.max(0, state.y) });

      if (t >= timeOfFlight) {
        setStatus("done");
        setLiveState(positionAt(params, timeOfFlight));
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [params, reset]);

  return {
    params,
    setParams,
    updateParam,
    metrics,
    trajectory,
    status,
    liveState,
    reset,
    launch,
  };
}
