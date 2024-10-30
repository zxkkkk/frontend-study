<template>
    <div class="container">
        <div class="container">
            <!-- 问题与回答主体 -->
            <div class="qa-section">
                <el-container>
                    <!-- 顶部标题 -->
                    <el-header>
                        <h1 class="header-title">所有问题</h1>
                    </el-header>

                    <!-- 问题与回答列表 -->
                    <el-main>
                        <!-- 循环显示问题 -->
                        <el-card v-for="question in questions" :key="question.id" class="question-card">
                            <!-- 问题部分 -->
                            <div class="question-header">
                                <el-avatar :src="question.user.avatar" size="large" />
                                <div class="user-info">
                                    <span class="username">{{ question.user.username }}</span>

                                </div>
                                <div>
                                    <span class="created-at">{{ formatDate(question.created_at) }}</span>
                                </div>

                            </div>

                            <h2 class="question-title">{{ question.title }}</h2>
                            <p class="question-content" v-if="isHtml(question.content)" v-html="question.content"></p>
                            <p class="question-content" v-else>{{ question.content }}</p>
                            <img v-if="question.image_url" :src="question.image_url" class="question-image" />

                            <el-divider>回答</el-divider>
                            <div v-if="isExpanded[question.id]" class="answer-form" style="">
                                <el-input type="textarea" placeholder="请输入您的回答" v-model="newAnswers[question.id]"
                                    rows="4">
                                </el-input>
                                <el-button type="primary" @click="submitAnswer(question.id)">
                                    提交回答
                                </el-button>
                            </div>
                            <!-- 回答部分 -->
                            <div class="answers">
                                <div v-if="question.answers.length === 0" class="no-answer">暂无回答</div>
                                <div v-if="question.answers.length > 0">
                                    <div v-if="isExpanded[question.id]">
                                        <!-- 显示回答 -->
                                        <div v-for="answer in question.answers" :key="answer.id" class="answer-card"
                                            style="display: flex; align-items: center; margin-bottom: 10px;">

                                            <div class="answer-details"
                                                style="flex-grow: 1; margin-left: 10px; display: flex; flex-direction: column;">
                                                <div style="display: flex; align-items: center">
                                                    <el-avatar :src="answer.user.avatar" size="medium" />
                                                    <span class="username">{{ answer.user.username }}</span>
                                                    <div>
                                                        <span style="margin-left: 10px; color: #999;">{{
                                                            formatDate(answer.created_at) }}</span>
                                                    </div>
                                                </div>

                                                <div>

                                                </div>
                                                <p class="answer-content" v-if="isHtml(answer.content)"
                                                    v-html="answer.content"></p>
                                                <p class="answer-content" v-else>{{ answer.content }}</p>
                                            </div>

                                            <div>
                                                <el-button type="danger" title="删除答案" @click="deleteAnswer(answer.id)"
                                                    icon="el-icon-delete"
                                                    style="display: flex; align-items: center; justify-content: center;">
                                                    <p style="margin-right: 12px;"> 删除答案</p>
                                                </el-button>
                                            </div>
                                        </div>


                                        <div>

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


                        </el-card>
                    </el-main>
                </el-container>
            </div>

            <!-- 个人中心和相关问题部分 -->
            <el-card class="user-center-card" style="margin-top: 80px;">
                <div class="user-center-section">
                    <div class="icon-section">
                        <el-avatar size="large" :src="userInfo.avatar" />
                        <div style="margin-top: 0px; margin-left: 20px;">
                            <div style="margin-bottom: 5px;">
                                {{ userInfo.username }}
                            </div>
                            <el-button @click="navigateTomy">个人中心</el-button>
                        </div>
                    </div>

                    <div class="user-info-box">
                        <div>
                            <div class="button-with-icon">
                                <img src="../images/回答问题.png" alt="回答问题" class="button-icon" />
                            </div>
                            <div style="margin-left: 18px;">
                                <el-button @click="navigateToQuestionPage1">我的问题</el-button>
                            </div>
                        </div>
                        <div>
                            <div class="button-with-icon">
                                <img src="../images/我的问题.png" alt="我的问题" class="button-icon" />
                            </div>
                            <div style="margin-left: 15px;">
                                <el-button @click="navigateToQuestionPage">提问</el-button>
                            </div>
                        </div>
                        <div>
                            <div class="button-with-icon">
                                <img src="../images/热门问题.png" alt="热门问题" class="button-icon" />
                            </div>
                            <div style="margin-left: 15px;">
                                <el-button>热门问题</el-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <img src="../images/讨论问题.png" alt="" style="height: 500px;width: 400px;">
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElAvatar, ElContainer, ElHeader, ElMain, ElCard, ElDivider, ElButton } from 'element-plus';
import axios from 'axios';
import { useRouter } from 'vue-router';
const newAnswers = ref({});
const router = useRouter();
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
const submitAnswer = async (questionId: string | number) => {
    const answerContent = newAnswers.value[questionId];
    if (!answerContent.trim()) {
        alert('回答内容不能为空！');
        return;
    }
    try {
        const response = await axios.post('http://localhost:8080/api/answers/add', {
            questionId: questionId,
            content: answerContent
        }, {
            headers: {

                'Authorization': `Bearer ${localStorage.getItem('JWT')}`
            }
        });
        if (response.data.code === 0) {
            alert('回答提交成功');
            // 可以选择重新加载问题列表或直接更新视图
            fetchQuestions();
        } else {
            alert('提交失败：' + response.data.msg);
        }
    } catch (error) {
        console.error('提交回答时出错：', error);
        alert('提交回答时出错，请重试');
    }
};
const userInfo = ref({
    username: 'Loading...',
    avatar: 'https://example.com/default-avatar.jpg'
});
const isExpanded = ref({});

