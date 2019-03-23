const Joi = require('joi');
const { assign } = require('lodash');

const viewBody = {
    articleId: Joi.string().trim().required(),
    date: Joi.date()
}

const viewQuery = {
    startDate: Joi.date(),
    endDate: Joi.date()
}

const viewParams = {
    userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).error(err => {
        return {
            message: 'UserId is not valid'
        }
    })
}

const create = assign({}, { body: viewBody });
const list = assign({}, { params: viewParams, query: viewQuery });

module.exports = {
    create,
    list
}