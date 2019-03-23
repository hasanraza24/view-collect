const Joi = require('joi');
const { assign } = require('lodash');

const articleBody = {
    title: Joi.string().trim().max(80).min(5).required(),
    desciption: Joi.string().trim()
}

const create = assign({}, { body: articleBody });

module.exports = {
    create
}