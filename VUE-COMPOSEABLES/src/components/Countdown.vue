<template>
  <div class="countdown-container">
    <div class="countdown-display">
      <span class="count">{{ time }}</span>
      <span class="unit">秒</span>
    </div>
    <div class="countdown-buttons">
      <button @click="startCountdown" :disabled="isRunning">开始</button>
      <button @click="stopCountdown" :disabled="!isRunning">停止</button>
      <button @click="resetCountdown">重置</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCountdown } from '@/composables/useCountdown';

const initialTime = 60; // 初始时间为60秒
const { time, isRunning, startCountdown, stopCountdown, resetCountdown } = useCountdown(initialTime);
</script>

<style scoped>
.countdown-container {
  background-color: var(--countdown-bg-color, #f9f9f9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: var(--box-shadow, 0 4px 6px rgba(0, 0, 0, 0.1));
  text-align: center;
  max-width: 400px;
  margin: 20px auto;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.countdown-display {
  font-size: 48px;
  font-weight: bold;
  color: var(--countdown-text-color, #333);
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.count {
  animation: pulse 1s infinite;
}

.unit {
  font-size: 24px;
  margin-left: 8px;
  color: var(--countdown-unit-color, #666);
}

.countdown-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

button {
  flex: 1;
  padding: 10px 0;
  background-color: var(--button-bg-color, #3498db);
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

button:disabled {
  background-color: var(--button-disabled-bg-color, #bdc3c7);
  cursor: not-allowed;
}

button:not(:disabled):hover {
  background-color: var(--button-hover-bg-color, #2980b9);
  transform: translateY(-2px);
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
