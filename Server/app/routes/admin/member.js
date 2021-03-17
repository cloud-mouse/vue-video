var express = require('express');
var router = express.Router();
// 控制器， 主要写一些和模型交互的方法
const UserController = require('../../controllers/User')
const checkToken = require('../../middleware/checkToken')
// 用户列表
router.get('/', checkToken, UserController.getList);
router.post('/', checkToken, UserController.register);
router.patch('/', checkToken, UserController.updateOne);
router.delete('/', checkToken, UserController.deleteUser);

module.exports = router;
