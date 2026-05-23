"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { ProjectileState } from "@/lib/physics/projectile";

interface TrajectoryGraphProps {
  trajectory: ProjectileState[];
  liveState: ProjectileState;
  isRunning: boolean;
}

export function TrajectoryGraph({
  trajectory,
  liveState,
  isRunning,
}: TrajectoryGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const pad = { top: 20, right: 20, bottom: 28, left: 40 };

    const maxX = Math.max(...trajectory.map((p) => p.x), 1) * 1.1;
    const maxY = Math.max(...trajectory.map((p) => p.y), 1) * 1.15;

    const toX = (x: number) => pad.left + (x / maxX) * (w - pad.left - pad.right);
    const toY = (y: number) =>
      h - pad.bottom - (Math.max(0, y) / maxY) * (h - pad.top - pad.bottom);

    ctx.clearRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = "rgba(0, 240, 255, 0.08)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const gy = pad.top + ((h - pad.top - pad.bottom) * i) / 5;
      ctx.beginPath();
      ctx.moveTo(pad.left, gy);
      ctx.lineTo(w - pad.right, gy);
      ctx.stroke();
    }
    for (let i = 0; i <= 5; i++) {
      const gx = pad.left + ((w - pad.left - pad.right) * i) / 5;
      ctx.beginPath();
      ctx.moveTo(gx, pad.top);
      ctx.lineTo(gx, h - pad.bottom);
      ctx.stroke();
    }

    // Axes labels
    ctx.fillStyle = "rgba(148, 163, 184, 0.6)";
    ctx.font = "10px var(--font-jetbrains), monospace";
    ctx.fillText("x (m)", w / 2 - 12, h - 6);
    ctx.save();
    ctx.translate(12, h / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("y (m)", 0, 0);
    ctx.restore();

    // Full trajectory (faded)
    ctx.beginPath();
    trajectory.forEach((p, i) => {
      const px = toX(p.x);
      const py = toY(p.y);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    const grad = ctx.createLinearGradient(pad.left, 0, w - pad.right, 0);
    grad.addColorStop(0, "rgba(0, 240, 255, 0.2)");
    grad.addColorStop(1, "rgba(139, 92, 246, 0.4)");
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Progress path (up to live point)
    const progressIdx = trajectory.findIndex((p) => p.t >= liveState.t);
    const slice = trajectory.slice(
      0,
      progressIdx === -1 ? trajectory.length : progressIdx + 1
    );

    if (slice.length > 1) {
      ctx.beginPath();
      slice.forEach((p, i) => {
        const px = toX(p.x);
        const py = toY(p.y);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.strokeStyle = "#00f0ff";
      ctx.lineWidth = 2.5;
      ctx.shadowColor = "#00f0ff";
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Live dot
    const dotX = toX(liveState.x);
    const dotY = toY(Math.max(0, liveState.y));
    ctx.beginPath();
    ctx.arc(dotX, dotY, isRunning ? 6 : 5, 0, Math.PI * 2);
    ctx.fillStyle = isRunning ? "#00f0ff" : "#8b5cf6";
    ctx.shadowColor = "#00f0ff";
    ctx.shadowBlur = isRunning ? 16 : 8;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Apex marker
    const apex = trajectory.reduce((a, b) => (b.y > a.y ? b : a), trajectory[0]);
    if (apex) {
      ctx.beginPath();
      ctx.arc(toX(apex.x), toY(apex.y), 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(236, 72, 153, 0.8)";
      ctx.fill();
    }
  }, [trajectory, liveState, isRunning]);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power3.out" }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="glass rounded-xl p-3 h-48 sm:h-56 w-full"
    >
      <p className="text-[10px] tracking-[0.3em] text-cyan-500/80 mb-2 px-1">
        TRAJECTORY GRAPH
      </p>
      <canvas ref={canvasRef} className="w-full h-[calc(100%-24px)]" />
    </div>
  );
}
