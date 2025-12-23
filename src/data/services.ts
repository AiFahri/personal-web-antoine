import type { ServiceItem } from "@/components/sections/FeaturedServices";

export const featuredServicesData: ServiceItem[] = [
  {
    _id: "1",
    title: "Speaking",
    summary:
      "Antoine delivers powerful and thought-provoking keynotes that inspire audiences to lead with purpose, think globally, and embrace innovation. Drawing from his experience across higher education, international development, and leadership strategy, he connects stories with strategy—helping institutions, educators, and emerging leaders envision new possibilities for impact and collaboration.",
    slug: "/services/speaking",
    image: {
      url: "/images/antoine 3.png",
      alt: "Antoine speaking at a conference",
    },
    ctaLabel: "Read More",
  },
  {
    _id: "2",
    title: "Consulting",
    summary:
      "Strategic consulting services to help educational institutions develop and implement global education programs that create lasting impact.",
    slug: "/services/consulting",
    image: {
      url: "/images/antoine 4.png",
      alt: "Consulting session",
    },
    ctaLabel: "Read More",
  },
  {
    _id: "3",
    title: "Leadership Development & Mentorship",
    summary:
      "Antoine designs and facilitates transformative leadership programs that cultivate confidence, clarity, and community among participants. Whether working with students, executives, or early-career professionals, he empowers individuals to lead authentically, communicate effectively, and create meaningful change within their institutions and industries.",
    slug: "/services/advisory",
    image: {
      url: "/images/antoine 1.png",
      alt: "Advisory meeting",
    },
    ctaLabel: "Read More",
  },
];
