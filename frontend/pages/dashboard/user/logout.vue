<script setup lang="ts">
import { userLogout } from "@lib/api/UserApi";
import { FetchError } from "ofetch";
import { useLocalStorage } from "@vueuse/core";
import { onBeforeMount } from "vue";
import { alertError } from "@lib/utils/alert";

const token = useLocalStorage("token", "");

const handleLogout = async () => {
  try {
    await userLogout(token.value);

    token.value = ""; // Clear the token on logout

    navigateTo("/login");
  } catch (e) {
    const error = e as FetchError;
    await alertError(error.data.errors || "Failed to logout");
  }
};

onBeforeMount(async () => {
  await handleLogout();
});
</script>

<template></template>
