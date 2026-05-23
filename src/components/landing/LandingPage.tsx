"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "./LoadingScreen";
import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { ExperimentsHub } from "./ExperimentsHub";
import { FeaturesSection } from "./FeaturesSection";
import { ShowcaseSection } from "./ShowcaseSection";
import { FloatingAssistant } from "@/components/ai/FloatingAssistant";
import { CTASection } from "./CTASection";
import { Footer } from "./Footer";

export function LandingPage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {!loaded && <LoadingScreen key="loader" onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      {loaded && (
        <main className="scanlines relative min-h-screen bg-[#030712]">
          <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,240,255,0.08),transparent)]" />
          <Navbar />
          <HeroSection />
          <ExperimentsHub />
          <FeaturesSection />
          <ShowcaseSection />
          <FloatingAssistant />
          <CTASection />
          <Footer />
        </main>
      )}
    </>
  );
}
