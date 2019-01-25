const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserLogin = new mongoose.Schema({  
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['user', 'moderator', 'Admin'],
      default: 'user'
    }
});

// Saves the user's password hashed (plain text password storage is not good)
UserLogin.pre('save', function (next) {  
    var user = this;
    if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          return next(err);
        }
        bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) {
            return next(err);
          }
          user.password = hash;
          next();
        });
      });
    } else {
      return next();
    }
});

// Create method to compare password input to password saved in database
UserLogin.methods.comparePassword = function(pw, cb) {  
    bcrypt.compare(pw, this.password, function(err, isMatch) {
      if (err) {
        return cb(err);
      }
      cb(null, isMatch);
    });
};

module.exports = mongoose.model('UserLogin', UserLogin);