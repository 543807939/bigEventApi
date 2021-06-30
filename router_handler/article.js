const db = require('../db/index')
const path = require('path')
module.exports.addArticle = (req, res) => {
    console.log(req.file);
    if (!req.file || req.file.fieldname !== 'cover_img') {
        return res.cc('文章封面为必填属性!')
    }
    // 数据合法 可以进行下一步操作

    // 整理要插入数据库的信息对象
    let articleInfo = {
        ...req.body,
        cover_img: path.join('/uploads', req.file.filename),
        pub_date: new Date(),
        author_id: req.user.id
    }
    // 将整理好的数据存储到数据库
    let sql = 'insert into ev_articles set ?'
    db.query(sql, articleInfo, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        let str = articleInfo.state == '草稿' ? '草稿' : '发布'
        if (result.affectedRows !== 1) {
            res.cc(`发布${str}失败!`)
        }
        res.send({
            status: 0,
            message: `发布${str}成功!`
        })
    })
}

// 获取文章列表的处理函数
module.exports.getArticleList = (req, res) => {
    // 定义sql语句
    let sql = 'select * from ev_articles'
    db.query(sql, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        res.send({
            status: 0,
            message: '获取文章列表成功!',
            data: result
        })
    })
}

// 根据id删除文章的处理函数
module.exports.deleteArticle = (req, res) => {
    let sql = 'update ev_articles set is_delete = 1 where id = ?'
    db.query(sql, req.params.id, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.affectedRows !== 1) {
            return res.cc('删除文章失败!')
        }
        res.send({
            status: 0,
            message: '删除文章成功!'
        })
    })
}