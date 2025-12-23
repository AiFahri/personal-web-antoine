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

export default async function StayConnected({
  title = "Stay Connected and Inspired",
  subtitle = "Join Antoine’s newsletter for insights, stories, and strategies on international education and leadership.",
  highlightVariantIndex = 0,
  limit = 12,
}: StayConnectedProps) {
  const posts = await sanity.fetch(latestPostsQuery, { limit });

  if (!posts?.length) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6">
          <h2 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black md:mb-0 font-[SpaceGroteskBold]">
            {title}
          </h2>
          <p className="text-2xl md:max-w-lg text-muted-foreground text-black font-[SpaceGroteskMedium]">
            {subtitle}
          </p>
          <SubscribeForm />
        </div>
        <div className="relative bg-white rounded-[28px] border border-black/5 shadow-sm p-0 md:p-4 overflow-hidden">
          <Carousel>
            {posts.map((post: any, idx: number) => {
              const isExternal =
                post.postType === "external" && !!post.externalUrl;
              const href = isExternal ? post.externalUrl : `/blog/${post.slug}`;
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
