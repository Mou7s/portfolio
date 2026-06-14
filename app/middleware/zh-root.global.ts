export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) {
    return;
  }

  if (to.path !== "/zh") {
    return;
  }

  return navigateTo(
    {
      path: "/zh/",
      query: to.query,
      hash: to.hash,
    },
    { replace: true },
  );
});
