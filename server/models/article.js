const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  abstract: {
    type: String,
    required: true,
  },
  bgUrl: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  classifyId: Array,
  author: {
    type: String,
    required: true,
  },
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
