const Slider = require('../models/Slider')
const Movie = require('../models/Movie')
const MovieClass = require('../models/MovieClass')

// 查询列表
const getIndex = async (req, res, next) => {
  try {
    // 获取首页轮播图
    let slider = await Slider.find({status: '1'}).sort({'sort': 1})
    let movieClass = await MovieClass.find().lean()
    for (let index = 0; index < movieClass.length; index++) {
      const element = movieClass[index];
      element.movieList = await Movie.find({movieClass: element._id}).limit(10)
    }
    
    res.send({ code: 200, data: {slider: slider, list: movieClass}, msg: '获取成功' })

  } catch (error) {
    console.log(error);
    res.send({ code: 422, msg: error })
  }
}

module.exports = {
  getIndex
}