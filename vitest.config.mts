import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tscp from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tscp(), react()],
  test: {
    environment: "jsdom",
  },
});
