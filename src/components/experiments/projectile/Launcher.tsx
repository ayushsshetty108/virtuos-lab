"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface LauncherProps {
  angleDeg: number;
}

export function Launcher({ angleDeg }: LauncherProps) {
  const barrel = useRef<THREE.Group>(null);
  const rad = (angleDeg * Math.PI) / 180;

  useFrame(() => {
    if (barrel.current) {
      barrel.current.rotation.z = rad;
    }
  });

  return (
    <group position={[0, 0.15, 0]}>
      <mesh castShadow position={[0, 0.1, 0]}>
        <boxGeometry args={[0.6, 0.2, 0.5]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
      </mesh>
      <group ref={barrel} position={[0.3, 0.25, 0]}>
        <mesh castShadow rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.08, 0.5, 16]} />
          <meshStandardMaterial
            color="#334155"
            metalness={0.9}
            roughness={0.2}
            emissive="#00f0ff"
            emissiveIntensity={0.15}
          />
        </mesh>
        <mesh position={[0.28, 0, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>
      <mesh position={[0, 0.05, 0]}>
        <ringGeometry args={[0.35, 0.38, 32]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
