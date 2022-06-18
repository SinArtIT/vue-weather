import MainPage from "@/pages/MainPage.vue";
import CitiesPage from "@/pages/CitiesPage.vue";
import CityPage from "@/pages/CityPage.vue";
import FavoritesPage from '@/pages/FavoritesPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: '/',
    component: MainPage,
  },
  {
    path: '/cities',
    component: CitiesPage,
  },
  {
    path: '/city',
    component: CityPage,
  },
  {
    path: '/favorites',
    component: FavoritesPage,
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundPage,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;