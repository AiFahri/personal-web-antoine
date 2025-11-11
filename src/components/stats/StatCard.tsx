"use client";
import { useEffect, useRef, useState } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

type StatCardProps = {
  number: number;
  suffix?: string;
  description: string;
  className?: string;
};

export default function StatCard({
  number,
  suffix = "+",
  description,
  className = "",
}: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });

  const displayNumber = useTransform(springValue, (latest) =>
    Math.floor(latest)
  );

  useEffect(() => {
    if (isInView) {
      if (prefersReducedMotion) {
        motionValue.set(number);
      } else {
        motionValue.set(0);
        setTimeout(() => {
          motionValue.set(number);
        }, 100);
      }
    }
  }, [isInView, number, motionValue, prefersReducedMotion]);

  return (
    <div
      ref={ref}
      className={`p-6 md:p-8 ${className}`}
    >
      <h3 className="sr-only  ">
        Statistic: {number}
        {suffix} {description}
      </h3>
      <div className="text-5xl md:text-6xl lg:text-7xl font-[SpaceGroteskMedium] leading-none text-[#C44829] flex ">
        <CountUpDisplay value={displayNumber} />
        {suffix}
      </div>
      <p className="mt-4 text-md md:text-xl text-neutral-700 font-[SpaceGroteskRegular] [text-wrap:balance]">
        {description}
      </p>
    </div>
  );
}

function CountUpDisplay({ value }: { value: any }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsubscribe = value.on("change", (latest: number) => {
      setDisplay(latest);
    });
    return unsubscribe;
  }, [value]);

  return <>{display}</>;
}
