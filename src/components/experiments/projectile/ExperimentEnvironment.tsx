"use client";

import { Grid, Stars } from "@react-three/drei";
import * as THREE from "three";

export function ExperimentEnvironment() {
  return (
    <>
      <color attach="background" args={["#030712"]} />
      <fog attach="fog" args={["#030712", 15, 45]} />

      <ambientLight intensity={0.2} />
      <directionalLight
        position={[8, 12, 6]}
        intensity={1.2}
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[-5, 4, 3]} intensity={0.8} color="#00f0ff" />
      <pointLight position={[8, 2, -4]} intensity={0.5} color="#8b5cf6" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.5}
        penumbra={0.6}
        intensity={0.6}
        color="#ec4899"
      />

      <Stars radius={60} depth={30} count={2000} factor={2} fade speed={0.3} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial
          color="#0a0f1e"
          metalness={0.8}
          roughness={0.4}
        />
      </mesh>

      <Grid
        args={[40, 40]}
        cellSize={1}
        cellThickness={0.6}
        cellColor="#00f0ff"
        sectionSize={5}
        sectionThickness={1.2}
        sectionColor="#8b5cf6"
        fadeDistance={35}
        fadeStrength={1.5}
        followCamera={false}
        infiniteGrid
      />
    </>
  );
}
