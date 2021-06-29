const db = require('../db/index')

module.exports.addArticle = (req, res) => {
    if(!req.file||req.file.fieldname !== 'cover_img'){
        return res.cc('文章封面为必填属性!')
    }
    // 数据合法 可以进行下一步操作
}