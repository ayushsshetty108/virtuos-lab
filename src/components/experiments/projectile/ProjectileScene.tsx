"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import type { ProjectileState } from "@/lib/physics/projectile";
import { ExperimentEnvironment } from "./ExperimentEnvironment";
import { Launcher } from "./Launcher";
import { TrajectoryPath } from "./TrajectoryPath";
import { ProjectileBall } from "./ProjectileBall";
import { TrailParticles } from "./TrailParticles";
import { MotionStreaks } from "./MotionStreaks";

interface ProjectileSceneProps {
  angleDeg: number;
  trajectory: ProjectileState[];
  liveState: ProjectileState;
  isRunning: boolean;
  progress: number;
  resetKey: number;
}

function SceneContent({
  angleDeg,
  trajectory,
  liveState,
  isRunning,
  progress,
  resetKey,
}: ProjectileSceneProps) {
  const cameraTarget = useMemo(() => {
    const maxX = Math.max(...trajectory.map((p) => p.x), 5);
    return [maxX * 0.4, 2, 0] as [number, number, number];
  }, [trajectory]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[cameraTarget[0], 4, 8]} fov={45} />
      <OrbitControls
        target={[cameraTarget[0], 1, 0]}
        enablePan
        maxPolarAngle={Math.PI / 2.1}
        minDistance={4}
        maxDistance={25}
      />
      <ExperimentEnvironment />
      <Launcher angleDeg={angleDeg} />
      <TrajectoryPath
        points={trajectory}
        progress={progress}
        isRunning={isRunning}
      />
      <ProjectileBall x={liveState.x} y={liveState.y} isRunning={isRunning} />
      <TrailParticles
        x={liveState.x}
        y={liveState.y}
        isRunning={isRunning}
        resetKey={resetKey}
      />
      <MotionStreaks
        x={liveState.x}
        y={liveState.y}
        vx={liveState.vx}
        vy={liveState.vy}
        isRunning={isRunning}
      />
    </>
  );
}

export function ProjectileScene(props: ProjectileSceneProps) {
  return (
    <div className="absolute inset-0">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
        <Suspense fallback={null}>
          <SceneContent {...props} />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-[#030712]/40" />
    </div>
  );
}
