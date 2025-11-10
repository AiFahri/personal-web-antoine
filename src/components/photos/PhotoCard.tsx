"use client";
import Image from "next/image";

type PhotoCardProps = {
  title: string;
  imageUrl: string;
};

export default function PhotoCard({ title, imageUrl }: PhotoCardProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-sm flex-shrink-0 basis-[72%] md:basis-[42%] lg:basis-[28%] mr-4 md:mr-6">
      <div className="relative aspect-[9/16] w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width:768px) 80vw, (max-width:1280px) 40vw, 25vw"
        />
      </div>
    </div>
  );
}
