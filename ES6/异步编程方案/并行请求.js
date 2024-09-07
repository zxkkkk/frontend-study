var promise1,promise2 = new Promise()
Promise.all({
    promise1,
    promise2
}).then(([res1, res2]) => {
    console.log(res1,res2);
})
Promise.race({
    promise1,
    promise2
}).then((res) =>{
    console.log(res);
})