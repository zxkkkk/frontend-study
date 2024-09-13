<template>
    <div class="health-container">
        <p class="hp-display">血量: {{ hp }} / 100 ({{ hpPercentage }}%)</p>
        <div class="health-bar-container">
            <div class="health-bar" :style="{ width: hpPercentage + '%' }"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const hp = ref(70)
const hpPercentage = computed(() => hp.value)
</script>

<style scoped>
.health-container {
    margin: 20px auto;
    max-width: 400px;
    padding: 15px;
    background-color: #f4f4f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.hp-display {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
}

.health-bar-container {
    width: 100%;
    height: 25px;
    background-color: #ddd;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
}

.health-bar {
    height: 100%;
    background-color: #4caf50;
    transition: width 0.3s ease;
}
</style>
