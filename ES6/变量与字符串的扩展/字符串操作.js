//判断某个字符串是否包含另一个字符串片段
// const str = 'You are the best baby.'
// console.log(str.indexOf('best'))
// console.log(str.indexOf('bst'))

//ES6 的一些新方法
// console.log(str.includes('best'))
// console.log(str.startsWith('You'))
// console.log(str.endsWith('aby.'))


//重复n次
// let str = '你是一个非常可爱的哈叽米宝宝~'
// str = str.repeat(11)
// console.log(str)

//字符串替换
// let str = 'xxx love you,yyy love you,zxk love'
// str = str.replaceAll('you','me')
// console.log(str)

//模板字符串
const title = '块级元素'
let divStr = `
    <div>
        <span>${title}</span>
    </div>
`

