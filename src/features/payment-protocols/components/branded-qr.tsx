"use client";

import { useEffect, useRef, useState } from "react";
import { generateBrandedQr } from "../lib/generate-branded-qr";

interface BrandedQrProps {
  data: string;
  size?: number;
  className?: string;
}

export function BrandedQr({ data, size = 120, className }: BrandedQrProps) {
  const [src, setSrc] = useState<string | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    generateBrandedQr(data, size).then((url) => {
      if (mounted.current) setSrc(url);
    });
    return () => { mounted.current = false; };
  }, [data, size]);

  if (!src) return <div style={{ width: size, height: size }} className="bg-muted animate-pulse" />;

  return (
    <img
      src={src}
      alt="QR Code"
      width={size}
      height={size}
      className={className}
    />
  );
}
