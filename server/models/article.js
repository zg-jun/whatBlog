const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  abstract: String,
  content: String,
  classifyId: Array,
  author: {
    type: String,
    default: 'Null'
  },
  datetime: {
    type: Date,
    default: Date.now
  },
  isDel: {
    type: Number,
    default: 0
  }
})

// 导出文章模型
module.exports = mongoose.model('wb_article', articleSchema);