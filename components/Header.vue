<template>
  <header class="bg-blue-600 text-white p-4 shadow">
    <h1 class="text-xl font-bold">Crypto Chart App</h1>
    <nav class="mt-2 flex space-x-4">
      <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
      <NuxtLink to="/about" class="hover:underline">About</NuxtLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>