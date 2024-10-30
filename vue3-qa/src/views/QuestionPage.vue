<template>
    <div class="container">
        <h1 class="title">提出一个问题</h1>
        <el-form :model="questionForm" label-width="120px" class="form-container">
            <!-- 标题输入框 -->
            <el-form-item label="标题" class="form-item">
                <el-input v-model="questionForm.title" placeholder="输入问题标题" class="full-width-input" />
            </el-form-item>

            <!-- 富文本编辑器，用于输入问题内容 -->
            <el-form-item label="内容" class="form-item editor-container">
                <div ref="editor" class="editor" />
            </el-form-item>

            <!-- 上传图片区域 -->
            <el-form-item label="上传图片" class="form-item">
                <el-upload class="upload-demo" ref="upload" action="http://localhost:8080/api/oss/upload"
                    :on-success="handleUploadSuccess" :before-upload="beforeUpload" :show-file-list="false">
                    <el-button type="primary">点击上传图片</el-button>
                </el-upload>
                <span v-if="questionForm.image_url">
                    已上传：<a :href="questionForm.image_url" target="_blank">查看图片</a>
                </span>
            </el-form-item>

            <!-- 提交按钮 -->
            <el-form-item class="form-item">
                <el-button type="primary" @click="submitQuestion" class="submit-button">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElForm, ElFormItem, ElUpload, ElMessage } from 'element-plus';
import WangEditor from 'wangeditor';
import axios from 'axios';
import router from '@/router';

// 表单数据：包含 title, content 和 image_url
const questionForm = ref({
    title: '',
    content: '',
    image_url: null
});

// 参考编辑器实例
const editorRef = ref<WangEditor | null>(null);

onMounted(() => {
    // 初始化 WangEditor
    editorRef.value = new WangEditor(document.querySelector('.editor') as HTMLElement);

    // 配置编辑器
    editorRef.value.config.placeholder = '开始输入...';
    editorRef.value.create(); // 创建编辑器实例
});

// 处理图片上传成功的回调
const handleUploadSuccess = (response: { fileUrl: null; }) => {
    if (response.fileUrl) {
        questionForm.value.image_url = response.fileUrl;
        ElMessage.success('图片上传成功！');
    } else {
        console.error('上传失败，未返回文件 URL');
    }
};

// 上传前的检查
const beforeUpload = (file: { type: string; size: number; }) => {
    const isImage = file.type.startsWith('image/');
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isImage) {
        ElMessage.error('上传图片只能是 JPG/PNG 文件');
    }
    if (!isLt2M) {
        ElMessage.error('上传图片大小不能超过 2MB!');
    }
    return isImage && isLt2M;
};

// 提交问题的异步方法
const submitQuestion = async () => {
    // 获取编辑器内容
    questionForm.value.content = editorRef.value?.txt.html() || '';

    try {
        const response = await axios.post('http://localhost:8080/api/questions/add', questionForm.value, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('JWT')}`
            }
        });

        if (response.data.code === 0) {
            questionForm.value = { title: '', content: '', image_url: null };
            ElMessage.success('提问成功！');
            router.push('/questionall'); // 替换为主页面的路由
        } else {
            console.error('Failed to add question:', response.data.msg);
            ElMessage.error('提问失败，请重试！');
        }
    } catch (error) {
        console.error('Error adding question:', error);
        ElMessage.error('提问过程出错，请检查网络！');
    }

};
</script>

<style scoped>
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding-left: 0px;
    padding-right: 80px;
}

.title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
    margin-left: 30px;
}

.form-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-item {
    width: 100%;
}

.full-width-input {
    width: 100%;
}

.editor {
    border: 1px solid #ccc;
    min-height: 200px;
    /* 最小高度 */
    padding: 10px;
    border-radius: 4px;
}

.upload-demo {
    margin-bottom: 10px;
}

.submit-button {
    width: 100%;
    height: 40px;
    font-size: 16px;
}
</style>
