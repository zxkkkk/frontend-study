// const foods = ['zj','pj','sk']
// let [a,b,c] = foods
// console.log(a)
// console.log(b)
// console.log(c)

//数组的嵌套
const foods = ['zj',['pj','sk',['kjt','kty']]]
let [a,[b1,b2,[c1,c2]]] = foods
console.log(a)
console.log(b1,b2)
console.log(c1,c2)