export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) {
    return;
  }

  if (to.path === "/zh/") {
    return navigateTo(
      {
        path: "/zh",
        query: to.query,
        hash: to.hash,
      },
      { replace: true },
    );
  }

  if (to.path !== "/") {
    return;
  }

  const redirectedLocale = useCookie<string | null>("i18n_redirected");
  const preferredLocale =
    redirectedLocale.value
    ?? (navigator.languages?.some((language) => language.toLowerCase().startsWith("zh")) ? "zh" : null);

  if (preferredLocale !== "zh") {
    return;
  }

  return navigateTo(
    {
      path: "/zh",
      query: to.query,
      hash: to.hash,
    },
    { replace: true },
  );
});
