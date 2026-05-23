"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

function Beaker({ position }: { position: [number, number, number] }) {
  const liquidRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (liquidRef.current) {
      liquidRef.current.position.y =
        position[1] - 0.15 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
    }
  });

  return (
    <group position={position}>
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 0.6, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.9}
          thickness={0.1}
          roughness={0}
          transparent
          opacity={0.3}
        />
      </mesh>
      <mesh ref={liquidRef} position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.17, 0.17, 0.35, 32]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.6}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
}

function HolographicScreen({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.15;
    }
  });

  return (
    <group position={position}>
      <mesh ref={ref}>
        <planeGeometry args={[1.8, 1.2]} />
        <meshStandardMaterial
          color="#0a1628"
          emissive="#00f0ff"
          emissiveIntensity={0.4}
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[1.85, 1.25]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function LabTable() {
  return (
    <group position={[0, -1.2, 0]}>
      <RoundedBox args={[4, 0.12, 1.8]} radius={0.02} smoothness={4}>
        <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.3} />
      </RoundedBox>
      {[[-1.6, -0.5, 0.6], [1.6, -0.5, 0.6], [-1.6, -0.5, -0.6], [1.6, -0.5, -0.6]].map(
        (pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <cylinderGeometry args={[0.04, 0.04, 0.5, 16]} />
            <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
          </mesh>
        )
      )}
    </group>
  );
}

export function LaboratoryScene() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      <LabTable />
      <Beaker position={[-0.8, -0.9, 0.3]} />
      <Beaker position={[0.3, -0.9, 0.2]} />
      <Beaker position={[1.1, -0.9, 0.4]} />
      <HolographicScreen position={[0, 0.2, -0.6]} />
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh position={[-1.5, 0.5, 0]}>
          <octahedronGeometry args={[0.2, 0]} />
          <MeshDistortMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.5}
            distort={0.3}
            speed={2}
            transparent
            opacity={0.9}
          />
        </mesh>
      </Float>
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#030712" metalness={0.9} roughness={0.8} />
      </mesh>
    </group>
  );
}
