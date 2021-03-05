const Slider = require('../models/Slider')
// 创建
const create = async (req, res, next) => {
  let body = req.body
  try {
    const result = await Slider.create(body)
    if (!result) return res.send({ code: 422, msg: result })
    res.send({ code: 200, msg: '创建成功', data: result })
  } catch (error) {
    res.send({ code: 422, msg: error })
  }

}
// 删除
const deleteOne = async (req, res, next) => {
  try {
    let result = await Slider.findByIdAndDelete(req.query.id)
    if (!result) return res.send({ code: 422, msg: '未找到删除条目' })
    res.send({ code: 200, msg: '删除成功', data: result })
  } catch (error) {
    res.send({ code: 422, msg: error })
  }
}
// 更新操作
const updateOne = async (req, res, next) => {
  let body = req.body
  try {
    let result = await Slider.findByIdAndUpdate(body._id, body)
    if (!result) return res.send({ code: 422, msg: '未找到条目' })
    res.send({ code: 200, msg: '修改成功', data: result })
  } catch (error) {
    res.send({ code: 422, msg: error })
  }
}

// 查询列表
const getList = async (req, res, next) => {
  let {  id } = req.query
  let result
  try {
    if (!id) {
      result = await Slider.find().lean() // 查询顶级
      res.send({ code: 200, data: result, msg: '获取成功' })
    } else {
      result = await Slider.findById(id)
      if (!result) return res.send({ code: 422, msg: '获取失败' })
      res.send({ code: 200, data: result, msg: '获取成功' })
    }
  } catch (error) {
    res.send({ code: 422, msg: error })
  }
}

module.exports = {
  create,
  deleteOne,
  updateOne,
  getList
}