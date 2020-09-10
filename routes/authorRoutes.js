const express = require('express');
const router = express.Router();
const Author = require('../models/author');

// Author Routes

router.get('/', (req, res) => {
    res.render('authors/index');
});

router.get('/create', (req, res) => {
    res.render('authors/create');
});

router.post('/create', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save();
        res.redirect('/');
    } catch (error) {
        res.render('authors/create', {
            author: author,
            errorMessage: 'Error On Creating Author'
        })
    }
})

module.exports = router;