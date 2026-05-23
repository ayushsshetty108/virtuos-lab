"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
}

export function GlowButton({
  children,
  variant = "primary",
  className,
  onClick,
  href,
  disabled,
}: GlowButtonProps) {
  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 overflow-hidden";

  const variants = {
    primary:
      "bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-cyan-500/20 text-cyan-100 border border-cyan-400/40 hover:border-cyan-300/70 hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]",
    secondary:
      "glass text-slate-200 border border-white/10 hover:border-violet-400/40 hover:shadow-[0_0_25px_rgba(139,92,246,0.3)]",
    ghost:
      "text-slate-300 hover:text-cyan-300 border border-transparent hover:border-cyan-500/30",
  };

  const content = (
    <>
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      <span className="relative z-10">{children}</span>
    </>
  );

  const classes = cn(
    base,
    variants[variant],
    "group",
    disabled && "opacity-50 pointer-events-none",
    className
  );

  const motionProps = {
    whileHover: disabled ? undefined : { scale: 1.03 },
    whileTap: disabled ? undefined : { scale: 0.98 },
  };

  if (href && !disabled) {
    const isInternal = href.startsWith("/");
    if (isInternal) {
      return (
        <motion.div {...motionProps}>
          <Link href={href} className={classes}>
            {content}
          </Link>
        </motion.div>
      );
    }
    return (
      <motion.a href={href} className={classes} {...motionProps}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
