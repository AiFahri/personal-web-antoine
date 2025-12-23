"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useAutoplay } from "./useAutoplay";

type CarouselProps = {
  children: React.ReactNode[];
  navigationPosition?: "top-right" | "top-left" | "external";
  onApiReady?: (api: any) => void;
};

export default function Carousel({
  children,
  navigationPosition = "top-right",
  onApiReady,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    dragFree: false,
    slidesToScroll: 1,
  });

  React.useEffect(() => {
    if (emblaApi && onApiReady) {
      onApiReady(emblaApi);
    }
  }, [emblaApi, onApiReady]);

  useAutoplay(emblaApi, 7000);

  const navigationButtons = (
    <>
      <button
        className="w-11 h-11 rounded-full border border-black font-bold bg-white text-2xl text-black flex items-center justify-center transition hover:bg-stone-100 focus-visible:ring-2"
        onClick={() => emblaApi?.scrollPrev()}
        aria-label="Previous"
        tabIndex={0}
      >
        <span aria-hidden="true">‹</span>
      </button>
      <button
        className="w-11 h-11 rounded-full border border-black font-bold bg-black text-white text-2xl flex items-center justify-center transition hover:bg-stone-700 focus-visible:ring-2"
        onClick={() => emblaApi?.scrollNext()}
        aria-label="Next"
        tabIndex={0}
      >
        <span aria-hidden="true">›</span>
      </button>
    </>
  );

  return (
    <div className="relative">
      <div
        ref={emblaRef}
        className="overflow-hidden"
        aria-roledescription="carousel"
        aria-label="Latest posts"
      >
        <div className="flex gap-4 md:gap-8 px-4 md:px-0">{children}</div>
      </div>
      {navigationPosition === "top-right" && (
        <div className="absolute top-0 right-0 flex gap-3 z-10">
          {navigationButtons}
        </div>
      )}
      {navigationPosition === "top-left" && (
        <div className="absolute top-0 left-0 flex gap-3 z-10">
          {navigationButtons}
        </div>
      )}
    </div>
  );
}
