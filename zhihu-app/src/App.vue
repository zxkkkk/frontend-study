<template>
  <h2>
      知乎热榜
  </h2>
  <Specials />
  <!-- <ZhiHuHot /> -->
</template>

<script setup lang="ts">
import ZhiHuHot from './components/ZhiHuHot.vue';
import Specials from './components/Specials.vue';
</script>

<style scoped>
h2{
  text-align: center;
}
</style>