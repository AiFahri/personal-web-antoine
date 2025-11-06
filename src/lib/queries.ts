export const latestPostsQuery = `
*[_type == "post"] | order(publishedAt desc)[0...$limit]{
  title,
  "slug": slug.current,
  "cover": cover.asset->url,
  postType,
  externalUrl,
  publishedAt,
  "bodyText": coalesce(contentPlain, pt::text(contentRich)),
  "excerpt": array::join(string::split(coalesce(contentPlain, pt::text(contentRich)), " ")[0...40], " ") + "…"
}
`;

export const postSlugsQuery = `
*[_type == "post" && defined(slug.current) && postType == "internal"]{
  "slug": slug.current
}
`;

export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug && postType == "internal"][0]{
  title,
  "cover": cover.asset->url,
  publishedAt,
  contentType,
  contentPlain,
  contentRich
}
`;

export const latestReelsQuery = `
*[_type == "reel"] | order(publishedAt desc)[0...24]{
  title,
  "fileUrl": file.asset->url,
  "thumbnailUrl": thumbnail.asset->url,
  posterSecond,
  link,
  description,
  publishedAt
}
`;

