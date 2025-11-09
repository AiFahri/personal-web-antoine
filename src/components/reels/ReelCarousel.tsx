"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useAutoplay } from "@/components/carousel/useAutoplay";

type ReelCarouselProps = {
  children: React.ReactNode[];
};

export default function ReelCarousel({ children }: ReelCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
  });
  useAutoplay(emblaApi, 7000);

  return (
    <div className="relative">
      <div
        ref={emblaRef}
        className="overflow-hidden"
        aria-roledescription="carousel"
        aria-label="Leadership gallery"
      >
        <div className="flex gap-4 md:gap-6 px-1">{children}</div>
      </div>
      <div className="absolute top-0 right-0 flex gap-3">
        <button
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous"
          className="h-11 w-11 rounded-full border border-black/10 bg-white text-2xl flex items-center justify-center hover:bg-stone-100 focus-visible:ring-2"
        >
          ‹
        </button>
        <button
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next"
          className="h-11 w-11 rounded-full border border-black/10 bg-black text-white text-2xl flex items-center justify-center hover:bg-stone-700 focus-visible:ring-2"
        >
          ›
        </button>
      </div>
    </div>
  );
}
