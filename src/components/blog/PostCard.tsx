"use client";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/date";

export type PostCardProps = {
  variant: "highlight" | "default";
  title: string;
  excerpt: string;
  cover: string;
  date: string;
  href: string;
};

export default function PostCard({ variant, title, excerpt, cover, date, href }: PostCardProps) {
  return (
    <Link
      href={href}
      className={`group relative p-5 md:p-6 rounded-3xl w-[320px] md:w-[350px] flex flex-col 
        ${variant === "highlight"
          ? "bg-[#D5572F] text-white shadow-lg"
          : "bg-stone-50 text-black border border-black/5 hover:-translate-y-1 transition shadow-sm"
        } focus:outline-none focus-visible:ring-2 ring-primary/60`}
      aria-label={title}
    >
      <div className="flex justify-between items-center mb-6">
        <time
          dateTime={date}
          className={`rounded-full px-4 py-1 text-sm font-medium ${variant === "highlight"
            ? "bg-white/10 border border-white/40 text-white"
            : "bg-stone-200 border border-black/10 text-stone-700"
          }`}
        >
          {formatDate(date)}
        </time>
        <span className={`ml-2 w-9 h-9 rounded-full flex items-center justify-center ${variant === "highlight"
          ? "bg-white/10 border border-white/10"
          : "bg-white/70 border border-black/10"
        }`}>
          <svg className="w-4 h-4 text-current" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" /></svg>
        </span>
      </div>
      <h3 className="font-bold text-lg md:text-xl leading-tight mb-2 line-clamp-3">{title}</h3>
      <p className={`text-sm md:text-base leading-relaxed mb-5 line-clamp-2 ${variant === "highlight" ? "text-white/90" : "text-stone-700"}`}>{excerpt}</p>
      <div className="mt-auto relative">
        <Image
          src={cover}
          alt={title}
          width={336}
          height={240}
          className="w-full rounded-xl object-cover aspect-[4/3]"
          sizes="(max-width: 768px) 80vw, 336px"
        />
        <div className={`absolute inset-0 pointer-events-none rounded-xl ${variant === "highlight" ? "bg-gradient-to-t from-black/30" : "bg-gradient-to-t from-black/10"}`}/>
      </div>
      <span className="absolute inset-0" aria-hidden="true" tabIndex={-1}/>
    </Link>
  );
}

