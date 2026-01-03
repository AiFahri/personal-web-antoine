import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
    unoptimized: true,
  },
  // Disable ESLint during build (temporary)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript errors during build (temporary)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Optimize Sanity bundling
  transpilePackages: ["sanity"],
  webpack: (config, { isServer }) => {
    // Handle Sanity large bundle size
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;
