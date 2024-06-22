<script setup>
defineProps({
  totalPrice: Number
})

const emit = defineEmits(['openDrawer'])
</script>

<template>
  <header
    class="flex flex-col md:flex-row justify-between items-center border-b border-slate-200 px-4 py-4 md:px-10 md:py-8"
  >
    <router-link to="/" class="flex items-center gap-4 mb-4 md:mb-0">
      <img src="/logo.png" alt="Logo" class="w-10 h-10" />
      <div>
        <h2 class="text-base md:text-lg font-bold uppercase">Кондитерский цех Изюминка</h2>
        <p class="text-slate-400 text-sm">Магазин лучшей выпечки</p>
      </div>
    </router-link>

    <ul class="flex flex-col md:flex-row items-center gap-4 md:gap-10">
      <li
        @click="() => emit('openDrawer')"
        class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black"
      >
        <img src="/cart.svg" alt="Cart" class="w-6 h-6" />
        <b>{{ totalPrice }} руб.</b>
      </li>

      <router-link
        to="/profile"
        class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black"
      >
        <li class="flex items-center">
          <img src="/profile.svg" alt="Profile" class="w-6 h-6 mr-3" />
          <span>Профиль</span>
        </li>
      </router-link>
    </ul>
  </header>
</template>
