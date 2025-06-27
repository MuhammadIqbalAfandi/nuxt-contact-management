import { useLocalStorage } from "@vueuse/core";

const publicPages = ["/login", "/register"];

export default defineNuxtRouteMiddleware((to, from) => {
  const token = useLocalStorage("token", "");

  // If the user is not logged in and tries to access a non-public page.
  if (!token.value && !publicPages.includes(to.path)) {
    return navigateTo("/login");
  }

  // If the user is already logged in and tries to access the login, register, or similar pages — redirect them to the dashboard.
  if (token.value && publicPages.includes(to.path)) {
    return navigateTo("/dashboard/contacts");
  }
});
