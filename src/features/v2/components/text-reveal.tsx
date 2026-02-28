"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  scrollTriggered?: boolean;
}

export function TextReveal({
  text,
  className = "",
  tag: Tag = "span",
  delay = 0,
  scrollTriggered = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const lines = el.querySelectorAll(".tr-line");

    gsap.set(lines, { y: "110%", opacity: 0 });

    const config: gsap.TweenVars = {
      y: "0%",
      opacity: 1,
      duration: 1,
      stagger: 0.08,
      delay: delay / 1000,
      ease: "power4.out",
    };

    if (scrollTriggered) {
      config.scrollTrigger = {
        trigger: el,
        start: "top 85%",
        once: true,
      };
    }

    const tween = gsap.to(lines, config);

    return () => {
      tween.kill();
    };
  }, [delay, scrollTriggered]);

  const lines = text.split("\n");

  return (
    <div ref={containerRef}>
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden">
            <span className="tr-line block">{line}</span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
