import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/login.vue'; // 登录组件
import questionall from '../views/questionall.vue'
import QuestionPage from '../views/QuestionPage.vue'; // 提问组件
import myquestion from '../views/myquestion,.vue'
import my from '../views/my.vue';


const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
    },
    {
        path: '/questionall',
        name: 'questionall',
        component: questionall
    },
    {
        path: '/question',
        name: 'QuestionPage',
        component: QuestionPage // 新增提问页面路由
    },
    {
        path: '/myquestion',
        name: 'myquestion',
        component: myquestion // 新增提问页面路由
    },
    {
        path: '/my',
        name: 'my',
        component: my // 新增提问页面路由
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
