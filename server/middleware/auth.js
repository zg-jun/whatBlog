module.exports = options => {
  const jwt = require('jsonwebtoken');
  const AdminUser = require('../models/adminUser');

  return async (req, res, next) => {
    // 是否携带token
    const token = String(req.headers.authorization || '').split(' ').pop();
    if(!token) return res.status(401).send({
      code: -1,
      msg: '未登录，请先登录！'
    });
    // 带token验证
    try{
      const { id } = jwt.verify(token, 'whatblog_jwt');
      let data = await AdminUser.findById(id);
      if(!data) return res.status(401).send({
        code: -1,
        msg: '验证失败，请重新登录！'
      });
    }
    catch(err) {
     return res.status(401).send({
        code: -1,
        msg: '验证异常，请重新登录！'
      });
    }
    await next();
  };
}