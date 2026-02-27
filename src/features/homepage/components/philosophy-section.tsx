import { Reveal } from "./reveal";

const principles = [
  {
    title: "Execute with Precision",
    description:
      "Like a command block, our code is designed to do exactly what it is instructed to do — no bloat, no unnecessary dependencies.",
  },
  {
    title: "Hyper-Focused Engineering",
    description:
      "We leverage our neurodivergent strengths — obsessive attention to detail, rapid problem solving, and deep dives into complex logic — to build software faster and better.",
  },
  {
    title: "Theoretical meets Practical",
    description:
      "We understand the deep math and theoretical logic behind the code, allowing us to build custom algorithms that out-perform standard solutions.",
  },
];

export function PhilosophySection() {
  return (
    <section className="px-6 md:px-16 lg:px-24 py-24">
      <Reveal>
        <h2 className="font-sans text-3xl md:text-4xl font-700 tracking-tight mb-16">
          <span className="text-muted-foreground font-mono text-lg font-normal">
            &gt;_{" "}
          </span>
          Philosophy
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
        {principles.map((principle, i) => (
          <Reveal key={principle.title} delay={i * 120}>
            <div className="group cursor-default">
              <div className="w-8 h-px bg-foreground mb-6 transition-all duration-500 ease-out group-hover:w-16" />
              <h3 className="font-sans text-lg font-600 mb-3 transition-transform duration-300 group-hover:translate-x-1">
                {principle.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed transition-colors duration-300 group-hover:text-foreground/70">
                {principle.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
