"use client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { getImageDimensions } from "@sanity/asset-utils";

type PostBodyProps = {
  contentType: "plain" | "rich";
  contentPlain?: string;
  contentRich?: any;
};

// Custom components for PortableText
const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }

      const { width, height } = getImageDimensions(value.asset._ref);
      
      // Build Sanity CDN URL
      const imageUrl = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${value.asset._ref
        .replace('image-', '')
        .replace('-jpg', '.jpg')
        .replace('-png', '.png')
        .replace('-webp', '.webp')
        .replace('-gif', '.gif')}`;

      return (
        <figure className="my-8 md:my-12">
          <div className="relative w-full overflow-hidden rounded-2xl bg-gray-100">
            <Image
              src={imageUrl}
              alt={value.alt || value.caption || 'Blog post image'}
              width={width}
              height={height}
              className="w-full h-auto object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-gray-600 italic font-[SpaceGroteskRegular]">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    // Customize heading styles
    h1: ({ children }: any) => (
      <h1 className="text-4xl md:text-5xl font-bold mt-12 mb-6 font-[SpaceGroteskBold]">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl md:text-4xl font-bold mt-10 mb-5 font-[SpaceGroteskBold]">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl md:text-3xl font-bold mt-8 mb-4 font-[SpaceGroteskMedium]">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="mb-6 leading-relaxed text-lg text-gray-800">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#C44829] pl-6 my-8 italic text-xl text-gray-700">
        {children}
      </blockquote>
    ),
  },
  marks: {
    // Customize text marks
    strong: ({ children }: any) => (
      <strong className="font-bold text-black">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-gray-700">{children}</em>
    ),
    link: ({ value, children }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-[#C44829] hover:underline font-medium"
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-6 space-y-2 text-lg">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-6 space-y-2 text-lg">
        {children}
      </ol>
    ),
  },
};

export default function PostBody({ contentType, contentPlain, contentRich }: PostBodyProps) {
  if (contentType === "plain" && contentPlain) {
    return (
      <div className="prose prose-lg max-w-none">
        <div className="whitespace-pre-wrap leading-relaxed text-black">
          {contentPlain}
        </div>
      </div>
    );
  }

  if (contentType === "rich" && contentRich) {
    return (
      <div className="prose prose-lg max-w-none text-black font-[SatoshiRegular]">
        <PortableText 
          value={contentRich} 
          components={portableTextComponents}
        />
      </div>
    );
  }

  return null;
}





