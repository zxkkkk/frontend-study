<template>
  <nav class="navbar">
    <router-link to="/counter" class="nav-link">计数器</router-link>
    <router-link to="/todo" class="nav-link">待办清单</router-link>
    <router-link to="/account" class="nav-link">记账应用</router-link>
    <router-link to="/login" class="nav-link">个人中心</router-link>
    <router-link to="/profile" class="nav-link">登录</router-link>
  </nav>

  <router-view />
</template>

<style scoped>
/* 定义导航栏样式 */
.navbar {
  display: flex;
  justify-content: center;
  background-color: #f8f9fa;
  padding: 10px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.nav-link {
  margin: 0 15px;
  text-decoration: none;
  color: #3baee8;
  padding: 8px 15px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

/* 自定义路由激活样式 */
.router-link-active {
  background-color: #3baee8;
  color: white;
  font-weight: bold;
}

/* 悬停效果 */
.nav-link:hover {
  background-color: rgba(59, 174, 232, 0.2);
}
</style>
