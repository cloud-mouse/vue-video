// 引入 jwt
const jwt = require('jsonwebtoken')
// 解析 token 用的密钥
const { JWT_SECRET } = require('../../config')
// 验证token
let checkToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.send({ code: 401, msg: '尚未登录！' })
  }
  const token = String(req.headers.authorization.split(' ').pop())
  if (!token) {
    return res.send({ code: 401, msg: 'token验证失败' })
  }
  // 解密 token 获取对应的 id
  jwt.verify(token, JWT_SECRET, async(err, decode) => {
    if (err) return res.send({ code: 401, msg: err })
    let { id } = decode
    if (!id) return res.send({ code: 401, msg: '用户身份已失效' })
    req.user_id = id
    next()
  })

}

module.exports = checkToken