"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ProjectileBallProps {
  x: number;
  y: number;
  isRunning: boolean;
}

export function ProjectileBall({ x, y, isRunning }: ProjectileBallProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const target = useRef(new THREE.Vector3(x, Math.max(0.12, y), 0));

  useFrame((_, delta) => {
    target.current.set(x, Math.max(0.12, y), 0);
    if (meshRef.current) {
      meshRef.current.position.lerp(target.current, 1 - Math.exp(-12 * delta));
      if (isRunning) {
        meshRef.current.scale.setScalar(1 + Math.sin(Date.now() * 0.02) * 0.05);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
    if (glowRef.current) {
      glowRef.current.position.copy(meshRef.current?.position ?? target.current);
      const scale = isRunning ? 1.8 : 1.2;
      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.15} />
      </mesh>
      <mesh ref={meshRef} castShadow position={[0, 0.12, 0]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={isRunning ? 1.2 : 0.6}
          metalness={0.4}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}
