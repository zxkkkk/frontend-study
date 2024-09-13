var div = document.getElementById('div')
vardiv=document.querySelector('#div')
vardiv=document.getElementByTagName('div')[0]

// 修改属性
div.style.width='300px'
// 修改元素内容
div.innerHTML='我的 div 的内容'
// 带标签的元素内容
div.innerHTML='<span>我的 div 的内容</span>'
// 删除元素
div.remove()

// 获取父节点
varparent=document.getElementById('parent')
// 创建新节点
varspan=document.createElement('span')
// 设置 span 节点的内容
span.innerHTML='hello world'
// 把新创建的元素加入父节点
parent.appendChild(span)