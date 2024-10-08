
<template>
  <div>
    <P :class="pClass">这是一段文字</P>
    <button @click="toggleClass">切换样式</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const isHighLight = ref<boolean>(false);
const pClass = ref<{ [key: string]: boolean }>({
  isHighLight: isHighLight.value,
  normal: !isHighLight.value,
});

const toggleClass = () => {
  isHighLight.value = !isHighLight.value;
  pClass.value = {
    isHighLight: isHighLight.value,
    normal: !isHighLight.value,
  };
};
</script>

<style scoped>
.isHighLight {
  color: red;
}
.normal {
  color: black;
}
</style>