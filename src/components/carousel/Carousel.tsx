"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import { useAutoplay } from "./useAutoplay";

type CarouselProps = {
  children: React.ReactNode;
  navigationPosition?: "top-right" | "top-left" | "external";
  onApiReady?: (api: EmblaCarouselType) => void;
  enableAutoplay?: boolean;
};

export default function Carousel({
  children,
  navigationPosition = "top-right",
  onApiReady,
  enableAutoplay = false,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false, // Disable loop - stop at edges
    align: "start",
    dragFree: false,
    slidesToScroll: 1,
    skipSnaps: false,
    containScroll: "trimSnaps",
    watchDrag: true,
  });

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    if (onApiReady) {
      onApiReady(emblaApi);
    }

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect, onApiReady]);

  // Optional autoplay (disabled by default)
  useAutoplay(enableAutoplay ? emblaApi : undefined, 7000);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const navigationButtons = (
    <>
      <button
        className="w-11 h-11 rounded-full border border-black font-bold bg-white text-2xl text-black flex items-center justify-center transition hover:bg-stone-100 focus-visible:ring-2 disabled:opacity-30 disabled:cursor-not-allowed"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        aria-label="Previous"
        tabIndex={0}
      >
        <span aria-hidden="true">‹</span>
      </button>
      <button
        className="w-11 h-11 rounded-full border border-black font-bold bg-black text-white text-2xl flex items-center justify-center transition hover:bg-stone-700 focus-visible:ring-2 disabled:opacity-30 disabled:cursor-not-allowed"
        onClick={scrollNext}
        disabled={!canScrollNext}
        aria-label="Next"
        tabIndex={0}
      >
        <span aria-hidden="true">›</span>
      </button>
    </>
  );

  return (
    <div className="relative">
      {navigationPosition === "top-right" && (
        <div className="mb-3 flex justify-end gap-3 md:absolute md:-top-14 md:right-0 md:z-10 md:mb-0">
          {navigationButtons}
        </div>
      )}
      {navigationPosition === "top-left" && (
        <div className="mb-3 flex gap-3 md:absolute md:-top-14 md:left-0 md:z-10 md:mb-0">
          {navigationButtons}
        </div>
      )}
      <div
        ref={emblaRef}
        className="overflow-hidden"
        aria-roledescription="carousel"
        aria-label="Carousel"
      >
        <div className="flex gap-4 px-1 sm:px-2 md:gap-6 md:px-0 lg:gap-8">
          {children}
        </div>
      </div>
    </div>
  );
}
