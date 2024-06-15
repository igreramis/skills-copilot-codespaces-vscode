// Create web server
const express = require('express');
const app = express();

// Use middleware
app.use(express.json());

// Data
const comments = [
    { id: 1, comment: 'Hello World' },
    { id: 2, comment: 'Hi there' },
    { id: 3, comment: 'Good morning' },
    { id: 4, comment: 'Good night' }
];

// Read all comments
app.get('/api/comments', (req, res) => {
    res.send(comments);
});

// Read a comment
app.get('/api/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const comment = comments.find(c => c.id === id);
    if (!comment) {
        return res.status(404).send('The comment with the given ID was not found.');
    }
    res.send(comment);
});

// Create a comment
app.post('/api/comments', (req, res) => {
    const comment = {
        id: comments.length + 1,
        comment: req.body.comment
    };
    comments.push(comment);
    res.send(comment);
});

// Update a comment
app.put('/api/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const comment = comments.find(c => c.id === id);
    if (!comment) {
        return res.status(404).send('The comment with the given ID was not found.');
    }
    comment.comment = req.body.comment;
    res.send(comment);
});

// Delete a comment
app.delete('/api/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const comment = comments.find(c => c.id === id);
    if (!comment) {
        return res.status(404).send('The comment with the given ID was not found.');
    }
    const index = comments.indexOf(comment);
    comments.splice(index, 1);
    res.send(comment);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// Run the web server with the command: node comments.js
// Test the API with Postman: http://localhost:3000/api/comments