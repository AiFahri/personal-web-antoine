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
        <div className="whitespace-pre-wrap leading-relaxed text-gray-900">
          {contentPlain}
        </div>
      </div>
    );
  }

  if (contentType === "rich" && contentRich) {
    return (
      <div className="prose prose-lg max-w-none">
        <PortableText value={contentRich} />
      </div>
    );
  }

  return null;
}





