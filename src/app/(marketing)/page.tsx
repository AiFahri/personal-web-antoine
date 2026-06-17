import Hero from "@/components/sections/Hero";
import { HighlightA, HighlightB } from "@/components/sections/Highlights";
import { highlightAData, highlightBData } from "@/data/highlights";
import StayConnected from "@/components/sections/StayConnected";
import GlobalImpact from "@/components/sections/GlobalImpact";
import GalleryVideos from "@/components/sections/GalleryVideos";
import GalleryPhotos from "@/components/sections/GalleryPhotos";
import FeaturedServices from "@/components/sections/FeaturedServices";
import Testimonials from "@/components/sections/Testimonials";
import InternalBlogSection from "@/components/sections/InternalBlog";
import ExternalLinksSection from "@/components/sections/ExternalLink";

export default function MarketingPage() {
  return (
    <>
      <Hero
        titleLines={["I'M ANTOINE", "BATTLE"]}
        subtitle="Antoine Battle — Advancing Global Engagement and Leadership Development"
        portraitSrc="/images/Antoine Battle.webp"
        ctas={[
           {
            label: "U.S. Department of State - Exchange Alumni Feature",
            href: "https://alumni.state.gov/highlight/unlocking-success-through-career-connections-antoine-battle-story",
            variant: "primary",
          },
          {
            label: "NAFSA Profile",
            href: "https://www.nafsa.org/people/antoine-battle",
            variant: "primary",
          },
        ]}
        socials={[
          {
            label: "linkedin",
            href: "https://www.linkedin.com/in/antoinebattle/",
          },
          { label: "youtube", href: "https://youtube.com/antoine_battle" },
          { label: "instagram", href: "https://instagram.com/antoine_battle" },
          { label: "facebook", href: "https://facebook.com/antoine_battle" },
          { label: "tiktok", href: "https://tiktok.com/antoine_battle" },
        ]}
        backgroundText="ANTOINE BATTLE"
      />

      <HighlightA {...highlightAData} />
      {/* <HighlightB {...highlightBData} /> */}
      <InternalBlogSection/>
            {/* <StayConnected /> */}
      <ExternalLinksSection/>
      <GlobalImpact />
      <GalleryVideos />
      <GalleryPhotos />
      <FeaturedServices autoplay={true} intervalMs={5500} />
      <Testimonials autoplay={true} intervalMs={4500} />
    </>
  );
}
