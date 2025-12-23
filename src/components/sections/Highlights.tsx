"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Button from "../ui/Button";

export type HighlightAProps = {
  title: string;
  leftImage: string;
  paragraphs: string[];
  cta: { label: string; href: string };
  carousel: Array<{ src: string; alt: string }>;
};

export function HighlightA({
  title,
  leftImage,
  paragraphs,
  cta,
  carousel,
}: HighlightAProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carousel.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [carousel.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setCurrentSlide((prev) => (prev - 1 + carousel.length) % carousel.length);
    } else if (e.key === "ArrowRight") {
      setCurrentSlide((prev) => (prev + 1) % carousel.length);
    }
  };

  return (
    <section className="">
      <div className="">
        <motion.div
          className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-black/5 overflow-hidden px-4 md:px-10 py-6 md:py-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-12 gap-x-8 lg:gap-x-10 gap-y-6 md:gap-y-0">
            <div className="col-span-12 md:col-span-4 lg:col-span-6 order-1 md:order-2 md:hidden">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="font-bold text-3xl md:text-4xl lg:text-6xl tracking-tight text-gray-900 mb-4 md:mb-6 font-[SpaceGroteskBold]">
                  {title}
                </h2>
              </motion.div>
            </div>

            <div className="col-span-12 md:col-span-2 lg:col-span-3 order-2 md:order-1">
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Image
                  src={leftImage}
                  alt="Antoine speaking at event"
                  width={300}
                  height={375}
                  className="w-full h-auto rounded-xl object-cover"
                  style={{ aspectRatio: "4/5" }}
                />
              </motion.div>
            </div>

            <div className="col-span-12 md:col-span-4 lg:col-span-6 order-3 md:order-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2
                  className="hidden md:block font-bold text-3xl md:text-4xl lg:text-6xl tracking-tight text-gray-900 mb-6 md:mb-8 font-[SpaceGroteskBold]"
                  style={{ maxWidth: "20ch" }}
                >
                  {title}
                </h2>

                <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-6 md:mb-6 font-[SpaceGroteskLight] text-black text-lg md:text-xl lg:text-2xl">
                  {paragraphs.map((paragraph, index) => (
                    <motion.p
                      key={index}
                      className="text-muted-foreground leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>

                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Button
                    variant="primary"
                    href={cta.href}
                    className="inline-flex items-center gap-2 rounded-full px-5 py-3 bg-[#C44829] hover:bg-[#B03E25] text-white"
                  >
                    {cta.label}
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="#C44829"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M7 17L17 7M17 7H7M17 7V17"
                        />
                      </svg>
                    </div>
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            <div className="col-span-12 md:col-span-2 lg:col-span-3 order-5 md:order-3">
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div
                  className="relative rounded-xl overflow-hidden"
                  onKeyDown={handleKeyDown}
                  tabIndex={0}
                  role="region"
                  aria-label="Image carousel"
                >
                  <Image
                    src={carousel[currentSlide].src}
                    alt={carousel[currentSlide].alt}
                    width={300}
                    height={300}
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: "1/1" }}
                  />

                  <div className="absolute bottom-2 right-2 flex gap-1">
                    {carousel.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={index === currentSlide ? "true" : "false"}
                        className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ${
                          index === currentSlide
                            ? "bg-[#D64B2A]"
                            : "bg-white/50 hover:bg-white/70"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export type HighlightBProps = {
  title: string;
  lead: string;
  leftThumb: string;
  rightImage: string;
  leftDetail: string;
  rightDetail: string;
  cta: { label: string; href: string };
};

export function HighlightB({
  title,
  leftThumb,
  rightImage,
  leftDetail,
  rightDetail,
  cta,
}: HighlightBProps) {
  return (
    <section className="bg-[#F7F6F2] py-14 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-full">
        <div className="lg:hidden mb-6">
          <motion.h2
            className="font-bold text-4xl tracking-tight text-gray-900 mb-6 font-[SpaceGroteskBold]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>
        </div>

        <div className="hidden lg:grid grid-cols-12 gap-x-6 lg:gap-x-10 mb-8">
          <motion.div
            className="col-span-12 lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className="font-bold text-4xl md:text-6xl tracking-tight text-gray-900 mb-6 md:mb-8 font-[SpaceGroteskBold]"
              style={{ maxWidth: "18ch" }}
            >
              {title}
            </h2>

            <motion.p
              className="text-gray-900 mb-8 text-xl lg:text-3xl font-[SatoshiRegular] leading-relaxed md:max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Antoine helps institutions, governments, and organizations design
              practical solutions to complex challenges in global education.
            </motion.p>
          </motion.div>

          <motion.div
            className="col-span-12 lg:col-span-5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-full max-w-full overflow-hidden rounded-2xl">
              <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                <Image
                  src={rightImage}
                  alt="Antoine in strategic meeting"
                  width={500}
                  height={312}
                  className="w-full h-full rounded-2xl object-cover"
                  sizes="(max-width: 1200px) 50vw, 500px"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:hidden mb-6">
          <motion.p
            className="text-gray-900 text-xl font-[SatoshiRegular] leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Antoine helps institutions, governments, and organizations design
            practical solutions to complex challenges in global education.
          </motion.p>
        </div>

        <div className="lg:hidden mb-8 w-full">
          <motion.div
            className="w-full max-w-full overflow-hidden rounded-2xl"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
              <Image
                src={rightImage}
                alt="Antoine in strategic meeting"
                width={500}
                height={312}
                className="w-full h-full rounded-2xl object-cover"
                sizes="100vw"
              />
            </div>
          </motion.div>
        </div>

        <div className="lg:hidden mb-6">
          <motion.p
            className="text-gray-900 font-[SatoshiRegular] text-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {leftDetail}
          </motion.p>
        </div>

        <div className="lg:hidden mb-8">
          <motion.p
            className="text-gray-900 font-[SatoshiRegular] text-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {rightDetail}
          </motion.p>
        </div>

        <div className="lg:hidden flex items-end gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Button
              variant="primary"
              href={cta.href}
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 bg-[#C44829] hover:bg-[#B03E25] text-white"
            >
              {cta.label}
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="#C44829"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M7 17L17 7M17 7H7M17 7V17"
                  />
                </svg>
              </div>
            </Button>
          </motion.div>

          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <Image
              src={leftThumb}
              alt="Antoine collaborating"
              width={192}
              height={134}
              className="rounded-xl object-cover"
              style={{ aspectRatio: "8/6" }}
            />
          </motion.div>
        </div>

        <div className="hidden lg:grid grid-cols-12 gap-x-6 lg:gap-x-10 gap-y-8">
          <div className="col-span-12 lg:col-span-6">
            <div className="flex flex-col lg:flex-row gap-3">
              <motion.div
                className="flex-shrink-0"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Image
                  src={leftThumb}
                  alt="Antoine collaborating"
                  width={192}
                  height={134}
                  className="rounded-xl object-cover"
                  style={{ aspectRatio: "8/6" }}
                />
              </motion.div>

              <div className="flex-1">
                <motion.p
                  className="text-gray-900 mb-6 font-[SatoshiRegular] text-xl leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  {leftDetail}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Button
                    variant="primary"
                    href={cta.href}
                    className="inline-flex items-center gap-2 rounded-full px-5 py-3 bg-[#C44829] hover:bg-[#B03E25] text-white"
                  >
                    {cta.label}
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="#C44829"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M7 17L17 7M17 7H7M17 7V17"
                        />
                      </svg>
                    </div>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6">
            <motion.p
              className="text-gray-900 font-[SatoshiRegular] text-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              {rightDetail}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
