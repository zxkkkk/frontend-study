<template>
    <div class="profile-container">
        <h2 class="welcome-title">欢迎来到个人中心</h2>
        <div class="user-info">
            <img :src="user?.avatar" alt="avatar" class="avatar" />
            <p class="nickname">昵称: {{ user?.nickname }}</p>
            <p class="bonus">积分: {{ user?.bonus }}</p>
        </div>
        <button @click="handleLogout" class="logout-btn">退出登录</button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/useUser";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const { fetchUser, clearUser } = userStore;

onMounted(() => {
    fetchUser();
});

const handleLogout = () => {
    clearUser();
    router.push("/login");
};
</script>

<style scoped>
.profile-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.welcome-title {
    margin-bottom: 20px;
    font-family: 'Arial', sans-serif;
    color: #333;
}

.user-info {
    margin-bottom: 20px;
}

.avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid #007bff;
    margin-bottom: 10px;
}

.nickname, .bonus {
    font-size: 16px;
    color: #555;
}

.logout-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.logout-btn:hover {
    background-color: #0056b3;
}
</style>
