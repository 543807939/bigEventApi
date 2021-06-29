// 导入数据库处理模块
const db = require('../db/index')
// 加密密码
const bcrypt = require('bcryptjs')
// 获取用户信息
module.exports.getUserInfo = (req, res) => {
    let sqlStr = 'select id, username,nickname,email,user_pic from ev_users where id = ?'
    db.query(sqlStr, req.user.id, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.length !== 1) {
            res.cc('获取用户信息失败!')
        }
        res.send({
            status: 0,
            message: '获取用户信息成功!',
            data: result[0]
        })
    })
}

// 更新用户信息
module.exports.updateUserInfo = (req, res) => {
    let user = req.body
    console.log(user);
    let sqlStr = 'update ev_users set ? where id = ?'
    db.query(sqlStr, [user, user.id], (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.affectedRows === 1) {
            res.send({
                status: 0,
                message: '更新信息成功!'
            })
        } else {
            res.cc('更新用户信息失败!')
        }
    })
}

// 重置密码的处理函数
module.exports.updatePassword = (req, res) => {
    let sql = 'select * from ev_users where id = ?'
    db.query(sql, req.user.id, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.length !== 1) {
            return res.cc('查询失败!')
        }
        // 判断提交的旧密码是否正确 旧密码加密之后与数据库存储的密码是否一致
        let compareResult = bcrypt.compareSync(req.body.oldPwd, result[0].password)
        if (!compareResult) {
            return res.cc('旧密码错误!')
        }
        // 如果一致 则更新密码

        let sqlUpdate = 'update ev_users set password = ? where id = ?'
        db.query(sqlUpdate, [bcrypt.hashSync(req.body.newPwd, 10), req.user.id], (err, result) => {
            if (err) {
                return res.cc(err)
            }
            if (result.affectedRows !== 1) {
                return res.cc('修改失败!')
            }
            res.send({
                status: 0,
                message: '修改密码成功!'
            })
        })
    })
}

// 更换头像的处理函数
module.exports.updateAvater = function (req, res) {
    let sql = 'update ev_users set user_pic = ? where id = ?'
    db.query(sql, [req.body.avatar, req.user.id], (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.affectedRows !== 1) {
            return res.cc('更换用户头像失败!')
        }
        res.send({
            status: 0,
            message: '更换用户头像成功!'
        })
    })
}