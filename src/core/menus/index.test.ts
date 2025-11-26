import { describe, it, expect } from 'vitest';
import { useMenus } from '@/core/menus';

describe('menus', () => {
  it('应该可以获取菜单配置', () => {
    const { menusConfig } = useMenus();
    expect(menusConfig).toBeInstanceOf(Array);
  });

  it('菜单配置应该包含正确的属性', () => {
    const { menusConfig } = useMenus();
    expect(menusConfig[0]).toHaveProperty('id');
    expect(menusConfig[0]).toHaveProperty('parentId');
    expect(menusConfig[0]).toHaveProperty('routeName');
    expect(menusConfig[0]).toHaveProperty('routePath');
    expect(menusConfig[0]).toHaveProperty('filePath');
    expect(menusConfig[0]).toHaveProperty('redirect');
    expect(menusConfig[0]).toHaveProperty('menuType');
    expect(menusConfig[0]).toHaveProperty('title');
    expect(menusConfig[0]).toHaveProperty('icon');
    expect(menusConfig[0]).toHaveProperty('showInMenu');
    expect(menusConfig[0]).toHaveProperty('needAuth');
    expect(menusConfig[0]).toHaveProperty('sort');
  });

  it('菜单可以转换成树形', () => {
    const { menusConfig, menusConfigToMenusTree } = useMenus();
    const tree = menusConfigToMenusTree(menusConfig);
    expect(tree).toBeInstanceOf(Array);
    expect(tree[0]).toHaveProperty('children');
  });
});
