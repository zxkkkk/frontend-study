<template>
    <div :class="{ container: true }">
        <div class="image-section">
            <img v-if="isRegister" src="../assets/2.svg" class="image" />
            <img v-if="!isRegister" src="../assets/1.svg" class="image" />
        </div>
        <div class="form-section">

            <ElForm class="login-form" ref="loginRef" :model="loginParam" :rules="loginRules" v-if="!isRegister">
                <h1 class="login-title">登录</h1>
                <ElFormItem prop="username">
                    <ElInput placeholder="请输入账号" :prefix-icon="User" v-model="loginParam.username" size="large" />
                </ElFormItem>
                <ElFormItem prop="password">
                    <ElInput placeholder="请输入密码" show-password :prefix-icon="Lock" v-model="loginParam.password"
                        size="large" style="margin-bottom: 5px;" />
                </ElFormItem>
                <ElFormItem>
                    <ElButton type="primary" class="login-btn" size="large" @click="submit(loginRef)">登录</ElButton>
                </ElFormItem>
                <ElFormItem>
                    <ElButton type="primary" class="switch-btn" size="large" @click="toggle">去注册</ElButton>
                </ElFormItem>
            </ElForm>

            <ElForm class="register-form" ref="registerRef" v-if="isRegister" :model="registerParam"
                :rules="registerRules">
                <h1 class="register-title">注册</h1>
                <ElFormItem prop="username">
                    <ElInput placeholder="请输入账号" :prefix-icon="User" v-model="registerParam.username" size="large" />
                </ElFormItem>
                <ElFormItem prop="password">
                    <ElInput placeholder="请输入密码" show-password :prefix-icon="Lock" v-model="registerParam.password"
                        size="large" />
                </ElFormItem>

                <ElFormItem>
                    <ElButton type="primary" class="register-btn" size="large" @click="submit(registerRef)">注册
                    </ElButton>
                </ElFormItem>
                <ElFormItem>
                    <ElButton type="primary" class="switch-btn" size="large" @click="toggle">去登录</ElButton>
                </ElFormItem>
            </ElForm>
        </div>
    </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import axios from 'axios';
import { useRouter } from 'vue-router';  // 导入 useRouter
const router = useRouter();  // 获取 router 实例
const isRegister = ref(false);
const loginParam = reactive({ username: "", password: "" });
const registerParam = reactive({ username: "", password: "" });

const loginRef = ref<FormInstance>();
const registerRef = ref<FormInstance>();
const loginRules: FormRules = reactive({
    username: [{ required: true, message: "账号不能为空", trigger: 'blur' }],
    password: [{ required: true, message: "密码不能为空", trigger: 'blur' }]
});

const registerRules: FormRules = reactive({
    username: [{ required: true, message: "账号不能为空", trigger: 'blur' }],
    password: [
        { required: true, message: "密码不能为空", trigger: 'blur' },
        { min: 6, max: 20, message: "密码是6~20位", trigger: 'blur' }
    ]
});

const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;

    formEl.validate(async (validate: boolean) => {
        if (validate) {
            try {
                let response;
                if (isRegister.value) {
                    // 注册请求
                    response = await axios.post('http://localhost:8080/api/auth/register', {
                        username: registerParam.username,
                        password: registerParam.password
                    });
                } else {
                    // 登录请求
                    response = await axios.post('http://localhost:8080/api/auth/login', {
                        username: loginParam.username,
                        password: loginParam.password
                    });
                }

                if (response.data && response.data.code === 0) {
                    if (isRegister.value) {
                        // 注册成功提示并切换到登录
                        ElMessage({
                            message: '注册成功，请登录',
                            type: 'success',
                            duration: 3000
                        });
                        toggle(); // 切换到登录表单
                    } else {
                        // 登录成功，存储 JWT
                        localStorage.setItem('JWT', response.data.data);
                        ElMessage({
                            message: '登录成功',
                            type: 'success',
                            duration: 3000
                        });
                        router.push({ name: 'questionall' });
                    }
                } else {
                    ElMessage({
                        message: response.data.msg || '请求失败',
                        type: 'error',
                        duration: 3000
                    });
                }
            } catch (error) {
                console.error('请求失败: ', error);
                ElMessage({
                    message: '请求失败',
                    type: 'error',
                    duration: 3000
                });
            }
        }
    });
};

const toggle = () => {
    isRegister.value = !isRegister.value;
};
</script>

<style scoped>
:root {
    --primary-color: #6A82FB;
    --accent-color: #FC5C7D;
}

.container {
    background-image: url("../images/44.webp");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.8);
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.inner-sign-up-container {
    width: 100%;
    margin-top: 20%;
}



.form-section {
    margin-top: 10%;
    padding-left: 10%;
    margin-bottom: 18%;
    flex: 1;
    /* 表单占据可用空间 */
    max-width: 400px;
    /* 限制表单的最大宽度 */
    padding: 20px;
    margin-right: 20%;
    /* 内部留出一些内边距 */
    backdrop-filter: blur(5px);
    /* 给表单区域增加模糊效果 */
    border-radius: 10px;
    /* 圆角效果，可选 */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    /* 添加阴影效果，可选 */
}

.image-section {
    margin-top: 10%;
    margin-bottom: 20%;
    flex: 1;
    /* 图片占据可用空间 */
    display: flex;
    /* 使用 flex 盒子布局 */
    justify-content: center;
    /* 水平居中对齐图片 */
    align-items: center;
    /* 垂直居中对齐图片 */
}

.login-form,
.register-form {
    height: 500px;
    opacity: 1;
    transition: 1s ease-in-out;
}

.login-title,
.register-title {
    text-align: center;
    color: #444;
}

.login-btn,
.register-btn,
.switch-btn {
    margin: 5px;
    width: 100%;
    font-size: 18px;
}

.image {
    width: 90%;
    /* 自适应宽度 */
    max-width: 500px;
    /* 限制最大宽度以保持格式 */
}
</style>
