var express = require('express');
var router = express.Router();
const MovieController = require('../../controllers/Movie')

// 获取影视列表
router.get('/', MovieController.getList);


module.exports = router;
