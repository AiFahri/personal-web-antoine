import { sanity } from "@/lib/sanity";
import { highlightsQuery } from "@/lib/queries";
import Footer from "./Footer";
import type { HighlightSlide } from "./FloatingCarousel";

export const revalidate = 60;

export default async function FooterServer() {
  const highlights = await sanity.fetch(highlightsQuery);
  const items: HighlightSlide[] = (highlights || []).map((h: any) => ({
    _id: h._id,
    title: h.title,
    text: h.text,
    image: {
      url: h.image?.url || "",
      alt: h.image?.alt,
    },
    cta: h.ctaHref
      ? {
          label: h.ctaLabel || "Book Now",
          href: h.ctaHref,
        }
      : undefined,
  }));

  return <Footer highlights={items} />;
}

