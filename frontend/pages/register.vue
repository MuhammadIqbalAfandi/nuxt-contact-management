<script setup lang="ts">
import { FetchError } from "ofetch";
import { reactive } from "vue";
import { alertError, alertSuccess } from "@lib/utils/alert";
import { userRegister } from "@lib/api/UserApi";

const user = reactive({
  username: "",
  name: "",
  password: "",
  confirmPassword: "",
});

const handleSubmit = async () => {
  if (user.password !== user.confirmPassword) {
    await alertError("Passwords do not match!");
    return;
  }

  try {
    await userRegister({
      username: user.username,
      password: user.password,
      name: user.name,
    });

    await alertSuccess("User registered successfully!");

    await navigateTo("/login");
  } catch (e) {
    const error = e as FetchError;
    await alertError(
      error.data.errors || "Registration failed. Please try again."
    );
  }
};
</script>

<template>
  <div
    class="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen flex items-center justify-center p-4"
  >
    <div
      class="animate-fade-in bg-gray-800 bg-opacity-80 p-8 rounded-xl shadow-custom border border-gray-700 backdrop-blur-sm w-full max-w-md"
    >
      <div class="text-center mb-8">
        <div class="inline-block p-3 bg-gradient rounded-full mb-4">
          <i class="fas fa-user-plus text-3xl text-white"></i>
        </div>
        <h1 class="text-3xl font-bold text-white">Contact Management</h1>
        <p class="text-gray-300 mt-2">Create a new account</p>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label
            for="username"
            class="block text-gray-300 text-sm font-medium mb-2"
            >Username</label
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <i class="fas fa-user text-gray-500"></i>
            </div>
            <input
              type="text"
              id="username"
              name="username"
              class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Choose a username"
              required
              v-model="user.username"
            />
          </div>
        </div>

        <div class="mb-4">
          <label for="name" class="block text-gray-300 text-sm font-medium mb-2"
            >Full Name</label
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <i class="fas fa-id-card text-gray-500"></i>
            </div>
            <input
              type="text"
              id="name"
              name="name"
              class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Enter your full name"
              required
              v-model="user.name"
            />
          </div>
        </div>

        <div class="mb-4">
          <label
            for="password"
            class="block text-gray-300 text-sm font-medium mb-2"
            >Password</label
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <i class="fas fa-lock text-gray-500"></i>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Create a password"
              required
              v-model="user.password"
            />
          </div>
        </div>

        <div class="mb-6">
          <label
            for="confirm_password"
            class="block text-gray-300 text-sm font-medium mb-2"
            >Confirm Password</label
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <i class="fas fa-check-double text-gray-500"></i>
            </div>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Confirm your password"
              required
              v-model="user.confirmPassword"
            />
          </div>
        </div>

        <div class="mb-6">
          <button
            type="submit"
            class="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5"
          >
            <i class="fas fa-user-plus mr-2"></i> Register
          </button>
        </div>

        <div class="text-center text-sm text-gray-400">
          Already have an account?
          <NuxtLink
            to="/login"
            class="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
          >
            Sign in
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>
