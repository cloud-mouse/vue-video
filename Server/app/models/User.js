const mongoose = require('../db/mongodb')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  // 分类名
  username:{
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    set(val){
        return bcrypt.hashSync(val, 10)
    },
    select: false
  },
  avatar: {
    type: String
  },
  phone: {
    type: String
  },
  // 真实姓名
  realName: {
    type: String
  },
  // 昵称
  nickName: {
    type: String
  },
   // 状态
  status:{
    type: String,
    default: '1'
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', UserSchema)
