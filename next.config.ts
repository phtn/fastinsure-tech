import { type NextConfig } from "next";
// await import("./src/env.js");

const config: NextConfig = {
  experimental: {
    turbo: {
      resolveAlias: {
        canvas: "./empty-module.ts",
      },
    },
    reactCompiler: true,
  },
  reactStrictMode: true,
};
export default config;
