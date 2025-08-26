import path from "path";
/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    config.resolve.alias["@/components"] = path.resolve(__dirname, "src/components");
    config.resolve.alias["@/lib"] = path.resolve(__dirname, "src/lib");
    return config;
  },
};
