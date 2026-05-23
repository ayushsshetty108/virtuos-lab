"use client";

import { Atom } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-12">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg glass">
            <Atom className="h-4 w-4 text-cyan-400" />
          </div>
          <span className="font-[family-name:var(--font-orbitron)] text-sm text-slate-400">
            VIRTUOS<span className="text-cyan-400">LAB</span>
          </span>
        </div>
        <p className="text-xs text-slate-600">
          © {new Date().getFullYear()} Virtuos Lab — The Future of Science Education
        </p>
        <div className="flex gap-6 text-xs text-slate-500">
          <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
