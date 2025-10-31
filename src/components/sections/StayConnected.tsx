import { sanity } from "@/lib/sanity";
import { latestPostsQuery } from "@/lib/queries";
import PostCard from "@/components/blog/PostCard";
import Carousel from "@/components/carousel/Carousel";

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

  if (!posts.length) {
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
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6">
          <h2 className="font-bold text-3xl md:text-4xl tracking-tight mb-4 md:mb-0 font-[SpaceGroteskBold]">
            {title}
          </h2>
          <p className="text-lg md:max-w-lg text-muted-foreground">
            {subtitle}
          </p>
        </div>
        <div className="relative bg-white rounded-[28px] border border-black/5 shadow-sm p-1 md:p-4">
          <Carousel>
            {posts.map((post: any, idx: number) => (
              <PostCard
                key={post.slug}
                variant={
                  idx === highlightVariantIndex ? "highlight" : "default"
                }
                title={post.title}
                excerpt={post.excerpt}
                cover={post.cover}
                date={post.publishedAt}
                href={`/blog/${post.slug}`}
              />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
