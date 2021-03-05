var express = require('express');
var router = express.Router();
const SliderController = require('../../controllers/Slider')

// 获取列表
router.get('/', SliderController.getList);

module.exports = router;
