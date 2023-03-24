const express = require('express')
const router = require('./router/index');  //引入路由配置
const app = express();//创建服务器

//post 请求表单数据
app.use(express.urlencoded({ extended: true }))
//静态文件托管 ----  访问：http:localhost:8989/图片.jpg
// http:localhost:8989/1644933623332-1.png
app.use(express.static('upload'))

app.use('/', router)



// 监听端口
app.listen('7878', () => {
    console.log('服务器启动啦.....');
    console.log('http://localhost:7878');
})