const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.json();
// 导入模型
const Article = require('../models/article');
const Classify = require('../models/classify');

// 获取web端文章列表
router.get('/getArticle', function (req, res, next) {
  Article.find({ isDel: 0 }, null, { sort: { datetime: -1 } }, function (err, data) {
    if (err) return res.send({
      code: -1,
      msg: '查询文章失败',
    });
    res.send({
      code: 0,
      msg: '查询文章成功',
      data
    });
  })
})
// 根据id获取文章详情
router.get('/getArticleDetail', function (req, res, next) {
  let { _id } = req.query;
  Article.findOne({ _id, isDel: 0 }, function (err, data) {
    if (err) return res.send({
      code: -1,
      msg: '查询详情失败',
    });
    res.send({
      code: 0,
      msg: '查询详情成功',
      data
    });
  })
})
// 获取分类列表
router.get('/getClassify', function (req, res, next) {
  Classify.find({}, function (err, data) {
    if (err) return res.send({
      code: -1,
      msg: '查询分类失败',
    });
    res.send({
      code: 0,
      msg: '查询分类成功',
      data
    });
  })
})
// 添加分类
router.post('/addClassify', urlencodedParser, function (req, res, next) {
  let body = req.body;
  Classify.insertMany(body, function (err) {
    if (err) return res.send({
      code: -1,
      msg: '添加分类失败',
    })
    res.send({
      code: 0,
      msg: '添加分类成功',
    });
  })
})

module.exports = router;