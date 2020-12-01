const mongoose = require('mongoose');

const viewSchema = new mongoose.Schema({
  views: {
    type: Number,
    default: 0
  },
  datetime: {
    type: Number,
    default:() => Date.now()
  }
})

// 导出文章模型
module.exports = mongoose.model('wb_view', viewSchema);