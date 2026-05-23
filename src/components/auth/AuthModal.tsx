"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Atom, Loader2, LogIn, UserPlus, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

type AuthMode = "login" | "signup";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
}

export function AuthModal({ open, onClose, initialMode = "login" }: AuthModalProps) {
  const { signIn, signUp, error, clearError, loading: authLoading } = useAuth();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setMode(initialMode);
      clearError();
      setLocalError(null);
    }
  }, [open, initialMode, clearError]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const displayError = localError ?? error;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    if (!email.trim() || !password) {
      setLocalError("Please fill in all required fields.");
      return;
    }

    if (mode === "signup") {
      if (password.length < 6) {
        setLocalError("Password must be at least 6 characters.");
        return;
      }
      if (password !== confirmPassword) {
        setLocalError("Passwords do not match.");
        return;
      }
    }

    setSubmitting(true);
    try {
      if (mode === "login") {
        await signIn(email, password);
      } else {
        await signUp(email, password, displayName);
      }
      onClose();
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setDisplayName("");
    } catch {
      // Error set in context
    } finally {
      setSubmitting(false);
    }
  };

  const switchMode = (next: AuthMode) => {
    setMode(next);
    setLocalError(null);
    clearError();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 z-[201] w-full max-w-md -translate-x-1/2 -translate-y-1/2 px-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-modal-title"
          >
            <div className="glass-strong holographic rounded-2xl border border-cyan-500/20 p-6 sm:p-8 shadow-[0_0_60px_rgba(0,240,255,0.15)]">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10">
                    <Atom className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <h2
                      id="auth-modal-title"
                      className="font-[family-name:var(--font-orbitron)] text-lg font-bold text-white"
                    >
                      {mode === "login" ? "Welcome Back" : "Join Virtuos Lab"}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {mode === "login"
                        ? "Sign in to access your dashboard"
                        : "Create your scientist account"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-slate-500 hover:text-white hover:bg-white/5 transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex gap-1 p-1 rounded-xl bg-slate-900/80 mb-6">
                {(["login", "signup"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => switchMode(tab)}
                    className={cn(
                      "flex-1 rounded-lg py-2 text-xs font-semibold tracking-wider uppercase transition-all",
                      mode === tab
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                        : "text-slate-500 hover:text-slate-300"
                    )}
                  >
                    {tab === "login" ? "Sign In" : "Sign Up"}
                  </button>
                ))}
              </div>

              {displayError && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                >
                  {displayError}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "signup" && (
                  <div>
                    <label className="block text-[10px] tracking-widest text-slate-500 uppercase mb-1.5">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Dr. Nova"
                      className="w-full rounded-xl glass border border-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
                      autoComplete="name"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[10px] tracking-widest text-slate-500 uppercase mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="scientist@virtuos.lab"
                    required
                    className="w-full rounded-xl glass border border-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest text-slate-500 uppercase mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="w-full rounded-xl glass border border-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                  />
                </div>

                {mode === "signup" && (
                  <div>
                    <label className="block text-[10px] tracking-widest text-slate-500 uppercase mb-1.5">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full rounded-xl glass border border-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
                      autoComplete="new-password"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || authLoading}
                  className="w-full flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-cyan-500/20 text-cyan-100 border border-cyan-400/40 hover:border-cyan-300/70 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all disabled:opacity-50 disabled:pointer-events-none"
                >
                  {submitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : mode === "login" ? (
                    <LogIn className="h-4 w-4" />
                  ) : (
                    <UserPlus className="h-4 w-4" />
                  )}
                  {submitting
                    ? "Processing..."
                    : mode === "login"
                      ? "Sign In"
                      : "Create Account"}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
