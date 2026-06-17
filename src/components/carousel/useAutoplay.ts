import { useEffect, useCallback, useRef } from "react";
import type { EmblaCarouselType } from "embla-carousel";

export function useAutoplay(
  emblaApi: EmblaCarouselType | undefined,
  delay: number = 5000
) {
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const isPlayingRef = useRef(true);

  const play = useCallback(() => {
    if (!emblaApi) return;
    
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }

    autoplayRef.current = setInterval(() => {
      if (isPlayingRef.current && emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else if (isPlayingRef.current && !emblaApi.canScrollNext()) {
        // Reached end, scroll back to start
        emblaApi.scrollTo(0);
      }
    }, delay);
  }, [emblaApi, delay]);

  const stop = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const onPointerDown = useCallback(() => {
    isPlayingRef.current = false;
    stop();
  }, [stop]);

  const onPointerUp = useCallback(() => {
    isPlayingRef.current = true;
    play();
  }, [play]);

  useEffect(() => {
    if (!emblaApi) return;

    play();
    emblaApi.on("pointerDown", onPointerDown);
    emblaApi.on("pointerUp", onPointerUp);

    return () => {
      stop();
      emblaApi.off("pointerDown", onPointerDown);
      emblaApi.off("pointerUp", onPointerUp);
    };
  }, [emblaApi, play, stop, onPointerDown, onPointerUp]);
}