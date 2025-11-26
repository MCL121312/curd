import { useMenus as useMenusConfig, type MenuTree } from '@/core/menus';
import { useRouter, useRoute } from 'vue-router';
import type { MenuOption } from 'naive-ui';
import { ref, computed, watch } from 'vue';

export function useLayoutMenus() {
  const router = useRouter();
  const route = useRoute();
  const { menusConfig, menusConfigToMenusTree, isDirectory } = useMenusConfig();

  // 搜索关键词
  const searchKeyword = ref('');

  // 只显示 showInMenu = true 的菜单（扁平）
  const visibleMenus = computed(() => menusConfig.filter(menu => menu.showInMenu));

  // 根据关键词过滤菜单（扁平）
  const filteredMenus = computed(() => {
    const keyword = searchKeyword.value.trim().toLowerCase();
    if (!keyword) return visibleMenus.value;

    // 找出匹配的菜单及其父级
    const matchedIds = new Set<number>();
    for (const menu of visibleMenus.value) {
      if (menu.title.toLowerCase().includes(keyword)) {
        matchedIds.add(menu.id);
        // 添加所有父级
        let parentId = menu.parentId;
        while (parentId !== 0) {
          matchedIds.add(parentId);
          const parent = visibleMenus.value.find(m => m.id === parentId);
          parentId = parent?.parentId ?? 0;
        }
      }
    }

    return visibleMenus.value.filter(menu => matchedIds.has(menu.id));
  });

  // 构建 id -> fullPath 映射（基于扁平数据，按 level 排序确保父级先处理）
  const idToFullPath = computed(() => {
    const map = new Map<number, string>();
    const sorted = [...visibleMenus.value].sort((a, b) => a.level - b.level);

    for (const menu of sorted) {
      const parentPath = map.get(menu.parentId) ?? '';
      map.set(menu.id, `${parentPath}/${menu.routePath}`);
    }
    return map;
  });

  // 转为树形结构用于渲染
  const menuTree = computed(() => menusConfigToMenusTree(filteredMenus.value));

  // 转换为 naive-ui 菜单选项格式
  function convertToMenuOptions(tree: MenuTree[]): MenuOption[] {
    return tree.map(node => {
      const option: MenuOption = {
        key: idToFullPath.value.get(node.id) ?? '',
        label: node.title,
      };

      if (isDirectory(node.menuType) && node.children.length > 0) {
        option.children = convertToMenuOptions(node.children);
      }

      return option;
    });
  }

  // naive-ui 菜单选项
  const menuOptions = computed(() => convertToMenuOptions(menuTree.value));

  // 当前选中的菜单项
  const selectedKey = computed(() => route.path);

  // 根据 fullPath 获取父级的 fullPath
  function getParentFullPath(fullPath: string): string | null {
    const menu = visibleMenus.value.find(m => idToFullPath.value.get(m.id) === fullPath);
    if (!menu || menu.parentId === 0) return null;
    return idToFullPath.value.get(menu.parentId) ?? null;
  }

  // 展开的菜单项
  const expandedKeys = ref<string[]>([]);

  // 监听路由变化，自动展开父级菜单
  watch(
    () => route.path,
    newPath => {
      const parentPath = getParentFullPath(newPath);
      if (parentPath && !expandedKeys.value.includes(parentPath)) {
        expandedKeys.value.push(parentPath);
      }
    },
    { immediate: true },
  );

  // 处理菜单选择
  function handleMenuSelect(key: string) {
    router.push(key);
  }

  // 处理展开状态变化
  function handleExpandedKeysUpdate(keys: string[]) {
    expandedKeys.value = keys;
  }

  return {
    searchKeyword,
    menuOptions,
    selectedKey,
    expandedKeys,
    handleMenuSelect,
    handleExpandedKeysUpdate,
  };
}
