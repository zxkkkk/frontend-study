import Mock from 'mockjs'

// 请求接口：https://api.zhihu.com/hot
// 返回一个包含10条数据的数组
Mock.mock('https://api.zhihu.com/hot', 'get', {
  'data|10': [
    {
      'id|+1': 1, //id自增，从1开始
      title: '@ctitle(5,10)', //随机生成中文标题，字数在5-10之间
      excerpt: '@paragraph(2,3)', //随机生成简介，段落包含2-3个句子
      url: '@url', //随机生成详情链接
      image: '@image("200x100", "#51AFB8", "#FFF", "img")', //随机生成占位图片
      hotIndex: '@integer(1000,5000)' //随机生成热度
    }
  ]
})

Mock.mock("https://api.zhihu.com/hot","post",{
    message: "添加成功",
    data: {
      id: "@integer(11,100)",
      title: '新的标题', //随机生成中文标题，字数在5-10之间
      excerpt: '新的内容', //随机生成简介，段落包含2-3个句子
      url: '@url', //随机生成详情链接
      image: 'https://www.helloimg.com/i/2024/10/08/670513635044e.jpg', //随机生成占位图片
      hotIndex: '8888' //随机生成热度
    }
})

Mock.mock(/https:\/\/api.zhihu.com\/hot\/\d+/,"put",{
  message: "更新成功",
})

Mock.mock(/https:\/\/api.zhihu.com\/hot\/\d+/,"delete",{
  message: "删除成功",
})