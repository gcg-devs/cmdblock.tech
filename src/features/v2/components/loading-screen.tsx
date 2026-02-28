"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  const stableOnComplete = useCallback(onComplete, [onComplete]);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "power4.inOut",
          onComplete: stableOnComplete,
        });
      },
    });

    // Pixel blocks animate in
    const blocks = blocksRef.current?.children;
    if (blocks) {
      gsap.set(blocks, { scale: 0, opacity: 0 });
      tl.to(
        blocks,
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "back.out(2)",
        },
        0
      );
    }

    // Logo reveal
    tl.fromTo(
      logoRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power4.out" },
      0.3
    );

    // Counter
    tl.to(
      { val: 0 },
      {
        val: 100,
        duration: 1.8,
        ease: "power2.inOut",
        onUpdate: function () {
          setCount(Math.round(this.targets()[0].val));
        },
      },
      0.2
    );

    // Progress bar
    tl.to(
      progressRef.current,
      { scaleX: 1, duration: 1.8, ease: "power2.inOut" },
      0.2
    );

    return () => {
      tl.kill();
    };
  }, [stableOnComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
    >
      {/* Pixel block cluster */}
      <div ref={blocksRef} className="flex gap-1 mb-8">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 bg-white"
            style={{ opacity: 1 - i * 0.15 }}
          />
        ))}
      </div>

      <div ref={logoRef} className="flex flex-col items-center gap-6" style={{ opacity: 0 }}>
        <span
          className="text-[13px] tracking-[0.2em] uppercase text-white/60"
          style={{ fontFamily: "var(--font-pixel), monospace" }}
        >
          &gt;_ cmdblock.tech
        </span>

        {/* Progress */}
        <div className="w-[180px] flex flex-col items-center gap-3">
          <div className="w-full h-[2px] bg-white/10 relative overflow-hidden">
            <div
              ref={progressRef}
              className="absolute inset-0 bg-white origin-left"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          <span
            className="text-[10px] text-white/25 tabular-nums tracking-widest"
            style={{ fontFamily: "var(--font-pixel), monospace" }}
          >
            {String(count).padStart(3, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
