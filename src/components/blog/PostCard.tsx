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
  external?: boolean;
};

export default function PostCard({
  variant,
  title,
  excerpt,
  cover,
  date,
  href,
  external,
}: PostCardProps) {
  const Wrapper: any = external ? "a" : Link;
  const wrapperProps = external
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  return (
    <Wrapper
      {...wrapperProps}
      className={`group relative p-5 md:p-6 rounded-3xl w-[calc(100vw-3rem)] md:w-[350px] flex flex-col flex-shrink-0
        ${
          variant === "highlight"
            ? "bg-[#D5572F] text-white shadow-lg"
            : "bg-stone-50 text-black border border-black/5 hover:-translate-y-1 transition shadow-sm"
        } focus:outline-none focus-visible:ring-2 ring-primary/60`}
      aria-label={title}
    >
      <div className="flex justify-between items-center mb-6">
        <time
          dateTime={date}
          className={`rounded-full px-4 py-1 text-md font-medium font-[SpaceGroteskRegular] ${
            variant === "highlight"
              ? "bg-white/10 border border-white/40 text-white"
              : "bg-stone-200 border border-black/10 text-stone-700"
          }`}
        >
          {formatDate(date)}
        </time>
       
      </div>
      <h3 className=" text-lg md:text-xl leading-tight mb-2 line-clamp-3 font-[SpaceGroteskMedium]">
        {title}
      </h3>
      <p
        className={`text-sm md:text-base leading-relaxed mb-5 line-clamp-2 font-[SpaceGroteskRegular] ${variant === "highlight" ? "text-white/90" : "text-stone-700"}`}
      >
        {excerpt}
      </p>
      <div className="mt-auto relative">
        <Image
          src={cover}
          alt={title}
          width={336}
          height={240}
          className="w-full rounded-xl object-cover aspect-[9/10]"
          sizes="(max-width: 768px) 80vw, 336px"
        />
        <div
          className={`absolute inset-0 pointer-events-none rounded-xl ${variant === "highlight" ? "bg-gradient-to-t from-black/30" : "bg-gradient-to-t from-black/10"}`}
        />
      </div>
      <span className="absolute inset-0" aria-hidden="true" tabIndex={-1} />
    </Wrapper>
  );
}
