var mongoose = require('../config/dbconnection');
var bcrypt = require('bcrypt');
var createError = require('http-errors');

const articleSchema = mongoose.Schema({
    _id: {
        type: String,
    },
    title: {
        type: String
    },
    description: {
        type: String
    }
});

var getTodayDate = () => {
    const d = new Date();
    return new Date(d.toDateString());
}

//pre save hook for validation
articleSchema.post('save', (err, res, next) => {
    if (err.code === 11000) {
      const error = createError(400, 'Article already exist');
      return next(error);
    }
    return next(err);
  });

  articleSchema.statics = {
    async create(articleBody) {
        try {
            // articleBody._id = String(String(String(articleBody.title.toLowerCase()).replaceAll('"', '').s).strip('\'', '‘', '’', '/', '?', '|', '@', ':', '"', '$', '#', '%', '^', ',', '%', '&', '!', '*', '(', ')', '.', '+', '`').s).dasherize().s;
            articleBody._id = articleBody.title.toLowerCase().split(' ').join('-');
            const newArticle = new this(articleBody);
            return await newArticle.save();
        }catch(e) {
            return Promise.reject(e);
        }
    },
    async list({ limit=10, skip=0 }) {
        try {
            const articles = await this.find({}).skip(parseInt(skip)).limit(parseInt(limit));
            return articles;
        }catch(e) {
            return Promise.reject(e);
        }
    },
    async get(_id) {
        try {
            const article = await this.findOne({ _id });
            return article;
        }catch(e) {
           return Promise.reject(e);
        }
    }
  }

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;