"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GsapReveal } from "./gsap-reveal";

gsap.registerPlugin(ScrollTrigger);

const members = [
  {
    name: "Ghegi",
    role: "Applications, Infrastructure & DevOps Lead",
    tag: "The Engine",
    description:
      "Thrives on high-velocity pattern recognition and complex logic execution. Specializing in full-stack web applications, cloud infrastructure, and CI/CD pipelines — the bridge between heavy backend architecture, deployment operations, and highly interactive, user-facing experiences.",
    stack: "React • .NET • Node • Docker • AWS • CI/CD",
  },
  {
    name: "Gudo",
    role: "Machine Learning & Theoretical Architecture",
    tag: "The Brain",
    description:
      "Brings heavy academic and theoretical computer science into practical application. Specializing in Machine Learning, Data Models, and Algorithmic Design — tackles the problems that standard web developers can't solve.",
    stack: "Python • TensorFlow • PyTorch • SQL • R",
  },
  {
    name: "Chan",
    role: "Fullstack Architecture & Integration",
    tag: "The Glue",
    description:
      "The Fullstack Generalist who ensures the entire system communicates flawlessly. Manages both frontend components and backend APIs, building scalable architecture that connects it all.",
    stack: "TypeScript • React • Node • PostgreSQL • Redis",
  },
];

export function V2UnitSection() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    const inner = el.querySelector(".marquee-inner") as HTMLElement;
    if (!inner) return;

    inner.innerHTML += inner.innerHTML;

    gsap.to(inner, {
      xPercent: -50,
      duration: 30,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <section id="v2-unit" className="py-24 md:py-32">
      {/* Marquee banner — grilledpixels style */}
      <div
        ref={marqueeRef}
        className="overflow-hidden border-y border-white/[0.06] py-4 mb-16 md:mb-24 backdrop-blur-md bg-black/40"
      >
        <div className="marquee-inner flex whitespace-nowrap gap-16">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="flex items-center gap-16 text-white/15"
              style={{ fontFamily: "var(--font-pixel), monospace", fontSize: "10px", letterSpacing: "0.05em", textTransform: "uppercase" }}
            >
              <span>We don&apos;t operate like a bloated agency</span>
              <span className="text-white/30">■</span>
              <span>We operate like a precise compiler</span>
              <span className="text-white/30">■</span>
            </span>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-12 lg:px-16 max-w-[1200px] mx-auto">
        <GsapReveal>
          <div className="flex items-baseline gap-4 mb-4">
            <span
              className="text-[10px] uppercase tracking-[0.05em] text-white/20"
              style={{ fontFamily: "var(--font-pixel), monospace" }}
            >
              01
            </span>
            <h2
              className="text-[clamp(2rem,4vw,3.5rem)] font-bold uppercase tracking-tight"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              The Unit
            </h2>
          </div>
        </GsapReveal>

        <GsapReveal delay={100}>
          <p
            className="text-[10px] uppercase tracking-[0.05em] text-white/15 mb-16"
            style={{ fontFamily: "var(--font-pixel), monospace" }}
          >
            Three engineers. Zero overhead.
          </p>
        </GsapReveal>

        {/* Member cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {members.map((member, i) => (
            <GsapReveal key={member.name} delay={200 + i * 120}>
              <div className="group border border-white/[0.06] p-8 md:p-10 h-full cursor-default transition-all duration-[600ms] ease-[cubic-bezier(0.8,0,0,1)] hover:bg-white/[0.02] hover:border-white/[0.12] backdrop-blur-md bg-black/40">
                <span
                  className="inline-block text-[10px] uppercase tracking-[0.05em] text-white/50 mb-6"
                  style={{ fontFamily: "var(--font-pixel), monospace" }}
                >
                  {member.tag}
                </span>

                {/* Name */}
                <h3
                  className="text-2xl font-bold uppercase mb-1 transition-transform duration-[600ms] ease-[cubic-bezier(0.8,0,0,1)] group-hover:translate-x-1"
                  style={{ fontFamily: "var(--font-syne), sans-serif" }}
                >
                  {member.name}
                </h3>

                {/* Role */}
                <p
                  className="text-[10px] uppercase tracking-[0.05em] text-white/20 mb-8"
                  style={{ fontFamily: "var(--font-pixel), monospace" }}
                >
                  {member.role}
                </p>

                {/* Description */}
                <p className="font-sans text-[13px] text-white/30 leading-[1.7] mb-8 transition-colors duration-500 group-hover:text-white/50">
                  {member.description}
                </p>

                {/* Stack */}
                <div className="pt-6 border-t border-white/[0.06]">
                  <span
                    className="text-[9px] uppercase tracking-[0.05em] text-white/10"
                    style={{ fontFamily: "var(--font-pixel), monospace" }}
                  >
                    {member.stack}
                  </span>
                </div>
              </div>
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
