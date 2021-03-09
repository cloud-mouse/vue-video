const { GalleryClass, Gallery } = require('../models/Gallery')

const getList = async (req, res, next) => {
  let { currentPage, pageSize } = req.query
  let galleryClass = await GalleryClass.find({ pid: '0' }).skip((currentPage - 1) * pageSize).sort({ sort: -1 }).limit(pageSize * 1).lean() // 查询顶级
  const count = await GalleryClass.countDocuments({ pid: '0' })  // 计数
  // 递归获取children
  for (let i = 0; i < galleryClass.length; i++) {
    galleryClass[i] = await getChildren(galleryClass[i])
  }
  res.send({ code: 200, msg: '获取成功', data: { list: galleryClass, count: count } })
}
// 递归查询children
const getChildren = async (item) => {
  if (item._id) {
    let child = await GalleryClass.find({ pid: item._id }).lean() // 查询下级
    if (!child.length) return item
    item.children = child
    for (let j = 0; j < child.length; j++) {
      child[j] = await getChildren(child[j])
    }
    return item
  }
}

const deleteClass = async (req, res, next) => {
  let { _id } = req.query
  try {
    let result = await GalleryClass.findByIdAndDelete(_id)
    let children = await GalleryClass.find({ pid: _id })
    // 把他下面的图片都变成未分组， 不然分组删了就找不到了
    let gallery = await Gallery.find({ galleryClass: _id })
    if (gallery.length) {
      for (let g = 0; g < gallery.length; g++) {
        await Gallery.findByIdAndUpdate(gallery[g]._id, { galleryClass: '0' })
      }
    }

    // 递归获取children
    for (let i = 0; i < children.length; i++) {
      await GalleryClass.findByIdAndUpdate(children[i]._id, { pid: '0' })
      await changeChild(children[i])
    }

    res.send({ code: 200, msg: '删除成功', data: result })
  } catch (error) {
    res.send({ code: 422, msg: '删除失败', data: error })
  }
}

// 递归修改子节点pid
const changeChild = async (item) => {
  if (item._id) {
    let child = await GalleryClass.find({ pid: item._id }).lean() // 查询下级
    if (!child.length) return
    for (let j = 0; j < child.length; j++) {
      await GalleryClass.findByIdAndUpdate(child[j]._id, { pid: '0' })
      await getChildren(child[j])
    }
    return item
  }
}

const createClass = async (req, res, next) => {
  try {
    let result = await GalleryClass.create(req.body)
    res.send({
      code: 200,
      data: result,
      msg: '创建成功'
    })
  } catch (error) {
    res.send({
      code: 422,
      path: error,
      msg: '创建失败'
    })
  }
}

const updateClass = async(req, res, next)=>{
  try {
    let result = await GalleryClass.findByIdAndUpdate(req.body._id, req.body)
    res.send({code: 200, msg:'修改成功'})
  } catch (error) {
    res.send({code: 422, msg:'修改失败',data: error})
  }
}

module.exports = {
  getList,
  createClass,
  deleteClass,
  updateClass
}