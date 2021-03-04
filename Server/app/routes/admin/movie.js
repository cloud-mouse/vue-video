var express = require('express');
var router = express.Router();
const checkToken = require('../../middleware/checkToken')
const MovieController = require('../../controllers/Movie')

// 创建影视
router.post('/', checkToken, MovieController.create);
// 获取影视列表
router.get('/', checkToken, MovieController.getList);
// 删除
router.delete('/', checkToken, MovieController.deleteOne);
// 更新
router.patch('/', checkToken, MovieController.updateOne);

module.exports = router;
