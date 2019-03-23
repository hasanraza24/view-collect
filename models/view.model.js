var mongoose = require('../config/dbconnection');
var bcrypt = require('bcrypt');
var createError = require('http-errors');

const viewSchema = mongoose.Schema({
    articleId: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId
    },
    date: {
        type: Date
    },
    count: {
        type: Number,
        default: 0
    }
});

var getTodayDate = () => {
    const d = new Date();
    return new Date(d.toDateString());
}

var getOnlyDate = (date) => {
  const d = new Date(date);
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return new Date(d.toDateString());
}

//pre save hook for validation
viewSchema.post('save', (err, res, next) => {
    if (err.code === 11000) {
      const error = createError(400, 'View already exist');
      return next(error);
    }
    return next(err);
  });

  viewSchema.statics = {
    async getByUser(userId, { limit=10, skip=0, startDate, endDate}) {
      try {
        const query = [
          { $match: {
            userId: mongoose.Types.ObjectId(userId)
          } },
          // { $sort: { date: -1 } },
          // { $limit: { limit: parseInt(limit) } },
          // { $skip: { skip: parseInt(skip) } },
          { $group: { _id: '$date', articles: { $push: { articleId: '$articleId', count: '$count' } } }},
          { $sort: { _id: -1 }}
        ]
        if(startDate && endDate) {
          query[0].$match.date = { $lte: getOnlyDate(endDate) };
          query[0].$match.date = { $gte: getOnlyDate(startDate) };
        }
        const views = await this.aggregate(query);
        return views;
      }catch(e) {
        return Promise.reject(e);
      }
    },
    async getByArticle(articleId, { limit=10, skip=0, startDate, endDate}) {
      try {
        const query = [
          { $match: {
            articleId
          } },
          // { $sort: { date: -1 } },
          // { $limit: { limit: parseInt(limit) } },
          // { $skip: { skip: parseInt(skip) } },
          { $group: { _id: '$date', users: { $push: { userId: '$userId', count: '$count' } } }},
          { $sort: { _id: -1 } }
        ];
        if(startDate && endDate) {
          query[0].$match.date = { $lte: getOnlyDate(endDate) };
          query[0].$match.date = { $gte: getOnlyDate(startDate) };
        }
        const views = await this.aggregate(query);
        return views;
      }catch(e) {
        return Promise.reject(e);
      }
    },
    async create({ userId, articleId, date }) {
      try {
        if(!date) date = getTodayDate();
        else date = getOnlyDate(date);
        console.log('Date', date);
        const newView = await this.update({ userId, articleId, date }, { $set: { userId, articleId, date }, $inc: { count: 1 } }, { upsert: true });
        return newView;
      }catch(e) {
        return Promise.reject(e);
      }
    }
  }

  viewSchema.index({ articleId: 1, userId: 1, date: 1 }, { unique: true });

const View = mongoose.model('View', viewSchema);

module.exports = View;