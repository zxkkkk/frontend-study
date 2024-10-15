<template>
  <div class="dark-mode-toggle">
    <button
      @click="handleToggle"
      :aria-label="isDark ? '切换到白天模式' : '切换到夜间模式'"
    >
      <SunIcon v-if="!isDark" class="icon sun-icon" />
      <MoonIcon v-else class="icon moon-icon" />
      <span class="toggle-text">{{ isDark ? '白天模式' : '夜间模式' }}</span>
      <div class="toggle-switch" :class="{ active: isDark }"></div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { SunIcon, MoonIcon } from '@heroicons/vue/24/solid';
import { useDarkMode } from '@/composables/useDarkMode';

const { isDark, toggleDark } = useDarkMode();

const handleToggle = () => {
  toggleDark();
};
</script>

<style scoped>
.dark-mode-toggle {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

button {
  position: relative;
  display: flex;
  align-items: center;
  background-color: var(--button-bg-color, #f0f0f0);
  border: none;
  border-radius: 50px; /* 更大的圆角 */
  padding: 12px 240px; /* 增加内边距 */
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
  box-shadow: var(--button-shadow, 0 4px 6px rgba(0, 0, 0, 0.1));
  overflow: hidden;
}

button:hover {
  background-color: var(--button-hover-bg-color, #e0e0e0);
}

.icon {
  width: 28px; /* 增加图标大小 */
  height: 28px;
  transition: transform 0.3s ease-in-out;
}

.sun-icon {
  color: #f39c12;
}

.moon-icon {
  color: #34495e;
}

.toggle-text {
  margin-left: 12px; /* 增加文字间距 */
  font-size: 16px; /* 增加字体大小 */
  color: var(--button-text-color, #333);
  transition: opacity 0.3s;
}

.toggle-switch {
  position: absolute;
  right: 15px; /* 调整位置 */
  width: 30px; /* 增加开关大小 */
  height: 30px;
  background-color: var(--toggle-bg-color, #ccc);
  border-radius: 50%;
  transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
}

.toggle-switch.active {
  transform: translateX(30px); /* 适应新的开关大小 */
  background-color: var(--toggle-active-bg-color, #4CAF50);
}

@media (max-width: 600px) {
  .toggle-text {
    display: none;
  }
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.5);
}

button:active .icon {
  transform: scale(0.95);
}

button:not(:disabled):hover .icon {
  transform: scale(1.1);
}
</style>
