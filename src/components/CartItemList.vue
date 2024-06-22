<script setup>
import CartItem from './CartItem.vue'

const props = defineProps({
  items: Array
})

const emit = defineEmits(['updateCount', 'removeItem'])
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <CartItem
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :name="item.name"
      :price="item.price"
      :imageUrl="item.imageUrl"
      :count="item.count"
      @updateCount="emit('updateCount', $event)"
      @onClickRemove="emit('removeItem', item)"
    />
  </div>
</template>
