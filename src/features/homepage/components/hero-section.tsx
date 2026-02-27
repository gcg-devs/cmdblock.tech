export function HeroSection() {
  return (
    <section className="min-h-[85vh] flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24">
      <div className="max-w-4xl">
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-8 animate-reveal reveal-delay-1">
          Boutique Software Engineering Studio
        </p>

        <h1 className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-800 tracking-tight leading-[0.9] mb-8 animate-reveal reveal-delay-2">
          <span className="text-muted-foreground font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal">
            &gt;_{" "}
          </span>
          cmdblock
          <span className="text-muted-foreground">.tech</span>
        </h1>

        <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed animate-reveal reveal-delay-3">
          We architect and build custom web applications, enterprise systems,
          and interactive software from the ground up. A tight-knit unit of
          engineers who turn complex theoretical logic into flawless, executable
          software.
        </p>

        <div className="mt-12 animate-reveal reveal-delay-4">
          <a
            href="#unit"
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <span>Scroll to explore</span>
            <span className="inline-block animate-bounce-subtle">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
