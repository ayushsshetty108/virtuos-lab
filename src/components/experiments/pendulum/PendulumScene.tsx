"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";
import { stepPendulum, bobPosition } from "@/lib/physics/pendulum";
import { ExperimentEnvironment } from "@/components/experiments/projectile/ExperimentEnvironment";

interface PendulumSimProps {
  length: number;
  gravity: number;
  initialAngle: number;
  damping: number;
  playing: boolean;
  speed: number;
  resetKey: number;
}

function PendulumSim({
  length,
  gravity,
  initialAngle,
  damping,
  playing,
  speed,
  resetKey,
}: PendulumSimProps) {
  const angleRef = useRef(initialAngle);
  const velRef = useRef(0);
  const bobRef = useRef<THREE.Mesh>(null);
  const pivotY = 2.5;

  useEffect(() => {
    angleRef.current = initialAngle;
    velRef.current = 0;
  }, [resetKey, initialAngle]);

  useFrame((_, delta) => {
    if (playing) {
      const result = stepPendulum(
        angleRef.current,
        velRef.current,
        { length, gravity, angleRad: initialAngle, damping },
        delta * speed
      );
      angleRef.current = result.angle;
      velRef.current = result.angularVelocity;
    }
    const [x, y] = bobPosition(length, angleRef.current);
    if (bobRef.current) {
      bobRef.current.position.set(x, pivotY + y, 0);
    }
  });

  const [bx, by] = bobPosition(length, angleRef.current);

  return (
    <>
      <mesh position={[0, pivotY, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#334155" metalness={0.8} />
      </mesh>
      <Line
        points={[
          [0, pivotY, 0],
          [bx, pivotY + by, 0],
        ]}
        color="#94a3b8"
        lineWidth={2}
      />
      <mesh ref={bobRef} position={[bx, pivotY + by, 0]} castShadow>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.5}
          metalness={0.5}
        />
      </mesh>
    </>
  );
}

interface PendulumSceneProps extends PendulumSimProps {}

export function PendulumScene(props: PendulumSceneProps) {
  return (
    <div className="absolute inset-0">
      <Canvas shadows dpr={[1, 2]}>
        <ExperimentEnvironment />
        <OrbitControls target={[0, 1, 0]} maxPolarAngle={Math.PI / 1.8} />
        <PendulumSim {...props} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
    </div>
  );
}
