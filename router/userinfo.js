const express = require('express')
const router = express.Router()

// 导入路由处理函数模块
const userInfoHandler = require('../router_handler/userinfo')

// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { update_userinfo, update_password } = require('../schema/user')

// 获取用户信息
router.get('/userinfo', userInfoHandler.getUserInfo)

// 更新用户信息
router.post('/userinfo', expressJoi(update_userinfo), userInfoHandler.updateUserInfo)

// 重置密码
router.post('/updatepwd', expressJoi(update_password), userInfoHandler.updatePassword)
module.exports = router