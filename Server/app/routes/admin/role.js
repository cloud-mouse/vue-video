var express = require('express');
var router = express.Router();
const checkToken = require('../../middleware/checkToken')
const RoleController = require('../../controllers/Role')

// 创建角色
router.post('/', checkToken, RoleController.create);
// 获取角色列表
router.get('/', checkToken, RoleController.getList);
// 删除
router.delete('/', checkToken, RoleController.deleteOne);
// 修改
router.patch('/', checkToken, RoleController.updateOne);

module.exports = router;
