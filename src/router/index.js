import { createRouter, createWebHistory } from 'vue-router'
import AddView from '../views/AddView.vue'
import MovieView from '../views/MovieView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/contribute',
      name: 'contribute',
      component: AddView
    },
    {
      path: '/movies/:id',
      name: 'movie',
      component: MovieView
    }
  ]
})

export default router
