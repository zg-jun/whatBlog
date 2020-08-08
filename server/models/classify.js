const mongoose = require('mongoose');

const classifySchema = new mongoose.Schema({
  classifyName: String
})

// 导出分类模型
module.exports = mongoose.model('wb_classify', classifySchema);