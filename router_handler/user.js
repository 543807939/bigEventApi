const db = require('../db/index')
// 引入bcryptj加密
const bcrypt = require('bcryptjs')
// 引入jwt生成token
const jwt = require('jsonwebtoken')
// 引入config.js
const config = require('../config/config')
// 注册新用户的处理函数
module.exports.registerUser = (req, res) => {
    // 获取用户提交的表单信息
    let userInfo = req.body
    if (!userInfo.username || !userInfo.password) {
        // return res.send({
        //     status: 1,
        //     message: '用户名或密码不合法'
        // })
        return res.cc('用户名或密码不合法')
    }
    // 定义查询的sql语句
    let sql = 'select * from ev_users where username = ?'
    db.query(sql, userInfo.username, (err, result) => {
        if (err) {
            // return res.send({
            //     status: 1,
            //     message: err.message
            // })
            return res.cc(err)
        }
        // 如果查询结果的长度大于0 说明用户名已被占用
        if (result.length > 0) {
            // return res.send({
            //     status: 1,
            //     message: '用户名已被占用,请选择其他用户名!'
            // })
            return res.cc('用户名已被占用,请选择其他用户名!')
        }
        // 用户名可用
        //  使用bcrypt加密密码
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)
        // 将用户信息插入到ev_users表中
        let sqlInsert = 'insert into ev_users set ?'
        db.query(sqlInsert, {
            username: userInfo.username,
            password: userInfo.password
        }, (err, result) => {
            if (err) {
                // return res.send(err.message)
                return res.cc(err)
            }
            if (result.affectedRows === 1) {
                // res.send({
                //     status: 0,
                //     message: '注册成功'
                // })
                res.cc('注册成功', 0)
            }
        })
    })
}

// 登录的处理函数
module.exports.login = (req, res) => {
    let userInfo = req.body
    let sqlStr = 'select * from ev_users where username = ?'
    db.query(sqlStr, userInfo.username, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.length !== 1) {
            console.log(result.length);
            return res.cc('账户不存在')
        }
        // 账户存在
        // 判断加密后的密码和数据库的密码是否一致
        let compareResult = bcrypt.compareSync(userInfo.password, result[0].password)
        if (!compareResult) {
            return res.cc('密码错误')
        }
        // 密码正常
        // 获取用户信息,并将密码和头像去掉
        let user = { ...result[0], password: '', user_pic: '' }
        let token = jwt.sign(user, config.jwtSecretKey, { expiresIn: '10h' })
        res.send({
            status: 0,
            message: '登陆成功! ',
            token: 'Bearer ' + token
        })
    })
}