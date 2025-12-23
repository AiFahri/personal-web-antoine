import CardNav from "./CardNav";

const Navbar = () => {
  const items = [
    {
      label: "About & Services",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        {
          label: "About Antoine",
          ariaLabel: "About Antoine Battle",
          href: "https://www.nafsa.org/people/antoine-battle",
        },
        {
          label: "Speaking",
          ariaLabel: "Book Speaking Engagement",
          href: "/speaking",
        },
        {
          label: "Consulting & Advisory",
          ariaLabel: "Hire as Consultant",
          href: "/consulting",
        },
      ],
    },
    {
      label: "Content",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Podcast", ariaLabel: "Listen to Podcast", href: "/podcast" },
        { label: "Blog", ariaLabel: "Read Articles", href: "/blog" },
        {
          label: "Resources",
          ariaLabel: "Download Resources",
          href: "/resources",
        },
      ],
    },
    {
      label: "Media & Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        {
          label: "Media & Gallery",
          ariaLabel: "View Photos & Videos",
          href: "/media",
        },
        { label: "Contact", ariaLabel: "Get in Touch", href: "/contact" },
      ],
    },
  ];

  return (
    <CardNav
      items={items}
      baseColor="#fff"
      menuColor="#000"
      buttonBgColor="#000"
      buttonTextColor="#fff"
      ease="power3.out"
    />
  );
};
export default Navbar;
