const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const Book = require('../models/book')
const Author = require('../models/author')
const uploadPath = path.join('public', Book.coverImageBasePath)
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})

// All Books Route
router.get('/mybook', async (req, res) => {
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
});


router.get('/mybook/create', async (req, res) => {
    renderNewPage(res, new Book())
  });


// Create Book Route
router.post('/mybook/create', upload.single('coverImage'), async (req, res) => {
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
        res.send(error);
    }
});

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

module.exports = router