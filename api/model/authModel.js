const mongoose = require('mongoose');

const AuthSchema = mongoose.Schema({
    name: String,
    pass: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('AuthApi', AuthSchema);