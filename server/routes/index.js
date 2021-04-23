const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.json();
const fs = require('fs');
const multer = require('multer');
const jwt = require('jsonwebtoken');
// 登录校验中间件
const authMiddleware = require('../middleware/auth');
// 导入模型
const AdminUser = require('../models/adminUser');
const Article = require('../models/article');
const Classify = require('../models/classify');
const Friends = require('../models/friends');

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

// 文章列表 
router.get('/getArticle', function (req, res, next) {
  let { pageSize=10, pageNum=1, keyWord, cId } = req.query;
  let reg = new RegExp(keyWord, 'i') //不区分大小写
  let query = {};
  keyWord && (query={ 
    isDel: 0 ,
    $or : [ //多条件，数组
      {title : {$regex : reg}},
      {abstract : {$regex : reg}}
    ],
  });
  // console.log(cId.split(','));
  cId && (query={ 
    isDel: 0 ,
    $or : [ //多条件，数组
      {title : {$regex : reg}},
      {abstract : {$regex : reg}}
    ],
    classifyId:{$in:cId.split(',')}
  });
  Article.find(query, null, { sort: { datetime: -1 },skip:(pageNum-1) * pageSize,limit: Number(pageSize) }, function (err, data) {
    if (err) return res.send({
      code: -1,
      msg: '操作失败',
    });
    res.send({
      code: 0,
      msg: '操作成功',
      data
    });
  })
})

// 根据id获取文章详情
router.get('/getArticleDetail', function (req, res, next) {
  let { _id } = req.query;
  Article.findOne({ _id }, function (err, data) {
    if (err) return res.send({
      code: -1,
      msg: '操作失败',
    });
    res.send({
      code: 0,
      msg: '操作成功',
      data
    });
  })
});

// 获取分类列表
router.get('/getClassify', function (req, res, next) {
  Classify.find({}, function (err, data) {
    if (err) return res.send({
      code: -1,
      msg: '操作失败',
    });
    res.send({
      code: 0,
      msg: '操作成功',
      data
    });
  })
});

// 添加分类
router.post('/addClassify', urlencodedParser, function (req, res, next) {
  let body = req.body;
  Classify.insertMany(body, function (err) {
    if (err) return res.send({
      code: -1,
      msg: '操作失败',
    })
    res.send({
      code: 0,
      msg: '操作成功',
    });
  })
});

// 修改浏览器量
router.put('/editViews', urlencodedParser, function (req, res, next) {
  let { _id } = req.body;
  Article.findByIdAndUpdate(_id, { $inc: { views: 1 } }, function (err) {
    if (err) return res.send({
      code: -1,
      msg: '操作失败',
    });
    res.send({
      code: 0,
      msg: '操作成功'
    });
  })
});

// 管理员列表
router.get('/getAdminUser', authMiddleware(), urlencodedParser, function (req, res, next) {
  AdminUser.find({}, function (err, data) {
    if (err) return res.send({
      code: -1,
      msg: '操作失败',
    });
    res.send({
      code: 0,
      msg: '操作成功',
      data
    });
  })
});

// 管理员登录
router.post('/adminLogin', urlencodedParser, function (req, res, next) {
  let { username, password } = req.body;
  AdminUser.findOne({ username, password }, function (err, data) {
    if (err) return res.send({
      code: -1,
      msg: '登录失败',
    });
    if (!data) return res.send({
      code: -1,
      msg: '账号或密码错误，请重试'
    });
    res.send({
      code: 0,
      msg: '登录成功',
      token: jwt.sign({ id: data._id }, 'whatblog_jwt')
    });
  })
});

// 所有文章列表
router.get('/getAllArticle', authMiddleware(), function (req, res, next) {
  Article.find({}, null, { sort: { datetime: -1 } }, function (err, data) {
    if (err) return res.send({
      code: -1,
      msg: '操作失败',
    });
    res.send({
      code: 0,
      msg: '操作成功',
      data
    });
  })
})

// 添加文章
router.post('/addArticle', authMiddleware(), urlencodedParser, function (req, res, next) {
  let body = req.body;
  Article.insertMany(body, function (err) {
    if (err) return res.send({
      code: -1,
      msg: '操作失败',
    })
    res.send({
      code: 0,
      msg: '操作成功',
    });
  })
})

// 编辑文章
router.put('/editArticle', authMiddleware(), urlencodedParser, function (req, res, next) {
  let { _id, data } = req.body;
  Article.findByIdAndUpdate(_id, { $set: data }, function (err) {
    if (err) return res.send({
      code: -1,
      msg: '操作失败',
    })
    res.send({
      code: 0,
      msg: '操作成功',
    });
  })
})

// 删除文章
router.delete('/delArticle', authMiddleware(), function (req, res, next) {
  let { _id } = req.query;
  Article.findByIdAndRemove(_id, function (err) {
    if (err) return res.send({
      code: -1,
      msg: '操作失败',
    })
    res.send({
      code: 0,
      msg: '操作成功',
    });
  })
})

// 上传单文件
router.post('/uploadFile', authMiddleware(), upload.single('file'), function (req, res, next) {
  res.send({
    code: 0,
    url: `${req.headers.origin}/images/${req.file.filename}`,
    msg: '上传成功'
  });
})

// 添加友链
router.post('/addFriends', urlencodedParser, function (req, res, next) {
  let body = req.body;
  Friends.insertMany(body, function (err) {
    if (err) return res.send({
      code: -1,
      msg: '操作失败',
    })
    res.send({
      code: 0,
      msg: '操作成功',
    });
  })
})

// 友链列表
router.get('/getFriends', function (req, res, next) {
  Friends.find({}, null, { sort: { datetime: -1 } }, function (err, data) {
    if (err) return res.send({
      code: -1,
      msg: '操作失败',
    });
    res.send({
      code: 0,
      msg: '操作成功',
      data
    });
  })
})

module.exports = router;