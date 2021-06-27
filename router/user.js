const express = require('express')
const router = express.Router()

// 引入user的处理函数
const userHandler = require('../router_handler/user')

router.post('/register', userHandler.registerUser)
router.post('/login',userHandler.login)
module.exports = router