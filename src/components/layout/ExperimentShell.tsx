"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { markExperimentComplete } from "@/lib/progress";

interface ExperimentShellProps {
  title: string;
  subtitle: string;
  experimentId: string;
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  onComplete?: () => void;
}

export function ExperimentShell({
  title,
  subtitle,
  experimentId,
  children,
  sidebar,
}: ExperimentShellProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      markExperimentComplete(experimentId);
    }, 30000);
    return () => clearTimeout(timer);
  }, [experimentId]);

  return (
    <div className="relative min-h-screen bg-[#030712]">
      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 sm:px-6 glass border-b border-white/5">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Virtuos Lab
        </Link>
        <div className="text-center">
          <p className="font-[family-name:var(--font-orbitron)] text-xs text-cyan-400 tracking-widest">
            {title}
          </p>
          <p className="text-[10px] text-slate-600">{subtitle}</p>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-violet-400"
        >
          <CheckCircle className="h-3.5 w-3.5" />
          Progress
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen pt-14">
        <div className="flex-1 relative min-h-[55vh] lg:min-h-screen">{children}</div>
        {sidebar && (
          <aside className="relative z-30 w-full lg:w-96 p-4 sm:p-6 flex flex-col gap-4 lg:max-h-screen lg:overflow-y-auto pointer-events-auto">
            {sidebar}
          </aside>
        )}
      </div>
    </div>
  );
}
