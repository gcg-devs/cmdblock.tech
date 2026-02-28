"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function FixedHeader() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 2.5, ease: "power4.out" }
    );
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-[2500] px-6 py-5 flex items-center justify-between"
      style={{ opacity: 0 }}
    >
      {/* Logo — >_ branding */}
      <a href="#" className="flex items-center gap-2.5 group">
        <span
          className="text-[13px] tracking-[0.15em] uppercase text-white group-hover:text-white/70 transition-colors duration-300"
          style={{ fontFamily: "var(--font-pixel), monospace" }}
        >
          &gt;_ cmdblock
        </span>
        <span
          className="text-[13px] tracking-[0.15em] uppercase text-white/30"
          style={{ fontFamily: "var(--font-pixel), monospace" }}
        >
          .tech
        </span>
      </a>

      {/* Nav */}
      <nav className="hidden lg:flex items-center gap-8">
        {["Unit", "Capabilities", "Philosophy", "Contact"].map((item) => (
          <a
            key={item}
            href={`#v2-${item.toLowerCase()}`}
            className="relative text-[12px] tracking-[0.1em] uppercase text-white/40 hover:text-white transition-colors duration-300 before:absolute before:left-[-12px] before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-white before:scale-0 before:transition-transform before:duration-500 hover:before:scale-100 after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-600 hover:after:w-full"
            style={{ fontFamily: "var(--font-pixel), monospace" }}
          >
            {item}
          </a>
        ))}
      </nav>
    </header>
  );
}
