"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import type { Testimonial } from "./Testimonials";

type TestimonialsClientProps = {
  items: Testimonial[];
  autoplay?: boolean;
  intervalMs?: number;
};

export default function TestimonialsClient({
  items,
  autoplay = true,
  intervalMs = 4500,
}: TestimonialsClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = items.length;

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (!autoplay || isPaused || total <= 1) return;

    const interval = setInterval(next, intervalMs);
    return () => clearInterval(interval);
  }, [autoplay, isPaused, next, intervalMs, total]);

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
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prev, next]);

  if (total === 0) return null;

  const currentItem = items[currentIndex];
  const progress = ((currentIndex + 1) / total) * 100;

  return (
    <section
      className="bg-[#F8F6F2]"
      aria-label="What others say"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:pb-16">
        <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-[SpaceGroteskMedium] text-black tracking-tight">
              What other says
            </h2>
            <p className="mt-4 max-w-[46ch] text-neutral-700 leading-relaxed font-[SpaceGroteskRegular] text-2xl md:mt-12">
              Discover what leaders, educators, and partners say about Antoine's
              impact and global work in education.
            </p>
          </div>

          <div>
            <article
              id="testimonials-carousel"
              role="group"
              aria-roledescription="slide"
              aria-label={`Testimonial ${currentIndex + 1} of ${total}`}
              className="p-6 md:p-8 font-[SatoshiRegular] text-lg md:text-xl"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                >
                  <div
                    className="text-4xl md:text-5xl leading-none font-[SpaceGroteskRegular] font-bold text-black"
                    aria-hidden="true"
                  >
                    "
                  </div>

                  <span className="mt-4 text-lg md:text-2xl leading-8 text-neutral-900 font-[SpaceGroteskRegular] font-bold">
                    {currentItem.quote}
                  </span>

                  {total > 1 && (
                    <div className="mt-5 h-[3px] bg-neutral-200/80 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-[#E45B39] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    </div>
                  )}

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {currentItem.avatar && (
                        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={currentItem.avatar.url}
                            alt={currentItem.avatar.alt || currentItem.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-neutral-900">
                          {currentItem.name}
                        </div>
                        {currentItem.role && (
                          <div className="text-sm text-neutral-500 mt-0.5">
                            {currentItem.role}
                          </div>
                        )}
                      </div>
                    </div>
                    {total > 1 && (
                      <div className="flex gap-3 flex-shrink-0">
                        <button
                          onClick={prev}
                          aria-label="Previous testimonial"
                          aria-controls="testimonials-carousel"
                          className="w-10 h-10 rounded-full border border-black/10 bg-white text-black flex items-center justify-center transition hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-offset-2"
                        >
                          <span aria-hidden="true">‹</span>
                        </button>
                        <button
                          onClick={next}
                          aria-label="Next testimonial"
                          aria-controls="testimonials-carousel"
                          className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center transition hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-offset-2"
                        >
                          <span aria-hidden="true">›</span>
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
