<script setup>
defineProps({
  title: String,
  description: String,
  imageUrl: String
})
</script>

<template>
  <div
    class="flex flex-col items-center text-center w-full max-w-xs mx-auto md:max-w-sm lg:max-w-md"
  >
    <img class="w-20 h-20" :src="imageUrl" alt="Info image" />
    <h2 class="mt-4 text-2xl font-medium">{{ title }}</h2>
    <p class="text-gray-400 mt-2">{{ description }}</p>
  </div>
</template>
