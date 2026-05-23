"use client";

import { useState } from "react";
import { Loader2, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { GlowButton } from "@/components/ui/GlowButton";
import { AuthModal } from "./AuthModal";
import { UserMenu } from "./UserMenu";

export function AuthNavbarActions() {
  const { user, loading } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const openLogin = () => {
    setAuthMode("login");
    setAuthOpen(true);
  };

  const openSignup = () => {
    setAuthMode("signup");
    setAuthOpen(true);
  };

  if (loading) {
    return (
      <div className="flex h-10 w-10 items-center justify-center">
        <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
      </div>
    );
  }

  if (user) {
    return <UserMenu />;
  }

  return (
    <>
      <div className="hidden sm:flex items-center gap-2">
        <button
          type="button"
          onClick={openLogin}
          className="text-sm text-slate-400 hover:text-cyan-300 transition-colors px-3 py-2"
        >
          Sign In
        </button>
        <GlowButton variant="primary" onClick={openSignup} className="!px-5 !py-2.5 text-xs">
          Sign Up
        </GlowButton>
      </div>
      <button
        type="button"
        onClick={openLogin}
        className="sm:hidden flex items-center gap-1 text-sm text-cyan-400"
      >
        <LogIn className="h-4 w-4" />
        Sign In
      </button>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} initialMode={authMode} />
    </>
  );
}
