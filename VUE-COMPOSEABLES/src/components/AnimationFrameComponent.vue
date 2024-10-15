<template>
  <div class="animation-container">
    <div :style="{ transform: `translateY(${position}px)` }" class="animated-box">移动的元素</div>
    <button @click="toggleAnimation" class="toggle-button">
      {{ isAnimating ? '停止' : '开始' }} 动画
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const position = ref(0);
const isAnimating = ref(false);

const toggleAnimation = () => {
  isAnimating.value = !isAnimating.value;

  if (isAnimating.value) {
    animate();
  }
};

const animate = () => {
  if (isAnimating.value) {
    position.value += 1; // 每帧更新位置
    if (position.value > 300) position.value = 0; // 循环
    requestAnimationFrame(animate); // 请求下一帧
  }
};
</script>

<style scoped>
.animation-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f4f8;
}

.animated-box {
  width: 100px;
  height: 100px;
  background-color: #4a90e2; /* 深蓝色 */
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.toggle-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #50bfa1; /* 绿色 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, transform 0.2s;
}

.toggle-button:hover {
  background-color: #3e9b83; /* 深绿色 */
  transform: scale(1.05);
}

.toggle-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 186, 255, 0.5); /* 聚焦时的阴影 */
}
</style>
