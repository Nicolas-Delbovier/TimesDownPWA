import { fileURLToPath, URL } from "node:url";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["assets/add.svg", "assets/gameController.svg", "assets/newPage.svg"],
      manifest: {
        name: "Time's Down",
        short_name: "TD",
        description: "Implementation of Time's Up game into a web app",
        theme_color: "#003049",
        icons: [
          {
            src: "img/icons/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "img/icons/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        // screenshots: [
        //   {
        //     src: "img/screenshots/screenshot1.png",
        //     sizes: "640x320",
        //     type: "image/png",
        //     form_factor: "wide",
        //   },
        //   {
        //     src: "img/screenshots/screenshot2.png",
        //     sizes: "320x640",
        //     type: "image/png",
        //     form_factor: "narrow",
        //   },
        // ],
      },
    }),
  ],
  // server: {
  //   https: {
  //     key: "./ssl/cert.key",
  //     cert: "./ssl/cert.crt"
  //   }
  // },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
