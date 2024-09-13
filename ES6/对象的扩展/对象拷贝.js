//浅拷贝
// let a = {name:'后端'}
// let b = a
// b.name = '前端'
// console.log(a);
// console.log(b);

//深拷贝
let obj1 = {
    name:'电影',
    category:{
        cartoon:'dm',
        kunfu:'wuxia',
        love:'aiqing'
    },
    platform:['txship','aiqiyi','youku']
}
let obj2 = JSON.parse(JSON.stringify(obj1))
obj2.category.kunfu= 'xiuxian'
obj2.platform[2] ='bilibili'
console.log(obj1.category.kunfu,obj1.platform[2]);
console.log(obj2.category.kunfu,obj2.platform[2]);

