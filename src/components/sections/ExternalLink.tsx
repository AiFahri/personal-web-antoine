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
      <section className="w-full py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500">Loading...</p>
        </div>
      </section>
    );
  }

  if (!posts?.length) return null;

  return (
    <section className="w-full py-2 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header - Layout: Description (left) | Title (right) */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <p className="text-2xl text-black max-w-xl order-2 md:order-1 font-[SpaceGroteskMedium]">
            Coverage and features highlighting Antoine Battle’s work in global engagement and international collaboration.
          </p>
          <h2 className="text-4xl md:text-5xl font-bold order-1 md:order-2 font-[SpaceGroteskBold] text-black">
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