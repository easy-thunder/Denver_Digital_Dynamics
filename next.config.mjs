// next.config.mjs
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Ensure @ resolves to /src in ALL environments (Vercel included)
    config.resolve.alias["@"] = path.resolve(process.cwd(), "src");
    config.resolve.alias["@/components"] = path.resolve(__dirname, "src/components");
    config.resolve.alias["@/lib"] = path.resolve(__dirname, "src/lib");
    return config;
  },
};

export default nextConfig;
