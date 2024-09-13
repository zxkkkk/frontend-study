<template>
    <div>
        <h2>{{name}}</h2>
        <h3>当前形态：{{title}}</h3>
        <button @click="changeTitle">切换形态</button>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const name = ref<string>('孙悟空')
const title = ref<string>('斗战胜佛')
const changeTitle = () =>{
    if(title.value == '齐天大圣'){
       title.value = '斗战胜佛'
    }else{
        title.value = '齐天大圣'
    }
}
</script>

<style scoped>
div {
    margin: auto;
    text-align: center;
    border-radius: 5px;
    box-shadow:  0 4px 8px rgba(0,0,0,0.1);
    padding-top: 20px;
    padding-bottom: 20px;
    width: 1000px;
}
button{
    background-color: blue;
    padding: 5px;
    color: white;
}
button:hover{
    cursor:pointer;
}
</style>