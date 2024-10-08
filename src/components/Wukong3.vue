<template>
    <div class="skills-list">
        <h2>技能列表</h2>
        <ul>
            <li v-for="skill in skills" :key="skill.id">
                {{skill.name}} - 
                <span v-if="skill.status == true" style="color: green;">已解锁</span>
                <span v-else style="color: red;">未解锁</span>
            </li>
        </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  interface Skill {
    id: number;
    name: string;
    status: boolean;
  }
  
  const skills = ref<Skill[]>([
    { id: 1, name: '定身术', status: true },
    { id: 2, name: '聚型散气', status: true },
    { id: 3, name: '广智化身', status: true },
    { id: 4, name: '猴子猴孙', status: false },
  ]);
  </script>
  
  <style scoped>
  .skills-list {
    width: 80%;
            max-width: 800px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            padding: 20px;
            box-sizing: border-box;
  }
  
  .skill-item {
    font-size: 16px;
  }
  
  .unlocked {
    color: green;
  }
  
  .locked {
    color: red;
    text-decoration: line-through;
  }
  </style>
  