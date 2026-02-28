"use client";

import { useEffect, useRef, useCallback } from "react";

interface PixelGridProps {
  cellSize?: number;
  maxOpacity?: number;
  fadeDuration?: number;
}

/**
 * Reactive pixel trail with photoshop-style noise grain baked INTO the lit boxes.
 * - Single cell lights up under cursor, fades out
 * - Each cell gets a random peak brightness (0.25–1.0) for variety
 * - Fine grain noise is composited only inside lit cells (not full screen)
 */
export function PixelGrid({
  cellSize = 34,
  maxOpacity = 0.16,
  fadeDuration = 600,
}: PixelGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  // Map key → { born, peak } where peak is random brightness multiplier
  const cellMapRef = useRef<Map<string, { born: number; peak: number }>>(new Map());
  const lastCellRef = useRef<string>("");
  // Offscreen noise texture — tiny, tiled
  const noiseCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const noiseFrameRef = useRef<number>(0);

  const createNoiseTexture = useCallback(() => {
    const size = 128; // small tile, repeated
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    noiseCanvasRef.current = canvas;
  }, []);

  const refreshNoise = useCallback(() => {
    const canvas = noiseCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = canvas.width;
    const imageData = ctx.createImageData(size, size);
    const data = imageData.data;

    // Fine photoshop-style monochrome grain
    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255;
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
  }, []);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
  }, []);

  useEffect(() => {
    createNoiseTexture();
    refreshNoise();
    init();

    const handleResize = () => init();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const col = Math.floor(e.clientX / cellSize);
      const row = Math.floor(e.clientY / cellSize);
      const key = `${col},${row}`;

      if (key !== lastCellRef.current) {
        lastCellRef.current = key;
        // Random peak brightness: 0.25 to 1.0
        const peak = 0.25 + Math.random() * 0.75;
        cellMapRef.current.set(key, { born: performance.now(), peak });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const gap = 2;
    const size = cellSize - gap;

    const render = () => {
      const now = performance.now();
      const map = cellMapRef.current;

      // Prune expired
      for (const [key, cell] of map) {
        if (now - cell.born >= fadeDuration) map.delete(key);
      }

      // Refresh noise every ~4 frames for subtle shimmer
      noiseFrameRef.current++;
      if (noiseFrameRef.current % 4 === 0) {
        refreshNoise();
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const noiseCanvas = noiseCanvasRef.current;

      for (const [key, cell] of map) {
        const age = now - cell.born;
        const progress = age / fadeDuration;
        const opacity = maxOpacity * cell.peak * (1 - progress);

        if (opacity <= 0) continue;

        const [colStr, rowStr] = key.split(",");
        const c = parseInt(colStr);
        const r = parseInt(rowStr);
        const x = c * cellSize;
        const y = r * cellSize;

        // Draw the white cell
        ctx.globalAlpha = opacity;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x, y, size, size);

        // Composite noise grain clipped to this cell only
        if (noiseCanvas) {
          ctx.globalAlpha = opacity * 0.6;
          ctx.globalCompositeOperation = "multiply";
          // Tile noise by using modulo offset
          const nx = (x * dpr) % noiseCanvas.width;
          const ny = (y * dpr) % noiseCanvas.height;
          ctx.drawImage(
            noiseCanvas,
            nx, ny, size, size,
            x, y, size, size
          );
          ctx.globalCompositeOperation = "source-over";
        }

        ctx.globalAlpha = 1;
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [init, createNoiseTexture, refreshNoise, cellSize, maxOpacity, fadeDuration]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
