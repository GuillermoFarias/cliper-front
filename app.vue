<script setup>
import { useConfigStore } from "~/store/config";

const darkTheme = "/themes/lara-dark-blue/theme.css";
const lightTheme = "/themes/bootstrap4-light-blue/theme.css";
const configStore = useConfigStore();
const isDark = useState("isDark", () => configStore.isDark);

useHead({
  title: "Cliper",
  meta: [
    {
      name: "description",
      content:
        "Cliper is short url generator that allows you to create short links for your long URLs.",
    },
  ],
  script: [{ innerHTML: "console.log('Hola! ¿Qué haces aquí 👀?')" }],
  link: [
    {
      id: "theme-link",
      rel: "stylesheet",
      href: () => (isDark.value ? darkTheme : lightTheme),
    },
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/gh/dheereshagrwal/colored-icons@1.7.3/src/app/ci.min.css",
    },
  ],
});


</script>
<template>
  <NuxtPage />
</template>