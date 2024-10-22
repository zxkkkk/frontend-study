<template>
    <div class="todo-container">
      <h2>待办清单</h2>
      <div class="input-group">
        <input type="text" v-model="newTodoText" placeholder="请输入新的待办事项" class="input" />
        <button @click="myAddTodo" class="add-button">添加</button>
      </div>
  
      <ul class="todo-list">
        <li v-for="(todo, index) in myTodos" :key="todo.id" :class="{ completed: todo.completed }" @click="myToggleTodo(index)">
          {{ todo.text }}
          <button @click="myRemoveTodo(index)" class="delete-button">删除</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useTodoStore } from '../stores/useTodo';
  const todoStore = useTodoStore();
  const newTodoText = ref('');
  
  const myAddTodo = () => {
    if (newTodoText.value.trim()) {
      todoStore.addTodo(newTodoText.value);
      newTodoText.value = '';
    }
  };
  
  const myRemoveTodo = (index: number) => {
    todoStore.removeTodo(index);
  };
  
  const myToggleTodo = (index: number) => {
    todoStore.toggleTodo(index);
  };
  
  const myTodos = todoStore.todos;
  </script>
  
  <style scoped>
  .todo-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .input-group {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .add-button {
    padding: 10px 15px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .add-button:hover {
    background-color: #218838;
  }
  
  .todo-list {
    list-style-type: none;
    padding: 0;
  }
  
  .todo-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  
  .completed {
    text-decoration: line-through;
    color: red;
  }
  
  .delete-button {
    padding: 5px 10px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .delete-button:hover {
    background-color: #c82333;
  }
  </style>
  