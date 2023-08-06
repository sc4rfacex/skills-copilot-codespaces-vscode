// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const Comment = require('./models/comment');

// Connect to database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/comments', { useNewUrlParser: true });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a new comment
app.post('/comments', (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    });
    comment.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

// Get all comments
app.get('/comments', (req, res) => {
    Comment.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

// Get a single comment
app.get('/comments/:id', (req, res) => {
    Comment.findById(req.params.id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

// Update a single comment
app.put('/comments/:id', (req, res) => {
    Comment.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        comment: req.body.comment
    }, { new: true })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

// Delete a single comment
app.delete('/comments/:id', (req, res) => {
    Comment.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

// Start web server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});