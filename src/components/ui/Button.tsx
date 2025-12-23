"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useComingSoon } from "./ComingSoonContext";

const AVAILABLE_ROUTES = ["/", "/blog"];

function isRouteAvailable(href: string): boolean {
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return true;
  }

  const normalizedHref = href.split("?")[0].split("#")[0]; // Remove query params and hash

  if (AVAILABLE_ROUTES.includes(normalizedHref)) {
    return true;
  }

  if (
    AVAILABLE_ROUTES.some((route) => normalizedHref.startsWith(route + "/"))
  ) {
    return true;
  }

  return false;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  href?: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export default function Button({
  variant = "primary",
  href,
  children,
  className,
  target,
  rel,
  ...props
}: ButtonProps) {
  const { show } = useComingSoon();

  const baseClasses =
    "inline-flex items-center justify-center px-6 py-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105";

  const variantClasses = {
    primary:
      "bg-black text-white hover:bg-gray-800 focus:ring-gray-500 font-[PlusJakarta] font-bold text-sm md:text-xl",
    ghost:
      "border border-white/20 text-white hover:bg-white/10 focus:ring-white/50",
  };

  const classes = cn(baseClasses, variantClasses[variant], className);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href && !isRouteAvailable(href)) {
      e.preventDefault();
      show(href);
    }
  };

  if (href) {
    return (
      <a
        href={isRouteAvailable(href) ? href : "#"}
        className={classes}
        onClick={handleClick}
        target={target}
        rel={rel}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
