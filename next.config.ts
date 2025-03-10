import "./src/env.js";
import { env } from "./src/env.js";

const config = {
  reactStrictMode: true,
  experimental: {
    reactCompiler: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: env.NEXT_PUBLIC_CONVEX_URL,
      },
    ],
  },
};

export default config;
