"use client";

import { useState, useCallback } from "react";
import { LoadingScreen } from "@/features/v2/components/loading-screen";
import { PixelGrid } from "@/features/v2/components/pixel-grid";
import { FixedHeader } from "@/features/v2/components/fixed-header";
import { FixedFooter } from "@/features/v2/components/fixed-footer";
import { V2HeroSection } from "@/features/v2/components/v2-hero-section";
import { V2UnitSection } from "@/features/v2/components/v2-unit-section";
import { V2StackMarquee } from "@/features/v2/components/v2-stack-marquee";
import { V2CapabilitiesSection } from "@/features/v2/components/v2-capabilities-section";
import { V2PhilosophySection } from "@/features/v2/components/v2-philosophy-section";
import { V2ContactSection } from "@/features/v2/components/v2-contact-section";

export default function V2Page() {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden relative">
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}

      {/* Reactive pixel trail — single cell lights up under cursor + grain texture */}
      <PixelGrid cellSize={34} maxOpacity={0.14} fadeDuration={600} />

      <FixedHeader />

      <main className="relative z-[1]">
        <V2HeroSection />
        <V2UnitSection />
        <V2StackMarquee />
        <V2CapabilitiesSection />
        <V2PhilosophySection />
        <V2ContactSection />
      </main>

      <FixedFooter />

      {/* Bottom spacer for fixed footer */}
      <div className="h-16" />
    </div>
  );
}
