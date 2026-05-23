"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MotionStreaksProps {
  x: number;
  y: number;
  vx: number;
  vy: number;
  isRunning: boolean;
}

export function MotionStreaks({ x, y, vx, vy, isRunning }: MotionStreaksProps) {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current || !isRunning) {
      if (group.current) group.current.visible = false;
      return;
    }
    group.current.visible = true;
    group.current.position.set(x, Math.max(0.12, y), 0);
    const speed = Math.sqrt(vx * vx + vy * vy);
    group.current.rotation.z = Math.atan2(vy, vx);
    group.current.scale.x = Math.min(2.5, 0.3 + speed * 0.08);
  });

  if (!isRunning) return null;

  return (
    <group ref={group}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-0.15 - i * 0.12, 0, 0]}>
          <boxGeometry args={[0.2, 0.04, 0.04]} />
          <meshBasicMaterial
            color="#00f0ff"
            transparent
            opacity={0.4 - i * 0.12}
          />
        </mesh>
      ))}
    </group>
  );
}
