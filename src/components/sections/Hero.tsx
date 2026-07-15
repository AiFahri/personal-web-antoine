"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Button from "../ui/Button";
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
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  youtube: <Image src={yt} alt="" className="h-5 w-5" aria-hidden="true" />,
  facebook: <Image src={fb} alt="" className="h-5 w-5" aria-hidden="true" />,
  instagram: <Image src={ig} alt="" className="h-5 w-5" aria-hidden="true" />,
  tiktok: <Image src={tt} alt="" className="h-5 w-5" aria-hidden="true" />,
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero({
  titleLines,
  subtitle,
  portraitSrc,
  ctas = [],
  socials = [],
  backgroundText = "ANTOINE BATTLE",
}: HeroProps) {
  const firstLine = titleLines[0] || "I'M ANTOINE";
  const secondLine = titleLines[1] || "BATTLE";

  const title = (
    <motion.h1
      className="font-[SpaceGroteskBold] uppercase leading-[0.96] tracking-[-0.045em] text-white"
      initial="initial"
      animate="animate"
      transition={{ staggerChildren: 0.1 }}
    >
      <motion.span variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }} className="block text-[clamp(2.5rem,10vw,4.75rem)] lg:text-[clamp(3rem,4.25vw,5rem)]">
        {firstLine}
      </motion.span>
      <motion.span variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }} className="block text-[clamp(3rem,13vw,6rem)] lg:text-[clamp(4rem,6.2vw,8rem)]">
        {secondLine}
      </motion.span>
    </motion.h1>
  );

  const actions = ctas.length > 0 && (
    <motion.div className="mt-5 flex w-full max-w-[30rem] flex-col gap-3 lg:mt-8 lg:max-w-[26rem] xl:mt-10" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}>
      {ctas.map((cta) => (
        <Button key={`${cta.label}-${cta.href}`} variant={cta.variant || "primary"} href={cta.href} target="_blank" rel="noopener noreferrer" className="w-full justify-between gap-3 px-4 py-2.5 text-sm md:text-base xl:px-5 xl:text-lg">
          <span className="min-w-0 flex-1 text-left leading-snug">{cta.label}</span>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#C44829] md:h-10 md:w-10">
            <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17 17 7M17 7H7m10 0v10" />
            </svg>
          </span>
        </Button>
      ))}
    </motion.div>
  );

  const socialBlock = (
    <motion.div className="min-w-0" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55 }}>
      <h2 className="mb-2 font-[SpaceGroteskMedium] text-sm text-white md:text-base lg:text-[clamp(1rem,1.75vw,2rem)]">Follow me</h2>
      {socials.length > 0 && (
        <div className="flex max-w-[30rem] gap-2">
          {socials.map((social) => (
            <motion.a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`Follow on ${social.label}`} className="grid h-10 min-w-10 flex-1 place-items-center rounded-full bg-black text-white transition-colors duration-300 hover:bg-black/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 lg:max-w-24 2xl:max-w-36" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {socialIcons[social.label]}
            </motion.a>
          ))}
        </div>
      )}
      {subtitle && (
        <p className="mt-4 max-w-[34rem] font-[SpaceGroteskRegular] text-sm leading-relaxed text-white/90 md:text-base lg:mt-[clamp(1.5rem,6vh,5rem)] lg:max-w-[20rem] lg:text-[clamp(0.95rem,1.25vw,1.5rem)] 2xl:max-w-sm">{subtitle}</p>
      )}
    </motion.div>
  );

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[radial-gradient(120%_120%_at_50%_20%,#E3CE89_0%,#CC411E_45%,#2A2A2A_100%)] lg:h-[100svh] lg:min-h-[42rem]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-0 flex justify-center overflow-hidden font-[SpaceGroteskBold]">
        <span className="whitespace-nowrap text-[40vw] leading-none text-white opacity-10 lg:text-[clamp(18rem,28vw,34rem)]">ANTOINE</span>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute -left-8 bottom-0 z-0 whitespace-nowrap font-[SpaceGroteskBold] text-[40vw] leading-none text-white opacity-10 lg:-left-10 lg:text-[clamp(20rem,30vw,38rem)]">BATTLE</div>

      <div className="page-shell relative z-10 lg:h-full">
        <div className="flex min-h-[100svh] flex-col pt-[clamp(8rem,18vh,10rem)] lg:hidden">
          <div className="relative z-30">
            {title}
            {actions}
            <div className="mt-5">{socialBlock}</div>
          </div>
          <motion.div className="relative z-20 -mx-[var(--page-gutter)] mt-2 flex min-h-[24rem] flex-1 items-end justify-center sm:min-h-[30rem] md:min-h-[36rem]" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}>
            <Image src={portraitSrc} alt="Antoine Battle portrait" width={1200} height={1200} priority sizes="(max-width: 1023px) 100vw, 50vw" className="h-auto max-h-[58svh] w-[min(115vw,48rem)] max-w-none object-contain object-bottom sm:max-h-[64svh]" style={{ maskImage: "linear-gradient(to bottom, #000 78%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, #000 78%, transparent 100%)" }} />
          </motion.div>
        </div>

        <div className="hidden h-full grid-cols-12 gap-x-[clamp(1.5rem,2.5vw,3rem)] lg:grid">
          <div className="relative z-30 col-span-4 pt-[clamp(8rem,16vh,11rem)]">{title}{actions}</div>
          <motion.div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.15 }}>
            <Image src={portraitSrc} alt="Antoine Battle portrait" width={1200} height={1200} priority sizes="(max-width: 1536px) 56vw, 50vw" className="h-[min(92svh,67rem)] w-auto max-w-none object-contain object-bottom" style={{ maskImage: "linear-gradient(to bottom, #000 76%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, #000 76%, transparent 100%)" }} />
          </motion.div>
          <div className="relative z-30 col-span-4 col-start-9 pt-[clamp(8rem,16vh,11rem)]">{socialBlock}</div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-30 text-center font-[SpaceGroteskBold] text-[11.5vw] uppercase leading-none text-white sm:bottom-7 lg:bottom-8 lg:text-[clamp(6.5rem,10vw,12rem)]">
        <span className="whitespace-nowrap">{backgroundText}</span>
      </div>
    </section>
  );
}
