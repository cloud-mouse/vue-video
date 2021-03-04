var express = require('express');
var router = express.Router();
const checkToken = require('../../middleware/checkToken')
const MovieEpisodesController = require('../../controllers/MovieEpisodes')

// 创建影视剧集
router.post('/', checkToken, MovieEpisodesController.create);
// 获取影视剧集列表
router.get('/', checkToken, MovieEpisodesController.getList);
// 删除
router.delete('/', checkToken, MovieEpisodesController.deleteOne);
// 更新
router.patch('/', checkToken, MovieEpisodesController.updateOne);

module.exports = router;
