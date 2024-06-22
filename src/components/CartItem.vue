<script setup>
import { defineEmits, defineProps } from 'vue'

const emit = defineEmits(['onClickRemove', 'updateCount'])

const props = defineProps({
  id: Number,
  name: String,
  price: Number,
  imageUrl: String,
  count: Number
})

const increaseCount = () => {
  emit('updateCount', { id: props.id, amount: 1 })
}

const decreaseCount = () => {
  if (props.count > 0) {
    emit('updateCount', { id: props.id, amount: -1 })
  }
}
</script>

<template>
  <div class="flex flex-row items-center border border-slate-200 p-4 rounded-xl gap-4">
    <img class="w-16 h-16 md:w-24 md:h-24 rounded-lg" :src="imageUrl" :alt="title" />

    <div class="flex flex-col flex-1">
      <p class="text-sm md:text-base">{{ name }}</p>

      <div class="flex items-center justify-between mt-2 flex-wrap w-full">
        <b class="text-sm md:text-base mb-2 md:mb-0 md:mr-2">{{ price }} руб.</b>
        <div class="flex items-center gap-2">
          <button
            @click="increaseCount"
            class="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-md flex items-center justify-center"
          >
            +
          </button>
          <b class="text-sm md:text-base">{{ count }}</b>
          <button
            @click="decreaseCount"
            class="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-md flex items-center justify-center"
          >
            -
          </button>
        </div>
        <img
          @click="$emit('onClickRemove')"
          class="w-6 h-6 opacity-40 hover:opacity-100 cursor-pointer transition ml-4 md:ml-0"
          src="/close.svg"
        />
      </div>
    </div>
  </div>
</template>
