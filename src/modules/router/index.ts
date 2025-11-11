import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';
import HomePage from '@/views/home/index.vue';
import ErrorPage from '@/views/error-page/404.vue';
import LoginPage from '@/views/login/index.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    component: Layout,
    redirect: 'login',
    meta: { needAuth: false, title: '', type: 'directory' },
    children: [
      {
        path: '/home',
        name: 'home',
        component: HomePage,
        meta: { needAuth: true, title: '首页', type: 'page' },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: { needAuth: false, title: '登录', type: 'page' },
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: ErrorPage,
    meta: { needAuth: false, title: 'notFound', type: 'page' },
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

router.beforeEach((to, from) => {
  console.log('to', to);
  console.log('from', from);
  return true;
});
