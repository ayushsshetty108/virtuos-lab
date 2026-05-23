"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Atom, Loader2, Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "./AuthModal";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setAuthOpen(true);
    }
    if (user) {
      setAuthOpen(false);
    }
  }, [loading, user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-cyan-400" />
        <p className="text-sm text-slate-500 tracking-widest">AUTHENTICATING</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center px-6">
        <div className="glass-strong rounded-2xl p-10 max-w-md text-center border border-cyan-500/20">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10">
            <Lock className="h-8 w-8 text-cyan-400" />
          </div>
          <h1 className="font-[family-name:var(--font-orbitron)] text-xl font-bold text-white mb-2">
            Access Restricted
          </h1>
          <p className="text-sm text-slate-400 mb-6">
            Sign in to access your Virtuos Lab command dashboard and track your experiments.
          </p>
          <button
            type="button"
            onClick={() => setAuthOpen(true)}
            className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-100 border border-cyan-400/40 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all"
          >
            <Atom className="h-4 w-4" />
            Sign In to Continue
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="mt-4 block w-full text-xs text-slate-500 hover:text-cyan-400 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
        <AuthModal
          open={authOpen}
          onClose={() => setAuthOpen(false)}
          initialMode="login"
        />
      </div>
    );
  }

  return <>{children}</>;
}
