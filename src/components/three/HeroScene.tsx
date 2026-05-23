"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, Stars } from "@react-three/drei";
import * as THREE from "three";
import { FloatingAtoms } from "./FloatingAtoms";
import { Molecule } from "./Molecule";
import { ParticleField } from "./ParticleField";
import { LaboratoryScene } from "./LaboratoryScene";
import { HolographicAssistant } from "./HolographicAssistant";

function CameraRig({ mouse }: { mouse: { x: number; y: number } }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0.5, 5));

  useFrame(() => {
    target.current.x = mouse.x * 0.8;
    target.current.y = 0.5 + mouse.y * 0.4;
    camera.position.lerp(
      new THREE.Vector3(target.current.x, target.current.y, 5),
      0.05
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 8, 5]} intensity={0.6} color="#ffffff" castShadow />
      <pointLight position={[-3, 2, 2]} intensity={1.2} color="#00f0ff" />
      <pointLight position={[3, 1, -2]} intensity={0.8} color="#8b5cf6" />
      <spotLight
        position={[0, 5, 0]}
        angle={0.4}
        penumbra={0.5}
        intensity={0.5}
        color="#ec4899"
      />
    </>
  );
}

function SceneContent({ mouse }: { mouse: { x: number; y: number } }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.5, 5]} fov={50} />
      <CameraRig mouse={mouse} />
      <SceneLights />
      <Stars radius={80} depth={40} count={3000} factor={3} saturation={0} fade speed={0.5} />
      <ParticleField count={600} />
      <FloatingAtoms />
      <Molecule position={[-1.8, 1.2, -2]} scale={1.3} />
      <Molecule position={[2.2, -0.8, -3]} scale={0.9} />
      <LaboratoryScene />
      <HolographicAssistant />
      <Environment preset="night" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </>
  );
}

interface HeroSceneProps {
  mouse: { x: number; y: number };
}

export function HeroScene({ mouse }: HeroSceneProps) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SceneContent mouse={mouse} />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030712]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#030712]/80 via-transparent to-[#030712]/80" />
    </div>
  );
}
