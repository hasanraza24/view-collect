var View = require('../models/view.model');

const getForUser = async (req, res, next) => {
    try {
        const views = await View.getByUser(req.params.userId, req.query);
        res.json({ success: true, data: views });
    }catch(e) {
        next(e);
    }
}; 

const getForArticle = async (req, res, next) => {
    try {
        const views = await View.getByArticle(req.params.articleId, req.query);
        res.json({ success: true, data: views });
    }catch(e) {
        next(e);
    }
};

const create = async (req, res, next) => {
    try {
        req.body.userId = req.user._id;
        const view = await View.create(req.body);
        res.json({ success: true, data: view });
    }catch(e) {
        next(e);
    }
}

module.exports = {
    getForUser,
    getForArticle,
    create
}