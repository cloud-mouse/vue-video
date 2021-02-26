const mongoose = require('../db/mongodb')

const RoleSchema = new mongoose.Schema({
  role_name:{
    type: String,
    unique: true,
    required: true
  },
  permission: {
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

module.exports = mongoose.model('Role', RoleSchema)
