// next.config.mjs
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Map @ -> /src (and a couple of common prefixes just in case)
    config.resolve.alias["@" ] = path.resolve(process.cwd(), "src");
    config.resolve.alias["@/components"] = path.resolve(process.cwd(), "src/components");
    config.resolve.alias["@/lib"]        = path.resolve(process.cwd(), "src/lib");

    // Optional: prove this ran (shows up in Vercel build logs)
    console.log("[next.config] alias @ ->", config.resolve.alias["@"]);
    return config;
  },
};

export default nextConfig;
