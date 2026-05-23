"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rocket } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { scale: 0.95, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      }
    );
  }, []);

  return (
    <section id="cta" ref={ref} className="px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl glass-strong holographic p-12 sm:p-16 text-center">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.08),transparent_70%)]" />

          <Rocket className="mx-auto h-12 w-12 text-cyan-400 mb-6" />
          <h2 className="font-[family-name:var(--font-orbitron)] text-3xl font-bold text-white sm:text-4xl">
            Ready to Enter the Lab?
          </h2>
          <p className="mt-4 text-slate-400 max-w-lg mx-auto">
            Join thousands of students exploring science in the most immersive virtual laboratory ever built.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <GlowButton variant="primary" href="/experiments/projectile-motion">
              Launch Laboratory
            </GlowButton>
            <GlowButton variant="secondary" href="/experiments/projectile-motion">
              Try Demo
            </GlowButton>
            <GlowButton variant="ghost" href="/dashboard">
              Open Dashboard
            </GlowButton>
          </div>
        </div>
      </div>
    </section>
  );
}
