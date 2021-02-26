var express = require('express');
var router = express.Router();
const checkToken = require('../../middleware/checkToken')
const PermissionController = require('../../controllers/Permission')

// 创建权限
router.post('/', checkToken, PermissionController.create);

// 获取权限列表
router.get('/', checkToken, PermissionController.getList);
// 删除
router.delete('/', checkToken, PermissionController.deletePermission);
// 更新
router.patch('/', checkToken, PermissionController.updateOne);



module.exports = router;
