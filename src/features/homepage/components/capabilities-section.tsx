import { Reveal } from "./reveal";

const capabilities = [
  {
    number: "01",
    title: "Bespoke Web Applications & SaaS",
    description:
      "Custom, high-performance web applications tailored to specific business logic. Clean, scalable stacks (React, .NET, Node) designed to handle everything from internal ERPs to public-facing SaaS platforms.",
  },
  {
    number: "02",
    title: "Interactive Software & Game Development",
    description:
      "Software that doesn't just work — it feels flawless. Gamified applications, interactive educational tools, and highly fluid user interfaces built with Unity and advanced frontend frameworks.",
  },
  {
    number: "03",
    title: "Machine Learning & Data Pipelines",
    description:
      "Intelligence integrated into web apps. From cleaning and interpolating millions of rows of legacy data to building predictive models that learn from user input.",
  },
  {
    number: "04",
    title: "Complex Systems Integration & Rescue",
    description:
      "Tactical expertise to parachute into broken, legacy systems. Proxy architectures, messy API translation, and modern bridge applications to keep enterprise operations running.",
  },
];

export function CapabilitiesSection() {
  return (
    <section className="px-6 md:px-16 lg:px-24 py-24">
      <Reveal>
        <h2 className="font-sans text-3xl md:text-4xl font-700 tracking-tight mb-16">
          <span className="text-muted-foreground font-mono text-lg font-normal">
            &gt;_{" "}
          </span>
          Capabilities
        </h2>
      </Reveal>

      <div className="space-y-0">
        {capabilities.map((cap, i) => (
          <Reveal key={cap.number} delay={i * 100}>
            <div className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-4 md:gap-12 py-8 group cursor-default">
              <span className="text-sm text-muted-foreground font-mono transition-all duration-300 group-hover:text-foreground group-hover:translate-x-1">
                {cap.number}
              </span>
              <div>
                <h3 className="font-sans text-lg md:text-xl font-600 mb-3 transition-transform duration-300 group-hover:translate-x-1">
                  {cap.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl transition-colors duration-300 group-hover:text-foreground/70">
                  {cap.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
