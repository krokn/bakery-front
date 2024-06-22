<script setup>
import axios from 'axios'
import { ref, computed, inject } from 'vue'
import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
import InfoBlock from './InfoBlock.vue'

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number
})

const { cart, closeDrawer, updateItemCount, removeFromCart } = inject('cart')

const isCreating = ref(false)
const order = ref(null)
order.value = false

const createOrder = async () => {
  if (isCreating.value) return

  try {
    isCreating.value = true
    console.log('Отправка данных:', cart.value)
    const token = localStorage.getItem('refresh_token')
    if (!token) {
      throw new Error('Access token is missing')
    }
    const { data } = await axios.post(
      `http://127.0.0.1:8000/api/orders/`,
      {
        items: cart.value,
        totalPrice: props.totalPrice
      },
      {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    )
    order.value = true
    cart.value = []
  } catch (err) {
    console.log(err)
  } finally {
    isCreating.value = false
  }
}

const cartIsEmpty = computed(() => cart.value.length === 0)
const buttonDisabled = computed(() => isCreating.value || cartIsEmpty.value)
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="bg-white w-full max-w-md h-full fixed right-0 top-0 z-20 p-6 md:p-8 flex flex-col">
    <DrawerHead @close="closeDrawer" />

    <div v-if="!totalPrice || order" class="flex-grow flex items-center justify-center text-center">
      <InfoBlock
        v-if="!totalPrice && !order"
        title="Корзина пустая"
        description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
        image-url="/package-icon.png"
      />
      <InfoBlock
        v-if="order"
        title="Заказ оформлен!"
        :description="`Ваш заказ скоро будет передан курьерской доставке`"
        image-url="/order-success-icon.png"
      />
    </div>

    <div v-else class="flex-grow overflow-y-auto">
      <CartItemList :items="cart" @updateCount="updateItemCount" @removeItem="removeFromCart" />
    </div>

    <div v-if="totalPrice" class="flex flex-col gap-4 mt-7">
      <div class="flex gap-2">
        <span>Итого:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ totalPrice }} ₽</b>
      </div>

      <button
        :disabled="buttonDisabled"
        @click="createOrder"
        class="mt-4 transition bg-lime-500 w-full rounded-xl py-3 text-white disabled:bg-slate-300 hover:bg-lime-600 active:bg-lime-700 cursor-pointer but"
      >
        Оформить заказ
      </button>
    </div>
  </div>
</template>

<style>
.but {
  background-color: rgb(139, 109, 92);
}
</style>
