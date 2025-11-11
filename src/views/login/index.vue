<script setup lang="ts">
import { useRouter } from 'vue-router';
defineOptions({
  name: 'Login',
});
const router = useRouter();
function handleLogin() {
  router.push('/home');
}
</script>

<template>
  <div class="login">
    <button @click="handleLogin">login</button>
  </div>
</template>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
