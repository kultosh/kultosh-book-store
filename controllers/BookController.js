const Book = require('../models/book');
const Author = require('../models/author');

const index = async (req, res) => {
    try {
        const authors = await Author.find();
        const books = await Book.find();
        res.render('books/index', {
            authors: authors,
            books: books
        });
    } catch (error) {
        console.log(error);
    }
}

const create = async (req, res) => {
    renderNewPage(res, new Book());
}

const store = async (req, res) => {
    try {
        const fileName = req.file != null ? req.file.filename : null;
        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            publishDate: new Date(req.body.publishDate),
            pageCount: req.body.pageCount,
            coverImage: fileName,
            description: req.body.description
        });
        const newBook = await book.save();
        res.redirect('/book');
    } catch (error) {
        res.send(error);
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

module.exports = {
    index,
    create,
    store
}