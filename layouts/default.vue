<template>
  <div class="min-h-screen flex flex-col">
    <Header class="sticky top-0 z-50 bg-gray-800 text-white p-4 shadow" />
    <main class="flex-1 overflow-y-auto p-6 bg-gray-100">
      <NuxtPage />
    </main>

    <Footer class="bg-gray-800 text-white p-4 text-center text-sm" />
  </div>
</template>

<script setup lang="ts">
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
</script>
