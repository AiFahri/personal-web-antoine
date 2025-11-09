export const reel = {
  name: "reel",
  title: "Reel / Media",
  type: "document",
  fields: [
    {
      name: "title",
      type: "string",
      description: "Alt/title",
      validation: (R: any) => R.required(),
    },
    {
      name: "kind",
      title: "Type",
      type: "string",
      initialValue: "video",
      options: { list: ["video", "image"], layout: "radio" },
      validation: (R: any) => R.required(),
    },
    // VIDEO
    {
      name: "file",
      title: "Video",
      type: "file",
      options: { accept: "video/*" },
      hidden: ({ parent }: any) => parent?.kind !== "video",
      validation: (R: any) =>
        R.custom((v: any, ctx: any) =>
          ctx.parent.kind === "video" && !v ? "Video required" : true
        ),
    },
    {
      name: "thumbnail",
      title: "Optional Thumbnail",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }: any) => parent?.kind !== "video",
    },
    {
      name: "posterSecond",
      title: "Poster at second",
      type: "number",
      initialValue: 1,
      hidden: ({ parent }: any) => parent?.kind !== "video",
    },
    // IMAGE
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }: any) => parent?.kind !== "image",
      validation: (R: any) =>
        R.custom((v: any, ctx: any) =>
          ctx.parent.kind === "image" && !v ? "Image required" : true
        ),
    },
    { name: "publishedAt", type: "datetime" },
  ],
};
