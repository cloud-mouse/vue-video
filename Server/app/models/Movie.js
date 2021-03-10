// 影视模型、
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
  movie_class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MovieClass',
  },
  movie_type: {
    type: String
  },
  movie_genres: {
    type: String
  },
  year: {
    type: String
  },
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
    type: Number,
    default: 0
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
