const User = require('../models/User')

const bcrypt = require('bcryptjs')
const { WEB_JWT_SECRET } = require('../../config')
const jwt = require('jsonwebtoken')

module.exports = {
  // 用户注册
  async register(req, res, next) {
    const { username, password } = req.body
    const user = await User.findOne({ username: username })
    if (user) {
      res.send({ code: 422, msg: '用户已注册' })
      return
    }
    try {
      const result = await User.create(req.body)
      if (!result) {
        return res.send({ code: 422, msg: '注册失败', data: result })
      }
      res.send({ code: 200, msg: '注册成功', data: result })
    } catch (error) {
      res.send({ code: 500, msg: '注册失败', data: error })
    }
  },
  // 登录
  async login(req, res, next) {
    const { username, password } = req.body
    const user = await User.findOne({ username: username }).select('password')
    if (!user) {
      return res.send({ code: 422, msg: '用户不存在' })
    }
    // bcrypt.compareSync 解密匹配，返回 boolean 值
    const isPasswordValid = bcrypt.compareSync(password, user.password)
    if (!isPasswordValid) {
      return res.status(422).send({ code: 422, msg: '密码无效' })
    }
    /* 
    生成 token
    jwt.sign() 接受两个参数，一个是传入的对象，一个是自定义的密钥
    */
    const token = jwt.sign({ id: String(user._id) }, WEB_JWT_SECRET)
    res.send({ code: 200, msg: '登录成功', data: { user_id: user._id, token } })
  },
  async updateOne(req, res, next) {
    let body = req.body
    try {
      let result = await User.findByIdAndUpdate(body._id, body)
      if (!result) return res.send({ code: 422, msg: '未找到用户' })
      res.send({ code: 200, msg: '修改成功', data: result })
    } catch (error) {
      res.send({ code: 422, msg: error })
    }
  },
  // 获取用户信息
  async userInfo(req, res, next) {
    const user_id = req.user_id
    const user = await User.findById({ _id: user_id })

    if (!user) return res.send({ code: 422, msg: '用户不存在' })
    res.send({ code: 200, msg: '获取成功', data: user })
  },
  
}