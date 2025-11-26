<script setup lang="ts">
import { useLayoutMenus } from './useMenus';

defineOptions({
  name: 'Layout',
});

const {
  searchKeyword,
  menuOptions,
  selectedKey,
  expandedKeys,
  handleMenuSelect,
  handleExpandedKeysUpdate,
} = useLayoutMenus();
</script>

<template>
  <div class="layout">
    <div class="side">
      <!-- 搜索框 -->
      <div class="menu-search">
        <n-input v-model:value="searchKeyword" placeholder="搜索菜单..." clearable size="small" />
      </div>

      <!-- 菜单树 -->
      <div class="menu-tree">
        <n-menu
          :value="selectedKey"
          :options="menuOptions"
          :expanded-keys="expandedKeys"
          @update:value="handleMenuSelect"
          @update:expanded-keys="handleExpandedKeysUpdate"
        />
      </div>

      <!-- 用户信息 -->
    </div>
    <section class="main">
      <router-view></router-view>
    </section>
  </div>
</template>

<style scoped>
.layout {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'side main';
  overflow: hidden;
  box-sizing: border-box;
  gap: 10px;
  padding: 8px;
}

.layout .side {
  grid-area: side;
  width: 200px;
  height: 100%;
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.layout .main {
  grid-area: main;
  height: 100%;
  background-color: hsl(0, 0%, 96%);
  box-sizing: border-box;
  border-radius: 8px;
}

.menu-search {
  flex-shrink: 0;
}

.menu-tree {
  flex: 1;
  overflow-y: auto;
}
</style>
