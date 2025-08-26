// next.config.mjs
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Ensure @ resolves to /src in ALL environments (Vercel included)
    config.resolve.alias["@"] = path.resolve(process.cwd(), "src");
    return config;
  },
};

export default nextConfig;
