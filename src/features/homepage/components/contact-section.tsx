import { Reveal } from "./reveal";

export function ContactSection() {
  return (
    <section className="px-6 md:px-16 lg:px-24 py-24">
      <Reveal>
        <h2 className="font-sans text-3xl md:text-4xl font-700 tracking-tight mb-8">
          <span className="text-muted-foreground font-mono text-lg font-normal">
            &gt;_{" "}
          </span>
          Contact
        </h2>
      </Reveal>

      <Reveal delay={80}>
        <p className="text-sm text-muted-foreground mb-6">
          Have a project that needs precise engineering? Let&apos;s talk.
        </p>
        <a
          href="mailto:hello@cmdblock.tech"
          className="group relative inline-block text-lg font-sans font-600 pb-1"
        >
          <span className="relative z-10 transition-colors duration-300 group-hover:text-muted-foreground">
            hello@cmdblock.tech
          </span>
          <span className="absolute bottom-0 left-0 h-px w-full bg-foreground transition-all duration-500 ease-out group-hover:h-[2px] group-hover:bg-muted-foreground" />
        </a>
      </Reveal>

      <Reveal delay={160}>
        <div className="mt-24 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-xs text-muted-foreground font-mono">
            &copy; {new Date().getFullYear()} cmdblock.tech
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            Built with precision.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
