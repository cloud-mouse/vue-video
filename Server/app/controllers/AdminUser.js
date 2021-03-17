const AdminUser = require('../models/AdminUser')
const Permission = require('../models/Permission')

const bcrypt = require('bcryptjs')
const { JWT_SECRET } = require('../../config')
const jwt = require('jsonwebtoken')


const getPermission_name = async(itemArr, p_name, p_arr)=>{
  itemArr.map(async(child)=>{
    if(p_arr.indexOf(`${child._id}`)> -1) {
      p_name.push(child.name)
    }
    if(child.children){
      await getPermission_name(child.children, p_name, p_arr)
    }
  })
}

module.exports = {
  // admin用户注册
  async register(req, res, next) {
    const { username, password } = req.body
    const user = await AdminUser.findOne({ username: username })
    if (user) {
      return res.send({ code: 422, msg: '用户已注册' })
    }
    if(password.length<6) {
      return res.send({code: 422, msg: '密码长度最低6位'})
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
    const user = await AdminUser.findOne({ username: username }).select('password').select('status')
    if (!user) {
      return res.send({ code: 422, msg: '用户不存在' })
    }
    if(user.status !== '1') {
      return res.send({ code: 422, msg: '用户已被禁用，请联系管理员'})
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
  // 获取管路员列表
  async getList(req, res, next) {
    let { keywords, currentPage, pageSize, id } = req.query
    const reg = new RegExp(keywords, 'i') //不区分大小写
    let query = {
      $or: [{
        username: { $regex: reg }
      }]
    }
    let user,count = 0
    if (id) {
      user = await AdminUser.findById({ _id: id }).populate('role')
      if (!user) return res.send({ code: 422, msg: '用户信息不存在' })
      res.send({ code: 200, msg: '获取成功', data: user })
    } else {
      user = await AdminUser.find(query).skip((currentPage - 1) * pageSize).sort({sort:-1}).limit(pageSize * 1).lean().populate('role')
      count = await AdminUser.countDocuments(query)  // 计数
      if (!user) return res.send({ code: 422, msg: '获取失败' })
      res.send({ code: 200, msg: '获取成功', data: {list:user, count: count} })
    }
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
  // 删除
  async updateOne(req, res, next) {
    let body = req.body
    try {
      let result = await AdminUser.findByIdAndUpdate(body._id, body)
      if (!result) return res.send({ code: 422, msg: '未找到用户' })
      res.send({ code: 200, msg: '修改成功', data: result })
    } catch (error) {
      res.send({ code: 422, msg: error })
    }
  },
  // 获取用户信息
  async userInfo(req, res, next) {
    const user_id = req.user_id
    const user = await AdminUser.findById({ _id: user_id }).populate('role').lean()

    const permissionList = await Permission.find()
    var role_permission = user.role? user.role.permission.split(',') : user.role = {permission: []}
    var p_name = []
    await getPermission_name(permissionList, p_name, role_permission)
    user.permission_name = p_name

    if (!user) return res.send({ code: 422, msg: '用户信息不存在' })
    res.send({ code: 200, msg: '获取成功', data: user })
  },
  
}