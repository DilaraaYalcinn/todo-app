import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    exclude: [...configDefaults.exclude, "e2e/*"],
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5115",
        changeOrigin: true,
      },
    },
  },
});
