export const post = {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    { name: "title", type: "string", validation: (R: any) => R.required() },
    {
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (R: any) => R.required(),
    },
    { name: "cover", type: "image", options: { hotspot: true } },
    {
      name: "contentType",
      title: "Content Type",
      type: "string",
      initialValue: "plain",
      options: { list: ["plain", "rich"], layout: "radio" },
    },
    {
      name: "contentPlain",
      type: "text",
      rows: 20,
      hidden: ({ parent }: any) => parent?.contentType !== "plain",
    },
    {
      name: "contentRich",
      type: "array",
      of: [{ type: "block" }],
      hidden: ({ parent }: any) => parent?.contentType !== "rich",
    },
    {
      name: "postType",
      title: "Post Type",
      type: "string",
      initialValue: "internal",
      options: { list: ["internal", "external"], layout: "radio" },
      validation: (R: any) => R.required(),
    },
    {
      name: "externalUrl",
      type: "url",
      hidden: ({ parent }: any) => parent?.postType !== "external",
    },
    { name: "publishedAt", type: "datetime" },
  ],
  preview: {
    select: { title: "title", media: "cover", t: "postType" },
    prepare: ({ title, media, t }: any) => ({
      title: `[${t}] ${title}`,
      media,
    }),
  },
};
