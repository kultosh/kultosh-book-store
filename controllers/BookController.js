const Book = require('../models/book');
const Author = require('../models/author');

const index = async(req, res) => {
    try {
        const authors = await Author.find();
        const books = await Book.find();
        res.render('books/index', {authors: authors, books: books});   
    } catch (error) {
        res.send('Something Went Wrong');
    }
}

const create = async (req, res) => {
    try {
        const book = new Book;
        const authors = await Author.find();
        res.render('books/create', {authors: authors, book: book});
    } catch (error) {
        res.redirect('/book');
    }
}

const store = async (req, res) => {
    const book = new Book(req.body);
    try {
        const newBook = await book.save();
        res.redirect('/book');

    } catch (error) {
        res.send(error);
    }
}

module.exports = {
    index,
    create,
    store
}