interface NavMenu {
  id: number;
  parentId: number;
  title: string;
  path: string;
  icon: string;
  type: NavMenuType;
  needAuth: boolean;
}

export type NavMenuType = 'directory' | 'page' | 'inside';

const baseMenus: NavMenu[] = [
  {
    id: 1,
    parentId: 0,
    title: '首页',
    path: '/home',
    icon: '',
    type: 'page',
    needAuth: true,
  },
] as const;

const dynamicMenus: NavMenu[] = [
  {
    id: 2,
    parentId: 0,
    title: '系统管理',
    path: '',
    icon: '',
    type: 'directory',
    needAuth: true,
  },
] as const;

export const useNav = () => {
  const allMenus = [...baseMenus, ...dynamicMenus];

  function getMenus() {
    return;
  }

  function menuIsNeedAuth(navMenu: NavMenu): boolean {
    return navMenu.needAuth;
  }

  function findMenusByTitle(title: NavMenu['title']): NavMenu[] {
    return allMenus.filter(menu => menu.title.includes(title));
  }

  return {
    allMenus,

    getMenus,

    menuIsNeedAuth,
    findMenusByTitle,
  };
};
