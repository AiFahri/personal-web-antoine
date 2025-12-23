"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useComingSoon } from "@/components/ui/ComingSoonContext";

export type HighlightSlide = {
  _id: string;
  image: { url: string; alt?: string };
  title: string;
  text: string;
  cta?: { label: string; href: string };
};

type FloatingCarouselProps = {
  items: HighlightSlide[];
  intervalMs?: number;
  pauseOnHover?: boolean;
};

const AVAILABLE_ROUTES = [
  '/',
  '/blog',
];

function isRouteAvailable(href: string): boolean {
  if (href.startsWith('http://') || href.startsWith('https://')) {
    return true;
  }

  const normalizedHref = href.split('?')[0].split('#')[0]; // Remove query params and hash
  
  if (AVAILABLE_ROUTES.includes(normalizedHref)) {
    return true;
  }

  if (AVAILABLE_ROUTES.some(route => normalizedHref.startsWith(route + '/'))) {
    return true;
  }

  return false;
}

export default function FloatingCarousel({
  items,
  intervalMs = 3000,
  pauseOnHover = true,
}: FloatingCarouselProps) {
  const { show } = useComingSoon();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = items.length;

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (!pauseOnHover || isPaused || total <= 1) return;

    const interval = setInterval(next, intervalMs);
    return () => clearInterval(interval);
  }, [pauseOnHover, isPaused, next, intervalMs, total]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPaused(document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCurrentIndex((prev) => (prev - 1 + total) % total);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, total]);

  if (total === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <section
      aria-label="Highlights carousel"
      className="relative z-[5] mb-[-40px] sm:mb-[-48px] md:mb-[-56px] lg:mb-[-72px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full max-w-[1120px] mx-auto aspect-[16/9] sm:aspect-[16/7] md:aspect-[16/6] min-h-[240px] sm:min-h-[300px] md:min-h-[360px] rounded-2xl md:rounded-[28px] overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,0,0,.45)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={currentItem.image.url}
                alt={currentItem.image.alt || currentItem.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1120px"
                priority={currentIndex === 0}
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-auto md:top-14 md:left-14 max-w-full sm:max-w-[480px] md:max-w-[520px] rounded-2xl md:rounded-3xl bg-white p-4 sm:p-6 md:p-8 shadow-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.22 }}
              >
                <h3 className="text-xl sm:text-2xl md:text-[36px] font-[SpaceGroteskMedium] font-bold text-black leading-tight">
                  {currentItem.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed font-[SpaceGroteskRegular]">
                  {currentItem.text}
                </p>
                {currentItem.cta && (() => {
                  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                    if (!isRouteAvailable(currentItem.cta!.href)) {
                      e.preventDefault();
                      show(currentItem.cta!.href);
                    }
                  };

                  return (
                    <a
                      href={isRouteAvailable(currentItem.cta!.href) ? currentItem.cta!.href : '#'}
                      onClick={handleClick}
                      className="mt-3 sm:mt-4 inline-flex items-center gap-2 rounded-full bg-[#E1462B] text-white px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-offset-2"
                    >
                      {currentItem.cta.label}
                      <span aria-hidden="true" className="text-base sm:text-lg">
                        →
                      </span>
                    </a>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </div>

          {total > 1 && (
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-5 md:left-6 flex gap-2 z-10">
              {Array.from({ length: total }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === currentIndex ? "true" : "false"}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 ${
                    i === currentIndex
                      ? "bg-[#E1462B]"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
