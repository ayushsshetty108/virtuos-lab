"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ATOM_COLORS = ["#00f0ff", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b"];

function Bond({ start, end }: { start: THREE.Vector3; end: THREE.Vector3 }) {
  const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  const dir = new THREE.Vector3().subVectors(end, start);
  const len = dir.length();
  const quat = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    dir.normalize()
  );

  return (
    <mesh position={mid.toArray()} quaternion={quat}>
      <cylinderGeometry args={[0.02, 0.02, len, 8]} />
      <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

export function Molecule({
  position = [0, 0, 0] as [number, number, number],
  scale = 1,
}: {
  position?: [number, number, number];
  scale?: number;
}) {
  const group = useRef<THREE.Group>(null);

  const atoms: THREE.Vector3[] = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.6, 0.4, 0),
    new THREE.Vector3(-0.5, 0.5, 0.3),
    new THREE.Vector3(0.2, -0.6, 0.2),
    new THREE.Vector3(-0.3, -0.3, -0.5),
  ];

  const bonds: [THREE.Vector3, THREE.Vector3][] = [
    [atoms[0], atoms[1]],
    [atoms[0], atoms[2]],
    [atoms[1], atoms[3]],
    [atoms[2], atoms[4]],
    [atoms[3], atoms[4]],
  ];

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    group.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  return (
    <group ref={group} position={position} scale={scale}>
      {atoms.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.12 + (i === 0 ? 0.05 : 0), 24, 24]} />
          <meshStandardMaterial
            color={ATOM_COLORS[i % ATOM_COLORS.length]}
            emissive={ATOM_COLORS[i % ATOM_COLORS.length]}
            emissiveIntensity={0.4}
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
      ))}
      {bonds.map(([s, e], i) => (
        <Bond key={i} start={s} end={e} />
      ))}
    </group>
  );
}
