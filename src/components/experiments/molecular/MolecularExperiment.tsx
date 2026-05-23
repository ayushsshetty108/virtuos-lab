"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ExperimentShell } from "@/components/layout/ExperimentShell";
import { FuturisticSlider } from "@/components/experiments/ui/FuturisticSlider";
import { MOLECULES, type MoleculeKey } from "./MolecularScene";

const MolecularScene = dynamic(
  () => import("./MolecularScene").then((m) => m.MolecularScene),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-[#030712]" /> }
);

export function MolecularExperiment() {
  const [molecule, setMolecule] = useState<MoleculeKey>("water");
  const [autoRotate, setAutoRotate] = useState(true);
  const [zoom, setZoom] = useState(1);

  const sidebar = (
    <>
      <div className="glass-strong rounded-2xl p-5">
        <h3 className="font-[family-name:var(--font-orbitron)] text-sm text-white mb-4">MOLECULES</h3>
        <div className="space-y-2">
          {(Object.keys(MOLECULES) as MoleculeKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setMolecule(key)}
              className={`w-full rounded-xl p-3 border text-left text-sm transition-all ${
                molecule === key
                  ? "border-emerald-500/50 bg-emerald-500/10 text-white"
                  : "border-white/5 text-slate-400"
              }`}
            >
              {MOLECULES[key].name} — {MOLECULES[key].formula}
            </button>
          ))}
        </div>
        <div className="mt-4 space-y-4">
          <FuturisticSlider label="Zoom" value={zoom} min={0.5} max={2} step={0.1} unit="×" onChange={setZoom} color="emerald" />
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
          <input
            type="checkbox"
            checked={autoRotate}
            onChange={(e) => setAutoRotate(e.target.checked)}
            className="accent-cyan-500"
          />
          Auto-rotate
        </label>
      </div>
      <p className="text-xs text-slate-600">Drag to orbit · Scroll to zoom · Hover atoms for detail</p>
    </>
  );

  return (
    <ExperimentShell title="MOLECULAR VIEWER" subtitle="3D Structure Explorer" experimentId="molecular-viewer" sidebar={sidebar}>
      <MolecularScene molecule={molecule} autoRotate={autoRotate} zoom={zoom} />
    </ExperimentShell>
  );
}
