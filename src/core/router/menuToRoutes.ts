import type { RouteRecordRaw, RouteComponent } from 'vue-router';
import type { MenuConfig, MenuTree } from '../menus';

/** 路由配置（宽松类型，便于构建） */
interface RouteConfig {
  path: string;
  name: string;
  component?: RouteComponent | (() => Promise<RouteComponent>);
  redirect?: string;
  children?: RouteConfig[];
  meta?: Record<string, any>;
}

/** 组件映射（filePath -> 组件） */
type ComponentMap = Record<string, any>;

/**
 * 将菜单树转换为路由配置
 * @param menuTree 菜单树
 * @param componentLoaders 组件加载器映射（filePath -> 动态导入函数）
 */
export function menuTreeToRoutes(
  menuTree: MenuTree[],
  componentMap: ComponentMap,
): RouteRecordRaw[] {
  return menuTree.map(menu => menuNodeToRoute(menu, componentMap)) as RouteRecordRaw[];
}

/**
 * 根据完整路径推断组件路径
 * 约定：/system/users → src/views/system/users/index.vue
 */
function inferFilePath(fullPath: string): string {
  const cleanPath = fullPath.replace(/^\//, ''); // 去掉开头的 /
  return `src/views/${cleanPath}/index.vue`;
}

/**
 * 单个菜单节点转换为路由
 */
function menuNodeToRoute(
  menu: MenuTree,
  componentMap: ComponentMap,
  parentPath: string = '',
): RouteConfig {
  const fullPath = parentPath ? `${parentPath}/${menu.routePath}` : `/${menu.routePath}`;

  const route: RouteConfig = {
    path: menu.routePath,
    name: menu.routeName,
    meta: {
      title: menu.title,
      needAuth: menu.needAuth,
      type: menu.menuType,
    },
  };

  // 目录类型：设置重定向
  if (menu.menuType === 'directory') {
    route.redirect = menu.redirect;
  }

  // 页面类型：设置组件
  if (menu.menuType === 'page') {
    const filePath = menu.filePath || inferFilePath(fullPath);
    if (componentMap[filePath]) {
      route.component = componentMap[filePath];
    }
  }

  // 递归处理子路由
  if (menu.children && menu.children.length > 0) {
    route.children = menu.children.map(child => menuNodeToRoute(child, componentMap, fullPath));
  }

  return route;
}

/**
 * 从菜单配置直接生成路由（组合函数）
 * @param menusConfig 菜单配置数组
 * @param menusConfigToMenusTree 菜单转树的函数
 * @param componentLoaders 组件加载器映射
 */
export function menuConfigToRoutes(
  menusConfig: MenuConfig[],
  menusConfigToMenusTree: (config: MenuConfig[]) => MenuTree[],
  componentMap: ComponentMap,
): RouteRecordRaw[] {
  const menuTree = menusConfigToMenusTree(menusConfig);
  return menuTreeToRoutes(menuTree, componentMap);
}
