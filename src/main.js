import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'

import Home from './pages/Home.vue'
import Favorites from './pages/Favorites.vue'
import Login from './pages/Login.vue'
import Registration from './pages/Registration.vue'
import Profile from './pages/Profile.vue'
import axios from 'axios'

const app = createApp(App)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/favorites', name: 'Favorites', component: Favorites },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Registration', component: Registration },
  { path: '/profile', name: 'Profile', component: Profile }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
axios.defaults.withCredentials = true
app.use(router)
app.use(autoAnimatePlugin)

app.mount('#app')
