const UserLogin = require('../model/userModel');
// var JwtStrategy = require('passport-jwt').Strategy;  
// var ExtractJwt = require('passport-jwt').ExtractJwt; 
var jwt = require('jsonwebtoken');
const config = require('../config/database.config');
const passport = require('passport');

exports.createAccount = (req,res) =>{
    // Validate request
    if(!req.body.email || !req.body.password) {
        return res.status(400).send({
            message: "Please enter email and password."
        });
    }
    const userApi = new UserLogin({
        email: req.body.email, 
        password: req.body.password
    });

    // Attempt to save the user
    userApi.save(function(err) {
        if (err) {
          return res.json({ success: false, message: 'That email address already exists.'  });
        }
        res.json({ success: true, message: 'Successfully created new user.' });
    });
};

//View one profile with id
exports.viewProfile = (req,res) =>{
    UserLogin.findById(req.params.userId)
    .then(userApi => {
        if(!userApi) {
            return res.status(404).send({
                message: "Authentication failed. User not found with this id :" + req.params.userId
            });            
        }
        res.send(userApi);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });

};

exports.userProfileUpdate = (req,res) =>{
    if(!req.body.email || !req.body.password) {
        return res.status(400).send({
            message: "Usernaem and password cant be empty"
        });
    }

    // Find note and update it with the request body
    UserLogin.findByIdAndUpdate(req.params.userId, {
        name: req.body.email ,
        pass: password,
    }, {new: true})
    .then(userApi => {
        if(!userApi) {
            return res.sjwttatus(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(userApi);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating User  with id " + req.params.userId
        });
    });
};


// User Login 
exports.userLogin = (req,res) =>{
    UserLogin.findOne({
        email: req.body.email
      }, function(err, userApi) {
        if (err) throw err;
    
        if (!userApi) {
          res.send({ success: false, message: 'Authentication failed. User not found.' });
        } else {
          // Check if password matches
          userApi.comparePassword(req.body.password, function(err, isMatch) {
            if (isMatch && !err) {
              // Create token if the password matched and no error was thrown
              var token = jwt.encode(userApi, config.secret);
            //   var token = jwt.sign(userApi, config.secret, {
            //     expiresIn: 10080 // in seconds
            //   });
              res.json({ success: true, token: 'JWT ' + token });
            } else {
              res.send({ success: false, message: 'Authentication failed. Passwords did not match.' + res.send(userApi) });
            }
          });
        }
      });
};

// user profile or dashbord
// exports.UserProfile = (req,res)=>{
//     if(passport.authenticate('jwt', { session: false })){
//         return res.status(401).send({
//             message:'You are not logged in'
//         });
//     }else{
//         return res.status(200).send({
//             message:'Welcome to dashboard!' 
//         });
//     }
// };

// user logout 
exports.userlogOut = (req,res) =>{
    req.session.destroy(function(err){  
        if(err){  
            return res.status(500).send({
                message:"iternal error " + res
            });
        }else{  
            // Response.successResponse('User logged out successfully!',res,{}); 
            return res.status(200).send({
                message : 'User logged out successfully!' + res + {}
            });
        }  
    });
};