const MovieEpisodes = require('../models/MovieEpisodes')
// 创建
const create = async (req, res, next) => {
  let body = req.body
  try {
    const result = await MovieEpisodes.create(body)
    if (!result) return res.send({ code: 422, msg: result })
    res.send({ code: 200, msg: '创建成功', data: result })
  } catch (error) {
    res.send({ code: 500, msg: error })
  }
}
// 更新
const updateOne = async(req, res, next) =>{
  let body = req.body
  try {
    const result = await MovieEpisodes.findByIdAndUpdate(body._id, body)
    if (!result) return res.send({ code: 422, msg: result })
    res.send({ code: 200, msg: '修改成功', data: result })
  } catch (error) {
    res.send({ code: 500, msg: error })
  }
}
// 获取列表
const getList = async (req, res, next) => {
  let { movie_id } = req.query
  let movieEpisodes = await MovieEpisodes.find({ movie_id: movie_id }) // 查询顶级
  const count = await MovieEpisodes.countDocuments({ movie_id: movie_id })  // 计数
  res.send({ code: 200, msg: '获取成功', data: {list: movieEpisodes, count: count } })
}
// 删除
const deleteOne = async (req, res, next) => {
  let { id } = req.query
  try {
    if (id) {
      result = await MovieEpisodes.findByIdAndDelete({ _id: id })
      if (!result) return res.send({ code: 422, msg: result })
      res.send({ code: 200, msg: '删除成功', data: result })
    } else {
      res.send({ code: 422, msg: '请选择要删除的剧集' })
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