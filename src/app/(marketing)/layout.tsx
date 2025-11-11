import Navbar from "@/components/layout/Navbar";
import FooterServer from "@/components/footer/FooterServer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <FooterServer />
    </>
  );
}
