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
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500">Loading...</p>
        </div>
      </section>
    );
  }

  if (!posts?.length) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6">
          <h2 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black md:mb-0 font-[SpaceGroteskBold]">
            View My Blog
          </h2>
          <p className="text-2xl md:max-w-lg text-muted-foreground text-black font-[SpaceGroteskMedium]">
            Join Antoine’s newsletter for insights, stories, and strategies on
            international education and leadership.
          </p>
          <SubscribeForm />
        </div>

        {/* Carousel */}
        <div className="relative bg-white rounded-[28px] border border-black/5 shadow-sm p-0 md:p-4 overflow-hidden">
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
