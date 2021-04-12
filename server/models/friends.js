const mongoose = require('mongoose');

const friendsSchema = new mongoose.Schema({
  name: String,
  url: String,
  avatar:String,
  state:{
    type: Number,
    default: 0 //0通过，-1未通过
  },
  datetime: {
    type: Number,
    default:() => Date.now()
  }
})

// 导出文章模型
module.exports = mongoose.model('wb_friends', friendsSchema);