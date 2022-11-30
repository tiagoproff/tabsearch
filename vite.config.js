import { defineConfig } from "vite";

import cssnano from "cssnano";
import purgecss from "@fullhuman/postcss-purgecss";
import { ViteMinifyPlugin } from "vite-plugin-minify";

const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        purgecss({
          content: ["./*.html", "./dist/*.html"],
        }),
        cssnano({
          preset: "default",
        }),
      ],
    },
  },
  build: {
    minify: isProd,
  },
  plugins: [
    ViteMinifyPlugin({
      collapseWhitespace: true,
    }),
  ],
});
