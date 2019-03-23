var User = require('../models/user.model');
var jwt = require('jsonwebtoken');
const config = require('../config/config');
var _ = require('lodash');
var createError = require('http-errors');

const register = async (req, res, next) => {
    try {
        const userObj = await User.create(req.body);
        const user = _.pick(userObj, ['email', '_id']);
        const tokenData = {
            email: user.email,
            _id: user._id,
            role: 'user'
        };
        const token = await jwt.sign(tokenData, config.jwtSecret);
        res.json({success: true, data: { user, token }, message: 'User Created'});
    }catch(e) {
        next(e);
    }
};

const login = async (req, res, next) => {
    try {
        const userObj = await User.login(req.body);
        const user = _.pick(userObj, ['email', '_id']);
        const tokenData = {
            email: user.email,
            _id: user._id,
            role: 'user'
        };
        const token = await jwt.sign(tokenData, config.jwtSecret);
        res.json({success: true, data: { user, token }, message: 'User Logged in!'});
    }catch(e) {
        next(e);
    }
}

const adminLogin = async (req, res, next) => {
    try {
        if(config.admin.username === req.body.username && config.admin.password === req.body.password) {
            const tokenData = {
                email: req.body.username,
                role: 'admin'
            }
            const token = await jwt.sign(tokenData, config.jwtSecret);
            res.json({success: true, token });
        }else {
            const err = createError(400, 'You are not authorized');
            throw err;
        }
    }catch(e) {
        next(e);
    }
}

const list = async (req, res, next) => {
    try {
        const users = await User.list(req.query);
        res.json({ success: true, data: users});
    }catch(e) {
        next(e);
    }
};
module.exports = {
    login,
    register,
    adminLogin,
    list
}