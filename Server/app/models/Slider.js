const mongoose = require('../db/mongodb')

const SliderSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  path:{
    type: String,
    required: true
  },
  link: {
    type: String
  },
  sort: {
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

module.exports = mongoose.model('Slider', SliderSchema)
