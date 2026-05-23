"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Atom({ position, scale, color }: { position: [number, number, number]; scale: number; color: string }) {
  const group = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.3;
    if (orbitRef.current) {
      orbitRef.current.rotation.z = state.clock.elapsedTime * 1.2;
    }
  });

  return (
    <group ref={group} position={position} scale={scale}>
      <mesh>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
      </mesh>
      <mesh ref={orbitRef}>
        <torusGeometry args={[0.35, 0.008, 8, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI * 2) / 3) * 0.35,
            Math.sin((i * Math.PI * 2) / 3) * 0.35,
            0,
          ]}
        >
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#ffffff" emissive={color} emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

export function FloatingAtoms() {
  const atoms = useMemo(
    () =>
      [
        { pos: [-3, 1.5, -2] as [number, number, number], scale: 1.2, color: "#00f0ff" },
        { pos: [3.5, -0.5, -3] as [number, number, number], scale: 0.9, color: "#8b5cf6" },
        { pos: [-2, -1.8, -4] as [number, number, number], scale: 1, color: "#ec4899" },
        { pos: [2, 2.2, -1.5] as [number, number, number], scale: 0.7, color: "#10b981" },
        { pos: [0, 0.5, -5] as [number, number, number], scale: 1.4, color: "#00f0ff" },
      ],
    []
  );

  return (
    <>
      {atoms.map((a, i) => (
        <Atom key={i} position={a.pos} scale={a.scale} color={a.color} />
      ))}
    </>
  );
}
