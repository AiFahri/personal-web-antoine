import Image from "next/image";
import ReelCarousel from "@/components/reels/ReelCarousel";
import ReelCard from "@/components/reels/ReelCard";
import { sanity } from "@/lib/sanity";
import { latestReelsQuery } from "@/lib/queries";

export const revalidate = 60;

type GalleryProps = {
  title?: string;
  eyebrow?: string;
  subtitle?: string;
  cta?: { label: string; href: string };
  limit?: number;
};

export default async function Gallery({
  title = "Experience Leadership in Action",
  eyebrow,
  subtitle = "See moments from Antoine’s global speaking, teaching, and collaboration across universities, events, and international forums.",
  cta = { label: "View More", href: "/gallery" },
  limit = 12,
}: GalleryProps) {
  const reels = await sanity.fetch(latestReelsQuery);
  const items = (reels || []).slice(0, limit);

  return (
    <section className="">
      <div className="">
        <div className="rounded-3xl border border-black/5 bg-white shadow-sm p-6 md:p-8">
          <div className="grid grid-cols-12 gap-x-6 gap-y-8 items-start">
            <div className="col-span-12 md:col-span-5 lg:col-span-4 order-1">
              <div className="rounded-3xl bg-gradient-to-br from-[#D35A33] to-[#C0472A] text-white p-6 md:p-8">
                {eyebrow && (
                  <div className="text-sm uppercase tracking-wide text-white/80 mb-2">
                    {eyebrow}
                  </div>
                )}
                <h2 className="text-3xl md:text-4xl  tracking-tight font-[SpaceGroteskMedium]">
                  {title}
                </h2>
                <div
                  className="mt-6 rounded-3xl overflow-hidden"
                  style={{ aspectRatio: "11/12" }}
                >
                  {/* <Image
                    src="/images/antoine2.png"
                    alt="Antoine portrait"
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 90vw, 33vw"
                  /> */}
                </div>
              </div>
            </div>

            <div className="col-span-12 md:col-span-7 lg:col-span-8 order-2">
              <div className="flex items-start justify-between gap-4 mb-4 md:mb-6">
                <p className="text-base md:text-4xl font-medium text-black/80 font-[SpaceGroteskRegular]">
                  See moments from Antoine’s global speaking, teaching, and
                  collaboration{" "}
                  <span className="text-black/60">
                    across universities, events, and international forums.
                  </span>
                </p>
                <div className="hidden md:flex items-center gap-3">
                  <a
                    href={cta.href}
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-[#C44829] text-white hover:bg-[#B03E25] focus-visible:ring-2"
                  >
                    {cta.label}
                    <svg
                      className="w-4 h-4"
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
                  </a>
                </div>
              </div>

              <ReelCarousel>
                {items.map((it: any) => (
                  <ReelCard
                    key={it._id}
                    title={it.title}
                    kind={it.kind}
                    imageUrl={it.imageUrl}
                    videoUrl={it.videoUrl}
                    videoMime={it.videoMime}
                    thumbUrl={it.thumbUrl}
                    posterSecond={it.posterSecond}
                  />
                ))}
              </ReelCarousel>

              <div className="md:hidden mt-4">
                <a
                  href={cta.href}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-[#C44829] text-white hover:bg-[#B03E25] focus-visible:ring-2"
                >
                  {cta.label}
                  <svg
                    className="w-4 h-4"
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
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
