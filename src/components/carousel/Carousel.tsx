"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useAutoplay } from "./useAutoplay";

type CarouselProps = { children: React.ReactNode[] };

export default function Carousel({ children }: CarouselProps) {
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
        aria-label="Latest posts"
      >
        <div className="flex gap-6 md:gap-8">{children}</div>
      </div>
      <div className="absolute top-0 right-0 flex gap-3 z-10">
        <button
          className="w-11 h-11 rounded-full border border-black/10 bg-white text-2xl text-black flex items-center justify-center transition hover:bg-stone-100 focus-visible:ring-2"
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous"
          tabIndex={0}
        >
          <span aria-hidden="true">‹</span>
        </button>
        <button
          className="w-11 h-11 rounded-full border border-black/10 bg-black text-white text-2xl flex items-center justify-center transition hover:bg-stone-700 focus-visible:ring-2"
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next"
          tabIndex={0}
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </div>
  );
}
