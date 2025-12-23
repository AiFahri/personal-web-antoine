"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import type { ServiceItem } from "./FeaturedServices";

type FeaturedServicesClientProps = {
  items: ServiceItem[];
  autoplay?: boolean;
  intervalMs?: number;
};

export default function FeaturedServicesClient({
  items,
  autoplay = true,
  intervalMs = 5500,
}: FeaturedServicesClientProps) {
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

  // Autoplay
  useEffect(() => {
    if (!autoplay || isPaused || total <= 1) return;

    const interval = setInterval(next, intervalMs);
    return () => clearInterval(interval);
  }, [autoplay, isPaused, next, intervalMs, total]);

  // Pause on visibility hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPaused(document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Keyboard navigation
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
  const nextIndex = (currentIndex + 1) % total;
  const nextItem = items[nextIndex];
  const nextImageUrl = currentItem.imageNext?.url || nextItem.image.url;
  const nextImageAlt =
    currentItem.imageNext?.alt || nextItem.image.alt || nextItem.title;

  return (
    <section
      className="bg-[#F8F6F2]"
      aria-label="Featured services"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:pt-16">
        <div className="grid gap-8 lg:gap-12 grid-cols-1 lg:grid-cols-[minmax(320px,520px)_minmax(520px,1fr)] items-start">
          <div className="order-2 lg:order-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl md:text-5xl font-[SpaceGroteskMedium] text-black tracking-tight">
                Featured Services
              </h2>
              {total > 1 && (
                <div className="flex gap-3">
                  <button
                    onClick={prev}
                    aria-label="Previous service"
                    aria-controls="featured-services-carousel"
                    className="w-11 h-11 rounded-full border border-black font-bold bg-white text-black flex items-center justify-center transition hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-offset-2"
                  >
                    <span aria-hidden="true">‹</span>
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next service"
                    aria-controls="featured-services-carousel"
                    className="w-11 h-11 rounded-full font-bold bg-black text-white flex items-center justify-center transition hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-offset-2"
                  >
                    <span aria-hidden="true">›</span>
                  </button>
                </div>
              )}
            </div>

            <article
              id="featured-services-carousel"
              role="group"
              aria-roledescription="slide"
              aria-label={`Service ${currentIndex + 1} of ${total}`}
              className="rounded-3xl bg-white shadow-sm border border-black/5 p-6 md:p-8 font-[SatoshiRegular] text-lg md:text-xl"
            >
              {total > 1 && (
                <div className="relative h-[4px] rounded-full bg-neutral-200/80 flex gap-1 mb-5">
                  {Array.from({ length: total }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 h-full rounded-full overflow-hidden bg-neutral-200/80"
                    >
                      {i < currentIndex ? (
                        <div className="h-full w-full bg-[#E45B39] rounded-full" />
                      ) : i === currentIndex ? (
                        autoplay && !isPaused ? (
                          <motion.div
                            className="h-full bg-[#E45B39] rounded-full origin-left"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{
                              duration: intervalMs / 1000,
                              ease: "linear",
                            }}
                          />
                        ) : (
                          <div className="h-full w-full bg-[#E45B39] rounded-full" />
                        )
                      ) : null}
                    </div>
                  ))}
                </div>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }}
                >
                  <p className="text-neutral-700 leading-relaxed">
                    {currentItem.summary}
                  </p>
                  <h3 className="mt-6 text-xl md:text-2xl font-[SatoshiBold] text-black">
                    {currentItem.title}
                  </h3>
                  {currentItem.slug && (
                    <Link
                      href={currentItem.slug}
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#C44829] hover:bg-[#B03E25] text-white px-5 py-1.5 font-[PlusJakarta] text-sm md:text-base hover:opacity-90 active:scale-[0.98] transition-all focus-visible:ring-2 focus-visible:ring-offset-2 hover:scale-105"
                    >
                      {currentItem.ctaLabel || "Read More"}
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" stroke="#C44829" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </div>
                    </Link>
                  )}
                </motion.div>
              </AnimatePresence>
            </article>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden bg-black aspect-[16/11]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentItem.image.url}
                    alt={currentItem.image.alt || currentItem.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={currentIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>

              {total > 1 && (
                <div className="absolute top-4 right-4 flex gap-1.5 z-10">
                  {Array.from({ length: total }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      aria-current={i === currentIndex ? "true" : "false"}
                      className={`w-3 h-3 rounded-full transition-all opacity-70 hover:opacity-100 focus-visible:ring-2 focus-visible:ring-white ${
                        i === currentIndex
                          ? "bg-[#FF0000]"
                          : "bg-transparent border border-white hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              )}

              {total > 1 && (
                <motion.div
                  key={nextIndex}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.24, delay: 0.1 }}
                  className="absolute right-4 md:right-6 bottom-4 md:bottom-6 w-[44%] md:w-[40%] rounded-2xl overflow-hidden border-4 border-white shadow-xl"
                >
                  <Image
                    src={nextImageUrl}
                    alt={nextImageAlt}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover aspect-[4/3]"
                    loading="lazy"
                  />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
