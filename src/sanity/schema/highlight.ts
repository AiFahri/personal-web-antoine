export const highlight = {
  name: "highlight",
  title: "Highlight Footer",
  type: "document",
  fields: [
    {
      name: "title",
      type: "string",
      validation: (R: any) => R.required(),
    },
    {
      name: "text",
      type: "text",
      rows: 3,
      validation: (R: any) => R.required(),
    },
    {
      name: "image",
      type: "image",
      options: { hotspot: true },
      validation: (R: any) => R.required(),
    },
    {
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
      initialValue: "Book Now",
    },
    {
      name: "ctaHref",
      title: "CTA Link",
      type: "string",
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
      initialValue: 0,
    },
    {
      name: "publishedAt",
      type: "datetime",
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
    {
      title: "Published Date",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
};

