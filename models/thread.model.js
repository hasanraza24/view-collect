var mongoose = require('../config/dbconnection');

const threadSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    tags: {
        type: [String]
    },
    username: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

threadSchema.statics = {
    async create(username, threadBody) {
        try {
            threadBody.username = username;
            const thread = new this(threadBody)
            return await thread.save();
        }catch(e) {
            return Promise.reject(e);
        }
    },
    async listForUser(username, { limit=10, skip=0 }) {
        try {
            const threads = await this.find({ username }).skip(parseInt(skip)).limit(parseInt(limit));
            return threads;
        }catch(e) {
            return Promise.reject(e);
        }
    },
    async get(_id) {
        try {
            const thread = await this.findOne({ _id });
            return thread;
        }catch(e) {
            return Promise.reject(e);
        }
    }
}

const Thread = mongoose.model('Tread', threadSchema);

module.exports = Thread;