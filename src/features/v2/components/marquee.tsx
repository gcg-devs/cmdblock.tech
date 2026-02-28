"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
}

export function Marquee({
  children,
  speed = 40,
  direction = "left",
  className = "",
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    const items = inner.children;
    if (items.length === 0) return;

    // Clone items for seamless loop
    const totalWidth = inner.scrollWidth;
    const clone = inner.innerHTML;
    inner.innerHTML = clone + clone;

    const dirMult = direction === "left" ? -1 : 1;

    const tl = gsap.to(inner, {
      x: dirMult * totalWidth,
      duration: totalWidth / speed,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => {
          const val = parseFloat(x) % totalWidth;
          return direction === "left" ? val : val;
        }),
      },
    });

    return () => {
      tl.kill();
    };
  }, [speed, direction]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={innerRef} className="flex whitespace-nowrap will-change-transform">
        {children}
      </div>
    </div>
  );
}
