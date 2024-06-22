<script>
import axios from 'axios'
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/api/users/signin',
          {
            name: this.username,
            password: this.password
          },
          {
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json'
            },
            withCredentials: true
          }
        )

        if (response.data) {
          const refreshToken = response.data
          localStorage.setItem('refresh_token', refreshToken)
          Cookies.set('refresh_token', refreshToken, { expires: 6000 })
          this.$emit('authenticated')
          this.$router.push('/')
        } else {
          throw new Error('Refresh token is missing in the response')
        }
      } catch (e) {
        alert('Login failed: ' + e.message)
      }
    },
    goToRegister() {
      this.$router.push('/register')
    }
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
    <div
      class="bg-white px-4 py-6 sm:px-8 sm:py-10 rounded-lg shadow-md w-full max-w-xs sm:max-w-md lg:w-96"
    >
      <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-center">Вход</h1>
      <form @submit.prevent="login" class="flex flex-col space-y-4">
        <input v-model="username" placeholder="Username" required class="p-3 border rounded" />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
          class="p-3 border rounded"
        />
        <button type="submit" class="p-3 bg-blue-500 text-white rounded">Войти</button>
      </form>
      <div class="mt-6 sm:mt-8 text-center">
        <p>
          У вас ещё нет аккаунта?
          <router-link to="/register" class="text-blue-500">Зарегистрироваться</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
