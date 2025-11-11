export const service = {
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    { name: "title", type: "string", validation: (R: any) => R.required() },
    {
      name: "summary",
      type: "text",
      rows: 4,
      validation: (R: any) => R.required(),
    },
    {
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    },
    {
      name: "image",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      validation: (R: any) => R.required(),
    },
    {
      name: "imageNext",
      title: "Next Preview Image (Optional)",
      type: "image",
      options: { hotspot: true },
      description:
        "Optional preview image for next slide. If not provided, will use next service's main image.",
    },
    {
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
      initialValue: "Read More",
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
      initialValue: 0,
    },
  ],
  preview: {
    select: { title: "title", media: "image" },
    prepare: ({ title, media }: any) => ({
      title,
      media,
    }),
  },
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
};


