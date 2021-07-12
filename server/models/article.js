const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  title: String,
  abstract: String,
  bgUrl: String,
  content: String,
  classifyId: Array,
  author: String,
  datetime: {
    type: Number,
    default: () => Date.now(),
  },
  updatetime: {
    type: Number,
    default: () => Date.now(),
  },
  views: {
    type: Number,
    default: 0,
  },
  isDel: {
    type: Number,
    default: 0,
  },
})

// 导出文章模型
module.exports = mongoose.model('wb_article', articleSchema)
