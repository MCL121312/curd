<script setup lang="ts">
defineOptions({
  name: 'Layout',
});
</script>

<template>
  <div class="layout">
    <div class="side">side</div>
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
  .side {
    grid-area: side;
    width: 200px;
    height: 100%;
    background-color: #f0f0f0;
    border-radius: 8px;
    padding: 8px;
  }
  .main {
    grid-area: main;
    height: 100%;
    background-color: hsl(0, 0%, 96%);
    box-sizing: border-box;
    border-radius: 8px;
  }
}
</style>
