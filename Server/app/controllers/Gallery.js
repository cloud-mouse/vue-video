const { ENV_CONFIG } = require('../../config')
const { Gallery } = require('../models/Gallery')
const fs = require('fs')

// 图库列表
const getGallery = async (req, res, next) => {
  let { name, class_id, currentPage, pageSize } = req.query
  const reg = new RegExp(name, 'i') //不区分大小写
  let query = {}
  if (name) {
    query.$or = [{ name: { $regex: reg } }]
  }
  if (class_id) {
    query.galleryClass = class_id
  }
  try {
    let result = await Gallery.find(query).skip((currentPage - 1) * pageSize).limit(pageSize * 1).lean() // 查询顶级
    const count = await Gallery.countDocuments(query)  // 计数
    res.send({
      code: 200,
      data: { list: result, count: count },
      msg: '获取成功'
    })
  } catch (error) {
    res.send({
      code: 422,
      data: error,
      msg: '获取失败'
    })
  }
}

// 新增图片
const createGallery = async (req, res, next) => {
  // 文件路径
  var imageSrc = `http://movie.zhanghaoblog.top/${req.file.path}`
  try {
    let result = await Gallery.create({
      name: req.file.filename,
      filename: req.file.filename,
      path: imageSrc,
      galleryClass: req.body.class_id || '0',
      path_src: req.file.path,
      type: req.file.mimetype,
    })
    res.send({
      code: 200,
      data: result,
      msg: '上传成功'
    })
  } catch (error) {
    res.send({
      code: 422,
      path: error,
      msg: '上传失败'
    })
  }
}

const updateGallery = async (req, res, next) => {
  let { _id } = req.body
  try {
    let result = await Gallery.findByIdAndUpdate(_id, req.body)
    res.send({ code: 200, msg: '修改成功', data: result })
  } catch (error) {
    res.send({ code: 422, msg: '修改失败', data: error })
  }
}

const deleteGallery = async (req, res, next) => {
  let { _id } = req.query
  try {
    let result = await Gallery.findByIdAndDelete(_id)
    fs.unlinkSync(`./${result.path_src}`) // 删除本地文件
    res.send({ code: 200, msg: '删除成功', data: result })
  } catch (error) {
    res.send({ code: 422, msg: '删除失败', data: error })
  }
}

module.exports = {
  getGallery,
  createGallery,
  updateGallery,
  deleteGallery
}