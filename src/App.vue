<script setup>
import { ref, provide, watch, computed, onMounted } from 'vue'
import Cookies from 'js-cookie'
import { useRoute, useRouter } from 'vue-router'

import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

/* Корзина (START) */
const cart = ref([])
const drawerOpen = ref(false)

const totalPrice = computed(() =>
  cart.value.reduce((acc, item) => acc + item.price * item.count, 0)
)

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const addToCart = (item) => {
  const cartItem = cart.value.find((cartItem) => cartItem.id === item.id)
  item.isAdded = true
  if (cartItem) {
    cartItem.count++
  } else {
    cart.value.push({ ...item, count: 1 })
  }
}

const removeFromCart = (item) => {
  cart.value = cart.value.filter((cartItem) => cartItem.id !== item.id)
  item.isAdded = false
}

const updateItemCount = ({ id, amount }) => {
  const cartItem = cart.value.find((cartItem) => cartItem.id === id)
  if (cartItem) {
    cartItem.count += amount
    if (cartItem.count <= 0) {
      removeFromCart(cart)
      cart.value = cart.value.filter((cartItem) => cartItem.id !== id)
    }
  }
}

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart,
  updateItemCount
})
/* Корзина (END) */

const route = useRoute()
const router = useRouter()
const hideHeader = computed(() => ['/register', '/login'].includes(route.path))

onMounted(() => {
  const refreshToken = Cookies.get('refresh_token')
  if (!refreshToken && !['/register', '/login'].includes(route.path)) {
    router.push('/login')
  }
})
</script>

<template>
  <Drawer v-if="drawerOpen" :total-price="totalPrice" :vat-price="vatPrice" @close="closeDrawer" />
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header v-if="!hideHeader" :total-price="totalPrice" @open-drawer="openDrawer" />
    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>
