module.exports = (app) => {
    const restApis = require('../control/control');
    const userApis = require('../control/userControl');
    const passport = require('passport');
    

    // create new post
    app.post('/profile/post/new', restApis.createPost);
    // View all post
    app.get('/post',restApis.viewAllPost);
    
    // find post by id
    app.get('/post/:postId',restApis.viewOnePost);

    // update post
    app.put('/post/:postId/update',restApis.updatePost);

    // delete post 
    app.delete('/post/:postId/delete',restApis.deletePost);

    // Create a new user acount
    app.post('/new_account', userApis.createAccount);

    // view all user account
    // app.get('/user',userApis.viewAllUser);
    
    
    //  view user profile everyone
    app.get('/user/:userId/profile',userApis.viewProfile);

    // User profile update
    app.put('/user/:userId/profile/update',userApis.userProfileUpdate);

    // User login 
    app.post('/login',userApis.userLogin);

    // login user view his profile
    // app.get('/profile',userApis.UserProfile);
    app.get("/profile", passport.authenticate('jwt', { session: false }), function(req, res){
        res.json("Success! You can not see this without a token");
          
       
        
    });


    

    // Logou 
    app.get('/logout',userApis.userlogOut);

    





    // Retrieve all Notes
    // app.get('/user', restApis.findAll);

    // Retrieve a single Note with noteId
    app.get('/user/:userId', restApis.findOne);

    // Update a Note with noteId
    app.put('/user/:userId', restApis.update);

    // Delete a Note with noteId
    app.delete('/user/:userId', restApis.delete);




















}