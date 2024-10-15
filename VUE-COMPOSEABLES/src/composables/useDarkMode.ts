// src/composables/useDarkMode.ts
import { useDark, useToggle } from '@vueuse/core';

export function useDarkMode() {
  const isDark = useDark(); // 自动监听系统或用户的暗黑模式偏好
  const toggleDark = useToggle(isDark); // 切换暗黑模式

  return {
    isDark,
    toggleDark,
  };
}
