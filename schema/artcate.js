const Joi = require('joi')

const artname = Joi.string().required()

const artalias = Joi.string().alphanum().required()

// 添加文章分类的验证
module.exports.add_cate_schema = {
    body: {
        name: artname,
        alias: artalias
    }
}

// 根据id删除文章分类的验证
const id = Joi.number().integer().min(1).required()

module.exports.delete_cate_schema = {
    body: {
        id
    }
}

// 根据id更新文章分类的验证
module.exports.update_cate_schema = {
    body: {
        id,
        name: artname,
        alias: artalias
    }
}