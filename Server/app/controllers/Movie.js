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
  let { id, keywords, currentPage, pageSize } = req.query
  const reg = new RegExp(keywords, 'i') //不区分大小写
  let query = {
    $or: [{ name: { $regex: reg } }],
  }
  if (!id) {
    let videos = await Movie.find(query).skip((currentPage - 1) * pageSize).populate('movieClass').sort({ sort: -1 }).limit(pageSize * 1).lean() // 查询顶级
    const count = await Movie.countDocuments()  // 计数
    res.send({ code: 200, msg: '获取成功', data: { list: videos, count: count } })
  } else {
    let video = await Movie.findById(id).populate('movieClass')
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