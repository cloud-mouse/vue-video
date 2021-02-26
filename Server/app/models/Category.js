const mongoose = require('../db/mongodb')

const CategorySchema = new mongoose.Schema({
  // 分类名
  category_name:{
    type: String,
    unique: true,
    required: true
  },
  // 分类图片
  category_icon: {
    type: String
  },
  // 排序
  sort: {
    type: String
  },
  // 父级分类
  pid: {
    type: String
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

module.exports = mongoose.model('Category', CategorySchema)
