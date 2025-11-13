import Image from "next/image";
import { sanity } from "@/lib/sanity";
import { latestPhotosQuery } from "@/lib/queries";
import GalleryPhotosClient from "./GalleryPhotosClient";

export const revalidate = 60;

type GalleryPhotosProps = {
  title?: string;
  eyebrow?: string;
  subtitle?: string;
  cta?: { label: string; href: string };
  limit?: number;
};

export default async function GalleryPhotos({
  title = "Experience Leadership Through Photos",
  eyebrow,
  subtitle = "Browse photos from Antoine's international speaking and collaboration across universities and events.",
  cta = { label: "View More", href: "/gallery" },
  limit = 12,
}: GalleryPhotosProps) {
  const photos = await sanity.fetch(latestPhotosQuery);
  const items = (photos || []).slice(0, limit);

  return (
    <section className="mt-8">
      <div className="rounded-3xl border border-black/5 bg-white shadow-sm p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8 items-start">
          <div className="col-span-12 md:col-span-5 lg:col-span-4 order-1">
            <div className="rounded-3xl bg-gradient-to-b from-[#000000] to-[#C44829] text-white px-6 pt-6 md:px-8 md:pt-8">
              {eyebrow && (
                <div className="text-sm uppercase tracking-wide text-white/80 mb-2">
                  {eyebrow}
                </div>
              )}
              <h2 className="text-3xl md:text-4xl tracking-tight font-[SpaceGroteskMedium]">
                {title}
              </h2>
              <div
                className="relative mt-6 rounded-3xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
                style={{ aspectRatio: "10/12" }}
              >
                <Image
                  src="/images/antoine-portrait2.webp"
                  alt="Antoine portrait"
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 90vw, 33vw"
                />
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 lg:col-span-8 order-2">
            <GalleryPhotosClient items={items} subtitle={subtitle} cta={cta} />
          </div>
        </div>
      </div>
    </section>
  );
}
