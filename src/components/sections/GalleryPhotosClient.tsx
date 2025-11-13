"use client";
import { useState } from "react";
import Carousel from "@/components/carousel/Carousel";
import PhotoCard from "@/components/photos/PhotoCard";
import Button from "../ui/Button";

type GalleryPhotosClientProps = {
  items: any[];
  subtitle: string;
  cta: { label: string; href: string };
};

export default function GalleryPhotosClient({
  items,
  subtitle,
  cta,
}: GalleryPhotosClientProps) {
  const [emblaApi, setEmblaApi] = useState<any>(null);

  return (
    <>
      <div className="mb-4 md:mb-6">
        <div className="flex items-start justify-between gap-4 mb-3 md:mb-4">
          <p className="text-base md:text-4xl font-medium text-black/80 font-[SpaceGroteskRegular] flex-1 min-w-0">
            {subtitle.split(" ").slice(0, -8).join(" ")}{" "}
            <span className="text-black/60">
              {subtitle.split(" ").slice(-8).join(" ")}
            </span>
          </p>
          
          <div className="hidden md:block flex-shrink-0">
            <Button
              variant="primary"
              href={cta.href}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-[#C44829] text-white hover:bg-[#B03E25] focus-visible:ring-2 whitespace-nowrap"
            >
              {cta.label}
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="#C44829" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </Button>
          </div>
        </div>
        
        <div className="flex justify-end items-center gap-3 mb-3">
          <button
            className="w-11 h-11 rounded-full border border-black bg-white text-2xl text-black flex items-center justify-center transition hover:bg-stone-100 focus-visible:ring-2 font-bold"
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Previous"
            tabIndex={0}
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            className="w-11 h-11 rounded-full border border-black bg-black text-white text-2xl flex items-center justify-center transition hover:bg-stone-700 focus-visible:ring-2 font-bold"
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Next"
            tabIndex={0}
          >
            <span aria-hidden="true">›</span>
          </button>
          <a
            href={cta.href}
            className="md:hidden inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-[#C44829] text-white hover:bg-[#B03E25] focus-visible:ring-2 whitespace-nowrap"
          >
            {cta.label}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </a>
        </div>
      </div>

      <Carousel navigationPosition="external" onApiReady={setEmblaApi}>
        {items.map((it: any) => (
          <PhotoCard
            key={it._id}
            title={it.title}
            imageUrl={it.imageUrl}
          />
        ))}
      </Carousel>
    </>
  );
}

