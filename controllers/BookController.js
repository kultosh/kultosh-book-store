const Book = require('../models/book');
const Author = require('../models/author');
const path = require('path');
const fs = require('fs');
const uploadPath = path.join('public', Book.coverImageBasePath);

const index = async (req, res) => {
    let query = Book.find();
    if (req.query.title != null && req.query.title !== '') {
        query = query.regex('title', new RegExp(req.query.title, 'i'));
    }
    if(req.query.publishedBefore != null && req.query.publishedBefore != '' )
    {
        query = query.lte('publishDate', req.query.publishedBefore);
    }
    if(req.query.publishedAfter != null && req.query.publishedAfter != '' )
    {
        query = query.gte('publishDate', req.query.publishedAfter);
    }
    try {
        const authors = await Author.find();
        const books = await query.exec();
        res.render('books/index', {
            authors: authors,
            books: books,
            searchOptions: req.query
        });
    } catch (error) {
        res.redirect('/');
    }
}

const create = async (req, res) => {
    renderNewPage(res, new Book());
}

const store = async (req, res) => {
    const fileName = req.file != null ? req.file.filename : null;
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        coverImage: fileName,
        description: req.body.description
    });
    try {
        const newBook = await book.save();
        res.redirect('/book');
    } catch (error) {
        if(book.coverImage != null)
        {
            removeBookCover(book.coverImage)
        }
        renderNewPage(res, book, true)
    }
};

async function renderNewPage(res, book, hasError = false) {
    try {
        const authors = await Author.find();
        const params = {
            authors: authors,
            book: book
        }
        if (hasError) params.errorMessage = 'Error Creating Book'
        res.render('books/create', params);
    } catch (error) {
        res.redirect('/books');
    }
}

function removeBookCover(filename)
{
    fs.unlink(path.join(uploadPath, filename), err => {
        if(err) 
        console.error(err)
    });
}

module.exports = {
    index,
    create,
    store
}