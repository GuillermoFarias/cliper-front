import { defineStore } from "pinia";

export const useConfigStore = defineStore("configStore", {
  state: () => ({
    isDark: true,
    lang: "es",
  }),
  getters: {
    getDarkMode() {
      return this.isDark;
    },
    getLang() {
      return this.lang;
    },
  },
  actions: {
    setIsDark(isDark) {
      this.isDark = isDark;
    },
    setLang(lang) {
      this.lang = lang;
    },
  },
  persist: true,
});
