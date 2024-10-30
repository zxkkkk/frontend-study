import { ref } from "vue";

export interface LoginReq {
    username: string;
    password: string;
}
export interface RegisterReq {
    username: string;
    password: string;
}
interface Answer {
    id: number;
    questionId: number;
    userId: number;
    content: string;
    created_at: string; // ISO 8601 格式
    updated_at: string; // ISO 8601 格式
    user: User; // 包含用户信息
}

interface Question {
    id: number;
    userId: number;
    title: string;
    content: string;
    image_url?: string; // 可选字段
    created_at: string; // ISO 8601 格式
    updated_at: string; // ISO 8601 格式
    user: User; // 提出问题的用户信息
    answers: Answer[]; // 回答的数组
}
interface User {
    id: number;
    username: string;
    avatar: string;
}
const questions = ref<Question[]>([]);