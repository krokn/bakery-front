<script setup>
defineProps({
  id: Number,
  name: String,
  price: Number,
  imageUrl: String,
  isAdded: Boolean,
  onClickFavorite: Function,
  onClickAdd: Function
})
</script>

<template>
  <div
    class="relative bg-white border border-slate-100 rounded-lg p-4 md:p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
  >
    <img :src="imageUrl" alt="cookie" class="w-full rounded-lg" />

    <p class="mt-2 text-sm md:text-base">{{ name }}</p>

    <div class="flex justify-between items-center mt-2 md:mt-4">
      <div class="flex flex-col">
        <span class="text-sm text-slate-400">Цена:</span>
        <b class="text-base">{{ price }} руб.</b>
      </div>

      <img
        v-if="onClickAdd"
        @click="onClickAdd"
        :src="!isAdded ? '/plus.svg' : '/checked.svg'"
        alt="Plus"
        class="w-6 h-6 md:w-8 md:h-8"
      />
    </div>
  </div>
</template>
