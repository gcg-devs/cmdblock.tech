import { HeroSection } from "@/features/homepage/components/hero-section";
import { UnitSection } from "@/features/homepage/components/unit-section";
import { CapabilitiesSection } from "@/features/homepage/components/capabilities-section";
import { PhilosophySection } from "@/features/homepage/components/philosophy-section";
import { ContactSection } from "@/features/homepage/components/contact-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <hr className="border-border" />
      <UnitSection />
      <hr className="border-border" />
      <CapabilitiesSection />
      <hr className="border-border" />
      <PhilosophySection />
      <hr className="border-border" />
      <ContactSection />
    </main>
  );
}
