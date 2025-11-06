import Image from "next/image";
import { formatDate } from "@/lib/date";

type PostHeaderProps = {
  title: string;
  cover: string;
  publishedAt: string;
};

export default function PostHeader({
  title,
  cover,
  publishedAt,
}: PostHeaderProps) {
  return (
    <header className="mb-8 md:mb-12">
      <div className="mb-4">
        <time
          dateTime={publishedAt}
          className="inline-block rounded-full px-4 py-1.5 text-sm font-medium bg-stone-100 border border-black/10 text-stone-700"
        >
          {formatDate(publishedAt)}
        </time>
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6 md:mb-8 font-[SpaceGroteskBold] text-white">
        {title}
      </h1>

      <div className="relative w-full aspect-video md:aspect-[16/10] rounded-2xl overflow-hidden">
        <Image
          src={cover}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
        />
      </div>
    </header>
  );
}
