const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('PostApi', postSchema);