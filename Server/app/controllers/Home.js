const Slider = require('../models/Slider')
const Movie = require('../models/Movie')
const MovieClass = require('../models/MovieClass')

// 递归查询children
const getChildren = async (item) => {
  try {
    if (item.type && item.type.length) {
      item.movieList = []
      for (let j = 0; j < item.type.length; j++) {
        let list = await Movie.find({ movie_class: item._id, movie_type: item.type[j] }).limit(10)
        item.movieList.push({
          name: item.type[j],
          list: list
        })
      }
      return item
    }
  } catch (error) {
    console.log(error);
  }
  
}
// 查询首页数据
const getIndex = async (req, res, next) => {
  try {
    // 获取首页轮播图
    let slider = await Slider.find({ status: '1' }).sort({ 'sort': 1 })
    let movieClass = await MovieClass.find().lean()
    // 递归获取children
    for (let i = 0; i < movieClass.length; i++) {
      movieClass[i] = await getChildren(movieClass[i])
    }
    res.send({ code: 200, data: { slider: slider, list: movieClass }, msg: '获取成功' })
  } catch (error) {
    res.send({ code: 422, msg: error })
  }
}

module.exports = {
  getIndex
}