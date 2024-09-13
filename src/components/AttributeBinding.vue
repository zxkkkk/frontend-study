<template>
  <div>
    <button :disabled="isDisabled">点击</button>
    <img src="url" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const isDisabled = ref<boolean>(true);
const url = ref<string>(
  "https://pic3.zhimg.com/v2-5fb13110e1de13d4c11e6e7f5b8026da_r.jpg"
);
</script>



