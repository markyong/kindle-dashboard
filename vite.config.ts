import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  base: "/kindle-dashboard/",
  plugins: [
    react(),
    tailwindcss(),
    legacy({
      targets: ["ie >= 11"],
      renderLegacyChunks: true,
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
  ],
});
