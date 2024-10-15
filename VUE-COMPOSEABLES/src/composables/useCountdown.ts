// src/composables/useCountdown.ts
import { ref, onMounted, onUnmounted } from 'vue';

export function useCountdown(initialTime: number = 60) {
  const time = ref(initialTime);
  const isRunning = ref(false);
  let timer: ReturnType<typeof setInterval> | null = null;

  const startCountdown = () => {
    if (isRunning.value) return; // 防止重复启动计时器
    isRunning.value = true;
    timer = setInterval(() => {
      if (time.value > 0) {
        time.value--;
      } else {
        stopCountdown();
      }
    }, 1000);
  };

  const stopCountdown = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
      isRunning.value = false;
    }
  };

  const resetCountdown = () => {
    stopCountdown();
    time.value = initialTime; // 重置为初始时间
    startCountdown();
  };

  onMounted(() => {
    // 可选：自动开始倒计时
    // startCountdown();
  });

  onUnmounted(() => {
    stopCountdown();
  });

  return {
    time,
    isRunning,
    startCountdown,
    stopCountdown,
    resetCountdown,
  };
}
