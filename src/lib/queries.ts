export const latestPostsQuery = `
  *[_type == "post"] | order(publishedAt desc)[0...$limit]{
    title,
    "slug": slug.current,
    excerpt,
    "cover": cover.asset->url,
    publishedAt
  }
`;

