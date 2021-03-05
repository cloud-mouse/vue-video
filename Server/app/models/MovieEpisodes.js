const mongoose = require('../db/mongodb')

const MovieEpisodesSchema = new mongoose.Schema({
  // 名称
  name:{
    type: String,
    required: true
  },
  url: String,
  index: {
    type: Number,
    default: 0
  },
  movie_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
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

module.exports = mongoose.model('MovieEpisodes', MovieEpisodesSchema)
