const mongoose = require('../db/mongodb')

const MovieClassSchema = new mongoose.Schema({
  // 名称
  name:{
    type: String,
    required: true
  },
  // 图标
  icon: String,
  // 分类
  type: {
    type: Array
  },
  // 类型
  genres: {
    type: Array
  },
  // 描述
  description: String,
  // 排序
  sort: {
    type: Number,
    default: 0
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
