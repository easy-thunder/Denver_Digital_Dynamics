// next.config.js
const path = require("path");

/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config) => {
    // Map '@' and the exact prefix you use most often
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    config.resolve.alias["@/components"] = path.resolve(__dirname, "src/components");
    config.resolve.alias["@/lib"] = path.resolve(__dirname, "src/lib");
    return config;
  },
};
