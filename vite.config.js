import { defineConfig } from "vite";
import postcss from "./postcss.config.js";
import react from "@vitejs/plugin-react";
import dns from "dns";

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
  },
  css: {
    postcss,
  },
  server: {
    proxy: {
      "/api": "https://zad-api.onrender.com/",
      "/ing": "https://zad-api.onrender.com/",
      "/bakery": "https://zad-api.onrender.com/",
      "/pos":"https://zad-api.onrender.com/",
      changeOrigin: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, "");
        },
      },
    ],
  },
  build: {
    manifest:true,
    rollupOptions: {
      input: "./src/main.jsx",
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
