var arrs = [1,2,3,4,5]
arrs.forEach((e) => {
    console.log(e)
})

//遍历同时，扩大2倍
let res = arrs.map((e) => {
    return e * 2
})
console.log(res);