const Movie = require('../models/Movie')
// 创建
const create = async (req, res, next) => {
  let body = req.body
  try {
    const result = await Movie.create(body)
    if (!result) return res.send({ code: 422, msg: result })
    res.send({ code: 200, msg: '创建成功', data: result })
  } catch (error) {
    res.send({ code: 500, msg: error })
  }
}
// 更新
const updateOne = async (req, res, next) => {
  let body = req.body
  try {
    const result = await Movie.findByIdAndUpdate(body._id, body)
    if (!result) return res.send({ code: 422, msg: result })
    res.send({ code: 200, msg: '修改成功', data: result })
  } catch (error) {
    res.send({ code: 500, msg: error })
  }
}
// 获取列表
const getList = async (req, res, next) => {
  let { id, keywords, currentPage, pageSize, movie_class, movie_type, movie_genres } = req.query
  const reg = new RegExp(keywords, 'i') //不区分大小写
  const regtype = new RegExp(movie_type, 'i') //不区分大小写
  const reggenres = new RegExp(movie_genres, 'i') //不区分大小写
  let query = {
    $or: [{
      name: { $regex: reg },
      movie_type: { $regex: regtype },
      movie_genres: { $regex: reggenres }
    }],
  }
  if(movie_class) query.movie_class = movie_class  // 设置所选分类
  if (!id) {
    let videos = await Movie.find(query).skip((currentPage - 1) * pageSize).populate('movie_class').sort({ sort: -1 }).limit(pageSize * 1).lean() // 查询顶级
    const count = await Movie.countDocuments(query)  // 计数
    res.send({ code: 200, msg: '获取成功', data: { list: videos, count: count } })
  } else {
    let video = await Movie.findById(id).populate('movie_class')
    if(!video) return res.send({ code: 400, msg: '查询失败' })
    let pv = video.pv
    pv+=1
    await Movie.findByIdAndUpdate(id, {pv: pv})
    res.send({ code: 200, msg: '获取成功', data: video })
  }
}
// 删除
const deleteOne = async (req, res, next) => {
  let { id } = req.query
  try {
    if (id) {
      result = await Movie.findByIdAndDelete({ _id: id })
      if (!result) return res.send({ code: 422, msg: result })
      res.send({ code: 200, msg: '删除成功', data: result })
    } else {
      res.send({ code: 422, msg: '请选择' })
    }
  } catch (error) {
    res.send({ code: 500, msg: error })
  }

}

module.exports = {
  create,
  getList,
  deleteOne,
  updateOne
}