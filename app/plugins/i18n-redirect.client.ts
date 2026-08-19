export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:mounted", () => {
    const route = useRoute();

    // Only redirect if user landed on the root page '/'
    if (route.path !== "/") {
      return;
    }

    const cookie = useCookie<string | null>("i18n_redirected");

    let targetLocale = cookie.value;

    // If no cookie preference is set, detect from browser language
    if (!targetLocale) {
      const isZh =
        navigator.languages?.some((lang) =>
          lang.toLowerCase().startsWith("zh"),
        ) || navigator.language?.toLowerCase().startsWith("zh");

      if (isZh) {
        targetLocale = "zh";
      }
    }

    if (targetLocale === "zh") {
      cookie.value = "zh";
      navigateTo(
        {
          path: "/zh",
          query: route.query,
          hash: route.hash,
        },
        { replace: true },
      );
    }
  });
});
