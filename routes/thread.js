var express = require('express');
var router = express.Router();
var threadCtlr = require('../controllers/thread.controller');
var validate = require('express-validation');
var threadValidation = require('../validations/thread.validation');

router.post('/create', validate(threadValidation.create), threadCtlr.createThread);

router.get('/list', threadCtlr.list);

module.exports = router;