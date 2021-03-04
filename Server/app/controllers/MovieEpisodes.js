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
  let { currentPage, pageSize } = req.query
  let permission = await MovieEpisodes.find({ pid: '0' }).skip((currentPage - 1) * pageSize).sort({sort:-1}).limit(pageSize * 1).lean() // 查询顶级
  const count = await MovieEpisodes.countDocuments({ pid: '0' })  // 计数
  // 递归获取children
  for(let i=0; i<permission.length; i++) {
    permission[i] = await getChildren(permission[i])
  }
  res.send({ code: 200, msg: '获取成功', data: {list: permission, count: count } })
}
// 递归查询children
const getChildren = async (item) => {
  if (item._id) {
    let child = await MovieEpisodes.find({ pid: item._id }).lean() // 查询下级
    if (!child.length) return item
    item.children = child
    for(let j = 0; j<child.length; j++) {
      child[j] = await getChildren(child[j])
    }
    return item
  }
}
// 删除
const deleteOne = async (req, res, next) => {
  let { id } = req.query
  try {
    if (id) {
      result = await MovieEpisodes.findByIdAndDelete({ _id: id })
      await MovieEpisodes.findOneAndUpdate({ pid: id }, {pid: '0'})
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