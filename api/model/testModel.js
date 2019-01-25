const mongoose = require('mongoose');

const UserScham = mongoose.Schema({
    name: String,
    pass: String
}, {
    timestamps: true
});

module.exports = mongoose.model('TestApi', UserScham);