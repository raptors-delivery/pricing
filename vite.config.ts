import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Use mode instead of command
  const config = {
    base: mode === "production" ? "/pricing/" : "/", // Set base based on mode
    plugins: [
      react(),
      babel({
        filter: /\.[jt]sx?$/,
        babelConfig: {
          presets: ["@babel/preset-typescript"], // if you use TypeScript
          plugins: [["babel-plugin-react-compiler"]],
        },
      }),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes("node_modules")) {
              if (id.includes("react-dom") || id.includes("react")) {
                return "vendor-react";
              }
              if (id.includes("html2canvas")) {
                return "vendor-html2canvas";
              }
              if (id.includes("jspdf")) {
                // Add rule for jspdf
                return "vendor-jspdf";
              }
              if (id.includes("lucide-react")) {
                // Add rule for lucide-react
                return "vendor-lucide";
              }
              // Remove the generic vendor chunk
              // return "vendor";
            }
          },
        },
      },
    },
    server: {
      port: 5173,
      host: true,
    },
  };

  return config;
});
