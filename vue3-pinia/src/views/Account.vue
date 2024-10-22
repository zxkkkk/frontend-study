<template>
  <div class="account-container">
    <h2>记账应用</h2>
    <div class="input-group">
      <input v-model="description" placeholder="描述" class="input" />
      <input v-model="amount" type="number" placeholder="金额" class="input" />
      <select v-model="type" class="input">
        <option value="income">收入</option>
        <option value="expense">支出</option>
      </select>
      <button @click="addRecord" class="add-button">添加记录</button>
    </div>
    <table class="transaction-table">
      <thead>
        <tr>
          <th>描述</th>
          <th>金额</th>
          <th>类型</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in accountStore.transactions" :key="transaction.id">
          <td>{{ transaction.description }}</td>
          <td>{{ transaction.amount }}</td>
          <td>{{ transaction.type === 'income' ? '收入' : '支出' }}</td>
          <td><button @click="deleteRecord(transaction.id)" class="delete-button">删除</button></td>
        </tr>
      </tbody>
    </table>
    <div class="totals">
      <p>总收入: {{ accountStore.totalIncome }}</p>
      <p>总支出: {{ accountStore.totalExpense }}</p>
      <p>当前余额: {{ accountStore.currentBalance }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAccountStore } from '../stores/useAccountStore';

const accountStore = useAccountStore();
const description = ref('');
const amount = ref(0);
const type = ref<'income' | 'expense'>('income');

const addRecord = () => {
  if (description.value.trim() && !isNaN(Number(amount.value))) {
    accountStore.addTransaction(description.value, Number(amount.value), type.value);
    description.value = '';
    amount.value = 0;
  } else {
    alert('请输入有效的描述和金额');
  }
};

const deleteRecord = (id: number) => {
  accountStore.deleteTransaction(id);
};
</script>

<style scoped>
.account-container {
  max-width: 600px;
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

.transaction-table {
  width: 100%;
  border-collapse: collapse;
}

.transaction-table th,
.transaction-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.transaction-table th {
  background-color: #f2f2f2;
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

.totals {
  margin-top: 20px;
  font-weight: bold;
}
</style>
