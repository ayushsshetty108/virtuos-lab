"use client";

import { cn } from "@/lib/utils";

interface FuturisticSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
  disabled?: boolean;
  color?: "cyan" | "violet" | "pink" | "emerald";
}

const accent: Record<string, string> = {
  cyan: "accent-cyan-400",
  violet: "accent-violet-400",
  pink: "accent-pink-400",
  emerald: "accent-emerald-400",
};

export function FuturisticSlider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
  disabled,
  color = "cyan",
}: FuturisticSliderProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("space-y-2", disabled && "opacity-50 pointer-events-none")}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium tracking-wider text-slate-400 uppercase">
          {label}
        </label>
        <span className="font-mono text-sm text-cyan-300">
          {value.toFixed(step < 1 ? 1 : 0)}
          {unit && <span className="text-slate-500 ml-1">{unit}</span>}
        </span>
      </div>
      <div className="relative h-2 rounded-full bg-slate-800/80 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-500/60 to-violet-500/60"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          disabled={disabled}
          className={cn(
            "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
            accent[color]
          )}
        />
      </div>
    </div>
  );
}
