import axios from 'axios'
const api = axios.create({
    baseURL: 'https://api.zhihu.com',
    timeout: 8000,
})

export default api;