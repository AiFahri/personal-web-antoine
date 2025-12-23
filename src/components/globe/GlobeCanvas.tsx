"use client";
import { World } from "@/components/ui/globe";
import type { GlobeConfig } from "@/components/ui/globe";
import type { Position } from "@/lib/globe-data";
import { useEffect, useState } from "react";

type GlobeCanvasProps = {
  globeConfig: GlobeConfig;
  data: Position[];
};

export default function GlobeCanvas({ globeConfig, data }: GlobeCanvasProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const adjustedConfig: GlobeConfig = {
    ...globeConfig,
    autoRotate: !prefersReducedMotion && globeConfig.autoRotate,
    autoRotateSpeed: prefersReducedMotion ? 0 : globeConfig.autoRotateSpeed,
  };

  return (
    <>
      <World globeConfig={adjustedConfig} data={data} />
      <div className="pointer-events-none absolute inset-x-10 bottom-0 h-1/3 bg-gradient-to-t from-[#E96B4C]/60 to-transparent blur-[6px]" />
    </>
  );
}

