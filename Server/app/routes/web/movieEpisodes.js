var express = require('express');
var router = express.Router();
const MovieEpisodesController = require('../../controllers/MovieEpisodes')

// 获取影视剧集列表
router.get('/', MovieEpisodesController.getList);

module.exports = router;
