<script>
import axios from 'axios'

export default {
  data() {
    return {
      username: '',
      errorMessage: ''
    }
  },
  async created() {
    try {
      const token = localStorage.getItem('refresh_token')
      if (!token) {
        throw new Error('Access token is missing')
      }

      const response = await axios.post(
        'http://127.0.0.1:8000/api/users/profile',
        {},
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        }
      )
      this.username = response.data
    } catch (error) {
      this.errorMessage = 'Ошибка при загрузке профиля'
      console.error('Error loading profile:', error.response ? error.response.data : error)
    }
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
    <div
      class="bg-white px-4 py-6 sm:px-8 sm:py-10 rounded-lg shadow-md w-full max-w-xs sm:max-w-md"
    >
      <h1 class="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Профиль пользователя</h1>
      <div v-if="username" class="text-center">
        <p class="text-base sm:text-lg">Имя пользователя: {{ username }}</p>
      </div>
      <div v-else class="text-center">
        <p class="text-base sm:text-lg">Загрузка...</p>
      </div>
      <p v-if="errorMessage" class="mt-4 text-red-500 text-center">{{ errorMessage }}</p>
    </div>
  </div>
</template>
