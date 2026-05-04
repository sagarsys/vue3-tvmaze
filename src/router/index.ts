import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'), // lazy-loaded
    },
    {
      path: '/show/:id',
      name: 'show',
      component: () => import('@/views/ShowView.vue'),
      props: true, // maps params to props so ShowView stays easy to test and read
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/SearchView.vue'),
    },
  ],
});
