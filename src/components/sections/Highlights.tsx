"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Button from '../ui/Button';

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
  carousel
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
    if (e.key === 'ArrowLeft') {
      setCurrentSlide((prev) => (prev - 1 + carousel.length) % carousel.length);
    } else if (e.key === 'ArrowRight') {
      setCurrentSlide((prev) => (prev + 1) % carousel.length);
    }
  };

  return (
    <section className="">
      <div className="">
        <motion.div 
          className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-black/5 overflow-hidden px-6 md:px-10 py-8 md:py-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-12 gap-x-8 lg:gap-x-10">
            
            <div className="col-span-12 md:col-span-2 lg:col-span-3 order-4 md:order-1">
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
                  style={{ aspectRatio: '4/5' }}
                />
              </motion.div>
            </div>

            <div className="col-span-12 md:col-span-4 lg:col-span-6 order-1 md:order-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="font-bold text-3xl md:text-4xl lg:text-6xl tracking-tight text-gray-900 mb-6 md:mb-8 font-[SpaceGroteskBold]" style={{ maxWidth: '20ch' }}>
                  {title}
                </h2>

                <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-6 font-[SpaceGroteskLight] text-black lg:text-3xl">
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
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
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
                    style={{ aspectRatio: '1/1' }}
                  />
                  
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    {carousel.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={index === currentSlide ? 'true' : 'false'}
                        className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ${
                          index === currentSlide 
                            ? 'bg-[#D64B2A]' 
                            : 'bg-white/50 hover:bg-white/70'
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
  cta
}: HighlightBProps) {
  return (
    <section className="bg-[#F7F6F2] py-14 md:py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        
        <div className="grid grid-cols-12 gap-x-10 mb-8">
          <motion.div
            className="col-span-12 lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-bold text-4xl md:text-6xl tracking-tight text-gray-900 mb-6 md:mb-8 font-[SpaceGroteskBold]" style={{ maxWidth: '18ch' }}>
              {title}
            </h2>
            
            <motion.p
              className="text-gray-900 mb-8 text-3xl font-[SpaceGroteskLight]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Antoine helps institutions, governments, and organizations design practical{' '}
              <span className="text-muted-foreground">
                solutions to complex challenges in global education.
              </span>
            </motion.p>
          </motion.div>

          <motion.div
            className="col-span-12 lg:col-span-5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Image
              src={rightImage}
              alt="Antoine in strategic meeting"
              width={500}
              height={312}
              className="w-full h-auto rounded-2xl object-cover"
              style={{ aspectRatio: '16/10' }}
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-12 gap-x-10 gap-y-8">
          
          <div className="col-span-12 lg:col-span-6">
            <div className="flex flex-col lg:flex-row gap-6">
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
                  style={{ aspectRatio: '7/5' }}
                />
              </motion.div>
              
              <div className="flex-1">
                <motion.p
                  className="text-gray-900 mb-6 font-[SpaceGroteskLight] text-lg"
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
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 ">
            <motion.p
              className="text-gray-900 font-[SpaceGroteskLight] text-lg"
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
