"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GsapReveal } from "./gsap-reveal";

gsap.registerPlugin(ScrollTrigger);

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

export function V2PhilosophySection() {
  const statementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = statementRef.current;
    if (!el) return;

    const words = el.querySelectorAll(".phil-word");

    gsap.set(words, { opacity: 0.08 });

    ScrollTrigger.create({
      trigger: el,
      start: "top 70%",
      end: "bottom 30%",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        words.forEach((word, i) => {
          const wordProgress = i / words.length;
          const opacity = gsap.utils.clamp(
            0.08,
            1,
            1 - Math.abs(progress - wordProgress) * 3
          );
          gsap.set(word, { opacity });
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const statementText =
    "We bring the unexpected to software engineering — precision, obsession, and theoretical depth fused into every line of code.";
  const statementWords = statementText.split(" ");

  return (
    <section id="v2-philosophy" className="py-24 md:py-32">
      {/* Big scrub statement — grilledpixels style */}
      <div className="px-6 md:px-12 lg:px-16 py-24 md:py-40">
        <div
          ref={statementRef}
          className="max-w-[1000px] mx-auto text-[clamp(1.6rem,3.5vw,3rem)] font-bold uppercase leading-[1.2] tracking-tight"
          style={{ fontFamily: "var(--font-syne), sans-serif" }}
        >
          {statementWords.map((word, i) => (
            <span key={i} className="phil-word inline-block mr-[0.3em]">
              {word === "unexpected" ||
              word === "precision," ||
              word === "obsession," ? (
                <span className="italic font-normal">{word}</span>
              ) : (
                word
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Principles */}
      <div className="px-6 md:px-12 lg:px-16 max-w-[1200px] mx-auto">
        <GsapReveal>
          <div className="flex items-baseline gap-4 mb-4">
            <span
              className="text-[10px] uppercase tracking-[0.05em] text-white/20"
              style={{ fontFamily: "var(--font-pixel), monospace" }}
            >
              03
            </span>
            <h2
              className="text-[clamp(2rem,4vw,3.5rem)] font-bold uppercase tracking-tight"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              Philosophy
            </h2>
          </div>
        </GsapReveal>

        <GsapReveal delay={100}>
          <p
            className="text-[10px] uppercase tracking-[0.05em] text-white/15 mb-16 md:mb-24"
            style={{ fontFamily: "var(--font-pixel), monospace" }}
          >
            How we think.
          </p>
        </GsapReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {principles.map((principle, i) => (
            <GsapReveal key={principle.title} delay={200 + i * 120}>
              <div className="group border border-white/[0.06] p-8 md:p-10 h-full cursor-default transition-all duration-[600ms] ease-[cubic-bezier(0.8,0,0,1)] hover:bg-white/[0.02] hover:border-white/[0.12] backdrop-blur-md bg-black/40">
                <div className="flex gap-0.5 mb-8">
                  {[...Array(4)].map((_, j) => (
                    <div
                      key={j}
                      className="w-1.5 h-1.5 bg-white transition-all duration-700 ease-[cubic-bezier(0.8,0,0,1)] group-hover:w-3"
                      style={{ opacity: 1 - j * 0.25 }}
                    />
                  ))}
                </div>

                <h3
                  className="text-lg font-bold uppercase tracking-tight mb-4 transition-transform duration-[600ms] ease-[cubic-bezier(0.8,0,0,1)] group-hover:translate-x-1"
                  style={{ fontFamily: "var(--font-syne), sans-serif" }}
                >
                  {principle.title}
                </h3>

                <p className="font-sans text-[13px] text-white/30 leading-[1.7] transition-colors duration-500 group-hover:text-white/50">
                  {principle.description}
                </p>
              </div>
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
