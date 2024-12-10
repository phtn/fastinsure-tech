import { type NextConfig } from "next";

// await import("./src/env.js");

const config: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
  reactStrictMode: true,
};
export default config;
