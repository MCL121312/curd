import { describe, it, expect } from 'vitest';
import { useNav } from '.';

describe('导航菜单', () => {
  it('获取导航的全部菜单', () => {
    const { getMenus } = useNav();
    expect(getMenus()).toBeInstanceOf(Array);
  });

  it('判断是否需要授权', () => {
    const { allMenus, menuIsNeedAuth } = useNav();
    if (allMenus[0]) {
      expect(menuIsNeedAuth(allMenus[0])).toBe(true);
    }
  });

  it('根据title模糊搜索找到菜单', () => {
    const { findMenusByTitle } = useNav();
    // 类型是数组
    expect(findMenusByTitle('首')).toBeInstanceOf(Array);
    // 数组长度为1
    expect(findMenusByTitle('首').length).toBe(1);
  });
});
