import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '../layout/index.vue';
import HomePage from '../views/home/index.vue';

const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: HomePage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
