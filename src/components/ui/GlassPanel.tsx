"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  holographic?: boolean;
  delay?: number;
}

export function GlassPanel({
  children,
  className,
  holographic = false,
  delay = 0,
}: GlassPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "rounded-2xl p-6",
        holographic ? "glass-strong holographic" : "glass",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
