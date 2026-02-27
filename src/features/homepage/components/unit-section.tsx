import { Reveal } from "./reveal";

const members = [
  {
    name: "Ghegi",
    role: "Application & Interactive Systems Lead",
    tag: "The Engine",
    description:
      "Thrives on high-velocity pattern recognition and complex logic execution. Specializing in Web Applications (React/Next.js & .NET) and Game Development (Unity) — the bridge between heavy backend architecture and highly interactive, user-facing experiences.",
  },
  {
    name: "Gudo",
    role: "Machine Learning & Theoretical Architecture",
    tag: "The Brain",
    description:
      "Brings heavy academic and theoretical computer science into practical application. Specializing in Machine Learning, Data Models, and Algorithmic Design — tackles the problems that standard web developers can't solve.",
  },
  {
    name: "Chan",
    role: "Fullstack Architecture & Integration",
    tag: "The Glue",
    description:
      "The Fullstack Generalist who ensures the entire system communicates flawlessly. Manages both frontend components and backend APIs, building scalable architecture that connects it all into a seamless, uncrashable unit.",
  },
];

export function UnitSection() {
  return (
    <section id="unit" className="px-6 md:px-16 lg:px-24 py-24">
      <Reveal>
        <h2 className="font-sans text-3xl md:text-4xl font-700 tracking-tight mb-4">
          <span className="text-muted-foreground font-mono text-lg font-normal">
            &gt;_{" "}
          </span>
          The Unit
        </h2>
      </Reveal>
      <Reveal delay={80}>
        <p className="text-sm text-muted-foreground mb-16">
          We don&apos;t operate like a bloated agency. We operate like a precise
          compiler.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {members.map((member, i) => (
          <Reveal key={member.name} delay={120 + i * 100} className="bg-background h-full">
            <div className="p-8 h-full group cursor-default transition-colors duration-300 hover:bg-accent">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                {member.tag}
              </p>
              <h3 className="font-sans text-xl font-700 mb-1 transition-transform duration-300 group-hover:translate-x-1">
                {member.name}
              </h3>
              <p className="text-xs text-muted-foreground mb-6">
                {member.role}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed transition-colors duration-300 group-hover:text-foreground/70">
                {member.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
