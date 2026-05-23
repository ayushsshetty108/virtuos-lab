"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const MAX_TRAIL = 80;

interface TrailParticlesProps {
  x: number;
  y: number;
  isRunning: boolean;
  resetKey: number;
}

export function TrailParticles({ x, y, isRunning, resetKey }: TrailParticlesProps) {
  const points = useRef<THREE.Points>(null);
  const trail = useRef<{ x: number; y: number }[]>([]);
  const head = useRef(0);

  useEffect(() => {
    trail.current = [];
    head.current = 0;
  }, [resetKey]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(MAX_TRAIL * 3);
    const col = new Float32Array(MAX_TRAIL * 3);
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return geo;
  }, []);

  useFrame(() => {
    if (!points.current || !isRunning) return;

    trail.current[head.current % MAX_TRAIL] = { x, y: Math.max(0.1, y) };
    head.current++;

    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    const colAttr = geometry.attributes.color as THREE.BufferAttribute;
    const len = Math.min(head.current, MAX_TRAIL);

    for (let i = 0; i < len; i++) {
      const idx = (head.current - len + i + MAX_TRAIL * 100) % MAX_TRAIL;
      const p = trail.current[idx];
      if (!p) continue;
      posAttr.setXYZ(i, p.x, p.y, 0);
      const alpha = i / len;
      colAttr.setXYZ(i, 0, 0.94 * alpha, 1 * alpha);
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
    geometry.setDrawRange(0, len);
  });

  if (!isRunning && head.current === 0) return null;

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
