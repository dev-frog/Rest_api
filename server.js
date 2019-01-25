const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const JwtStrategy = require('passport-jwt').Strategy;  
const ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('./api/model/userModel'); 
const acl = require('express-acl');


// create express app
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./api/config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;








// let passport = require('./api/control/passport');
// app.use(passport);  
const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());





// // adding role or permission
//     app.use(function(req, res, next) {
//         const token = req.headers['Authorization'];
       
//         if (!token) {
//           return next(new Error('No token Provided'));
//         }
       
//         jwt.verify(token, key, function(err, decoded) {
//           if (err) {
//             return res.send(err);
//           }
//           req.decoded = decoded;
//           return next();
//         });
//     });


// app.use(acl.authorize);

require('./api/control/passport')(passport);


// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});





require('./api/route/routes')(app);


// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "A Rest Api for hackthon-2019"});
});



// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});