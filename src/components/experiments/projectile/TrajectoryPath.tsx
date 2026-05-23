"use client";

import { useMemo } from "react";
import { Line } from "@react-three/drei";
import type { ProjectileState } from "@/lib/physics/projectile";

interface TrajectoryPathProps {
  points: ProjectileState[];
  progress: number;
  isRunning: boolean;
}

export function TrajectoryPath({ points, progress, isRunning }: TrajectoryPathProps) {
  const pathPoints = useMemo(
    () =>
      points.map(
        (p) => [p.x, Math.max(0, p.y) + 0.05, 0] as [number, number, number]
      ),
    [points]
  );

  const groundPoints = useMemo(
    () => points.map((p) => [p.x, 0.02, 0] as [number, number, number]),
    [points]
  );

  const opacity = isRunning ? 0.85 : 0.7;

  return (
    <group>
      <Line
        points={pathPoints}
        color="#8b5cf6"
        lineWidth={3}
        transparent
        opacity={0.25 * Math.min(1, progress + 0.2)}
      />
      <Line
        points={pathPoints}
        color="#00f0ff"
        lineWidth={2}
        transparent
        opacity={opacity * Math.min(1, progress + 0.2)}
        dashed
        dashSize={0.3}
        gapSize={0.15}
      />
      <Line
        points={groundPoints}
        color="#00f0ff"
        lineWidth={1}
        transparent
        opacity={0.2}
      />
    </group>
  );
}
