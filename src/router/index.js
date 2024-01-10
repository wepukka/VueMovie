import { createRouter, createWebHistory } from 'vue-router'
import AddMovie from '../views/AddMovie.vue'
import MovieTable from '../components/MovieTable.vue'
import MovieView from '../views/MovieView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MovieTable
    },
    {
      path: '/contribute',
      name: 'contribute',
      component: AddMovie
    },
    {
      path: '/movies/:id',
      name: 'movie',
      component: MovieView
    }
  ]
})

export default router
