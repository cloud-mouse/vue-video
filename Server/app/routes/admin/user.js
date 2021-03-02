var express = require('express');
var router = express.Router();
// 控制器， 主要写一些和模型交互的方法
const AdminUserController = require('../../controllers/AdminUser')
const checkToken = require('../../middleware/checkToken')
// 用户
router.post('/register', AdminUserController.register);
router.post('/login', AdminUserController.login);
// 获取用户信息
router.get('/info', checkToken, AdminUserController.userInfo);

// 用户列表
router.get('/', checkToken, AdminUserController.getList);
router.post('/', checkToken, AdminUserController.register);
router.patch('/', checkToken, AdminUserController.updateOne);
router.delete('/', checkToken, AdminUserController.deleteUser);

module.exports = router;
