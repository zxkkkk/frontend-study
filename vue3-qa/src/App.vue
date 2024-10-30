<template>
  <div id="app">
    <router-view /> <!-- 显示当前路由的组件 -->
  </div>
</template>

<script setup lang="ts">
// 导入 router 实例
import { useRouter } from 'vue-router';
import router from './router'; // 确保路径正确

// 您可以在需要的情况下使用 useRouter()
const routerInstance = useRouter();
</script>

<style scoped>
:root {
  --primary-color: #6A82FB;
  --accent-color: #FC5C7D;
}

/* 这里可以添加全局样式 */
#app {
  font-family: 'Avenir', Helvetia, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;

}
</style>
