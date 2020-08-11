const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.json();
const fs = require('fs');
const multer = require('multer');
// 不存在则创建文件
const createFolder = function (folder) {
  try {
    fs.accessSync(folder);
  } catch (e) {
    fs.mkdirSync(folder);
  }
}
const UPLOAD_PATH = './uploads';
createFolder(UPLOAD_PATH);

// 自定义上传文件的命名
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_PATH)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.' + file.originalname.split('.')[1])
  }
})
const upload = multer({ storage });
// 导入模型
const AdminUser = require('../models/adminUser');
const Article = require('../models/article');

// 管理员列表
router.get('/getAdminUser', urlencodedParser, function (req, res, next) {
  AdminUser.find({}, function (err, data) {
    if (err) return res.send({
      code: -1,
      msg: '获取失败',
    });
    res.send({
      code: 0,
      msg: '获取成功',
      data
    });
  })
});

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

// 获取所有文章
router.get('/getAllArticle', function (req, res, next) {
  Article.find({}, null, { sort: { datetime: -1 } }, function (err, data) {
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

// 编辑文章
router.put('/editArticle', urlencodedParser, function (req, res, next) {
  let { _id, data } = req.body;
  Article.findByIdAndUpdate(_id, { $set: data }, function (err) {
    if (err) return res.send({
      code: -1,
      msg: '编辑文章失败',
    })
    res.send({
      code: 0,
      msg: '编辑文章成功',
    });
  })
})

// 回收文章
router.put('/recoveryArticle', urlencodedParser, function (req, res, next) {
  let { _id } = req.body;
  Article.findByIdAndUpdate(_id, { $set: { isDel: 1 } }, function (err) {
    if (err) return res.send({
      code: -1,
      msg: '回收文章失败',
    })
    res.send({
      code: 0,
      msg: '回收文章成功',
    });
  })
})

// 公开文章
router.put('/showArticle', urlencodedParser, function (req, res, next) {
  let { _id } = req.body;
  Article.findByIdAndUpdate(_id, { $set: { isDel: 0 } }, function (err) {
    if (err) return res.send({
      code: -1,
      msg: '公开文章失败',
    })
    res.send({
      code: 0,
      msg: '公开文章成功',
    });
  })
})

// 删除文章
router.delete('/delArticle', function (req, res, next) {
  let { _id } = req.query;
  Article.findByIdAndRemove(_id, function (err) {
    if (err) return res.send({
      code: -1,
      msg: '删除文章失败',
    })
    res.send({
      code: 0,
      msg: '删除文章成功',
    });
  })
})

// 上传单文件
router.post('/uploadFile', upload.single('file'), function (req, res, next) {
  console.log(req.headers['X-Forwarded-For']);
  res.send({
    code: 0,
    url: `${req.headers.origin}/images/${req.file.filename}`,
    // url: `http://127.0.0.1:3000/images/${req.file.filename}`,
    msg: '上传成功'
  });
})


module.exports = router;