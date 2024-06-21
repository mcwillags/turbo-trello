import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  resolve: {
    alias: {
      "~components": path.resolve(__dirname, "src/components"),
      "~constants": path.resolve(__dirname, "src/constants"),
      "~features": path.resolve(__dirname, "src/features"),
      "~router": path.resolve(__dirname, "src/router"),
      "~assets": path.resolve(__dirname, "src/assets"),
      "~pages": path.resolve(__dirname, "src/pages"),
      "~types": path.resolve(__dirname, "src/types"),
      "~utils": path.resolve(__dirname, "src/utils"),
      "~core": path.resolve(__dirname, "src/core"),
    },
  },
});
