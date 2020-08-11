const express = require('express');
const path = require('path');
const app = express();

// 开放静态资源
app.use('/images', express.static(path.join(__dirname, '/uploads')));

// 连接数据库
require('./plugins/db')();

// 使用路由
app.use('/api', require('./routes/index'));
app.use('/backApi', require('./routes/admin'));

app.listen(3000, function () {
  console.log('server running at 127.0.0.1:3000');
})