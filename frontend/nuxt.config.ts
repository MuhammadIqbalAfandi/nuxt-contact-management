// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@vueuse/nuxt"],
  alias: {
    "@lib": resolve(__dirname, "./lib"),
    "@models": resolve(__dirname, "./models"),
  },
  devServer: {
    port: 3001,
  },
  runtimeConfig: {
    public: {
      apiBase: "",
    },
  },
  css: ["@/assets/css/main.css"],
  app: {
    head: {
      title: "Vue Contact Management",
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
          rel: "stylesheet",
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
        },
      ],
      script: [{ src: "https://cdn.tailwindcss.com", defer: true }],
    },
  },
});
