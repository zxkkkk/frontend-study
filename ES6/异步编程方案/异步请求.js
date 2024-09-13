//使用Promise
Promise.then((data) => {
    console.log(data);
})
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        console.log('完成');
    })