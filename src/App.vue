<script setup lang="ts">
import { NConfigProvider } from 'naive-ui';
import { zhCN, dateZhCN } from 'naive-ui';
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" style="height: 100%; width: 100%">
    <router-view></router-view>
  </n-config-provider>
</template>
