var express = require('express');
var router = express.Router();
const checkToken = require('../../middleware/checkToken')
const MovieClassController = require('../../controllers/MovieClass')

// 创建影视分类
router.post('/', checkToken, MovieClassController.create);
// 获取影视分类列表
router.get('/', checkToken, MovieClassController.getList);
// 删除
router.delete('/', checkToken, MovieClassController.deleteOne);
// 更新
router.patch('/', checkToken, MovieClassController.updateOne);

module.exports = router;
