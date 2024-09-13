<template>
  <div id="d1">
    <h1>
      {{ name }}
    </h1>
    <h2>
      {{ title }}
    </h2>
    <span>
      {{ description }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const name = ref<string>("孙悟空");
const title = ref<string>("齐天大圣");
const description = ref<string>(
  "在《西游记中》，孙悟空是一个勇敢无畏、机智聪明的角色，以其强大的能力和不屈的精神著称"
);
</script>

<style scoped>
div {
  background-color: yellow;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>