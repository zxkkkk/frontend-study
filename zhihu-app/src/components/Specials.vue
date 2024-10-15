<template>
    <div class="container">
        <div v-for="(item,index) in list" :key="index" class=card>
            <div class="left">
                <img :src="item.banner" alt="" />
            </div>
            <div class="right">
                <h3>{{item.title}}</h3>
                <p>
                    <span v-for="section in item.sections" :key="section.sectionId" class="section">{{section.sectionTitle}}</span>
                </p>
                <p>
                    <span class="updated">
                        {{ TimeUtils.Jh_timeStampToYMD(item.updated) }}
                    </span>
                    <span>{{item.viewCount}}次浏览</span>
                </p>
            </div>
            <span v-if="item.isFollowing === 'TRUE'" class="follow followed">已关注</span>
            <span v-else class="follow unfollow">关注</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import axios from 'axios'
import TimeUtils from '../utils/timeUtil';

interface Section{
    sectionId: number;
    specialId: number;
    sectionTitle: String;
}

interface Special{
    id: String;
    title: String;
    banner: string;
    description: String;
    isFollowing: String;
    followersCount: number;
    viewCount: number;
    updated: number;
    sections: Section[];
}
const list = ref<Special[]>([])
axios({
    url: "http://localhost:8080/api/v1/zhihu/specials",
})
.then((res) => {
    list.value = res.data.data as Special[];
    console.log(list.value);
})
.catch((err) =>{
    console.log(err);
    
})
</script>

<style scoped>
.container{
    width: 70%;
    margin: 0 auto;
}

.card{
    display: flex;
    height: 160px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    box-shadow: 10px 5px 5px #ddd;
    border-radius: 8px;
    position: relative;
}
.left{
    flex: 1;
}
.right{
    flex: 4;
    padding: 10px;
}
.left img{
    width: 100%;
    height: 100%;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
}
p span{
    font-size: 13px;
    color: #333;
}
.section {
    display: inline-block;
    margin-right: 10px;
    padding: 5px 10px;
    background-color: #f0f0f0;
    border-radius: 15px;
    font-size: 0.875em;
    margin-bottom: 5px;
    color: #333;
}
.updated{
    margin-right: 20px;
}
.follow{
    position: absolute;
    right: 20px;
    top: 20px;
    padding: 5px 10px;
    font-size: 14px;
}
.followed{
    background-color: #f6f6f6;
    color: #716c6c;
}
.unfollow{
    background-color: #eff4fe;
    color: #3670ee;
}
button {
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

button:disabled,
button.disabled {
  background-color: #d6d6d6;
  color: #888;
  cursor: not-allowed;
}
</style>