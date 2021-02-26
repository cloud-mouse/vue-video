const AdminUser = require('../models/AdminUser')
const bcrypt = require('bcryptjs')
const { JWT_SECRET } = require('../../config')
const jwt = require('jsonwebtoken')

module.exports = {
  // admin用户注册
  async register(req, res, next) {
    const { username, password } = req.body
    const user = await AdminUser.findOne({ username: username })
    if (user) {
      res.send({ code: 422, msg: '用户已注册' })
      return
    }
    try {
      const result = await AdminUser.create(req.body)
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
    const user = await AdminUser.findOne({ username: username }).select('password')
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
    const token = jwt.sign({ id: String(user._id) }, JWT_SECRET)
    res.send({ code: 200, msg: '登录成功', data: { user_id: user._id, token } })
  },
  async getList(req, res, next) {
    let { id } = req.query
    let user
    if (id) {
      user = await AdminUser.findById({ _id: id }).populate('role')
      if (!user) return res.send({ code: 422, msg: '用户信息不存在' })
    } else {
      user = await AdminUser.find().populate('role')
      if (!user) return res.send({ code: 422, msg: '获取失败' })
    }
    res.send({ code: 200, msg: '获取成功', data: user })
  },
  // 删除用户
  async deleteUser(req, res, next) {
    let { id } = req.query
    if (id) {
      result = await AdminUser.findByIdAndDelete({ _id: id })
      if (!result) return res.send({ code: 422, msg: result })
      res.send({ code: 200, msg: '删除成功', data: result })
    } else {
      res.send({ code: 422, msg: '请选择用户' })
    }
  },
  // 获取用户信息
  async userInfo(req, res, next) {
    const user_id = req.user_id
    const user = await AdminUser.findById({ _id: user_id }).populate('role')
    if (!user) return res.send({ code: 422, msg: '用户信息不存在' })
    res.send({ code: 200, msg: '获取成功', data: user })
  }
}