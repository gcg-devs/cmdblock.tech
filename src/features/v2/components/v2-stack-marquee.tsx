"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  "React", "Next.js", ".NET", "Node", "TypeScript", "Python",
  "Unity", "Docker", "AWS", "PostgreSQL", "TensorFlow", "Redis",
  "WebGL", "Three.js", "CI/CD", "GSAP",
];

export function V2StackMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    const row1 = el.querySelector(".stack-row-1") as HTMLElement;
    const row2 = el.querySelector(".stack-row-2") as HTMLElement;

    if (row1) {
      row1.innerHTML += row1.innerHTML;
      gsap.to(row1, { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
    }

    if (row2) {
      row2.innerHTML += row2.innerHTML;
      gsap.to(row2, { xPercent: -50, duration: 55, ease: "none", repeat: -1 });
    }
  }, []);

  const half = Math.ceil(techStack.length / 2);
  const row1Items = techStack.slice(0, half);
  const row2Items = techStack.slice(half);

  return (
    <div
      ref={marqueeRef}
      className="py-16 md:py-24 border-y border-white/[0.06] overflow-hidden backdrop-blur-md bg-black/40"
    >
      {/* Row 1 */}
      <div className="stack-row-1 flex whitespace-nowrap gap-3 mb-3">
        {row1Items.map((tech, i) => (
          <span
            key={`r1-${i}`}
            className="inline-flex items-center px-5 py-2.5 border border-white/[0.06] text-white/15 hover:text-white/40 hover:border-white/[0.12] transition-all duration-300 cursor-default"
            style={{ fontFamily: "var(--font-pixel), monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            {tech}
          </span>
        ))}
      </div>
      {/* Row 2 */}
      <div className="stack-row-2 flex whitespace-nowrap gap-3">
        {row2Items.map((tech, i) => (
          <span
            key={`r2-${i}`}
            className="inline-flex items-center px-5 py-2.5 border border-white/[0.06] text-white/15 hover:text-white/40 hover:border-white/[0.12] transition-all duration-300 cursor-default"
            style={{ fontFamily: "var(--font-pixel), monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
