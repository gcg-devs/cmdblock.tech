"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GsapReveal } from "./gsap-reveal";

gsap.registerPlugin(ScrollTrigger);

export function V2ContactSection() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    const inner = el.querySelector(".contact-marquee-inner") as HTMLElement;
    if (!inner) return;

    inner.innerHTML += inner.innerHTML;

    gsap.to(inner, {
      xPercent: -50,
      duration: 20,
      ease: "none",
      repeat: -1,
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="v2-contact" className="py-24 md:py-32">
      {/* Contact marquee — grilledpixels "Let's work together" style */}
      <div
        ref={marqueeRef}
        className="overflow-hidden border-y border-white/[0.06] py-5 mb-16 md:mb-24 backdrop-blur-md bg-black/40"
      >
        <div className="contact-marquee-inner flex whitespace-nowrap gap-12">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="flex items-center gap-12 text-white/30"
              style={{ fontFamily: "var(--font-pixel), monospace", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              <span>Let&apos;s work together</span>
              <span className="text-white/10">■</span>
            </span>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-12 lg:px-16 max-w-[600px] mx-auto">
        <GsapReveal>
          <div className="flex items-baseline gap-4 mb-4">
            <span
              className="text-[10px] uppercase tracking-[0.05em] text-white/20"
              style={{ fontFamily: "var(--font-pixel), monospace" }}
            >
              04
            </span>
            <h2
              className="text-[clamp(2rem,4vw,3.5rem)] font-bold uppercase tracking-tight"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              Contact
            </h2>
          </div>
        </GsapReveal>

        <GsapReveal delay={100}>
          <p className="font-sans text-[13px] text-white/30 leading-[1.7] mb-12">
            Have a project that needs precise engineering? Leave your details.
          </p>
        </GsapReveal>

        {/* Form — grilledpixels styled inputs */}
        <GsapReveal delay={200}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Name */}
            <fieldset className="relative border-none p-0 m-0">
              <label
                className="absolute top-0 left-6 -translate-y-1/2 z-10 bg-white px-1.5 py-0.5 text-black"
                style={{ fontFamily: "var(--font-pixel), monospace", fontSize: "10px", letterSpacing: "0.05em", textTransform: "uppercase" }}
              >
                Name
              </label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, name: e.target.value }))
                }
                placeholder="Your name"
                className="w-full h-[60px] px-6 bg-white/[0.03] border border-white/[0.06] font-sans text-[14px] text-white placeholder:text-white/20 focus:border-white/[0.15] focus:outline-none transition-colors duration-300 backdrop-blur-sm"
              />
            </fieldset>

            {/* Email */}
            <fieldset className="relative border-none p-0 m-0">
              <label
                className="absolute top-0 left-6 -translate-y-1/2 z-10 bg-white px-1.5 py-0.5 text-black"
                style={{ fontFamily: "var(--font-pixel), monospace", fontSize: "10px", letterSpacing: "0.05em", textTransform: "uppercase" }}
              >
                Email
              </label>
              <input
                type="email"
                value={formState.email}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, email: e.target.value }))
                }
                placeholder="your@email.com"
                className="w-full h-[60px] px-6 bg-white/[0.03] border border-white/[0.06] font-sans text-[14px] text-white placeholder:text-white/20 focus:border-white/[0.15] focus:outline-none transition-colors duration-300 backdrop-blur-sm"
              />
            </fieldset>

            {/* Message */}
            <fieldset className="relative border-none p-0 m-0">
              <label
                className="absolute top-0 left-6 -translate-y-1/2 z-10 bg-white px-1.5 py-0.5 text-black"
                style={{ fontFamily: "var(--font-pixel), monospace", fontSize: "10px", letterSpacing: "0.05em", textTransform: "uppercase" }}
              >
                Message
              </label>
              <textarea
                value={formState.message}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, message: e.target.value }))
                }
                placeholder="Tell us about your project"
                className="w-full min-h-[120px] max-h-[120px] resize-none px-6 py-4 bg-white/[0.03] border border-white/[0.06] font-sans text-[14px] text-white placeholder:text-white/20 focus:border-white/[0.15] focus:outline-none transition-colors duration-300 backdrop-blur-sm"
              />
            </fieldset>

            {/* Submit — monochrome button */}
            <button
              type="submit"
              className="w-max flex items-center gap-3 px-8 py-4 bg-white text-black cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.8,0,0,1)] hover:bg-white/80"
              style={{ fontFamily: "var(--font-pixel), monospace", fontSize: "11px", letterSpacing: "0.05em", textTransform: "uppercase" }}
            >
              {submitted ? "Sent ✓" : "Send message →"}
            </button>
          </form>
        </GsapReveal>

        {/* Email fallback */}
        <GsapReveal delay={300}>
          <div className="mt-12 pt-8 border-t border-white/[0.06] text-center">
            <span
              className="block text-[10px] uppercase tracking-[0.05em] text-white/15 mb-3"
              style={{ fontFamily: "var(--font-pixel), monospace" }}
            >
              Or email directly
            </span>
            <a
              href="mailto:hello@cmdblock.tech"
              className="relative font-sans text-lg font-semibold text-white hover:text-white/60 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-current after:transition-all after:duration-500"
            >
              hello@cmdblock.tech
            </a>
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
