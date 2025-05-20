import { fileURLToPath, URL } from "node:url";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["assets/modificationsMenuIcon.svg", "assets/playMenuIcon.svg", "assets/themesMenuIcon.svg"],
      manifest: {
        name: "Time's Down",
        short_name: "Time's Down",
        description: "Implementation of Time's Up game into a web app",
        theme_color: "#00191e",
        display: 'standalone',
        start_url: '.',
        icons: [
          {
            src: "img/icons/android-48x48.png",
            sizes: "48x48",
            type: "image/png",
          },
          {
            src: "img/icons/android-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "img/icons/android-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "img/icons/android-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "img/icons/android-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "img/icons/android-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "img/screenshots/play_menu-landscape.png",
            sizes: "640x320",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "img/screenshots/themes_selection-landscape.png",
            sizes: "640x320",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "img/screenshots/game-landscape.png",
            sizes: "640x320",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "img/screenshots/scores-landscape.png",
            sizes: "640x320",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "img/screenshots/play_menu-portrait.png",
            sizes: "640x320",
            type: "image/png",
            form_factor: "narrow",
          },
          {
            src: "img/screenshots/themes_selection-portrait.png",
            sizes: "640x320",
            type: "image/png",
            form_factor: "narrow",
          },
          {
            src: "img/screenshots/game-portrait.png",
            sizes: "640x320",
            type: "image/png",
            form_factor: "narrow",
          },
          {
            src: "img/screenshots/scores-portrait.png",
            sizes: "640x320",
            type: "image/png",
            form_factor: "narrow",
          },

        ],
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