const deleteAnswer = async (answerId: number) => {
    const token = localStorage.getItem('JWT');
    try {
        const response = await axios.get(`http://localhost:8080/api/answers/delete/${answerId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.data.code === 0) {
            questions.value = questions.value.map(q => {
                if (q.answers.some(ans => ans.id === answerId)) {
                    q.answers = q.answers.filter(ans => ans.id !== answerId);
                }
                return q;
            });
            alert('答案删除成功');
        } else {
            alert(response.data.msg);
        }
    } catch (error) {
        console.error('Error deleting answer:', error);
        alert('发生错误，请重试');
    }
};

const toggleAnswersVisibility = (questionId: string | number) => {
    isExpanded.value[questionId] = !isExpanded.value[questionId];
};

const navigateToQuestionPage = () => {
    router.push({ name: 'QuestionPage' });
};

const navigateToQuestionPage1 = () => {
    router.push({ name: 'myquestion' });
};
const navigateTomy = () => {
    router.push({ name: 'my' });
};

const fetchQuestions = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/questions/all');
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

const getUserInfo = async () => {
    const token = localStorage.getItem('JWT');
    if (token) {
        try {
            const response = await axios.get('http://localhost:8080/api/auth/user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data.code === 0) {
                userInfo.value = response.data.data;
            } else {
                console.error('Error fetching user data:', response.data.msg);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }
};

const formatDate = (dateString: string | number | Date) => {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('zh-CN', options);
};

const isHtml = (content: string) => {
    const div = document.createElement('div');
    div.innerHTML = content;
    return div.innerHTML !== div.textContent;
};

onMounted(() => {
    fetchQuestions();
    getUserInfo();
});

</script>



<style scoped>
.toggle-link {
    cursor: pointer;
    /* 鼠标悬停时显示手形光标 */
    color: #999999;
    /* 浅灰色 */
    transition: color 0.3s ease;
    /* 添加过渡效果 */
}

.toggle-link:hover {
    color: #666666;
    /* 悬停时颜色加深 */
}

.answer-form {
    margin-top: 10px;
    margin-bottom: 10px;
}

.el-input {
    margin-bottom: 10px;
}

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

.answer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.user-info {
    margin-right: 20px;
    /* 用户信息与头像的间距 */
}

.container {
    background-image: url("../images/33.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100vw;
    height: 100%;

    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    background-color: rgba(255, 255, 255, 1.1);
    /* 调整透明度 */
}



.button-with-icon {
    width: 90px;
    /* 图片宽度 */
    height: 60px;
    /* 图片高度 */
    border-radius: 5%;
    /* 圆角效果 */
    object-fit: cover;
    /* 确保图片不失真 */
    background-color: rgb(255, 255, 255);
    /* 图片背景颜色 */
    padding: 5px;
    margin-bottom: 20px;
    margin-left: 10px;
    padding-left: -10px;
    /* 背景加宽以显示阴影效果 */
}



.button-icon {

    margin-bottom: 10px;

    width: 50px;
    height: 50px;

    object-fit: cover;
    /* 确保图片按比例填充 */
}

.ren {
    margin-top: 15px;
    margin-left: 20px;
}

/* 整体容器布局 */


/* 广告栏样式 */
.ad-section {
    width: 200px;
    height: 600px;
    background-color: #f5f5f5;
    text-align: center;
    line-height: 600px;
    border: 1px solid #dcdcdc;
}

/* 问题与回答主体布局 */
.qa-section {
    margin-left: 150px;
    flex: 1;
    max-width: 60%;
    /* 减短问题部分宽度 */
}

/* 个人中心与相关问题 */
.user-center-card {
    margin-top: 4%;
    height: 80%;
    padding-right: 2%;
    width: 25%;
    /* 定义宽度 */
}

.user-center-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    /* 添加内边距 */
}

.icon-section {
    display: flex;
    margin-bottom: 10px;
    /* 图标与按钮之间的间距 */
}

.user-info-box {
    margin-left: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* 按钮并排显示 */
    align-items: center;
}

.el-button1:hover {
    background-color: #e72a18;
    /* 按钮悬停色 */
    transform: translateY(-2px);
    /* 悬停时轻微上移 */
}

/* 头部标题样式 */
.header-title {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #409EFF;
    /* 标题颜色 */
}

/* 问题卡片样式 */
.question-card {
    margin-bottom: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    /* 添加阴影 */
    border: 1px solid #ccc;
    /* 边框 */
    transition: box-shadow 0.3s;
    /* 过渡效果 */
}

@media (max-width: 768px) {
    .container {
        flex-direction: column;
        /* 堆叠布局 */
    }

    .user-center-card,
    .qa-section {
        width: 100%;
        /* 调整宽度 */
        max-width: 100%;
        /* 最大宽度 */
    }
}

/* 问题头部样式 */
.question-header {

    align-items: center;
}

.user-info {
    margin-left: 10px;
}

.username {
    font-weight: bold;
    margin-left: 10px;
}

.created-at {
    font-size: 12px;
    color: #888;
    margin-left: 10px;
}

/* 问题标题与内容 */
.question-title {
    font-size: 20px;
    font-weight: bold;
}

.question-content {
    margin-bottom: 10px;
}

.question-image {
    width: 80%;
    border-radius: 8px;
    margin-bottom: 10px;
}

/* 回答部分样式 */
.answers {
    overflow: visible;
    /* 确保可见 */
    margin-top: 10px;
}

.no-answer {
    color: #888;
    font-style: italic;
}

.answer-card {
    margin-top: 10px;
}

.answer-header {
    display: flex;
    align-items: center;
}

.answer-content {
    margin-left: 40px;
}
</style>
