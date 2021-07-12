const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.json()
const fs = require('fs')
const multer = require('multer')
const jwt = require('jsonwebtoken')
// 登录校验中间件
const authMiddleware = require('../middleware/auth')
// 导入模型
const AdminUser = require('../models/adminUser')
const Article = require('../models/article')
const Classify = require('../models/classify')
const Friends = require('../models/friends')
const Statistics = require('../models/statistics')

// 不存在则创建文件
const createFolder = function (folder) {
  try {
    fs.accessSync(folder)
  } catch (e) {
    fs.mkdirSync(folder)
  }
}
const UPLOAD_PATH = './uploads'
createFolder(UPLOAD_PATH)

// 自定义上传文件的命名
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_PATH)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.' + file.originalname.split('.')[1])
  },
})
const upload = multer({ storage })

// 文章列表
router.get('/getArticle', function (req, res, next) {
  let { pageSize = 10, pageNum = 1, keyWord, cId } = req.query
  let reg = new RegExp(keyWord, 'i') //不区分大小写
  let query = { isDel: 0 }
  keyWord &&
    (query = {
      isDel: 0,
      $or: [
        //多条件，数组
        { title: { $regex: reg } },
        { abstract: { $regex: reg } },
      ],
    })
  // console.log(cId.split(','));
  cId &&
    (query = {
      isDel: 0,
      $or: [
        //多条件，数组
        { title: { $regex: reg } },
        { abstract: { $regex: reg } },
      ],
      classifyId: { $in: cId.split(',') },
    })
  Article.find(
    query,
    null,
    {
      sort: { datetime: -1 },
      skip: (pageNum - 1) * pageSize,
      limit: Number(pageSize),
    },
    function (err, data) {
      if (err)
        return res.send({
          code: -1,
          msg: '操作失败',
        })
      res.send({
        code: 0,
        msg: '操作成功',
        data,
      })
    }
  )
})

// 根据id获取文章详情
router.get('/getArticleDetail', function (req, res, next) {
  let { _id } = req.query
  Article.findOne({ _id }, function (err, data) {
    if (err)
      return res.send({
        code: -1,
        msg: '操作失败',
      })
    res.send({
      code: 0,
      msg: '操作成功',
      data,
    })
  })
})

// 热门文章
router.get('/getHotArticle', function (req, res, next) {
  Article.find(
    {},
    null,
    { sort: { views: -1 }, limit: 5 },
    function (err, data) {
      if (err)
        return res.send({
          code: -1,
          msg: '操作失败',
        })
      res.send({
        code: 0,
        msg: '操作成功',
        data,
      })
    }
  )
})

// 获取标签列表
router.get('/getClassify', function (req, res, next) {
  Classify.find({}, function (err, data) {
    if (err)
      return res.send({
        code: -1,
        msg: '操作失败',
      })
    res.send({
      code: 0,
      msg: '操作成功',
      data,
    })
  })
})

// 添加标签
router.post(
  '/addClassify',
  authMiddleware(),
  urlencodedParser,
  function (req, res, next) {
    let body = req.body
    Classify.insertMany(body, function (err) {
      if (err)
        return res.send({
          code: -1,
          msg: '操作失败',
        })
      res.send({
        code: 0,
        msg: '操作成功',
      })
    })
  }
)

// 修改浏览器量
router.put('/editViews', urlencodedParser, function (req, res, next) {
  let { _id } = req.body
  Article.findByIdAndUpdate(_id, { $inc: { views: 1 } }, function (err) {
    if (err)
      return res.send({
        code: -1,
        msg: '操作失败',
      })
    res.send({
      code: 0,
      msg: '操作成功',
    })
  })
})

// 管理员列表
router.get(
  '/getAdminUser',
  authMiddleware(),
  urlencodedParser,
  function (req, res, next) {
    let { username } = req.query
    let reg = new RegExp(username, 'i') //不区分大小写
    let query = { username: { $regex: reg } }
    AdminUser.find(
      query,
      null,
      { sort: { datetime: -1 } },
      function (err, data) {
        if (err)
          return res.send({
            code: -1,
            msg: '操作失败',
          })
        res.send({
          code: 0,
          msg: '操作成功',
          data,
        })
      }
    )
  }
)

// 添加管理员
router.post(
  '/addAdminUser',
  authMiddleware(),
  urlencodedParser,
  function (req, res, next) {
    let body = req.body
    AdminUser.insertMany(body, function (err) {
      if (err)
        return res.send({
          code: -1,
          msg: '操作失败',
        })
      res.send({
        code: 0,
        msg: '操作成功',
      })
    })
  }
)

// 编辑管理员
router.put(
  '/editAdminUser',
  authMiddleware(),
  urlencodedParser,
  function (req, res, next) {
    let { _id } = req.body
    let data = req.body
    delete data._id
    AdminUser.findByIdAndUpdate(_id, { $set: data }, function (err) {
      if (err)
        return res.send({
          code: -1,
          msg: '操作失败',
        })
      res.send({
        code: 0,
        msg: '操作成功',
      })
    })
  }
)

// 删除管理员
router.delete('/delAdminUser', authMiddleware(), function (req, res, next) {
  let { _id } = req.query
  AdminUser.findByIdAndRemove(_id, function (err) {
    if (err)
      return res.send({
        code: -1,
        msg: '操作失败',
      })
    res.send({
      code: 0,
      msg: '操作成功',
    })
  })
})

