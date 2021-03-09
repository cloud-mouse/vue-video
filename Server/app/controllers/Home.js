const Slider = require('../models/Slider')
const Movie = require('../models/Movie')
const MovieClass = require('../models/MovieClass')

// 递归查询children
const getChildren = async (item) => {
  if (item._id) {
    let child = await MovieClass.find({ pid: item._id }).lean() // 查询下级
    if (!child.length) return item
    item.children = child
    for(let j = 0; j<child.length; j++) {
      child[j] = await getChildren(child[j])
      child[j].movieList = await Movie.find({movieClass: child[j]._id}).limit(10)
    }
    return item
  }
}
// 查询列表
const getIndex = async (req, res, next) => {
  try {
    // 获取首页轮播图
    let slider = await Slider.find({status: '1'}).sort({'sort': 1})
    let movieClass = await MovieClass.find({pid: '0'}).lean()
     // 递归获取children
    for(let i=0; i<movieClass.length; i++) {
      movieClass[i] = await getChildren(movieClass[i])
      movieClass[i].movieList = await Movie.find({movieClass:  movieClass[i]._id}).limit(10)
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