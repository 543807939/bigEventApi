const Joi = require('joi')

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */
// 用户名的验证规则
const username = Joi.string().alphanum().min(1).max(10).required()
// 密码的验证规则
const password = Joi
    .string()
    .pattern(/^[\S]{6,12}$/)
    .required()

// 注册和登录表单的验证规则对象
module.exports.reg_login_schema = {
    // 表示需要对 req.body 中的数据进行验证
    body: {
        username,
        password,
    },
}

// id的验证规则
const id = Joi.number().integer().min(1).required()
const nickname = Joi.string().min(1).max(8).required()
const email = Joi.string().email().required()

module.exports.update_userinfo = {
    body: {
        id, nickname, email
    }
}

// 修改密码的规则
module.exports.update_password = {
    body: {
        oldPwd: password,
        newPwd: Joi.not(Joi.ref('oldPwd')).concat(password)
    }
}