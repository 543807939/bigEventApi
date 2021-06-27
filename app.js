// 引入express
const express = require('express')
// 创建服务器实例
const app = express()

// 解决跨域问题 
const cors = require('cors')
app.use(cors())
// 解析post表单数据  只能解析application/x-www-form-urlencoded格式的数据
app.use(express.urlencoded({
    extended: false
}))
// 封装res.cc函数 作为中间件
app.use(function (req, res, next) {
    // status 默认值为1 表示失败的情况
    // err的值可能是一个错误对象,也可能是一个错误信息描述的字符串
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})
// 引入并使用user的路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)
// 开启服务器
app.listen(80, () => {
    console.log(`epxress service running at http://127.0.0.1`);
})