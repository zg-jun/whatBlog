const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.json();
// 导入模型
const AdminUser = require('../models/adminUser');
const Article = require('../models/article');

// 管理员登录
router.post('/adminLogin', urlencodedParser, function (req, res, next) {
  let { username, password } = req.body;
  AdminUser.count({ username, password }, function (err, count) {
    if (err) return res.send({
      code: -1,
      msg: '登录失败',
    });
    if (!count) return res.send({
      code: -1,
      msg: '账号或密码错误',
    });
    res.send({
      code: 0,
      msg: '登录成功'
    });
  })
});

// 添加文章
router.post('/addArticle', urlencodedParser, function (req, res, next) {
  let body = req.body;
  Article.insertMany(body, function (err) {
    if (err) return res.send({
      code: -1,
      msg: '添加文章失败',
    })
    res.send({
      code: 0,
      msg: '添加文章成功',
    });
  })
})

module.exports = router;