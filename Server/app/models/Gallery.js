const mongoose = require('../db/mongodb')

const GallerySchema = new mongoose.Schema({
  name: String,
  filename: {
    type: String,
    unique: true,
    required: true
  },
  path: String,
  path_src: String,
  type: String,
  galleryClass: {
    type: String,
    default: '0',
    required: true
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

const GalleryClassSchema = new mongoose.Schema({
  name: String,
  pid: {
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

// 图库模型
const Gallery = mongoose.model('Gallery', GallerySchema)
// 图库分类模型
const GalleryClass = mongoose.model('GalleryClass', GalleryClassSchema)

module.exports = {
  Gallery,
  GalleryClass
}