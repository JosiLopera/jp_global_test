import { createRouter, createWebHistory } from 'vue-router'
import Profiles from '../views/Profiles.vue'
import Jobs from '../views/Jobs.vue'

const routes = [
  {
    path: '/',
    name: 'Profiles',
    component: Profiles
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: Jobs
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
