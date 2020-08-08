const mongoose = require('mongoose');

const adminUserSchema = new mongoose.Schema({
  username: String,
  password: String,
  isDisable: {
    type: Number,
    default: 0
  },
  datetime: {
    type: Date,
    default: Date.now
  }
})

// 导出文章模型
module.exports = mongoose.model('wb_admin_users', adminUserSchema);