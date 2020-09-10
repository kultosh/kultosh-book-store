const Author = require('../models/author');

const index = async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i');
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', {
            authors: authors,
            searchOptions: req.query
        })
    } catch (error) {
        res.redirect('/');
    }
}

const create = (req, res) => {
    res.render('authors/create');
}

const store = async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save();
        res.redirect('/author');
    } catch (error) {
        res.render('authors/create', {
            author: author,
            errorMessage: 'Error On Creating Author'
        })
    }
}

module.exports = {
    index,
    create,
    store
}