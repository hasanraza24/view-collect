var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
var articleRouter = require('./article');
var viewRouter = require('./view')

router.use('/users', usersRouter);
router.use('/article', articleRouter);
router.use('/view', viewRouter);

module.exports = router;
