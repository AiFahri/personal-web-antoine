"use client";

import { useEffect, useState } from "react";
import { sanity } from "@/lib/sanity";
import { externalLinksQuery } from "@/lib/queries";
import Carousel from "@/components/carousel/Carousel";
import PostCard from "@/components/blog/PostCard";

type ExternalPost = {
  _id: string;
  title: string;
  cover: string;
  externalUrl: string;
  publishedAt: string;
  excerpt: string;
};

export default function ExternalLinksSection() {
  const [posts, setPosts] = useState<ExternalPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await sanity.fetch(externalLinksQuery);
        setPosts(data || []);
      } catch (error) {
        console.error("Error fetching external posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-gray-50 py-12 sm:py-16 md:py-24">
        <div className="page-shell">
          <p className="text-center text-gray-500">Loading...</p>
        </div>
      </section>
    );
  }

  if (!posts?.length) return null;

  return (
    <section className="w-full bg-gray-50 py-12 sm:py-16 lg:py-24">
      <div className="page-shell">
        {/* Header - Layout: Description (left) | Title (right) */}
        <div className="mb-10 grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.8fr)] md:items-end md:gap-8 lg:mb-12">
          <p className="order-2 max-w-2xl font-[SpaceGroteskMedium] text-lg text-black sm:text-xl md:order-1 lg:text-2xl">
            Coverage and features highlighting Antoine Battle’s work in global engagement and international collaboration.
          </p>
          <h2 className="order-1 font-[SpaceGroteskBold] text-3xl font-bold text-black md:order-2 md:text-right md:text-5xl">
            News, Media & Features
          </h2>
        </div>

        {/* Carousel */}
        <Carousel navigationPosition="top-right">
          {posts.map((post, idx) => (
            <PostCard
              key={post._id}
            variant={idx === 0 ? "highlight" : "default"}
              title={post.title}
              excerpt={post.excerpt}
              cover={post.cover}
              date={post.publishedAt}
              href={post.externalUrl}
              external={true}
            />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
