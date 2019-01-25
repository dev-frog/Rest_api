const TestApi = require('../model/testModel');
const PostApi = require('../model/postModel');

// Create and Save a new Note
exports.create = (req, res) => {
     // Validate request
     if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a Note
    const restApi = new TestApi({
        title: req.body.title || "Untitled user", 
        content: req.body.content
    });

    // Save Note in the database
    restApi.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    TestApi.find()
    .then(restApis => {
        res.send(restApis);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving User."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    TestApi.findById(req.params.userId)
    .then(restApi => {
        if(!restApi) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.send(restApi);
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

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Find note and update it with the request body
    RestApi.findByIdAndUpdate(req.params.userId, {
        title: req.body.title || "Untitled User",
        content: req.body.content
    }, {new: true})
    .then(restApi => {
        if(!restApi) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(restApi);
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

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    TestApi.findByIdAndRemove(req.params.userId)
    .then(restApi => {
        if(!restApi) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete User with id " + req.params.userId
        });
    });
};




// create new post
exports.createPost = (req,res) =>{
     // Validate request
     if(!req.body.content) {
        return res.status(400).send({
            message: "post content can not be empty"
        });
    }

    // Create a Note
    const postApi = new PostApi({
        title: req.body.title || "default title post", 
        content: req.body.content
    });

    // Save Note in the database
    postApi.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the post."
        });
    });
};

// view all post
exports.viewAllPost = (req,res) =>{
    PostApi.find()
    .then(postApi => {
        res.send(postApi);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving all post ."
        });
    });
};

// view one post 
exports.viewOnePost = (req,res)=>{
    PostApi.findById(req.params.postId)
    .then(postApi => {
        if(!postApi) {
            return res.status(404).send({
                message: "User not found with id " + req.params.postId
            });            
        }
        res.send(postApi);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.postId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.postId
        });
    });
};

// update post
exports.updatePost =(req,res) =>{
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "post content can not be empty"
        });
    }

    // Find note and update it with the request body
    PostApi.findByIdAndUpdate(req.params.postId, {
        title: req.body.title || "default post title",
        content: req.body.content
    }, {new: true})
    .then(postApi => {
        if(!postApi) {
            return res.status(404).send({
                message: "post not found with id " + req.params.postId
            });
        }
        res.send(postApi);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "post not found with id " + req.params.postId
            });                
        }
        return res.status(500).send({
            message: "Error updating post  with id " + req.params.postId
        });
    });
};

// delete post 
exports.deletePost = (req,res)=>{
    PostApi.findByIdAndRemove(req.params.postId)
    .then(postApi => {
        if(!postApi) {
            return res.status(404).send({
                message: "Post not found with id " + req.params.postId
            });
        }
        res.send({message: "Post deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Post not found with id " + req.params.postId
            });                
        }
        return res.status(500).send({
            message: "Could not delete the post with id " + req.params.postId
        });
    });

};
