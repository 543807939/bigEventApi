// 引入数据库模块
const db = require('../db')

// 获取分类列表的处理函数
module.exports.getCates = (req, res) => {
    let sql = 'select * from ev_article_cate where is_delete = 0 order by id asc'
    db.query(sql, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        res.send({
            status: 0,
            message: '获取文章分类列表成功!',
            data: result
        })
    })
}

// 新增文章分类的处理函数
module.exports.addCates = (req, res) => {
    let sql = 'select * from ev_article_cate where name = ? or alias = ?'
    db.query(sql, [req.body.name, req.body.alias], (err, result) => {
        if (err) {
            return res.cc('查询失败!')
        }
        if (result.length == 2) {
            return res.cc('分类名称和分类别名都被占用了!')
        }
        if (result.length == 1 && req.body.name == result[0].name && req.body.alias == result[0].alias) {
            return res.cc('分类名称和分类别名都被占用了!')
        }
        if (result.length == 1 && req.body.name == result[0].name) {
            return res.cc('分类名称被占用了!')
        }
        if (result.length == 1 && req.body.alias == result[0].alias) {
            return res.cc('分类别名被占用了!')
        }
        // 分类名与分类别名都可以使用
        if (result.length == 0) {
            let sqlAddCate = 'insert into ev_article_cate set ?'
            db.query(sqlAddCate, req.body, (err, result) => {
                if (err) {
                    return res.cc(err)
                }
                if (result.affectedRows !== 1) {
                    return res.cc('插入失败!')
                }
                res.send({
                    status: 0,
                    message: '插入成功!'
                })
            })
        }
    })
}

// 根据id删除文章分类的处理函数
module.exports.deletecate = (req, res) => {
    let sql = 'update ev_article_cate set is_delete = 1 where id = ?'
    db.query(sql, req.body.id, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.affectedRows !== 1) {
            return res.cc('删除分类失败!')
        }
        res.send({
            status: 0,
            message: '删除文章分类成功!'
        })
    })
}

// 根据id获取文章分类
module.exports.getCate = (req, res) => {
    let sql = 'select * from ev_article_cate where id=?'
    db.query(sql, req.params.id, (err, result) => {
        if (err) {
            res.cc(err)
        }
        if (result.length !== 1) {
            res.cc('获取文章分类数据失败!')
        }

        res.send({
            status: 0,
            message: '查询成功!',
            data: result[0]
        })
    })
}

// 根据id更新分类数据的处理函数
module.exports.updateCate = (req, res) => {
    // 定义sql语句 
    let sqlQuery = 'select * from ev_article_cate where id != ? and (name = ? or alias = ?)'
    db.query(sqlQuery, [req.body.id, req.body.name, req.body.alias], (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.length == 2) {
            return res.cc('分类名称和分类别名都被占用了!')
        }
        if (result.length == 1 && req.body.name == result[0].name && req.body.alias == result[0].alias) {
            return res.cc('分类名称和分类别名都被占用了!')
        }
        if (result.length == 1 && req.body.name == result[0].name) {
            return res.cc('分类名称被占用了!')
        }
        if (result.length == 1 && req.body.alias == result[0].alias) {
            return res.cc('分类别名被占用了!')
        }
        // 可以使用
        let sqlUpdate = 'update ev_article_cate set ? where id = ?'
        db.query(sqlUpdate, [req.body, req.body.id], (err, result) => {
            if (err) {
                return res.cc(err)
            }
            if (result.affectedRows !== 1) {
                return res.cc('更新文章分类失败')
            }
            res.send({
                status: 0,
                message: '更新文章分类成功!'
            })
        })
    })
}