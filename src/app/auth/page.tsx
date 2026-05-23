"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Atom } from "lucide-react";
import { AuthModal } from "@/components/auth/AuthModal";

export default function AuthPage() {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,240,255,0.08),transparent)]" />
      <Link
        href="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs text-slate-500 hover:text-cyan-400 z-10"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Lab
      </Link>
      <div className="text-center mb-8 z-10">
        <Atom className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
        <h1 className="font-[family-name:var(--font-orbitron)] text-2xl font-bold text-white">
          Virtuos<span className="text-cyan-400">Lab</span>
        </h1>
        <p className="text-slate-500 text-sm mt-2">Secure access to your virtual laboratory</p>
      </div>
      <AuthModal open={open} onClose={() => setOpen(false)} initialMode="login" />
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="z-10 rounded-full px-8 py-3 text-sm font-semibold border border-cyan-400/40 text-cyan-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all"
        >
          Open Sign In
        </button>
      )}
    </div>
  );
}
