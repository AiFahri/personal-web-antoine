"use client";
import React from "react";
import { motion } from "motion/react";
import Button from "../ui/Button";
import Image from "next/image";
import ig from "../../assets/sosmed/instagram.svg";
import yt from "../../assets/sosmed/yt.svg";
import fb from "../../assets/sosmed/facebook.svg";
import tt from "../../assets/sosmed/tiktok.svg";

export type HeroProps = {
  titleLines: string[];
  subtitle?: string;
  portraitSrc: string;
  ctas?: { label: string; href: string; variant?: "primary" | "ghost" }[];
  socials?: {
    label: "linkedin" | "youtube" | "instagram" | "facebook" | "tiktok";
    href: string;
  }[];
  backgroundText?: string;
};

const socialIcons = {
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  youtube: <Image src={yt} alt="YouTube" className="w-5 h-5 fill-current" />,
  facebook: <Image src={fb} alt="Facebook" className="w-5 h-5 fill-current" />,
  instagram: (
    <Image src={ig} alt="Instagram" className="w-5 h-5 fill-current" />
  ),
  tiktok: <Image src={tt} alt="TikTok" className="w-5 h-5 fill-current" />,
};

export default function Hero({
  subtitle,
  portraitSrc,
  ctas = [],
  socials = [],
  backgroundText = "ANTOINE BATTLE",
}: HeroProps) {
  return (
    <section className="relative h-screen lg:min-h-[100svh] overflow-hidden bg-[radial-gradient(120%_120%_at_50%_20%,#E3CE89_0%,#CC411E_45%,#2A2A2A_100%)]">
      <div className="absolute inset-x-0 top-0 z-0 pointer-events-none w-screen left-0 right-0 font-[SpaceGroteskBold] overflow-hidden flex items-center justify-center">
        <div className="text-[40vw] lg:text-[25vw] xl:text-[28vw] leading-none text-white opacity-10 whitespace-nowrap">
          ANTOINE
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-0 pointer-events-none w-screen left-[-50px] right-0 font-[SpaceGroteskBold] text-[40vw] lg:text-[25vw] xl:text-[30vw] leading-none text-white opacity-10 whitespace-nowrap">
        BATTLE
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 pt-4 pb-0 lg:pb-8 h-full flex flex-col">
        <div className="lg:hidden flex flex-col h-full">
          <div className="font-[SpaceGroteskBold] pt-4 flex-shrink-0 mt-36">
            <motion.h1
              className="uppercase leading-[1.2] tracking-tight text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.span
                className="block font-bold"
                style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0,
                  ease: "easeOut",
                }}
              >
                I&apos;M ANTOINE
              </motion.span>
              <motion.span
                className="block font-bold"
                style={{ fontSize: "clamp(2.5rem, 8vw, 8rem)" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                  ease: "easeOut",
                }}
              >
                BATTLE
              </motion.span>
            </motion.h1>

            {ctas.length > 0 && (
              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Button
                  variant="primary"
                  href={ctas[0].href}
                  className="inline-flex items-center gap-2"
                >
                  {ctas[0].label}
                  <div className="w-10 h-10 bg-[#C44829] rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6"
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
                  </div>
                </Button>
              </motion.div>
            )}

            <div className="mt-4">
              <div className="flex items-start gap-3">
                <motion.div
                  className="flex-shrink-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <h3 className="text-white/100 font-[SpaceGroteskMedium] mb-2 text-sm">
                    Follow me
                  </h3>

                  {socials.length > 0 && (
                    <div className="flex gap-2">
                      {socials.map((social) => (
                        <motion.a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Follow on ${social.label}`}
                          className="w-10 h-10 rounded-full bg-black hover:bg-black/40 flex items-center justify-center text-white hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {socialIcons[social.label]}
                        </motion.a>
                      ))}
                    </div>
                  )}
                </motion.div>

                {subtitle && (
                  <motion.div
                    className="flex-1 min-w-0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <p className="text-white/90 leading-relaxed font-[SpaceGroteskRegular] text-xs">
                      {subtitle}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Portrait Image - Mobile */}
          <div className="relative flex justify-center items-end flex-1 min-h-0 z-20 -mt-4">
            <motion.div
              className="relative flex justify-center w-full"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1.2 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-full flex items-end justify-center">
                <Image
                  src={portraitSrc}
                  alt="Antoine Battle portrait"
                  width={1200}
                  height={1200}
                  className="h-[70vh] w-auto object-contain object-bottom"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="hidden lg:grid grid-cols-12 gap-x-8 lg:gap-x-10 items-start min-h-[90vh]">
          <div className="col-span-4 self-start font-[SpaceGroteskBold] pt-36">
            <motion.h1
              className="uppercase leading-[1.2] tracking-tight text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.span
                className="block font-bold"
                style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0,
                  ease: "easeOut",
                }}
              >
                I&apos;M ANTOINE
              </motion.span>
              <motion.span
                className="block font-bold"
                style={{ fontSize: "clamp(2.5rem, 8vw, 8rem)" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                  ease: "easeOut",
                }}
              >
                BATTLE
              </motion.span>
            </motion.h1>

            {ctas.length > 0 && (
              <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Button
                  variant="primary"
                  href={ctas[0].href}
                  className="inline-flex items-center gap-2"
                  target={
                    ctas[0].href?.startsWith("http") ? "_blank" : undefined
                  }
                  rel={
                    ctas[0].href?.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  {ctas[0].label}
                  <div className="w-10 h-10 bg-[#C44829] rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6"
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
                  </div>
                </Button>
              </motion.div>
            )}
          </div>

          <div className="col-span-4 relative flex justify-center items-end z-20">
            <motion.div
              className="relative flex justify-center"
              initial={{ opacity: 0, scale: 1.4 }}
              animate={{ opacity: 1, scale: 1.6 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <Image
                  src={portraitSrc}
                  alt="Antoine Battle portrait"
                  width={1200}
                  height={1200}
                  className="h-[85vh] w-auto object-contain rounded-lg"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
                  }}
                />
              </div>
            </motion.div>
          </div>

          <div className="col-span-3 lg:pl-8 z-30 pt-36 ml-16">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3
                className="text-white/100 font-[SpaceGroteskMedium]"
                style={{ fontSize: "clamp(1rem, 2.5vw, 2.5em)" }}
              >
                Follow me
              </h3>

              {socials.length > 0 && (
                <div className="flex gap-2">
                  {socials.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow on ${social.label}`}
                      className="w-36 h-10 rounded-full bg-black hover:bg-black/40 flex items-center justify-center text-white hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {socialIcons[social.label]}
                    </motion.a>
                  ))}
                </div>
              )}

              {subtitle && (
                <p
                  className="text-white/90 max-w-xs mt-20 leading-relaxed font-[SpaceGroteskRegular]"
                  style={{ fontSize: "clamp(0.875rem, 1.8vw, 1.8rem)" }}
                >
                  {subtitle}
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute left-0 right-0 bottom-10 z-30 text-center font-[SpaceGroteskBold] uppercase text-[12vw] lg:text-[10vw] xl:text-[12vw] leading-none text-white whitespace-nowrap">
        {backgroundText}
      </div>
      <div className="hidden lg:flex absolute inset-x-0 top-0 z-0 pointer-events-none w-screen left-0 right-0 font-[SpaceGroteskBold] overflow-hidden items-center justify-center">
        <div className="text-[25vw] md:text-[30vw] lg:text-[35vw] xl:text-[28vw] leading-none text-white opacity-10 whitespace-nowrap">
          ANTOINE
        </div>
      </div>
      <div className="hidden lg:block absolute inset-x-0 bottom-0 z-0 pointer-events-none w-screen  left-[-50px] right-0 font-[SpaceGroteskBold] text-[25vw] md:text-[30vw] lg:text-[35vw] xl:text-[30vw] leading-none text-white opacity-10 whitespace-nowrap">
        BATTLE
      </div>
    </section>
  );
}
