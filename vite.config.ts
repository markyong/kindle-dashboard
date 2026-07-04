import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  base: "/kindle-dashboard/",
  build: {
    target: "es2015",
    cssTarget: "chrome61",
    modulePreload: false,
  },
  plugins: [
    react(),
    legacy({
      targets: ["ie >= 11"],
      renderLegacyChunks: true,
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
  ],
});
