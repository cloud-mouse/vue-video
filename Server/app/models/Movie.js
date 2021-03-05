const mongoose = require('../db/mongodb')

const MovieSchema = new mongoose.Schema({
  // 名称
  name:{
    type: String,
    unique: true,
    required: true
  },
  // 封面
  cover: String,
  movieClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MovieClass',
  },
  // 年份
  years: String,
  // 推荐
  recommend: {
    type: String,
    default: '0'
  },
  // 是否完结
  isOver: {
    type: String,
    default: '0'
  },
  // 简介
  description: String,
  // 排序
  sort: {
    type: String,
    default: '0'
  },
  // 点击量
  pv: {
    type: Number,
    default: 0
  },
  // 创建时间
  createTime: {
    type: Date,
    default: Date.now
  },
  // 更新时间
  updateTime: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Movie', MovieSchema)
