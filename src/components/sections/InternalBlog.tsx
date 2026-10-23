"use client";

import { useEffect, useState } from "react";
import { sanity } from "@/lib/sanity";
import { internalLinksQuery } from "@/lib/queries";
import Carousel from "@/components/carousel/Carousel";
import PostCard from "@/components/blog/PostCard";
import SubscribeForm from "@/components/ui/SubscribeForm";

type InternalPost = {
  _id: string;
  title: string;
  slug: string;
  cover: string;
  publishedAt: string;
  excerpt: string;
};

export default function InternalBlogSection() {
  const [posts, setPosts] = useState<InternalPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await sanity.fetch(internalLinksQuery);
        setPosts(data || []);
      } catch (error) {
        console.error("Error fetching internal posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-white py-12 sm:py-16 md:py-24">
        <div className="page-shell">
          <p className="text-center text-gray-500">Loading...</p>
        </div>
      </section>
    );
  }

  if (!posts?.length) return null;

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="page-shell">
        <div className="grid items-start gap-5 pb-6 md:grid-cols-2 md:items-end lg:gap-8 xl:grid-cols-[minmax(14rem,0.7fr)_minmax(18rem,1fr)_minmax(22rem,31.25rem)]">
          <h2 className="font-[SpaceGroteskBold] text-3xl font-bold tracking-tight text-black md:text-5xl">
            View My Blog
          </h2>
          <p className="max-w-2xl font-[SpaceGroteskMedium] text-lg text-black sm:text-xl lg:text-2xl">
            Join Antoine’s newsletter for insights, stories, and strategies on
            international education and leadership.
          </p>
          <div className="w-full md:col-span-2 xl:col-span-1">
            <SubscribeForm />
          </div>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden rounded-[28px] border border-black/5 bg-white p-2 shadow-sm md:p-4">
          <Carousel navigationPosition="top-right">
            {posts.map((post, idx) => (
              <PostCard
                key={post._id}
                title={post.title}
                variant={idx === 0 ? "highlight" : "default"}
                excerpt={post.excerpt}
                cover={post.cover}
                href={`/blog/${post.slug}`}
                date={post.publishedAt}
                external={false}
              />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
