<template>
    <div class="user-info-card" style="margin-top: 100px;">
        <div class="avatar-container">
            <el-avatar :src="user.avatar" size="large" class="avatar"></el-avatar>
        </div>
        <h2 class="username">{{ user.username }}</h2>

        <p class="user-description">{{ user.description || '这位用户还没有添加个人描述。' }}</p>

        <el-button type="primary" @click="dialogFormVisible = true" class="edit-button">编辑信息</el-button>

        <el-dialog v-model="dialogFormVisible" title="个人信息" width="500">
            <el-form :model="userForm" label-width="120px">
                <el-form-item label="用户名" class="form-item">
                    <el-input v-model="userForm.username" placeholder="输入用户名" />
                </el-form-item>

                <el-form-item label="个人描述" class="form-item">
                    <el-input v-model="userForm.description" placeholder="输入个人描述" />
                </el-form-item>

                <el-form-item label="上传头像" class="form-item">
                    <el-upload class="upload-demo" ref="upload" action="http://localhost:8080/api/oss/upload"
                        :on-success="handleUploadSuccess" :before-upload="beforeUpload" :show-file-list="false">
                        <el-button type="primary">点击上传头像</el-button>
                    </el-upload>
                    <span v-if="userForm.avatar">
                        已上传：<a :href="userForm.avatar" target="_blank">查看头像</a>
                    </span>
                </el-form-item>

                <el-form-item class="form-item">
                    <el-button type="primary" @click="submitUserInfo">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <div class="user-activities">
            <h3>最近活动</h3>
            <ul>
                <ul>
                    <li>2024年10月20日 - 添加了新头像</li>
                    <li>2024年10月20日 - 更新了个人信息</li>
                    <li>2024年10月21日 - 上传了新的照片</li>
                    <li>2024年10月20日 - 成功注册账户</li>
                </ul>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import axios from 'axios';
import { onMounted } from 'vue';

const dialogFormVisible = ref(false);

const user = ref({
    id: null,
    username: '',
    avatar: '',
    createdAt: null,
    updatedAt: null,
    description: '',
    activities: []
});

const userForm = ref({
    username: '',
    avatar: '',
    description: ''
});

const getUserInfo = async () => {
    const token = localStorage.getItem('JWT') || '';
    try {
        const response = await axios.get('http://localhost:8080/api/auth/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.data.code === 0) {
            const userData = response.data.data;
            user.value = {
                id: userData.id,
                username: userData.username,
                avatar: userData.avatar,
                createdAt: userData.created_at,
                updatedAt: userData.updated_at,
                description: userData.description || '',
                activities: userData.activities || []
            };
            resetForm(); // 初始化表单数据
        }
    } catch (error) {
        console.error('获取用户信息失败:', error);
    }
};

const formatDate = (dateString: string | null) => {
    if (!dateString) return '未定义';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}年${month}月${day}日`;
};

const submitUserInfo = async () => {
    const token = localStorage.getItem('JWT') || '';
    try {
        const response = await axios.put('http://localhost:8080/api/auth/update', userForm.value, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.data.code === 0) {
            user.value.username = userForm.value.username;
            user.value.avatar = userForm.value.avatar;
            user.value.description = userForm.value.description; // 更新描述
            dialogFormVisible.value = false; // 关闭弹窗
        }
    } catch (error) {
        console.error('更新用户信息失败:', error);
    }
};

const handleUploadSuccess = (response: { fileUrl: string }) => {
    if (response.fileUrl) {
        userForm.value.avatar = response.fileUrl; // 更新表单中的头像 URL
    }
};

const beforeUpload = (file: { type: string; size: number }) => {
    const isImage = file.type.startsWith('image/');
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isImage) {
        alert('上传头像只能是 JPG/PNG 文件');
    }
    if (!isLt2M) {
        alert('上传头像大小不能超过 2MB!');
    }
    return isImage && isLt2M;
};

const resetForm = () => {
    userForm.value = {
        username: user.value.username,
        avatar: user.value.avatar,
        description: user.value.description // 重置描述输入
    };
};

onMounted(getUserInfo);
</script>

<style scoped>
.user-info-card {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    /* 背景白色 */
    border-radius: 8px;
    /* 圆角 */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    /* 添加阴影 */
    text-align: center;
    /* 文本居中 */
}

.avatar-container {
    margin-bottom: 20px;
    /* 头像与标题之间的间距 */
}

.avatar {
    border: 2px solid #f0f0f0;
    /* 给头像添加边框 */
    border-radius: 50%;
    /* 头像圆形 */
}

.username {
    font-size: 24px;
    /* 字体大小 */
    font-weight: bold;
    /* 字体加粗 */
    margin: 10px 0;
    /* 字体上下间距 */
    color: #333;
    /* 字体颜色 */
}

.user-created-at {
    font-size: 14px;
    /* 创建时间字体大小 */
    color: #777;
    /* 文字颜色 */
}

.user-description {
    margin: 10px 0;
    /* 个人描述上下间距 */
    font-size: 16px;
    /* 字体大小 */
    color: #555;
    /* 文字颜色 */
}

.edit-button {
    margin-top: 10px;
    /* 按钮与标题之间间距 */
}

.user-activities {
    margin-top: 20px;
    /* 最近活动的间距 */
    text-align: left;
    /* 左对齐 */
}

.user-activities h3 {
    margin-bottom: 10px;
    /* 活动标题与内容之间的间距 */
}

.user-activities ul {
    list-style: none;
    /* 去掉列表样式 */
    padding: 0;
    /* 去掉内边距 */
}

.user-activities li {
    margin: 5px 0;
    /* 列表项的上下间距 */
    font-size: 14px;
    /* 字体大小 */
    color: #333;
    /* 颜色 */
}
</style>
