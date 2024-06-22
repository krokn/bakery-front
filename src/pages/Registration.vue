<script>
import axios from 'axios'

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    async register() {
      this.errorMessage = '' // Сброс сообщения об ошибке перед новым запросом
      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/api/users/register/',
          {
            name: this.username,
            password: this.password
          },
          {
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json'
            }
          }
        )
        console.log('User registered:', response.data)
        this.$router.push('/login')
      } catch (error) {
        this.errorMessage = 'Пользователь уже существует. Пожалуйста, выберите другой никнейм.'
        console.error('Error registering user:', error)
      }
    }
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
    <div
      class="bg-white px-6 py-8 sm:px-12 sm:py-16 rounded-lg shadow-md w-full max-w-xs sm:max-w-md"
    >
      <h1 class="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center">Регистрация</h1>
      <form @submit.prevent="register" class="flex flex-col space-y-4 sm:space-y-8">
        <input v-model="username" placeholder="Username" required class="p-3 border rounded" />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
          class="p-3 border rounded"
        />
        <button type="submit" class="p-3 bg-blue-500 text-white rounded">Зарегистрироваться</button>
      </form>
      <p v-if="errorMessage" class="mt-4 text-red-500">{{ errorMessage }}</p>
    </div>
  </div>
</template>
