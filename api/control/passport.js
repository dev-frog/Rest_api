var JwtStrategy = require('passport-jwt').Strategy;  
var ExtractJwt = require('passport-jwt').ExtractJwt;  
// const passport = require('passport');
// const passportJWT = require('passport-jwt');
var User = require('../model/userModel');  
const config = require('../config/database.config');

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {  
  let opts = {};
  opts.secretOrKey = config.secret;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt")
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};