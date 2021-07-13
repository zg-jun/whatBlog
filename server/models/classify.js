const mongoose = require('mongoose')

const classifySchema = new mongoose.Schema({
  classifyName: {
    type: String,
    required: true,
  },
})

// 导出分类模型
module.exports = mongoose.model('wb_classify', classifySchema)
