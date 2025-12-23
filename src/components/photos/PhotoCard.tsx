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
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent pt-12 pb-4 px-4">
          <p className="text-white text-sm md:text-base font-medium font-[SpaceGroteskRegular] line-clamp-3">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}
