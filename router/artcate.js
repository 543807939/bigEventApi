// 引入express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 引入处理函数
const artcateHandler = require('../router_handler/artcate')

// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { add_cate_schema, delete_cate_schema, update_cate_schema } = require('../schema/artcate')

// 获取文章列表
router.get('/cates', artcateHandler.getCates)

// 新增文章分类
router.post('/addcates', expressJoi(add_cate_schema), artcateHandler.addCates)

// 根据id删除文章分类
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artcateHandler.deletecate)

// 根据id获取文章分类
router.get('/cates/:id', expressJoi(delete_cate_schema), artcateHandler.getCate)

// 根据id更新文章分类数据
router.post('/updatecate', expressJoi(update_cate_schema), artcateHandler.updateCate)

// 导出路由对象
module.exports = router