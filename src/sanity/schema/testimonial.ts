export const testimonial = {
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    {
      name: "quote",
      type: "text",
      rows: 4,
      validation: (R: any) => R.required(),
    },
    { name: "name", type: "string", validation: (R: any) => R.required() },
    { name: "role", type: "string" },
    {
      name: "avatar",
      type: "image",
      options: { hotspot: true },
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
    select: { name: "name", role: "role", media: "avatar" },
    prepare: ({ name, role, media }: any) => ({
      title: name,
      subtitle: role,
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


