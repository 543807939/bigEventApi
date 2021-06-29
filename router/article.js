const express = require('express')
const router = express.Router()

router.post('/add', (req, res) => {
    res.send('okkkkk')
})

// 导出路由对象
module.exports = router