var express = require('express');
var router = express.Router();

// 控制器
const { getList, createClass, deleteClass, updateClass } = require('../../controllers/GalleryClass')
const { getGallery, createGallery, updateGallery, deleteGallery } = require('../../controllers/Gallery')

const { upload } = require('../../middleware/common') // multer图片处理中间件
const checkToken = require('../../middleware/checkToken')

// 图库部分接口
// 图片上传到图库
router.post('/', checkToken, upload.single('file'), createGallery)
// 获取图库列表
router.get('/', checkToken, getGallery)
// 更新
router.patch('/', checkToken, updateGallery)
// 删除
router.delete('/', checkToken, deleteGallery)

// 分类部分接口
// 获取分类列表
router.get('/class', checkToken, getList)
// 新增分类
router.post('/class', checkToken, createClass)
// 删除分类
router.delete('/class', checkToken, deleteClass)
// 更新
router.patch('/class', checkToken, updateClass)

module.exports = router;
