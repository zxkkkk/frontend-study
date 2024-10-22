import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

// 定义用户信息接口
interface User {
  id: number
  phone: string
  avatar: string
  nickname: string
  bonus: number
}

// 定义存储库接口
interface UserStore {
  user: User | null
  fetchUser: () => Promise<void>
  clearUser: () => void
}

export const useUserStore = defineStore('user', (): UserStore => {
  const user = ref<User | null>(null) // 用户信息

  // 从本地存储中加载用户信息
  const loadUserFromLocalStorage = (): void => {
    const userData = localStorage.getItem('user')
    if (userData) {
      // 将 JSON 字符串解析为对象并赋值给 user
      user.value = JSON.parse(userData)
    }
  }

  // 从后端获取用户信息
  const fetchUser = async (): Promise<void> => {
    try {
      // 发起请求获取用户信息
      const response = await axios.get('http://localhost:8080/user/info', {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      console.log(response.data.data)
      // 将获取到的用户信息赋值给 user
      user.value = response.data.data
      // 保存到本地存储
      localStorage.setItem('user', JSON.stringify(user.value))
    } catch (error) {
      console.error('获取用户信息失败:', error)
      // 清除用户信息（登出时使用）
    }
  }

  // 移除本地存储中的用户信息
  const clearUser = (): void => {
    user.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  // 初始化时从本地存储加载用户信息
  loadUserFromLocalStorage()

  return {
    user: user.value,
    fetchUser,
    clearUser
  }
})