<template>
    <div class="container">
        <div class="input-group"> 
            <label for="baseAttack">基础攻击力:</label>
            <input id="baseAttack" v-model="baseAttack" type="number">
        </div>
        <div class="input-group"> 
            <label for="gearBonus">装备加成:</label>
            <input id="gearBonus" v-model="gearBonus" type="number">
        </div>
        <p class="result">总攻击力：{{ totalAttack }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
const baseAttack = ref<number>(50);
const gearBonus = ref<number>(20);
const totalAttack = computed(() => baseAttack.value + gearBonus.value);
</script>

<style scoped>
.container {
    margin: 20px auto;
    padding: 20px;
    max-width: 400px;
    background-color: #f4f4f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.input-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
}

input[type="number"] {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
    font-size: 16px;
}

input[type="number"]:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.result {
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
    color: #444;
}

@media (max-width: 600px) {
    .container {
        margin: 10px;
        padding: 15px;
    }
    input[type="number"] {
        font-size: 14px;
    }
}
</style>
