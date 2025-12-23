import { sanity } from "@/lib/sanity";
import { testimonialsQuery } from "@/lib/queries";
import TestimonialsClient from "./TestimonialsClient";

export const revalidate = 60;

export type Testimonial = {
  _id: string;
  quote: string;
  name: string;
  role?: string;
  avatar?: { url: string; alt?: string };
};

type TestimonialsProps = {
  autoplay?: boolean;
  intervalMs?: number;
};

export default async function Testimonials({
  autoplay = true,
  intervalMs = 4500,
}: TestimonialsProps) {
  const testimonials = await sanity.fetch(testimonialsQuery);
  const items = (testimonials || []).map((t: any) => ({
    _id: t._id,
    quote: t.quote,
    name: t.name,
    role: t.role,
    avatar: t.avatar
      ? {
          url: t.avatar.url || "",
          alt: t.avatar.alt,
        }
      : undefined,
  }));

  if (items.length === 0) return null;

  return (
    <TestimonialsClient
      items={items}
      autoplay={autoplay}
      intervalMs={intervalMs}
    />
  );
}
