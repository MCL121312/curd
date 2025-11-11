export type NavMenuType = 'directory' | 'page' | 'inside';
export interface MenuConfig {
  id: number; // 菜单唯一标识（权限用）
  parentId: number; // 菜单层级（仅菜单用）
  routePath: string; // 路由路径（菜单和路由共享）
  routeName: string; // 路由名称（菜单和路由共享）
  title: string; // 菜单标题/页面标题（共享）
  menuType: MenuConfigType; // 菜单类型（目录/页面，仅菜单用）
  icon?: string; // 菜单图标（仅菜单用，showInMenu=true时生效）
  filePath: string; // 路由组件路径（仅路由用）
  showInMenu: boolean; // 是否在菜单中显示
  needAuth: boolean; // 是否需要鉴权
  redirect?: string; // 路由重定向（仅路由用，如目录默认跳转第一个子路由）
  sort: number; // 排序
}
export type MenuConfigType = 'directory' | 'page' | 'inside';

export interface MenuTree extends MenuConfig {
  children: MenuTree[];
}

export const useMenus = () => {
  const menusConfig: MenuConfig[] = [
    {
      id: 1,
      parentId: 0,
      routeName: 'home',
      routePath: '/home',
      filePath: 'src/views/home/index.vue',
      redirect: '',
      menuType: 'page',
      title: '首页',
      icon: '',
      showInMenu: true,
      needAuth: true,
      sort: 1,
    },
    {
      id: 2,
      parentId: 0,
      routeName: 'system',
      routePath: '/system',
      filePath: '',
      redirect: 'user',
      menuType: 'directory',
      title: '系统管理',
      icon: '',
      showInMenu: true,
      needAuth: true,
      sort: 2,
    },
    {
      id: 3,
      parentId: 2,
      routeName: 'users',
      routePath: '/system/user',
      filePath: 'src/views/system/users/index.vue',
      redirect: '',
      menuType: 'page',
      title: '用户管理',
      icon: '',
      showInMenu: true,
      needAuth: true,
      sort: 1,
    },
  ];

  function menusConfigToMenusTree(_menusConfig: MenuConfig[]): MenuTree[] {
    const treeMenus: MenuTree[] = [];
    const map = new Map<number, MenuTree>();

    // 第一次遍历：创建所有节点
    _menusConfig.forEach(menu => {
      map.set(menu.id, { ...menu, children: [] });
    });

    // 第二次遍历：构建树结构
    _menusConfig.forEach(menu => {
      const node = map.get(menu.id)!;
      const parent = map.get(menu.parentId);

      if (parent && parent.children) {
        parent.children.push(node);
      } else {
        treeMenus.push(node);
      }
    });

    return treeMenus;
  }

  const isDirectory = (type: MenuConfigType) => {
    return type == 'directory';
  };
  const isPage = (type: MenuConfigType) => {
    return type == 'page';
  };
  const isInside = (type: MenuConfigType) => {
    return type == 'inside';
  };

  return {
    menusConfig,

    menusConfigToMenusTree,

    isDirectory,
    isPage,
    isInside,
  };
};
