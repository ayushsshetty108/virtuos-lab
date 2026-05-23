"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Brain } from "lucide-react";

export function FloatingAssistant() {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring" }}
    >
      <Link href="/ai-assistant">
        <motion.div
          className="relative flex h-14 w-14 items-center justify-center rounded-full glass-strong border border-cyan-500/40 shadow-[0_0_30px_rgba(0,240,255,0.3)]"
          whileHover={{ scale: 1.08 }}
          animate={{
            boxShadow: [
              "0 0 20px rgba(0,240,255,0.2)",
              "0 0 40px rgba(0,240,255,0.4)",
              "0 0 20px rgba(0,240,255,0.2)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Brain className="h-6 w-6 text-cyan-400" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
        </motion.div>
      </Link>
    </motion.div>
  );
}
