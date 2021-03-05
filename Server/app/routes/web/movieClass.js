var express = require('express');
var router = express.Router();
const MovieClassController = require('../../controllers/MovieClass')

// 获取影视分类列表
router.get('/', MovieClassController.getList);

module.exports = router;
