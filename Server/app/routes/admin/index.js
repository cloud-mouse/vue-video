var express = require('express');
var router = express.Router();
const User = require('./user')
const Role = require('./role')
const Permission = require('./permission')
const Movie = require('./movie')
const MovieClass = require('./movieClass')
const MovieEpisodes = require('./movieEpisodes')
const slider = require('./slider')
const gallery = require('./gallery')

router.use('/admin', User) // 管理员接口
router.use('/role', Role) // 角色接口
router.use('/permission', Permission) // 权限接口
router.use('/movie', Movie) // 影视接口
router.use('/movieClass', MovieClass) // 影视类型
router.use('/movieEpisodes', MovieEpisodes) // 影视剧集
router.use('/slider', slider) // 首页广告位
router.use('/gallery', gallery) // 图库


module.exports = router;
