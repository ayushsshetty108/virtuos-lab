"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Ring } from "@react-three/drei";
import * as THREE from "three";

export function HolographicAssistant({ position = [2.5, 0.8, -1] as [number, number, number] }) {
  const core = useRef<THREE.Mesh>(null);
  const rings = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (core.current) {
      core.current.rotation.y = state.clock.elapsedTime;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      core.current.scale.setScalar(scale);
    }
    if (rings.current) {
      rings.current.rotation.z = state.clock.elapsedTime * 0.5;
      rings.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
      <group position={position}>
        <group ref={rings}>
          <Ring args={[0.5, 0.52, 64]} rotation={[Math.PI / 2, 0, 0]}>
            <meshBasicMaterial color="#00f0ff" transparent opacity={0.6} side={THREE.DoubleSide} />
          </Ring>
          <Ring args={[0.7, 0.71, 64]} rotation={[Math.PI / 3, 0.5, 0]}>
            <meshBasicMaterial color="#8b5cf6" transparent opacity={0.4} side={THREE.DoubleSide} />
          </Ring>
        </group>
        <mesh ref={core}>
          <icosahedronGeometry args={[0.25, 1]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={1}
            wireframe
            transparent
            opacity={0.9}
          />
        </mesh>
        <pointLight color="#00f0ff" intensity={2} distance={3} />
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.15, 0.2, 0.1, 32]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  );
}
