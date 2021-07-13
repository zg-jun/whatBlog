const mongoose = require('mongoose')

const statisticsSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
    default: '未知',
  },
  visits: {
    type: Number,
    default: 1,
  },
  datetime: {
    type: Number,
    default: () => Date.now(),
  },
  updatetime: {
    type: Number,
    default: () => Date.now(),
  },
})

// 导出文章模型
module.exports = mongoose.model('wb_statistics', statisticsSchema)
