/** 菜单配置基础字段 */
interface MenuConfigBase {
  id: number; // 菜单唯一标识（权限用）
  parentId: number; // 父级菜单 ID（0 表示根级）
  level: number; // 菜单层级（0 为根级，1 为二级...）
  routePath: string; // 路由路径（相对路径）
  routeName: string; // 路由名称
  title: string; // 菜单标题/页面标题
  icon?: string; // 菜单图标
  showInMenu: boolean; // 是否在菜单中显示
  needAuth: boolean; // 是否需要鉴权
  sort: number; // 排序
}

/** 目录类型菜单 - 用于分组，不需要组件 */
export interface DirectoryMenuConfig extends MenuConfigBase {
  menuType: 'directory';
  redirect: string; // 重定向到子路由
}

/** 页面类型菜单 - 需要组件 */
export interface PageMenuConfig extends MenuConfigBase {
  menuType: 'page';
  filePath?: string; // 组件路径（可选，不填则按约定推断）
}

/** 菜单配置联合类型 */
export type MenuConfig = DirectoryMenuConfig | PageMenuConfig;

/** 菜单类型 */
export type MenuConfigType = MenuConfig['menuType'];

/** 菜单树节点 */
export type MenuTree = MenuConfig & {
  children: MenuTree[];
};

export const useMenus = () => {
  const menusConfig: MenuConfig[] = [
    {
      id: 1,
      parentId: 0,
      level: 0,
      routeName: 'home',
      routePath: 'home',
      menuType: 'page',
      title: '首页',
      showInMenu: true,
      needAuth: true,
      sort: 1,
    },
    {
      id: 2,
      parentId: 0,
      level: 0,
      routeName: 'system',
      routePath: 'system',
      menuType: 'directory',
      redirect: 'users',
      title: '系统管理',
      showInMenu: true,
      needAuth: true,
      sort: 2,
    },
    {
      id: 3,
      parentId: 2,
      level: 1,
      routeName: 'users',
      routePath: 'users',
      menuType: 'page',
      title: '用户管理',
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

  return {
    menusConfig,

    menusConfigToMenusTree,

    isDirectory,
    isPage,
  };
};
