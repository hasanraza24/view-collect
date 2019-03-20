const Joi = require('joi');
const { assign } = require('lodash');

const threadBody = {
  title: Joi.string().trim().required(),
  description: Joi.string().trim(),
  tags: Joi.array().items(Joi.string().trim())
};

const create = assign({}, { body: threadBody });

module.exports = {
  create
};