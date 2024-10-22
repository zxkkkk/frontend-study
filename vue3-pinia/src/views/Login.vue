<template>
    <div class="login-container">
        <h2>欢迎登录</h2>
        <input v-model="phone" placeholder="手机号" class="input-field" />
        <button @click="sendCode" :disabled="isSending || countdown > 0" class="send-code-btn">
            {{ countdown > 0 ? `${countdown}秒后重发` : '发送验证码' }}
        </button>
        <input v-model="code" placeholder="验证码" class="input-field" />
        <button @click="login" class="login-btn">登录</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/useAuth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const phone = ref<string>("18961259505");
const code = ref<string>("");
const countdown = ref<number>(0);
const isSending = ref<boolean>(false);

const sendCode = async () => {
    isSending.value = true;
    await authStore.sendCode(phone.value);
    startCountdown();
    isSending.value = false;
};

const startCountdown = () => {
    countdown.value = 60;
    const interval = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
            clearInterval(interval);
        }
    }, 1000);
};

const login = async () => {
    await authStore.login(phone.value, code.value);
    router.push("/profile");
};
</script>

<style scoped>
.login-container {
    max-width: 350px;
    margin: 60px auto;
    padding: 30px;
    border-radius: 10px;
    background-color: #f8f9fa;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    text-align: center;
}

h2 {
    margin-bottom: 30px;
    font-family: 'Helvetica Neue', sans-serif;
    color: #333;
    font-weight: 600;
}

.input-field {
    width: 100%;
    padding: 12px;
    margin-bottom: 20px;
    border: 1px solid #ced4da;
    border-radius: 5px;
    font-size: 16px;
    transition: border 0.3s;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.input-field:focus {
    border-color: #007bff;
    outline: none;
}

.send-code-btn, .login-btn {
    width: 100%;
    padding: 12px;
    margin-bottom: 15px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
}

.send-code-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.send-code-btn:hover:not(:disabled), .login-btn:hover {
    background-color: #0056b3;
    transform: translateY(-1px);
}

.send-code-btn:active, .login-btn:active {
    transform: translateY(1px);
}
</style>
