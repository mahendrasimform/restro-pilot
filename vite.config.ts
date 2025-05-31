import { defineConfig, loadEnv } from "vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  // Load environment variables from .env file
  return {
    plugins: [
      react(),
      sentryVitePlugin({
        org: "simform-up",
        project: "restro-pilot",
        authToken: env.VITE_APP_SENTRY_AUTH_TOKEN,
      }),
    ],

    // additional configuration for absolute path
    resolve: {
      alias: {
        src: "/src",
      },
    },

    build: {
      sourcemap: true,
    },
  };
});
