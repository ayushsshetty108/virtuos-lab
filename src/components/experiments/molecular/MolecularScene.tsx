"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { Molecule } from "@/components/three/Molecule";
import { ExperimentEnvironment } from "@/components/experiments/projectile/ExperimentEnvironment";

const MOLECULES = {
  water: { name: "H₂O", formula: "Water", scale: 1.5, position: [0, 0.5, 0] as [number, number, number] },
  methane: { name: "CH₄", formula: "Methane", scale: 1.8, position: [0, 0.5, 0] as [number, number, number] },
  glucose: { name: "C₆H₁₂O₆", formula: "Glucose", scale: 1.2, position: [0, 0.5, 0] as [number, number, number] },
};

export type MoleculeKey = keyof typeof MOLECULES;

function RotatingMolecule({ scale, autoRotate }: { scale: number; autoRotate: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current && autoRotate) ref.current.rotation.y += delta * 0.4;
  });
  return (
    <group ref={ref} scale={scale}>
      <Molecule />
    </group>
  );
}

interface MolecularSceneProps {
  molecule: MoleculeKey;
  autoRotate: boolean;
  zoom: number;
}

function SceneContent({ molecule, autoRotate, zoom }: MolecularSceneProps) {
  const meta = MOLECULES[molecule];
  return (
    <>
      <OrbitControls
        enableZoom
        minDistance={2 / zoom}
        maxDistance={12 / zoom}
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
      />
      <group position={meta.position}>
        <RotatingMolecule scale={meta.scale} autoRotate={autoRotate} />
      </group>
      <Html position={[0, 2.2, 0]} center>
        <div className="glass rounded-lg px-3 py-1 text-xs text-cyan-300 font-mono pointer-events-none whitespace-nowrap">
          {meta.name} — {meta.formula}
        </div>
      </Html>
    </>
  );
}

export function MolecularScene(props: MolecularSceneProps) {
  return (
    <div className="absolute inset-0">
      <Canvas>
        <Suspense fallback={null}>
          <ExperimentEnvironment />
          <SceneContent {...props} />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
    </div>
  );
}

export { MOLECULES };
