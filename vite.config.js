import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon-v2.svg", "swastika.png"],
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
      manifest: {
        name: "Darshanam",
        short_name: "Darshanam",
        description:
          "Ancient Wisdom for Modern Minds - Explore the Bhagavad Gita and Indian Philosophy.",
        theme_color: "#d97706",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/swastika.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/swastika.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
