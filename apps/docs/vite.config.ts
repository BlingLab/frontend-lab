import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("index.html", import.meta.url)),
        smoke: fileURLToPath(new URL("component-smoke.html", import.meta.url))
      }
    }
  },
  resolve: {
    alias: [
      {
        find: /^@bling-lab\/ui$/,
        replacement: fileURLToPath(new URL("../../packages/ui/src/index.ts", import.meta.url))
      },
      {
        find: /^@bling-lab\/ui\/(.*)$/,
        replacement: `${fileURLToPath(new URL("../../packages/ui/src", import.meta.url))}/$1`
      },
      {
        find: /^@workspace\/tokens\/(.*)$/,
        replacement: `${fileURLToPath(new URL("../../packages/tokens/src", import.meta.url))}/$1`
      }
    ]
  },
  server: {
    port: 5173,
    strictPort: false
  }
});
