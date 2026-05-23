"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { ExperimentEnvironment } from "@/components/experiments/projectile/ExperimentEnvironment";

function BeakerLiquid({
  position,
  color,
  level,
  reacting,
}: {
  position: [number, number, number];
  color: string;
  level: number;
  reacting: boolean;
}) {
  const liquidRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!liquidRef.current) return;
    const pulse = reacting ? Math.sin(state.clock.elapsedTime * 4) * 0.03 : 0;
    liquidRef.current.scale.y = level + pulse;
  });

  return (
    <group position={position}>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.22, 0.28, 0.7, 32]} />
        <meshPhysicalMaterial
          transmission={0.85}
          thickness={0.1}
          roughness={0}
          transparent
          opacity={0.35}
          color="#ffffff"
        />
      </mesh>
      <mesh ref={liquidRef} position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.4, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={reacting ? 1.2 : 0.5}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}

function Smoke({ active }: { active: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(50 * 3);
    for (let i = 0; i < 50; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 1] = Math.random() * 1.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!ref.current || !active) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
  });

  if (!active) return null;

  return (
    <points ref={ref} position={[0, 0.8, 0]} geometry={geometry}>
      <pointsMaterial size={0.08} color="#94a3b8" transparent opacity={0.5} />
    </points>
  );
}

interface ChemistrySceneProps {
  colorA: string;
  colorB: string;
  mixedColor: string;
  isReacting: boolean;
}

function SceneContent({ colorA, colorB, mixedColor, isReacting }: ChemistrySceneProps) {
  return (
    <>
      <OrbitControls target={[0, 0.5, 0]} />
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#0a0f1e" />
      </mesh>
      <BeakerLiquid position={[-0.9, 0, 0]} color={colorA} level={0.8} reacting={isReacting} />
      <BeakerLiquid position={[0.9, 0, 0]} color={colorB} level={0.8} reacting={isReacting} />
      <BeakerLiquid position={[0, 0, 0.6]} color={mixedColor} level={isReacting ? 1 : 0.3} reacting={isReacting} />
      <Smoke active={isReacting} />
      {isReacting && (
        <Float speed={3}>
          <pointLight position={[0, 1.5, 0.6]} intensity={3} color={mixedColor} distance={4} />
        </Float>
      )}
    </>
  );
}

export function ChemistryScene(props: ChemistrySceneProps) {
  return (
    <div className="absolute inset-0">
      <Canvas shadows>
        <ExperimentEnvironment />
        <SceneContent {...props} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
    </div>
  );
}
