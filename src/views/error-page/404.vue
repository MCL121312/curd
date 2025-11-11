<script lang="ts" setup>
defineOptions({
  name: 'NotFound',
});
</script>
<template>
  <div class="error-page-not-found">找不到页面</div>
</template>
<style scoped>
.error-page-not-found {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16rem;
  font-weight: 600;
  color: #3d3d3d;
}
</style>
