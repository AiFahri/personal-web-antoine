import Image from "next/image";
import { sanity } from "@/lib/sanity";
import { latestVideosQuery } from "@/lib/queries";
import GalleryVideosClient from "./GalleryVideosClient";

export const revalidate = 60;

type GalleryVideosProps = {
  title?: string;
  eyebrow?: string;
  subtitle?: string;
  cta?: { label: string; href: string };
  limit?: number;
};

export default async function GalleryVideos({
  title = "Experience Leadership Through Videos",
  eyebrow,
  subtitle = "Watch highlights from Antoine's global speaking, teaching, and leadership across universities and events.",
  cta = { label: "View More", href: "/gallery" },
  limit = 12,
}: GalleryVideosProps) {
  const videos = await sanity.fetch(latestVideosQuery);
  const items = (videos || []).slice(0, limit);

  return (
    <section>
      <div className="rounded-3xl border border-black/5 bg-white shadow-sm p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8 items-start">
          <div className="col-span-12 md:col-span-7 lg:col-span-8 order-2 md:order-1">
            <GalleryVideosClient items={items} subtitle={subtitle} cta={cta} />
          </div>

          <div className="col-span-12 md:col-span-5 lg:col-span-4 order-1 md:order-2">
            <div className="rounded-3xl bg-gradient-to-t from-[#B19893] to-[#C44829] text-white px-6 pt-6 md:px-8 md:pt-8">
              {eyebrow && (
                <div className="text-sm uppercase tracking-wide text-white/80 mb-2">
                  {eyebrow}
                </div>
              )}
              <h2 className="text-3xl md:text-4xl tracking-tight font-[SpaceGroteskMedium]">
                {title}
              </h2>
              <div
                className="relative mt-6 rounded-3xl overflow-hidden"
                style={{ aspectRatio: "10/12" }}
              >
                <Image
                  src="/images/antoine-portrait1.webp"
                  alt="Antoine portrait"
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 90vw, 33vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
