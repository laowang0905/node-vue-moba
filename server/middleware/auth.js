const login = require("../models/Admin")
const jwt = require('jsonwebtoken')
const assert = require('http-assert')
module.exports = (options = {}) => {
  return async (req, res, next) => {
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 422, 'useless token')
    // 使用jwt确认token加密的数据
    const {
      id
    } = jwt.verify(token, req.app.get('secret'))
    console.log(id);
    assert(id, 422, 'useless token')
    req.user = login.findById(id)
    assert(req.user, 422, '用户不存在')
    next()
  }
}