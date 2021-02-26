var express = require('express');
var router = express.Router();
const User = require('./user')
const Role = require('./role')
const Permission = require('./permission')

router.use('/user', User)
router.use('/role', Role)
router.use('/permission', Permission)


module.exports = router;
