<template>
    <div class="container">
        <el-container>
            <!-- 顶部标题 -->
            <el-header>
                <h1 class="header-title">我的问题</h1>
            </el-header>

            <!-- 问题列表 -->
            <el-main>
                <el-card v-for="question in questions" :key="question.id" class="question-card">
                    <div class="question-header">
                        <el-avatar :src="question.user.avatar" size="default" />
                        <div>
                            <div class="user-info">
                                <span class="username">{{ question.user.username }}</span>
                            </div>
                            <span class="created-at">{{ formatDate(question.created_at) }}</span>
                        </div>
                    </div>

                    <h2 class="question-title">{{ question.title }}</h2>
                    <!-- Render question content -->
                    <p class="question-content" v-if="isHtml(question.content)" v-html="question.content"></p>
                    <p class="question-content" v-else>{{ question.content }}</p>

                    <img v-if="question.image_url" :src="question.image_url" class="question-image" />

                    <el-divider>回答</el-divider>
                    <div class="answers">
                        <div v-if="question.answers.length === 0" class="no-answer">暂无回答</div>
                        <div v-if="question.answers.length > 0">
                            <div v-if="isExpanded[question.id]">
                                <div v-for="answer in question.answers" :key="answer.id" class="answer-card">

                                    <div style="display: flex;">
                                        <el-avatar :src="answer.user.avatar" size="default" />
                                        <div class="user-info">
                                            <div class="username">{{ answer.user.username }}</div>
                                            <div>
                                                <span style="margin-left: 10px; color: #999;">{{
                                                    formatDate(answer.created_at) }}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Render answer content -->
                                    <p class="answer-content" v-if="isHtml(answer.content)" v-html="answer.content"></p>
                                    <p class="answer-content" v-else>{{ answer.content }}</p>

                                </div>

                                <div @click="toggleAnswersVisibility(question.id)" class="toggle-link">
                                    <span>点击收起回答</span>
                                </div>
                            </div>
                            <div v-else @click="toggleAnswersVisibility(question.id)" class="toggle-link">
                                <span>点击展开所有回答</span>
                            </div>
                        </div>
                    </div>

                    <!-- 删除按钮 -->
                    <el-button type="danger" @click="confirmDelete(question.id)">删除</el-button>
                </el-card>
            </el-main>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { ElMessageBox, ElMessage } from 'element-plus'; // 引入 Element Plus 消息组件
import { ElAvatar, ElContainer, ElHeader, ElMain, ElCard, ElDivider, ElButton } from 'element-plus';
const isHtml = (content) => {
    const doc = new DOMParser().parseFromString(content, "text/html");
    return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
};
const questions = ref([{
    "id": 1,
    "userId": 1,
    "title": "如何开始学习编程？",
    "content": "我对编程很感兴趣，希望能得到一些建议如何开始学习。",
    "image_url": "http://myqqis.oss-cn-beijing.aliyuncs.com/f.png",
    "created_at": "2024-10-14T18:57:44",
    "user": {
        "id": 1,
        "username": "newUsername",
        "avatar": "newAvatar.jpg"
    },
    "answers": [
        {
            "id": 3,
            "questionId": 1,
            "userId": 3,
            "content": "你可以试试看在线教程和参加一些编程入门课程。",
            "created_at": "2024-10-14T18:57:56",
            "user": {
                "id": 3,
                "username": "Charlie",
                "avatar": "https://example.com/avatars/charlie.jpg"
            }
        }
    ]
},]);
const isExpanded = ref<{ [key: number]: boolean }>({});

// 确认删除操作
const confirmDelete = async (id: number) => {
    const result = await ElMessageBox.confirm('您确定要删除这个问题吗？', '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    });

    if (result) {
        deleteQuestion(id);
    }
};

const deleteQuestion = async (id: number) => {
    const token = localStorage.getItem('JWT'); // 从本地存储获取 token
    console.log('Deleting question ID:', id);
    console.log('Using token:', token);

    try {
        const response = await axios.delete(`http://localhost:8080/api/questions/deleted/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        console.log('Delete response:', response.data); // 打印响应
        if (response.data.code === 0 && response.data.data.id === id) {
            questions.value = questions.value.filter(q => q.id !== id);
            ElMessage.success('问题删除成功');
        } else {
            ElMessage.error(response.data.msg || '未知错误'); // 显示错误信息
        }
    } catch (error) {
        if (error.response) {
            console.error('Error data:', error.response.data); // 打印详细的错误信息
            ElMessage.error('删除问题失败: ' + error.response.data.message || '未知错误');
        } else {
            console.error('Error message:', error.message);
            ElMessage.error('删除问题失败: ' + error.message);
        }
    }
};




// 获取问题列表
const fetchQuestions = async () => {
    const token = localStorage.getItem('JWT'); // 从本地存储获取 token
    console.log('Fetching questions...');
    try {
        const response = await axios.get('http://localhost:8080/api/questions/All', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.data.code === 0) {
            questions.value = response.data.data;
            questions.value.forEach(question => {
                isExpanded.value[question.id] = false;
            });
        }
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
};

// 格式化日期
const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString('zh-CN', options);
};

// 切换回答的显示状态
const toggleAnswersVisibility = (questionId: number) => {
    isExpanded.value[questionId] = !isExpanded.value[questionId];
};

// 页面挂载时获取问题数据
onMounted(() => {
    fetchQuestions(); // 获取问题列表
});
</script>

<style scoped>
.answer-card {
    background-color: #f9f9f9;
    /* 背景色 */
    border-radius: 8px;
    /* 圆角 */
    padding: 10px;
    /* 内边距 */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    /* 阴影 */
}

.container {
    margin: 20px;
}

.header-title {
    font-size: 24px;
    text-align: center;
}

.question-card {
    margin-bottom: 20px;
}

.answer-card {

    align-items: center;
    margin-bottom: 10px;
}

.answer-content {
    margin-left: 10px;
}

.toggle-link {
    color: #409EFF;
    cursor: pointer;
}
</style>
