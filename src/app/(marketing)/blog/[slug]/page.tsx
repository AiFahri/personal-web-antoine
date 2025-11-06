import { sanity } from "@/lib/sanity";
import { postBySlugQuery, postSlugsQuery } from "@/lib/queries";
import PostHeader from "@/components/blog/PostHeader";
import PostBody from "@/components/blog/PostBody";
import { notFound } from "next/navigation";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await sanity.fetch(postSlugsQuery);
  return slugs.map((item: { slug: string }) => ({
    slug: item.slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await sanity.fetch(postBySlugQuery, { slug });

  if (!post) {
    notFound();
  }

  return (
    <article className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
        <PostHeader
          title={post.title}
          cover={post.cover}
          publishedAt={post.publishedAt}
        />
        <PostBody
          contentType={post.contentType}
          contentPlain={post.contentPlain}
          contentRich={post.contentRich}
        />
      </div>
    </article>
  );
}
