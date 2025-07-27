import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  css: ['./css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
