var Thread = require('../models/thread.model');

const createThread = async (req, res, next) => {
    try {
        const thread = await Thread.create(req.user._id, req.body);
        res.json({ data: { thread }, message: 'Thread Created!'});
    }catch(e) {
        next(e);
    } 
};

const list = async (req, res, next) => {
    try {
        const threads = await Thread.listForUser(req.user._id, req.query);
        res.json({ data: { threads }});
    }catch(e) {
        next(e);
    }
}

module.exports = {
    createThread,
    list
}