const express = require('express')
const router = express.Router()

// 导入路由处理模块
const routerHandler = require('../router_handler/article')

// 导入multer和path模块
const multer = require('multer')
const path = require('path')

// 创建multer实例
const upload = multer({
    dest: path.join(__dirname, '../uploads')
})
// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 引入验证模块
const { add_article_schema } = require('../schema/article')

// 发布新文章的路由
// upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
// 将文件类型的数据，解析并挂载到 req.file 属性中
// 将文本类型的数据，解析并挂载到 req.body 属性中
router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), routerHandler.addArticle)

// 获取文章列表的路由
router.get('/list', routerHandler.getArticleList)

// 根据id删除文章
router.get('/deleteArticle/:id', routerHandler.deleteArticle)

// 导出路由对象
module.exports = router