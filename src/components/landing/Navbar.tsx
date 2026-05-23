"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Atom, Menu, X } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";
import { NAV_LINKS } from "@/lib/experiments";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-500",
        scrolled ? "glass-strong py-3" : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl glass border border-cyan-500/30 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-shadow">
            <Atom className="h-5 w-5 text-cyan-400" />
          </div>
          <span className="font-[family-name:var(--font-orbitron)] text-sm font-bold tracking-wider text-white">
            VIRTUOS<span className="text-cyan-400">LAB</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-400 transition-colors hover:text-cyan-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <GlowButton variant="primary" href="/experiments/projectile-motion">
            Launch Experiment
          </GlowButton>
        </div>

        <button
          type="button"
          className="md:hidden text-slate-300"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden mt-4 glass rounded-2xl p-4 flex flex-col gap-4"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-slate-300 py-2"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <GlowButton variant="primary" href="/experiments/projectile-motion">
            Launch Experiment
          </GlowButton>
        </motion.div>
      )}
    </motion.header>
  );
}
