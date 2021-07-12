const mongoose = require('mongoose')

const statisticsSchema = new mongoose.Schema({
  ip: String,
  address: String,
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
