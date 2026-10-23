import { sanity } from "@/lib/sanity";
import { latestPostsQuery } from "@/lib/queries";
import PostCard from "@/components/blog/PostCard";
import Carousel from "@/components/carousel/Carousel";
import SubscribeForm from "../ui/SubscribeForm";

export const revalidate = 60;

type StayConnectedProps = {
  title?: string;
  subtitle?: string;
  highlightVariantIndex?: number;
  limit?: number;
};

type StayConnectedPost = {
  title: string;
  slug?: string;
  cover: string;
  postType?: "internal" | "external";
  externalUrl?: string;
  publishedAt: string;
  excerpt: string;
};

export default async function StayConnected({
  title = "Stay Connected and Inspired",
  subtitle = "Join Antoine’s newsletter for insights, stories, and strategies on international education and leadership.",
  highlightVariantIndex = 0,
  limit = 12,
}: StayConnectedProps) {
  const posts = await sanity.fetch<StayConnectedPost[]>(latestPostsQuery, {
    limit,
  });

  if (!posts?.length) {
    return (
      <section className="py-16">
        <div className="page-shell">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            {title}
          </h2>
          <div className="bg-white rounded-3xl shadow p-12 text-center text-lg text-gray-500">
            No posts yet.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="page-shell">
        <div className="grid items-start gap-5 pb-6 md:grid-cols-2 md:items-end lg:gap-8 xl:grid-cols-[minmax(14rem,0.7fr)_minmax(18rem,1fr)_minmax(22rem,31.25rem)]">
          <h2 className="font-[SpaceGroteskBold] text-3xl font-bold tracking-tight text-black md:text-5xl">
            {title}
          </h2>
          <p className="max-w-2xl font-[SpaceGroteskMedium] text-lg text-black sm:text-xl lg:text-2xl">
            {subtitle}
          </p>
          <div className="w-full md:col-span-2 xl:col-span-1">
            <SubscribeForm />
          </div>
        </div>
        <div className="relative bg-white rounded-[28px] border border-black/5 shadow-sm p-0 md:p-4 overflow-hidden">
          <Carousel>
            {posts.map((post, idx) => {
              const isExternal =
                post.postType === "external" && !!post.externalUrl;
              const href =
                isExternal && post.externalUrl
                  ? post.externalUrl
                  : `/blog/${post.slug}`;
              return (
                <PostCard
                  key={`${post.slug ?? post.externalUrl ?? idx}`}
                  variant={
                    idx === highlightVariantIndex ? "highlight" : "default"
                  }
                  title={post.title}
                  excerpt={post.excerpt}
                  cover={post.cover}
                  date={post.publishedAt}
                  href={href}
                  external={isExternal}
                />
              );
            })}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
