const mongoose = require('mongoose')

const friendsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  state: {
    type: Number,
    default: 0, //0通过，-1未通过
  },
  datetime: {
    type: Number,
    default: () => Date.now(),
  },
})

// 导出文章模型
module.exports = mongoose.model('wb_friends', friendsSchema)
