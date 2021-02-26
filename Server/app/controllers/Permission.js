const Permission = require('../models/Permission')
// 创建
const create = async (req, res, next) => {
  let body = req.body
  try {
    const result = await Permission.create(body)
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
    const result = await Permission.findByIdAndUpdate(req.query.id, body)
    if (!result) return res.send({ code: 422, msg: result })
    res.send({ code: 200, msg: '修改成功', data: result })
  } catch (error) {
    res.send({ code: 500, msg: error })
  }
}
// 获取列表
const getList = async (req, res, next) => {
  let permission = await Permission.find({ pid: '0' }).lean() // 查询顶级
  for(let i=0; i<permission.length; i++) {
    permission[i] = await getChildren(permission[i])
  }
  console.log('permission',permission);
  res.send({ code: 200, msg: '获取成功', data: permission })
}
// 递归查询children
const getChildren = async (item) => {
  if (item._id) {
    let child = await Permission.find({ pid: item._id }).lean() // 查询下级
    if (!child.length) return item
    item.children = child
    for(let j = 0; j<child.length; j++) {
      child[j] = await getChildren(child[j])
    }
    return item
  }
}
// 删除
const deletePermission = async (req, res, next) => {
  let { id } = req.query
  if (id) {
    result = await Permission.findByIdAndDelete({ _id: id })
    if (!result) return res.send({ code: 422, msg: result })
    res.send({ code: 200, msg: '删除成功', data: result })
  } else {
    res.send({ code: 422, msg: '请选择' })
  }
}

module.exports = {
  create,
  getList,
  deletePermission,
  updateOne
}