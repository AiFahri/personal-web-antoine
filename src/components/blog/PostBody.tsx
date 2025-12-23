"use client";
import { PortableText } from "@portabletext/react";

type PostBodyProps = {
  contentType: "plain" | "rich";
  contentPlain?: string;
  contentRich?: any;
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
        <PortableText value={contentRich} />
      </div>
    );
  }

  return null;
}





