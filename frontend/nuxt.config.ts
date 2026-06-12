// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",

    css: ["~/assets/css/main.css"],

    runtimeConfig: {
        public: {
            wpApiBaseUrl: process.env.NUXT_PUBLIC_WP_API_BASE_URL,
        },
    },
});
