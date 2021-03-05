var express = require('express');
var router = express.Router();
const checkToken = require('../../middleware/checkToken')
const SliderController = require('../../controllers/Slider')

// 创建角色
router.post('/', checkToken, SliderController.create);
// 获取角色列表
router.get('/', checkToken, SliderController.getList);
// 删除
router.delete('/', checkToken, SliderController.deleteOne);
// 修改
router.patch('/', checkToken, SliderController.updateOne);

module.exports = router;
