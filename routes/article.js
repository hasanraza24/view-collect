var express = require('express');
var router = express.Router();
var articleCtlr = require('../controllers/article.controller');
var validate = require('express-validation');
var articleValidation = require('../validations/article.validation');

router.route('/')
      .post(validate(articleValidation.create), articleCtlr.createArticle)
      .get(articleCtlr.list);

router.route('/:articleId')
      .get(articleCtlr.get);

module.exports = router;
