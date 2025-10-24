import CardNav from './CardNav'

const Navbar = () => {
  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company", href: "/about" },
        { label: "Careers", ariaLabel: "About Careers", href: "/about" }
      ]
    },
    {
      label: "Projects", 
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects", href: "/projects" },
        { label: "Case Studies", ariaLabel: "Project Case Studies", href: "/projects" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#271E37", 
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us", href: "/contact" },
        { label: "Twitter", ariaLabel: "Twitter", href: "/contact" },
        { label: "LinkedIn", ariaLabel: "LinkedIn", href: "/contact" }
      ]
    }
  ];

  return (
    <CardNav
      logo="/next.svg"
      logoAlt="Company Logo"
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