"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import FloatingCarousel from "./FloatingCarousel";
import type { HighlightSlide } from "./FloatingCarousel";

type FooterProps = {
  highlights?: HighlightSlide[];
};

const socialIcons = {
  email: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  instagram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  x: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
};

export default function Footer({ highlights = [] }: FooterProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Integrate with Mailchimp/Brevo API
      console.log("Subscribing email:", email);
      // await fetch("/api/subscribe", { method: "POST", body: JSON.stringify({ email }) });
      setEmail("");
      // Show success message
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      label: "Email",
      icon: socialIcons.email,
      href: "mailto:hello@antoinebattle.com",
    },
    {
      label: "LinkedIn",
      icon: socialIcons.linkedin,
      href: "https://www.linkedin.com/in/antoinebattle/",
    },
    {
      label: "Instagram",
      icon: socialIcons.instagram,
      href: "https://instagram.com/antoine_battle",
    },
    {
      label: "X (Twitter)",
      icon: socialIcons.x,
      href: "https://x.com/antoine_battle",
    },
  ];

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Media", href: "/media" },
    { label: "Insights", href: "/insights" },
  ];

  return (
    <>
      {highlights.length > 0 && (
        <FloatingCarousel items={highlights} intervalMs={3000} />
      )}

      <footer className="relative z-[1] bg-[#0A0A0A] text-white pt-16 sm:pt-20 md:pt-[84px] pb-8 sm:pb-10 md:pb-12 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            <div>
              <h2 className="text-[28px] md:text-[36px] font-[SpaceGroteskBold] font-bold tracking-tight">
                ANTOINE BATTLE
              </h2>
              <div className="mt-6 flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="me noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 grid place-items-center rounded-full border border-white/15 hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[16px] font-[SpaceGroteskRegular] font-bold text-white">
                Have a question or want work together? Drop me a message!
              </h3>
              <p className="mt-2 text-white/75 text-sm leading-relaxed max-w-md font-[SpaceGroteskRegular]">
                Subscribe to stay updated with insights, stories, and strategies
                on international education and leadership.
              </p>
              <form onSubmit={handleSubmit} className="mt-4">
                <label htmlFor="footer-email" className="sr-only">
                  Email
                </label>
                <div className="flex items-center gap-2 rounded-full border border-white/20 pl-5 pr-1 py-2.5 bg-white/0 focus-within:border-white/40 transition-colors">
                  <input
                    id="footer-email"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    className="bg-transparent text-white placeholder-white/50 outline-none flex-1 text-sm font-[SpaceGroteskRegular]"
                    aria-invalid={error ? "true" : "false"}
                    aria-describedby={error ? "email-error" : undefined}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-10 h-10 rounded-full bg-[#E1462B] grid place-items-center hover:opacity-90 transition-opacity disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black font-[SpaceGroteskRegular]"
                    aria-label="Subscribe to newsletter"
                  >
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
                {error && (
                  <p
                    id="email-error"
                    className="mt-2 text-xs text-red-400"
                    role="alert"
                  >
                    {error}
                  </p>
                )}
              </form>
            </div>
          </div>

          <nav
            className="mt-12 md:mt-14 flex flex-wrap justify-center gap-x-12 gap-y-3"
            aria-label="Footer navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                className="text-white/80 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded font-[SpaceGroteskRegular]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-10 md:mt-12 text-xs text-white/60 text-center font-[SpaceGroteskRegular]">
            © 2025 Antoine Battle. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
