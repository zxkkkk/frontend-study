<template>
    <div class="equip">
        <h2>装备管理</h2>
        <div class="input">
            <input type="text" placeholder="请输入装备" v-model="newEquip" class="form-control">
            <button @click="addEquip" class="btn btn-primary">添加</button>
        </div>
        <div class="list">
            <div v-for="(item, index) in list" :key="index">
                <span>{{ item }}</span>
                <button @click="delEquip(index)" class="btn btn-danger">删除</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const list = ref<string[]>([]);
const newEquip = ref('');

const addEquip = () => {
    if (newEquip.value.trim()) {
        list.value.push(newEquip.value);
        newEquip.value = '';
    }
};

const delEquip = (index: number) => {
    list.value.splice(index, 1);
}
</script>

<style lang="scss" scoped>
.equip {
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.input {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.form-control {
    flex-grow: 1;
    margin-right: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    &:focus {
        outline: none;
        border-color: #007bff;
    }
}

.btn {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        opacity: 0.9;
    }
}

.btn-primary {
    background-color: #007bff;
    color: white;
}

.btn-danger {
    background-color: #dc3545;
    color: white;
}

.list {
    margin: 0;
    padding: 0;
    list-style-type: none;
}

.list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eee;
    &:last-child {
        border-bottom: none;
    }
}

.btn-sm {
    padding: 5px 10px;
    font-size: 0.8rem;
}

</style>
