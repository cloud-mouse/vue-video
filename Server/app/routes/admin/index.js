var express = require('express');
var router = express.Router();
const User = require('./user')
const Role = require('./role')
const Permission = require('./permission')
const Movie = require('./movie')
const MovieClass = require('./movieClass')
const MovieEpisodes = require('./movieEpisodes')

router.use('/admin', User)
router.use('/role', Role)
router.use('/permission', Permission)
router.use('/movie', Movie)
router.use('/movieClass', MovieClass)
router.use('/movieEpisodes', MovieEpisodes)


module.exports = router;
