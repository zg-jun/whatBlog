/*连接mongodb数据库*/
module.exports = () => {
  const mongoose = require('mongoose');

  // const DATABASE_URL = 'mongodb://127.0.0.1:27017/whatblog';//本地
  const DATABASE_URL = 'mongodb://zgj:123@127.0.0.1:27017/whatblog';//线上

  mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  mongoose.connection.once('open', function () {
    // console.log('数据库连接成功');
  });

  mongoose.connection.once('close', function () {
    console.log('数据库连接断开');
  });
}

