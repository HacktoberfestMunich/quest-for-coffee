import { defineConfig } from 'vite'
import { getMapsOptimizers, getMapsScripts } from "wa-map-optimizer-vite";
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        index: "./index.html",
        ...getMapsScripts(),
      },
    },
  },
  plugins: [...getMapsOptimizers(), basicSsl()],
  server: {
    host: "localhost",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
    open: "/",
    https: true
  },
})