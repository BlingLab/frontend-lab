import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@workspace/ui/styles.css",
        replacement: fileURLToPath(new URL("../../packages/ui/src/styles.css", import.meta.url))
      },
      {
        find: "@workspace/tokens/tokens.css",
        replacement: fileURLToPath(new URL("../../packages/tokens/src/tokens.css", import.meta.url))
      },
      {
        find: "@workspace/ui",
        replacement: fileURLToPath(new URL("../../packages/ui/src/index.ts", import.meta.url))
      }
    ]
  },
  server: {
    port: 5173,
    strictPort: false
  }
});
