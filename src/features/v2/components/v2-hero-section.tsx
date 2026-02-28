"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function V2HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.2 });

    // Heading lines reveal — grilledpixels style mask wipe
    const lines = headingRef.current?.querySelectorAll(".hero-line");
    if (lines) {
      gsap.set(lines, { y: "110%", opacity: 0 });
      tl.to(lines, {
        y: "0%",
        opacity: 1,
        duration: 1.4,
        stagger: 0.12,
        ease: "cubic-bezier(0.8, 0, 0, 1)",
      });
    }

    // Subtitle
    tl.fromTo(
      subtitleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
      "-=0.8"
    );

    // Description
    tl.fromTo(
      descRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
      "-=0.7"
    );

    // Stats
    const statItems = statsRef.current?.querySelectorAll(".stat-item");
    if (statItems) {
      gsap.set(statItems, { y: 30, opacity: 0 });
      tl.to(
        statItems,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power4.out",
        },
        "-=0.5"
      );
    }

    // Scroll indicator
    tl.fromTo(
      scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-16 py-32"
    >
      <div className="max-w-[1200px] mx-auto w-full grid grid-cols-2 md:grid-cols-12 gap-x-6 lg:gap-x-9">
        {/* Left — heading */}
        <div className="col-span-2 md:col-span-8 lg:col-span-7">
          <p
            ref={subtitleRef}
            className="text-[10px] md:text-[11px] uppercase tracking-[0.05em] text-white/20 mb-10"
            style={{ fontFamily: "var(--font-pixel), monospace", opacity: 0 }}
          >
            Boutique Software Engineering Studio
          </p>

          <h1
            ref={headingRef}
            className="uppercase leading-[0.95] tracking-tight mb-12"
          >
            {/* >_ prefix */}
            <span className="block overflow-hidden">
              <span
                className="hero-line block text-[clamp(1.2rem,3vw,2rem)] text-white/30 mb-2"
                style={{ fontFamily: "var(--font-pixel), monospace" }}
              >
                &gt;_
              </span>
            </span>
            {/* cmdblock.tech — single line */}
            <span className="block">
              <span
                className="hero-line block text-[clamp(1.8rem,4.8vw,3.6rem)] font-extrabold"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                cmdblock<span className="text-white/25">.tech</span>
              </span>
            </span>
          </h1>

          <p
            ref={descRef}
            className="font-sans text-[14px] md:text-[15px] text-white/35 leading-[1.7] max-w-lg"
            style={{ opacity: 0 }}
          >
            We architect and build custom web applications, enterprise systems,
            and interactive software from the ground up. A tight-knit unit of
            engineers who turn complex theoretical logic into flawless,
            executable software.
          </p>
        </div>

        {/* Right — stats */}
        <div
          ref={statsRef}
          className="col-span-2 md:col-span-4 lg:col-span-5 flex flex-col justify-end items-start md:items-end gap-10 mt-16 md:mt-0"
        >
          {[
            { label: "Engineers", value: "x3" },
            { label: "Capabilities", value: "x4" },
            { label: "Precision", value: "x99" },
          ].map((stat) => (
            <div key={stat.label} className="stat-item text-right">
              <span
                className="block text-[10px] uppercase tracking-[0.05em] text-white/15 mb-1.5"
                style={{ fontFamily: "var(--font-pixel), monospace" }}
              >
                {stat.label}
              </span>
              <span
                className="block text-3xl md:text-4xl font-bold text-white"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator — bottom left */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-6 md:left-12 lg:left-16"
        style={{ opacity: 0 }}
      >
        <a
          href="#v2-unit"
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-white/20 hover:text-white/40 transition-colors duration-300"
          style={{ fontFamily: "var(--font-pixel), monospace" }}
        >
          <span>Scroll</span>
          <span className="inline-block animate-bounce-subtle">↓</span>
        </a>
      </div>
    </section>
  );
}
