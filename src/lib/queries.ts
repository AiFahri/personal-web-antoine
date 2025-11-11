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

export const latestVideosQuery = `
*[_type == "videoItem"] | order(publishedAt desc)[0...24]{
  _id, title, posterSecond,
  "videoUrl": video.asset->url,
  "videoMime": video.asset->mimetype,
  "thumbUrl": thumbnail.asset->url
}
`;

export const latestPhotosQuery = `
*[_type == "photoItem"] | order(publishedAt desc)[0...24]{
  _id, title, "imageUrl": image.asset->url
}
`;

export const servicesQuery = `
*[_type == "service"] | order(order asc, _createdAt asc){
  _id,
  title,
  summary,
  "slug": slug.current,
  "image": {
    "url": image.asset->url,
    "alt": image.alt
  },
  "imageNext": imageNext.asset->url,
  ctaLabel
}
`;

export const testimonialsQuery = `
*[_type == "testimonial"] | order(order asc, _createdAt asc){
  _id,
  quote,
  name,
  role,
  "avatar": {
    "url": avatar.asset->url,
    "alt": avatar.alt
  }
}
`;

export const highlightsQuery = `
*[_type == "highlight"] | order(order asc, publishedAt desc){
  _id,
  title,
  text,
  "image": {
    "url": image.asset->url,
    "alt": image.alt
  },
  ctaLabel,
  ctaHref
}
`;
