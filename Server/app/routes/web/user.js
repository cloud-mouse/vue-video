var express = require('express');
var router = express.Router();
// 控制器， 主要写一些和模型交互的方法
const UserController = require('../../controllers/User')
const checkWebToken = require('../../middleware/checkWebToken')
// 用户 注册登录
router.post('/register', UserController.register);
router.post('/login', UserController.login);
// 获取用户信息
router.get('/info', checkWebToken, UserController.userInfo);


module.exports = router;
