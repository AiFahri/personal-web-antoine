import Hero from "@/components/sections/Hero";
import { HighlightA, HighlightB } from "@/components/sections/Highlights";
import { highlightAData, highlightBData } from "@/data/highlights";
import StayConnected from "@/components/sections/StayConnected";
import GalleryVideos from "@/components/sections/GalleryVideos";
import GalleryPhotos from "@/components/sections/GalleryPhotos";

export default function MarketingPage() {
  return (
    <>
      <Hero
        titleLines={["I'M ANTOINE", "BATTLE"]}
        subtitle="Antoine Battle — Advancing Global Education Across Borders"
        portraitSrc="/images/Antoine Battle.webp"
        ctas={[{ label: "More about me", href: "/about", variant: "primary" }]}
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
      <HighlightB {...highlightBData} />
      <StayConnected />
      <GalleryVideos />
      <GalleryPhotos />
    </>
  );
}
