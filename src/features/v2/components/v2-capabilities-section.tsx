"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GsapReveal } from "./gsap-reveal";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    number: "01",
    title: "Bespoke Web Applications & SaaS",
    description:
      "Custom, high-performance web applications tailored to specific business logic. Clean, scalable stacks (React, .NET, Node) designed to handle everything from internal ERPs to public-facing SaaS platforms.",
    tags: ["React", "Next.js", ".NET", "Node", "TypeScript", "PostgreSQL", "SaaS", "ERP"],
  },
  {
    number: "02",
    title: "Interactive Software & Game Dev",
    description:
      "Software that doesn't just work — it feels flawless. Gamified applications, interactive educational tools, and highly fluid user interfaces built with Unity and advanced frontend frameworks.",
    tags: ["Unity", "WebGL", "Three.js", "GSAP", "Interactive", "Gamification"],
  },
  {
    number: "03",
    title: "Machine Learning & Data Pipelines",
    description:
      "Intelligence integrated into web apps. From cleaning and interpolating millions of rows of legacy data to building predictive models that learn from user input.",
    tags: ["Python", "TensorFlow", "PyTorch", "Data Pipelines", "Predictive Models", "ML"],
  },
  {
    number: "04",
    title: "Complex Systems Integration & Rescue",
    description:
      "Tactical expertise to parachute into broken, legacy systems. Proxy architectures, messy API translation, and modern bridge applications to keep enterprise operations running.",
    tags: ["Legacy Rescue", "API Translation", "Proxy Architecture", "Enterprise", "Bridge Apps"],
  },
];

export function V2CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const items = el.querySelectorAll(".cap-item");
    items.forEach((item) => {
      const line = item.querySelector(".cap-line");
      if (!line) return;

      gsap.set(line, { scaleX: 0 });

      ScrollTrigger.create({
        trigger: item,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(line, {
            scaleX: 1,
            duration: 1.4,
            ease: "cubic-bezier(0.8, 0, 0, 1)",
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="v2-capabilities"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-16"
    >
      <div className="max-w-[1200px] mx-auto">
        <GsapReveal>
          <div className="flex items-baseline gap-4 mb-4">
            <span
              className="text-[10px] uppercase tracking-[0.05em] text-white/20"
              style={{ fontFamily: "var(--font-pixel), monospace" }}
            >
              02
            </span>
            <h2
              className="text-[clamp(2rem,4vw,3.5rem)] font-bold uppercase tracking-tight"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              Capabilities
            </h2>
          </div>
        </GsapReveal>

        <GsapReveal delay={100}>
          <p
            className="text-[10px] uppercase tracking-[0.05em] text-white/15 mb-16 md:mb-24"
            style={{ fontFamily: "var(--font-pixel), monospace" }}
          >
            What we build.
          </p>
        </GsapReveal>

        <div className="space-y-0">
          {capabilities.map((cap, i) => (
            <GsapReveal key={cap.number} delay={i * 80}>
              <div className="cap-item group cursor-default py-10 md:py-12 backdrop-blur-md bg-black/40">
                {/* Animated line */}
                <div className="cap-line h-px bg-white/[0.08] mb-10 md:mb-12 origin-left" />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-9">
                  {/* Number */}
                  <div className="md:col-span-1">
                    <span
                      className="text-[10px] uppercase tracking-[0.05em] text-white/15 transition-all duration-[600ms] ease-[cubic-bezier(0.8,0,0,1)] group-hover:text-white/50"
                      style={{ fontFamily: "var(--font-pixel), monospace" }}
                    >
                      {cap.number}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="md:col-span-5">
                    <h3
                      className="text-xl md:text-2xl font-bold uppercase tracking-tight transition-transform duration-[600ms] ease-[cubic-bezier(0.8,0,0,1)] group-hover:translate-x-2"
                      style={{ fontFamily: "var(--font-syne), sans-serif" }}
                    >
                      {cap.title}
                    </h3>
                  </div>

                  {/* Description + tags */}
                  <div className="md:col-span-6">
                    <p className="font-sans text-[13px] text-white/30 leading-[1.7] mb-6 transition-colors duration-500 group-hover:text-white/50">
                      {cap.description}
                    </p>

                    {/* Tags — pixel-style badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {cap.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] uppercase tracking-[0.05em] text-white/10 border border-white/[0.06] px-2.5 py-1 transition-all duration-300 group-hover:border-white/[0.1] group-hover:text-white/25"
                          style={{ fontFamily: "var(--font-pixel), monospace" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
