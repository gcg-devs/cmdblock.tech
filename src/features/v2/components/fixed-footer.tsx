"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function FixedFooter() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 2.8, ease: "power4.out" }
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      className="fixed bottom-0 left-0 right-0 z-[2500] px-6 py-4 flex items-center justify-between border-t border-white/[0.06] bg-black/60 backdrop-blur-md"
      style={{ opacity: 0 }}
    >
      <span
        className="text-[10px] uppercase tracking-[0.05em] text-white/20"
        style={{ fontFamily: "var(--font-pixel), monospace" }}
      >
        &copy; {new Date().getFullYear()} cmdblock.tech
      </span>

      <div className="hidden md:flex items-center gap-6">
        <span
          className="text-[10px] uppercase tracking-[0.05em] text-white/15"
          style={{ fontFamily: "var(--font-pixel), monospace" }}
        >
          Boutique Engineering Studio
        </span>
      </div>

      <a
        href="#v2-contact"
        className="relative text-[12px] uppercase tracking-[0.05em] text-white px-2 py-1 cursor-pointer transition-all duration-300 before:absolute before:bottom-0 before:left-0 before:z-[-1] before:w-0 before:h-full before:bg-white before:transition-all before:duration-300 hover:text-black hover:before:w-full"
        style={{ fontFamily: "var(--font-pixel), monospace" }}
      >
        Let&apos;s talk →
      </a>
    </footer>
  );
}
