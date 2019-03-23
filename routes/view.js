var express = require('express');
var router = express.Router();
var viewCtlr = require('../controllers/view.controller');
var validate = require('express-validation');
var viewValidation = require('../validations/view.validation');
var authHandler = require('../helpers/auth-handler');


router.get('/listForUser/:userId', validate(viewValidation.list), viewCtlr.getForUser);

router.get('/listForArticle/:articleId', validate(viewValidation.list), viewCtlr.getForArticle);

router.post('/',authHandler);

router.post('/', validate(viewValidation.create), viewCtlr.create);

module.exports = router;