// 管理员登录
router.post('/adminLogin', urlencodedParser, function (req, res, next) {
  let { username, password } = req.body
  AdminUser.findOne({ username, password, isDel: 0 }, function (err, data) {
    if (err)
      return res.send({
        code: -1,
        msg: '登录失败',
      })
    if (!data)
      return res.send({
        code: -1,
        msg: '账号或密码错误，请重试',
      })
    res.send({
      code: 0,
      msg: '登录成功',
      token: jwt.sign({ id: data._id }, 'whatblog_jwt'),
    })
  })
})

// 所有文章列表
router.get('/getAllArticle', authMiddleware(), function (req, res, next) {
  let { title } = req.query
  let reg = new RegExp(title, 'i') //不区分大小写
  let query = { title: { $regex: reg } }
  Article.find(query, null, { sort: { datetime: -1 } }, function (err, data) {
    if (err)
      return res.send({
        code: -1,
        msg: '操作失败',
      })
    res.send({
      code: 0,
      msg: '操作成功',
      data,
    })
  })
})

// 添加文章
router.post(
  '/addArticle',
  authMiddleware(),
  urlencodedParser,
  function (req, res, next) {
    let body = req.body
    Article.insertMany(body, function (err) {
      if (err)
        return res.send({
          code: -1,
          msg: '操作失败',
        })
      res.send({
        code: 0,
        msg: '操作成功',
      })
    })
  }
)

// 编辑文章
router.put(
  '/editArticle',
  authMiddleware(),
  urlencodedParser,
  function (req, res, next) {
    let { _id } = req.body
    let data = req.body
    delete data.id
    Article.findByIdAndUpdate(
      _id,
      { $set: { ...data, updatetime: Date.now() } },
      function (err) {
        if (err)
          return res.send({
            code: -1,
            msg: '操作失败',
          })
        res.send({
          code: 0,
          msg: '操作成功',
        })
      }
    )
  }
)

// 删除文章
router.delete('/delArticle', authMiddleware(), function (req, res, next) {
  let { _id } = req.query
  Article.findByIdAndRemove(_id, function (err) {
    if (err)
      return res.send({
        code: -1,
        msg: '操作失败',
      })
    res.send({
      code: 0,
      msg: '操作成功',
    })
  })
})

// 上传单文件
router.post(
  '/uploadFile',
  authMiddleware(),
  upload.single('file'),
  function (req, res, next) {
    res.send({
      code: 0,
      url: `${req.headers.origin}/images/${req.file.filename}`,
      msg: '上传成功',
    })
  }
)

// 添加友链
router.post(
  '/addFriends',
  authMiddleware(),
  urlencodedParser,
  function (req, res, next) {
    let body = req.body
    Friends.insertMany(body, function (err) {
      if (err)
        return res.send({
          code: -1,
          msg: '操作失败',
        })
      res.send({
        code: 0,
        msg: '操作成功',
      })
    })
  }
)

// 编辑友链
router.put(
  '/editFriends',
  authMiddleware(),
  urlencodedParser,
  function (req, res, next) {
    let { _id } = req.body
    let data = req.body
    delete data.id
    Friends.findByIdAndUpdate(_id, { $set: data }, function (err) {
      if (err)
        return res.send({
          code: -1,
          msg: '操作失败',
        })
      res.send({
        code: 0,
        msg: '操作成功',
      })
    })
  }
)

// 友链列表
router.get('/getFriends', urlencodedParser, function (req, res, next) {
  let { name } = req.query
  let reg = new RegExp(name, 'i') //不区分大小写
  let query = { name: { $regex: reg } }
  Friends.find(query, null, { sort: { datetime: -1 } }, function (err, data) {
    if (err)
      return res.send({
        code: -1,
        msg: '操作失败',
      })
    res.send({
      code: 0,
      msg: '操作成功',
      data,
    })
  })
})

// 删除友链
router.delete('/delFriends', authMiddleware(), function (req, res, next) {
  let { _id } = req.query
  Friends.findByIdAndRemove(_id, function (err) {
    if (err)
      return res.send({
        code: -1,
        msg: '操作失败',
      })
    res.send({
      code: 0,
      msg: '操作成功',
    })
  })
})

// 统计列表
router.get('/getStatistics', urlencodedParser, function (req, res, next) {
  Statistics.find({}, null, { sort: { datetime: -1 } }, function (err, data) {
    if (err)
      return res.send({
        code: -1,
        msg: '操作失败',
      })
    res.send({
      code: 0,
      msg: '操作成功',
      data,
    })
  })
})

// 添加统计
router.put('/addStatistics', urlencodedParser, function (req, res, next) {
  let body = req.body
  let { ip } = body

  Statistics.findOne({ ip }, function (err, data) {
    if (err)
      return res.send({
        code: -1,
        msg: '操作失败',
      })

    // 检测是否有该IP
    if (data) {
      Statistics.findByIdAndUpdate(
        data._id,
        { $inc: { visits: 1 }, $set: { updatetime: Date.now() } },
        function (err) {
          if (err)
            return res.send({
              code: -1,
              msg: '操作失败',
            })
          res.send({
            code: 0,
            msg: '操作成功',
          })
        }
      )
    } else {
      Statistics.insertMany(body, function (err) {
        if (err)
          return res.send({
            code: -1,
            msg: '操作失败',
          })
        res.send({
          code: 0,
          msg: '操作成功',
        })
      })
    }
  })
})

module.exports = router
