var Article = require('../models/article.model');

const createArticle = async (req, res, next) => {
    try {
        const article = await Article.create(req.body);
        res.json({ success: true, data: article });
    }catch(e) {
        next(e);
    }
};

const list = async (req, res, next) => {
    try {
        const articles = await Article.list(req.query);
        res.json({ success: true, data: articles });
    }catch(e) {
        next(e);
    }
};

const get = async (req, res, next) => {
    try {
        const article = await Article.get(req.params.articleId);
        res.json({ success: true, data: article });
    }catch(e) {
        next(e);
    }
};

module.exports = {
    createArticle,
    list,
    get
}