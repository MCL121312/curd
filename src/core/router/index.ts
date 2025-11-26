import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';
import ErrorPage from '@/views/error-page/404.vue';
import LoginPage from '@/views/login/index.vue';
import { useMenus } from '../menus';
import { menuConfigToRoutes } from './menuToRoutes';

// 使用 import.meta.glob 预加载所有页面组件（eager: true 同步加载）
const viewModules = import.meta.glob('/src/views/**/*.vue', { eager: true });

// 转换为 filePath -> Component 映射
const componentMap: Record<string, any> = {};
for (const path in viewModules) {
  // 将 /src/views/xxx.vue 转换为 src/views/xxx.vue
  const filePath = path.replace(/^\//, '');
  componentMap[filePath] = (viewModules[path] as any).default;
}

// 从菜单配置生成动态路由
const { menusConfig, menusConfigToMenusTree } = useMenus();
const dynamicRoutes = menuConfigToRoutes(menusConfig, menusConfigToMenusTree, componentMap);

// 静态路由（不在菜单中的特殊页面）
const staticRoutes: RouteRecordRaw[] = [
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

// 完整路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    component: Layout,
    redirect: '/home',
    meta: { needAuth: false, title: '', type: 'directory' },
    children: dynamicRoutes,
  },
  ...staticRoutes,
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
