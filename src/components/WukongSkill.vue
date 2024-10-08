<template>
    <div class="container">
      <button @click="scrolllToSkills" class="scroll-button">滚动到技能展示</button>
      <div class="content">
        <div ref="skillsSection" class="skills-section"></div>
        <h2 class="skills-title">技能展示</h2>
        <p class="skills-description">技能详细内容...</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  const skillsSection = ref<HTMLElement | null>(null);
  const scrolllToSkills = () => {
    skillsSection.value?.scrollIntoView({ behavior: 'smooth' });
  };
  </script>
  
  <style scoped>
  .container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.scroll-button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 20px;
}

.scroll-button:hover {
  background-color: #0056b3;
}

.content {
  margin-top: 20px;
}

.skills-section {
  margin-bottom: 20px;
  padding: 20px;
  height: 500px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.skills-title {
  margin-bottom: 10px;
  font-size: 24px;
  color: #333;
}

.skills-description {
  font-size: 16px;
  line-height: 1.6;
  color: #666;
}
  </style>