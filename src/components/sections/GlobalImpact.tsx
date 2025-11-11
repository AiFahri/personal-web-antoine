"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import StatCard from "@/components/stats/StatCard";
import ScrollVelocity from "@/components/ui/scrollText";
import {
  buildArcs,
  baseLocation,
  visitedLocations,
  marqueeCountries,
} from "@/lib/globe-data";
import type { GlobeConfig } from "@/components/ui/globe";
import { World } from "@/components/ui/globe";
import { sampleData } from "../../data/sample-data";

const GlobeCanvas = dynamic(() => import("@/components/globe/GlobeCanvas"), {
  ssr: false,
  loading: () => (
    <div className="relative w-full aspect-square max-w-[360px] md:max-w-[540px] lg:max-w-[640px] mx-auto bg-[#0B0B0B] rounded-full flex items-center justify-center">
      <Image
        src="/images/globe-placeholder.png"
        alt="Globe loading"
        width={200}
        height={200}
        className="opacity-50"
        unoptimized
        loading="lazy"
      />
    </div>
  ),
});

type GlobalImpactProps = {
  universitiesCount?: number;
  countriesCount?: number;
  universitiesDescription?: string;
  countriesDescription?: string;
};

export default function GlobalImpact({
  universitiesCount = 17,
  countriesCount = 20,
  universitiesDescription = "Universities where Antoine has collaborated, spoken, and advanced global learning initiatives.",
  countriesDescription = "Countries connected through his partnerships, conferences, and academic collaborations.",
}: GlobalImpactProps) {
  const globeData = buildArcs(baseLocation, visitedLocations);

  const globeConfig: GlobeConfig = {
    pointSize: 4,
    globeColor: "#CC411E",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 0, lng: 0 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  return (
    <section className="relative bg-[#FAF8F6]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid items-center gap-8 lg:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-[minmax(220px,0.9fr)_minmax(520px,1fr)_minmax(220px,0.9fr)]">
          <div className="order-1 md:order-1 lg:order-1">
            <StatCard
              number={universitiesCount}
              suffix="+"
              description={universitiesDescription}
            />
          </div>

          <div className="order-2 md:col-span-2 md:order-3 lg:col-span-1 lg:order-2">
            <div
              className="relative aspect-square max-w-[360px] md:max-w-[540px] lg:max-w-[640px] mx-auto overflow-hidden bg-[#0B0B0B] rounded-full "
              aria-label="Animated globe showing Antoine's collaborations"
            >
               <GlobeCanvas globeConfig={globeConfig} data={sampleData} />
            </div>
          </div>

          <div className="order-3 md:order-2 lg:order-3">
            <StatCard
              number={countriesCount}
              suffix="+"
              description={countriesDescription}
            />
          </div>
        </div>

        <div className="mt-10 lg:mt-14" aria-hidden="true">
          <div className="relative overflow-hidden">
            <ScrollVelocity
              texts={['Canada * Indonesia * Malaysia * Singapore * Thailand * India * Latvia *']}
            //   velocity={50}
              className="custom-scroll-text text-black font-[SpaceGroteskMedium]"
                  parallaxClassName="relative overflow-hidden w-full"
                  scrollerClassName="flex whitespace-nowrap gap-6"
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FAF8F6] to-transparent" />
    </section>
  );
}
