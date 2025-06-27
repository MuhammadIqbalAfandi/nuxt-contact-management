export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path.startsWith("/dashboard")) {
    to.meta.layout = "dashboard";
  }
});
