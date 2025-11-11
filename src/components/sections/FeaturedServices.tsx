import { sanity } from "@/lib/sanity";
import { servicesQuery } from "@/lib/queries";
import FeaturedServicesClient from "./FeaturedServicesClient";

export const revalidate = 60;

export type ServiceItem = {
  _id: string;
  title: string;
  summary: string;
  slug?: string;
  image: { url: string; alt?: string };
  imageNext?: { url: string; alt?: string };
  ctaLabel?: string;
};

type FeaturedServicesProps = {
  autoplay?: boolean;
  intervalMs?: number;
};

export default async function FeaturedServices({
  autoplay = true,
  intervalMs = 5500,
}: FeaturedServicesProps) {
  const services = await sanity.fetch(servicesQuery);
  const items = (services || []).map((s: any) => ({
    _id: s._id,
    title: s.title,
    summary: s.summary,
    slug: s.slug ? `/services/${s.slug}` : undefined,
    image: {
      url: s.image?.url || "",
      alt: s.image?.alt,
    },
    imageNext: s.imageNext
      ? {
          url: s.imageNext,
          alt: undefined,
        }
      : undefined,
    ctaLabel: s.ctaLabel,
  }));

  if (items.length === 0) return null;

  return (
    <FeaturedServicesClient
      items={items}
      autoplay={autoplay}
      intervalMs={intervalMs}
    />
  );
}
