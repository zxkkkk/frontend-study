<template>
    <div class="counter-container">
      <h2 class="counter-title">计数器: {{ counterStore.count }}</h2>
      <h2 class="counter-title">双倍计数器: {{ counterStore.doubleCount }}</h2>
      <div class="button-group">
        <button @click="counterStore.increment" class="increment-button">增加</button>
        <button @click="counterStore.decrement" class="decrement-button">减少</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useCounterStore } from "../stores/useCounter";
  
  // 使用 useCounterStore
  const counterStore = useCounterStore();
  </script>
  
  <style scoped>
  .counter-container {
    max-width: 300px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .counter-title {
    margin: 10px 0;
    font-size: 1.5em;
  }
  
  .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .increment-button,
  .decrement-button {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
  }
  
  .increment-button {
    background-color: #28a745;
    color: white;
  }
  
  .increment-button:hover {
    background-color: #218838;
  }
  
  .decrement-button {
    background-color: #dc3545;
    color: white;
  }
  
  .decrement-button:hover {
    background-color: #c82333;
  }
  </style>
  