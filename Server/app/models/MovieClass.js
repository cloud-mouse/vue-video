const mongoose = require('../db/mongodb')

const MovieClassSchema = new mongoose.Schema({
  icon: String,
  // 名称
  name:{
    type: String,
    required: true
  },
  description: String,
  // 父id 0表示顶级
  pid: {
    type: String,
    default: '0'
  },
  // 排序
  sort: {
    type: String,
    default: '0'
  },
  // 创建时间
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('MovieClass', MovieClassSchema)
