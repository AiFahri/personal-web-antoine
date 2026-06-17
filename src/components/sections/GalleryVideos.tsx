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
  featuredVideoPath?: string;
};

export default async function GalleryVideos({
  title = "Testimonial from Dr. Alejandra Barahona, Rector, Latin American University of Science of Technology (ULACIT), the #1 private university in Costa Rica",
  eyebrow,
  subtitle = "Watch video highlights from Antoine Battle’s global engagement work with higher education institutions, governments, and organizations in countries such as India, Indonesia, and Latvia.",
  cta = { label: "View More", href: "/gallery" },
  limit = 12,
  featuredVideoPath = "/videos/testimonial dr. alejandra.mp4", // Default path
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
            <div className="rounded-3xl bg-gradient-to-t from-[#000000] to-[#C44829] text-white px-6 pt-6 md:px-8 md:pt-8">
              {eyebrow && (
                <div className="text-sm uppercase tracking-wide text-white/80 mb-2">
                  {eyebrow}
                </div>
              )}
              <h2 className="text-xl md:text-3xl tracking-tight font-[SpaceGroteskMedium]">
                {title}
              </h2>
              <div
                className="relative mt-6 rounded-3xl overflow-hidden"
                style={{ aspectRatio: "10/12" }}
              >
                <video
                  controls
                  className="w-full h-full object-cover"
                  preload="metadata"
                  playsInline
                >
                  <source src={`${featuredVideoPath}#t=4`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}