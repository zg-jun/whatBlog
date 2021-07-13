const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  articleId: {
    type: String,
    required: true,
  },
  parentId: {
    type: String,
    required: true,
    default: 0,
  },
  content: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  nickName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  site: {
    type: String,
  },
  children: Array,
  datetime: {
    type: Number,
    default: () => Date.now(),
  },
})

// 导出文章模型
module.exports = mongoose.model('wb_comment', commentSchema)
