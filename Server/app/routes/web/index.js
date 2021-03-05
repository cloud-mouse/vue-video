var express = require('express');
var router = express.Router();
// 首页控制器
const homeController = require('../../controllers/Home')

const User = require('./user')
const Movie = require('./movie')
const MovieClass = require('./movieClass')
const MovieEpisodes = require('./movieEpisodes')
const slider = require('./slider')

router.use('/admin', User) // 用户接口
router.use('/movie', Movie) // 影视接口
router.use('/movieClass', MovieClass) // 影视类型
router.use('/movieEpisodes', MovieEpisodes) // 影视剧集
router.use('/slider', slider) // 首页广告位

// 获取首页数据
router.get('/getIndex', homeController.getIndex)

module.exports = router;
